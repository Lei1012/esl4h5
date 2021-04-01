<template>
	<view class="uni-column uni-flex container">
		<!-- #ifdef MP-WEIXIN -->
		<view class="logo">
			<image src="@/static/esl-logo.png" mode="aspectFill"></image><br>
			<text>Mini Program </text>
		</view>
		<view class="login-btn">
			<button @click="login()" type="default">Enter</button>
		</view>
		<view class="auth-bg" v-if="authUserInfoStatus">
			<view class="auth-userinfo">
				<view class="auth-logo">
					<image src="@/static/esl-logo.png" mode="aspectFill"></image>
				</view>
				<view class="auth-txt">
					{{i18n.loginauthtxt}}
				</view>
				<button type="default" open-type="getUserInfo" @getuserinfo="getMiniUserInfo">OK</button>
			</view>
		</view>
		<!-- #endif -->

		<!-- #ifdef H5 -->
		<view class="login">
			<view class="content">
				<!-- 头部logo -->
				<view class="header">
					<image :src="logoImage"></image>
				</view>
				<!-- 主体表单 -->
				<view class="main">
					<wInput v-model="phoneData" type="text" maxlength="11" :placeholder="i18n.h5loginuserandphone" :focus="isFocus">
					</wInput>
					<wInput v-model="passData" type="password" maxlength="11" :placeholder="i18n.h5loginpassword"></wInput>
				</view>
				<wButton class="wbutton" :text="i18n.h5loginlogin" :rotate="isRotate" @click="startLogin"></wButton>

				<!-- 底部信息 -->
				<view class="footer">
					<navigator url="forget" open-type="navigate">{{i18n.h5retrievepassword}}</navigator>
					<text>|</text>
					<navigator url="register" open-type="navigate">{{i18n.h5registeredaccount}}</navigator>
				</view>
			</view>
		</view>
		<!-- #endif -->

	</view>
</template>

<script>
	import profile from '@/api/profile.js';
	import login from '@/api/login.js';
	
	let _this;
	import wInput from '../../components/watch-login/watch-input.vue' //input
	import wButton from '../../components/watch-login/watch-button.vue' //button


	export default {
		data() {
			return {
				is_educator: 0,
				is_business: 0,
				is_vendor: 0,
				is_other: 0,
				identity: 0, //当前身份、
				mobile: '', // 用户手机号
				authUserInfoStatus: false,
				miniOpenId: '',
				miniUnionId: '',

				miniCode: '',
				redirectPath: '',

				// #ifdef H5
				logoImage: '/static/esl-logo.png',
				phoneData: '', //用户/电话
				passData: '', //密码
				isRotate: false, //是否加载旋转
				isFocus: true // 是否聚焦
				// #endif

			}
		},
		components: {
			wInput,
			wButton,
		},
		mounted() {
			_this = this;
		},
		computed: {
			i18n() {
				return this.$t('index')
			}
		},
		onLoad(option) {
			// #ifdef MP-WEIXIN
			this.redirectPath = decodeURIComponent(option.redirect);
			console.log(this.redirectPath);
			// #endif
		
		},
		methods: {
			isLogin() {
				//判断缓存中是否登录过，直接登录
			},
			startLogin(e) {
				console.log(e)
				//登录
				if (this.isRotate) {
					//判断是否加载中，避免重复点击请求
					return false;
				}
				if (this.phoneData.length == "") {
					uni.showToast({
						icon: 'none',
						position: 'bottom',
						title: this.i18n.h5usernameerror
					});
					return;
				}
				if (this.passData.length < 5) {
					uni.showToast({
						icon: 'none',
						position: 'bottom',
						title: this.i18n.h5passworderror
					});
					return;
				}

				console.log("登录成功")

				_this.isRotate = true
				setTimeout(function() {
					_this.isRotate = false
				}, 3000)
				

			},
			
			getMiniUserInfo(e) {
				console.log(e)
				this.loginByCode()
			},
			addMiniUserInfo() {
				var _this = this;
				// 获取用户信息
				uni.showLoading({
					title: 'logging in',
					mask: true
				})
				uni.getUserInfo({
					provider: 'weixin',
					success: function(infoRes) {
						console.log(infoRes)
						let userInfo = infoRes.userInfo;
						let reg_data = {
							openid: _this.miniOpenId,
							unionid: _this.miniUnionId,
							nickName: userInfo.nickName,
							avatarUrl: userInfo.avatarUrl,
							city: userInfo.city,
							gender: userInfo.gender,
							// language: userInfo.language,
							language: 'en-US',
							province: userInfo.province,
							country: userInfo.country,
							platform: 'mini'
						}
						login.miniAddUser(reg_data).then(res => {
							console.log('获取用户信息。。。')
							console.log(res)
							if (res.code === 200) {
								_this.authUserInfoStatus = false;

								uni.setStorageSync('token', res.message.token)
								uni.setStorageSync('uid', res.message.user_id)

								let data = {
									token: res.message.token,
									id: res.message.user_id
								}

								profile.getBasicInfo(data).then(res => {
									console.log(res)
									if (res.code == 200) {
										uni.setStorageSync('unionid', res.message.unionid)
										uni.setStorageSync('phone', res.message.phone)
										uni.setStorageSync('nickname', res.message.nickname)
										uni.setStorageSync('uid', res.message.id)
										uni.setStorageSync('phone', res.message.phone)

										_this.mobile = res.message.phone;
										let identity = res.message.identity;
										let isEducator = res.message.is_educator;
										let isBusiness = res.message.is_business;
										let isVendor = res.message.is_vendor;
										let isOther = res.message.is_other;

										_this.is_educator = isEducator;
										_this.is_business = isBusiness;
										_this.is_vendor = isVendor;
										_this.is_other = isOther;

										if (identity == 0) {
											uni.setStorageSync('identity', 0)
											_this.identity = 0;
										}
										if (identity == 1) {
											if (isEducator == 0) {
												uni.setStorageSync('identity', 0)
												_this.identity = 0;
											} else {
												uni.setStorageSync('identity', identity)
												_this.identity = identity;
												uni.$emit('changeIdentity', identity)
											}
										}
										if (identity == 2) {
											if (isBusiness == 0) {
												uni.setStorageSync('identity', 0)
												_this.identity = 0;
											} else {
												uni.setStorageSync('identity', identity)
												_this.identity = identity;
												uni.$emit('changeIdentity', identity)
											}
										}

										if (identity == 3) {
											if (isVendor == 0) {
												uni.setStorageSync('identity', 0)
												_this.identity = 0;
											} else {
												uni.setStorageSync('identity', identity)
												_this.identity = identity;
												uni.$emit('changeIdentity', identity)
											}
										}
										if (identity == 4) {
											if (isOther == 0) {
												uni.setStorageSync('identity', 0)
												_this.identity = 0;
											} else {
												uni.setStorageSync('identity', identity)
												_this.identity = identity;
												uni.$emit('changeIdentity', identity)
											}
										}

										let redirectPath = _this.redirectPath;
										if (redirectPath != undefined && redirectPath) {
											setTimeout(function() {
												uni.hideLoading();
												uni.reLaunch({
													url: '/' + redirectPath
												})
											}, 1200)

										} else {
											setTimeout(function() {
												uni.hideLoading();
												uni.reLaunch({
													url: '/pages/menu/me'
												})
											}, 1200)
										}

									} else {
										uni.showToast({
											title: res.msg,
											icon: 'none'
										})
									}

								}).catch(error => {
									console.log(error)
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

					},
					fail: function(infoFail) {
						console.log(infoFail)
					}
				});
			},
			loginByCode() {
				var _this = this;
				let code = _this.miniCode;
				uni.showLoading({
					title: 'logging in',
					mask: true
				})
				login.miniWxDecode({
					code: code,
					platform: 'mini'
				}).then(result => {
					console.log(result)
					if (result.code === 200) {

						let message = result.message
						_this.miniOpenId = message.openid;
						_this.miniUnionId = message.unionid;

						if (message.is_registered == 0) {
							_this.addMiniUserInfo();

						} else {
							uni.setStorageSync('unionid', message.unionid)
							uni.setStorageSync('nickname', message.nickname)
							uni.setStorageSync('token', message.token)
							uni.setStorageSync('uid', message.id)
							uni.setStorageSync('phone', message.phone)



							_this.mobile = message.phone;
							let identity = message.identity;
							let isEducator = message.is_educator;
							let isBusiness = message.is_business;
							let isVendor = message.is_vendor;
							let isOther = message.is_other;

							_this.is_educator = isEducator;
							_this.is_business = isBusiness;
							_this.is_vendor = isVendor;
							_this.is_other = isOther;

							if (identity == 0) {
								uni.setStorageSync('identity', 0)
								_this.identity = 0;
							}
							if (identity == 1) {
								if (isEducator == 0) {
									uni.setStorageSync('identity', 0)
									_this.identity = 0;
								} else {
									uni.setStorageSync('identity', identity)
									_this.identity = identity;
									uni.$emit('changeIdentity', identity)
								}
							}
							if (identity == 2) {
								if (isBusiness == 0) {
									uni.setStorageSync('identity', 0)
									_this.identity = 0;
								} else {
									uni.setStorageSync('identity', identity)
									_this.identity = identity;
									uni.$emit('changeIdentity', identity)
								}
							}

							if (identity == 3) {
								if (isVendor == 0) {
									uni.setStorageSync('identity', 0)
									_this.identity = 0;
								} else {
									uni.setStorageSync('identity', identity)
									_this.identity = identity;
									uni.$emit('changeIdentity', identity)
								}
							}
							if (identity == 4) {
								if (isOther == 0) {
									uni.setStorageSync('identity', 0)
									_this.identity = 0;
								} else {
									uni.setStorageSync('identity', identity)
									_this.identity = identity;
									uni.$emit('changeIdentity', identity)
								}
							}


							if (message.language == 0) {
								uni.setStorageSync('language', 'en-US')
								_this.languageValue = 2;
							}
							if (message.language == 1) {
								uni.setStorageSync('language', 'zh-CN')
								_this.languageValue = 1;
							}
							if (message.language == 2) {
								uni.setStorageSync('language', 'en-US')
								_this.languageValue = 2;
							}

							let redirectPath = _this.redirectPath;

							if (redirectPath != undefined && redirectPath) {
								setTimeout(function() {
									uni.hideLoading();
									uni.reLaunch({
										url: '/' + redirectPath
									})
								}, 1200)

							} else {
								setTimeout(function() {
									uni.hideLoading();
									uni.reLaunch({
										url: '/pages/menu/me'
									})
								}, 1200)
							}

						}

					} else {
						uni.showToast({
							title: result.msg,
							icon: 'none'
						})
					}
				}).catch(err => {
					console.log(err)
				})
			},
			login() {
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
									_this.miniCode = loginRes.code;
									uni.authorize({
										scope: 'scope.userInfo',
										success() {
											// _this.getMiniUserInfo()
											console.log('有用户权限')
											_this.loginByCode()
										},
										fail: function(fail) {
											console.log(fail)
											_this.authUserInfoStatus = true;
											// if (fail.errMsg == 'authorize:fail 系统错误，错误码：-12007,scope unauthorized') {
											// 	_this.authUserInfoStatus = true;
											// }
										}
									})
									uni.getSetting({
										success(res) {
											let authSetting = res.authSetting
											console.log(authSetting["scope.userInfo"])
											if (authSetting["scope.userInfo"] ==
												undefined || authSetting[
													"scope.userInfo"] == false) {
												_this.authUserInfoStatus = true;
											}
										}
									})

								}
							});
						}
					}
				});
			}
		}
	}
</script>

<style>
	/* #ifdef H5 */
	@import url("./css/main.css");
	/* #endif */

	page {
		background-color: #FFFFFF;
	}

	/* #ifdef MP-WEIXIN */
	.logo {
		text-align: center;
		padding-top: 80rpx;
		margin-top: 80rpx;
		font-size: 34rpx;
		font-weight: 700;
	}

	.logo image {
		width: 400rpx;
		height: 400rpx;
	}

	.welcome {
		padding-top: 60rpx;
		text-align: center;
	}

	.welcome text {
		font-size: 34rpx;
		font-weight: 700;
	}

	.login-btn {
		margin-top: 40rpx;
	}

	.login-btn button {
		background-color: #0AA0A8;
		color: #FFFFFF;
		width: 60%;
		height: 80rpx;
		line-height: 80rpx;
		margin: 0 auto;
		font-size: 30rpx;
	}

	.auth-bg {
		position: fixed;
		width: 100%;
		height: 100%;
		z-index: 1000;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		margin: auto;
		background-color: rgba(0, 0, 0, 0.8);
		display: flex;
		align-items: center;
		justify-content: center;

	}

	.auth-userinfo {
		width: 70%;
		padding: 40rpx;
		background-color: #FFFFFF;
		border-radius: 20rpx;

	}

	.auth-userinfo button {
		width: 80%;
		line-height: 80rpx;
		background-color: #00B3D2;
		color: #FFFFFF;
		font-size: 30rpx;
		margin-top: 40rpx;
	}

	.auth-logo {
		text-align: center;
	}

	.auth-logo image {
		width: 200rpx;
		height: 200rpx;
	}

	.auth-txt {
		text-align: center;
		font-size: 28rpx;
		font-weight: 700;
	}

	/* #endif */
</style>
