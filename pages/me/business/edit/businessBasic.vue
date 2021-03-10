<template>
	<view class="uni-flex uni-column basic-bg">
		<view class="flex-item basic-title">
			{{i18n.profilebusinessbasicinfo}}
		</view>
		<view class="flex-item basic-form">
			<view class="basic-form-phone">
				<view class="basic-form-label">{{i18n.profilebusinessinfobusinessname}}</view>
				<input type="text"  v-model="businessNameValue" :placeholder="i18n.profilebusinessinfobusinessnameph" />
			</view>
			<view class="basic-form-bio">
				<view class="basic-form-label">{{i18n.profilebusinessbio}}</view>
				<fuck-textarea :maxlength="200" v-model="bioValue" :placeholder="i18n.profilebusinessbioph"></fuck-textarea>
			</view>
			<view class="basic-form-year">
				<view class="basic-form-label">{{i18n.profileyearfounded}}</view>
				<view class="basic-form-year-1" @click="yearFoundedShow=true" v-if="selectYearStatus">{{yearFoundedStr}}</view>
				<view class="basic-form-year-2" @click="yearFoundedShow=true" v-if="selectYearStatus===false">{{i18n.profilechooseyearfounded}}</view>
				<u-picker :show-time-tag="false" end-year="2020" confirm-text="Confirm" cancel-text="Cancel" v-model="yearFoundedShow" mode="time"
				 :params="{year:true}" @confirm="yearFoundedConfirm"></u-picker>
			</view>
			<view class="basic-form-current-city">
				<view class="basic-form-label">{{i18n.profilebusinesslocation}}</view>
				<view class="basic-form-location" @click="chooseLocation">
				<text v-if="locationStatus">{{pickerText}}</text>
				<text v-if="locationStatus===false">{{i18n.basicbusinesstwochooselocation}}</text>
				</view>
			</view>
			<view class="basic-form-website">
				<view class="basic-form-label">{{i18n.profilewebsite}}</view>
				<input type="text" v-model="webSiteValue" :placeholder="i18n.profilewebsiteph" />
			</view>
			<view class="basic-form-phone">
				<view class="basic-form-label">{{i18n.profilebusinessphone}}</view>
				<input type="number" :maxlength="11" v-model="phoneValue"  :placeholder="i18n.profilebusinessphoneph" />
			</view>
			<!-- <view class="basic-form-phone">
				<view class="basic-form-label">{{i18n.profilecontactname}}</view>
				<input type="text" v-model="contactNameValue" :placeholder="i18n.profilecontactnameph" />
			</view> -->
			<!-- <view class="basic-form-phone">
				<view class="basic-form-label">{{i18n.profilecontactphone}}</view>
				<input type="number" :maxlength="11" v-model="contactPhoneValue" :placeholder="i18n.profilecontactphoneph" />
			</view> -->
			<view class="toggels-title">{{i18n.profilebusinessbasicturnontoggels}}</view>
			<view class="basic-form-hiring">
				<view class="basic-form-label">{{i18n.profilecurrentlyhiring}}</view>
				<switch style="margin-left: 20rpx;" :checked="hiringValue==1" color="#0AA0A8" @change="hiringChange" />
			</view>
			<!-- <view class="basic-form-hiring">
				<view class="basic-form-label">{{i18n.profilebusinessbasicisschool}}</view>
				<switch style="margin-left: 20rpx;" :checked="isSchoolValue==1" color="#0AA0A8" @change="isSchoolChange" />
			</view> -->
			<!--  -->
			<!-- <view class="school-container"  v-if="showSchoolStatus">
				<view class="school-curriculum">
					<view class="basic-form-label">{{i18n.profilecurriculum}}</view>
					<fuck-textarea :maxlength="200" v-model="curriculumValue" :placeholder="i18n.profilecurriculumph"></fuck-textarea>
				</view>
				<view class="school-technology">
					<view class="basic-form-label">{{i18n.profiletechnologyavailable}}</view>
					<fuck-textarea :maxlength="200" v-model="technologyValue" :placeholder="i18n.profiletechnologyavailableph "></fuck-textarea>
				</view>
				<view class="school-staff">
					<view class="basic-form-label">{{i18n.profileaverageclasssize}}</view>
					<input type="number" v-model="staffValue" :placeholder="i18n.profileaverageclasssizeph" />
				</view>
				<view class="school-trips">
					<view class="basic-form-label">{{i18n.profilefieldstrips}}</view>
					<switch style="margin-left: 20rpx;" :checked="tripsValue==1" color="#0AA0A8" @change="tripsChange" />
				</view>
				<view class="school-events">
					<view class="basic-form-label">{{i18n.profileevents}}</view>
					<switch style="margin-left: 20rpx;" :checked="eventsValue==1" color="#0AA0A8" @change="eventsChange" />
				</view>
				<view class="school-needs">
					<view class="basic-form-label">{{i18n.profilespecialneeds}}</view>
					<switch style="margin-left: 20rpx;" :checked="needsValue==1" color="#0AA0A8" @change="needsChange" />
				</view>
			</view> -->
			
		</view>
		<view class="flex-item basic-submit">
			<button @click="basicSubmit" type="default">{{i18n.profileeditsubmit}}</button>
		</view>
	</view>
</template>

<script>
	import tkiTree from "@/components/tki-tree/tki-tree.vue";
	import profile from "@/api/profile.js";
	import formCheck from '@/common/formChecker.js';

	export default {
		data() {

			return {
				confirmText: 'Confirm',
				cancelText: 'Cancel',
				
				formatted_addresses: '',
				yearFoundedShow: false,
				selectYearStatus: false, // 是否选择生日

				country: '', //
				province: '',
				city: '',
				area:'',
				lon: '',
				lat: '',
				qqmapMarkUrl: '',
				geolocation: '',
				locationStatus: false,
				pickerText:'',

				jobSeekingValue: 0,
				publicProfileValue: 0,
				nationalityValue: '',
				nationalitySelectStatus: false,
				bioValue: '',
				headlineValue: "",
				webSiteValue: '',
				phoneValue: '',
				contactNameValue:'',
				contactPhoneValue:'',
				yearFoundedStr: '',
				hiringValue: 0,
				schoolsValue: '',
				curriculumValue: '',
				needsValue: 0,
				staffValue: "",
				technologyValue: "",
				tripsValue: '',
				eventsValue: 0,
				businessNameValue:'',

				showSchoolStatus: false,
				isSchoolValue: 0,

			}
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
			uni.$on('locationEvent',function(data){
				console.log(data)
				that.province = data.province;
				that.city = data.city;
				that.area = data.area;
				that.locationStatus = true;
				that.pickerText =  that.area + ', ' + that.city + ', ' + that.province;
			})
			
			this.getBasicInfo();

		},
		methods: {
			chooseLocation(){
				uni.navigateTo({
					url:'/pages/location/location'
				})
			},
			turnSearchTags() {
				uni.navigateTo({
					url: '/pages/me/profile/searchTags'
				})
			},
			showgenderPicker() {
				this.$refs.tkitree._show()
			},

			yearFoundedConfirm(e) {
				this.selectYearStatus = true;
				let year = e.year;
				let month = e.month;
				let day = e.day;
				this.yearFoundedStr = year;
				console.log(e)
			},
			hiringChange(e) {
				console.log(e)
				if (e.detail.value) {
					this.hiringValue = 1;
				} else {
					this.hiringValue = 0;
				}
			},
			isSchoolChange(e) {
				if (e.detail.value) {
					this.isSchoolValue = 1;
					this.showSchoolStatus = true;
				} else {
					this.isSchoolValue = 0;
					this.showSchoolStatus = false;
				}
			},
			tripsChange(e) {
				console.log(e)
				if (e.detail.value) {
					this.tripsValue = 1;
				} else {
					this.tripsValue = 0;
				}
			},
			needsChange(e) {
				console.log(e)
				if (e.detail.value) {
					this.needsValue = 1;
				} else {
					this.needsValue = 0;
				}
			},
			eventsChange(e) {
				console.log(e)
				if (e.detail.value) {
					this.eventsValue = 1;
				} else {
					this.eventsValue = 0;
				}
			},
			basicSubmit() {

				let data = {
					token: uni.getStorageSync('token'),
					business_name:this.businessNameValue,
					business_bio: this.bioValue,
					year_founded: this.yearFoundedStr,
					country: this.country,
					province: this.province,
					city: this.city,
					district:this.area,
					website: this.webSiteValue,
					business_phone: this.phoneValue,
					is_currently_hiring: this.hiringValue,
					curriculum: this.curriculumValue,
					is_special_needs: this.needsValue,
					staff_student_ratio: this.staffValue,
					technology_available: this.technologyValue,
					felds_trips: this.tripsValue,
					is_events: this.eventsValue,
					contact_name:this.contactNameValue,
					contact_phone:this.contactPhoneValue,
					is_school:this.isSchoolValue
				}
				
				
				// if (!formCheck.checkPhone(this.phoneValue)) {
				// 	return uni.showToast({
				// 		title: 'Please enter a valid phone number ',
				// 		icon: 'none'
				// 	})
				// }
			
				profile.addBusinessBasic(data).then(res => {
					console.log(res)
					if (res.code == 200) {
						uni.navigateTo({
							url: '../home?current=0'
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

						let businessInfo = res.message.business_info;
						that.businessNameValue = businessInfo.business_name;
						that.bioValue = businessInfo.business_bio;
						that.yearFoundedStr = businessInfo.year_founded;
						if(that.yearFoundedStr != ''){
							this.selectYearStatus=true;
						}
						that.webSiteValue = businessInfo.website;
						that.phoneValue = businessInfo.business_phone;
						that.hiringValue = businessInfo.is_currently_hiring;
						that.curriculumValue = businessInfo.curriculum;
						that.technologyValue = businessInfo.technology_available;
						that.staffValue = businessInfo.staff_student_ratio;
						that.tripsValue = businessInfo.felds_trips;
						that.eventsValue = businessInfo.is_events;
						that.needsValue = businessInfo.is_special_needs;
						that.contactNameValue = businessInfo.contact_name;
						that.contactPhoneValue = businessInfo.contact_phone;
						that.isSchoolValue = businessInfo.is_school;
						if(that.isSchoolValue == 1){
							this.showSchoolStatus=true;
						}
						
						if(businessInfo.province!='' && businessInfo.city !='' && businessInfo.district !=''){
							that.province = businessInfo.province;
							that.city = businessInfo.city;
							that.district = businessInfo.district;
							this.pickerText = businessInfo.district + ', '+businessInfo.city + ', '+ businessInfo.province
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

		},
		
	}
</script>

<style>
	page {
		background-color: #F4F5F6;
	}

	.basic-title {
		text-align: center;
		font-size: 38rpx;
		font-weight: 700;
		background-color: #004956;
		color: #FFFFFF;
		height: 200rpx;

		line-height: 200rpx;

	}

	.basic-form {
		width: 96%;
		margin: 0 auto;
		margin-top: 20rpx;
		padding: 20rpx;
		background-color: #FFFFFF;
		border-radius: 20rpx;

	}

	input {
		height: 80rpx;
		text-align: left;
		border: 1rpx solid #EEEEEE;
		border-radius: 20rpx;
		font-size: 30rpx;
		line-height: 80rpx;
		text-indent: 20rpx;
	}

	.uni-input-placeholder {
		text-align: left;
		font-size: 30rpx;
		text-indent: 20rpx;
	}

	.basic-form-label {
		font-size: 34rpx;
		font-weight: 700;
		text-align: left;
	}

	.basic-form-bio {
		width: 100%;
		margin-top: 20rpx;
	}


	.basic-form-headline {
		width: 100%;
		margin-top: 20rpx;
	}

	.basic-form-year {
		width: 100%;
		margin-top: 10rpx;
		text-align: center;
	}

	.basic-form-year-1,
	.basic-form-year-2 {
		height: 80rpx;
		line-height: 80rpx;
		border: 1px solid #EEEEEE;
		border-radius: 20rpx;
		font-size: 30rpx;
		text-align: left;
		text-indent: 20rpx;
	}

	.basic-form-year-2 {
		color: #808080;
	}

	.basic-form-location {
		height: 80rpx;
		line-height: 80rpx;
		border: 1px solid #EEEEEE;
		border-radius: 20rpx;
		font-size: 30rpx;
		text-align: left;
		text-indent: 20rpx;
	}

	.basic-form-birthday {
		width: 100%;
		height: 80rpx;
		margin-top: 10rpx;
		text-align: center;
	}

	.basic-form-birthday-1 {
		height: 100%;
		line-height: 80rpx;
		font-size: 32rpx;
		color: #333333;
	}

	.basic-form-birthday-2 {
		height: 100%;
		line-height: 80rpx;
		font-size: 32rpx;
		color: #808080;
	}

	.basic-form-current-city {
		width: 100%;
		/* height: 80rpx; */
		margin-top: 20rpx;
		/* border-bottom: 1px solid #EEEEEE; */
		text-align: center;
		font-size: 32rpx;
		color: #333333;
	}


	.basic-form-website {
		/* margin-top: 20rpx; */
		width: 100%;
		/* height: 80rpx; */
		margin-top: 20rpx;
		/* border-bottom: 1px solid #EEEEEE; */
		text-align: center;
		font-size: 32rpx;
		color: #333333;
	}

	.basic-form-phone {
		width: 100%;
		/* height: 80rpx; */
		margin-top: 20rpx;
		/* border-bottom: 1px solid #EEEEEE; */
		text-align: center;
		font-size: 32rpx;
		color: #333333;
	}

	.basic-form-hiring {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		margin-top: 20rpx;
	}

	.school-curriculum {
		margin-top: 20rpx;
	}

	.school-technology {
		margin-top: 20rpx;
	}

	.school-staff {
		width: 100%;
		/* height: 80rpx; */
		margin-top: 20rpx;
		/* border-bottom: 1px solid #EEEEEE; */
		text-align: center;
		font-size: 32rpx;
		color: #333333;
	}

	.school-trips {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		margin-top: 20rpx;
	}

	.school-events {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		margin-top: 20rpx;
	}

	.school-needs {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		margin-top: 20rpx;
	}

	.basic-form-toggle-box {
		width: 100%;

		margin-top: 20rpx;
		/* border-bottom: 1px solid #EEEEEE; */
		text-align: center;
		display: flex;
		flex-direction: column;


	}

	.basic-form-job-seeking {
		border-bottom: 1px solid #EEEEEE;
		padding-bottom: 10rpx;
	}

	.basic-form-public-profile {
		padding-top: 20rpx;
	}

	.basic-submit {
		width: 80%;
		margin: 0 auto;
		margin-top: 10%;
		padding-bottom: 100rpx;

	}

	.basic-submit button {
		background-color: #004956;
		box-sizing: border-box;
		color: #FFFFFF;
		height: 80rpx;
		border-radius: 80rpx;
		line-height: 80rpx;
	}
	.toggels-title{
		margin-top: 10rpx;
		font-size: 34rpx;
		font-weight: 700;
		line-height: 80rpx;
		border-bottom: 1rpx solid #EEEEEE;
	}
</style>
