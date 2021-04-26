<template>
	<view class="multi-container">
		<l-file ref="lFile" @up-success="onSuccess"></l-file>
		<view class="help">
			<!-- #ifdef H5 -->
			<view class="help-button" @click="contactUs">Help</view>
			<!-- #endif -->
			<!-- #ifdef MP-WEIXIN -->
			<view class="h-button">
				<button type="default" open-type="contact" show-message-card="true">Help</button>
			</view>
			<!-- #endif -->
			
		</view>
		<view class="upload-container">
			<view class="upload" @tap="onUpload">
				<image src="/pagesA/static/upload.png" mode="aspectFill"></image>
				<text>Upload (csv,excel)</text>
			</view>
		</view>

		<view class="download-container">
			<button type="default" @tap="onDown">Download template</button>
		</view>
		
		<contactus @close="showContactStatus = false" :showContact="showContactStatus"></contactus>
		
		<view class="upload-success-container" v-if="hasUploadSuccessful" >
			<view class="up-success">
				<view class="up-success-1">Upload Successful</view>
				<view class="up-success-2">Posts will be available in 5mins</view>
				<view class="up-success-button">
					<button type="default" @click="checkMyJobs">Check My Jobs</button>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	
	import contactus from "@/components/xll-contact-us/xll-contact-us.vue";
	
	export default {
		data() {
			var _this = this;
			return {
				localPath: '',
				uploadApi:_this.$multiImportJobUrl,
				showContactStatus:false,
				hasUploadSuccessful:false,
			}
		},
		components:{
			contactus
		},
		onLoad(option) {

		},
		computed:{
			// #ifdef H5
			isWechat(){
				return this.$isWechat()
			}
			// #endif
			
		},
		methods: {
			/* 保存 */
			onDown() {
				let url ='https://oss.esl-passport.cn/job_template.xlsx';
				// #ifdef H5
				window.location.href = url;
				// #endif
				// #ifndef H5
				this.$refs.lFile.download(url, 'local','job_template.xlsx')
					.then(path => {
						this.localPath = path;
						console.log(path)
						 uni.openDocument({
						      filePath: path,
						      success: function (res) {
						        console.log(res);
						      }
						    });
					});
				// #endif
				
			},

			/* 上传 */
			onUpload() {
				/**
				 * currentWebview: 当前webview
				 * url：上传接口地址
				 * name：附件key,服务端根据key值获取文件流，默认file,上传文件的key
				 * header: 上传接口请求头
				 */
				this.$refs.lFile.upload({
					// #ifdef APP-PLUS
					// nvue页面使用时请查阅nvue获取当前webview的api，当前示例为vue窗口
					currentWebview: this.$mp.page.$getAppWebview(),
					// #endif
					url: this.uploadApi,
					name: 'job_file',
					// #ifdef H5
					header:{
						platform: this.isWechat ? 2 : 1
					},
					// #endif
					// #ifdef MP-WEIXIN
					header:{
						platform:3
					},
					// #endif
					// 其他业务参数直接写key,value,如：
					token: uni.getStorageSync('token'),
					// key2: 'value2',
				});
			},
			checkMyJobs(){
				uni.reLaunch({
					url: '/pagesA/jobs/index?current=1'
				})
			},
			onSuccess(res) {
				console.log('上传成功回调', JSON.stringify(res));
				this.hasUploadSuccessful = true;
			},
			contactUs(){
				this.showContactStatus = true;
			}
		},

	}
</script>

<style>
	.multi-container {
		padding: 20rpx;
	}

	.help {
		width: 100%;
		margin-top: 40rpx;
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
	}
	.h-button button{
		background-color: #B1C452;
		color: #FFFFFF;
		width: 160rpx;
		height: 80rpx;
		line-height: 80rpx;
		font-size: 34rpx;
	}
	.help-button {
		width: 160rpx;
		height: 80rpx;
		line-height: 80rpx;
		text-align: center;
		font-size: 34rpx;
		background-color: #B1C452;
		color: #FFFFFF;
		border-radius: 10rpx;
	}

	.upload-container {
		margin-top: 20rpx;
		padding: 20rpx;
	}

	.upload {
		height: 300rpx;
		border: 2rpx dashed #0AA0A8;
		border-radius: 10rpx;
		margin-top: 40rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.upload image {
		width: 100rpx;
		height: 100rpx;
	}

	.upload text {
		margin-top: 20rpx;
		font-size: 30rpx;
		color: #808080;
	}

	.download-container {
		margin-top: 40rpx;

	}

	.download-container button {
		width: 90%;
		line-height: 80rpx;
		font-size: 34rpx;
		margin: 0 auto;
		background-color: #0AA0A8;
		color: #FFFFFF;
	}
	
	.upload-success-container{
		position: fixed;
		z-index: 899;
		top: 0;
		left: 0;
		
		width: 100%;
		height: 100%;
		background-color: rgba(0,0,0,0.8);
		
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	
	.up-success{
		background-color: #FFFFFF;
		padding: 20rpx 40rpx;
		border-radius: 20rpx;
	}
	
	.up-success-1{
		font-size: 38rpx;
		font-weight: 700;
		text-align: center;
		padding: 10rpx ;
	}
	.up-success-2{
		font-size: 34rpx;
		padding: 10rpx;
	}
	.up-success-button{
		margin-top: 28rpx;
		padding-bottom: 20rpx;
	}
	.up-success-button button{
		width: 90%;
		line-height: 80rpx;
		background-color: #0AA0A8;
		color: #FFFFFF;
		font-size: 34rpx;
	}
</style>
