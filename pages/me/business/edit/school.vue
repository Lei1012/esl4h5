<template>
	<view class="uni-flex uni-column basic-bg">
		<view class="flex-item basic-title">
			{{i18n.profilebusinessschoolinfo}}
		</view>
		<view class="flex-item basic-form">
			<view class="school-container">
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
			</view>
			
			<view class="student-age">
				<view class="student-age-t">
					<view class="student-age-title">{{i18n.profilebusinessourstudentage}}</view>
				</view>
				<view class="jobs-tags-container">
					<view class="jobs-tags">
						<view class="jobs-tags-item" :class=" selectStudentAgeList.findIndex((element)=>element.id===item.id) == -1 ? '' : 'tags-active' "
						 v-for="(item,index) in editStudentAgeList" :key="item.id" @click="selectStudentAge(item,1)">
							{{item.object_en}}
						</view>
						<view class="jobs-tags-item" :class=" selectStudentAgeList.findIndex((element)=>element===item) == -1 ? '' : 'tags-active' "
						 v-for="(item,index) in ownStudentAgeList" :key="index" @click="selectStudentAge(item,2)">
							{{item.object_name}}
						</view>
					</view>
					
				</view>
				
				<view class="subject" style="padding-right: 0;">
					<view class="subject-t">
						<view class="subject-title">{{i18n.profilebusinesssubjectsweteach}}</view>
					</view>
					<view class="jobs-tags-container">
						<view class="jobs-tags">
							<view class="jobs-tags-item" :class=" selectSubjectList.findIndex((element)=>element.id===item.id) == -1 ? '' : 'tags-active' "
							 v-for="(item,index) in editSubjectList" :key="item.id" @click="selectSubject(item,1)">
								{{item.object_en}}
							</view>
							<view class="jobs-tags-item" :class=" selectSubjectList.findIndex((element)=>element===item) == -1 ? '' : 'tags-active' "
							 v-for="(item,index) in ownSubjectList" :key="index" @click="selectSubject(item,2)">
								{{item.object_name}}
							</view>
						</view>
						<view class="jobs-tags-item" v-if="addSubjectStatus==false" @click="addSubjectStatus=true">Add+</view>
						<view class="jobs-tags-add">
							<view class="jobs-tags-item-add" v-if="addSubjectStatus">
								<input type="text" v-model="ownSubjectValue" placeholder="Add subject">
								<view class="jobs-tags-item-add-button">
									<button type="default" v-if="ownSubjectValue.length>0" @click="addOwnSubject">Confirm</button>
									<button type="default" v-if="ownSubjectValue.length==0" @click="addSubjectStatus=false">Cancel</button>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			
			
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
				
				isSchoolValue: 0,
				
				subjectList: [],
				studentAgeList: [],
				selectStudentAgeList: [],
				selectStudentAgeArr: [],
				
				editStudentAgeList: [],
				addStudentAgeStatus: false,
				ownStudentAgeValue: '',
				ownStudentAgeList: [],
				selectStudentAgeList: [],
				selectStudentAgeArr: [],
				
				editSubjectList: [],
				addSubjectStatus: false,
				ownSubjectValue: '',
				ownSubjectList: [],
				selectSubjectList: [],
				selectSubjectArr: [],

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
			that.turnSearchTags(73);
			that.turnSearchTags(1);
			that.getBasicInfo();
		

		},
		methods: {
			chooseLocation(){
				uni.navigateTo({
					url:'/pages/location/location'
				})
			},
			turnSearchTags(type) {
			
				// student age
				let data = {
					token: uni.getStorageSync('token'),
					pid: type
				}
				this.selectStudentAgeList = [];
				this.ownStudentAgeList = [];
			
				profile.getUserObjectList(data).then(res => {
					if (type == 73) {
						this.editStudentAgeList = res.message;
					}
			
					if (type == 1) {
						this.editSubjectList = res.message;
						
			
					}
			
				}).catch(error => {
					console.log(error)
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
					is_currently_hiring: this.hiringValue,
					curriculum: this.curriculumValue,
					is_special_needs: this.needsValue,
					staff_student_ratio: this.staffValue,
					technology_available: this.technologyValue,
					felds_trips: this.tripsValue,
					is_events: this.eventsValue,
					is_school:1
				}
				
				profile.addBusinessBasic(data).then(res => {
					console.log(res)
					if (res.code == 200) {
						this.studentAgeConfirm();
						this.subjectConfirm();
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
						
						if (res.message.business_info.subject != undefined) {
							that.subjectList = res.message.business_info.subject;
							let len = this.subjectList.length;
							let subjectList = this.subjectList;
							console.log(len);
							for (var i = 0; i < len; i++) {
								console.log(subjectList[i].object_id);
								if (subjectList[i].object_id == 0) {
									let obj = {
										id: subjectList[i].object_id,
										object_pid: subjectList[i].object_pid,
										object_name: subjectList[i].object_en
									}
									this.ownSubjectList.push(obj);
									this.selectSubjectList.push(obj)
								} else {
									let obj = {
										id: subjectList[i].object_id,
										pid: subjectList[i].object_pid,
										object_en: subjectList[i].object_en,
										object_cn: subjectList[i].object_cn
									}
									this.selectSubjectList.push(obj)
								}
							}
						}
						if (res.message.business_info.Student_Age != undefined) {
							that.studentAgeList = res.message.business_info.Student_Age;
							
							console.log(this.studentAgeList);
							let len = this.studentAgeList.length;
							let studentAgeList = this.studentAgeList;
							console.log(len);
							for (var i = 0; i < len; i++) {
								console.log(studentAgeList[i].object_id);
								if (studentAgeList[i].object_id == 0) {
									let obj = {
										id: studentAgeList[i].object_id,
										object_pid: studentAgeList[i].object_pid,
										object_name: studentAgeList[i].object_en
									}
									this.ownStudentAgeList.push(obj);
									this.selectStudentAgeList.push(obj)
								} else {
									let obj = {
										id: studentAgeList[i].object_id,
										pid: studentAgeList[i].object_pid,
										object_en: studentAgeList[i].object_en,
										object_cn: studentAgeList[i].object_cn
									}
									this.selectStudentAgeList.push(obj)
								}
							}
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
			addOwnStudentAge() {
				this.addStudentAgeStatus = false;
				let obj = {
					id: 0,
					object_name: this.ownStudentAgeValue,
					object_pid: 73
				}
				let index = this.selectStudentAgeList.findIndex((element) => element === obj);
				if (index == -1) {
					// if (this.selectStudentAgeList.length > 4) {
					// 	return false;
					// }
					this.selectStudentAgeList.push(obj);
					this.ownStudentAgeList.push(obj);
					this.ownStudentAgeValue = '';
				} else {
					this.selectStudentAgeList.splice(index, 1);
				}
			
			},
			selectStudentAge(value, type) {
			
				if (type == 1) {
					var index = this.selectStudentAgeList.findIndex((element) => element.id === value.id);
				}
				if (type == 2) {
					var index = this.selectStudentAgeList.findIndex((element) => element === value);
				}
			
				if (index == -1) {
					// if (this.selectStudentAgeList.length > 4) {
					// 	return false;
					// }
					this.selectStudentAgeList.push(value);
			
				} else {
					this.selectStudentAgeList.splice(index, 1);
				}
				console.log(this.selectStudentAgeList)
			},
			studentAgeConfirm() {
			
				let expand = [];
				let objectArr = [];
				this.selectStudentAgeList.forEach(item => {
					console.log(item);
					if (item.id === 0) {
						expand.push(item.object_name);
					} else {
						objectArr.push(item.id);
					}
				})
			
				let data = {
					token: uni.getStorageSync('token'),
					object_pid: 73,
					object_id: objectArr,
					expand: expand
				}
			
				profile.addProfile(data).then(res => {
					if (res.code == 200) {
						console.log('StudentAge--submit--' + res.data);
						this.canEditStudentAge = false;
						this.getBasicInfo();
					} else {
						console.log('StudentAge--submit--' + res.msg);
					}
			
				}).catch(error => {
					console.log(error)
				})
			},
			addOwnSubject() {
				this.addSubjectStatus = false;
				let obj = {
					id: 0,
					object_name: this.ownSubjectValue,
					object_pid: 1
				}
				let index = this.selectSubjectList.findIndex((element) => element === obj);
				if (index == -1) {
					// if (this.selectSubjectList.length > 4) {
					// 	return false;
					// }
					this.selectSubjectList.push(obj);
					this.ownSubjectList.push(obj);
					this.ownSubjectValue = '';
			
				} else {
					this.selectSubjectList.splice(index, 1);
				}
			
			},
			selectSubject(value, type) {
			
				if (type == 1) {
					var index = this.selectSubjectList.findIndex((element) => element.id === value.id);
				}
				if (type == 2) {
					var index = this.selectSubjectList.findIndex((element) => element === value);
				}
			
				if (index == -1) {
					// if (this.selectSubjectList.length > 4) {
					// 	return false;
					// }
					this.selectSubjectList.push(value);
			
				} else {
					this.selectSubjectList.splice(index, 1);
				}
				console.log(this.selectSubjectList)
			},
			subjectConfirm() {
			
				let expand = [];
				let objectArr = [];
				this.selectSubjectList.forEach(item => {
					console.log(item);
					if (item.id === 0) {
						expand.push(item.object_name);
					} else {
						objectArr.push(item.id);
					}
				})
			
				let data = {
					token: uni.getStorageSync('token'),
					object_pid: 1,
					object_id: objectArr,
					expand: expand
				}
			
				profile.addProfile(data).then(res => {
					if (res.code == 200) {
						console.log('subject--submit--' + res.data);
						this.canEditSubject = false;
						this.getBasicInfo();
					} else {
						console.log('subject--submit--' + res.msg);
					}
			
				}).catch(error => {
					console.log(error)
				})
			},

		},

		onReady() {
			
		}
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
	
	.student-age,.subject {
		margin-top:20rpx;
		background-color: #FFFFFF;
		border-radius: 20rpx;
		padding-right: 20rpx;
		padding-top: 14rpx;
		padding-bottom: 20rpx;
	}
	.student-age-title ,.subject-title{
		font-size: 34rpx;
		font-weight: 700;
	}
	.student-age-t,.subject-t {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		line-height: 80rpx;
	}
	.student-age-b ,.subject-b{
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		flex-wrap: wrap;
		margin-top: 10rpx;
	}
	.student-age-item,.subject-item {
		background-color: rgba(0, 179, 210, 0.1);
		color: #333333;
		padding-left: 20rpx;
		padding-right: 20rpx;
		border-radius: 60rpx;
		margin-top: 10rpx;
		margin-left: 20rpx;
		height: 60rpx;
		line-height: 60rpx;
		font-size: 30rpx;
	}
	
	.edit-icon {
		width: 80rpx;
		height:80rpx;
		display: flex;
		align-items: center;
		justify-content: flex-end;
	}
	
	.edit-icon image {
		width: 40rpx;
		height: 40rpx;
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
		font-size: 30rpx;
		/* width: 100%; */
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
		border-radius: 20rpx;
	}
	
	.tags-active {
		background-color: #00CE47;
		color: #FFFFFF;
	}
</style>
