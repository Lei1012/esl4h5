<template>
	<view class="register">
		<view class="content">
			<!-- 头部logo -->
			<view class="header">
				<image src="/static/esl-logo.png" lazy-load="true"></image>
			</view>
			<!-- 主体 -->
			<view class="main">
				<wInput v-model="phoneData" type="number" maxlength="11" :placeholder="i18n.mobile"></wInput>
				<wInput v-model="verCode" type="number" maxlength="6" :placeholder="i18n.verificationCode" :codeText="i18n.getVerificationCode"
				 isShowCode ref="runCode" setTime="10" @setCode="getVerCode()"></wInput>
			</view>
			<wButton class="wbutton" :text="i18n.bindMobile" :rotate="isRotate" @click.native="startReg()"></wButton>
			<!-- 底部信息 -->
			<view class="footer">
				<text @tap="isShowAgree" class="cuIcon" :class="showAgree?'cuIcon-radiobox':'cuIcon-round'"></text>
				<!-- 协议地址 -->
				<navigator url="../protocol/index" open-type="navigate"> {{i18n.agree}}</navigator>
			</view>
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
				roleValue: 0,
				language: 0,
				showvcodepopup:false,
				phoneCode:''
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
			}
		},
		onLoad(option) {
			var _this = this;
			_this.roleValue = option.roleValue;
			_this.language = option.language;
			// #ifdef MP-WEIXIN
			let token = uni.getStorageSync('token');
			if (token == '') {
				var pages = getCurrentPages(); // 当前页面
				var currentPagePath = pages[pages.length - 1]; // 前一个页面
				
				if(currentPagePath.route == 'pages/login/index'){
					return;
				}
				let redirectUrl = currentPagePath.route + '?roleValue='+option.roleValue;
				console.log(encodeURIComponent(redirectUrl))
				return uni.navigateTo({
					url: '/pages/login/index?redirect='+ encodeURIComponent(redirectUrl)
				})
			}
			// #endif
		},
		methods: {
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
					unionid: uni.getStorageSync('unionid'),
					// unionid: 3,
					phone: _this.phoneData
				}
				// 发送验证码 api
				login.sendCode(data).then(
					res => {
						console.log(res)
						if (res.code == 200) {
							this.$refs.runCode.$emit('runCode'); //触发倒计时（一般用于请求成功验证码后调用）
							// let phone_code = res.message.phone_code;
							// this.showvcodepopup=true;
							// this.phoneCode=res.message.phone_code;
							return uni.showToast({
								title:"Success",
								duration:2000,
								icon:'success'
							})
						}
						if (res.code == 400) {
							uni.showToast({
								title: res.msg,
								icon: 'none'
							})
						}
					}).catch(err => {
					// console.log(err)
					uni.showToast({
						title: err.msg,
						icon: 'none'
					})
				})

				
				// uni.showToast({
				// 	icon: 'none',
				// 	position: 'bottom',
				// 	title: '模拟倒计时触发'
				// });

				setTimeout(function() {
					_this.$refs.runCode.$emit('runCode', 0); //假装模拟下需要 终止倒计时
					// uni.showToast({
					// 	icon: 'none',
					// 	position: 'bottom',
					// 	title: '模拟倒计时终止'
					// });
				}, 10000)
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
				console.log("注册成功")
				let bindData = {
					unionid: uni.getStorageSync('unionid'),
					phone: _this.phoneData,
					code: _this.verCode,
					identity: _this.roleValue,
					language: _this.language,
				}

				// 验证身份api
				login.bindIdentity(bindData).then(res => {
					if (res.code == 200) {
						_this.isRotate = true
						setTimeout(function() {
							// uni.showToast({
							// 	title: res.msg,
							// 	icon: 'none',
							// })
							_this.isRotate = false;
							if (_this.roleValue == 1) {
								uni.navigateTo({
									url: 'educator'
								})
							}
							if (_this.roleValue == 2) {
								uni.navigateTo({
									url: 'business'
								})
							}
							if (_this.roleValue == 3) {
								uni.navigateTo({
									url: 'vendor'
								})
							}
							if (_this.roleValue == 4) {
								uni.reLaunch({
									url: '/pages/home/index'
								})
							}
						}, 1000)


					}else{
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
					}
					
				}).catch(err => {
					console.log(err)
				})

			},
			copyPhoneCode(code){
				this.verCode =JSON.stringify(code);
				this.showvcodepopup=false;
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
	
	.vcode-popup{
		position: fixed;
		z-index: 1000;
		background-color:rgba(0,0,0,1);
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
</style>
