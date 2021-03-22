<template>
	<view>
		<view class="uni-flex uni-column me-edit-bg">
			<view class="flex-item me-edit-title">
				{{i18n.profileyourcontactbasicinfo}}
			</view>
			<view class="flex-item me-edit-form">
				<view class="me-edit-form-item">
					<view class="me-edit-form-item-label">{{i18n.profilefirstname}}</view>
					<input type="text" v-model="firstname"  :placeholder="i18n.profilefirstnameph" />
				</view>
				<view class="me-edit-form-item">
					<view class="me-edit-form-item-label">{{i18n.profilelastname}}</view>
					<input type="text" v-model="lastname"  :placeholder="i18n.profilelastname" />
				</view>
				<view class="me-edit-form-item">
					<view class="me-edit-form-item-label">{{i18n.profilenickname}}</view>
					<input type="text" v-model="nickname"  :placeholder="i18n.profilenicknameph" />
				</view>
				<view class="me-edit-form-item">
					<view class="me-edit-form-item-label">{{i18n.profilecontactphone}}</view>
					<input type="number" :maxlength="11" v-model="contactPhoneValue" :placeholder="i18n.profilecontactphoneph" />
				</view>
				<view class="me-edit-form-item">
					<view class="me-edit-form-item-label">{{i18n.businesswechatid}}</view>
					<input type="text" v-model="wechatId"  :placeholder="i18n.businesswechatid" />
				</view>
				<!-- <view class="me-edit-form-gender" @click="showgenderPicker">
					<view class="me-edit-form-item-label">{{i18n.profilegender}}</view>
					<view class="me-edit-form-gender-1" v-if="genderStatus===false">{{i18n.profilechoosegender}}</view>
					<view class="me-edit-form-gender-2" v-if="genderStatus">{{genderValue.value}}</view>
				</view> -->
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
					<input type="text"  v-model="jobTitle" :placeholder="i18n.profilejobtitleph" />
					<!-- <fuck-textarea :maxlength="100" v-model="jobTitle" :placeholder="i18n.profilejobtitleph"></fuck-textarea> -->
				</view>
				<view class="me-edit-form-small-bio">
					<view class="me-edit-form-item-label">{{i18n.profilesmallbio}}</view>
					<fuck-textarea :maxlength="200" v-model="smallBio" :placeholder="i18n.profilesmallbioph"></fuck-textarea>
				</view>
				<view>
					<view class="me-edit-form-item-label">{{i18n.profilehobbies}}</view>
					<view class="jobs-tags-container">
						<view class="jobs-tags">
							<view class="jobs-tags-item" :class=" selectInfoListList.indexOf(item) == -1 ? '' : 'tags-active' "
							 v-for="(item,index) in infoList" :key="index" @click="selectInfoList(item)">
								{{item}}
							</view>
							<view class="jobs-tags-item" :class=" selectInfoListList.indexOf(item) == -1 ? '' : 'tags-active' "
							 v-for="(item,index) in ownInfoListList" :key="item" @click="selectInfoList(item)">
								{{item}}
							</view>
						</view>
						<view class="jobs-tags-item" v-if="addInfoListStatus==false" @click="addInfoListStatus=true">add+</view>
						<view class="jobs-tags-add">
							<view class="jobs-tags-item-add" v-if="addInfoListStatus">
								<input type="text" v-model="ownInfoListValue" placeholder="Add your hobbies">
								<view class="jobs-tags-item-add-button">
									<button type="default" v-if="ownInfoListValue.length>0" @click="addOwnInfoList">Confirm</button>
									<button type="default" v-if="ownInfoListValue.length==0" @click="addInfoListStatus=false">Cancel</button>
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

				countryCode: '',
				jobTitle: '',
				smallBio: '',
				nationalityValue: '',
				nationalitySelectStatus: false,
				disabled: false, //不禁用
				// 默认的数组 不填默认的是空数组
				selectlist: [],
				infoList: ['Fitness', 'Photography', 'Travel'],
				// 默认提示
				placeholder: 'Please enter your hobbies',
				languagesList: [],
				nickname: '',
				firstname:'',
				lastname:"",
				hobbiesStr: '',
				
				editInfoList: [],
				addInfoListStatus: false,
				ownInfoListValue: '',
				ownInfoListList: [],
				selectInfoListList: [],
				selectInfoListArr: [],
				
				isFirstEdit:undefined,
				wechatId:'',
				contactPhoneValue:''
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
			this.isFirstEdit=option.firstEdit;
			this.getBasicInfo();
			uni.$on('nationalityObj', function(data) {
				console.log(data)
				that.nationalityValue = data.name;
				that.nationalitySelectStatus = true;
			})

		},
		methods: {
			
			turnNationalityPage() {
				uni.navigateTo({
					url: '/pages/me/profile/countriesList'
				})
			},
			turnIndexList(type) {
				uni.navigateTo({
					url: '/pages/me/profile/indexList?type=' + type
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
				let hobbiesStr = this.selectInfoListList.join(',');
				let data = {
					first_name:this.firstname,
					last_name:this.lastname,
					nickname: this.nickname,
					sex: this.genderId,
					nationality: this.nationalityValue,
					job_title: this.jobTitle,
					bio: this.smallBio,
					hobbies: hobbiesStr,
					wx_id:this.wechatId,
					contact_phone:this.contactPhoneValue,
					token: uni.getStorageSync('token')
				}

				profile.addBusinessBasic(data).then(res => {
					console.log(res)
					if (res.code == 200) {
						uni.$emit('userInfoUpdated',{msg:'page updated'});
						if(this.isFirstEdit==1){
							uni.navigateTo({
								url: '/pages/me/profile/photo?type=14'
							})
						}else{
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
						let gender = res.message.sex;
						
						if (gender == 1) {
							this.genderStatus = true;
							this.genderValue = {
								id: 1,
								value: 'Male'
							}
						}
						if (gender == 2) {
							this.genderStatus = true;
							this.genderValue = {
								id: 2,
								value: 'Female'
							}
						}
						if (gender == 3) {
							this.genderStatus = true;
							this.genderValue = {
								id: 3,
								value: 'Undisclosed'
							}
						}
					
						let businessUserInfo = res.message.business_info;
						
						this.nickname = businessUserInfo.nickname;
						this.firstname = businessUserInfo.first_name;
						this.lastname = businessUserInfo.last_name;
						
						this.nationalityValue = businessUserInfo.nationality;
						this.nationalitySelectStatus=true;
						this.jobTitle = businessUserInfo.job_title;
						this.smallBio = businessUserInfo.bio;
						this.wechatId = businessUserInfo.wx_id;
						this.contactPhoneValue = businessUserInfo.contact_phone;
						let hobbies = businessUserInfo.hobbies;
						if(hobbies != ''){
							that.infoList =hobbies.split(',');
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
		font-size: 30rpx;
		/* width: 100%; */
	}
	.jobs-tags-add{
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
		font-size: 30rpx;
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
		font-size: 30rpx;
		padding: 0;
		border-radius:20rpx;
	}
	
	.tags-active {
		background-color: #00CE47;
		color: #FFFFFF;
	}
</style>
