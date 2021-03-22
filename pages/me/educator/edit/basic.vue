<template>
	<view>
		<view class="uni-flex uni-column me-edit-bg">
			<view class="flex-item me-edit-title">
				<text v-if="isFirstEdit==1">{{i18n.aboutyoupgtxt}}</text>
				<text v-if="isFirstEdit!=1">{{i18n.profileeditbasicinfo}}</text>
			</view>
			<view class="flex-item me-edit-form">
				<view class="me-edit-form-item">
					<view class="me-edit-form-item-label">{{i18n.Basicinfofirstname}}</view>
					<input type="text" v-model="firstname" :placeholder="i18n.Basicinfofirstname" />
				</view>
				<view class="me-edit-form-item">
					<view class="me-edit-form-item-label">{{i18n.basicinfolastname}}</view>
					<input type="text" v-model="lastname" :placeholder="i18n.basicinfolastname" />
				</view>
				<view class="me-edit-form-item">
					<view class="me-edit-form-item-label">{{i18n.basicinfonickname}}</view>
					<input type="text" v-model="nickname" :placeholder="i18n.basicinfonickname" />
				</view>
				<view class="me-edit-form-item">
					<view class="me-edit-form-item-label">{{i18n.basiceduemail}}</view>
					<input type="text" v-model="email" :placeholder="i18n.basiceduemail" />
				</view> 
				<view class="me-edit-form-item">
					<view class="me-edit-form-item-label">{{i18n.educatorwechatid}}</view>
					<input type="text" v-model="wechatId" :placeholder="i18n.educatorwechatid" />
				</view>
				<!-- <view class="me-edit-form-item">
					<view class="me-edit-form-item-label">{{i18n.basiceduapplicationcontact}}</view>
					<input type="text"  name="applyContact"  v-model="applicationContact" :placeholder="i18n.basiceduapplicationcontact"/>
				</view> -->
				<view class="me-edit-form-gender" @click="showgenderPicker">
					<view class="me-edit-form-item-label">{{i18n.gender}}</view>
					<view class="me-edit-form-gender-1" v-if="genderStatus===false">Choose</view>
					<view class="me-edit-form-gender-2" v-if="genderStatus">{{genderValue.value}}</view>
				</view>
				<view class="me-edit-form-nation">
					<view class="me-edit-form-item-label">{{i18n.nationality}}</view>
					<view class="me-edit-form-nation-1" v-if="nationalitySelectStatus===false" @click="turnNationalityPage">
						Choose
					</view>
					<view class="me-edit-form-nation-2" v-if="nationalitySelectStatus" @click="turnNationalityPage">
						{{nationalityValue}}
					</view>
				</view>
				<!-- <view class="me-edit-form-nation">
					 <country-select v-model="xllCountry" :country="xllCountry" topCountry="US" :usei18n="false" />
					  <region-select v-model="xllRegion" :country="xllCountry" :region="xllRegion" :usei18n="false"  />
				</view> -->
				<view class="me-edit-form-birthday">
					<view class="me-edit-form-item-label">{{i18n.birthdate}}</view>
					<view class="me-edit-form-birthday-1" @click="birthdateShow=true" v-if="selectDateStatus">{{birthdateStr}}</view>
					<view class="me-edit-form-birthday-2" @click="birthdateShow=true" v-if="selectDateStatus===false">Birthdate</view>
					<u-picker :show-time-tag="false" confirm-text="Confirm" cancel-text="Cancel" v-model="birthdateShow" mode="time"
					 @confirm="birthdateConfirm"></u-picker>
				</view>
				<!-- <view class="me-edit-form-current-city" >
					<view class="me-edit-form-item-label">{{i18n.location}}</view>
					<view class="me-edit-form-current-city-1">
						{{country}} {{province}} {{city}}
					</view>
					<view id="mapContainer" style="width: 100%;height: 500rpx;margin-top: 20rpx;"></view>
					<div id="info">Address:<span id="position"></span></div>
				</view> -->
				<view class="me-edit-form-current-city">
					<view class="me-edit-form-item-label">{{i18n.location}}</view>
					<view class="me-edit-form-current-city-1" @click="chooseLocation">
						<text v-if="locationStatus">{{pickerText}}</text>
						<text v-if="locationStatus===false">{{i18n.basicbusinesstwochooselocation}}</text>
					</view>
				</view>
				<view class="role-form-type-1">
					<text>{{i18n.basicinfoeducategory}}</text>
				</view>
				<view class="categories-tags">
					<view class="categories-tags-item" :class="selectEducatorTypeList.indexOf(item.id) == -1 ? '' : 'tag-active' "
					 v-for="(item,k) in range" :key="k" @click="selectEducatorType(item)">
						{{item.identity_name}}
					</view>
				</view>
				<view class="me-edit-form-job-seeking">
					{{i18n.jobseeking}}
					<switch style="margin-left: 20rpx;" :checked="jobSeekingValue==1" color="#0AA0A8" @change="jobSeekingChange" />
				</view>
				<view class="me-edit-form-public-profile">
					{{i18n.publicprofile}}
					<switch style="margin-left: 20rpx;" :checked="publicProfileValue == 1" color="#0AA0A8" @change="publicProfileChange" />
				</view>
			</view>
			<view class="flex-item me-edit-submit">
				<button @click="basicSubmit" type="default">{{i18n.homereviewbutton}}</button>
			</view>
		</view>
		<tki-tree ref="tkitree" :range="genderList" :rangeKey="rangeKey" confirmColor="#119fa9" :multiple="false" @confirm="cofirmgenderType"
		 :confirmText="confirmText" :cancelText="cancelText" @cancel="cancelgenderType" />
	</view>
</template>

<script>
	import tkiTree from "@/components/tki-tree/tki-tree.vue"
	import profile from "@/api/profile.js"

	export default {
		data() {
			return {
				xllCountry:'',
				xllRegion:'',
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
				genderValue: '', //性别

				qqLocpickerUrl: '',
				formatted_addresses: '',

				birthdateShow: false,
				selectDateStatus: false, // 是否选择生日

				country: '', //
				province: '',
				city: '',
				area:'',
				address:'',
				lon: '',
				lat: '',
		
				locationStatus: false,
				firstname: '',
				lastname: '',
				nickname: '', //昵称
				email:'',
				birthdate: '', //生日
				birthdateStr: '',
				applicationContact:'',

				jobSeekingValue: 0,
				publicProfileValue: 0,
				nationalityValue: '',
				nationalitySelectStatus: false,
				
				isFirstEdit:undefined,
				pickerText:'',
				wechatId:'',
				selectEducatorTypeList: [],
				range: [],
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
			
			this.subCateList()
			this.isFirstEdit = option.firstEdit;
			this.getBasicInfo();
			
			uni.$on('nationalityObj', function(data) {
				console.log(data)
				that.nationalityValue = data.name;
				that.nationalitySelectStatus = true;
			})
			this.getApplicationContact()
			
			uni.$on('locationEvent',function(data){
				console.log(data)
				that.province = data.province;
				that.city = data.city;
				that.area = data.area;
				that.locationStatus = true;
				that.pickerText =  data.area + ', ' + data.city + ', ' + data.province;
			})
			// console.log(that.pickerText)
		},
		methods: {
			subCateList: function() {
				let data = {
					pid:1,
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
			chooseLocation(){
				uni.navigateTo({
					url:'/pages/location/location'
				})
			},
			getApplicationContact(){
				let data = {
					token:uni.getStorageSync('token'),
					user_id:uni.getStorageSync('uid')
				}
				profile.getApplicationContact(data).then(res=>{
					console.log(res)
					if(res.code == 200){
						this.applicationContact=res.message.apply_contact;
					}
				}).catch(error=>{
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
						
						this.firstname = basicUserInfo.educator_info.first_name;
						this.lastname = basicUserInfo.educator_info.last_name;
						this.nickname = basicUserInfo.educator_info.nickname;
						this.nationalityValue = basicUserInfo.educator_info.nationality;
						this.birthdateStr = basicUserInfo.birthday;
						this.jobSeekingValue = basicUserInfo.is_seeking;
						this.publicProfileValue = basicUserInfo.is_public;
						this.wechatId = basicUserInfo.educator_info.wx_id;
						this.email = basicUserInfo.educator_info.email;
						let subIdentityIdStr  = basicUserInfo.educator_info.sub_identity_id;
					
						this.selectEducatorTypeList = subIdentityIdStr.split(',').map(Number)
					
						this.address = basicUserInfo.educator_info.address;
						
						if (this.nationalityValue != '') {
							this.nationalitySelectStatus = true;
						}
						if (this.birthdateStr != '' && this.birthdateStr != '0000-00-00') {
							this.selectDateStatus = true;
						}
						if(basicUserInfo.educator_info.province!='' && basicUserInfo.educator_info.city !='' && basicUserInfo.educator_info.district !=''){
							that.province = basicUserInfo.educator_info.province;
							that.city = basicUserInfo.educator_info.city;
							that.district = basicUserInfo.educator_info.district;
							this.pickerText = basicUserInfo.educator_info.district + ', '+basicUserInfo.educator_info.city + ', '+ basicUserInfo.educator_info.province
							this.locationStatus=true;
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
			birthdateConfirm(e) {
				this.selectDateStatus = true;
				let year = e.year;
				let month = e.month;
				let day = e.day;
				this.birthdateStr = year + '-' + month + '-' + day;
				this.birthdate = year + '-' + month + '-' + day;
				console.log(e)
			},
			changeGenderValue: function(e) {
				let key = e.target.value;
				let genderList = this.genderList;
				this.genderValue = genderList[key];
				this.genderStatus = true;
				this.genderId = genderList[key].id;
				console.log(this.genderId)
			},
			jobSeekingChange(e) {
				console.log(e)
				let value = e.detail.value;
				if (value) {
					this.jobSeekingValue = 1;
				} else {
					this.jobSeekingValue = 0;
				}
			},
			publicProfileChange(e) {
				console.log(e)
				let value = e.detail.value;
				if (value) {
					this.publicProfileValue = 1;
				} else {
					this.publicProfileValue = 0;
				}
			},
			basicSubmit() {
				
				let educatorType = this.selectEducatorTypeList.join(',');
				console.log(educatorType)
				let data = {
					first_name: this.firstname,
					last_name: this.lastname,
					nickname: this.nickname,
					email:this.email,
					sex: this.genderValue.id,
					nationality: this.nationalityValue,
					birthday: this.birthdate,
					country: this.country,
					province: this.province,
					city: this.city,
					district:this.area,
					address:this.address,
					lon: this.lon,
					lat: this.lat,
					is_seeking: this.jobSeekingValue,
					is_public: this.publicProfileValue,
					apply_contact:this.applicationContact,
					wx_id:this.wechatId,
					sub_identity: educatorType,
					token: uni.getStorageSync('token')
				}
				profile.addEduBasic(data).then(res => {
					console.log(res)
					uni.$emit('userInfoUpdated',{msg:'page updated'});
					if (res.code == 200) {
						if(this.isFirstEdit==1){
							
							uni.reLaunch({
								url:'/pages/me/profile/photo?type=13'
							})
						}else{
							uni.reLaunch({
								url: '../home'
							})
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

			}

		},
		onReady() {
			
		}
	}
</script>

<style>
	@import url("@/common/me/basic.css");
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
	
	}
	
	.tag-active {
		background-color: #00b3d2;
		color: #FFFFFF;
	}
	.role-form-type-1 {
		margin-top: 20rpx;
		height: 80rpx;
		text-align: left;
		font-size: 34rpx;
		font-weight: 700;
	}
	
	.role-form-type-1 text {
		font-size: 32rpx;
	}
	
</style>
