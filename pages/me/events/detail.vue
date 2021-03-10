<template>
	<view class="uni-flex uni-column detail-container">
		<view class="flex-item photo-top-container" v-if="detailValue" :style="{backgroundImage: detailValue.userInfo.header_photo != '' ? 'url('+detailValue.userInfo.header_photo+')' : 'url('+backgroundPictureSrc+')'} ">
			<view class="photo-top">
				<image :src="detailValue.userInfo.logo" mode="aspectFill"></image>
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
					<img :src="detailValue.file" alt="Img">
					<!-- <image :src="detailValue.file" mode="aspectFit"></image> -->
				</view>
			</view>
			<view class="flex-item detail-item">
				<view class="detail-item-title">{{i18n.eventeventtime}}</view>
				<view class="detail-item-result">
					{{detailValue.start_time}} - {{detailValue.end_time}}
				</view>
			</view>
			<view class="flex-item detail-item">
				<view class="detail-item-title">{{i18n.eventticketprice}}</view>
				<view class="detail-item-result">
					{{detailValue.pay_money}}
				</view>
			</view>
			<view class="flex-item detail-item">
				<view class="detail-item-title">{{i18n.eventsdealordfem}}</view>
				<view class="detail-item-result">
					{{detailValue.type_desc}}
				</view>
			</view>
			<view class="flex-item detail-item">
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
				fileSrc: '',
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
					token: uni.getStorageSync('token'),
					event_id: id
				}
				events.detail(data).then(res => {
					console.log(res);

					if (res.code == 200) {
						this.detailValue = res.message;
						// #ifdef H5
						var img_url = res.message.userInfo.profile_photo;
						if (res.message.userInfo.profile_photo == '') {
							img_url = 'https://i.loli.net/2020/10/29/zgFvraCTjbd7fEs.png';
						}
						var url = window.location.href;
						var origin = window.location.origin;
						let turn_url = origin + '/esl_h5/pages/me/events/share?id=' + res.message.id;
						
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
				uni.previewImage({
					urls: [file]
				})

			},
			turnBack() {
				uni.navigateBack({
					delta: 1
				})
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
	page {
		background-color: #F4F5F6;
	}

	.detail-container {
		padding: 20rpx;
		width: 96%;
		margin: 20rpx auto;
		background-color: #FFFFFF;
		border-radius: 20rpx;
	}

	.content-container {
		padding-top: 20rpx;
	}

	.detail-item {
		padding: 10rpx;
	}

	.detail-item-title {
		font-size: 34rpx;
		font-weight: 700;
	}

	.detail-item-result {
		word-wrap: break-word;
		/* padding-left: 10rpx; */
		font-size: 30rpx;
	}

	.detail-item-result-img {
		text-align: center;
	}
	.detail-item-result-img img {
		width:100%;
		/* border: 1rpx solid #EEEEEE; */
	}
	
	.detail-item-result-img image {
		width: 99%;
		border: 1rpx solid #EEEEEE;
	}


	.view-files {
		color: #00B3D2;
		text-decoration: underline;
	}

	.back-button {
		margin-top: 40rpx;

	}

	.back-button button {
		height: 80rpx;
		line-height: 80rpx;
		color: #FFFFFF;
		background-color: #004956;
		border-radius: 20rpx;
	}



	.photo-top-container {
		text-align: center;
		background:
			linear-gradient(217deg, rgba(0, 73, 86, .8), rgba(255, 0, 0, 0) 70.71%),
			linear-gradient(127deg, rgba(0, 179, 210, .8), rgba(0, 255, 0, 0) 70.71%),
			linear-gradient(336deg, rgba(177, 196, 82, .8), rgba(0, 0, 255, 0) 70.71%);
		box-shadow: 0 0 30rpx 0 rgba(43, 86, 112, .1);
		background-size: cover;
		background-position: center;
		height: 300rpx;
	}

	.photo-top {
		width: 160rpx;
		height: 160rpx;
		border-radius: 160rpx;
		margin: 0 auto;
		position: relative;
		bottom: -200rpx;
		background-color: #FFFFFF;
	}

	.photo-top image {
		width: 160rpx;
		height: 160rpx;
		border-radius: 160rpx;
		border: 1rpx solid #EEEEEE;
	}


	.photo-business {
		position: absolute;
		right: -16rpx;
		bottom: 0;
	}

	.photo-business image {
		width: 60rpx;
		height: 60rpx;
		border-radius: 60rpx;
	}

	.xll-header {
		width: 100%;
		border: 1rpx solid #0AA0A8;
		border-radius: 10rpx;
		padding: 20rpx;
		margin-top: 80rpx;
	}

	.xll-header-title {
		font-size: 34rpx;
		font-weight: 700;
		text-align: center;
	}

	.xll-header-tags {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		margin-top: 20rpx;
	}

	.xll-header-tag {
		background-color: #0AA0A8;
		color: #FFFFff;
		margin-left: 20rpx;
		padding: 10rpx 20rpx;
		border-radius: 10rpx;

	}

	.xll-header-date {
		text-align: center;
		font-size: 30rpx;
		font-weight: 700;
		color: #808080;
		margin-top: 20rpx;
	}

	.xll-header-location {
		text-align: center;
		font-size: 30rpx;
		font-weight: 700;
		color: #808080;
		margin-top: 20rpx;
		word-wrap: break-word;
	}
</style>
