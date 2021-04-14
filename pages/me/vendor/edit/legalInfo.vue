<template>
	<view>
		<view class="uni-flex uni-column basic-bg">
			<view class="flex-item basic-title">{{i18n.profilecompanylegalinfo}}</view>
			<view class="flex-item basic-form">
				
				<u-form :model="form" :rules="rules" ref="uForm" :error-type="errorType" label-position="top"
					:label-style="{'font-weight':700}">
					<u-form-item :label="i18n.profilecompanynameen" prop="vendor_name_en">
						<u-input required border v-model="form.vendor_name_en" :placeholder="i18n.profilecompanynameenph" />
					</u-form-item>
					<u-form-item :label="i18n.profilelegalcompanyname" prop="legal_company_name">
						<u-input border v-model="form.legal_company_name" :placeholder="i18n.profilelegalcompanynameph" />
					</u-form-item>
					<u-form-item :label="i18n.profilebusinessregistrationnumber" prop="busin_reg_num">
						<u-input border :maxlength="18" v-model="form.busin_reg_num" :placeholder="i18n.profilebusinessregistrationnumberph" />
					</u-form-item>
				</u-form>

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
				cropperWidth: 300,
				
				errorType:['message'],
				form:{
					vendor_name_en: '',
					legal_company_name: '',
					busin_reg_num: '',
					busin_reg_img: '',
				},
				rules:{
					vendor_name_en: [{
						required: true,
						message: this.$t('index').profilecompanynameenph,
						trigger: ['change', 'blur'],
					}, ],
				}


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
				var that =this;
				this.$refs.uForm.validate(valid => {
					if (valid) {
						console.log('验证通过');
						that.form.token = uni.getStorageSync('token');
						that.form.busin_reg_img = this.fileUrl;
						let data = Object.assign({},that.form);
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
						// console.log(vendorInfo)
						if(vendorInfo.vendor_name_en){
							that.form.vendor_name_en = vendorInfo.vendor_name_en;
						}
						if(vendorInfo.legal_company_name){that.form.legal_company_name =vendorInfo.legal_company_name; }
						if(vendorInfo.busin_reg_num){that.form.busin_reg_num = vendorInfo.busin_reg_num;}
						
						if (vendorInfo.busin_reg_img) {
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
		font-size: 28rpx;
		font-weight: 700;

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
