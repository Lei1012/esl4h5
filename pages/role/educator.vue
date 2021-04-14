<template>
	<view class="uni-flex uni-column role-bg">
		<view class=" flex-item role-logo animate__animated  animate__rotateIn">
			<image class="" src="../../static/esl-logo.png" lazy-load="true"></image>
		</view>
		<view class="flex-item role-intro animate__animated  animate__lightSpeedInRight">
			<view class="role-intro-1">{{i18n.basicinfowindowheader}}  </view>
		</view>

		<view class="flex-item role-form">
			
			<u-form :model="form" :rules="rules" ref="uForm" :error-type="errorType" label-position="top"
				:label-style="{'font-weight':700}">
				<u-form-item :label="i18n.Basicinfofirstname" prop="first_name">
					<u-input border v-model="form.first_name" :placeholder="i18n.Basicinfofirstname" />
				</u-form-item>
				<u-form-item :label="i18n.eduwechatid" prop="wx_id">
					<u-input border v-model="form.wx_id" :placeholder="i18n.eduwechatid" />
				</u-form-item>
				<u-form-item :label="i18n.nationality" prop="nationality">
					<u-input border v-model="form.nationality" :placeholder="i18n.nationality" type="select"
						@click="turnNationalityPage"></u-input>
				</u-form-item>
			</u-form>
			
			<!-- <view class="role-form-item">
				<input type="text" name="nickname" v-model="nickname" :placeholder="i18n.basicinfonickname">
			</view> -->
			<!-- 	<view class="role-form-item">
				<input type="text"  name="applyContact"  v-model="applicationContact" :placeholder="i18n.basiceduapplicationcontact"/>
			</view> -->
			<!-- 	<view class="role-form-item">
				<input type="text" name='email' v-model="email" :placeholder="i18n.basiceduemail" />
			</view> -->
			<view class="categories">
				<view class="category-title">
					{{i18n.basicinfoeducategory}}:
				</view>
				<view class="categories-tags">
					<view class="categories-tags-item" :class="selectEducatorTypeList.indexOf(item.id) == -1 ? '' : 'tag-active' "
					 v-for="(item,k) in range" :key="k" @click="selectEducatorType(item)">
						{{item.identity_name}}
					</view>
				</view>
			</view>

		</view>

		<view class="role-form-done">
			<button class="btn-submit" @click="eduSubmit">
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
				range: [],
				
				educatorType: '',
				selectEducatorTypeList: [],
				nationalitySelectStatus: false,
				
				errorType:['message'],
				form:{
					first_name:'',
					wx_id:'',
					nationality:'',
					sub_identity: '',
					country:'',
					province:'',
					city:'',
					lon:'',
					lat:'',
					apply_contact: '',
					email: '',
				},
				rules:{
					first_name: [{
						required: true,
						message: this.$t('index').frstnameerror,
						trigger: ['change', 'blur'],
					}, ],
					wx_id: [{
						required: true,
						message: this.$t('index').eduwechatidph,
						trigger: ['change', 'blur'],
					}, ],
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
		onLoad(option) {
			var that = this;
			this.subCateList()
			uni.$on('nationalityObj', function(data) {
				that.form.nationality = data;
			})
		},
		onUnload() {
			uni.$off('nationalityObj');
		},
		methods: {
			selectEducatorType(item) {
				if (this.selectEducatorTypeList.indexOf(item.id) == -1) {
					this.selectEducatorTypeList.push(item.id);
				} else {
					this.selectEducatorTypeList.splice(this.selectEducatorTypeList.indexOf(item.id), 1);
				}
				// console.log(this.selectEducatorTypeList);
			},
			turnNationalityPage() {
				uni.navigateTo({
					url: '/pages/me/profile/countriesList'
				})
			},
			subCateList: function() {
				let data = {
					pid: 1,
					tree: 1
				}
				let rangeData = [];

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
					console.log(err)
				})
			},
			eduSubmit: function(e) {

				var that = this;

				this.$refs.uForm.validate(valid => {
					if (valid) {
						console.log('验证通过');
						let educatorType = that.selectEducatorTypeList.join(',');
						
						if (that.selectEducatorTypeList.length <= 0) {
							return uni.showToast({
								title: that.i18n.categoryerror,
								icon: "none"
							})
						}
						that.form.token = uni.getStorageSync('token');
						that.form.unionid = uni.getStorageSync('unionid');
						that.form.sub_identity = educatorType;
						
						let data = Object.assign({},that.form);
						
						uni.showLoading({
							title: 'loading'
						})
						profile.addEduBasic(data).then(res => {
							// console.log(res)
							if (res.code == 200) {
								//切换身份
								let identity_data = {
									identity: 1,
									unionid: uni.getStorageSync('unionid'),
									token: uni.getStorageSync('token')
								}
								uni.setStorageSync('identity',1)
								// console.log(identity_data)
								login.changeLanguageAndIdentity(identity_data).then(res => {
									// console.log(res)
									if (res.code == 200) {
										let firstname = that.form.first_name;
										uni.reLaunch({
											url: '/pages/me/welcome?firstname=' + firstname
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
