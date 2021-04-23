<template>
	<view class="uni-flex uni-column photo-bg">
		<view class="flex-item photo-title">
			<!-- educator -->
			<text v-if="type==1">Profile Photo</text>
			<text v-if="type==2">Background Banner</text>
			<text v-if="type==3">Account Images (6 max) </text>
			<!-- business -->
			<text v-if="type == 4">Profile Photo</text>
			<text v-if="type == 5">Business Logo</text>
			<text v-if="type == 6">Background Banner</text>
			<text v-if="type == 7">Account Images (6 max)</text>
			<!-- vendor -->
			<text v-if="type == 8">Profile Photo</text>
			<text v-if="type == 9">Vendor Logo</text>
			<text v-if="type == 10">Background Banner</text>
			<text v-if="type == 11">Account Images (6 max)</text>
			<text v-if="type == 12">WeChat Official Account QR Code </text>
			<!-- basic -->
			<text v-if="type == 13">{{i18n.profilephotopgtxt}}</text>
			<text v-if="type == 14">{{i18n.profilephotopgtxt}}</text>
			<text v-if="type == 15">{{i18n.profilephotopgtxt}}</text>
		</view>
		<view class="flex-item photo-box">
			<view style="padding: 30rpx;">
				<uImg ref="upimg" :cropperWidth="cropperWidth" :cropperHeight="cropperHeight" :canUploadFile="true" :limit="limitNum"
				 :uploadFileUrl="uploadFileUrl" :heaer="header" :formData="formData" :fileKeyName="name" :uImgList.sync="uImgList"
				 @uploadSuccess="uploadSuccess"></uImg>
			</view>
		</view>

		<view class="xll-text" v-if="type!=11 && type != 7 && type != 3">
			{{i18n.photomediahelpsone}} <br>
			{{i18n.photomediahelpstwo}} <br>
			<text> *</text> <text style="font-size: 30rpx;font-weight: 400;"> {{i18n.photomediahelpsthree}}</text>
		</view>

		<view class="flex-item photo-submit" v-if="type==3 || type == 7 || type == 11">
			<button @click="uploadFile">{{i18n.profileimageupload}}</button>
		</view>
		<view class="flex-item skip-photo" v-if="vqrcode==1 || vlogo==1">
			<button type="default" v-if="vlogo==1" @click="skipLogo">{{i18n.profileimageskip}}</button>
			<button type="default" v-if="vqrcode==1" @click="skipQrcode">{{i18n.profileimageskip}}</button>
		</view>
		
		<view class="upload-loading" v-if="isUploading">
			{{i18n.profileimageuploading}}
		</view>
	</view>
</template>

<script>
	import uImg from '@/components/zhtx-uploadImg/zhtx-uploadImg.vue';
	import profile from '@/api/profile.js';

	let toast = msg => {
		uni.showToast({
			title: msg,
			icon: 'none'
		});
	}

	export default {
		components: {
			uImg
		},

		data() {
			var _this = this;
			return {
				type: 1,
				msg: '',
				limitNum: 6,
				uploadFileUrl: _this.$uploadFileUrl, //替换成你的后端接收文件地址
				name: 'file[]', //上传的名字
				header: { // 如果需要header，请上传
				},
				formData: {},
				uImgList: [],
				uploadFileList: [], //上传之后的图片链接
				source: '',
				userImageList: [],
				cropperHeight: 200,
				cropperWidth: 200,
				isUploading:false,
				vprofile:0,
				vlogo:0,
				vqrcode:0,
			}
		},
		computed: {
			i18n() {
				return this.$t('index')
			},
			// #ifdef H5
			isWechat(){
				return this.$isWechat()
			}
			// #endif
			
		},
		created() {
			var that = this;
			uni.$on('uAvatarCropper', path => {
				
				that.isUploading = true;
				
				that.uImgList.push(path)
				// // 可以在此上传到服务端
				uni.uploadFile({
					url: that.$uploadFileUrl,
					filePath: path,
					// #ifdef H5
					header:{
						platform: that.isWechat ? 2 : 1
					},
					// #endif
					// #ifdef MP-WEIXIN
					header:{
						platform:3
					},
					// #endif
					name: 'file[]',
					formData: {
						token: uni.getStorageSync('token')
					},
					success: (res) => {
						// console.log(res)
						if (res.statusCode == 200) {
							let result = JSON.parse(res.data)
							// console.log(result)
							if (result.code == 200) {
								if (that.type == 1 || that.type == 4 || that.type == 8 || that.type == 13 || that.type == 14 || that.type ==
									15) {
									let data = {
										token: uni.getStorageSync('token'),
										identity: uni.getStorageSync('identity'),
										profile_photo: result.data[0]['file_url']
									}
									profile.addUserInfo(data).then(res => {
										console.log(res)
										if (res.code == 200) {
											uni.$emit('userInfoUpdated',{msg:'页面更新'});
											if(that.vprofile == 1){
												that.isUploading = false;
												uni.showLoading({
													title:'Uploaded!'
												})
												setTimeout(function(){
													uni.hideLoading();
													uni.reLaunch({
														url:'/pages/me/profile/photo?type=9&vlogo=1'
													})
													
												},1200);
												return;
											}
											
											if (that.type == 13) {
												return uni.reLaunch({
													url: '../educator/prompt'
												})
											}
											if (that.type == 14) {
												return uni.reLaunch({
													url: '../business/prompt'
												})
											}
											if (that.type == 15) {
												return uni.reLaunch({
													url: '../vendor/prompt'
												})
											}
											
											setTimeout(function(){
												that.isUploading = false;
												uni.navigateBack({
													delta: 1
												})
											},1500)
											
										}
									}).catch(error => {
										console.log(error.response)
									})


								}
								if (that.type == 2 || that.type == 6 || that.type == 10) {
									let data = {
										token: uni.getStorageSync('token'),
										identity: uni.getStorageSync('identity'),
										header_photo: result.data[0]['file_url']
									}
									profile.addUserInfo(data).then(res => {
										console.log(res)
										uni.$emit('userInfoUpdated',{msg:'page updated'});
										if (res.code == 200) {
											setTimeout(function(){
												that.isUploading = false;
												uni.navigateBack({
													delta: 1
												})
											},1500)
										}
									}).catch(error => {
										console.log(error.response)
									})

								}
								if (that.type == 5 || that.type == 9) {
									let data = {
										token: uni.getStorageSync('token'),
										identity: uni.getStorageSync('identity'),
										logo: result.data[0]['file_url']
									}
									profile.addUserInfo(data).then(res => {
										console.log(res)
										uni.$emit('userInfoUpdated',{msg:'page updated'});
										if (res.code == 200) {
											if(that.vlogo == 1){
												// todo
												that.isUploading = false;
												uni.showLoading({
													title:'Uploaded!'
												})
												setTimeout(function(){
													uni.hideLoading();
													uni.reLaunch({
														url:'/pages/me/profile/photo?type=12&vqrcode=1'
													})
												},1200);
												return ;
											}
											setTimeout(function(){
												that.isUploading = false;
												uni.navigateBack({
													delta: 1
												})
											},1500)
										}
									}).catch(error => {
										console.log(error.response)
									})

								}

								if (that.type == 12) {
									let data = {
										wechat_public_qrcode: result.data[0]['file_url'],
										token: uni.getStorageSync('token')
									}

									profile.addVendorBasic(data).then(res => {
										console.log(res)
										uni.$emit('userInfoUpdated',{msg:'page updated'});
										if (res.code == 200) {
											if(that.vqrcode == 1){
												that.isUploading = false;
												uni.showLoading({
													title:'Uploaded!'
												})
												setTimeout(function(){
													uni.hideLoading();
													uni.reLaunch({
														url: '../vendor/prompt'
													})
												},1200);
												return;
											}
											setTimeout(function(){
												that.isUploading = false;
												uni.navigateBack({
													delta: 1
												})
											},1500)
											
										} else {
											uni.showToast({
												title: res.msg,
												icon: 'none'
											})
										}
									}).catch(err => {
										console.log(err)
									})

								}


							} else {
								uni.showToast({
									title: res.msg,
									icon: 'none'
								})
							}
						}

					},
					complete: (res) => {
						console.log(res);

					}
				});
				
			})
		},
		onUnload() {
			uni.$off('uAvatarCropper');
		},
		onLoad(option) {
			var that = this;
			that.type = option.type;
			
			if(that.type == 1 || that.type == 4 || that.type == 13 || that.type == 14 || that.type ==15){
				uni.setNavigationBarTitle({
					title:'Profile Photo'
				})
			}
			if(that.type == 2 || that.type == 6 || that.type == 10){
				uni.setNavigationBarTitle({
					title:'Background Banner'
				})
			}
			if(that.type == 3 || that.type == 7 || that.type == 11){
				uni.setNavigationBarTitle({
					title:'Account Images (6 max)'
				})
			}
			
			if(that.type == 5){
				uni.setNavigationBarTitle({
					title:'Business Logo'
				})
			}
			if(that.type == 9){
				uni.setNavigationBarTitle({
					title:'Vendor Logo'
				})
			}
			if(that.type == 12){
				uni.setNavigationBarTitle({
					title:'WeChat Official Account QR Code'
				})
			}
			
			if(option.vprofile){
				that.vprofile = option.vprofile;
			}
			if(option.vlogo){
				that.vlogo  = option.vlogo;
			}
			if(option.vqrcode){
				that.vqrcode = option.vqrcode;
			}
			
			let type = option.type;

			if (type == 1 || type == 4 || type == 5 || type == 8 || type == 9 || type == 12 ||
				type == 13 || type == 14 || type == 15) {
				that.limitNum = 1
				that.cropperWidth = 200;
				that.cropperHeight = 200;
				let source = decodeURI(option.source);

				if (source != undefined && source != 'undefined' && source != '') {
					that.uImgList.push(source);
				}

			}
			
			if (type == 2 || type == 6 || type == 10) {
				that.limitNum = 1
				that.cropperWidth = 300;
				that.cropperHeight = 130;
				let source = decodeURI(option.source);
				if (source != undefined && source != 'undefined' && source != '') {
					that.uImgList.push(source);
				}
			}

			if (type == 3 || type == 7 || type == 11) {
				that.limitNum = 6
				let userImageListStr = uni.getStorageSync('userImageList');
				// console.log(userImageListStr)
				if (userImageListStr != '') {
					let userImageList = JSON.parse(userImageListStr);
					// console.log(userImageList)
					userImageList.forEach(item => {
						that.uImgList.push(item.url);
					})
					uni.removeStorageSync('userImageList');
				}
			}

		},
		methods: {
			skipLogo(){
				return uni.reLaunch({
					url:'/pages/me/profile/photo?type=12&vqrcode=1'
				})
			},
			skipQrcode(){
				return uni.reLaunch({
					url: '../vendor/prompt'
				})
			},
			uploadSuccess(result) {
				console.log(result)
				if (result === 1) {
					uni.navigateBack({
						delta: 1
					})
				} else {
					let type = this.type;
					let uImgList = this.uImgList;
					let imgArr = result;
					let img = [];

					let token = uni.getStorageSync('token');
					let identity = 1;
					if (type == 3) {
						identity = 1
					}
					if (type == 7) {
						identity = 2
					}
					if (type == 11) {
						identity = 3
					}
					console.log(uImgList)
					if (uImgList.length > 0) {
						uImgList.forEach(item => {
							// #ifdef MP-WEIXIN
							let arr = item.split('//')
							let arr_one = arr[1]
							let arr_two = arr_one.split('/')
							let arr_three = arr_one.split('_')
							// console.log(arr_two)
							if (arr_two[0] !== 'tmp' && arr_three[0] !== 'tmp') {
								img.push(item);
							}
							// #endif
							// #ifdef H5
							let str = item.substr(0, 4)
							if (str !== 'blob') {
								img.push(item);
							}
							// #endif

						})
					}

					imgArr.forEach(item => {
						img.push(item.file_url)
					})
					let data = {
						token: token,
						identity: identity,
						img: img
					}

					profile.addUserImg(data).then(res => {
						// console.log(res)
						if (res.code == 200) {
							toast('upload success')
							uni.navigateBack({
								delta: 1
							})
						}
					}).catch(error => {
						console.log(error.response)
					})
				}

			},
			//上传方法的调用
			uploadFile() {
				this.$refs.upimg.upload()
			}
		},

	}
</script>


<style>
	.photo-bg {
		width: 100%;
		height: 100%;
		background-color: #F4F5F6;

	}

	.photo-title {
		text-align: center;
		background-color: #004956;
		height: 200rpx;
		line-height: 200rpx;
	}
	
	.photo-title text{
		font-size: 36rpx;
		font-weight: 600;
		color: #FFFFFF;
	}
	
	.photo-box {
		width: 96%;
		margin: 0 auto;
		background-color: #FFFFFF;
		margin-top: 10%;
		border-radius: 20rpx;
	}

	.photo-submit {
		width: 80%;
		margin: 0 auto;
		margin-top: 10%;
		padding-bottom: 100rpx;

	}

	.photo-submit button {
		background-color: #004956;
		color: #FFFFFF;
		height: 80rpx;
		border-radius: 80rpx;
		line-height: 80rpx;
	}

	.xll-text {
		padding: 20rpx;
		text-align: center;
		font-size: 38rpx;
		font-weight: 700;
		margin-top: 10rpx;
	}
	
		
	.upload-loading{
		position: fixed;
		z-index: 1100;
		top: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0,0,0,0.8);
		color: #FFFFFF;
		
		font-size: 34rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		
	}
	
	.skip-photo{
		width: 80%;
		margin: 20rpx auto;
	}
	.skip-photo button{
		background-color: #0AA0A8;
		color: #FFFFFF;
		line-height: 80rpx;
	}
	
</style>