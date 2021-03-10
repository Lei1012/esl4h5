<template>
	<view>
		<view :class="limit>1 ? 'zhtx-imgs' : 'zhtx-imgs-single' ">
		
			<view v-if="isXllType" class="xll-single" v-for="(item, index) in list" :key="index">
				<image class="xll-image-type" :src="item" :data-src="item" mode="aspectFit" @tap="previewImg" />
				<view class="zhtx-del" @tap="deleteItem(index)">x</view>
			</view>
			
			<view v-if="isXllType===false" :class="limit>1 ? 'zhtx-multi' : 'zhtx-single'" v-for="(item, index) in list" :key="index">
				<image class="xll-image" :src="item" :data-src="item" mode="aspectFit" @tap="previewImg" />
				<view class="zhtx-del" @tap="deleteItem(index)">x</view>
			</view>

			<view v-if="limit>list.length && limit == 1 && isXllType===false" class="zhtx-addNew zhtx-single" @tap="chooseAvatar">
				<text class="zhtx-add">+</text>
			</view>
			<view v-if="limit>list.length && limit == 1 && isXllType" class="xll-addNew xll-single" @tap="chooseXllFile">
				<text class="zhtx-add">+</text>
			</view>

			<view v-if="limit>list.length && limit > 1" class="zhtx-addNew zhtx-multi" @tap="chooseFile">
				<text class="zhtx-add">+</text>
			</view>
		</view>
		<view class="num" v-if="limit > 1 ">
			<text style="color: #0AA0A8;font-size: 14px;">{{list.length}}</text>
			/{{limit}}
		</view>
		<view class="video-process" v-if="limit===1 && isXllType">
			<progress :percent="percent" stroke-width="10" activeColor="#00B3D2"></progress>
		</view>
	</view>

</template>

<script>
	let toast = msg => {
		uni.showToast({
			title: msg,
			icon: 'none'
		});
	}

	export default {
		props: {
			uImgList: {
				type: Array, //附件列表
				default () {
					return {}
				}
			},
			uploadFileUrl: {
				type: String,
				dafault: '#' // 上传文件的服务器url
			},
			header: {
				type: Object, //上传图片到服务器时，HTTP 请求 Header
				default () {
					return {}
				}
			},
			limit: {
				type: Number, //限制可上传的图片数量
				default: 9 //这里有问题???
			},
			isXllType: {
				type: Boolean,
				default: false
			},
			fileKeyName: {
				type: String,
				default: 'file' //用于在服务端通过自定义key值获取该文件数据
			},
			canUploadFile: { //是否更新
				type: Boolean,
				default: true
			},
			cropperWidth: {
				type: Number,
				default: 200
			},
			cropperHeight: {
				type: Number,
				default: 200
			}

		},
		computed: {
			list: {
				get() {
					return this.uImgList
				}
			}
		},
		data() {
			return {
				imageList: [],
				filesList: [],
				fileData: [],
				percent:0
			};
		},
		created() {
			var that = this;
		},
		methods: {
			chooseAvatar() {
				// 此为uView的跳转方法，详见"文档-JS"部分，也可以用uni的uni.navigateTo
				this.$u.route({
					// 关于此路径，请见下方"注意事项"
					url: '/uview-ui/components/u-avatar-cropper/u-avatar-cropper',
					// 内部已设置以下默认参数值，可不传这些参数
					params: {
						// 输出图片宽度，高等于宽，单位px
						destWidth: this.cropperWidth,
						destHeight: this.cropperHeight,
						// 裁剪框宽度，高等于宽，单位px
						rectWidth: this.cropperWidth,
						rectHeight: this.cropperHeight,
						// 输出的图片类型，如果'png'类型发现裁剪的图片太大，改成"jpg"即可
						fileType: 'jpg',
					}
				})
			},
			//预览
			previewImg(e) {
				console.log(...this.list);
				uni.previewImage({
					current: e.target.dataset.src,
					loop: true,
					longPressActions: {
						itemList: ['发送给朋友', '保存图片', '收藏'],
						success: (data) => {
							//可以自定义分享操作
							console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
						},
						fail: function(err) {
							console.log(err.errMsg);
						}
					},
					urls: this.list //this.imageList,保持删除了的不在
				});
			},
			//删除
			deleteItem(index) {
				this.imageList.splice(index, 1)
				this.filesList.splice(index, 1)
				this.list.splice(index, 1); //已经达到了数据更新的状态
				// this.$forceUpdate(); //强制更新
				this.percent = 0;
				this.$emit('update:uImgList', this.list); //类似双向数据绑定

			},
			chooseXllFile() {
				uni.showLoading({
					title:'uploading'
				})
				let canUploadFile = this.canUploadFile;
				let tempFiles;
				if (canUploadFile) {
					uni.chooseImage({
						count: 1,
						sizeType: ['original', 'compressed'],
						sourceType: ['album', 'camera'],
						success: (res) => {
							console.log(res)
							tempFiles = res.tempFilePaths;
							this.imageList = this.imageList.concat(tempFiles)
							this.list.push(...tempFiles) //如果图片一次性就超过这个值怎么使他赋的值回退

							let fileArr = res.tempFiles;
							this.filesList = this.filesList.concat(fileArr)
							const uploadTask = uni.uploadFile({
								url: this.uploadFileUrl, //仅为示例，非真实的接口地址
								name: 'file[]',
								filePath: tempFiles[0],
								formData: {
									'token': uni.getStorageSync('token')
								},
								success: (res) => {
									let result = JSON.parse(res.data)
									// console.log(result)
									if (result.code === 200) {
										let fileObj = result.data[0]
										// 关闭加载提示
										uni.hideLoading()
										this.$emit('uploadSuccess', fileObj)
										this.$forceUpdate();
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

						},
						fail: err => {
							uni.hideLoading();
							console.log(err);
						}
					});

				} else {
					this.$emit('uploadSuccess', 1)
					this.$forceUpdate();
				}
			},
			chooseFile() {
				//双重保证
				// console.log(this.list);
				if (this.list.length >= this.limit) {
					// toast('已达到最大上传数量')
					return;
				}

				let canUploadFile = this.canUploadFile;
				let tempFiles;
				if (canUploadFile) {
					uni.chooseImage({
						count: this.limit - this.list.length,
						sizeType: ['original', 'compressed'],
						sourceType: ['album', 'camera'],
						success: (res) => {
							console.log(res)
							tempFiles = res.tempFilePaths;
							this.imageList = this.imageList.concat(tempFiles)
							this.list.push(...tempFiles) //如果图片一次性就超过这个值怎么使他赋的值回退

							let fileArr = res.tempFiles;
							this.filesList = this.filesList.concat(fileArr)

							// #ifdef H5
							if (this.list.length >= this.limit) {
								this.list.splice(this.limit)
								this.filesList.splice(this.limit)
								// toast('Maximum number of uploads reached')
								return;
							}
							// #endif
							this.$emit('update:uImgList', this.list); //类似双向数据绑定,更新数据, 使用.sync修饰
							this.$forceUpdate();

						},
						fail: err => {
							console.log(err);
						}
					});

				}
			},

			upload() {
				var _this = this;
				let files = [];
				let fileList = _this.filesList;

				// console.log(fileList)
				if (fileList.length > 0) {
					uni.showLoading({
						title: 'uploading...',
						mask: false
					});
					if (fileList.length > 0) {

						for (var i = 0; i < fileList.length; i++) {
							// console.log(i)
							const uploadTask = uni.uploadFile({
								url: this.uploadFileUrl, //仅为示例，非真实的接口地址
								name: 'file[]',
								filePath: fileList[i].path,
								formData: {
									'token': uni.getStorageSync('token')
								},
								success: (res) => {
									let result = JSON.parse(res.data)
									// console.log(result)
									if (result.code === 200) {
										let fileObj = result.data[0]
										_this.fileData.push(fileObj)
										send()
									} else {
										console.log(result.msg)
									}
								}
							});

							uploadTask.onProgressUpdate((res) => {
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

					let send = () => {
						// 关闭加载提示  
						
						// 输出已经上传完的图片地址，请查看控制台结果  
						let fileData = _this.fileData
						// console.log(fileData)
						if (fileData.length === fileList.length) {
							setTimeout(function(){
								_this.$emit('uploadSuccess', fileData)
								_this.$forceUpdate();
								uni.hideLoading()
							},3000)
							
						}
					}

				} else {
					this.$emit('uploadSuccess', 1)
					this.$forceUpdate();
				}

			},

		}
	};
</script>

<style>
	.zhtx-imgs {
		display: flex;
		flex-wrap: wrap;
		justify-content: flex-start;
		align-items: center;
	}

	.zhtx-imgs-single {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		align-items: center;
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
		right: 0;
		line-height: 28rpx;
		font-size: 30rpx;
		z-index: 100;
	}

	.zhtx-single {
		position: relative;
		width: 300rpx;
		height: 300rpx;
		border-radius: 300rpx;
		border: 4px dashed #00B3D2;
		margin: 10rpx;
	}

	.xll-single {
		position: relative;
		width: 300rpx;
		height: 300rpx;
		border-radius: 20rpx;
		border: 2px dashed #00B3D2;
		margin: 10rpx;
	}

	.zhtx-multi {
		position: relative;
		width: 200rpx;
		height: 200rpx;
		border-radius: 200rpx;
		border: 4px dashed #00B3D2;
		margin: 10rpx;
	}

	.zhtx-addNew {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.xll-addNew {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	text {
		font-size: 50rpx;
		color: #00B3D2;
	}

	.xll-image {
		width: 100%;
		height: 100%;
		border-radius: 50%;
		display: block;
	}

	.xll-image-type {
		width: 100%;
		height: 100%;
		display: block;
	}

	.num {
		float: right;
		color: #ccc;
		font-size: 12px;
	}

	.num::after {
		clear: both;
	}
</style>
