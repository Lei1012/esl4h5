<template>
	<view class="uni-flex uni-column role-bg">
		<view class="flex-item role-logo animate__animated  animate__rotateIn">
			<image src="../../static/esl-logo.png" lazy-load="true"></image>
		</view>
		<view class="flex-item role-intro animate__animated  animate__lightSpeedInRight">
			<view class="role-intro-1">{{i18n.vendorapplication}}  </view>
			<view class="role-intro-2">{{i18n.vendorapplicationaboutyou}}</view>
		</view>
		<view class="flex-item role-form">
			<view class="role-form-item">
				<input type="text" name="firstname" v-model="firstname" :placeholder="i18n.vendorapplicationname">
			</view>
			<view class="role-form-item">
				<input type="number" maxlength="11" v-model="phoneValue" :placeholder="i18n.vendorapplicationphone">
			</view>
			<view class="role-form-item">
				<input type="text" v-model="jobTitle" :placeholder="i18n.basicinfojobtitle">
			</view>
			<view class="role-form-item">
				<input type="text" v-model="workEmail" :placeholder="i18n.basicinfoworkemail">
			</view>
		</view>
		<view class="role-form-done">
			<button class="btn-submit" @click="submitVendor">
				{{i18n.basicinfobuton}}
			</button>
		</view>

	</view>
</template>

<script>
	import formChecker from '../../common/formChecker.js'

	export default {
		data() {
			return {
				firstname: "",
				jobTitle: '',
				workEmail: '',
				phoneValue:''
			}
		},
		computed: {
			i18n() {
				return this.$t('index')
			}
		},
		onLoad() {
			
		},
		methods: {
			turnNationalityPage() {
				uni.navigateTo({
					url: '/pages/me/profile/countriesList'
				})
			},
			submitVendor() {
				var that = this;
				let firstname = that.firstname;
				let jobTitle = that.jobTitle;
				let workEmail = that.workEmail;
				let phoneValue = that.phoneValue;

				if (firstname.length < 1) {
					return uni.showToast({
						title: that.i18n.frstnameerror,
						icon: 'none'
					})
				}
				if(phoneValue == ''){
					return uni.showToast({
						title:this.i18n.vendorapplicationphone,
						icon:'none'
					})
				}
			
				if (jobTitle.length < 1) {
					return uni.showToast({
						title: that.i18n.jobtitleerror,
						icon: 'none'
					})

				}

				if (workEmail == '') {
					return uni.showToast({
						title: that.i18n.workemailerror,
						icon: 'none'
					})
				}


				uni.showLoading({
					mask: true,
					title: that.i18n.Verified,
					success() {
						setTimeout(function() {
							uni.navigateTo({
								url: 'vendorTwo?fname=' + firstname + '&jobTitle=' +
									jobTitle + '&workEmail=' + workEmail +'&phone='+phoneValue
							})
						}, 1000)
					}
				})
			},

		}
	}
</script>

<style>
	@import url("@/common/role/index.css");
</style>
