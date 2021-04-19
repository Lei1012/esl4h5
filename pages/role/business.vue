<template>
	<view class="uni-flex uni-column role-bg">
		<view class="flex-item role-logo  animate__animated  animate__rotateIn">
			<image src="../../static/esl-logo.png" lazy-load="true"></image>
		</view>
		<view class="flex-item role-intro animate__animated  animate__lightSpeedInRight">
			<view class="role-intro-1">{{i18n.basicinfowindowheader}}</view>
		</view>
		<view class="flex-item role-form">

			<u-form :model="form" :rules="rules" ref="uForm" :error-type="errorType" label-position="top"
				:label-style="{'font-weight':700}">
				<u-form-item :label="i18n.Basicinfofirstname" prop="first_name">
					<u-input border v-model="form.first_name" :placeholder="i18n.Basicinfofirstname" />
				</u-form-item>
				<u-form-item :label="i18n.basicinfojobtitle" prop="job_title">
					<u-input border v-model="form.job_title" :placeholder="i18n.basicinfojobtitle" />
				</u-form-item>
				<u-form-item :label="i18n.basicinfoworkemail" prop="work_email">
					<u-input border v-model="form.work_email" :placeholder="i18n.basicinfoworkemail" />
				</u-form-item>
				<u-form-item :label="i18n.nationality" prop="nationality">
					<u-input border v-model="form.nationality" :placeholder="i18n.nationality" type="select"
						@click="turnNationalityPage"></u-input>
				</u-form-item>
			</u-form>
			
		</view>
		<view class="role-form-done">
			<button class="btn-submit" @click="submitBusiness">
				{{i18n.basicinfobuton}}
			</button>
		</view>
	</view>
</template>

<script>
	
	export default {
		data() {
			var _this = this;
			return {
				
				errorType: ['message'],
				form: {
					first_name: "",
					job_title: '',
					work_email: '',
					nationality: ''
				},
				rules: {
					first_name: [{
						required: true,
						message: this.$t('index').frstnameerror,
						trigger: ['change', 'blur'],
					}, ],
					job_title: [{
						required: true,
						message: this.$t('index').jobtitleerror,
						trigger: ['change', 'blur'],
					}],
					work_email: [{
						required: true,
						type: 'email',
						message: this.$t('index').workemailerror,
						trigger: ['change', 'blur'],
					}],
					nationality: [{
						required: true,
						message: this.$t('index').nationalityerror,
						trigger: ['change', 'blur'],
					}]
				}

			}
		},
		computed: {
			i18n() {
				return this.$t('index')
			}
		},
		onUnload() {
			uni.$off('nationalityObj');
		},
		onLoad() {
			var that = this;
			uni.$on('nationalityObj', function(data) {
				that.form.nationality = data;
			})
			
			let token = uni.getStorageSync('token');
			if (!token) {
				var pages = getCurrentPages(); // 当前页面
				var currentPagePath = pages[pages.length - 1]; // 前一个页面
				
				if(currentPagePath.route == 'pages/login/index'){
					return;
				}
				let redirectUrl = currentPagePath.route;
				console.log(encodeURIComponent(redirectUrl))
				return uni.navigateTo({
					url: '/pages/login/index?redirect='+ encodeURIComponent(redirectUrl)
				})
			}
		},
		methods: {
			turnNationalityPage() {
				uni.navigateTo({
					url: '/pages/me/profile/countriesList'
				})
			},
			submitBusiness() {
				var that = this;
				let formStr = JSON.stringify(that.form)
				this.$refs.uForm.validate(valid => {
					if (valid) {
						console.log('验证通过');
						uni.showLoading({
							mask: true,
							title: that.i18n.Verified,
							success() {
								setTimeout(function() {
									uni.navigateTo({
										url: 'businessTwo?formStr=' + formStr
									})
								}, 1000)
							}
						})
						
					} else {
						console.log('验证失败');
					}
				});
			},
			

		},
		onReady() {
			this.$refs.uForm.setRules(this.rules);
		}

	}
</script>

<style>
	@import url("@/common/role/index.css");
</style>
