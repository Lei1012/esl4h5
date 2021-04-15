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
					<u-form-item :label="i18n.profilecontactphone" prop="contact_phone">
						<u-input border type="number" :maxlength="11" v-model="form.contact_phone" :placeholder="i18n.profilecontactphone" />
					</u-form-item>
					<u-form-item :label="i18n.businesswechatid" prop="wx_id">
						<u-input border v-model="form.wx_id" :placeholder="i18n.businesswechatid" />
					</u-form-item>
					<u-form-item :label="i18n.profilegender" prop="sex_name">
						<u-input border v-model="form.sex_name" :placeholder="i18n.profilechoosegender" type="select"
							@click="showgenderPicker" />
					</u-form-item>
					<u-form-item :label="i18n.profilenationality" prop="nationality">
						<u-input border v-model="form.nationality" :placeholder="i18n.profilechoosenationality"
							type="select" @click="turnNationalityPage" />
					</u-form-item>
					<u-form-item :label="i18n.profilejobtitle" prop="job_title">
						<u-input border v-model="form.job_title" :placeholder="i18n.profilejobtitleph" />
					</u-form-item>
					<u-form-item :label="i18n.profilesmallbio" prop="bio">
						<u-input border type="textarea" :maxlength="200" height="150" autoHeight v-model="form.bio"
							:placeholder="i18n.profilesmallbioph" />
					</u-form-item>

				</u-form>

				<view>
					<view class="me-edit-form-item-label">{{i18n.profilehobbies}}</view>
					<view class="jobs-tags-container">
						<view class="jobs-tags">
							<view class="jobs-tags-item"
								:class=" selectInfoListList.indexOf(item) == -1 ? '' : 'tags-active' "
								v-for="(item,index) in infoList" :key="index" @click="selectInfoList(item)">
								{{item}}
							</view>
							<view class="jobs-tags-item"
								:class=" selectInfoListList.indexOf(item) == -1 ? '' : 'tags-active' "
								v-for="(item,index) in ownInfoListList" :key="item" @click="selectInfoList(item)">
								{{item}}
							</view>
						</view>
						<view class="jobs-tags-item" v-if="addInfoListStatus==false" @click="addInfoListStatus=true">
							add+</view>
						<view class="jobs-tags-add">
							<view class="jobs-tags-item-add" v-if="addInfoListStatus">
								<input type="text" v-model="ownInfoListValue" placeholder="Add your hobbies">
								<view class="jobs-tags-item-add-button">
									<button type="default" v-if="ownInfoListValue.length>0"
										@click="addOwnInfoList">Confirm</button>
									<button type="default" v-if="ownInfoListValue.length==0"
										@click="addInfoListStatus=false">Cancel</button>
								</view>
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
				infoList:[],
				hobbiesStr: '',

				editInfoList: [],
				addInfoListStatus: false,
				ownInfoListValue: '',
				ownInfoListList: [],
				selectInfoListList: [],
				selectInfoListArr: [],

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
					bio: '',
					hobbies: '',
					wx_id: '',
					contact_phone: '',
					token: uni.getStorageSync('token')
				},
				rules: {
					first_name: [{
						required: false,
						message: this.$t('index').frstnameerror,
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
		onUnload() {
			uni.$off('nationalityObj');
		},
		onLoad(option) {
			var that = this;
			this.isFirstEdit = option.firstEdit;
			this.getBasicInfo();
			uni.$on('nationalityObj', function(data) {
				console.log(data)
				that.form.nationality = data;
			})

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
			},
			cancelgenderType: function() {
				console.log('cancel')
				// this.$refs.tkitree._hide()
			},
			addOwnInfoList() {
				this.addInfoListStatus = false;
				var index = this.selectInfoListList.indexOf(this.ownInfoListValue);
				if (index == -1) {
					if (this.selectInfoListList.length > 4) {
						return false;
					}
					this.selectInfoListList.push(this.ownInfoListValue);
					this.ownInfoListList.push(this.ownInfoListValue);
					this.ownInfoListValue = '';

				} else {
					this.selectInfoListList.splice(index, 1);
				}
			},
			selectInfoList(value, type) {
				var index = this.selectInfoListList.indexOf(value);
				if (index == -1) {
					if (this.selectInfoListList.length > 4) {
						return false;
					}
					this.selectInfoListList.push(value);

				} else {
					this.selectInfoListList.splice(index, 1);
				}
				console.log(this.selectInfoListList)
			},
			basicSubmit() {
				var that = this;
				
				this.$refs.uForm.validate(valid => {
					if (valid) {
						console.log('验证通过');
						that.form.hobbies = this.selectInfoListList.join(',');
						let data = Object.assign({},that.form);
						
						profile.addBusinessBasic(data).then(res => {
							console.log(res)
							if (res.code == 200) {
								uni.showLoading({
									title:'loading'
								})
								uni.$emit('userInfoUpdated', {
									msg: 'page updated'
								});
								if (this.isFirstEdit == 1) {
									setTimeout(function(){
										uni.hideLoading();
										uni.navigateTo({
											url: '/pages/me/profile/photo?type=14'
										})
									},1200)
									
								} else {
									setTimeout(function(){
										uni.hideLoading();
										uni.navigateBack({
											delta: 1
										})
									},1200)
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
						let gender = res.message.sex;
						
						if (gender == 1) {
							that.form.sex_name = 'Male';
							that.form.sex = 1;
						}
						if (gender == 2) {
							that.form.sex_name = 'Female';
							that.form.sex = 2;
						}
						if (gender == 3) {
							that.form.sex_name = 'Undisclosed';
							that.form.sex = 3;
						}

						let businessUserInfo = res.message.business_info;

						this.form.nickname = businessUserInfo.nickname;
						this.form.first_name = businessUserInfo.first_name;
						this.form.last_name = businessUserInfo.last_name;

						this.form.nationality = businessUserInfo.nationality;
						
						this.form.job_title = businessUserInfo.job_title;
						this.form.bio = businessUserInfo.bio;
						this.form.wx_id = businessUserInfo.wx_id;
						this.form.contact_phone = businessUserInfo.contact_phone;
						
						let hobbies = businessUserInfo.hobbies;
						if (hobbies != '') {
							that.infoList = hobbies.split(',');
							that.selectInfoListList = hobbies.split(',');
						}

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
		font-size: 28rpx;
	}

	.jobs-tags-add {
		width: 100%;
		margin-top: 10rpx;
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
		width: 70%;
		border: 1rpx solid #EEEEEE;
		height: 80rpx;
		line-height: 80rpx;
		font-size: 28rpx;
	}

	.jobs-tags-item-add-button {
		width: 20%;

	}

	.jobs-tags-item-add-button button {
		width: 100%;
		text-align: center;
		height: 80rpx;
		line-height: 80rpx;
		background-color: #0AA0A8;
		color: #FFFFFF;
		font-size:28rpx;
		padding: 0;
		border-radius: 20rpx;
	}

	.tags-active {
		background-color: #00CE47;
		color: #FFFFFF;
	}
</style>
