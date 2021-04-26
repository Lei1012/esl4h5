<template>
	<view class="uni-flex uni-column work-bg">
		<view class="flex-item work-title">
			{{i18n.profileeducation}}
		</view>
		<view class="flex-item work-form">

			<u-form :model="form" :rules="rules" ref="uForm" :error-type="errorType" label-position="top"
				:label-style="{'font-weight':700}">
				<u-form-item :label="i18n.profileschool" prop="school_name" required>
					<u-input border v-model="form.school_name" :placeholder="i18n.profileschoolph" />
				</u-form-item>
				<u-form-item :label="i18n.profiledegree" prop="degree" required>
					<u-input border v-model="form.degree" :placeholder="i18n.profiledegreeph" @click="degreeShow=true"
						type="select" />
				</u-form-item>
				<u-form-item :label="i18n.profilefieldofstudy" prop="field_of_study">
					<u-input border type="textarea" height="150" autoHeight v-model="form.field_of_study"
						:placeholder="i18n.profilefieldofstudyph" />
				</u-form-item>
				<u-form-item :label="i18n.profileeducationtimes" prop="date" required>
					<view class="xll-two-container">
						<view class="xll-two-left">
							<u-form-item prop="start_time_str" :border-bottom="false">
								<u-input border type="select" v-model="form.start_time_str"
									:placeholder="i18n.profilechoosestartyear" @click="startYearShow = true" /> 
							</u-form-item>
						</view>
						<view class="xll-two-mid">-</view>
						<view class="xll-two-right">
							<u-form-item prop="end_time_str" :border-bottom="false">
								<u-input border type="select" v-model="form.end_time_str" :placeholder="i18n.profilechooseendyear"
									@click="endYearShow = true" />
							</u-form-item>
						</view>
					</view>
				</u-form-item>
			</u-form>

			<u-picker :show-time-tag="false" :params="{year:true,month:true}" confirm-text="Confirm"
				:end-year="startDateEndYear" cancel-text="Cancel" v-model="startYearShow" mode="time"
				@confirm="startYearConfirm"></u-picker>
			<u-picker :show-time-tag="false" :params="{year:true,month:true}" confirm-text="Confirm"
				:start-year="endDateStartYear" cancel-text="Cancel" v-model="endYearShow" mode="time"
				@confirm="endYearConfirm"></u-picker>

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
	export default {
		data() {
			return {
				responValue: '',
				startDateShow: false,
				endDateShow: false,
				startYearShow: false,
				endYearShow: false,

				educationStartYear: '',
				educationStartYearStr: '',
				educationStartYearStatus: false,
				educationEndYear: '',
				educationEndYearStr: '',
				educationEndYearStatus: false,
				teachingExpStatus: false,
				teachingExpValue: '',

				type: 1,
				educationId: 1,
				endDateStartYear: new Date().getFullYear(),
				startDateEndYear: new Date().getFullYear(),
				degreeShow: false,
				degreeStatus: false,
				degreeList: [],
				degreeStr: '',

				errorType: ['message'],
				form: {
					school_name: '',
					degree: '',
					field_of_study: '',
					start_time: '',
					start_time_str: '',
					end_time: '',
					end_time_str: '',
					grade: '',
					token: uni.getStorageSync('token')
				},
				rules: {
					school_name: [{
						required: true,
						message: this.$t('index').profileschoolph,
						trigger: ['change', 'blur'],
					}, ],
					degree: [{
						required: true,
						message: this.$t('index').profiledegreeph,
						trigger: ['change', 'blur'],
					}, ],
					start_time_str: [{
						required: true,
						message: this.$t('index').profilechoosestartyear,
						trigger: ['change', 'blur'],
					}, ],
					end_time_str: [{
						required: true,
						message: this.$t('index').profilechooseendyear,
						trigger: ['change', 'blur'],
					}, ],
				}

			}
		},
		components: {

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
			degreeConfirm(e) {
				console.log(e)
				var that = this;
				this.form.degree = e[0].value;
			},
			startYearConfirm(e) {
				console.log(e)
				let year = e.year;
				let month = e.month;
				let str = year + '-' + month + '-' + '01'
				let date = new Date(str)

				this.form.start_time_str = month + '/' + year;
				this.form.start_time = Math.floor(date.getTime() / 1000);
				this.educationStartYear = Math.floor(date.getTime() / 1000);
				this.endDateStartYear = year;
				this.educationStartYearStatus = true;
			},
			endYearConfirm(e) {
				let year = e.year;
				let month = e.month;
				let str = year + '-' + month + '-' + '01'
				let date = new Date(str)
				let endDate = Math.floor(date.getTime() / 1000);

				if (endDate <= this.form.start_time) {

					return uni.showToast({
						title: 'Select correct end year',
						icon: 'none'
					})
				}

				this.form.end_time_str = month + '/' + year;
				this.form.end_time = Math.floor(date.getTime() / 1000);
				this.startDateEndYear = year;
			},
			workSubmit() {

				var that = this;

				this.$refs.uForm.validate(valid => {
					if (valid) {
						console.log('验证通过');
						if (that.type == 2) {
							that.form.education_id = that.educationId;
						}
						let data = Object.assign({}, that.form);
						profile.addUserEducation(data).then(res => {
							// console.log(res)
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
						uni.showToast({
							title:that.i18n.yanzhengshibai,
							icon:'none'
						})
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
					// console.log(res)
					if (res.code == 200) {
						let result = res.message.educator_info.education_info;
						let education = result.filter(item => item.id === Number(this.educationId));
						let educationInfo = education[0];
						console.log(educationInfo)
						that.form.school_name = educationInfo.school_name;
						that.form.degree = educationInfo.degree;
						that.form.field_of_study = educationInfo.field_of_study;
						that.form.start_time = educationInfo.start_time;
						that.form.end_time = educationInfo.end_time;

						if (educationInfo.start_time) {
							that.startDateEndYear = this.$u.timeFormat(educationInfo.start_time, 'yyyy');
							that.form.start_time_str = this.$u.timeFormat(educationInfo.start_time, 'mm/yyyy');
						}
						if (educationInfo.end_time) {
							that.endDateStartYear = this.$u.timeFormat(educationInfo.end_time, 'yyyy');
							that.form.end_time_str = this.$u.timeFormat(educationInfo.end_time, 'mm/yyyy');
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

	.education-form-title {
		font-size: 28rpx;
		font-weight: 700;

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
		font-size: 28rpx;
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
	
	.xll-two-container {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
	
	.xll-two-left {
		width: 45%;
	}
	
	.xll-two-mid {
		display: flex;
		align-items: center;
	}
	
	.xll-two-right {
		width: 45%;
	}
	
</style>
