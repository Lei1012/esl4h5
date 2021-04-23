<template>
	<view class="uni-flex uni-column basic-bg">
		<view class="flex-item basic-title">
			{{i18n.profilebusinessbasicinfo}}
		</view>
		<view class="flex-item basic-form">

			<u-form :model="form" :rules="rules" ref="uForm" :error-type="errorType" label-position="top"
				:label-style="{'font-weight':700}">
				<u-form-item :label="i18n.profilebusinessinfobusinessname" prop="business_name">
					<u-input border v-model="form.business_name"
						:placeholder="i18n.profilebusinessinfobusinessnameph" />
				</u-form-item>
				<u-form-item :label="i18n.profilebusinessbio" prop="business_bio">
					<view class="xll-view">
						<u-input border :maxlength="200" type="textarea" v-model="form.business_bio" :placeholder="i18n.profilebusinessbioph" />
					</view>
					<view class="textarea-number"> {{form.business_bio.length}}/200</view>
				</u-form-item>
				<u-form-item :label="i18n.profileyearfounded" prop="year_founded">
					<u-input border v-model="form.year_founded" :placeholder="i18n.profilechooseyearfounded"
						type="select" @click="yearFoundedShow=true" />
					<u-picker :show-time-tag="false" :end-year="endYear" confirm-text="Confirm" cancel-text="Cancel"
						confirm-color="#0aa0a8" v-model="yearFoundedShow" mode="time" :params="{year:true}"
						@confirm="yearFoundedConfirm">
					</u-picker>
				</u-form-item>
				<u-form-item :label="i18n.profilebusinesslocation" prop="location">
					<u-input border v-model="form.location" type="select"
						:placeholder="i18n.basicbusinesstwochooselocation" @click="chooseLocation" />
				</u-form-item>
				<u-form-item :label="i18n.profilewebsite" prop="website">
					<u-input border v-model="form.website" :placeholder="i18n.profilewebsiteph" />
				</u-form-item>
				<u-form-item :label="i18n.profilebusinessphone" prop="business_phone">
					<u-input border type="number" :maxlength="11" v-model="form.business_phone"
						:placeholder="i18n.profilebusinessphone" />
				</u-form-item>
				<u-form-item :label="i18n.profilecurrentlyhiring" label-position="left" label-width="80%">
					<switch style="transform: scale(0.8);" :checked="form.is_currently_hiring==1" color="#0AA0A8"
						@change="hiringChange" />
				</u-form-item>
				
			</u-form>
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
				yearFoundedShow: false,
				hiringValue: 0,
				endYear: new Date().getFullYear(),

				errorType: ['message'],
				form: {
					business_name: '',
					business_bio: '',
					year_founded: '',
					location: '',
					country: '',
					province: '',
					city: '',
					district: '',
					website: '',
					business_phone: '',
					is_currently_hiring: '',
					curriculum: '',
					is_special_needs: '',
					staff_student_ratio: '',
					technology_available: '',
					felds_trips: '',
					is_events: '',
					contact_name: '',
					contact_phone: '',
					is_school: ''
				},
				rules: {

				}

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
			uni.$on('locationEvent', function(data) {
				console.log(data)
				that.form.province = data.province;
				that.form.city = data.city;
				that.form.district = data.area;
				that.form.location = data.area + ', ' + data.city + ', ' + data.province;
			})

			this.getBasicInfo();

		},
		methods: {
			chooseLocation() {
				uni.navigateTo({
					url: '/pages/location/location'
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
				let year = e.year;
				this.form.year_founded = year;
				console.log(e)
			},
			hiringChange(e) {
				console.log(e)
				if (e.detail.value) {
					this.form.is_currently_hiring = 1;
				} else {
					this.form.is_currently_hiring = 0;
				}
			},
			basicSubmit() {
				var that = this;
				this.$refs.uForm.validate(valid => {
					if (valid) {
						console.log('验证通过');
						that.form.token = uni.getStorageSync('token');
						let data = Object.assign({}, that.form);

						profile.addBusinessBasic(data).then(res => {
							console.log(res)
							if (res.code == 200) {
								uni.$emit('userInfoUpdated', {
									msg: 'page updated'
								});
								uni.showLoading({
									title:'loading'
								})
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
					console.log(res)
					if (res.code == 200) {

						let businessInfo = res.message.business_info;

						let businessName = businessInfo.business_name;
						let businessBio = businessInfo.business_bio;
						let yearFounded = businessInfo.year_founded;
						let website = businessInfo.website;
						let businessPhone = businessInfo.business_phone;
						let hiringValue = businessInfo.is_currently_hiring;
						let province = businessInfo.province;
						let city = businessInfo.city;
						let district = businessInfo.district;

						if (businessName) {
							that.form.business_name = businessName;
						}
						if (businessBio) {
							that.form.business_bio = businessBio;
						}
						if (yearFounded) {
							that.form.year_founded = yearFounded;
						}
						if (website) {
							that.form.website = website;
						}
						if (businessPhone) {
							that.form.business_phone = businessPhone;
						}
						that.form.is_currently_hiring = hiringValue;
						that.form.location = district + ', ' + city + ', ' + province;
						that.form.province = province;
						that.form.city = city;
						that.form.district = district;

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
	@import url("@/common/home/uview-xll.css");
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

	.basic-form-label {
		font-size: 28rpx;
		font-weight: 700;
		text-align: left;
	}

	.basic-form-hiring {
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

	.toggels-title {
		margin-top: 10rpx;
		font-size: 28rpx;
		font-weight: 700;
		line-height: 80rpx;
		border-bottom: 1rpx solid #EEEEEE;
	}
</style>
