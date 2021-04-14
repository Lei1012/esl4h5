<template>
	<view class="uni-flex uni-column basic-bg">
		<view class="flex-item basic-title">
			{{i18n.profilebusinessschoolinfo}}
		</view>
		<view class="flex-item basic-form">
			
			<u-form :model="form" :rules="rules" ref="uForm" :error-type="errorType" label-position="top"
				:label-style="{'font-weight':700}">
				<u-form-item :label="i18n.profilecurriculum" prop="curriculum" >
					<u-input border :maxlength="200" type="textarea" v-model="form.curriculum" height="150"	:placeholder="i18n.profilecurriculumph" /> 
					 <view class="textarea-number"> {{form.curriculum.length}}/200</view>
				</u-form-item>
				
				<u-form-item :label="i18n.profiletechnologyavailable"  prop="technology_available">
					<u-input border :maxlength="200" type="textarea" v-model="form.technology_available"
					 height="150"	:placeholder="i18n.profiletechnologyavailableph" />
					 <view class="textarea-number"> {{form.technology_available.length}}/200</view>
				</u-form-item>
				<u-form-item :label="i18n.profileaverageclasssize"  prop="staff_student_ratio">
					<u-input border type="number" :maxlength="11" v-model="form.staff_student_ratio"
						:placeholder="i18n.profileaverageclasssizeph" />
				</u-form-item>
			</u-form>
			
			<view class="switch-container">
				<view class="basic-form-label">{{i18n.profilefieldstrips}}</view>
				<switch style="margin-left: 20rpx;"  :checked="form.felds_trips==1" color="#0AA0A8" @change="tripsChange" />
			</view>
			<view class="switch-container">
				<view class="basic-form-label">{{i18n.profileevents}}</view>
				<switch style="margin-left: 20rpx;" :checked="form.is_events==1" color="#0AA0A8" @change="eventsChange" />
			</view>
			<view class="switch-container">
				<view class="basic-form-label">{{i18n.profilespecialneeds}}</view>
				<switch style="margin-left: 20rpx;" :checked="form.is_special_needs==1" color="#0AA0A8" @change="needsChange" />
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
				
				subjectList: [],
				studentAgeList: [],
				
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
				
				errorType:['message'],
				form:{
					is_currently_hiring: '',
					curriculum: '',
					is_special_needs: '',
					staff_student_ratio: '',
					technology_available: '',
					felds_trips: '',
					is_events: '',
					is_school:1
				},
				rules:{
					curriculum: [{
						required:false,
						mini:0,
						max:200,
						message: '200',
						trigger: ['change', 'blur'],
					}, ],
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
			that.turnSearchTags(73);
			that.turnSearchTags(1);
			that.getBasicInfo();
		},
		methods: {
			
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
			tripsChange(e) {
				console.log(e)
				if (e.detail.value) {
					this.form.felds_trips = 1;
				} else {
					this.form.felds_trips = 0;
				}
			},
			needsChange(e) {
				console.log(e)
				if (e.detail.value) {
					this.form.is_special_needs = 1;
				} else {
					this.form.is_special_needs = 0;
				}
			},
			eventsChange(e) {
				console.log(e)
				if (e.detail.value) {
					this.form.is_events = 1;
				} else {
					this.form.is_events = 0;
				}
			},
			basicSubmit() {
				var that = this;
				this.$refs.uForm.validate(valid => {
					if (valid) {
						console.log('验证通过');
						that.form.token = uni.getStorageSync('token');
						let data = Object.assign({},that.form);
						profile.addBusinessBasic(data).then(res => {
							console.log(res)
							if (res.code == 200) {
								uni.showLoading({
									title:'loading'
								})
								that.studentAgeConfirm();
								that.subjectConfirm();
								setTimeout(function(){
									uni.hideLoading();
									uni.navigateTo({
										url: '../home?current=0'
									})
								},1200)
								
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

						let businessInfo = res.message.business_info;
						that.form.curriculum = businessInfo.curriculum;
						that.form.technology_available = businessInfo.technology_available;
						that.form.staff_student_ratio = businessInfo.staff_student_ratio;
						that.form.felds_trips = businessInfo.felds_trips;
						that.form.is_events = businessInfo.is_events;
						that.form.is_special_needs = businessInfo.is_special_needs;
						that.form.is_school = businessInfo.is_school;
						
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
			this.$refs.uForm.setRules(this.rules);
		}
	}
</script>

<style>
	page {
		background-color: #F4F5F6;
	}
	.textarea-number{
		font-size: 24rpx;
		text-align: right;
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

	.basic-form-label {
		font-size: 28rpx;
		font-weight: 700;
		text-align: left;
	}
	
	.switch-container{
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		margin-top: 20rpx;
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
	
	.student-age,.subject {
		margin-top:20rpx;
		background-color: #FFFFFF;
		border-radius: 20rpx;
		padding-right: 20rpx;
		padding-top: 14rpx;
		padding-bottom: 20rpx;
	}
	.student-age-title ,.subject-title{
		font-size: 28rpx;
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
		font-size: 28rpx;
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
		font-size: 28rpx;
		padding: 0;
		border-radius: 20rpx;
	}
	
	.tags-active {
		background-color: #00CE47;
		color: #FFFFFF;
	}
</style>
