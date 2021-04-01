<template>
	<view class="register">

		<view class="content">
			<!-- 头部logo -->
			<view class="header">
				<image :src="logoImage"></image>
			</view>
			<!-- 主体 -->
			<view class="main">
				<wInput v-model="phoneData" type="text" maxlength="11" :placeholder="i18n.h5loginphone"></wInput>
				<wInput v-model="passData" type="password" maxlength="11" :placeholder="i18n.h5loginloginpassword"
					isShowPass></wInput>
				<wInput v-model="verCode" type="number" maxlength="4" :placeholder="i18n.h5vercode"
					:codeText="i18n.h5getvercode" isShowCode ref="runCode" @setCode="getVerCode()"></wInput>

			</view>

			<wButton class="wbutton" :text="i18n.h5register" :rotate="isRotate" @click.native="startReg()"></wButton>

			<!-- 底部信息 -->
			<view class="footer">
				<uni-icons :type="showAgree?'circle-filled':'circle'" @click="isShowAgree" size="20"></uni-icons>
				<!-- 协议地址 -->
				<navigator url="../protocol/index" open-type="navigate">{{i18n.agree}}</navigator>
			</view>
		</view>
	</view>
</template>

<script>
	let _this;
	import wInput from '../../components/watch-login/watch-input.vue' //input
	import wButton from '../../components/watch-login/watch-button.vue' //button

	export default {
		data() {
			return {
				//logo图片 base64
				logoImage: '/static/esl-logo.png',
				phoneData: '', // 用户/电话
				passData: '', //密码
				verCode: "", //验证码
				showAgree: true, //协议是否选择
				isRotate: false, //是否加载旋转
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
						title: this.i18n.h5phoneerror
					});
					return false;
				}
				console.log("获取验证码")
				this.$refs.runCode.$emit('runCode'); //触发倒计时（一般用于请求成功验证码后调用）
				uni.showToast({
					icon: 'none',
					position: 'bottom',
					title: '模拟倒计时触发'
				});

				setTimeout(function() {
					_this.$refs.runCode.$emit('runCode', 0); //假装模拟下需要 终止倒计时
					uni.showToast({
						icon: 'none',
						position: 'bottom',
						title: '模拟倒计时终止'
					});
				}, 3000)
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
						title: this.i18n.h5agreementerror
					});
					return false;
				}
				if (this.phoneData.length != 11) {
					uni.showToast({
						icon: 'none',
						position: 'bottom',
						title: this.i18n.h5phoneerror
					});
					return false;
				}
				if (this.passData.length < 6) {
					uni.showToast({
						icon: 'none',
						position: 'bottom',
						title: this.i18n.h5passworderror
					});
					return false;
				}
				if (this.verCode.length != 4) {
					uni.showToast({
						icon: 'none',
						position: 'bottom',
						title: this.i18n.h5vercodeerror
					});
					return false;
				}
				console.log("注册成功")
				_this.isRotate = true
				setTimeout(function() {
					_this.isRotate = false
				}, 3000)
			}
		}
	}
</script>

<style>
	@import url("./css/main.css");
</style>
