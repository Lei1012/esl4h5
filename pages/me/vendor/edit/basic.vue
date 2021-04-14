<template>
	<view>
		<view class="uni-flex uni-column me-edit-bg">
			<view class="flex-item me-edit-title">
				{{i18n.profileyourcontactbasicinfo}}
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
					<u-form-item :label="i18n.vendorwechatid" prop="wx_id">
						<u-input border v-model="form.wx_id" :placeholder="i18n.vendorwechatid" />
					</u-form-item>
					<u-form-item :label="i18n.profilegender" prop="sex_name">
						<u-input border v-model="form.sex_name" :placeholder="i18n.profilechoosegender" type="select"
							@click="showgenderPicker" />
					</u-form-item>
					<u-form-item :label="i18n.profilenationality" prop="nationality">
						<u-input border type="text" v-model="form.nationality"
							:placeholder="i18n.profilechoosenationality" @click="turnNationalityPage" />
					</u-form-item>
					<u-form-item :label="i18n.profilejobtitle" prop="job_title">
						<u-input border v-model="form.job_title" :placeholder="i18n.profilejobtitleph" />
					</u-form-item>
				</u-form>

				<!-- 首选语言 -->
				<view style="margin-top: 20rpx;">
					<view class="me-edit-form-item-label">{{i18n.profilefirstlanguage}}</view>
					<view class="jobs-tags-container">
						<view class="jobs-tags">
							<view class="jobs-tags-item"
								:class=" selectFirstLanguageList.indexOf(item) == -1 ? '' : 'tags-active' "
								v-for="(item,index) in firstLanguageList" :key="index"
								@click="selectFirstLanguage(item)">
								{{item}}
							</view>
						</view>
					</view>
				</view>

			</view>
			<view class="flex-item me-edit-submit">
				<button @click="basicSubmit" type="default">{{i18n.profileeditsubmit}}</button>
			</view>
		</view>
		<tki-tree ref="tkitree" :range="genderList" :rangeKey="rangeKey" confirmColor="#119fa9" :multiple="false"
			@confirm="cofirmgenderType" :confirmText="confirmText" :cancelText="cancelText"
			@cancel="cancelgenderType" />
	</view>
</template>

<script>
	import fuckTextarea from '@/components/fuck-textarea/fuck-textarea.vue'
	import tkiTree from "@/components/tki-tree/tki-tree.vue"
	import profile from '@/api/profile.js'

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
				genderValue: '',
				
				firstLanguageList: ['中文/Chinese', '英语/English'],
				selectFirstLanguageList: [],
				selectFirstLanguageListIndex: [],
				isFirstEdit: undefined,

				errorType: ['message'],
				form: {
					first_name: '',
					last_name: '',
					nickname: '',
					sex: '',
					sex_name:'',
					nationality: '',
					job_title: '',
					first_contact: '',
					first_language: '',
					wx_id: '',
					proposed_deal: '',
				},
				rules: {
					wx_id: [{
						required: true,
						message: this.$t('index').vendorwechatidph,
						trigger: ['change', 'blur'],
					}, ],
				}

			}
		},
		components: {
			fuckTextarea,
			tkiTree
		},
		computed: {
			i18n() {
				return this.$t('index')
			}
		},
		onLoad(option) {
			var that = this;
			this.isFirstEdit = option.firstEdit;
			uni.$on('nationalityObj', function(data) {
				console.log(data)
				that.form.nationality = data;
			})
			this.getBasicInfo();

		},
		methods: {

			turnNationalityPage() {
				uni.navigateTo({
					url: '/pages/me/profile/countriesList'
				})
			},
			showgenderPicker() {
				this.$refs.tkitree._show()
			},
			cofirmgenderType: function(e) {
				console.log(e)
				this.form.sex = e[0].id;
				this.form.sex_name = e[0].value;
				this.genderStatus = true;
				this.$forceUpdate()
			},
			cancelgenderType: function() {
				console.log('cancel')
				// this.$refs.tkitree._hide()
			},
			basicSubmit() {
				var that = this;
				
				this.$refs.uForm.validate(valid => {
					if (valid) {
						console.log('验证通过');
						if (this.selectFirstLanguageList.length <= 0) {
							return uni.showToast({
								title: this.i18n.profilechoosepreferredlanguageph,
								icon: 'none'
							})
						}
						
						that.form.token= uni.getStorageSync('token');
						that.form.first_language = this.selectFirstLanguageList.join('');
						
						let data = Object.assign({},that.form);
						console.log(data)
						profile.addVendorBasic(data).then(res => {
							console.log(res)
							if (res.code == 200) {
						
								uni.$emit('userInfoUpdated', {
									msg: 'page updated'
								})
								if (this.isFirstEdit == 1) {
									uni.reLaunch({
										url: '/pages/me/profile/photo?type=15'
									})
								} else {
									uni.navigateBack({
										delta: 1
									})
								}
						
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
						console.log('验证失败');
					}
				});
			
				
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
						let vendorInfo = res.message.vendor_info;
						
						if (basicUserInfo.sex == 1) {
							this.genderStatus = true;
							this.form.sex_name = 'Male'
							this.form.sex = 1
						}
						if (basicUserInfo.sex == 2) {
							this.genderStatus = true;
							this.form.sex_name = 'Female'
							this.form.sex = 2
						}
						if (basicUserInfo.sex == 3) {
							this.genderStatus = true;
							this.form.sex_name = 'Undisclosed';
							this.form.sex = 3;
						}
						
						if (basicUserInfo.nickname) {
							this.form.nickname = basicUserInfo.nickname;
						}
						
						if (vendorInfo.first_language) {
							this.selectFirstLanguageList = vendorInfo.first_language.split(',')
						}
						if(vendorInfo.first_name){this.form.first_name = vendorInfo.first_name};
						if(vendorInfo.last_name){this.form.last_name=vendorInfo.last_name};
						if(vendorInfo.wx_id){this.form.wx_id = vendorInfo.wx_id};
						if(vendorInfo.nationality){this.form.nationality=vendorInfo.nationality};
						if(vendorInfo.job_title){this.form.job_title = vendorInfo.job_title};

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
			selectFirstContact(item) {

				if (this.selectFirstContactList.indexOf(item) == -1) {
					this.selectFirstContactList.push(item);
				} else {
					this.selectFirstContactList.splice(this.selectFirstContactList.indexOf(item), 1)
				}
				console.log(this.selectFirstContactList)
			},
			selectFirstLanguage(item) {
				if (this.selectFirstLanguageList.indexOf(item) == -1) {
					this.selectFirstLanguageList.splice(0, 1, item);
				}
				console.log(this.selectFirstLanguageList)
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
		/* margin-top: 10%; */
		margin-top: 20rpx;
		padding: 20rpx;
		background-color: #FFFFFF;
		border-radius: 20rpx;
	}
	
	
	
	.me-edit-form-item {
		width: 100%;
		margin-top: 20rpx;
	}
	
	.me-edit-form-item-label{
		font-size: 34rpx;
		font-weight: 700;
	}
	
	.me-edit-form-gender {
		width: 100%;
		margin-top: 20rpx;
		text-align: left;
	}
	
	.me-edit-form-gender picker {
		height: 100%;
		text-align: center;
		border: none;
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
	
	.form-item{
		margin-top: 20rpx;
	}
	
	.form-item-label{
		font-size: 34rpx;
		font-weight: 700;
	}

	.jobs-tags-container {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		flex-wrap: wrap;
		margin-top: 10rpx;
	}

	.jobs-tags {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		flex-wrap: wrap;

	}

	.jobs-tags-item {
		background-color: rgba(0, 179, 210, 0.1);
		padding-left: 20rpx;
		padding-right: 20rpx;
		padding-top: 10rpx;
		padding-bottom: 10rpx;
		border-radius: 20rpx;
		margin-top: 10rpx;
		margin-left: 10rpx;
	}

	.jobs-tags-item-add {
		width: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-around;
		flex-wrap: wrap;
	}

	.jobs-tags-item-add input {
		border: 1rpx solid #FFFFFF;
		height: 80rpx;
		width: 60%;
		border-radius: 20rpx;
		font-size: 28rpx;
	}

	.jobs-tags-item-add-button {
		width: 30%;
	}

	.jobs-tags-item-add-button button {
		width: 100%;
		text-align: center;
		height: 80rpx;
		line-height: 80rpx;
		background-color: #0AA0A8;
		color: #FFFFFF;
		font-size: 28rpx;
		padding: 0;
	}

	.tags-active {
		background-color: #00CE47;
		color: #FFFFFF;
	}

	.error-star {
		font-size: 40rpx;
		font-weight: 700;
		color: #FF3333;
		margin-left: 10rpx;
	}
</style>
