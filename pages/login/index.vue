<template>
	<view class="uni-column uni-flex container">
		<view class="logo">
			<image src="@/static/esl-logo.png" mode="aspectFill"></image>
		</view>
		<view class="welcome">
			<text>Welcome to ESL Passport!</text>
		</view>
		<view class="login-btn">
			<button @click="login()" type="default">Enter</button>
		</view>

		<!-- #ifdef MP-WEIXIN -->
		<view class="auth-bg" v-if="authUserInfoStatus">
			<view class="auth-userinfo">
				<view class="auth-logo">
					<image src="@/static/esl-logo.png" mode="aspectFill"></image>
				</view>
				<button type="default" open-type="getUserInfo"
					@getuserinfo="getMiniUserInfo">{{i18n.authorizeforlogin}}</button>
			</view>
		</view>
		<!-- #endif -->
	</view>
</template>

<script>
	import profile from '@/api/profile.js';
	import login from '@/api/login.js';

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

				miniCode: ''

			}
		},
		computed: {
			i18n() {
				return this.$t('index')
			}
		},
		onLoad(option) {
			var pages = getCurrentPages(); // 当前页面
			var beforePage = pages[pages.length - 2]; // 前一个页面
			console.log(beforePage.route)

		},
		methods: {
			getMiniUserInfo(e) {
				console.log(e)
				this.loginByCode()
			},
			addMiniUserInfo() {
				var _this = this;
				// 获取用户信息
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
							language: userInfo.language,
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
										uni.setStorageSync('identity', res.message.identity)
										_this.is_educator = res.message.is_educator;
										_this.is_business = res.message.is_business;
										_this.is_vendor = res.message.is_vendor;
										_this.is_other = res.message.is_other;
										_this.identity = res.message.identity;
										_this.mobile = res.message.phone;
										var pages = getCurrentPages(); // 当前页面
										var beforePage = pages[pages.length - 2]; // 前一个页面
										console.log(beforePage)
										uni.removeStorageSync('relogin')
										uni.reLaunch({
											url: '/' + beforePage.route
										})

										// uni.reLaunch({
										// 	url:'/pages/home/index'
										// })

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
							uni.setStorageSync('identity', message.identity)

							_this.is_educator = message.is_educator;
							_this.is_business = message.is_business;
							_this.is_vendor = message.is_vendor;
							_this.is_other = message.is_other;
							_this.identity = message.identity;
							_this.mobile = message.phone;

							if (message.language == 0) {
								_this.languageValue = 2;
							} else {
								_this.languageValue = message.language;
							}
							if (message.language == 1) {
								uni.setStorageSync('language', 'zh-CN')
							}
							if (message.language == 2) {
								uni.setStorageSync('language', 'en-US')
							}

							var pages = getCurrentPages(); // 当前页面
							var beforePage = pages[pages.length - 2]; // 前一个页面
							console.log(beforePage.route)
							uni.removeStorageSync('relogin')
							uni.reLaunch({
								url: '/' + beforePage.route
							})
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
	page {
		background-color: #FFFFFF;
	}

	.logo {
		text-align: center;
		padding-top: 80rpx;
		margin-top: 80rpx;
	}

	.logo image {
		width: 200rpx;
		height: 200rpx;
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
		margin-top: 140rpx;
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
</style>
