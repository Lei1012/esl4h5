<template>
	<view class="forget">

		<view class="content">
			<!-- 主体 -->
			<view class="main">
				<view class="tips">{{i18n.h5forgettoptip}}</view>
				<wInput v-model="phoneData" type="text" maxlength="11" :placeholder="i18n.h5forgetph1"></wInput>
				<wInput v-model="passData" type="password" maxlength="11" :placeholder="i18n.h5forgetph2" isShowPass>
				</wInput>
				<wInput v-model="confirmPassData" type="password" maxlength="11" :placeholder="i18n.h5loginloginconfirmpassword" isShowPass>
				</wInput>
				<wInput v-model="verCode" type="number" maxlength="6" :placeholder="i18n.h5vercode"
					:codeText="i18n.h5getvercode" isShowCode ref="runCode" setTime="10" @setCode="getVerCode()">
				</wInput>
			</view>

			<wButton class="wbutton" :text="i18n.h5resetpassword" :rotate="isRotate" @click.native="startRePass()">
			</wButton>

		</view>
	</view>
</template>

<script>
	let _this;
	import wInput from '../../components/watch-login/watch-input.vue' //input
	import wButton from '../../components/watch-login/watch-button.vue' //button
	import login from '@/api/login.js';
	export default {
		data() {
			return {
				phoneData: "", //电话
				passData: "", //密码
				confirmPassData:'',
				verCode: "", //验证码
				isRotate: false, //是否加载旋转
			}
		},
		components: {
			wInput,
			wButton
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
			startRePass() {
				//重置密码
				if (this.isRotate) {
					//判断是否加载中，避免重复点击请求
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
					phone:this.phoneData,
					phone_code:this.verCode,
					password:this.passData,
					confirm_password:this.confirmPassData
				}
				login.findPassword(data).then(res=>{
					if(res.code == 200){
						console.log("重置密码成功")
						_this.isRotate = true
						uni.showLoading({
							title:'Success'
						})
						setTimeout(function() {
							_this.isRotate = false
							uni.hideLoading();
							uni.reLaunch({
								url:'/pagesC/login/index'
							})
						}, 3000)
						
					}else{
						uni.showToast({
							title:res.msg,
							icon:'none'
						})
					}
				}).catch(err=>{
					console.log(err)
				})
				

			}
		}
	}
</script>

<style>
	@import url("./css/main.css");
</style>
