<template>
	<view class="uni-flex uni-column work-bg">
		<view class="flex-item work-title">
			{{i18n.profileworkexperience}}
		</view>
		<view class="flex-item work-form">
			<view class="work-form-title">
				<view class="work-form-label">{{i18n.profilejobtitle}} <text class="error-star">*</text></view>
				<input type="text" v-model="yourTitle" :placeholder="i18n.profilejobtitleph" />
			</view>
			<view class="work-form-companyname">
				<view class="work-form-label">{{i18n.eduprofilecompanyname}} <text class="error-star">*</text></view>
				<input type="text" v-model="companyName" :placeholder="i18n.profilecompanynameph" />
			</view>
			<view class="work-form-location">
				<view class="work-form-label">{{i18n.profileworklocation}}</view>
				<input type="text" v-model="workLocation" :placeholder="i18n.profileworklocationph" />
			</view>

			<!-- <view class="teaching-form-teaching">
				<view class="work-form-label">{{i18n.profileteachingexperience}}</view>
				<view class="teaching-form-teaching-2">
					<view class="teaching-form-teaching-1" v-if="teachingExpStatus" @click="showTeachingSelect">
						{{teachingExpValue}} years
					</view>
					<view class="teaching-form-teaching-1" v-if="teachingExpStatus===false" @click="showTeachingSelect">
						{{i18n.profilechooseteachingexperience}}
					</view>
				</view>
				<u-select confirm-text="Confirm" cancel-text="Cancel" v-model="showTeaching" :list="teachingList" mode="single-column"
				 @confirm="confirmTeaching"></u-select>
			</view> -->
			<view class="work-form-date">
				<view class="work-form-label">{{i18n.profileworkdate}} <text class="error-star">*</text></view>
				<view class="work-form-date-3">
					<view class="work-form-date-1" v-if="workStartDateStatus" @click="startDateShow = true">
						{{workStartDate | date('mm/yyyy')}}
					</view>
					<view class="work-form-date-1" v-if="workStartDateStatus===false" @click="startDateShow = true">
						{{i18n.profilechooseworkdate}}
					</view>
					<view class="work-form-date-2" v-if="workEndDateStatus" @click="endDateShow=true">
						{{workEndDate | date('mm/yyyy')}}
					</view>
					<view class="work-form-date-2" v-if="workEndDateStatus===false" @click="endDateShow=true">
						{{i18n.profilechooseenddate}}
					</view>
				</view>
				<u-picker :show-time-tag="false" confirm-text="Confirm" :end-year="startDateEndYear" cancel-text="Cancel" v-model="startDateShow" :params="{year:true,month:true}"
				 mode="time" @confirm="startDateConfirm"></u-picker>
				<u-picker :show-time-tag="false" confirm-text="Confirm" :start-year="endDateStartYear" cancel-text="Cancel" v-model="endDateShow" :params="{year:true,month:true}"
				 mode="time" @confirm="endDateConfirm"></u-picker>
			</view>
			<view class="work-form-respon">
				<view class="work-form-label">{{i18n.profileresponsibilities}}</view>
				<fuck-textarea :maxlength="200" v-model="responValue" :placeholder="i18n.profileresponsibilitiesph"></fuck-textarea>
			</view>
		</view>
		<view class="flex-item work-submit">
			<button type="default" @click="workSubmit">{{i18n.profileeditsubmit}}</button>
		</view>
	</view>
</template>

<script>
	import profile from '@/api/profile.js';
	import fuckTextarea from '@/components/fuck-textarea/fuck-textarea.vue'
	import teachingList from '@/common/teachingYear.js';

	export default {
		data() {
			return {
				responValue: '',
				startDateShow: false,
				endDateShow: false,
				startYearShow: false,
				endYearShow: false,
				showTeaching: false,
				teachingList: teachingList,
				workStartDateStatus: false,
				workStartDate: '',
				workEndDateStatus: false,
				workEndDate: '',
				educationStartYear: '',
				educationStartYearStatus: false,
				educationEndYear: '',
				educationEndYearStatus: false,
				teachingExpStatus: false,
				teachingExpValue: 1,
				yourTitle: '',
				companyName: '',
				workLocation: '',
				type: 1,
				workId: 1,
				endDateStartYear: 2021,
				startDateEndYear: 2021,

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
		onLoad(option) {
			var that = this;
			that.type = option.type;
			that.workId = option.workId;

			if (that.type == 2) {
				this.getBasicInfo();
			}

		},
		methods: {
			// 监听变化的数据
			change(arr) {
				console.log(JSON.stringify(arr));
			},
			startDateConfirm(e) {
				let year = e.year;
				let month = e.month;
				let str = year + '-' + month + '-' + '01'
				let date = new Date(str)
				this.workStartDate = Math.floor(date.getTime() / 1000);
				this.endDateStartYear = year;

				this.workStartDateStatus = true;
			},
			endDateConfirm(e) {
				console.log(e)
				let year = e.year;
				let month = e.month;
				let str = year + '-' + month + '-' + '01'
				let date = new Date(str)
				this.startDateEndYear = year;
				let endDate = Math.floor(date.getTime() / 1000);
				if (endDate <= this.workStartDate) {
					return uni.showToast({
						title: 'Select correct end date',
						icon: 'none'
					})
				} else {
					this.workEndDate = endDate;
					this.workEndDateStatus = true;
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
						company_name: this.companyName,
						title: this.yourTitle,
						location: this.workLocation,
						teaching_times: this.teachingExpValue,
						teaching_experience: this.responValue,
						work_time_from: this.workStartDate,
						work_time_to: this.workEndDate
					}
				}
				if (this.type == 2) {
					var data = {
						token: uni.getStorageSync('token'),
						company_name: this.companyName,
						title: this.yourTitle,
						location: this.workLocation,
						teaching_times: this.teachingExpValue,
						teaching_experience: this.responValue,
						work_time_from: this.workStartDate,
						work_time_to: this.workEndDate,
						work_id: this.workId
					}
				}

				if (this.yourTitle == '') {
					return uni.showToast({
						title: this.i18n.profilejobtitleph,
						icon: 'none'
					})
				}
				if (this.companyName == '') {
					return uni.showToast({
						title: this.i18n.profilecompanynameph,
						icon: 'none'
					})
				}
				if (this.workStartDate == '') {
					return uni.showToast({
						title: this.i18n.profilechooseworkdate,
						icon: 'none'
					})
				}
				if (this.workEndDate == '') {
					return uni.showToast({
						title: this.i18n.profilechooseenddate,
						icon: 'none'
					})
				}

				profile.addUserWork(data).then(res => {
					console.log(res)
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
					console.log(res)
					if (res.code == 200) {
						let result = res.message.educator_info.work_info;
						let work = result.filter(item => item.id === Number(this.workId));
						let workInfo = work[0];
						// console.log(workInfo)
						that.yourTitle = workInfo.title;
						that.companyName = workInfo.company_name;
						that.workLocation = workInfo.location;
						that.teachingExpValue = workInfo.teaching_times;
						if (that.teachingExpValue != '') {
							that.teachingExpStatus = true;
						}
						that.workStartDate = workInfo.work_time_from;

						if (that.workStartDate != '') {
							that.workStartDateStatus = true;
							that.startDateEndYear =this.$u.timeFormat(this.workStartDate, 'yyyy');
						}
						that.workEndDate = workInfo.work_time_to;
						if (that.workEndDate != '') {
							that.workEndDateStatus = true;
							that.endDateStartYear = this.$u.timeFormat(this.workEndDate, 'yyyy');
						}
						that.responValue = workInfo.teaching_experience;

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
		font-size: 36rpx;
		font-weight: 600;
		background-color: #004956;
		color: #FFFFFF;
		height: 200rpx;
		line-height: 200rpx;
	}

	.work-form-label {
		font-size: 34rpx;
		font-weight: 700;

	}

	.work-form {
		width: 90%;
		margin: 0 auto;
		margin-top: 20rpx;
		padding: 20rpx;
		background-color: #FFFFFF;
		border-radius: 20rpx;
	}

	input {
		border-radius: 20rpx;
		height: 80rpx;
		text-align: left;
		border: 1px solid #EEEEEE;
		text-indent: 20rpx;
		font-size: 30rpx;
	}

	.uni-input-placeholder {
		text-align: left;
		text-indent: 20rpx;
		font-size: 30rpx;
	}

	.work-form-title {
		width: 100%;
		/* height: 80rpx; */
		margin-top: 20rpx;
	}

	.work-form-companyname {
		width: 100%;
		/* height: 80rpx; */
		margin-top: 20rpx;
	}

	.work-form-location {
		width: 100%;
		/* height: 80rpx; */
		margin-top: 20rpx;
	}

	.work-form-date {
		width: 100%;
		/* height: 80rpx; */
		line-height: 80rpx;
		margin-top: 20rpx;

	}

	.work-form-date-3 {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		border-bottom: 1px solid #EEEEEE;
	}

	.work-form-date-1,
	.work-form-date-2 {
		width: 50%;
		height: 100%;
		line-height: 80rpx;
		text-align: center;
		font-size: 30rpx;
	}


	.education-form-year {
		width: 100%;
		height: 80rpx;
		line-height: 80rpx;
		margin-top: 20rpx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		border-bottom: 1px solid #EEEEEE;
	}

	.education-form-start-year {
		width: 50%;
		height: 100%;
		line-height: 80rpx;
		text-align: center;
	}

	.education-form-end-year {
		width: 50%;
		height: 100%;
		line-height: 80rpx;
		text-align: center;
	}

	.work-form-respon {
		width: 100%;
		margin-top: 20rpx;
	}

	.teaching-form-teaching {
		width: 100%;
		margin-top: 20rpx;
	}

	.teaching-form-teaching-2 {
		height: 80rpx;
		line-height: 80rpx;
		border: 1px solid #EEEEEE;
		border-radius: 20rpx;
		font-size: 30rpx;
	}

	.teaching-form-teaching-1 {
		line-height: 80rpx;
		text-align: left;
		text-indent: 20rpx;
		font-size: 30rpx;
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

	.error-star {
		font-size: 40rpx;
		font-weight: 700;
		color: #FF3333;
		margin-left: 10rpx;
	}
</style>
