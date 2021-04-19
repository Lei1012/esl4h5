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
		<!-- #endif -->

		<!-- #ifdef H5 -->
		<view class="login">
			<view class="content">
				<!-- 头部logo -->
				<view class="header">
					<image :src="logoImage"></image>
				</view>
				<!-- 主体表单 -->
				<view v-if="!isWechat">
					<view class="main">
						<wInput v-model="phoneData" type="number" maxlength="11" :placeholder="i18n.h5loginphone"
							:focus="isFocus">
						</wInput>
						<wInput v-if="!loginBySmsStatus" v-model="passData" type="password" maxlength="11"
							:placeholder="i18n.h5loginpassword"></wInput>
						<wInput v-if="loginBySmsStatus" v-model="verCode" type="number" maxlength="6"
							:placeholder="i18n.verificationCode" :codeText="i18n.getVerificationCode" isShowCode
							ref="runCode" setTime="10" @setCode="verifyFasong()">
						</wInput>
					</view>
					<view class="login-sms">
						<view class="login-sms-text" v-if="!loginBySmsStatus" @click="loginBySmsStatus=true">
							{{i18n.h5loginbycode}}
						</view>
						<view class="login-sms-text" v-if="loginBySmsStatus" @click="loginBySmsStatus=false">
							{{i18n.h5loginbypassword}}
						</view>
					</view>
					<wButton class="wbutton" :text="i18n.h5loginlogin" :rotate="isRotate" @click="startLogin"></wButton>
					<!-- 底部信息 -->
					<view class="footer">
						<!-- <navigator url="forget" open-type="navigate">{{i18n.h5retrievepassword}}</navigator> -->
						<!-- <text>|</text> -->
						<navigator url="register" open-type="navigate">{{i18n.h5registeredaccount}}</navigator>
					</view>
				</view>

				<!-- 微信内部浏览器登录 -->
				<view class="wechat-h5login" v-if="isWechat">
					<button type="default" @click="loginWeixin()">
						<uni-icons type="weixin" size="24" color="#ffffff"></uni-icons>
						<text>WeChat login</text>
					</button>
				</view>
				<view v-if="isWechat" class="wechat-phone-login" @click="wechatPhoneLoginStatus=true">
					Mobile phone number login
				</view>

			</view>

			<view class="vcode-popup" v-if="showvcodepopup" @click="copyPhoneCode(phoneCode)">{{phoneCode}}</view>
		</view>
		<!-- #endif -->

		<xllwechatofficialaccount :show="showOfficialStatus" @close="showOfficialStatus=false">
		</xllwechatofficialaccount>
		<xllyanzheng @result='verifyResult' ref="verifyElement"></xllyanzheng>

	</view>
</template>

<script>
	import xllyanzheng from "@/components/xll-yanzheng/xll-yanzheng.vue"
	import xllwechatofficialaccount from "@/components/xll-wechat-official-account/xll-wechat-official-account.vue";
	import profile from '@/api/profile.js';
	import login from '@/api/login.js';
	import {
		getUrlCode
	} from '@/common/util.js';
	let _this;
	import wInput from '../../components/watch-login/watch-input.vue' //input
	import wButton from '../../components/watch-login/watch-button.vue' //button

	export default {
		data() {
			var _this = this;
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
				appid: _this.$appid,
				redirect_uri: _this.$redirect_uri,
				response_type: _this.$response_type,
				scope: _this.$scope,
				state: _this.$state,

				logoImage: '/static/esl-logo.png',
				phoneData: '', //用户/电话
				passData: '', //密码
				isRotate: false, //是否加载旋转
				isFocus: true, // 是否聚焦
				// #endif
				showOfficialStatus: false,
				loginBySmsStatus: false,
				verCode: "", //验证码
				phoneCode: '',
				showvcodepopup: false,

				wechatPhoneLoginStatus: false,

			}
		},
		components: {
			wInput,
			wButton,
			xllwechatofficialaccount,
			xllyanzheng
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
				if (this.wechatPhoneLoginStatus) {
					return false;
				} else {
					return this.$isWechat()
				}

			}
			// #endif

		},
		onLoad(option) {
			
			this.redirectPath = decodeURIComponent(option.redirect);
			console.log(this.redirectPath);

			// #ifdef H5
			let wxcode = option.code;

			if (this.isWechat) {
				if (wxcode != '' && wxcode != null && wxcode != undefined) {
					this.getUserInfo(wxcode)
				}
			}
			// #endif

		},
		methods: {
			/* 校验结果回调函数 */
			verifyResult(res) {
				if (res) {
					this.$refs.verifyElement.reset(); //校验成功重置插件
					console.log('验证成功')
					this.getVerCode()
				}
				console.log(res);
			},
			/* 显示校验弹窗 */
			verifyFasong() {
				//获取验证码
				if (_this.phoneData.length != 11) {
					uni.showToast({
						icon: 'none',
						position: 'bottom',
						title: this.i18n.h5phoneerror
					});
					return false;
				}

				this.$refs.verifyElement.show();
			},
			/* 校验插件重置 */
			verifyReset() {
				this.$refs.verifyElement.reset();
			},
			copyPhoneCode(code) {
				this.verCode = JSON.stringify(code);
				this.showvcodepopup = false;
			},
			getVerCode() {
				//获取验证码
				if (_this.phoneData.length != 11) {
					uni.showToast({
						icon: 'none',
						position: 'bottom',
						title: this.i18n.h5phoneerror
					});
					return false;
				}

				let data = {
					phone: _this.phoneData
				}
				// 发送验证码 api
				login.sendCode(data).then(res => {
					console.log(res)
					if (res.code == 200) {
						this.$refs.runCode.$emit('runCode'); //触发倒计时（一般用于请求成功验证码后调用）
						let phone_code = res.message.phone_code;
						this.showvcodepopup = true;
						this.phoneCode = res.message.phone_code;

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
			getUserInfo: function(code) {
				var that = this;
				let data = {
					code: code,
					platform: 2
				}

				login.getUserInfoByWxCode(data).then(res => {
					console.log(res)
					uni.showLoading({
						title: 'logging in'
					})
					if (res.code == 200) {
						let message = res.message;
						// 用户是否注册
						let isRegistered = message.is_registered;
						// 用户已经注册
						if (isRegistered == 1) {
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

							this.mobile = phone;
							this.is_educator = isEducator;
							this.is_business = isBusiness;
							this.is_vendor = isVendor;
							this.is_other = isOther;

							uni.setStorageSync('unionid', unionid)
							uni.setStorageSync('phone', phone)
							uni.setStorageSync('nickname', nickname)
							uni.setStorageSync('token', token)
							uni.setStorageSync('uid', uid)

							if (identity == 0) {
								uni.setStorageSync('identity', 0)
								this.identity = 0;
							}
							if (identity == 1) {
								if (isEducator == 0) {
									uni.setStorageSync('identity', 0)
									this.identity = 0;
								} else {
									uni.setStorageSync('identity', identity)
									this.identity = identity;
								}
							}
							if (identity == 2) {
								if (isBusiness == 0) {
									uni.setStorageSync('identity', 0)
									this.identity = 0;
								} else {
									uni.setStorageSync('identity', identity)
									this.identity = identity;
								}
							}

							if (identity == 3) {
								if (isVendor == 0) {
									uni.setStorageSync('identity', 0)
									this.identity = 0;
								} else {
									uni.setStorageSync('identity', identity)
									this.identity = identity;
								}
							}
							if (identity == 4) {
								if (isOther == 0) {
									uni.setStorageSync('identity', 0)
									this.identity = 0;
								} else {
									uni.setStorageSync('identity', identity)
									this.identity = identity;
								}
							}
							if (message.language == 0) {
								this.languageValue = 2;
							} else {
								this.languageValue = message.language;
							}
							if (message.language == 1) {
								uni.setStorageSync('language', 'zh-CN')
							}
							if (message.language == 2) {
								uni.setStorageSync('language', 'en-US')
							}
							// #ifdef H5
							let subscribeValue = res.message.subscribe;

							if (subscribeValue === 0 && this.isWechat) {
								this.showOfficialStatus = true
							}
							// #endif
							setTimeout(function() {
								uni.hideLoading()
								uni.switchTab({
									url: '/pages/home/index'
								})
							}, 1200)
						} else {
							console.log('need bind mobile');
							uni.setStorageSync('unionid', message.unionid);
							uni.setStorageSync('openid', message.openid);
							// 我需要绑定手机号
							uni.navigateTo({
								url: '/pages/login/bindMobile'
							})

						}
					}
					if (res.code == 400) {
						uni.removeStorageSync('token')
						this.getCodeRefresh();
					}

				}).catch(err => {
					console.log(err)
				})

			},
			getCode() {
				var that = this;
				const appid = that.appid
				const redirect_uri = encodeURIComponent(that.redirect_uri)
				const response_type = that.response_type
				const scope = that.scope
				const state = that.state
				const url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + appid + '&redirect_uri=' +
					redirect_uri +
					'&response_type=' + response_type + '&scope=' + scope + '&state=' + state + '#wechat_redirect'
				// 截取地址中的code，如果没有code就去微信授权，如果已经获取到code了就直接把code传给后台获取openId
				// console.log(url)
				let code = getUrlCode('code')
				if (code === null || code === '') {
					window.location.href = url
				}

			},
			getCodeRefresh() {
				var that = this;
				const appid = that.appid
				const redirect_uri = encodeURIComponent(that.redirect_uri)
				const response_type = that.response_type
				const scope = that.scope
				const state = that.state
				const url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + appid + '&redirect_uri=' +
					redirect_uri +
					'&response_type=' + response_type + '&scope=' + scope + '&state=' + state + '#wechat_redirect'
				// 截取地址中的code，如果没有code就去微信授权，如果已经获取到code了就直接把code传给后台获取openId
				// console.log(url)
				window.location.href = url

			},
			loginWeixin() {
				this.getCode();
			},
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
				if (this.phoneData.length == 0) {
					uni.showToast({
						icon: 'none',
						title: this.i18n.h5phoneerror
					});
					return;
				}
				let data = {};
				if (this.loginBySmsStatus) {
					if (this.verCode.length != 6) {
						uni.showToast({
							icon: 'none',
							title: _this.i18n.IncorrectVerificationCode
						});
						return false;
					}
					data = {
						phone: this.phoneData,
						phone_code: this.verCode
					}

				} else {
					if (this.passData.length == 0) {
						uni.showToast({
							icon: 'none',
							title: this.i18n.h5passworderror
						});
						return;
					}
					data = {
						phone: this.phoneData,
						password: this.passData
					}
				}


				login.h5Login(data).then(res => {
					console.log(res)

					if (res.code == 200) {

						uni.showLoading({
							title: 'logging in'
						})
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

						this.mobile = phone;
						this.is_educator = isEducator;
						this.is_business = isBusiness;
						this.is_vendor = isVendor;
						this.is_other = isOther;

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

						uni.$emit('tokenUpdated', {
							token: token,
							uid: uid,
							identity: uni.getStorageSync('identity')
						})

						if (message.language == 0) {
							this.languageValue = 2;
						} else {
							this.languageValue = message.language;
						}
						if (message.language == 1) {
							uni.setStorageSync('language', 'zh-CN')
						}
						if (message.language == 2) {
							uni.setStorageSync('language', 'en-US')
						}
						
						let redirectPath = _this.redirectPath;
						
						if (redirectPath != undefined && redirectPath) {
							setTimeout(function() {
								uni.hideLoading();
								_this.isRotate = false
								uni.reLaunch({
									url: '/' + redirectPath
								})
							}, 1200)
						
						} else {
							setTimeout(function() {
								uni.hideLoading();
								_this.isRotate = false
								uni.reLaunch({
									url: '/pages/home/index'
								})
							}, 1200)
						}
						
					}
					if (res.code == 400) {

						if (res.message.error_code == 400075) {
							let phone = this.phoneData;
							uni.showLoading({
								title: 'Not registered, please register first and then log in'
							})
							setTimeout(function() {
								uni.navigateTo({
									url: '/pages/login/register?phone=' + phone,
									success() {
										uni.hideLoading()
									}
								})
							}, 2000)

						}else{
							uni.showToast({
								title:res.msg,
								icon:'none'
							})
						}
					}
				})
			},
			loginByCode(miniCode) {
				var _this = this;
				// let code = _this.miniCode;
				uni.showLoading({
					title: 'logging in',
					mask: true
				})
				login.miniWxDecode({
					code: miniCode,
					platform: 3
				}).then(result => {

					if (result.code === 200) {

						let message = result.message
						_this.miniOpenId = message.openid;
						_this.miniUnionId = message.unionid;

						if (message.is_registered == 0) {
							// _this.addMiniUserInfo();
							return uni.navigateTo({
								url: '/pages/login/bindMobile?unionid=' + message.unionid + '&openid=' +
									message.openid
							})
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
									_this.loginByCode(loginRes.code)
									// uni.authorize({
									// 	scope: 'scope.userInfo',
									// 	success() {
									// 		// _this.getMiniUserInfo()
									// 		console.log('有用户权限')
									// 		_this.loginByCode()
									// 	},
									// 	fail: function(fail) {
									// 		console.log(fail)
									// 		_this.authUserInfoStatus = true;
									// 	}
									// })
									// uni.getSetting({
									// 	success(res) {
									// 		let authSetting = res.authSetting
									// 		console.log(authSetting["scope.userInfo"])
									// 		if (authSetting["scope.userInfo"] == undefined || authSetting["scope.userInfo"] == false) {
									// 			_this.authUserInfoStatus = true;
									// 		}
									// 	}
									// })

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

	/* #endif */
</style>
