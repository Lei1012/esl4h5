<template>
	<view class="uni-flex uni-column work-bg">
		<view class="flex-item work-title">
			{{i18n.profileworkexperience}}
		</view>
		<view class="flex-item work-form">
			<u-form :model="form" :rules="rules" ref="uForm" :error-type="errorType" label-position="top"
				:label-style="{'font-weight':700}">
				<u-form-item :label="i18n.profilejobtitle" prop="title" required>
					<u-input border v-model="form.title" :placeholder="i18n.profilejobtitleph" />
				</u-form-item>
				<u-form-item :label="i18n.eduprofilecompanyname" prop="company_name" required>
					<u-input border v-model="form.company_name" :placeholder="i18n.profilecompanynameph" />
				</u-form-item>
				<u-form-item :label="i18n.profileworklocation" prop="location">
					<u-input border v-model="form.location" :placeholder="i18n.profileworklocationph" />
				</u-form-item>
				<u-form-item :label="i18n.profileworkdate" prop="date" required>
					<u-form-item  prop="work_time_from_str">
						<u-input border type="select" v-model="form.work_time_from_str"
							:placeholder="i18n.profilechooseworkdate" @click="startDateShow = true" />
					</u-form-item>
					 -
					 <u-form-item  prop="work_time_to_str">
					 <u-input border type="select" v-model="form.work_time_to_str" :placeholder="i18n.profilechooseenddate"
					 	@click="endDateShow = true" />
					 </u-form-item>
					
				</u-form-item>
				<u-picker :show-time-tag="false" confirm-text="Confirm" :end-year="startDateEndYear"
					cancel-text="Cancel" v-model="startDateShow" :params="{year:true,month:true}" mode="time"
					@confirm="startDateConfirm"></u-picker>
				<u-picker :show-time-tag="false" confirm-text="Confirm" :start-year="endDateStartYear"
					cancel-text="Cancel" v-model="endDateShow" :params="{year:true,month:true}" mode="time"
					@confirm="endDateConfirm"></u-picker>
				<u-form-item :label="i18n.profileresponsibilities" prop="teaching_experience " >
					<u-input border type="textarea" height="150" :maxlength="200" autoHeight
						v-model="form.teaching_experience" :placeholder="i18n.profileresponsibilitiesph" />
				</u-form-item>
			</u-form>

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
				endDateStartYear: new Date().getFullYear(),
				startDateEndYear: new Date().getFullYear(),

				errorType: ['message'],
				form: {
					token: uni.getStorageSync('token'),
					company_name:'',
					title: '',
					location: '',
					teaching_times: '',
					teaching_experience: '',
					work_time_from: '',
					work_time_from_str:'',
					work_time_to: '',
					work_time_to_str:'',
				},
				rules: {
					title: [{
						required: true,
						message: this.$t('index').profilejobtitleph,
						trigger: ['change', 'blur'],
					}, ],
					company_name: [{
						required: true,
						message: this.$t('index').profilecompanynameph,
						trigger: ['change', 'blur'],
					}, ],
					work_time_to_str: [{
						required: true,
						message: this.$t('index').profilechooseenddate,
						trigger: ['change', 'blur'],
					}, ],
					work_time_from_str: [{
						required: true,
						message: this.$t('index').profilechooseworkdate,
						trigger: ['change', 'blur'],
					}, ]
				}

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
				this.form.work_time_from = Math.floor(date.getTime() / 1000);
				this.form.work_time_from_str = month + '/'+year;
				this.endDateStartYear = year;
			},
			endDateConfirm(e) {
				console.log(e)
				let year = e.year;
				let month = e.month;
				let str = year + '-' + month + '-' + '01'
				let date = new Date(str)
				let endDate = Math.floor(date.getTime() / 1000);
				if (endDate <= this.form.work_time_from) {
					return uni.showToast({
						title: 'Select correct end date',
						icon: 'none'
					})
				} 
				this.form.work_time_to = Math.floor(date.getTime() / 1000);
				this.form.work_time_to_str = month + '/'+year;
				this.startDateEndYear = year;
			},
			workSubmit() {
				var that = this;
				this.$refs.uForm.validate(valid => {
					if (valid) {
						console.log('验证通过');
						if(that.type == 2){
							that.form.work_id =  this.workId;
						}
						let data = Object.assign({},that.form);
						
						profile.addUserWork(data).then(res => {
							console.log(res)
							if (res.code == 200) {
								
								uni.showLoading({
									title: 'loading'
								})
								setTimeout(function() {
									uni.hideLoading()
									uni.navigateBack({
										delta: 1
									})
								}, 1200)
								
						
							} else {
								uni.showToast({
									title: res.msg,
									icon: 'none'
								})
							}
						}).catch(error => {
							console.log(error)
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
						let result = res.message.educator_info.work_info;
						let work = result.filter(item => item.id === Number(this.workId));
						let workInfo = work[0];
						// console.log(workInfo)
						that.form.title = workInfo.title;
						that.form.company_name = workInfo.company_name;
						that.form.location = workInfo.location;
					
						that.form.work_time_from = workInfo.work_time_from;
						that.form.work_time_to = workInfo.work_time_to;
						that.form.teaching_experience = workInfo.teaching_experience;

						if (workInfo.work_time_from) {
							that.startDateEndYear = this.$u.timeFormat(workInfo.work_time_from, 'yyyy');
							that.form.work_time_from_str = this.$u.timeFormat(workInfo.work_time_from, 'mm/yyyy');
						}
						
						if (workInfo.work_time_to) {
							that.endDateStartYear = this.$u.timeFormat(workInfo.work_time_to, 'yyyy');
							that.form.work_time_to_str = this.$u.timeFormat(workInfo.work_time_to, 'mm/yyyy');
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
		width: 96%;
		margin: 0 auto;
		margin-top: 20rpx;
		padding: 20rpx;
		background-color: #FFFFFF;
		border-radius: 20rpx;
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
