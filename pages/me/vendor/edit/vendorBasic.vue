<template>
	<view>
		<view class="uni-flex uni-column basic-bg">
			<view class="flex-item basic-title">
				<!-- Vendor Basic Info -->
				{{i18n.profilecompanygeneralinfo}}
			</view>
			<view class="flex-item basic-form">
				<view class="basic-form-bio">
					<view class="basic-form-label">{{i18n.profilevendorbio}} </view>
					<fuck-textarea style="font-size: 34rpx;" :maxlength="250" v-model="bioValue" :placeholder="i18n.profilevendorbioph"></fuck-textarea>
				</view>
				<view class="basic-form-wechat">
					<view class="basic-form-label">{{i18n.profilewechatofficialaccountid}} </view>
					<input :maxlength="20" type="text" v-model="wechatIdValue" :placeholder="i18n.profilewechatofficialaccountidph" />
				</view>
				<view class="basic-form-website">
					<view class="basic-form-label">{{i18n.profilevendorwebsite}}</view>
					<input type="text" v-model="webSiteValue" :placeholder="i18n.profilevendorwebsiteph" />
				</view>
				<view class="basic-form-phone">
					<view class="basic-form-label">{{i18n.profilevendorphone}} </view>
					<input :maxlength="11" type="number" v-model="phoneValue" :placeholder="i18n.profilevendorphoneph" />
				</view>
				<view class="basic-form-current-city" >
					<view class="basic-form-label">{{i18n.profilevendorlocation}} <text class="error-star">*</text></view>
					<view class="current-city" @click="chooseLocation">
						<text v-if="locationStatus">{{pickerText}}</text>
						<text v-if="locationStatus===false">{{i18n.basicbusinesstwochooselocation}}</text>
					</view>
				</view>
				<view class="basic-form-website">
					<view class="basic-form-label">{{i18n.profilevendorbasicaddress}}</view>
					<input type="text" v-model="address" :placeholder="i18n.profilevendorbasicaddressph" />
				</view>
				<view class="basic-form-job-seeking">
					<view class="basic-form-label">{{i18n.profiledogfriendly}}</view>
					<switch style="margin-left: 20rpx;" :checked="dogFriendlyValue==1" color="#0AA0A8" @change="dogFriendlyChange" />
				</view>
				<view class="basic-form-public-profile">
					<view class="basic-form-label">{{i18n.profilevendorevents}}</view>
					<switch style="margin-left: 20rpx;" :checked="eventsValue == 1" color="#0AA0A8" @change="eventsChange" />
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
				confirmText: 'Confirm',
				cancelText: 'Cancel',
				formatted_addresses: '',

				country: '', //
				province: '',
				city: '',
				area:'',
				address:'',
				lon: '',
				lat: '',
				qqmapMarkUrl: '',
				geolocation: '',
				locationStatus: false,
				
				dogFriendlyValue: 0,
				eventsValue: 0,
				bioValue: '',
				webSiteValue: '',
				phoneValue: '',
				wechatIdValue: '',
				pickerText:'',


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
			dogFriendlyChange(e) {
				console.log(e)
				if (e.detail.value) {
					this.dogFriendlyValue = 1;
				} else {
					this.dogFriendlyValue = 0;
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
					vendor_bio: this.bioValue,
					country: this.country,
					province: this.province,
					city: this.city,
					district:this.area,
					address:this.address,
					website: this.webSiteValue,
					wechat_public_name: this.wechatIdValue,
					phone: this.phoneValue,
					is_events: this.eventsValue,
					is_dog_friendly: this.dogFriendlyValue
				}

				let phone = this.phoneValue;
				let website = this.webSiteValue;
				// if(this.bioValue == ''){
				// 	return uni.showToast({
				// 		title: this.i18n.profilevendorbioph,
				// 		icon: 'none'
				// 	})
				// }
				// if(this.wechatIdValue == ''){
				// 	return uni.showToast({
				// 		title: this.i18n.profilewechatofficialaccountidph,
				// 		icon: 'none'
				// 	})
				// }

				// console.log(formCheck.checkPhone(phone));
				// if (!formCheck.checkPhone(phone)) {
				// 	return uni.showToast({
				// 		title: 'Please enter a valid phone number ',
				// 		icon: 'none'
				// 	})
				// }
				
				if(this.pickerText == ''){
					return uni.showToast({
						title: this.i18n.basicbusinesstwochooselocation,
						icon: 'none'
					})
				}
				
				profile.addVendorBasic(data).then(res => {
					console.log(res)
					uni.$emit('userInfoUpdated',{msg:'page updated'})
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
						
						let vendorInfo = res.message.vendor_info;
						console.log(vendorInfo)
						that.bioValue = vendorInfo.vendor_bio;
						that.webSiteValue = vendorInfo.website;
						that.phoneValue = vendorInfo.phone;
						that.dogFriendlyValue = vendorInfo.is_dog_friendly;
						that.eventsValue = vendorInfo.is_events;
						that.address = vendorInfo.address;
						that.wechatIdValue = vendorInfo.wechat_public_name;
						if(vendorInfo.province!='' && vendorInfo.city !='' && vendorInfo.district !=''){
							that.province = vendorInfo.province;
							that.city = vendorInfo.city;
							that.district = vendorInfo.district;
							this.pickerText = vendorInfo.district + ', '+vendorInfo.city + ', '+ vendorInfo.province
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

	.basic-form-label {
		font-size: 34rpx;
		font-weight: 700;

	}

	input {
		height: 80rpx;
		text-indent: 20rpx;
		text-align: left;
		border: 1rpx solid #EEEEEE;
		font-size: 30rpx;
		border-radius: 20rpx;
	}

	.uni-input-placeholder {
		text-align: left;
		font-size: 30rpx;
		text-indent: 20rpx;
	}

	.basic-form-bio {
		width: 100%;
		margin-top: 20rpx;
	}

	.basic-form-website,
	.basic-form-phone {
		width: 100%;
		/* height: 80rpx; */
		margin-top: 10rpx;
		text-align: left;
	}

	.form-title {
		font-size: 30rpx;
		color: #000000;
	}

	.basic-form-current-city {
		width: 100%;
		margin-top: 20rpx;
	}

	.current-city {
		text-align: left;
		text-indent: 20rpx;
		border-radius: 20rpx;
		height: 80rpx;
		line-height: 80rpx;
		font-size: 30rpx;
		border: 1px solid #EEEEEE;
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
	
	.error-star{
		font-size: 40rpx;
		font-weight: 700;
		color: #FF3333;
		margin-left: 10rpx;
	}
</style>
