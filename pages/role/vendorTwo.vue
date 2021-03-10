<template>
	<view class="uni-flex uni-column role-bg">
		<view class="flex-item role-logo animate__animated  animate__rotateIn">
			<image src="../../static/esl-logo.png" lazy-load="true"></image>
		</view>
		<view class="flex-item role-intro animate__animated  animate__lightSpeedInRight">
			{{i18n.vendorinfowindowheader}}
		</view>
		<view class="flex-item role-form">
			<!-- <view class="role-form-item">
				<input type="text" v-model="vendorName" :placeholder="i18n.vendorname">
			</view> -->
			<view class="role-form-item">
				<input type="text" v-model="companyNameValue" :placeholder="i18n.profilecompanynameen">
			</view>
			<view class="role-form-role-location">
				<text style="color: #808080;" v-if="locationStatus===false"  @click="chooseLocation()">{{i18n.basicbusinesstwochooselocation}}</text>
				<text v-if="locationStatus" @click="chooseLocation()" >{{pickerText}}</text>
			</view>
			<view class="categories">
				<view class="category-title">
					{{i18n.vendorcategory}}
				</view>
				<view class="categories-tags">
					<view class="categories-tags-item" v-for="(item,k) in range" :key="k" :class="selectVendorTypeList.indexOf(item) == -1 ? '' : 'tag-active' "
					 @click="selectVendorType(item)">
						{{item.identity_name}}
					</view>
				</view>
			</view>
			
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
				lastname: '',
				nickname: '', //名字
				nationality:'',
				jobTitle: '', // 职位
				workEmail: '', //工作email
				vendorName: '',
				country: '', //
				province: '',
				area:'',
				city: '',
				lon: '',
				lat: '',
				companyNameValue:'',
				wechatId:'',

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
			that.nationality = option.nationality;
			that.nickname = option.nickname;
			that.jobTitle = option.jobTitle;
			that.workEmail = option.workEmail;
			this.wechatId = option.wxid;

			this.subCateList()
			uni.$on('locationEvent',function(data){
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
			chooseLocation(){
				uni.navigateTo({
					url:'/pages/location/location'
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
					pid:3,
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
				//将下列代码加入到对应的检查位置
				//定义表单规则
				var that = this;
				let firstname = that.firstname;
				let nationality = that.nationality;
				let jobTitle = that.jobTitle;
				let workEmail = that.workEmail;
				let vendorName = that.vendorName;

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
				let vendorTypeId;
				let vendorTypeName;
				that.selectVendorTypeList.forEach(item => {
					vendorTypeId = item.id;
					vendorTypeName = item.identity_name;
				})

				let data = {
					province: province,
					city: city,
					district:area,
					token: uni.getStorageSync('token'),
					first_name: firstname,
					nationality:nationality,
					job_title: jobTitle,
					work_email: workEmail,
					vendor_name: vendorName,
					vendor_type_id: vendorTypeId,
					vendor_type_name: vendorTypeName,
					vendor_name_en:this.companyNameValue,
					wx_id:this.wechatId
				}
				
				uni.showLoading({
					title:'loading'
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
								uni.reLaunch({
									url: '/pages/me/welcome?firstname='+firstname,
									success() {
										uni.setStorageSync('identity', 3);
										uni.hideLoading();
									}
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
						//end
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

	.role-form-role-location {
		width: 100%;
		height: 80rpx;
		margin-top: 20rpx;
		text-align: center;
		border-bottom: 1px solid #EEEEEE;
	}

	.role-form-role-location image {
		width: 80rpx;
		height: 80rpx;

	}

	.role-form-role-location button {
		background-color: #FFFFFF;
		border: none;
		color: #808080;

	}


	.role-form-role-location text {
		font-size: 32rpx;
		line-height: 80rpx;
	}


	.role-form-role-map {
		margin-top: 20rpx;
		height: 600rpx;
	}

	.role-form-role-map-fail {
		width: 100%;
		height: 80rpx;
		margin-top: 20rpx;

		text-align: center;
		border-bottom: 1rpx solid #EEEEEE;
	}

	.role-form-role-map-fail image {
		width: 80rpx;
		height: 80rpx;
	}
</style>
