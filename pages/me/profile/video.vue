<template>
	<view class="uni-flex uni-column video-bg">
		<view class="flex-item video-title">
			Intro Video
		</view>
		<view class="flex-item">
			<view class="zhtx-video" v-if="src">
				<video :src="src" class="video"></video>
				<view class="zhtx-del" @tap="delectVideo">x</view>
			</view>
			<view class=" zhtx-single zhtx-addNew" @tap="chooseVideo" v-if="VideoOfImagesShow">
				<text class="zhtx-add">+</text>
			</view>

		</view>
		<view class="xll-tips">should not exceed 20mb</view>
		<view class="video-process">
			<progress :percent="percent" stroke-width="10" activeColor="#00B3D2"></progress>
		</view>
		<view class="flex-item video-submit">
			<button type="default" @click="uploadFile">Upload</button>
		</view>
	</view>
</template>

<script>
	var sourceType = [
		['camera'],
		['album'],
		['camera', 'album']
	]
	let toast = msg => {
		uni.showToast({
			title: msg,
			icon: 'none'
		});
	}

	import axios from 'axios';
	import profile from '@/api/profile.js';
	export default {
		data() {
			var _this = this;
			return {
				imageList: [], //图片
				src: "", //视频存放
				videoFile: [],
				sourceTypeIndex: 2,
				checkedValue: true,
				checkedIndex: 0,
				sourceType: ['拍摄', '相册', '拍摄或相册'],
				cameraList: [{
						value: 'back',
						name: '后置摄像头',
						checked: 'true'
					},
					{
						value: 'front',
						name: '前置摄像头'
					},
				],
				cameraIndex: 0,
				VideoOfImagesShow: true,
				uploadFileUrl: _this.$uploadFileUrl,
				type: 1,
				percent: 0
			}
		},
		onUnload() {
			this.src = '';
			this.sourceTypeIndex = 2;
			this.sourceType = ['拍摄', '相册', '拍摄或相册'];
		},
		computed: {
			i18n() {
				return this.$t('index')
			}
		},
		onLoad(option) {
			this.type = option.type;

			if (option.source != undefined && option.source != '') {
				this.src = option.source;
				this.VideoOfImagesShow = false;
			}

		},
		methods: {

			chooseVideo() {
				// 上传视频
				console.log('上传视频')
				uni.chooseVideo({
					maxDuration: 10,
					count: 1,
					camera: this.cameraList[this.cameraIndex].value,
					sourceType: sourceType[this.sourceTypeIndex],
					success: (res) => {
						console.log(res)
						// this.videoFile.push(res.tempFilePath)
						this.videoFile = res.tempFilePath
						// console.log(JSON.stringify(res.tempFilePath), '视频')
						this.src = res.tempFilePath;
						// console.log(this.src)
						this.VideoOfImagesShow = false;
					}
				})
			},
			delectVideo() {
				this.src = ''
				this.VideoOfImagesShow = true;
			},
			uploadFile() {
				let videoFile = this.videoFile;
				if (videoFile == '') {
					return;
				}

				uni.showLoading({
					title: 'uploading...',
					mask: false
				});

				const uploadTask = uni.uploadFile({
					url: this.uploadFileUrl, //仅为示例，非真实的接口地址
					name: 'file[]',
					filePath: this.videoFile,
					formData: {
						'token': uni.getStorageSync('token')
					},
					success: (res) => {
						// console.log(res)
						let result = JSON.parse(res.data)
						// console.log(result)
						if (result.code === 200) {
							uni.hideLoading()
							let data = {
								token: uni.getStorageSync('token'),
								identity: uni.getStorageSync('identity'),
								video_url: result.data[0]['file_url']
							}
							profile.addUserInfo(data).then(res => {
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
						} else {
							console.log(result.msg)
						}
					}
				});

				uploadTask.onProgressUpdate((res) => {
					this.percent = res.progress;
					console.log('上传进度' + res.progress);
					console.log('已经上传的数据长度' + res.totalBytesSent);
					console.log('预期需要上传的数据总长度' + res.totalBytesExpectedToSend);
					// 测试条件，取消上传任务。
					if (res.progress > 150) {
						uploadTask.abort();
					}

				});



			}

		}
	}
</script>

<style>
	.video-bg {
		width: 100%;
		height: 100%;
		background-color: #FFFFFF;
	}

	.video-title {
		text-align: center;
		font-size: 36rpx;
		font-weight: 600;
		background-color: #004956;
		color: #FFFFFF;
		height: 200rpx;

		line-height: 200rpx;
	}



	.video-submit {
		width: 80%;
		position: fixed;
		z-index: 1000;
		bottom: 100rpx;
		left: 0;
		right: 0;
		margin: auto;

	}

	.video-submit button {
		background-color: #004956;
		color: #FFFFFF;
		height: 80rpx;
		border-radius: 80rpx;
		line-height: 80rpx;
	}

	.zhtx-single {
		position: relative;
		width: 300rpx;
		height: 300rpx;
		border-radius: 300rpx;
		border: 4px dashed #00B3D2;
		margin: 0 auto;
		margin-top: 20%;
	}

	.zhtx-video {
		position: relative;

		margin: 0 auto;
		margin-top: 10%;
		padding-top: 60rpx;
		text-align: center;
	}

	.zhtx-addNew {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	text {
		font-size: 50rpx;
		color: #00B3D2;
	}

	image {
		width: 100%;
		height: 100%;
		border-radius: 50%;
		display: block;
	}

	.zhtx-del {
		position: absolute;
		width: 35rpx;
		height: 35rpx;
		border-radius: 35rpx;
		background: #f56c6c;
		color: #fff;
		top: 0;
		text-align: center;
		right: 20rpx;
		line-height: 28rpx;
		font-size: 30rpx;
		z-index: 100;
	}

	.xll-tips {
		text-align: center;
		color: #808080;
		margin-top: 20rpx;
	}

	.video-process {
		width: 96%;
		margin: 20rpx auto;
	}
</style>
