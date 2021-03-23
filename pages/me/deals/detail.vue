<template>
	<view class="uni-flex uni-column detail">
		<view class="flex-item detail-container">
			<view class="flex-item photo-top-container" v-if="detailUserInfo"
				:style="{ backgroundImage:  detailUserInfo.header_photo === '' ? 'url('+  backgroundPictureSrc +')' : 'url('+  detailUserInfo.header_photo +')'}">
				<view class="photo-top">
					<image v-if="detailUserInfo.logo!=''" :src="detailUserInfo.logo" mode="aspectFit"
						@click="turnVendorProfile(detailValue.user_id)">
					</image>
				</view>
			</view>
			<view class="xll-header">
				<view class="xll-header-name">{{detailUserInfo.vendor_name_en}}</view>
				<view class="xll-header-title">{{detailValue.title}}</view>
				<view class="xll-header-tags">
					<view class="xll-header-tag" v-if="detailValue.type == 1">{{i18n.dealsdeal}}</view>
					<view class="xll-header-tag" v-if="detailValue.type == 2">{{i18n.dealsdiscount}}</view>
					<!-- <view class="xll-header-tag" v-if="detailValue.is_all == 1">{{i18n.dealsalllocations}}</view> -->
					<!-- <view class="xll-header-tag" v-if="detailValue.is_all == 0">{{i18n.dealslimited}}</view> -->
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
					<view class="detail-item-title" @click="filePreview(detailValue.file)">{{i18n.dealspartlocations}}
					</view>
					<view class="part-image" v-if="isImage" @click="previewImage(detailValue.file)">
						<image :src="detailValue.file" mode="widthFix"></image>
					</view>
					<view class="detail-item-result" v-if="isImage==false" @click="filePreview(detailValue.file)">
						<text class="view-files">{{detailValue.file_name}}</text>
					</view>
				</view>
			</view>
		</view>

		<view class="flex-item wechat-qrcode" v-if="detailUserInfo.wechat_public_qrcode != '' ">
			<image :src="detailUserInfo.wechat_public_qrcode" mode="aspectFill" show-menu-by-longpress="true"
				@click="previewImage(detailUserInfo.wechat_public_qrcode)"></image>
		</view>

		<view class="contact">
			<view class="contact-l">
				<image v-if="detailUserInfo.profile_photo!=''" :src="detailUserInfo.profile_photo" mode="aspectFill"
					@click="previewImage(detailUserInfo.profile_photo)"></image>
			</view>
			<view class="contact-r">
				<view class="contact-name"> {{i18n.jobsposthione}} {{detailUserInfo.vendor_name_en}}!</view>
				<view class="contact-phone" v-if="detailUserInfo.phone !='' ">
					<view class="contact-copy-container-l">
						{{detailUserInfo.phone}}
					</view>
					<view class="contact-copy-container-r" @click="phoneCall(detailUserInfo.phone)">
						<image src="@/static/phonecall.png" mode="aspectFit"></image>
					</view>
				</view>
				<view class="contact-work-email" v-if="detailUserInfo.work_email !=''">
					<view class="contact-copy-container-l">
						{{detailUserInfo.work_email}}
					</view>
					<view class="contact-copy-container-r" @click="copyEmail(detailUserInfo.work_email)">
						<image src="@/static/copy.png" mode="aspectFit"></image>
					</view>
				</view>
				<view class="contact-work-email" v-if="detailUserInfo.website !='' " >
					<view class="contact-copy-container-l">
						{{detailUserInfo.website}}
					</view>
					<view class="contact-copy-container-r" @click="copyWebsite(detailUserInfo.website)">
						<image src="@/static/copy.png" mode="aspectFit"></image>
					</view>
				</view>
			</view>
		</view>

		<view class="third-container">
			<view class="third-item" @click="turnVendorProfile(detailValue.user_id)">Visit Our Page!</view>
			<view class="third-item third-item-bg2" @click="showDiscountStatus=true">Member Card</view>
		</view>
		<discountcard @close="showDiscountStatus=false" :showContact="showDiscountStatus"></discountcard>
	</view>

</template>

<script>
	import deals from '@/api/deals.js';
	import discountcard from "@/components/xll-discount-card/xll-discount-card.vue";
	import uniCopy from '@/js_sdk/xb-copy/uni-copy.js';
	export default {
		components: {
			discountcard
		},
		data() {
			return {
				showDiscountStatus: false,
				id: 0,
				detailValue: '',
				detailUserInfo: '',
				fileSrc: '',
				filename: '',
				source: 1,
				partlocations: '',
				isDogFriendly: 0,
				address: '',
				isImage: false, // 文件类型是不是图片类型
				backgroundPictureSrc: 'https://oss.esl-passport.cn/esl_passport_25.png',
			}
		},
		filters: {

		},
		computed: {
			i18n() {
				return this.$t('index')
			}
		},
		onLoad(option) {
			this.id = option.id;
			this.source = option.source;
			if (option.id != '' && option.id != undefined) {
				this.getDetail(option.id);
			}

		},
		methods: {
			phoneCall(phone) {
				uni.makePhoneCall({
					phoneNumber: phone

				})
			},
			copyEmail(email) {
				uniCopy({
					content: email,
					success: (res) => {
						uni.showToast({
							title: res,
							icon: 'none'
						})
					},
					error: (e) => {
						uni.showToast({
							title: e,
							icon: 'none',
							duration: 3000,
						})
					}
				})
			},
			copyWebsite(website) {
				uniCopy({
					content: website,
					success: (res) => {
						uni.showToast({
							title: res,
							icon: 'none'
						})
					},
					error: (e) => {
						uni.showToast({
							title: e,
							icon: 'none',
							duration: 3000,
						})
					}
				})
			},
			getDetail(id) {
				let data = {
					token: uni.getStorageSync('token'),
					deal_id: id
				}
				deals.detail(data).then(res => {
					console.log(res);
					if (res.code == 200) {
						this.detailValue = res.message;
						let detailUserInfo = res.message.userInfo;
						this.detailUserInfo = detailUserInfo;

						let navigationBarTitle = '';
						if (detailUserInfo.vendor_name_en != '') {
							navigationBarTitle = detailUserInfo.vendor_name_en;
						} else {
							navigationBarTitle = detailUserInfo.legal_company_name;
						}
						uni.setNavigationBarTitle({
							title: navigationBarTitle
						})
						this.isDogFriendly = detailUserInfo.is_dog_friendly;
						this.address = detailUserInfo.address;
						this.partlocations = 'https://view.officeapps.live.com/op/view.aspx?src=' +
							encodeURIComponent(res.message.file);
						let partlocationsFileName = res.message.file_name;
						if (partlocationsFileName != '') {
							var fileExtension = partlocationsFileName.split('.').pop();
							if (fileExtension == 'jpg' || fileExtension == 'jpeg' || fileExtension == 'png') {
								this.isImage = true;
							}
						}
						let img_url = '';
						if (detailUserInfo.logo == '') {
							img_url = 'https://i.loli.net/2020/10/29/zgFvraCTjbd7fEs.png';
						} else {
							img_url = detailUserInfo.logo;
						}
						// #ifdef H5
						var url = window.location.href;
						var origin = window.location.origin;
						let turn_url = origin + '/esl_h5/pages/me/deals/share?id=' + res.message.id;
						// window.location.href = turn_url;
						let share_data = {
							title: 'ESL Passport Deal', // 分享标题
							desc: res.message.title, // 分享描述
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
				let turn_url = origin + '/esl_h5/pages/me/vendor/share?id=' + uid + '&type=deals'
				window.location.href = turn_url;
				// #endif

				// #ifndef H5
				uni.navigateTo({
					url: '/pages/me/vendor/share?id=' + uid + '&type=deals'
				})
				// #endif

			}
		},
		onShareAppMessage: function(res) {
			let detailUserInfo = this.detailUserInfo;
			let detailValue = this.detailValue;
			let title = detailUserInfo.vendor_name_en + ' ' + detailValue.title
			return {
				title: 'ESL Passport Deals'
			}
		},
		onShareTimeline: function() {
			let detailUserInfo = this.detailUserInfo;
			let detailValue = this.detailValue;
			let title = detailUserInfo.vendor_name_en + ' ' + detailValue.title
			return {
				title: 'ESL Passport Deals' + ' ' + title,
				imageUrl: detailUserInfo.logo
			}
		},
		onAddToFavorites: function() {

		},
	}
</script>

<style>
	@import url("@/common/me/deals/detail.css");
	@import url("@/common/public/contact-cv.css");
</style>
