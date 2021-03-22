<template>
	<view class="uni-flex uni-column role-bg">
		<view class="flex-item role-logo animate__animated  animate__rotateIn">
			<image src="../../static/esl-logo.png" lazy-load="true"></image>
		</view>
		<view class="flex-item role-intro animate__animated  animate__lightSpeedInRight">
			<view class="role-intro-1">{{i18n.vendorapplication}} </view>
			<view class="role-intro-2">{{i18n.vendorapplicationbusinfo}}</view>
		</view>
		
		<view class="flex-item role-form">
			<view class="form-company">
				<view class="form-company-label">{{i18n.profilecompanynameen}}:</view>
				<view class="company-en">
					<input type="text" v-model="companyNameValue" :placeholder="i18n.vendorcompanynameen" />
				</view>
				<view class="company-cn">
					<input type="text" v-model="companyNameCnValue" :placeholder="i18n.vendorcompanynamecn" />
				</view>
			</view>
			<view class="role-form-item">
				<view class="role-form-item-label">{{i18n.vendorcompanywebsite}}:</view>
				<input type="text" v-model="websiteValue" :placeholder="i18n.vendorcompanywebsite">
			</view>
			<view class="role-form-role-location">
				<view class="role-location-label">{{i18n.vendorlocation}}:</view>
				<view class="role-location-txt" v-if="locationStatus===false" @click="chooseLocation()">{{i18n.basicbusinesstwochooselocation}}</view>
				<view class="role-location-txt-2" v-if="locationStatus" @click="chooseLocation()">{{pickerText}}</view>
			</view>
			<view class="categories">
				<view class="category-title">{{i18n.vendorcategory}}:</view>
				<view class="categories-tags">
					<view class="categories-tags-item" v-for="(item,k) in range" :key="k"
						:class="selectVendorTypeList.indexOf(item) == -1 ? '' : 'tag-active' "
						@click="selectVendorType(item)">
						{{item.identity_name}}
					</view>
				</view>
			</view>

			<view class="role-form-textarea">
				<view class="role-form-textarea-label">{{i18n.vendorproposeddeal}}:</view>
				<fuck-textarea style="font-size: 34rpx;" :maxlength="200" v-model="proposedDealValue"
					:placeholder="i18n.vendorproposeddealph"></fuck-textarea>
			</view>

		</view>
		<view class="agreement">
			<view class="agreement-no-active" v-if="agreeStatus==false" @tap="agreeStatus=true"></view>
			<view class="agreement-active" v-if="agreeStatus" @tap="agreeStatus=false"></view>
			I understand my application is subject to approval. 我明白申请和参加商户计划需要由ESL Passport批准.
		</view>
		<view class="role-form-done">
			<button class="btn-submit" @click="submitVendorTwo">
				{{i18n.basicinfobuton}}
			</button>
		</view>
	</view>
</template>

<script>
	import tkiTree from "@/components/tki-tree/tki-tree.vue"
	import profile from '@/api/profile.js'
	import login from '@/api/login.js'

	export default {
		data() {
			return {
				firstname: '',
				jobTitle: '', // 职位
				workEmail: '', //工作email
				phoneValue: '',

				vendorName: '',
				country: '', //
				province: '',
				area: '',
				city: '',
				lon: '',
				lat: '',
				companyNameValue: '',
				companyNameCnValue: '',
				websiteValue: '',
				proposedDealValue: '',

				confirmText: 'Confirm',
				cancelText: 'Cancel',
				value: '',
				rangeKey: 'identity_name',
				idKey: 'id',
				range: [],

				selectVendorTypeList: [],

				cityPickerValueDefault: [11, 1101, 110101],
				pickerText: '',
				locationStatus: false,
				geolocation: '',
				positionNum: 0,
				options: {
					timeout: 9000
				},
				position: '',
				positionSuccess: false,
				
				agreeStatus:false,

			}
		},
		components: {

		},
		onUnload() {
			uni.$off('locationEvent');
		},
		onLoad(option) {
			var that = this;
			// 接收第一步传参
			that.firstname = option.fname;
			that.jobTitle = option.jobTitle;
			that.workEmail = option.workEmail;
			that.phoneValue = option.phone;

			this.subCateList()
			uni.$on('locationEvent', function(data) {
				console.log(data)
				that.province = data.province;
				that.city = data.city;
				that.area = data.area;
				that.locationStatus = true;
				that.pickerText = that.area + ', ' + that.city + ', ' + that.province;
			})

		},
		computed: {
			i18n() {
				return this.$t('index')
			}
		},
		methods: {
			chooseLocation() {
				uni.navigateTo({
					url: '/pages/location/location'
				})
			},
			selectVendorType(item) {
				// console.log(item);
				if (this.selectVendorTypeList.indexOf(item) == -1) {
					if (this.selectVendorTypeList.length > 0) {
						let len = this.selectVendorTypeList.length - 1;
						this.selectVendorTypeList.splice(len, 1);
					}
					this.selectVendorTypeList.push(item);
				} else {
					this.selectVendorTypeList.splice(this.selectVendorTypeList.indexOf(item), 1);
				}

				console.log(this.selectVendorTypeList);
			},
			subCateList: function() {
				let data = {
					pid: 3,
					tree: 1
				}
				profile.getSubCateLists(data).then(res => {
					// console.log(res)
					if (res.code == 200) {
						this.range = res.message;
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
					}
				}).catch(err => {
					uni.showToast({
						title: err.msg,
						icon: 'none'
					})
				})
			},
			submitVendorTwo: function() {
				//定义表单规则
				var that = this;

				let country = that.country;
				let province = that.province;
				let city = that.city;
				let area = that.area;
				let lon = that.lon;
				let lat = that.lat;

				if (this.companyNameValue == '') {
					return uni.showToast({
						title: that.i18n.profilecompanynameen,
						icon: "none"
					})
				}

				if (that.selectVendorTypeList.length < 1) {
					return uni.showToast({
						title: that.i18n.vendorcategoryerror,
						icon: "none"
					})
				}
				
				if(that.agreeStatus==false){
					return uni.showToast({
						title:'Please acknowledge need for approval',
						icon:"none"
					})
				}
				
				let vendorTypeId;
				let vendorTypeName;
				that.selectVendorTypeList.forEach(item => {
					vendorTypeId = item.id;
					vendorTypeName = item.identity_name;
				})

				let data = {
					token: uni.getStorageSync('token'),
					province: province,
					city: city,
					district: area,

					first_name: that.firstname,
					job_title: that.jobTitle,
					work_email: that.workEmail,
					phone: that.phoneValue,
					website: that.websiteValue,
					proposed_deal: that.proposedDealValue,
					vendor_type_id: vendorTypeId,
					vendor_type_name: vendorTypeName,
					vendor_name_en: that.companyNameValue,
					legal_company_name: that.companyNameCnValue

				}

				uni.showLoading({
					title: 'loading'
				})
				profile.addVendorBasic(data).then(res => {
					if (res.code == 200) {
						//切换身份
						let identity_data = {
							identity: 3,
							unionid: uni.getStorageSync('unionid'),
							token: uni.getStorageSync('token')
						}
						login.changeLanguageAndIdentity(identity_data).then(res => {
							if (res.code == 200) {
								uni.setStorageSync('identity', 3);
								uni.hideLoading();
								uni.navigateTo({
									url: '/pages/me/profile/photo?type=8&vprofile=1'
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
			console.log('on ready')
		}
	}
</script>

<style>
	@import url("@/common/role/index.css");

	.form-company {
		width: 100%;
	}

	.form-company-label {
		font-size: 32rpx;
		text-align: left;
		color: #000000;
		font-weight: 700;
	}

	.company-en,
	.company-cn {
		margin-top: 10rpx;
		height: 80rpx;
		border-radius: 10rpx;
	}

	.agreement {
		width: 96%;
		margin: 20rpx auto;
		position: relative;
		padding: 20rpx;
		text-indent: 50rpx;
		/* color:#FF2870; */
		font-size: 24rpx;
	}

	.agreement-no-active {
		position: absolute;

		width: 40rpx;
		height: 40rpx;
		border-radius: 40rpx;
		border: 1rpx solid #808080;
		background-color: #FFFFFF;
	}
	.agreement-active {
		position: absolute;
	
		width: 40rpx;
		height: 40rpx;
		border-radius: 40rpx;
		border: 2rpx solid #808080;
		background-color: #0AA0A8;
	}
</style>
