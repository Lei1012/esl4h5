<template>
	<view class="uni-flex uni-column role-bg">
		<view class="flex-item role-logo animate__animated  animate__rotateIn">
			<image src="@/static/esl-logo.png" lazy-load="true"></image>
		</view>
		<view class="flex-item role-intro animate__animated  animate__lightSpeedInRight">
			<view class="role-intro-1">{{i18n.vendorapplication}} </view>
			<view class="role-intro-2">{{i18n.vendorapplicationaboutyou}}</view>
		</view>
		<view class="flex-item role-form">

			<u-form :model="form" :rules="rules" ref="uForm" :error-type="errorType" label-position="top"
				:label-style="{'font-weight':700}">
				<u-form-item :label="i18n.vendorapplicationname" prop="first_name">
					<u-input border v-model="form.first_name" :placeholder="i18n.vendorapplicationname" />
				</u-form-item>
				<u-form-item :label="i18n.vendorapplicationphone" prop="phone">
					<u-input border type="number"  v-model="form.phone" :placeholder="i18n.vendorapplicationphone" />
				</u-form-item>
				<u-form-item :label="i18n.basicinfojobtitle" prop="job_title">
					<u-input border v-model="form.job_title" :placeholder="i18n.basicinfojobtitle" />
				</u-form-item>
				<u-form-item :label="i18n.basicinfoworkemail" prop="work_email">
					<u-input border v-model="form.work_email" :placeholder="i18n.basicinfoworkemail" />
				</u-form-item>
			</u-form>

		</view>
		<view class="role-form-done">
			<button class="btn-submit" @click="submitVendor">
				{{i18n.basicinfobuton}}
			</button>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				firstname: "",
				jobTitle: '',
				workEmail: '',
				phoneValue: '',

				errorType: ['message'],
				form: {
					first_name: '',
					phone: '',
					job_title: '',
					work_email: '',
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
					phone: [{
							required: true,
							message: this.$t('index').vendorapplicationphone,
							trigger: ['change', 'blur'],
						},
						{
							// 自定义验证函数，见上说明
							validator: (rule, value, callback) => {
								// 上面有说，返回true表示校验通过，返回false表示不通过
								// this.$u.test.mobile()就是返回true或者false的
								return this.$u.test.mobile(value);
							},
							message:  this.$t('index').h5phoneerror,
							// 触发器可以同时用blur和change
							trigger: ['change', 'blur'],
						}
					]
				},

			}
		},
		computed: {
			i18n() {
				return this.$t('index')
			}
		},
		onLoad(option) {
			
			let token = uni.getStorageSync('token');
			if (!token) {
				var pages = getCurrentPages(); // 当前页面
				var currentPagePath = pages[pages.length - 1]; // 前一个页面
				
				if(currentPagePath.route == 'pagesC/login/index'){
					return;
				}
				let redirectUrl = currentPagePath.route;
				console.log(encodeURIComponent(redirectUrl))
				return uni.navigateTo({
					url: '/pagesC/login/index?redirect='+ encodeURIComponent(redirectUrl)
				})
			}
			
		},
		methods: {
			turnNationalityPage() {
				uni.navigateTo({
					url: '/pagesB/me/profile/countriesList'
				})
			},
			submitVendor() {
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
										url: 'vendorTwo?formStr='+formStr
									})
								}, 1000)
							}
						})
						
					} else {
						console.log(that.i18n.yanzhengshibai)
						return;
						console.log('验证失败');
						uni.showToast({
							title:that.i18n.yanzhengshibai,
							icon:'none'
						})
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
