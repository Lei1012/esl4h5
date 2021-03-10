<template>
	<view>
		<view class="uni-flex uni-column me-edit-bg">
			<view class="flex-item me-edit-title">
				{{i18n.profileyourcontactbasicinfo}}
			</view>
			<view class="flex-item me-edit-form">
				<view class="me-edit-form-item">
					<view class="me-edit-form-item-label">{{i18n.profilefirstname}}</view>
					<input type="text" v-model="firstname" :placeholder="i18n.profilefirstnameph" />
				</view>
				<view class="me-edit-form-item">
					<view class="me-edit-form-item-label">{{i18n.profilelastname}}</view>
					<input type="text" v-model="lastname" :placeholder="i18n.profilelastnameph" />
				</view>
				<view class="me-edit-form-item">
					<view class="me-edit-form-item-label">{{i18n.profilenickname}}</view>
					<input type="text" v-model="nickname" :placeholder="i18n.profilenicknameph" />
				</view>
				<view class="me-edit-form-item">
					<view class="me-edit-form-item-label">{{i18n.vendorwechatid}} <text class="error-star">*</text></view>
					<input type="text" v-model="wechatId" :placeholder="i18n.vendorwechatid" />
				</view>
				<view class="me-edit-form-gender" @click="showgenderPicker">
					<view class="me-edit-form-item-label">{{i18n.profilegender}}</view>
					<view class="me-edit-form-gender-1" v-if="genderStatus===false">{{i18n.profilechoosegender}}</view>
					<view class="me-edit-form-gender-2" v-if="genderStatus">{{genderValue.value}}</view>
				</view>
				<view class="me-edit-form-nation">
					<view class="me-edit-form-item-label">{{i18n.profilenationality}}</view>
					<view class="me-edit-form-nation-1" v-if="nationalitySelectStatus===false" @click="turnNationalityPage">
						{{i18n.profilechoosenationality}}
					</view>
					<view class="me-edit-form-nation-2" v-if="nationalitySelectStatus" @click="turnNationalityPage">
						{{nationalityValue}}
					</view>
				</view>
				<view class="me-edit-form-job-title">
					<view class="me-edit-form-item-label">{{i18n.profilejobtitle}}</view>
					<input type="text" :maxlength="100" v-model="jobTitle" :placeholder="i18n.profilejobtitleph"  />
					<!-- <fuck-textarea :maxlength="100" v-model="jobTitle" :placeholder="i18n.profilejobtitleph"></fuck-textarea> -->
				</view>
				<!-- 首选联系方式 -->
				<!-- <view>
					<view class="me-edit-form-item-label">{{i18n.profilefirstcontact}}</view>
					<view class="jobs-tags-container">
						<view class="jobs-tags">
							<view class="jobs-tags-item" :class=" selectFirstContactList.indexOf(item) == -1 ? '' : 'tags-active' "
							 v-for="(item,index) in firstContactList" :key="'info'+index" @click="selectFirstContact(item)">
								{{item}}
							</view>
						</view>
					</view>
				</view> -->
				<!-- 首选语言 -->
				<view style="margin-top: 20rpx;">
					<view class="me-edit-form-item-label">{{i18n.profilefirstlanguage}}</view>
					<view class="jobs-tags-container">
						<view class="jobs-tags">
							<view class="jobs-tags-item" :class=" selectFirstLanguageList.indexOf(item) == -1 ? '' : 'tags-active' "
							 v-for="(item,index) in firstLanguageList" :key="index" @click="selectFirstLanguage(item)">
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
		<tki-tree ref="tkitree" :range="genderList" :rangeKey="rangeKey" confirmColor="#119fa9" :multiple="false" @confirm="cofirmgenderType"
		 :confirmText="confirmText" :cancelText="cancelText" @cancel="cancelgenderType" />
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
				jobTitle: '',
				nationalityValue: '',
				nationalitySelectStatus: false,
				nickname: '',
				firstname: '',
				lastname: '',
				hobbiesStr: '',
				firstContactList:['邮箱/Email' ,'电话/Phone','微信/WeChat'],
				selectFirstContactList:[],
				selectFirstContactListIndex:[],
				firstLanguageList:['中文/Chinese' ,'英语/English'],
				selectFirstLanguageList:[],
				selectFirstLanguageListIndex:[],
				isFirstEdit: undefined,
				wechatId:'',
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
				that.nationalityValue = data.name;
				that.nationalitySelectStatus = true;
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
				let a = []
				e.forEach(item => {
					this.genderValue = item;
				})
				this.genderStatus = true;
				console.log(this.genderValue)
			},
			cancelgenderType: function() {
				console.log('cancel')
				// this.$refs.tkitree._hide()
			},
			changeGenderValue: function(e) {
				let key = e.target.value;
				let genderList = this.genderList;
				this.genderValue = genderList[key];
				this.genderStatus = true;
				this.genderId = genderList[key].id;
				console.log(this.genderId)
			},
			basicSubmit() {
				if(this.selectFirstLanguageList.length<=0){
					return uni.showToast({
						title:this.i18n.profilechoosepreferredlanguageph,
						icon:'none'
					})
				}
				if(this.wechatId == ''){
					return uni.showToast({
						title:this.i18n.vendorwechatidph,
						icon:'none'
					})
				}
				let data = {
					first_name: this.firstname,
					last_name: this.lastname,
					nickname: this.nickname,
					sex: this.genderId,
					nationality: this.nationalityValue,
					job_title: this.jobTitle,
					first_contact:this.selectFirstContactList.join(','),
					first_language:this.selectFirstLanguageList.join(''),
					wx_id:this.wechatId,
					token: uni.getStorageSync('token')
				}

				profile.addVendorBasic(data).then(res => {
					console.log(res)
					if (res.code == 200) {
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
						if (basicUserInfo.sex == 1) {
							this.genderStatus = true;
							this.genderValue = {
								id: 1,
								value: 'Male'
							}
						}
						if (basicUserInfo.sex == 2) {
							this.genderStatus = true;
							this.genderValue = {
								id: 2,
								value: 'Female'
							}
						}
						if (basicUserInfo.sex == 3) {
							this.genderStatus = true;
							this.genderValue = {
								id: 3,
								value: 'Undisclosed'
							}
						}
						this.firstname = basicUserInfo.vendor_info.first_name;
						this.lastname = basicUserInfo.vendor_info.last_name;
						this.nickname = basicUserInfo.nickname;
						this.nationalityValue = basicUserInfo.vendor_info.nationality;
						this.nationalitySelectStatus = true;
						this.jobTitle = basicUserInfo.vendor_info.job_title;
						this.wechatId = basicUserInfo.vendor_info.wx_id;
						if(basicUserInfo.vendor_info.first_contact != ''){
							this.selectFirstContactList = basicUserInfo.vendor_info.first_contact.split(',')
						}
						if(basicUserInfo.vendor_info.first_language != ''){
							this.selectFirstLanguageList = basicUserInfo.vendor_info.first_language.split(',')
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
			selectFirstContact(item){
			
				if(this.selectFirstContactList.indexOf(item) == -1){
					this.selectFirstContactList.push(item);
				}else{
					this.selectFirstContactList.splice(this.selectFirstContactList.indexOf(item),1)
				}
				console.log(this.selectFirstContactList)
			},
			selectFirstLanguage(item){
				if(this.selectFirstLanguageList.indexOf(item) == -1){
					this.selectFirstLanguageList.splice(0,1,item);
				}
				console.log(this.selectFirstLanguageList)
			}

		},
		onReady() {

		}
	}
</script>

<style>
	@import url("@/common/me/basic.css");
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
