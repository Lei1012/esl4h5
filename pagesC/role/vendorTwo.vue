<template>
	<view class="uni-flex uni-column role-bg">
		<view class="flex-item role-logo animate__animated  animate__rotateIn">
			<image src="@/static/esl-logo.png" lazy-load="true"></image>
		</view>
		<view class="flex-item role-intro animate__animated  animate__lightSpeedInRight">
			<view class="role-intro-1">{{i18n.vendorapplication}} </view>
			<view class="role-intro-2">{{i18n.vendorapplicationbusinfo}}</view>
		</view>

		<view class="flex-item role-form">

			<u-form :model="form" :rules="rules" ref="uForm" :error-type="errorType" label-position="top"
				:label-style="{'font-weight':700}">
				<u-form-item :label="i18n.profilecompanynameen" prop="vendor_name_en">
					<u-input border v-model="form.vendor_name_en" :placeholder="i18n.vendorcompanynameen" />
				</u-form-item>
				<u-form-item prop="legal_company_name">
					<u-input border v-model="form.legal_company_name" :placeholder="i18n.vendorcompanynamecn" />
				</u-form-item>

				<u-form-item :label="i18n.vendorcompanywebsite" prop="website">
					<u-input border type="text" v-model="form.website" :placeholder="i18n.vendorcompanywebsite" />
				</u-form-item>
				<u-form-item :label="i18n.vendorlocation" prop="location">
					<u-input border v-model="form.location" :placeholder="i18n.vendorlocation" type="select"
						@click="chooseLocation()" />
				</u-form-item>

				<u-form-item :label="i18n.vendorcategory">
					<view class="categories-tags">
						<view class="categories-tags-item" v-for="(item,k) in range" :key="k"
							:class="selectVendorTypeList.indexOf(item) == -1 ? '' : 'tag-active' "
							@click="selectVendorType(item)">
							{{item.identity_name}}
						</view>
					</view>
				</u-form-item>

				<u-form-item :label="i18n.vendorproposeddeal" prop="proposed_deal">
					<view class="xll-view">
						<u-input type="textarea" v-model="form.proposed_deal" :height="150" :maxlength="200" autoHeight
							border :placeholder="i18n.vendorproposeddealph" />
					</view>
					<view class="textarea-number">{{form.proposed_deal.length}}/200</view>
				</u-form-item>

			</u-form>

		</view>
		<view class="agreement" @click="agreeStatus=!agreeStatus">
			<uni-icons :type="agreeStatus ? 'circle-filled' : 'circle'"></uni-icons>
			I understand my application is subject to approval. 我明白申请和参加商户计划需要由ESL Passport批准.
		</view>
		<view class="role-form-done">
			<button class="btn-submit" @click="submitVendorTwo">
				{{i18n.basicinfobuton}}
			</button>
		</view>
	</view>
</template>

<script>
	import tkiTree from "@/components/tki-tree/tki-tree.vue"
	import profile from '@/api/profile.js'
	import login from '@/api/login.js'

	export default {
		data() {
			return {
				range: [],
				selectVendorTypeList: [],
				agreeStatus: false,
				errorType: ['message'],
				formStepOneData: {},
				form: {
					location: '',
					province: '',
					city: "",
					district: '',
					website: '',
					proposed_deal: '',
					vendor_type_id: '',
					vendor_type_name: '',
					vendor_name_en: '',
					legal_company_name: ''
				},
				rules: {
					vendor_name_en: [{
						required: true,
						message: this.$t('index').vendorcompanyenerror,
						trigger: ['change', 'blur'],
					}],
					legal_company_name: [{
						required: false,
						message: this.$t('index').vendorcompanycnerror,
						trigger: ['change', 'blur'],
					}],
					website: [{
						required: false,
						message: this.$t('index').vendorcompanywebsiteerror,
						trigger: ['change', 'blur'],
					}],
					location: [{
						required: true,
						message: this.$t('index').vendorcompanylocationerror,
						trigger: ['change', 'blur'],
					}],
					proposed_deal: [{
						required: true,
						message: this.$t('index').vendorproposeddealerror,
						trigger: ['change', 'blur'],
					}]
				}

			}
		},
		onUnload() {
			uni.$off('locationEvent');
		},
		onLoad(option) {
			var that = this;
			// 接收第一步传参
			if (option.formStr) {
				that.formStepOneData = JSON.parse(option.formStr);
			}

			this.subCateList()
			uni.$on('locationEvent', function(data) {
				console.log(data)
				that.form.province = data.province;
				that.form.city = data.city;
				that.form.district = data.area;
				that.form.location = data.area + ', ' + data.city + ', ' + data.province;
			})

		},
		computed: {
			i18n() {
				return this.$t('index')
			}
		},
		methods: {
			agree(e) {
				console.log(e)
			},
			chooseLocation() {
				uni.navigateTo({
					url: '/pagesD/location/location'
				})
			},
			selectVendorType(item) {
				// console.log(item);
				if (this.selectVendorTypeList.indexOf(item) == -1) {
					if (this.selectVendorTypeList.length > 0) {
						let len = this.selectVendorTypeList.length - 1;
						this.selectVendorTypeList.splice(len, 1);
					}
					this.selectVendorTypeList.push(item);
				} else {
					this.selectVendorTypeList.splice(this.selectVendorTypeList.indexOf(item), 1);
				}

				console.log(this.selectVendorTypeList);
			},
			subCateList: function() {
				let data = {
					pid: 3,
					tree: 1
				}
				profile.getSubCateLists(data).then(res => {
					// console.log(res)
					if (res.code == 200) {
						this.range = res.message;
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
			submitVendorTwo: function() {
				//定义表单规则
				var that = this;
				this.$refs.uForm.validate(valid => {
					if (valid) {
						console.log('验证通过');
						if (that.selectVendorTypeList.length <= 0) {
							return uni.showToast({
								title: this.i18n.vendorcategoryerror,
								icon: "none"
							})
						}
						if (!that.agreeStatus) {
							return uni.showToast({
								title: 'Please acknowledge need for approval',
								icon: "none"
							})
						}

						that.selectVendorTypeList.forEach(item => {
							that.form.vendor_type_id = item.id;
							that.form.vendor_type_name = item.identity_name;
						})

						let stepOneData = this.formStepOneData;
						that.form.token = uni.getStorageSync('token');

						let data = Object.assign(stepOneData, that.form);
						uni.showLoading({
							title: 'loading'
						})

						profile.addVendorBasic(data).then(res => {
							if (res.code == 200) {
								//切换身份
								let identity_data = {
									identity: 3,
									unionid: uni.getStorageSync('unionid'),
									token: uni.getStorageSync('token')
								}
								login.changeLanguageAndIdentity(identity_data).then(res => {
									if (res.code == 200) {
										uni.setStorageSync('identity', 3);
										uni.hideLoading();
										uni.navigateTo({
											url: '/pagesB/me/profile/photo?type=8&vprofile=1'
										})

									} else {
										uni.showToast({
											title: res.msg,
											icon: 'none'
										})
									}

								}).catch(err => {
									console.log(err)
								})

							} else {
								uni.showToast({
									title: res.msg,
									icon: "none"
								})
							}
						}).catch(err => {
							console.log(err)
						})


					} else {
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
			console.log('on ready')
			this.$refs.uForm.setRules(this.rules);
		}
	}
</script>

<style>
	@import url("@/common/role/index.css");
	@import url("@/common/home/uview-xll.css");

	.form-company {
		width: 100%;
	}

	.form-company-label {
		font-size: 32rpx;
		text-align: left;
		color: #000000;
		font-weight: 700;
	}

	.company-en,
	.company-cn {
		margin-top: 10rpx;
		height: 80rpx;
		border-radius: 10rpx;
	}

	.agreement {
		width: 96%;
		margin: 20rpx auto 0;
		padding: 20rpx;
		font-size: 24rpx;
		line-height: 40rpx;
	}
</style>
