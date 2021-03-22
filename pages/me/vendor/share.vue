<template>
	<view class="uni-flex uni-column home-bg">
		<view class="flex-item photo-top-container" :style="{backgroundImage: vendorUserInfo.header_photo != '' ? 'url('+vendorUserInfo.header_photo+')' : 'url('+backgroundPictureSrc+')'} ">
			<view class="photo-top">
				<image :src="vendorUserInfo.logo" mode="aspectFill"></image>
			</view>
		</view>
		<view class="flex-item bg">
			<view class="legal-info">
				<view class="legal-info-t">
					<view class="legal-info-title">{{i18n.profilesharecompanyinfo}}</view>
				</view>
				<view class="legal-info-b">
					<view class="legal-info-b-item" v-if="vendorUserInfo.vendor_name_en!='' ">
						<view class="legal-info-b-item-2">{{vendorUserInfo.vendor_name_en}}</view>
					</view>
					<view class="legal-info-b-item" v-if="vendorUserInfo.legal_company_name!=''">
						<view class="legal-info-b-item-2">{{vendorUserInfo.legal_company_name}}</view>
					</view>
				</view>
			</view>

			<view class="basic-info-container">
				<view class="basic-info-t">
					<view class="basic-info-t-title">{{i18n.profilecompanygeneralinfo}}</view>
				</view>
				<view class="basic-info-b">
					<view class="basic-info-item" v-if="vendorUserInfo.vendor_bio!=''">
						<text>{{i18n.profilevendorbio}}:</text>
						<text>{{vendorUserInfo.vendor_bio}}</text>
					</view>
					<view class="basic-info-item" v-if="vendorUserInfo.district!='' || vendorUserInfo.province!='' || vendorUserInfo.city!='' ">
						<text>{{i18n.profilelocation}}:</text>
						<text>{{vendorUserInfo.district}}, {{vendorUserInfo.city}}, {{vendorUserInfo.province}}</text>
					</view>
					<view class="basic-info-item uni-flex uni-row">
						<view class="profile-detail-item-box-item-tg" v-if="vendorUserInfo.is_dog_friendly ==1">
							<text>{{i18n.profiledogfriendly}}:</text>
							<view class="profile-detail-item-box-item-tg-right"></view>
						</view>
						<view class="profile-detail-item-box-item-tg" v-if="vendorUserInfo.is_events ==1 ">
							<text>{{i18n.profileevents}}:</text>
							<view class="profile-detail-item-box-item-tg-right"></view>
						</view>
					</view>
				</view>
			</view>

			<view class="contact-container">
				<view class="contact">
					<view class="contact-l">
						<image :src="vendorUserInfo.profile_photo" mode="aspectFill" @click="previewImage(vendorUserInfo.profile_photo)"></image>
					</view>
					<view class="contact-r">
						<view class="contact-nationality"> <b>{{i18n.jobsposthione}} {{vendorUserInfo.first_name}}
								{{vendorUserInfo.last_name}}!</b></view>
						<!-- <view class="contact-phone">{{detailValue.userInfo.wx_id}}</view> -->
						<view class="contact-work-email">{{vendorUserInfo.phone}}</view>
						<view class="contact-nationality">{{vendorUserInfo.work_email}}</view>
					</view>
				</view>
			</view>


			<view class="profile-media">
				<view class="profile-detail-relative " v-if="vendorUserInfo.wechat_public_qrcode">
					<view class="profile-detail-item-title">Media</view>
					<view class="profile-detail-item-box profile-header-photo">
						<view class="profile-header-photo-1">
							<image @click="previewYourImage(vendorUserInfo.wechat_public_qrcode)" :src="vendorUserInfo.wechat_public_qrcode"
							 mode="aspectFit"></image>
						</view>
					</view>
				</view>
				<view class="profile-detail-relative " v-if="userImagesList.length>0">
					<!-- <view class="profile-detail-item-title">{{i18n.profilepics6max}}</view> -->
					<view class="profile-detail-item-box pics-flex-row">
						<view class="profile-profile-pics-item" v-for="(image,i) in userImagesList" :key="i">
							<image @click="previewPics(i)" :src="image.url" mode="aspectFill"></image>
						</view>
					</view>
				</view>
				<view class="profile-detail-relative " v-if="vendorUserInfo.video_url">
					<!-- <view class="profile-detail-item-title">{{i18n.profileintrovideo}}</view> -->
					<view class="profile-detail-item-box">
						<view class="profile-intro-video">
							<video id="myVideo" :muted="false" preload="metadata" @loadedmetadata="loadedMetaData" 
							:poster="vendorUserInfo.profile_photo"
							 x5-video-player-type="h5-page" :src="vendorUserInfo.video_url" controls></video>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- #ifdef H5 -->
		<xllfindmore></xllfindmore>
		<!-- #endif -->
		
	</view>
</template>

<script>
	import profile from '@/api/profile.js'
	import xllfindmore from '@/components/xll-find-more/xll-find-more.vue'

	export default {
		components: {
			xllfindmore
		},
		data() {
			return {
				scrollTop: 0,
				basicUserInfo: {},
				vendorUserInfo: {},
				anchorPoint: '',
				avatarUrl: "",
				uerInfo: {},

				current: 0,
				backgroundPictureSrc: 'https://oss.esl-passport.cn/esl_passport_25.png',
				introVideoSrc: '',
				hobbiesList: [],
				languagesList: [],
				userImagesList: [],
				userId: undefined,
				identity: undefined,
				type: ''
			}
		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		},
		onShow() {
			// this.getBasicInfo()
		},
		computed: {
			i18n() {
				return this.$t('index')
			}
		},
		onLoad(option) {
			this.userId = option.id;
			this.getBasicInfo()
			this.type = option.type;
			if (option.type == 'deals' || option.type == 'events') {
				uni.setNavigationBarTitle({
					title: 'Vendor Profile'
				})
			}
		},
		methods: {
			loadedMetaData(e) {
				console.log(e)
				
			},
			previewPics(i){
				let list = this.userImagesList
				let urls = []
				list.forEach(item=>{
					urls.push(item.url)
				})
				uni.previewImage({
					current:i,
					urls:urls
				})
			},
			previewYourImage(image) {
				uni.previewImage({
					urls: [image]
				})
			},
			chooseAvatarImage() {
				uni.chooseImage({
					count: 6, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album', 'camera'], //从相册选择
					success: function(res) {
						console.log(JSON.stringify(res.tempFilePaths));
					}
				})
			},
			onClickItem(e) {
				if (this.current !== e.currentIndex) {
					this.current = e.currentIndex;
				}
			},

			videoErrorCallback: function(e) {
				uni.showModal({
					content: e.target.errMsg,
					showCancel: false
				})
			},
			getBasicInfo() {
				var that = this;
				let data = {
					id: that.userId,
					identity: 3
				}
				profile.visitorUserInfo(data).then(res => {
					console.log(res)
					if (res.code == 200) {
						// #ifdef H5
						var img_url = res.message.vendor_info.profile_photo;
						if (res.message.vendor_info.profile_photo == '') {
							img_url = 'https://i.loli.net/2020/10/29/zgFvraCTjbd7fEs.png';
						}
						var url = window.location.href;
						var origin = window.location.origin;
						let user_id = this.userId;
						console.log(origin)
						let turn_url = origin + '/esl_h5/pages/me/vendor/share?id=' + user_id;
						// window.location.href = turn_url;
						let share_data = {
							title: res.message.vendor_info.first_name + res.message.vendor_info.last_name, // 分享标题
							desc: res.message.vendor_info.vendor_bio, // 分享描述
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

						that.avatarUrl = res.message.headimgurl;

						that.basicUserInfo = res.message;
						that.vendorUserInfo = res.message.vendor_info;
						that.languagesList = res.message.vendor_info.languages;
						that.userImagesList = res.message.vendor_info.user_images;

					} else {
						uni.showToast({
							title: res.msg,
							icon: "none"
						})
					}
				}).catch(err => {
					console.log(err)
				})
			},
			filePreview(file) {
				// #ifdef H5
				if (file != '') {
					window.location.href = file;
				}
				// #endif

			}

		},
		onShareAppMessage:function(){
			
		},
		onShareTimeline:function(){
			
		},
		onAddToFavorites:function(){
			
		},
		onReady:function(){
			var that = this;
			// #ifdef H5
			this.videoContext = uni.createVideoContext('myVideo')
			setTimeout(function(){
				that.videoContext.play()
			},2000)
			setTimeout(function(){
				that.videoContext.pause()
			},3000)
			// #endif
		}
	}
</script>

<style>
	@import url("@/common/me/share.css");

	.legal-info {
		margin-top: 0;
		padding-top: 50rpx;
	}

	.profile-detail-item-box-1 {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		padding: 20rpx;
		padding-top: 40rpx;
		border-radius: 20rpx;
		background-color: rgba(239, 231, 235, 0.8);
		margin-top: 20rpx;
		position: relative;
	}

	.profile-box-1-button {
		position: absolute;
		right: 20rpx;
		top: 10rpx;
		color: #00B3D2;
		font-weight: 600;

	}

	.basic-info-qrcode {
		width: 90%;
		height: 200rpx;
		margin: 0 auto;
	}

	.basic-info-qrcode image {
		height: 100%;
		width: 100%;
	}

	.video {
		margin: 0 auto;
	}
</style>
