<template>
	<view>
		<view class="uni-flex uni-column basic-bg">
			<view class="flex-item basic-title">
				<!-- Vendor Basic Info -->
				{{i18n.profilecompanygeneralinfo}}
			</view>
			<view class="flex-item basic-form">

				<u-form :model="form" :rules="rules" ref="uForm" :error-type="errorType" label-position="top"
					:label-style="{'font-weight':700}">
					<u-form-item :label="i18n.profilevendorbio" prop="vendor_bio">
						<u-input type="textarea" :height="150" autoHeight :maxlength="250" border
							v-model="form.vendor_bio" :placeholder="i18n.profilevendorbioph" />
					</u-form-item>
					<u-form-item :label="i18n.profilewechatofficialaccountid" prop="wechat_public_name">
						<u-input border :maxlength="20" v-model="form.wechat_public_name"
							:placeholder="i18n.profilewechatofficialaccountid" />
					</u-form-item>
					<u-form-item :label="i18n.profilevendorwebsite" prop="website">
						<u-input border :maxlength="18" v-model="form.website"
							:placeholder="i18n.profilevendorwebsiteph" />
					</u-form-item>
					<u-form-item :label="i18n.profilevendorphone" prop="phone">
						<u-input border :maxlength="11" type="number" v-model="form.phone"
							:placeholder="i18n.profilevendorphoneph" />
					</u-form-item>
					<u-form-item :label="i18n.profilevendorlocation" prop="location">
						<u-input border type="select" v-model="form.location"
							:placeholder="i18n.basicbusinesstwochooselocation" @click="chooseLocation" />
					</u-form-item>
					<u-form-item :label="i18n.profilevendorbasicaddress" prop="address">
						<u-input border v-model="form.address" :placeholder="i18n.profilevendorbasicaddressph" />
					</u-form-item>
				</u-form>

				<view class="basic-form-job-seeking">
					<view class="basic-form-label">{{i18n.profiledogfriendly}}</view>
					<switch style="margin-left: 20rpx;" :checked="form.is_dog_friendly==1" color="#0AA0A8"
						@change="dogFriendlyChange" />
				</view>
				<view class="basic-form-public-profile">
					<view class="basic-form-label">{{i18n.profilevendorevents}}</view>
					<switch style="margin-left: 20rpx;" :checked="form.is_events == 1" color="#0AA0A8"
						@change="eventsChange" />
				</view>
			</view>
			<view class="flex-item basic-submit">
				<button @click="basicSubmit" type="default">{{i18n.profileeditsubmit}}</button>
			</view>
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
			
				errorType: ['message'],
				form: {
					vendor_bio: '',
					country: '',
					location:'',
					province: '',
					city: '',
					district: '',
					address: '',
					website: '',
					wechat_public_name: '',
					phone: '',
					is_events: '',
					is_dog_friendly: ''
				},
				rules: {
					location: [{
						required: true,
						message: this.$t('index').basicbusinesstwochooselocation,
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
			dogFriendlyChange(e) {
				console.log(e)
				if (e.detail.value) {
					this.form.is_dog_friendly = 1;
				} else {
					this.form.is_dog_friendly = 0;
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
						profile.addVendorBasic(data).then(res => {
							console.log(res)
							uni.$emit('userInfoUpdated', {
								msg: 'page updated'
							})
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

						let vendorInfo = res.message.vendor_info;
						console.log(vendorInfo)
						that.form.vendor_bio = vendorInfo.vendor_bio;
						that.form.website = vendorInfo.website;
						that.form.phone = vendorInfo.phone;
						that.form.is_dog_friendly = vendorInfo.is_dog_friendly;
						that.form.is_events = vendorInfo.is_events;
						that.form.address = vendorInfo.address;
						that.form.wechat_public_name = vendorInfo.wechat_public_name;
						if (vendorInfo.province != '' && vendorInfo.city != '' && vendorInfo.district != '') {
							that.form.province = vendorInfo.province;
							that.form.city = vendorInfo.city;
							that.form.district = vendorInfo.district;
							that.form.location = vendorInfo.district + ', ' + vendorInfo.city + ', ' + vendorInfo.province;
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
	}

	.basic-form-job-seeking {
		margin-top: 20rpx;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
	}

	.basic-form-public-profile {
		margin-top: 20rpx;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
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

	.error-star {
		font-size: 40rpx;
		font-weight: 700;
		color: #FF3333;
		margin-left: 10rpx;
	}
</style>
