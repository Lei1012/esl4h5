<template>
	<view class="uni-flex uni-column ">
		<view class="flex-item detail-container">
			<view class="flex-item photo-top-container" v-if="detailValue" :style="{backgroundImage: detailValue.userInfo.header_photo != '' ? 'url('+detailValue.userInfo.header_photo+')' : 'url('+backgroundPictureSrc+')'} ">
				<view class="photo-top">
					<image :src="detailValue.userInfo.logo" mode="aspectFit" @click="turnVendorProfile(detailValue.user_id)"></image>
				</view>
			</view>
			<view class="xll-header">
				<view class="xll-header-title">{{detailValue.title}}</view>
				<view class="xll-header-tags">
					<view class="xll-header-tag" v-if="detailValue.type == 1">{{i18n.dealsdeal}}</view>
					<view class="xll-header-tag" v-if="detailValue.type == 2">{{i18n.dealsdiscount}}</view>
					<view class="xll-header-tag" v-if="detailValue.is_all == 1">{{i18n.dealsalllocations}}</view>
					<view class="xll-header-tag" v-if="detailValue.is_all == 0">{{i18n.dealslimited}}</view>
					<view class="xll-header-tag" v-if="isDogFriendly == 1">{{i18n.dealsdogfriendly}}</view>
				</view>
			</view>
			<view class="content-container">
				<view class="flex-item detail-item">
					<view class="detail-item-title">{{i18n.dealsadddealdescription}}</view>
					<view class="detail-item-result">
						{{detailValue.desc}}
					</view>
				</view>
				<view class="flex-item detail-item" v-if="detailValue.location != '' ">
					<view class="detail-item-title">{{i18n.dealsaddaddress}} </view>
					<view class="detail-item-result">
						<text>{{detailValue.location}}</text>
					</view>
				</view>
				<view class="flex-item detail-item" v-if="detailValue.file != '' ">
					<view class="detail-item-title"  @click="filePreview(detailValue.file)">{{i18n.dealspartlocations}} </view>
					<view class="part-image" v-if="isImage" @click="previewImage(detailValue.file)">
						<image :src="detailValue.file" mode="aspectFit"></image>
					</view>
					<view class="detail-item-result" v-if="isImage==false" @click="filePreview(detailValue.file)">
						<text class="view-files">{{detailValue.file_name}}</text>
					</view>
				</view>
			</view>
		</view>

		<view class="contact" v-if="detailValue.userInfo">
			<view class="contact-l">
				<image :src="detailValue.userInfo.wechat_public_qrcode" mode="aspectFill" @click="previewImage(detailValue.userInfo.wechat_public_qrcode)"></image>
			</view>
			<view class="contact-r">
				<view class="contact-nationality"> <b>{{i18n.jobsposthione}} {{detailValue.userInfo.vendor_name_en}}!</b></view>
				<!-- <view class="contact-phone">{{detailValue.userInfo.wx_id}}</view> -->
				<view class="contact-work-email">{{detailValue.userInfo.phone}}</view>
				<view class="contact-nationality">{{detailValue.userInfo.work_email}}</view>
			</view>
		</view>
		<view class="third-container">
			<view class="third-item"  @click="turnVendorProfile(detailValue.user_id)">Visit Our Page!</view>
			<view class="third-item"  @click="showDiscountStatus=true">Member Card</view>
		</view>
		<discountcard @close="showDiscountStatus=false" :showContact="showDiscountStatus"></discountcard>
		<xllfindmore></xllfindmore>
	</view>
</template>

<script>
	import deals from '@/api/deals.js';
	import xllfindmore from '@/components/xll-find-more/xll-find-more.vue'
	import discountcard from "@/components/xll-discount-card/xll-discount-card.vue";
	export default {
		components: {
			xllfindmore,
			discountcard
		},
		data() {
			return {
				showDiscountStatus:false,
				id: 0,
				detailValue: '',
				fileSrc: '',
				filename: '',
				source: 1,
				partlocations: '',
				isDogFriendly:0,
				address:'',
				isImage:false, // 文件类型是不是图片类型
				backgroundPictureSrc: 'https://oss.esl-passport.cn/App_Profile_Back_Image_Design.png',

			}
		},
		computed: {
			i18n() {
				return this.$t('index')
			}
		},
		onLoad(option) {
			this.id = option.id;
			if (option.id != '' && option.id != undefined) {
				this.getDetail(option.id);
			}

		},
		methods: {
			getDetail(id) {
				let data = {
					id: id
				}
				deals.visitorDealInfo(data).then(res => {
					console.log(res);
					if (res.code == 200) {
						this.detailValue = res.message;
						this.isDogFriendly = res.message.userInfo.is_dog_friendly;
						this.address = res.message.userInfo.address;
						this.partlocations = 'https://view.officeapps.live.com/op/view.aspx?src=' + encodeURIComponent(res.message.file);
						let partlocationsFileName = res.message.file_name;
						if(partlocationsFileName != ''){
							var fileExtension = partlocationsFileName.split('.').pop();
							if(fileExtension == 'jpg' || fileExtension=='jpeg' || fileExtension == 'png'){
								this.isImage = true;
							}
						}
						var img_url = res.message.userInfo.logo;
						if (res.message.userInfo.logo == '') {
							img_url = 'https://i.loli.net/2020/10/29/zgFvraCTjbd7fEs.png';
						}
						// #ifdef H5
						var url = window.location.href;
						var origin = window.location.origin;
						let turn_url = origin + '/esl_h5/pages/me/deals/share?id=' + res.message.id;
						// window.location.href = turn_url;
						let share_data = {
							title: 'ESL Passport Deal', // 分享标题
							desc:res.message.title, // 分享描述
							link: turn_url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
							imgUrl: img_url, // 分享图标
						}
						this.$jwx.updateAppMessageShareData(share_data, function(res) {
							// console.log(res)
						})
						this.$jwx.updateTimelineShareData(share_data, function(res) {
							// console.log(res)
						})
						// #endif
						

					} else {
						uni.showToast({
							title: res.msg,
							icon: "none"
						})
					}
				}).catch(error => {
					console.log(error);
				})
			},
			filePreview(file) {
				// #ifdef H5
				let url = 'https://view.officeapps.live.com/op/view.aspx?src=' + encodeURIComponent(file);
				window.location.href = url;
				// #endif
			
			},
			turnBack() {
				uni.navigateBack({
					delta: 1
				})
			},
			previewImage(url) {
				uni.previewImage({
					urls: [url]
				})
			},
			turnVendorProfile(uid) {
				// #ifdef H5
				var url = window.location.href;
				var origin = window.location.origin;
				let turn_url = origin + '/esl_h5/pages/me/vendor/share?id=' + uid
				window.location.href = turn_url;
				// #endif
				
				// #ifndef H5
				uni.navigateTo({
					url:'/pages/me/vendor/share?id=' + uid
				})
				// #endif
				
			}

		},
		onShareAppMessage:function(){
			
		},
		onShareTimeline:function(){
			
		},
		onAddToFavorites:function(){
			
		},
	}
</script>

<style>
	@import url("@/common/me/deals/detail.css");
</style>
