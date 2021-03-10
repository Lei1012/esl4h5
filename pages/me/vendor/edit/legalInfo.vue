<template>
	<view>
		<view class="uni-flex uni-column basic-bg">
			<view class="flex-item basic-title">{{i18n.profilecompanylegalinfo}}</view>
			<view class="flex-item basic-form">
				<view class="basic-form-bio">
					<view class="basic-form-label">{{i18n.profilecompanynameen}} <text class="error-star">*</text></view>
					<input type="text" :maxlength="100" v-model="companyNameValue" :placeholder="i18n.profilecompanynameenph" />
					<!-- <fuck-textarea style="font-size: 34rpx;" :maxlength="200" v-model="companyNameValue"  :placeholder="i18n.profilecompanynameenph"></fuck-textarea> -->
				</view>
				<view class="basic-form-wechat">
					<view class="basic-form-label">{{i18n.profilelegalcompanyname}}</view>
					<input type="text" v-model="legalCompanyNameValue" :placeholder="i18n.profilelegalcompanynameph" />
				</view>
				<view class="basic-form-website">
					<view class="basic-form-label">{{i18n.profilebusinessregistrationnumber}}</view>
					<input type="text" :maxlength="18" v-model="businessRegistrationNumberValue" :placeholder="i18n.profilebusinessregistrationnumberph" />
				</view>

				<view class="basic-form-phone">
					<view class="basic-form-label">{{i18n.profilebusinesslicense}}</view>
					<uImg ref="upimg" :isXllType="true" :cropperWidth="cropperWidth" :cropperHeight="cropperHeight" :canUploadFile="true"
					 :limit="limitNum" :uploadFileUrl="uploadFileUrl" :heaer="header" :formData="formData" :fileKeyName="name"
					 :uImgList.sync="uImgList" @uploadSuccess="uploadSuccess"></uImg>
				</view>
			</view>
			<view class="flex-item basic-submit">
				<button @click="basicSubmit" type="default">{{i18n.profileeditsubmit}}</button>
			</view>
		</view>
	</view>
</template>

<script>
	import uImg from '@/components/zhtx-uploadImg/zhtx-uploadImg.vue';
	import profile from "@/api/profile.js";
	import formCheck from '@/common/formChecker.js';
	
	let toast = msg => {
		uni.showToast({
			title: msg,
			icon: 'none'
		});
	}

	export default {
		data() {
			var _this = this;
			return {

				confirmText: 'Confirm',
				cancelText: 'Cancel',
				companyNameValue: '',
				legalCompanyNameValue: '',
				businessRegistrationNumberValue: '',
				fileUrl: '',

				type: 1,
				msg: '',
				limitNum: 1,
				uploadFileUrl: _this.$uploadFileUrl, //替换成你的后端接收文件地址
				name: 'file[]', //上传的名字
				header: { // 如果需要header，请上传
				},
				formData: {},
				uImgList: [],
				uploadFileList: [], //上传之后的图片链接
				source: '',
				userImageList: [],
				cropperHeight: 400,
				cropperWidth: 300


			}
		},
		components: {
			uImg
		},
		computed: {
			i18n() {
				return this.$t('index')
			}
		},
		onLoad(option) {
			this.getBasicInfo();
		},
		methods: {
			uploadSuccess(result) {
				console.log(result)
				if (result === 1) {
					uni.navigateBack({
						delta: 1
					})
				} else {
					this.fileUrl = result.file_url

				}

			},
			basicSubmit() {

				if (this.companyNameValue == '') {
					return uni.showToast({
						title: this.i18n.profilecompanynameenph,
						icon: 'none'
					})
				}

				let data = {
					token: uni.getStorageSync('token'),
					vendor_name_en: this.companyNameValue,
					legal_company_name: this.legalCompanyNameValue,
					busin_reg_num: this.businessRegistrationNumberValue,
					busin_reg_img: this.fileUrl,
				}

				profile.addVendorBasic(data).then(res => {
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
						// console.log(vendorInfo)
						that.companyNameValue = vendorInfo.vendor_name_en;
						that.legalCompanyNameValue = vendorInfo.legal_company_name;
						that.businessRegistrationNumberValue = vendorInfo.busin_reg_num;
						if (vendorInfo.busin_reg_img != '') {
							that.uImgList.push(vendorInfo.busin_reg_img)
							that.fileUrl = vendorInfo.busin_reg_img;
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

	}
</script>

<style>
	page {
		background-color: #F4F5F6;
	}

	.basic-title {
		text-align: center;
		font-size: 38rpx;
		font-weight: 600;
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
		margin-top: 10rpx;
		text-align: left;
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
