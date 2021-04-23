<template>
	<view class="register">
		<view class="content">
			<!-- 头部logo -->
			<view class="header">
				<image src="/static/esl-logo.png" lazy-load="true"></image>
			</view>
			<!-- #ifdef H5 -->
			<view class="main">
				<wInput v-model="phoneData" type="number" maxlength="11" :placeholder="i18n.mobile"></wInput>
				<wInput v-model="verCode" type="number" maxlength="6" :placeholder="i18n.verificationCode"
					:codeText="i18n.getVerificationCode" isShowCode ref="runCode" setTime="10" @setCode="getVerCode()">
				</wInput>
			</view>
			<wButton class="wbutton" :text="i18n.h5bindMobileandlogin" :rotate="isRotate" @click.native="startReg()">
			</wButton>
			<!-- 底部信息 -->
			<view class="footer">
				<text @tap="isShowAgree" class="cuIcon" :class="showAgree?'cuIcon-radiobox':'cuIcon-round'"></text>
				<!-- 协议地址 -->
				<navigator url="../protocol/index" open-type="navigate"> {{i18n.agree}}</navigator>
			</view>
			<!-- #endif -->
			<!-- 主体 -->

			<!-- #ifdef MP-WEIXIN -->
			<view class="mini-main">
				Before officially entering our mini program, please bind your phone number first
			</view>
			<view class="mini-button">
				<button type="default" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">Bind Phone</button>
			</view>
			<!-- #endif -->

		</view>
		<view class="vcode-popup" v-if="showvcodepopup" @click="copyPhoneCode(phoneCode)">{{phoneCode}}</view>
	</view>
</template>

<script>
	import wInput from '../../components/watch-login/watch-input.vue' //input
	import wButton from '../../components/watch-login/watch-button.vue' //button
	var _this;
	import login from '@/api/login.js'
	import profile from '@/api/profile.js'

	export default {
		data() {
			return {
				//logo图片 base64
				phoneData: '', // 用户/电话
				verCode: "", //验证码
				showAgree: true, //协议是否选择
				isRotate: false, //是否加载旋转
				language: 0,
				showvcodepopup: false,
				phoneCode: '',

				is_educator: 0,
				is_business: 0,
				is_vendor: 0,
				is_other: 0,
				identity: 0, //当前身份、
				mobile: '', // 用户手机号
				unionid: '',
				openid: '',
				languageValue: ''

			}
		},
		components: {
			wInput, //input
			wButton //button
		},
		mounted() {
			_this = this;
		},
		computed: {
			i18n() {
				return this.$t('index')
			},
			// #ifdef H5
			isWechat() {
				return this.$isWechat()
			}
			// #endif

		},
		onLoad(option) {
			var _this = this;
			_this.roleValue = option.roleValue;
			_this.language = option.language;
			_this.unionid = option.unionid;
			_this.openid = option.openid;
		},
		methods: {
			getPhoneNumber(e) {
				console.log(e.detail.errMsg)

				var _this = this;
				uni.getProvider({
					service: 'oauth',
					success: function(res) {
						// console.log(res.provider)
						if (~res.provider.indexOf('weixin')) {
							uni.login({
								provider: 'weixin',
								success: function(loginRes) {
									console.log(loginRes)
									let data = {
										unionid: _this.unionid,
										iv: e.detail.iv,
										encryptedData: e.detail.encryptedData
									}
									uni.showLoading({
										title: 'Binding'
									})
									login.miniGetPhoneNumber(data).then(res => {
										console.log(res)
										if (res.code == 200) {
											let phone = res.message.phoneNumber
											let data = {
												phone: phone,
												unionid: _this.unionid,
												openid: _this.openid
											}
											login.miniBindPhone(data).then(res => {
												console.log(res)
												if (res.code == 200) {
													let message = res.message;
													uni.setStorageSync('unionid',
														message.unionid)
													uni.setStorageSync('nickname',
														message.nickname)
													uni.setStorageSync('token',
														message.token)
													uni.setStorageSync('uid',
														message.id)
													uni.setStorageSync('phone',
														message.phone)

													_this.mobile = message.phone;
													let identity = message
													.identity;
													let isEducator = message
														.is_educator;
													let isBusiness = message
														.is_business;
													let isVendor = message
														.is_vendor;
													let isOther = message.is_other;

													_this.is_educator = isEducator;
													_this.is_business = isBusiness;
													_this.is_vendor = isVendor;
													_this.is_other = isOther;

													if (identity == 0) {
														uni.setStorageSync(
															'identity', 0)
														_this.identity = 0;
													}
													if (identity == 1) {
														if (isEducator == 0) {
															uni.setStorageSync(
																'identity', 0)
															_this.identity = 0;
														} else {
															uni.setStorageSync(
																'identity',
																identity)
															_this.identity =
																identity;
															uni.$emit(
																'changeIdentity',
																identity)
														}
													}
													if (identity == 2) {
														if (isBusiness == 0) {
															uni.setStorageSync(
																'identity', 0)
															_this.identity = 0;
														} else {
															uni.setStorageSync(
																'identity',
																identity)
															_this.identity =
																identity;
															uni.$emit(
																'changeIdentity',
																identity)
														}
													}

													if (identity == 3) {
														if (isVendor == 0) {
															uni.setStorageSync(
																'identity', 0)
															_this.identity = 0;
														} else {
															uni.setStorageSync(
																'identity',
																identity)
															_this.identity =
																identity;
															uni.$emit(
																'changeIdentity',
																identity)
														}
													}
													if (identity == 4) {
														if (isOther == 0) {
															uni.setStorageSync(
																'identity', 0)
															_this.identity = 0;
														} else {
															uni.setStorageSync(
																'identity',
																identity)
															_this.identity =
																identity;
															uni.$emit(
																'changeIdentity',
																identity)
														}
													}

													if (message.language == 0) {
														uni.setStorageSync(
															'language', 'en-US'
															)
													}
													if (message.language == 1) {
														uni.setStorageSync(
															'language', 'zh-CN'
															)
													}
													if (message.language == 2) {
														uni.setStorageSync(
															'language', 'en-US'
															)
													}

													setTimeout(function() {
														uni.hideLoading();
														uni.reLaunch({
															url: '/pages/menu/me'
														})
													}, 1200)

												} else {
													uni.showToast({
														title: res.msg,
														icon: 'none'
													})
												}


											}).catch(err => {
												console.log(err)
											})
										} else {
											uni.showToast({
												title: res.msg,
												icon: 'none'
											})
										}
									}).catch(err => {
										console.log(err)
									})

								}
							});
						}
					}
				});


			},
			isShowAgree() {
				//是否选择协议
				_this.showAgree = !_this.showAgree;
			},
			getVerCode() {
				//获取验证码
				if (_this.phoneData.length != 11) {
					uni.showToast({
						icon: 'none',
						position: 'bottom',
						title: _this.i18n.IncorrectPhoneNumber
					});
					return false;
				}
				console.log("获取验证码")
				let data = {
					phone: _this.phoneData
				}
				// 发送验证码 api
				login.sendCode(data).then(
					res => {
						console.log(res)
						if (res.code == 200) {
							this.$refs.runCode.$emit('runCode'); //触发倒计时（一般用于请求成功验证码后调用）
							// let phone_code = res.message.phone_code;
							// this.showvcodepopup = true;
							// this.phoneCode = res.message.phone_code;
							return uni.showToast({
								title:'Success',
								duration:2000,
								icon:'success'
							})
						} else {
							uni.showToast({
								title: res.msg,
								icon: 'none'
							})
						}

					}).catch(err => {
					uni.showToast({
						title: err.msg,
						icon: 'none'
					})
				})

			},
			startReg() {
				//注册
				if (this.isRotate) {
					//判断是否加载中，避免重复点击请求
					return false;
				}
				if (this.showAgree == false) {
					uni.showToast({
						icon: 'none',
						position: 'bottom',
						title: _this.i18n.incorrectagree
					});
					return false;
				}
				if (this.phoneData.length != 11) {
					uni.showToast({
						icon: 'none',
						position: 'bottom',
						title: _this.i18n.IncorrectPhoneNumber
					});
					return false;
				}

				if (this.verCode.length != 6) {
					uni.showToast({
						icon: 'none',
						position: 'bottom',
						title: _this.i18n.IncorrectVerificationCode
					});
					return false;
				}

				let bindData = {
					unionid: uni.getStorageSync('unionid'),
					openid: uni.getStorageSync('openid'),
					phone: _this.phoneData,
					phone_code: _this.verCode
				}

				// 验证身份api
				login.mpRegister(bindData).then(res => {
					console.log(res)
					if (res.code == 200) {
						_this.isRotate = true
						let message = res.message;

						let unionid = message.unionid;
						let phone = message.phone;
						let token = message.token;
						let nickname = message.nickname;
						let uid = message.id;

						let identity = message.identity;
						let isEducator = message.is_educator;
						let isBusiness = message.is_business;
						let isVendor = message.is_vendor;
						let isOther = message.is_other;

						uni.setStorageSync('unionid', unionid)
						uni.setStorageSync('phone', phone)
						uni.setStorageSync('nickname', nickname)
						uni.setStorageSync('token', token)
						uni.setStorageSync('uid', uid)

						if (identity == 0) {
							uni.setStorageSync('identity', 0)
						}
						if (identity == 1) {
							if (isEducator == 0) {
								uni.setStorageSync('identity', 0)
							} else {
								uni.setStorageSync('identity', identity)
							}
						}
						if (identity == 2) {
							if (isBusiness == 0) {
								uni.setStorageSync('identity', 0)
							} else {
								uni.setStorageSync('identity', identity)
							}
						}

						if (identity == 3) {
							if (isVendor == 0) {
								uni.setStorageSync('identity', 0)
							} else {
								uni.setStorageSync('identity', identity)
							}
						}
						if (identity == 4) {
							if (isOther == 0) {
								uni.setStorageSync('identity', 0)
							} else {
								uni.setStorageSync('identity', identity)
							}
						}

						if (message.language == 1) {
							uni.setStorageSync('language', 'zh-CN')
						}
						if (message.language == 2) {
							uni.setStorageSync('language', 'en-US')
						}

						// #ifdef H5
						// let subscribeValue = res.message.subscribe;

						// if (subscribeValue === 0 && this.isWechat) {
						// 	this.showOfficialStatus = true
						// }
						// #endif
						setTimeout(function() {
							_this.isRotate = false;
							uni.switchTab({
								url: '/pages/home/index'
							})
						}, 1200)

					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
					}

				}).catch(err => {
					console.log(err)
				})

			},
			copyPhoneCode(code) {
				this.verCode = JSON.stringify(code);
				this.showvcodepopup = false;
			}
		},
		onReady() {

		}
	}
</script>

<style>
	@import url("../../components/watch-login/css/icon.css");

	.content {
		display: flex;
		flex-direction: column;
		justify-content: center;
		/* margin-top: 128rpx; */
	}

	/* 头部 logo */
	.header {
		width: 100%;
		text-align: center;
		padding-top: 10%;
		padding-bottom: 10%;
	}

	.header image {
		width: 200rpx;
		height: 200rpx;
		border-radius: 50%;
	}

	/* 主体 */
	.main {
		display: flex;
		flex-direction: column;
		padding-left: 70rpx;
		padding-right: 70rpx;
	}

	.tips {
		color: #999999;
		font-size: 28rpx;
		margin-top: 64rpx;
		margin-left: 48rpx;
	}

	/* 登录按钮 */
	.wbutton {
		margin-top: 96rpx;
	}

	/* 其他登录方式 */
	.other_login {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		margin-top: 256rpx;
		text-align: center;
	}

	.login_icon {
		border: none;
		font-size: 64rpx;
		margin: 0 64rpx 0 64rpx;
		color: rgba(0, 0, 0, 0.7)
	}

	.wechat_color {
		color: #83DC42;
	}

	.weibo_color {
		color: #F9221D;
	}

	.github_color {
		color: #24292E;
	}

	/* 底部 */
	.footer {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		font-size: 28rpx;
		margin-top: 64rpx;
		color: rgba(0, 0, 0, 0.7);
		text-align: center;
		height: 40rpx;
		line-height: 40rpx;
	}

	.footer text {
		font-size: 24rpx;
		margin-left: 15rpx;
		margin-right: 15rpx;
	}

	.vcode-popup {
		position: fixed;
		z-index: 1000;
		background-color: rgba(0, 0, 0, 1);
		color: #FFFFFF;
		width: 200rpx;
		height: 80rpx;
		line-height: 80rpx;
		text-align: center;
		border-radius: 20rpx;
		font-size: 34rpx;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		margin: auto;
	}

	.mini-main {
		width: 90%;
		margin: 0 auto;
		font-size: 30rpx;
		color: #808080;
		text-align: center;
	}

	.mini-button {
		width: 80%;
		margin: 20rpx auto;

	}

	.mini-button button {
		background-color: #0AA0A8;
		color: #FFFFFF;
		font-size: 30rpx;
		line-height: 80rpx;
	}
</style>
