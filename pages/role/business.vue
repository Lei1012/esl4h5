<template>
	<view class="uni-flex uni-column role-bg">
		<view class="flex-item role-logo  animate__animated  animate__rotateIn">
			<image src="../../static/esl-logo.png" lazy-load="true"></image>
		</view>
		<view class="flex-item role-intro animate__animated  animate__lightSpeedInRight">
			<view class="role-intro-1">{{i18n.basicinfowindowheader}}</view>
		</view>
		<view class="flex-item role-form">
			<view class="role-form-item">
				<view class="role-form-item-label">{{i18n.Basicinfofirstname}}:</view>
				<input type="text" name="firstname" v-model="firstname" :placeholder="i18n.Basicinfofirstname">
			</view>
		<!-- 	<view class="role-form-item">
				<input type="text" name="lastname" v-model="lastname" :placeholder="i18n.basicinfolastname">
			</view> -->
			<!-- <view class="role-form-item">
				<input type="text" v-model="nickname" :placeholder="i18n.basicinfonickname">
			</view> -->
			<view class="role-form-item">
				<view class="role-form-item-label">{{i18n.basicinfojobtitle}}:</view>
				<input type="text" v-model="jobTitle" :placeholder="i18n.basicinfojobtitle">
			</view>
			<view class="role-form-item">
				<view class="role-form-item-label">{{i18n.basicinfoworkemail}}:</view>
				<input type="text" v-model="workEmail" :placeholder="i18n.basicinfoworkemail">
			</view>
			<view class="role-form-item">
				<view class="role-form-item-label">{{i18n.nationality}}:</view>
				<view class="nationality-1" v-if="nationalitySelectStatus===false" @click="turnNationalityPage">
					{{i18n.nationality}}
				</view>
				<view class="nationality-2" v-if="nationalitySelectStatus" @click="turnNationalityPage">
					{{nationality}}
				</view>
			</view>
		</view>
		<view class="role-form-done">
			<button class="btn-submit" @click="submitBusiness">
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
				nickname: '',
				jobTitle: '',
				workEmail: '',
				firstname: "",
				lastname: "",
				nationality: "",
				nationalitySelectStatus:false,

			}
		},
		computed: {
			i18n() {
				return this.$t('index')
			}
		},
		onLoad() {
			var that = this;
			uni.$on('nationalityObj',function(data){
				that.nationality= data.name;
				that.nationalitySelectStatus=true;
			})
		},
		methods: {
			turnNationalityPage() {
				uni.navigateTo({
					url: '/pages/me/profile/countriesList'
				})
			},
			submitBusiness() {
				var that = this;
			
				if (that.firstname.length < 1) {
					return uni.showToast({
						title: that.i18n.frstnameerror,
						icon: 'none'
					})
				}
				if(that.nationality == ''){
					return uni.showToast({
						title: that.i18n.nationalityerror,
						icon: "none"
					})
				}
				if (that.jobTitle.length < 1) {
					return uni.showToast({
						title: that.i18n.jobtitleerror,
						icon: 'none'
					})
				}
				if (!formChecker.checkEmail(that.workEmail)) {
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
								url: 'businessTwo?fname=' + that.firstname + '&nationality=' + that.nationality + '&nickname=' + that.nickname + '&jobTitle=' +
									that.jobTitle + '&workEmail=' + that.workEmail
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
