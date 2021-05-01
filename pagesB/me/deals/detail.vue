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
					<view class="xll-header-tag" v-if="isDogFriendly == 1">{{i18n.dealsdogfriendly}}</view>
					<!-- #ifdef MP-WEIXIN -->
					<view class="xll-header-tag" @click="shareFc()"><u-icon name="share"  size="28rpx"></u-icon></view>
					<!-- #endif -->
					
				</view>
			</view>
			<view class="content-container">
				<view class="flex-item detail-item">
					<view class="detail-item-title">{{i18n.dealsadddealdescription}}</view>
					<view class="detail-item-result">
						{{detailValue.desc}}
					</view>
				</view>
				<view class="flex-item detail-item" v-if="detailValue.provinces && detailValue.citys && detailValue.districts">
					<view class="detail-item-title">{{i18n.dealseventslocation}}</view>
					<view class="detail-item-result" v-if="languageValue=='en-US'">
						{{detailValue.districts.Pinyin}}, {{detailValue.citys.Pinyin}}, {{detailValue.provinces.Pinyin}}
					</view>
					<view class="detail-item-result" v-if="languageValue=='zh-CN'">
						{{detailValue.districts.ShortName}}, {{detailValue.citys.ShortName}}, {{detailValue.provinces.ShortName}}
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
		
		<!-- 图片展示由自己实现 -->
		<QSPopup ref="popup">
			<view class="flex_column">
				<view class="backgroundColor-white padding1vh border_radius_10px">
					<image :src="posterImage || ''" mode="widthFix" class="posterImage"></image>
				</view>
				<view class="flex_row marginTop2vh">
					<!-- #ifdef H5 -->
					<button type="primary" size="mini">{{i18n.sharefcchanganbaocun}}</button>
					<!-- #endif -->
					<!-- #ifndef H5 -->
					<button type="primary" size="mini"
						@tap.prevent.stop="saveImage()">{{i18n.sharefcsaveimage}}</button>
					<!-- #endif -->
					<!-- <button type="primary" size="mini" @tap.prevent.stop="share()">{{i18n.sharefcshareimage}}</button> -->
				</view>
			</view>
		</QSPopup>
		<!-- 画布 -->
		<view class="hideCanvasView">
			<canvas class="hideCanvas" id="default_PosterCanvasId" canvas-id="default_PosterCanvasId"
				:style="{width: (poster.width||10) + 'px', height: (poster.height||10) + 'px'}"></canvas>
		</view>
		
	</view>

</template>

<script>
	import QSPopup from '@/components/QS-popup/QS-popup.vue';
	import _app from '@/js_sdk/QuShe-SharerPoster/QS-SharePoster/app.js';
	import {
		getSharePoster
	} from '@/js_sdk/QuShe-SharerPoster/QS-SharePoster/QS-SharePoster.js';
	import deals from '@/api/deals.js';
	import discountcard from "@/components/xll-discount-card/xll-discount-card.vue";
	import uniCopy from '@/js_sdk/xb-copy/uni-copy.js';
	export default {
		components: {
			discountcard,
			QSPopup
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
				languageValue:'en-US',
				poster: {},
				posterImage: '',
				canvasId: 'default_PosterCanvasId'
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
			this.languageValue = uni.getStorageSync('language')
		},
		methods: {
			async shareFc() {
				let _this = this;
				let bgUrl = _this.detailUserInfo.header_photo ? _this.detailUserInfo.header_photo : _this.backgroundPictureSrc;
				let qrcodeUrl = '';
				// #ifdef H5
				var url = window.location.href;
				var origin = window.location.origin;
				qrcodeUrl = origin + '/esl_h5/pagesB/me/deals/detail?id=' + _this.detailValue.id;
				// #endif
			
				// #ifdef MP-WEIXIN
				qrcodeUrl = 'https://esl-passport.cn/esl_h5/pagesB/me/deals/detail?id=' + _this.detailValue.id;
				// #endif
				// #ifdef MP-WEIXIN-DEV
				qrcodeUrl = 'https://test.esl-passport.cn/esl_h5/pagesB/me/deals/detail?id=' + _this.detailValue.id;
				// #endif
			
				try {
					this.count++;
					_app.log('准备生成:' + new Date())
					const d = await getSharePoster({
						_this: _this, //若在组件中使用 必传
						canvasType: '2d',
						type: 'testShareType',
						formData: {
							//访问接口获取背景图携带自定义数据
			
						},
						posterCanvasId: _this.canvasId, //canvasId
						delayTimeScale: 20, //延时系数
						background: {
							height: 10,
							width: 10,
							backgroundColor:"#ffffff"
						},
						setCanvasWH({
							bgObj
						}) {
							_this.poster = bgObj
						},
						drawArray({
							bgObj,
							type,
							bgScale,
							setBgObj,
							getBgObj
						}) {
							return [{
									type: 'image',
									id: 'productImage',
									url: bgUrl,
									dx: 0,
									dy: 0,
									serialNum: 0,
									infoCallBack(imageInfo) {
										let width;
										let height;
										if (imageInfo.width > imageInfo.height) {
											width = imageInfo.width > 700 ? 700 : imageInfo.width;
											height = width / imageInfo.width * imageInfo.height;
										} else {
											height = imageInfo.height > 700 ? 700 : imageInfo.height;
											width = height / imageInfo.height * imageInfo.width;
										}
										if (width < 500) {
											width = 500;
											height = width / imageInfo.width * imageInfo.height;
										}
										let addHeight;
										// #ifdef H5
										addHeight = 440;
										// #endif
										// #ifdef MP-WEIXIN
										addHeight = 500;
										// #endif
										if (height > 400) {
											height = 400
										}
										setBgObj({
											width,
											height: height + addHeight
										});
										return {
											dWidth: width,
											dHeight: height
										}
									}
								},
								{
									type: 'image',
									id: 'eslogo',
									url: '/static/esl-logo.png',
									dx: 20,
									dy: 20,
									serialNum: 0,
									infoCallBack(imageInfo) {
										let width = imageInfo.width * 0.3;
										let height = imageInfo.height * 0.3;
										return {
											dWidth: width,
											dHeight: height
										}
									}
								},
								{
									type: 'text',
									id: 'jobDesc',
									text: _this.detailValue.desc,
									color: '#000000',
									serialNum: 1,
									allInfoCallback({
										drawArray
									}) {
										const productImage = drawArray.find(item => item.id ===
											'productImage')
										const addHeight = getBgObj().height - productImage.dHeight;
										return {
											size: getBgObj().width * 0.05,
											lineFeed: {
												maxWidth: getBgObj().width,
												lineNum: 3
											},
											dx: getBgObj().width * .05,
											dy: productImage.dHeight + addHeight * .15,
										}
									}
								},
								{
									type: 'text',
									text: _this.detailValue.title,
									color: '#000000',
									serialNum: 2,
									allInfoCallback({
										drawArray
									}) {
										const productImage = drawArray.find(item => item.id ===
											'productImage')
										const addHeight = getBgObj().height - productImage.dHeight;
										return {
											size: getBgObj().width * 0.06,
											lineFeed: {
												maxWidth: getBgObj().width * 0.9,
												lineNum: 1
											},
											dx: getBgObj().width * .05,
											dy: productImage.dHeight + addHeight * .5,
										}
									}
								},
								{
									type: 'text',
									text: _this.detailValue.location,
									serialNum: 3,
									color: "#00b3d2",
									id: 'salary',
									allInfoCallback({
										drawArray
									}) {
										const productImage = drawArray.find(item => item.id ===
											'productImage')
										const addHeight = getBgObj().height - productImage.dHeight;
										return {
											size: getBgObj().width * 0.05,
											lineFeed: {
												maxWidth: getBgObj().width * 0.5,
												lineNum: 1
											},
											dx: getBgObj().width * .05,
											dy: productImage.dHeight + addHeight * .65,
										}
									}
								},
								{
									type: 'text',
									text: _this.detailUserInfo.first_name + ' '+ _this.detailUserInfo.last_name,
									serialNum: 4,
									allInfoCallback({
										drawArray
									}) {
										const productImage = drawArray.find(item => item.id ===
											'productImage')
										const addHeight = getBgObj().height - productImage.dHeight;
										return {
											size: getBgObj().width * 0.05,
											lineFeed: {
												maxWidth: getBgObj().width * 0.5,
												lineNum: 1
											},
											dx: getBgObj().width * .05,
											dy: productImage.dHeight + addHeight * .75,
										}
									}
								},
								{
									type: 'text',
									text: _this.detailValue.vendor_type_name,
									id: 'shareEmail',
									serialNum: 5,
									allInfoCallback({
										drawArray
									}) {
										const productImage = drawArray.find(item => item.id ===
											'productImage')
										const addHeight = getBgObj().height - productImage.dHeight;
										return {
											size: getBgObj().width * 0.05,
											lineFeed: {
												maxWidth: getBgObj().width * 0.5,
												lineNum: 1
											},
											dx: getBgObj().width * .05,
											dy: productImage.dHeight + addHeight * .85,
										}
									}
								},
								{
									type: 'qrcode',
									text: qrcodeUrl,
									serialNum: 7,
									allInfoCallback({
										drawArray
									}) {
										const productImage = drawArray.find(item => item.id ===
											'productImage')
										const addHeight = getBgObj().height - productImage.dHeight;
										const widthSize = getBgObj().width * .4;
										const heightSize = addHeight;
										const countSize = widthSize > heightSize ? heightSize : widthSize;
										const size = countSize * .9;
										return {
											size: size,
											dx: getBgObj().width - countSize * .95,
											dy: getBgObj().height - countSize * .95
										}
									}
								}
							]
						}
					})
					_app.log('海报生成成功, 时间:' + new Date() + '， 临时路径: ' + d.poster.tempFilePath)
					this.posterImage = d.poster.tempFilePath;
					this.$refs.popup.show()
				} catch (e) {
					_app.hideLoading();
					_app.showToast(JSON.stringify(e));
					console.log(JSON.stringify(e));
				}
			},
			saveImage() {
				var that = this;
				// #ifndef H5
				uni.saveImageToPhotosAlbum({
					filePath: this.posterImage,
					success(res) {
						_app.showToast(that.i18n.saveimagesuccess);
					}
				})
				// #endif
				// #ifdef H5
				uni.downloadFile({
					url: this.posterImage, //仅为示例，并非真实的资源
					success: (res) => {
						console.log(res)
						if (res.statusCode === 200) {
							_app.showToast(that.i18n.saveimagesuccess);
						}
					}
				});
				// #endif
			},
			share() {
				// #ifdef APP-PLUS
				_app.getShare(false, false, 2, '', '', '', this.poster.finalPath, false, false);
				// #endif
			
				// #ifndef APP-PLUS
				this.showWxShareStatus = true;
				// #endif
			},
			hideQr() {
				this.$refs.popup.hide()
			},
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
						let turn_url = origin + '/esl_h5/pagesB/me/deals/share?id=' + res.message.id;
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
				let turn_url = origin + '/esl_h5/pagesB/me/vendor/share?id=' + uid + '&type=deals'
				window.location.href = turn_url;
				// #endif

				// #ifndef H5
				uni.navigateTo({
					url: '/pagesB/me/vendor/share?id=' + uid + '&type=deals'
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
	.hideCanvasView {
		position: relative;
	}
	
	.hideCanvas {
		position: fixed;
		top: -99999upx;
		left: -99999upx;
		z-index: -99999;
	}
	
	.flex_row_c_c {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}
	
	.modalView {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		opacity: 0;
		outline: 0;
		transform: scale(1.2);
		perspective: 2500upx;
		background: rgba(0, 0, 0, 0.6);
		transition: all .3s ease-in-out;
		pointer-events: none;
		backface-visibility: hidden;
		z-index: 999;
	}
	
	.modalView.show {
		opacity: 1;
		transform: scale(1);
		pointer-events: auto;
	}
	
	.flex_column {
		display: flex;
		flex-direction: column;
	}
	
	.backgroundColor-white {
		background-color: white;
	}
	
	.border_radius_10px {
		border-radius: 10px;
	}
	
	.padding1vh {
		padding: 1vh;
	}
	
	.posterImage {
		width: 60vw;
	}
	
	.flex_row {
		display: flex;
		flex-direction: row;
	}
	
	.marginTop2vh {
		margin-top: 2vh;
	}
</style>
