<template>
	<view class="uni-flex uni-column role-bg">
		<view class="flex-item role-logo animate__animated  animate__rotateIn">
			<image src="../../static/esl-logo.png" lazy-load="true"></image>
		</view>
		<view class="flex-item role-intro animate__animated  animate__lightSpeedInRight">
			{{i18n.basicinfowindowheader}}
		</view>
		<view class="flex-item role-form">

			<view class="role-form-item">
				<input type="text" name="firstname" v-model="firstname" :placeholder="i18n.Basicinfofirstname">
			</view>
			<!-- <view class="role-form-item">
				<input type="text" v-model="nickname" :placeholder="i18n.basicinfonickname">
			</view> -->
			<view class="role-form-item">
				<input type="text" name="wechatId" v-model="wechatId" :placeholder="i18n.vendorwechatid">
			</view>
			<view class="role-form-item">
				<view class="nationality-1" v-if="nationalitySelectStatus===false" @click="turnNationalityPage">
					{{i18n.nationality}}
				</view>
				<view class="nationality-2" v-if="nationalitySelectStatus" @click="turnNationalityPage">
					{{nationality}}
				</view>
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
				lastname: "",
				nickname: '',
				jobTitle: '',
				workEmail: '',
				nationality: "",
				nationalitySelectStatus: false,
				wechatId:''
			}
		},
		computed: {
			i18n() {
				return this.$t('index')
			}
		},
		onLoad() {
			var that = this;
			uni.$on('nationalityObj', function(data) {
				that.nationality = data.name;
				that.nationalitySelectStatus = true;
			})
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
				let lastname = that.lastname;
				let nickname = that.nickname;
				let jobTitle = that.jobTitle;
				let workEmail = that.workEmail;
				let nationality = that.nationality;
				let wechatId = this.wechatId;
				

				if (firstname.length < 1) {
					return uni.showToast({
						title: that.i18n.frstnameerror,
						icon: 'none'
					})
				}
				if(wechatId == ''){
					return uni.showToast({
						title:this.i18n.vendorwechatidph,
						icon:'none'
					})
				}
				if(nationality == ''){
					return uni.showToast({
						title: that.i18n.nationalityerror,
						icon: "none"
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
								url: 'vendorTwo?fname=' + firstname + '&nationality=' + nationality + '&wxid=' + wechatId + '&jobTitle=' +
									jobTitle + '&workEmail=' + workEmail
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
