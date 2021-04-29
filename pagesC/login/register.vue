<template>
	<view class="register">

		<view class="content">
			<!-- 头部logo -->
			<view class="header">
				<image :src="logoImage"></image>
			</view>
			<!-- 主体 -->
			<view class="main">
				<wInput v-model="phoneData" type="number" maxlength="11" :placeholder="i18n.h5loginphone"></wInput>
				<wInput v-model="passData" type="password" maxlength="11" :placeholder="i18n.h5loginloginpassword"
					isShowPass></wInput>
				<wInput v-model="confirmPassData" type="password" maxlength="11"
					:placeholder="i18n.h5loginloginconfirmpassword" isShowPass></wInput>
				<wInput v-model="verCode" type="number" maxlength="6" :placeholder="i18n.h5vercode"
					:codeText="i18n.h5getvercode" isShowCode ref="runCode" setTime="10" @setCode="getVerCode()">
				</wInput>
			</view>

			<wButton class="wbutton" :text="i18n.h5register" :rotate="isRotate" @click.native="startReg()"></wButton>

			<!-- 底部信息 -->
			<view class="footer">
				<uni-icons :type="showAgree?'circle-filled':'circle'" @click="isShowAgree" size="20"></uni-icons>
				<!-- 协议地址 -->
				<navigator url="/pagesD/protocol/index" open-type="navigate">{{i18n.agree}}</navigator>
			</view>
		</view>
		<view class="vcode-popup" v-if="showvcodepopup" @click="copyPhoneCode(phoneCode)">{{phoneCode}}</view>
	</view>
</template>

<script>
	let _this;
	import wInput from '../components/watch-login/watch-input.vue' //input
	import wButton from '../components/watch-login/watch-button.vue' //button
	import login from '@/api/login.js';

	export default {
		data() {
			return {
				//logo图片 base64
				logoImage: '/static/esl-logo.png',
				phoneData: '', // 用户/电话
				passData: '', //密码
				confirmPassData: '', //确认密码
				verCode: "", //验证码
				showAgree: true, //协议是否选择
				isRotate: false, //是否加载旋转

				phoneCode: '',
				showvcodepopup: false,
				is_educator: 0,
				is_business: 0,
				is_vendor: 0,
				is_other: 0,
				identity: 0, //当前身份、
				mobile: '', // 用户手机号

			}
		},
		components: {
			wInput,
			wButton,
		},
		computed: {
			i18n() {
				return this.$t('index')
			}
		},
		mounted() {
			_this = this;
		},
		onLoad(option) {
			if (option.phone) {
				this.phoneData = option.phone;
			}
		},
		methods: {
			copyPhoneCode(code) {
				this.verCode = JSON.stringify(code);
				this.showvcodepopup = false;
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
						title: this.i18n.h5phoneerror
					});
					return false;
				}

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
						title: this.i18n.h5agreementerror
					});
					return false;
				}
				if (this.phoneData.length != 11) {
					uni.showToast({
						icon: 'none',
						title: this.i18n.h5phoneerror
					});
					return false;
				}
				if (this.passData.length == 0) {
					uni.showToast({
						icon: 'none',
						title: this.i18n.h5passworderror
					});
					return false;
				}
				if (this.confirmPassData.length == 0 || this.confirmPassData != this.passData) {
					uni.showToast({
						icon: 'none',
						title: this.i18n.h5confirmpassworderror
					});
					return false;
				}
				if (this.verCode.length == 0) {
					uni.showToast({
						icon: 'none',
						title: this.i18n.h5vercodeerror
					});
					return false;
				}

				let data = {
					phone: this.phoneData,
					phone_code: this.verCode,
					password: this.passData,
					confirm_password: this.confirmPassData
				}

				login.h5Login(data).then(res => {
					console.log(res)
					if (res.code == 200) {
						_this.isRotate = true
						uni.showLoading({
							title: 'Sign up'
						})
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
						
						uni.$emit('tokenUpdated',{token:token,uid:uid,identity:uni.getStorageSync('identity')})
						
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

						setTimeout(function() {
							uni.hideLoading()
							_this.isRotate = false
							uni.switchTab({
								url: '/pages/home/index'
							})
						}, 3000)

					} else {
						uni.showToast({
							title: res.msg,
							icon: "none"
						})
					}
				}).catch(err => {
					console.log(err)
				})

			}
		}
	}
</script>

<style>
	@import url("./css/main.css");
</style>
