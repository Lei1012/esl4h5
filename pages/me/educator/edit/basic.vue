<template>
	<view>
		<view class="uni-flex uni-column me-edit-bg">
			<view class="flex-item me-edit-title">
				<text v-if="isFirstEdit==1">{{i18n.aboutyoupgtxt}}</text>
				<text v-if="isFirstEdit!=1">{{i18n.profileeditbasicinfo}}</text>
			</view>
			<view class="flex-item me-edit-form">
				<u-form :model="form" :rules="rules" ref="uForm" :error-type="errorType" label-position="top"
					:label-style="{'font-weight':700}">
					<u-form-item :label="i18n.profilefirstname" prop="first_name">
						<u-input border v-model="form.first_name" :placeholder="i18n.profilefirstname" />
					</u-form-item>
					<u-form-item :label="i18n.profilelastname" prop="last_name">
						<u-input border v-model="form.last_name" :placeholder="i18n.profilelastname" />
					</u-form-item>
					<u-form-item :label="i18n.profilenickname" prop="nickname">
						<u-input border v-model="form.nickname" :placeholder="i18n.profilenickname" />
					</u-form-item>
					<u-form-item :label="i18n.basiceduemail" prop="email">
						<u-input border v-model="form.email" :placeholder="i18n.basiceduemail" />
					</u-form-item>
					<u-form-item :label="i18n.educatorwechatid" prop="wx_id">
						<u-input border v-model="form.wx_id" :placeholder="i18n.educatorwechatid" />
					</u-form-item>
					<u-form-item :label="i18n.profilegender" prop="sex_name">
						<u-input border v-model="form.sex_name" :placeholder="i18n.profilechoosegender" type="select"
							@click="showgenderPicker" />
					</u-form-item>
					<u-form-item :label="i18n.profilenationality" prop="nationality">
						<u-input border v-model="form.nationality" :placeholder="i18n.profilechoosenationality"
							type="select" @click="turnNationalityPage" />
					</u-form-item>
					<u-form-item :label="i18n.birthdate" prop="birthday">
						<u-input border v-model="form.birthday" :placeholder="i18n.birthdate" type="select"
							@click="birthdateShow=true" />
						<u-picker :show-time-tag="false" confirm-text="Confirm" cancel-text="Cancel"
							v-model="birthdateShow" mode="time" @confirm="birthdateConfirm"></u-picker>
					</u-form-item>
					<u-form-item :label="i18n.location" prop="location">
						<u-input border v-model="form.location" :placeholder="i18n.basicbusinesstwochooselocation"
							type="select" @click="chooseLocation" />
					</u-form-item>
				</u-form>

				<view class="role-form-type-1">
					<text>{{i18n.basicinfoeducategory}}</text>
				</view>
				<view class="categories-tags">
					<view class="categories-tags-item"
						:class="selectEducatorTypeList.indexOf(item.id) == -1 ? '' : 'tag-active' "
						v-for="(item,k) in range" :key="k" @click="selectEducatorType(item)">
						{{item.identity_name}}
					</view>
				</view>
				<view class="me-edit-form-job-seeking">
					{{i18n.jobseeking}}
					<switch style="margin-left: 20rpx;transform:scale(0.6)" :checked="form.is_seeking==1" color="#0AA0A8"
						@change="jobSeekingChange" />
				</view>
				<view class="me-edit-form-public-profile">
					{{i18n.publicprofile}}
					<switch style="margin-left: 20rpx;transform:scale(0.6)" :checked="form.is_public == 1" color="#0AA0A8"
						@change="publicProfileChange" />
				</view>
			</view>
			<view class="flex-item me-edit-submit">
				<button @click="basicSubmit" type="default">{{i18n.homereviewbutton}}</button>
			</view>
		</view>
		<tki-tree ref="tkitree" :range="genderList" :rangeKey="rangeKey" confirmColor="#119fa9" :multiple="false"
			@confirm="cofirmgenderType" :confirmText="confirmText" :cancelText="cancelText"
			@cancel="cancelgenderType" />
	</view>
</template>

<script>
	import tkiTree from "@/components/tki-tree/tki-tree.vue"
	import profile from "@/api/profile.js"

	export default {
		data() {
			return {
				
				rangeKey: 'value',
				idKey: 'id',
				genderList: [{
					id: 1,
					value: 'Male',
					checked: true
				}, {
					id: 2,
					value: 'Female'
				}, {
					id: 3,
					value: 'Undisclosed'
				}],
				confirmText: 'Confirm',
				cancelText: 'Cancel',
				genderStatus: false,

				birthdateShow: false,
				selectDateStatus: false, // 是否选择生日

				locationStatus: false,

				isFirstEdit: undefined,
				
				selectEducatorTypeList: [],
				range: [],

				errorType: ['message'],
				form: {
					first_name: '',
					last_name: '',
					nickname: '',
					email: '',
					sex: '',
					sex_name: '',
					nationality: '',
					birthday: '',
					location:'',
					country: '',
					province: '',
					city: '',
					district: '',
					address: '',
					lon: '',
					lat: '',
					is_seeking: '',
					is_public: '',
					apply_contact: '',
					wx_id: '',
					sub_identity: '',
					token: uni.getStorageSync('token')
				},
				rules: {
					email: [{
						required: false,
						type: 'email',
						message: this.$t('index').basiceduemail,
						trigger: ['change', 'blur'],
					}],
				}
			}
		},
		components: {
			tkiTree
		},
		computed: {
			i18n() {
				return this.$t('index')
			}
		},
		onUnload() {
			uni.$off('locationEvent');
		},
		onLoad(option) {

			var that = this;
			this.isFirstEdit = option.firstEdit;
			
			this.subCateList();
			this.getBasicInfo();

			uni.$on('nationalityObj', function(data) {
				console.log(data)
				that.form.nationality = data;
			})
			uni.$on('locationEvent', function(data) {
				console.log(data)
				that.form.province = data.province;
				that.form.city = data.city;
				that.form.district = data.area;
				that.form.location = data.area + ', ' + data.city + ', ' + data.province;
			})
		},
		methods: {
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
			selectEducatorType(item) {
				// console.log(item);
				if (this.selectEducatorTypeList.indexOf(item.id) == -1) {
					this.selectEducatorTypeList.push(item.id);
				} else {
					this.selectEducatorTypeList.splice(this.selectEducatorTypeList.indexOf(item.id), 1);
				}
				console.log(this.selectEducatorTypeList);
			},
			chooseLocation() {
				uni.navigateTo({
					url: '/pages/location/location'
				})
			},
			getApplicationContact() {
				let data = {
					token: uni.getStorageSync('token'),
					user_id: uni.getStorageSync('uid')
				}
				profile.getApplicationContact(data).then(res => {
					console.log(res)
					if (res.code == 200) {
						this.applicationContact = res.message.apply_contact;
					}
				}).catch(error => {
					console.log(error)
				})
			},
			getBasicInfo() {
				var that = this;
				let data = {
					id: uni.getStorageSync('uid'),
					token: uni.getStorageSync('token')
				}
				profile.getBasicInfo(data).then(res => {
					console.log(res)
					if (res.code == 200) {
						let basicUserInfo = res.message;
						let educatorInfo = res.message.educator_info;
						
						if (basicUserInfo.sex == 1) {
							this.form.sex = 1;
							this.form.sex_name = 'Male';
						}
						if (basicUserInfo.sex == 2) {
							this.form.sex = 2;
							this.form.sex_name = 'Female';
						}
						if (basicUserInfo.sex == 3) {
							this.form.sex = 3;
							this.form.sex_name = 'Undisclosed';
						}
						
						let province = educatorInfo.province;
						let city = educatorInfo.city;
						let district =  educatorInfo.district;
						let address = educatorInfo.address;
						let subIdentityIdStr = educatorInfo.sub_identity_id;

						this.form.first_name = educatorInfo.first_name;
						this.form.last_name = educatorInfo.last_name;
						this.form.nickname = educatorInfo.nickname;
						this.form.nationality = educatorInfo.nationality;
						this.form.birthday = basicUserInfo.birthday;
						this.form.is_seeking = basicUserInfo.is_seeking;
						this.form.is_public = basicUserInfo.is_public;
						this.form.wx_id = educatorInfo.wx_id;
						this.form.email = educatorInfo.email;
						
						this.form.province = province;
						this.form.city = city;
						this.form.district = district;
						this.form.address = address;
						this.form.location =  district + ', ' + city + ', ' + province;
						
						this.selectEducatorTypeList = subIdentityIdStr.split(',').map(Number)
						
					} else {
						uni.showToast({
							title: res.msg,
							icon: "none"
						})
					}
				}).catch(err => {
					console.log(err)
				})
			},
			turnNationalityPage() {
				uni.navigateTo({
					url: '/pages/me/profile/countriesList'
				})
			},
			showgenderPicker() {
				this.$refs.tkitree._show()
			},
			cofirmgenderType: function(e) {
				this.form.sex = e[0].id;
				this.form.sex_name = e[0].value;
			},
			cancelgenderType: function() {
				console.log('cancel')
				// this.$refs.tkitree._hide()
			},
			birthdateConfirm(e) {
				let year = e.year;
				let month = e.month;
				let day = e.day;
				this.form.birthday = year + '-' + month + '-' + day;
			},
			jobSeekingChange(e) {
				console.log(e)
				let value = e.detail.value;
				if (value) {
					this.form.is_seeking = 1;
				} else {
					this.form.is_seeking = 0;
				}
			},
			publicProfileChange(e) {
				console.log(e)
				let value = e.detail.value;
				if (value) {
					this.form.is_public = 1;
				} else {
					this.form.is_public = 0;
				}
			},
			basicSubmit() {
				var that = this;
				this.$refs.uForm.validate(valid => {
					if (valid) {
						console.log('验证通过');
						let educatorType = this.selectEducatorTypeList.join(',');
						that.form.sub_identity = educatorType;
						let data = Object.assign({},that.form);
						
						profile.addEduBasic(data).then(res => {
							console.log(res)
							
							if (res.code == 200) {
								uni.$emit('userInfoUpdated', {
									msg: 'page updated'
								});
								uni.showLoading({
									title:'loading'
								})
								if (this.isFirstEdit == 1) {
									setTimeout(function(){
										uni.hideLoading();
										uni.reLaunch({
											url: '/pages/me/profile/photo?type=13'
										})
									},1200)
									
								} else {
									setTimeout(function(){
										uni.hideLoading();
										uni.reLaunch({
											url: '../home'
										})
									},1200)
									
								}
						
							} else {
								uni.showToast({
									title: res.msg,
									icon: 'none'
								})
							}
						}).catch(error => {
							console.log(error)
						})
						
					} else {
						console.log('验证失败');
					}
				});

			}

		},
		onReady() {
			this.$refs.uForm.setRules(this.rules);
		}
	}
</script>

<style>
	page {
		background-color: #F4F5F6;
	}

	.me-edit-title {
		text-align: center;
		font-size: 38rpx;
		font-weight: 700;
		background-color: #004956;
		color: #FFFFFF;
		height: 200rpx;
		line-height: 200rpx;

	}

	.me-edit-form {
		width: 96%;
		margin: 0 auto;
		margin-top: 20rpx;
		padding: 20rpx;
		background-color: #FFFFFF;
		border-radius: 20rpx;
	}

	.me-edit-form-item {
		width: 100%;
		margin-top: 20rpx;
	}

	.me-edit-form-item-label {
		font-size: 28rpx;
		font-weight: 700;
	}

	.me-edit-form-job-seeking {
		margin-top: 20rpx;
		font-size: 28rpx;
		font-weight: 700;

	}

	.me-edit-form-public-profile {
		margin-top: 20rpx;
		font-size: 28rpx;
		font-weight: 700;
	}

	.me-edit-form-job-title {
		margin-top: 20rpx;
	}

	.me-edit-submit {
		width: 80%;
		margin: 0 auto;
		margin-top: 10%;
		padding-bottom: 100rpx;
	}

	.me-edit-submit button {
		background-color: #004956;
		box-sizing: border-box;
		color: #FFFFFF;
		height: 80rpx;
		border-radius: 80rpx;
		line-height: 80rpx;
	}

	.categories-tags {
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: first baseline;
		align-items: center;
		flex-wrap: wrap;
	}

	.categories-tags-item {
		padding-top: 10rpx;
		padding-bottom: 10rpx;
		padding-left: 20rpx;
		padding-right: 20rpx;
		background-color: #EEEEEE;
		margin-top: 10rpx;
		margin-left: 10rpx;
		border-radius: 20rpx;
		font-size: 28rpx;
	}

	.tag-active {
		background-color: #00b3d2;
		color: #FFFFFF;
	}

	.role-form-type-1 {
		margin-top: 20rpx;
		height: 80rpx;
		text-align: left;
		font-size: 28rpx;
		font-weight: 700;
	}

	.role-form-type-1 text {
		font-size: 28rpx;
	}
</style>
