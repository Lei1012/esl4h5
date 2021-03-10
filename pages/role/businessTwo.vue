<template>
	<view class="uni-flex uni-column role-bg">
		<view class="flex-item role-logo animate__animated  animate__rotateIn">
			<image src="../../static/esl-logo.png" lazy-load="true"></image>
		</view>
		<view class="flex-item role-intro animate__animated  animate__lightSpeedInRight">
			{{i18n.businessinfowindowheader}}
		</view>
		<view class="flex-item role-form">
			<view class="role-form-item">
				<input type="text" v-model="businessName" :placeholder="i18n.businessname">
			</view>
			<view class="role-form-role-location">
				<text style="color: #808080;" v-if="locationStatus===false"  @click="chooseLocation()">{{i18n.basicbusinesstwochooselocation}}</text>
				<text v-if="locationStatus" @click="chooseLocation()" >{{pickerText}}</text>
			</view>
			<view class="categories">
				<view class="category-title">
					{{i18n.businesscategory}}
				</view>
				<view class="categories-tags" v-for="(item,k) in range" :key="k">
					<view v-if="item['children'].length>0" class="category-parent">{{item.identity_name}}</view>
					<view v-if="item['children'].length===0" class="categories-tags-item"  :class="selectBusinessTypeList.indexOf(item) == -1 ? '' : 'tag-active' "
					 @click="selectBusinessType(item)">{{item.identity_name}}</view>
					<view class="categories-tags-item" v-for="(child,key) in item['children']" :key="key" :class="selectBusinessTypeList.indexOf(child) == -1 ? '' : 'tag-active' "
					 @click="selectBusinessType(child)">
						{{child.identity_name}}
					</view>
				</view>
			</view>
		</view>
		<view class="role-form-done">
			<button class="btn-submit" @click="submitBusinessTwo">
				{{i18n.basicinfobuton}}
			</button>
		</view>
	</view>

</template>

<script>

	import profile from '@/api/profile.js'
	import login from '@/api/login.js'

	export default {
		data() {
			return {
				yourname: '', //名字
				nickname: '',
				firstname: '',
				lastname: '',
				nationality:'',
				jobTitle: '', // 职位
				workEmail: '', //工作email
				businessName: '',
				country: '', //
				province: '',
				city: '',
				area:'',
				lon: '',
				lat: '',
				selectBusinessTypeStr: '',
				selectBusinessTypeList: [],
				range: [],

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

			this.subCateList()
			uni.$on('locationEvent',function(data){
				// console.log(data)
				that.province = data.province;
				that.city = data.city;
				that.area = data.area;
				that.locationStatus = true;
				that.pickerText =  that.area + ', ' + that.city + ', ' + that.province;
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
			openAddres3() {
				
			},
			selectBusinessType(item) {
				// console.log(item);
				if (this.selectBusinessTypeList.indexOf(item) == -1) {
					if (this.selectBusinessTypeList.length > 0) {
						let len = this.selectBusinessTypeList.length - 1;
						this.selectBusinessTypeList.splice(len, 1);
					}
					this.selectBusinessTypeList.push(item);
				} else {
					this.selectBusinessTypeList.splice(this.selectBusinessTypeList.indexOf(item), 1);
				}

				// console.log(this.selectBusinessTypeList);
			},
			subCateList: function() {
				let data = {
					pid:2,
					tree: 1
				}
				let rangeData = [];
				profile.getSubCateList(data).then(res => {
					console.log(res)
					if (res.code == 200) {
						this.range = res.message
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
			submitBusinessTwo: function() {
				//将下列代码加入到对应的检查位置
				//定义表单规则
				var that = this;

				let firstname = that.firstname;
				let nationality = that.nationality;
				let nickname = that.nickname;
				let jobTitle = that.jobTitle;
				let workEmail = that.workEmail;
				let businessName = that.businessName;

				let country = that.country;
				let province = that.province;
				let city = that.city;
				let area = that.area;
		
				if (businessName.length < 1) {
					return uni.showToast({
						title: that.i18n.businessnameerror,
						icon: "none"
					})
				}
				if (that.selectBusinessTypeList.length < 1) {
					return uni.showToast({
						title: that.i18n.businesscategoryerror,
						icon: "none"
					})
				}

				let businessTypeId;
				let businessTypeName;
				that.selectBusinessTypeList.forEach(item => {
					businessTypeId = item.id;
					businessTypeName = item.identity_name;
				})

				let data = {
					country: country,
					province: province,
					city: city,
					district:area,
					token: uni.getStorageSync('token'),
					nickname: nickname,
					first_name: firstname,
					nationality: nationality,
					job_title: jobTitle,
					work_email: workEmail,
					business_name: businessName,
					business_type_id: businessTypeId,
					business_type_name: businessTypeName
				}
				// console.log(data)
				uni.showLoading({
					title:'loading'
				})

				profile.addBusinessBasic(data).then(res => {
					if (res.code == 200) {
						//切换身份
						let identity_data = {
							identity: 2,
							unionid: uni.getStorageSync('unionid'),
							token: uni.getStorageSync('token')
						}
						login.changeLanguageAndIdentity(identity_data).then(res => {
							if (res.code == 200) {
								uni.reLaunch({
									url: '/pages/me/welcome?firstname='+that.firstname,
									success() {
										uni.setStorageSync('identity', 2)
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
