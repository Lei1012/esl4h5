<template>
	<view class="uni-flex uni-column work-bg">
		<view class="flex-item work-title">
			{{i18n.profileeducation}}
		</view>
		<view class="flex-item work-form">
			<view class="education-form-school">
				<view class="education-form-title">{{i18n.profileschool}}</view>
				<input type="text" v-model="schoolValue" :placeholder="i18n.profileschoolph" />
			</view>
			<view class="education-form-degree">
				<view class="education-form-title">{{i18n.profiledegree}}</view>
				<view class="degree-2" v-if="degreeStatus==false" @click="degreeShow=true">{{i18n.profiledegreeph}}</view>
				<view class="degree-3" v-if="degreeStatus" @click="degreeShow=true">{{degreeStr}}</view>
			</view>
			
			<view class="education-form-field-study">
				<view class="education-form-title">{{i18n.profilefieldofstudy}}</view>
				<input type="text" v-model="fieldStudyValue" :placeholder="i18n.profilefieldofstudyph" />
			</view>
			<view class="education-form-year">
				<view class="education-form-title">{{i18n.profileeducationtimes}}</view>
				<view class="education-teaching-times">
					<view class="education-form-start-year" v-if="educationStartYearStatus" @click="startYearShow = true">
						{{educationStartYear | date('mm/yyyy') }}
					</view>
					<view class="education-form-start-year" v-if="educationStartYearStatus===false" @click="startYearShow = true">
						{{i18n.profilechoosestartyear}}
					</view>
					<view class="education-form-end-year" v-if="educationEndYearStatus" @click="endYearShow = true">
						{{educationEndYear | date('mm/yyyy') }}
					</view>
					<view class="education-form-end-year" v-if="educationEndYearStatus===false" @click="endYearShow = true">
						{{i18n.profilechooseendyear}}
					</view>
					<u-picker :show-time-tag="false" :params="{year:true,month:true}" confirm-text="Confirm" :end-year="startDateEndYear"
					 cancel-text="Cancel" v-model="startYearShow" mode="time" @confirm="startYearConfirm"></u-picker>
					<u-picker :show-time-tag="false" :params="{year:true,month:true}" confirm-text="Confirm" :start-year="endDateStartYear"
					 cancel-text="Cancel" v-model="endYearShow" mode="time" @confirm="endYearConfirm"></u-picker>
				</view>
			</view>

		</view>
		<view class="flex-item work-submit">
			<button type="default" @click="workSubmit">{{i18n.profileeditsubmit}}</button>
		</view>
		
		<u-select v-model="degreeShow" mode="single-column" cancelText="cancel" confirmText="confirm" :list="degreeList"
		 @confirm="degreeConfirm" value-name="object_en" label-name="object_en"></u-select>
	</view>
</template>

<script>
	import profile from '@/api/profile.js'
	import fuckTextarea from '@/components/fuck-textarea/fuck-textarea.vue'
	export default {
		data() {
			return {
				responValue: '',
				startDateShow: false,
				endDateShow: false,
				startYearShow: false,
				endYearShow: false,
				showTeaching: false,
				teachingList: [{
						value: '1',
						label: '1'
					},
					{
						value: '2',
						label: '2'
					}
				],

				educationStartYear: '',
				educationStartYearStr: '',
				educationStartYearStatus: false,
				educationEndYear: '',
				educationEndYearStr: '',
				educationEndYearStatus: false,
				teachingExpStatus: false,
				teachingExpValue: '',
				schoolValue: '',
				degreeValue: "",
				fieldStudyValue: '',
				gradeValue: "",
				type: 1,
				educationId: 1,
				endDateStartYear: 2021,
				startDateEndYear: 2021,
				degreeShow:false,
				degreeStatus:false,
				degreeList:[],
				degreeStr:''
				
			}
		},
		components: {
			fuckTextarea
		},
		computed: {
			i18n() {
				return this.$t('index')
			}
		},
		created() {
			this.getSubCateList()
		},
		onLoad(option) {
			var that = this;
			that.type = option.type;
			that.educationId = option.educationId;

			if (that.type == 2) {
				this.getBasicInfo();
			}

		},
		methods: {
			// 监听变化的数据
			change(arr) {
				console.log(JSON.stringify(arr));
			},
			degreeConfirm(e){
				var that = this;
				this.degreeStatus = true;
				e.forEach(item => {
					that.degreeValue = item.value;
					that.degreeStr = item.label;
				})
			},
			startYearConfirm(e) {
				console.log(e)
				let year = e.year;
				let month = e.month;
				let str = year + '-' + month + '-' + '01'
				let date = new Date(str)
				this.educationStartYear = Math.floor(date.getTime() / 1000);
				this.endDateStartYear = year;
				this.educationStartYearStatus = true;
			},
			endYearConfirm(e) {
				let year = e.year;
				let month = e.month;
				let str = year + '-' + month + '-' + '01'
				let date = new Date(str)
				this.startDateEndYear = year;
				let endDate = Math.floor(date.getTime() / 1000);

				if (endDate <= this.educationStartYear) {
					return uni.showToast({
						title: 'Select correct end year',
						icon: 'none'
					})
				} else {
					this.educationEndYear = endDate;
					this.educationEndYearStatus = true;
				}


			},
			showTeachingSelect() {
				this.showTeaching = true;
			},
			confirmTeaching(e) {
				// console.log(e)
				e.forEach(item => {
					console.log(item)
					this.teachingExpValue = item.value;
				})
				this.showTeaching = false;
				this.teachingExpStatus = true;
			},
			switchCpr(e) {
				console.log(e)
			},
			switchFirstAside(e) {
				console.log(e)
			},
			workSubmit() {

				if (this.type == 1) {
					var data = {
						token: uni.getStorageSync('token'),
						school_name: this.schoolValue,
						degree: this.degreeValue,
						field_of_study: this.fieldStudyValue,
						start_time: this.educationStartYear,
						end_time: this.educationEndYear,
						grade: this.gradeValue
					}

				}
				if (this.type == 2) {

					var data = {
						token: uni.getStorageSync('token'),
						school_name: this.schoolValue,
						degree: this.degreeValue,
						field_of_study: this.fieldStudyValue,
						start_time: this.educationStartYear,
						end_time: this.educationEndYear,
						grade: this.gradeValue,
						education_id: this.educationId
					}

				}

				if (this.schoolValue == '') {
					return uni.showToast({
						title: this.i18n.profileschoolph,
						icon: 'none'
					})
				}
				if (this.degreeValue == '') {
					return uni.showToast({
						title: this.i18n.profiledegreeph,
						icon: 'none'
					})
				}
				if (this.educationStartYear == '') {
					return uni.showToast({
						title: this.i18n.profilechoosestartyear,
						icon: 'none'
					})
				}
				if (this.educationEndYear == '') {
					return uni.showToast({
						title: this.i18n.profilechooseendyear,
						icon: 'none'
					})
				}

				profile.addUserEducation(data).then(res => {
					// console.log(res)
					if (res.code == 200) {
						uni.navigateBack({
							delta: 1
						})

					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
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
					// console.log(res)
					if (res.code == 200) {
						let result = res.message.educator_info.education_info;
						let education = result.filter(item => item.id === Number(this.educationId));
						let educationInfo = education[0];
						console.log(educationInfo)
						that.schoolValue = educationInfo.school_name;
						that.degreeValue = educationInfo.degree;
						if(educationInfo.degree != ''){
							this.degreeStatus = true;
							this.degreeStr = educationInfo.degree;
						}
						that.fieldStudyValue = educationInfo.field_of_study;
						that.gradeValue = educationInfo.grade;

						that.educationStartYear = educationInfo.start_time;

						if (that.educationStartYear != '') {
							that.educationStartYearStatus = true;
							that.startDateEndYear = this.$u.timeFormat(this.educationStartYear, 'yyyy');
						}
						that.educationEndYear = educationInfo.end_time;
						if (that.educationEndYear != '') {
							that.educationEndYearStatus = true;
							that.endDateStartYear = this.$u.timeFormat(this.educationEndYear, 'yyyy');
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
			getSubCateList(type) {
				let data = {
					token: uni.getStorageSync('token')
				}
				profile.getUserObjectList(data).then(res => {
					// console.log(res);
					if (res.code == 200) {
						this.degreeList = res.message.filter(item => item.pid === 125); // education
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
					}
				}).catch(error => {
					console.log(error);
				})
			},

		}
	}
</script>

<style>
	.work-bg {
		width: 100%;
		height: 100%;
		background-color: #F4F5F6;
	}

	.work-title {
		text-align: center;
		font-size: 38rpx;
		font-weight: 700;
		background-color: #004956;
		color: #FFFFFF;
		height: 200rpx;
		line-height: 200rpx;
	}

	.work-form {
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
		border: 1px solid #EEEEEE;
		border-radius: 20rpx;
		text-indent: 20rpx;
		font-size: 30rpx;
	}

	.uni-input-placeholder {
		text-align: left;
		text-indent: 20rpx;
		font-size: 30rpx;
	}

	.education-form-title {
		font-size: 34rpx;
		font-weight: 700;

	}
	.degree-2{
		text-indent: 20rpx;
		color: #808080;
	}
	.degree-3{
		text-indent: 20rpx;
	}

	.education-form-year {
		width: 100%;
		/* height: 80rpx; */
		line-height: 80rpx;
		margin-top: 20rpx;

	}

	.education-teaching-times {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		border-bottom: 1px solid #EEEEEE;
	}

	.education-form-start-year,
	.education-form-end-year {
		width: 50%;
		height: 100%;
		line-height: 80rpx;
		text-align: center;
		font-size: 30rpx;
	}


	.education-form-school {
		width: 100%;
		/* height: 80rpx; */
		margin-top: 20rpx;
	}

	.education-form-degree {
		width: 100%;
		/* height: 80rpx; */
		margin-top: 20rpx;
	}

	.education-form-field-study {
		width: 100%;
		/* height: 80rpx; */
		margin-top: 20rpx;
	}

	.education-form-grade {
		width: 100%;
		/* height: 80rpx; */
		margin-top: 20rpx;
	}




	.work-submit {
		width: 80%;
		margin: 0 auto;
		margin-top: 10%;
		padding-bottom: 100rpx;
	}

	.work-submit button {
		background-color: #004956;
		color: #FFFFFF;
		height: 80rpx;
		border-radius: 80rpx;
		line-height: 80rpx;
	}
</style>
