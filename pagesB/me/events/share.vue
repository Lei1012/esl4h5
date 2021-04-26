<template>
	<view class="uni-flex uni-column detail-container">
		<view class="flex-item photo-top-container" v-if="detailUserInfo"
			:style="{backgroundImage: detailUserInfo.header_photo != '' ? 'url('+detailUserInfo.header_photo+')' : 'url('+backgroundPictureSrc+')'} ">
			<view class="photo-top">
				<image :src="detailUserInfo.logo" mode="aspectFill"></image>
			</view>
		</view>
		<view class="xll-header">
			<view class="xll-header-title">{{detailValue.name}}</view>
			<view class="xll-header-date">{{detailValue.date}} </view>
			<view class="xll-header-tags">
				<view class="xll-header-tag" v-if="detailValue.event_place">{{detailValue.event_place}}</view>
				<view class="xll-header-tag" v-if="detailValue.is_all == 1">{{i18n.eventssocial}}</view>
				<view class="xll-header-tag" v-if="detailValue.is_all == 2">{{i18n.eventsprofessional}}</view>
			</view>
			<view class="xll-header-location" v-if="detailValue.location">{{detailValue.location}}</view>
		</view>
		<view class="content-container">
			<view class="flex-item detail-item" v-if="detailValue.file !='' ">
				<view class="detail-item-title">{{i18n.eventseventflyer}}</view>
				<view class="detail-item-result-img" @click="filePreview(detailValue.file)">
					<image :src="detailValue.file" mode="widthFix"></image>
				</view>
			</view>
			<view class="flex-item detail-item">
				<view class="detail-item-title">{{i18n.eventeventtime}}</view>
				<view class="detail-item-result">
					{{detailValue.start_time}} - {{detailValue.end_time}}
				</view>
			</view>
			<view class="flex-item detail-item" v-if="detailValue.pay_money ">
				<view class="detail-item-title">{{i18n.eventticketprice}}</view>
				<view class="detail-item-result">
					{{detailValue.pay_money}}
				</view>
			</view>
			<view class="flex-item detail-item" v-if="detailValue.type_desc">
				<view class="detail-item-title">{{i18n.eventsdealordfem}}</view>
				<view class="detail-item-result">
					{{detailValue.type_desc}}
				</view>
			</view>
			<view class="flex-item detail-item" v-if="detailValue.desc">
				<view class="detail-item-title">{{i18n.eventsdescription}}</view>
				<view class="detail-item-result">
					{{detailValue.desc}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import events from '@/api/events.js';

	export default {
		data() {
			return {
				id: 0,
				detailValue: '',
				detailUserInfo: '',
				backgroundPictureSrc: 'https://oss.esl-passport.cn/esl_passport_25.png',
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
				events.visitorEventInfo(data).then(res => {
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
						var img_url = detailUserInfo.profile_photo;
						if (detailUserInfo.profile_photo == '') {
							img_url = 'https://i.loli.net/2020/10/29/zgFvraCTjbd7fEs.png';
						}
						// #ifdef H5
						var url = window.location.href;
						var origin = window.location.origin;
						let turn_url = origin + '/esl_h5/pagesB/me/events/share?id=' + res.message.id;

						let share_data = {
							title: res.message.name, // 分享标题
							desc: res.message.desc, // 分享描述
							link: turn_url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
							imgUrl: img_url, // 分享图标
						}
						this.$jwx.updateAppMessageShareData(share_data, function(res) {
							console.log(res)
						})
						this.$jwx.updateTimelineShareData(share_data, function(res) {
							console.log(res)
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
				if (file != '') {
					window.location.href = file;
				}
				// #endif

			},
			turnBack() {
				uni.navigateBack({
					delta: 1
				})
			}
		},
		onShareAppMessage: function() {

		},
		onShareTimeline: function() {

		},
		onAddToFavorites: function() {

		},
	}
</script>

<style>
	@import url("@/common/me/events/detail.css");
</style>
