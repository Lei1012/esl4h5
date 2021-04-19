<template>
	<view class="uni-flex uni-column role-bg">
		<view class="flex-item role-logo animate__animated  animate__rotateIn">
			<image src="../../static/esl-logo.png" lazy-load="true"></image>
		</view>
		<view class="flex-item role-intro animate__animated  animate__lightSpeedInRight">
			<view class="role-intro-1">{{i18n.businessinfowindowheader}}</view>
		</view>
		<view class="flex-item role-form">

			<u-form :model="form" :rules="rules" ref="uForm" :error-type="errorType" label-position="top"
				:label-style="{'font-weight':700}">
				<u-form-item :label="i18n.businessname" prop="business_name">
					<u-input border v-model="form.business_name" :placeholder="i18n.businessname" />
				</u-form-item>
				<u-form-item :label="i18n.vendorlocation" prop="location">
					<u-input border v-model="form.location" :placeholder="i18n.basicbusinesstwochooselocation" type="select"
						@click="chooseLocation()" />
				</u-form-item>
				<u-form-item :label="i18n.businesscategory">
					<view class="categories-content">
						<view class="categories-tags" v-for="(item,k) in range" :key="k">
							<view v-if="item['children'].length>0" class="category-parent">{{item.identity_name}}</view>
							<view v-if="item['children'].length===0" class="categories-tags-item"
								:class="selectBusinessTypeList.indexOf(item) == -1 ? '' : 'tag-active' "
								@click="selectBusinessType(item)">{{item.identity_name}}</view>
							<view class="categories-tags-item" v-for="(child,key) in item['children']" :key="key"
								:class="selectBusinessTypeList.indexOf(child) == -1 ? '' : 'tag-active' "
								@click="selectBusinessType(child)">
								{{child.identity_name}}
							</view>
						</view>
					</view>
				</u-form-item>

			</u-form>
			
		</view>
		<view class="role-form-done">
			<button class="btn-submit" @click="submitBusinessTwo">
				{{i18n.basicinfobuton}}
			</button>
		</view>
	</view>

</template>

<script>
	import profile from '@/api/profile.js'
	import login from '@/api/login.js'

	export default {
		data() {
			return {
				selectBusinessTypeStr: '',
				selectBusinessTypeList: [],
				range: [],

				formStepOneData: {},
				errorType: ['message'],
				form: {
					business_name: '',
					location: '',
					province: '',
					city: '',
					district: '',
					business_type_id: '',
					business_type_name: ''
				},
				rules: {
					business_name: [{
						required: true,
						message: this.$t('index').businessnameerror,
						trigger: ['change', 'blur'],
					}, ],
					location: [{
						required: true,
						message: this.$t('index').basicbusinesstwochooselocation,
						trigger: ['change', 'blur'],
					}],
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
				let formData = JSON.parse(option.formStr)
				console.log(formData)
				that.formStepOneData = formData;
			}

			this.subCateList()
			uni.$on('locationEvent', function(data) {
				// console.log(data)
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
			chooseLocation() {
				uni.navigateTo({
					url: '/pages/location/location'
				})
			},
			selectBusinessType(item) {
				// console.log(item);
				if (this.selectBusinessTypeList.indexOf(item) == -1) {
					if (this.selectBusinessTypeList.length > 0) {
						let len = this.selectBusinessTypeList.length - 1;
						this.selectBusinessTypeList.splice(len, 1);
					}
					this.selectBusinessTypeList.push(item);
				} else {
					this.selectBusinessTypeList.splice(this.selectBusinessTypeList.indexOf(item), 1);
				}

				// console.log(this.selectBusinessTypeList);
			},
			subCateList: function() {
				let data = {
					pid: 2,
					tree: 1
				}
				let rangeData = [];
				profile.getSubCateList(data).then(res => {
					console.log(res)
					if (res.code == 200) {
						this.range = res.message
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
			submitBusinessTwo: function() {
				//将下列代码加入到对应的检查位置
				//定义表单规则
				var that = this;

				this.$refs.uForm.validate(valid => {
					if (valid) {
						console.log('验证通过');
						if (that.selectBusinessTypeList.length < 1) {
							return uni.showToast({
								title: that.i18n.businesscategoryerror,
								icon: "none"
							})
						}

						let businessTypeId;
						let businessTypeName;
						that.selectBusinessTypeList.forEach(item => {
							businessTypeId = item.id;
							businessTypeName = item.identity_name;
						})
						that.form.token = uni.getStorageSync('token');
						that.form.business_type_id = businessTypeId;
						that.form.business_type_name = businessTypeName;
						let data = Object.assign(that.formStepOneData, that.form)

						console.log(data)
						uni.showLoading({
							title: 'loading'
						})

						profile.addBusinessBasic(data).then(res => {
							if (res.code == 200) {
								//切换身份
								let identity_data = {
									identity: 2,
									unionid: uni.getStorageSync('unionid'),
									token: uni.getStorageSync('token')
								}
								let firstname = that.formStepOneData.first_name;
								login.changeLanguageAndIdentity(identity_data).then(res => {
									if (res.code == 200) {
										uni.reLaunch({
											url: '/pages/me/welcome?firstname=' +
												firstname,
											success() {
												uni.setStorageSync('identity', 2)
												uni.hideLoading();
											}
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
								//end
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
