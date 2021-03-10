<template>
	<view class="uni-flex uni-column home-bg">
		<view class="flex-item home-picture" :style="{backgroundImage:'url('+backgroundPictureSrc+')'}">
			<canvas canvas-id="canvasArcbar1" id="canvasArcbar1" class="charts3">
				<image v-if="vendorUserInfo.profile_photo !=''" :src="vendorUserInfo.profile_photo" mode="aspectFill" @click="turnEditProfilePhoto(8,vendorUserInfo.profile_photo)"></image>
				<image v-if="vendorUserInfo.profile_photo ==''" :src="avatarUrl" mode="aspectFill" @click="turnEditProfilePhoto(8,vendorUserInfo.profile_photo)"></image>
				<view v-if="vendorUserInfo.logo!=''" style="line-height: 80rpx; position: absolute;
				width:80rpx; height: 80rpx;border-radius: 80rpx; 
				right: 200rpx;top:160rpx;
				border: 1rpx solid #EEEEEE;background-size: contain;background-position: center;"
				 :style=" {backgroundImage:'url('+vendorUserInfo.logo+')'}" @click="turnEditProfilePhoto(9,vendorUserInfo.logo)">
				</view>
				<view style="position: absolute;right: 50rpx;color: #FFFFFF;bottom: 80rpx;font-size: 38rpx;font-weight: 700;">
					<text>{{percent}}</text>
				</view>
				<view style="position: absolute;right: 20rpx;color: #FFFFFF;bottom: 50rpx;font-size: 30rpx;font-weight: 700;">
					<text>Complete</text>
				</view>
			</canvas>
			<view class="flex-item home-user-name">
				<text>{{vendorUserInfo.first_name}} {{vendorUserInfo.last_name}}</text>
			</view>
		</view>

		<view class="flex-item home-info">
			<uni-segmented-control class="segmented-control-bg" :current="current" :values="items" @clickItem="onClickItem"
			 style-type="text" active-color="#333333"></uni-segmented-control>
			<view class="profile-content">
				
				<view class="details" v-if="current===0">
					<view class="legal-info">
						<view class="legal-info-t">
							<view class="legal-info-title">{{i18n.profilecompanylegalinfo}}</view>
							<view class="edit-icon" @click="turnLegalInfo">
								<image src="../static/esl/edit.png" mode="aspectFill"></image>
							</view>
						</view>
						<view class="legal-info-b">
							<view class="legal-info-b-item" v-if="vendorUserInfo.vendor_name_en!='' ">
								<view class="legal-info-b-item-1">{{i18n.profilecompanynameen}}</view>
								<view class="legal-info-b-item-2">{{vendorUserInfo.vendor_name_en}}</view>
							</view>
							<view class="legal-info-b-item" v-if="vendorUserInfo.legal_company_name!=''">
								<view class="legal-info-b-item-1">{{i18n.profilelegalcompanyname}}</view>
								<view class="legal-info-b-item-2">{{vendorUserInfo.legal_company_name}}</view>
							</view>
							<view class="legal-info-b-item" v-if="vendorUserInfo.busin_reg_num != '' ">
								<view class="legal-info-b-item-1">{{i18n.profilebusinessregistrationnumber}}</view>
								<view class="legal-info-b-item-2">{{vendorUserInfo.busin_reg_num}}</view>
							</view>
							<view class="legal-info-b-item" v-if="vendorUserInfo.busin_reg_img!='' ">
								<view class="legal-info-b-item-1">{{i18n.profilebusinesslicense}}</view>
								<view class="legal-info-b-item-2 preview-file" @click="filePreview(vendorUserInfo.busin_reg_img)">
									<!-- {{i18n.profileviewfiles}} -->
									<image :src="vendorUserInfo.busin_reg_img" mode="aspectFit"></image>
								</view>
							</view>

						</view>
					</view>
				</view>
				<view class="basic-info" v-if="current ===0">
					<view class="basic-info-t">
						<view class="basic-info-t-title">{{i18n.profilecompanygeneralinfo}}</view>
						<view class="edit-icon" @click="turnVendorBasic">
							<image src="../static/esl/edit.png" mode="aspectFill"></image>
						</view>
					</view>
					<view class="basic-info-b">
						<view class="basic-info-item" v-if="vendorUserInfo.vendor_bio!=''">
							<text>{{i18n.profilevendorbio}}:</text>
							<text>{{vendorUserInfo.vendor_bio}}</text>
						</view>
						<view class="basic-info-item" v-if=" vendorUserInfo.province !='' || vendorUserInfo.city !='' || vendorUserInfo.district != '' ">
							<text>{{i18n.profilelocation}}:</text>
							<text>{{vendorUserInfo.district}}, {{vendorUserInfo.city}}, {{vendorUserInfo.province}}</text>
						</view>
						<view class="basic-info-item" v-if=" vendorUserInfo.address !='' ">
							<text>{{i18n.profilevendorbasicaddress}}:</text>
							<text>{{vendorUserInfo.address}}</text>
						</view>
						<view class="basic-info-item" v-if="vendorUserInfo.website!=''">
							<text>{{i18n.profilewebsite}}:</text>
							<text>{{vendorUserInfo.website}}</text>
						</view>
						<view class="basic-info-item" v-if="vendorUserInfo.phone!='' ">
							<text>{{i18n.profilephone}}:</text>
							<text>{{vendorUserInfo.phone}}</text>
						</view>
						<view class="basic-info-item" v-if="vendorUserInfo.wechat_public_name!='' ">
							<text>{{i18n.profilewechatofficialaccountid}}:</text>
							<text>{{vendorUserInfo.wechat_public_name}}</text>
						</view>
						<view class="basic-info-item uni-flex uni-row">
							<view class="profile-detail-item-box-item-tg" v-if="vendorUserInfo.is_dog_friendly ==1 ">
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

				<view class="profile-media" v-if="current === 1">
					<view class="profile-detail-relative ">
						<view class="profile-detail-item-title">{{i18n.profileprofilephoto}}</view>
						<view class="profile-detail-item-box" v-if="vendorUserInfo.profile_photo">
							<view class="profile-photo-1">
								<image @click="previewYourImage(vendorUserInfo.profile_photo)" :src="vendorUserInfo.profile_photo" mode="aspectFill"></image>
							</view>
						</view>

						<view class="profile-edit-button" @click="turnEditProfilePhoto(8,vendorUserInfo.profile_photo)">
							<!-- {{i18n.profileedit}} -->
							<image src="../static/esl/upload.png" mode="aspectFit"></image>
						</view>
					</view>
					<view class="profile-detail-relative ">
						<view class="profile-detail-item-title">{{i18n.profilevendorlogo}}</view>
						<view class="profile-detail-item-box" v-if="vendorUserInfo.logo">
							<view class="profile-photo-1">
								<image @click="previewYourImage(vendorUserInfo.logo)" :src="vendorUserInfo.logo" mode="aspectFill"></image>
							</view>
						</view>
						<view class="profile-edit-button" @click="turnEditProfilePhoto(9,vendorUserInfo.logo)">
							<!-- {{i18n.profileedit}} -->
							<image src="../static/esl/upload.png" mode="aspectFit"></image>
						</view>
					</view>
					<view class="profile-detail-relative ">
						<view class="profile-detail-item-title">{{i18n.profileheaderphoto}}</view>
						<view class="profile-detail-item-box profile-header-photo" v-if="vendorUserInfo.header_photo">
							<view class="profile-header-photo-1">
								<image @click="previewYourImage(vendorUserInfo.header_photo)" :src="vendorUserInfo.header_photo" mode="aspectFill"></image>
							</view>
						</view>
						<view class="profile-edit-button" @click="turnEditProfilePhoto(10,vendorUserInfo.header_photo)">
							<!-- {{i18n.profileedit}} -->
							<image src="../static/esl/upload.png" mode="aspectFit"></image>
						</view>
					</view>
					<view class="profile-detail-relative ">
						<view class="profile-detail-item-title">{{i18n.profileqrcode}} <br><text>{{i18n.profilewechatofficialaccount}}
							</text></view>
						<view class="profile-detail-item-box profile-header-photo" v-if="vendorUserInfo.wechat_public_qrcode">
							<view class="profile-header-photo-1">
								<image @click="previewYourImage(vendorUserInfo.wechat_public_qrcode)" :src="vendorUserInfo.wechat_public_qrcode"
								 mode="aspectFit"></image>
							</view>
						</view>
						<view class="profile-edit-button" @click="turnEditProfilePhoto(12,vendorUserInfo.wechat_public_qrcode)">
							<!-- {{i18n.profileedit}} -->
							<image src="../static/esl/upload.png" mode="aspectFit"></image>
						</view>
					</view>
					<view class="profile-detail-relative ">
						<view class="profile-detail-item-title">{{i18n.profilepics6max}}</view>
						<view class="profile-detail-item-box pics-flex-row" v-if="userImagesList.length>0">
							<view class="profile-profile-pics-item" v-for="(image,i) in userImagesList" :key="i">
								<image @click="previewYourImage(image.url)" :src="image.url" mode="aspectFill"></image>
							</view>
						</view>
						<view class="profile-edit-button" @click="turnEditProfilePhotoMulti(11,userImagesList)">
							<!-- {{i18n.profileedit}} -->
							<image src="../static/esl/upload.png" mode="aspectFit"></image>
						</view>
					</view>
					<view class="profile-detail-relative ">
						<view class="profile-detail-item-title">{{i18n.profileintrovideo}}</view>
						<view class="profile-detail-item-box" v-if="vendorUserInfo.video_url">
							<view class="profile-intro-video">
								<video id="myVideo" :muted="true" preload="metadata" @loadedmetadata="loadedMetaData" 
								 x5-video-player-type="h5-page"  :src="vendorUserInfo.video_url" @error="videoErrorCallback"
								 controls></video>
							</view>
						</view>
						<view class="profile-edit-button" @click="turnEditProfileVideo(3,vendorUserInfo.video_url)">
							<!-- {{i18n.profileedit}} -->
							<image src="../static/esl/upload.png" mode="aspectFit"></image>
						</view>
					</view>
				</view>
				
				<view class="basic-info" v-if="current===2">
					<view class="basic-info-t">
						<view class="basic-info-t-title">{{i18n.profileyourcontactbasicinfo}}</view>
						<view class="edit-icon" @click="turnEditYourBasic">
							<image src="../static/esl/edit.png" mode="aspectFit"></image>
						</view>
					</view>
					<view class="basic-info-b">
						<view v-if="vendorUserInfo.first_name!='' || vendorUserInfo.last_name != '' " class="basic-info-item" style="width: 100%;">
							<text>{{i18n.profilefirstandlastname}}:</text>
							<text>{{vendorUserInfo.first_name}} {{vendorUserInfo.last_name}}</text>
						</view>
						<view class="basic-info-item" v-if="vendorUserInfo.nickname!=''" style="width: 100%;">
							<text>{{i18n.profilenickname}}:</text>
							<text>{{vendorUserInfo.nickname}}</text>
						</view>
						<view class="basic-info-item" v-if="vendorUserInfo.nationality!=''" style="width: 100%;">
							<text>{{i18n.profilenationality}}:</text>
							<text>{{vendorUserInfo.nationality}}</text>
						</view>
						<view class="basic-info-item" v-if="vendorUserInfo.wx_id!=''" style="width: 100%;">
							<text>{{i18n.vendorwechatid}}:</text>
							<text>{{vendorUserInfo.wx_id}}</text>
						</view>
						<view class="basic-info-item" v-if="basicUserInfo.sex==1 || basicUserInfo.sex==2 || basicUserInfo.sex==3" style="width: 100%;">
							<text>{{i18n.profilegender}}:</text>
							<text v-if="basicUserInfo.sex == 1">Male</text>
							<text v-if="basicUserInfo.sex == 2">Female</text>
							<text v-if="basicUserInfo.sex == 3">Undisclosed</text>
						</view>
						<!-- <view class="basic-info-item" v-if="vendorUserInfo.first_contact!='' " style="width: 100%;">
							<text>{{i18n.profilefirstcontact}}:</text>
							<text>{{vendorUserInfo.first_contact}}</text>
						</view> -->
						<view class="basic-info-item" v-if="vendorUserInfo.first_language!='' " style="width: 100%;">
							<text>{{i18n.profilefirstlanguage}}:</text>
							<text>{{vendorUserInfo.first_language}}</text>
						</view>
						<view class="basic-info-item" v-if="vendorUserInfo.job_title!=''" style="width: 100%;">
							<text>{{i18n.profilejobtitle}}:</text>
							<text>{{vendorUserInfo.job_title}}</text>
						</view>
					</view>
				
					<view class="languages">
						<view class="languages-top">
							<view class="languages-title">{{i18n.profilelanguages}}</view>
							<view class="edit-icon" @click="turnRateSkillsList(2)">
								<image src="../static/esl/edit.png" mode="aspectFill"></image>
							</view>
						</view>
						<view class="languages-container">
							<view class="languages-item" v-for="(language,i) in languagesList" :key="i">
								{{language.object_en}}
								<u-rate :disabled="true" custom-prefix="custom-icon" active-icon="xll-yuan" inactive-icon="circleo"
								 active-color="#b1c452" v-model="language.object_score" :count="language.object_score"></u-rate>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- <u-back-top :scroll-top="scrollTop"></u-back-top> -->
	</view>
</template>

<script>
	import uCharts from '@/components/u-charts/u-charts.js';
	var _self;
	var canvaArcbar1;
	import profile from '@/api/profile.js'


	export default {
		data() {
			return {
				scrollTop: 0,
				basicUserInfo: {},
				vendorUserInfo: {},
				anchorPoint: '',
				avatarUrl: "",
				uerInfo: {},
				cWidth3: '', //圆弧进度图
				cHeight3: '', //圆弧进度图
				arcbarWidth: '', //圆弧进度图，进度条宽度,此设置可使各端宽度一致
				pixelRatio: 1,
				chartData: {
					series: [{
						name: '正确率',
						data: 0.5,
						color: '#00b3d2'
					}]
				},
				percent: '',
				items: ['Business', 'Media', 'You'],
				current: 0,
				backgroundPictureSrc: 'https://i.loli.net/2021/02/01/wOgZUBjeEqmXf1H.png',
				introVideoSrc: '',
				hobbiesList: [],
				languagesList: [],
				userImagesList: [],

			}
		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		},
		onShow() {
			this.identity = uni.getStorageSync('identity');
			this.getBasicInfo()
			this.updateVendorProfile()
		},
		computed: {
			i18n() {
				return this.$t('index')
			}
		},
		onLoad(option) {
			_self = this;
			this.cWidth3 = uni.upx2px(600); //这里要与样式的宽高对应
			this.cHeight3 = uni.upx2px(300); //这里要与样式的宽高对应
			this.arcbarWidth = uni.upx2px(24);
			if (option.current != undefined && option.current != '') {
				this.current = Number(option.current);
			}
		},
		methods: {
			loadedMetaData(e) {
				console.log(e)
				var that = this;
				// #ifdef H5
				this.videoContext = uni.createVideoContext('myVideo')
				setTimeout(function() {
					that.videoContext.play()
				}, 1000)
				setTimeout(function() {
					that.videoContext.pause()
				}, 1500)
				// #endif
			},
			turnHomepage() {
				// console.log('home')
				uni.reLaunch({
					url: '/pages/home/index'
				})
			},
			turnLegalInfo() {
				uni.navigateTo({
					url: 'edit/legalInfo'
				})
			},
			turnRateSkillsList(type) {
				uni.navigateTo({
					url: '/pages/me/profile/rateSkillsList?type=' + type
				})
			},
			previewYourImage(image) {
				uni.previewImage({
					urls: [image]
				})
			},
			turnEditYourBasic() {
				uni.navigateTo({
					url: 'edit/basic'
				})
			},
			turnVendorBasic() {
				// var url = window.location.href;
				// var origin = window.location.origin;
				// console.log(origin)
				// let turn_url = origin + '/esl_h5/pages/me/vendor/edit/vendorBasic';
				// window.location.href = turn_url;
				uni.navigateTo({
					url:'edit/vendorBasic'
				})
			},
			turnSearchTags(type) {
				uni.navigateTo({
					url: '/pages/me/profile/searchTags?type=' + type
				})
			},
			turnEditProfilePhoto(type, source) {
				let a = encodeURI(source);
				uni.navigateTo({
					url: '/pages/me/profile/photo?type=' + type + '&source=' + a
				})
			},
			turnEditProfilePhotoMulti(type, source) {
				// console.log(source);
				uni.navigateTo({
					url: '/pages/me/profile/photo?type=' + type,
					success() {
						uni.setStorageSync('userImageList', JSON.stringify(source));
					}
				})
			},
			turnEditProfileVideo(type, source) {
				uni.navigateTo({
					url: '/pages/me/profile/video?type=' + type + '&source=' + source
				})
			},
			updateVendorProfile() {
				let data = {
					token: uni.getStorageSync('token')
				}
				profile.updateVendorProfile(data).then(res => {
					console.log(res)
					if (res.code == 200) {
						this.percent = res.message + '%';
						this.correctRate = res.message / 100;
						let char_data = {
							series: [{
								name: '正确率',
								data: this.correctRate,
								color: '#00b3d2'
							}]
						}

						this.showArcbar("canvasArcbar1", char_data);

					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
					}
				}).catch(error => {
					console.log(error)
				})
			},
			showArcbar(canvasId, chartData) {
				this.percent = Math.round(chartData.series[0].data * 100) + '%';
				canvaArcbar1 = new uCharts({
					$this: _self,
					canvasId: canvasId,
					type: 'arcbar',
					fontSize: 11,
					legend: {
						show: false
					},
					background: '#FFFFFF',
					pixelRatio: _self.pixelRatio,
					series: chartData.series,
					animation: true,
					width: _self.cWidth3 * _self.pixelRatio,
					height: _self.cHeight3 * _self.pixelRatio,
					dataLabel: true,
					// title: {
					// 	name: Math.round(chartData.series[0].data*100)+'%',//这里我自动计算了，您可以直接给任意字符串
					// 	color: '#0AA0A8',
					// 	fontSize: 25 * _self.pixelRatio
					// },
					// subtitle: {
					// 	name: 'name', //这里您可以直接给任意字符串
					// 	color: '#666666',
					// 	fontSize: 15 * _self.pixelRatio
					// },
					extra: {
						arcbar: {
							type: 'default',
							width: _self.arcbarWidth * _self.pixelRatio, //圆弧的宽度
						}
					}
				});

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
				console.log(e)
				// uni.showModal({
				// 	content: e.target.errMsg,
				// 	showCancel: false
				// })
			},
			getBasicInfo() {
				var that = this;
				let data = {
					id: uni.getStorageSync('uid'),
					token: uni.getStorageSync('token')
				}
				profile.getBasicInfo(data).then(res => {
					console.log(res)
					if (res.code == 200) {
						var img_url = res.message.vendor_info.profile_photo;
						if (res.message.vendor_info.profile_photo == '') {
							img_url = 'https://i.loli.net/2020/10/29/zgFvraCTjbd7fEs.png';
						}
						// #ifdef H5
						var url = window.location.href;
						var origin = window.location.origin;
						let user_id = uni.getStorageSync('uid');
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
						// that.percent = res.message.is_vendor + '%';
						// that.correctRate = res.message.is_vendor / 100;

						// let chartData = {
						// 	series: [{
						// 		name: '正确率',
						// 		data: that.correctRate,
						// 		color: '#00b3d2'
						// 	}]
						// }
						// this.showArcbar("canvasArcbar1", chartData);

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
				uni.previewImage({
					urls:[file]
				})
			}

		},
		onShareAppMessage:function(){
			
		},
		onShareTimeline:function(){
			
		},
		onAddToFavorites:function(){
			
		},
		onReady: function(res) {
			// #ifndef MP-ALIPAY
			this.videoContext = uni.createVideoContext('myVideo')
			// #endif
		},
	}
</script>

<style>
	@import url("@/common/me/home.css");

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
</style>
