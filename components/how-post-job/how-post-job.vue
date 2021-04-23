<template>
	<view v-if="status">
		<view class="post-bg" @click="closePostJob"></view>
		<view class="post-container">
			<button type="default" class="post-item button-1" @click="singlePost()">
				<image src="../../static/post-job-w.png" mode="aspectFill"></image>
				<text>{{i18n.singlepostjob}}</text>
			</button>
			<button type="default" class="post-item button-2" @click="multiplePost()">
				<image src="../../static/excel.png" mode="aspectFill"></image>
				<text>{{i18n.multipostjob}}</text>
			</button>
		</view>
	</view>
</template>

<script>
	import profile from '@/api/profile.js';
	export default {
		name: "how-post-job",
		data() {
			return {
				status: this.showPostJobStatus,
			};
		},
		watch: {
			showPostJobStatus(val) {
				this.status = val;
			}
		},
		computed:{
			i18n(){
				return this.$t('index');
			}
		},
		props: {
			showPostJobStatus: {
				type: Boolean,
				default: false
			},

		},
		methods: {
			closePostJob() {
				var that = this;
				that.$emit('close');
			},
			singlePost() {
				// #ifdef MP-WEIXIN
				let token = uni.getStorageSync('token');
				if (token == '') {
					var pages = getCurrentPages(); // 当前页面
					var currentPagePath = pages[pages.length - 1]; // 前一个页面
					
					if(currentPagePath.route == 'pages/login/index'){
						return;
					}
					return uni.navigateTo({
						url: '/pages/login/index?redirect='+ encodeURIComponent(currentPagePath.route)
					})
				}
				// #endif

				let uid = uni.getStorageSync('uid')
				let data = {
					user_id: uid
				}
				profile.getUserIntegrity(data).then(res => {
					// console.log(res)
					if (res.code == 200) {
						let percentValue = res.message.is_business
						// this.profilePercentValue = res.message.is_business;
						if (percentValue < 50) {
							uni.reLaunch({
								url: '/pages/me/business/prompt'
							})
						} else {
							uni.navigateTo({
								url: '/pages/jobs/jobs?jobmd5=' + this.$u.guid(32)
							})
						}

					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
					}
				}).catch(error => {
					console.log(error)
				})
			},
			multiplePost() {
				// #ifdef MP-WEIXIN
				let token = uni.getStorageSync('token');
				if (token == '') {
					var pages = getCurrentPages(); // 当前页面
					var currentPagePath = pages[pages.length - 1]; // 前一个页面
					
					if(currentPagePath.route == 'pages/login/index'){
						return;
					}
					return uni.navigateTo({
						url: '/pages/login/index?redirect='+encodeURIComponent(currentPagePath.route)
					})
				}
				// #endif
				let uid = uni.getStorageSync('uid')
				let data = {
					user_id: uid
				}
				profile.getUserIntegrity(data).then(res => {
					// console.log(res)
					if (res.code == 200) {
						let percentValue = res.message.is_business
						// this.profilePercentValue = res.message.is_business;
						if (percentValue < 50) {
							uni.reLaunch({
								url: '/pages/me/business/prompt'
							})
						} else {
							uni.navigateTo({
								url: '/pages/jobs/multi/index'
							})
						}

					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
					}
				}).catch(error => {
					console.log(error)
				})

			}
		}
	}
</script>

<style>
	.post-bg {
		position: fixed;
		z-index: 899;
		top: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.8);
	}


	.post-container {
		width: 80%;
		height: 360rpx;
		position: fixed;
		z-index: 999;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		margin: auto;
		padding: 20rpx;
		background-color: #FFFFFF;
		border-radius: 20rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.post-item {
		width: 90%;
		height: 100rpx;
		margin-top: 20rpx;
		border: 1rpx solid #EEEEEE;
		line-height: 100rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: flex-start;
		color: #FFFFFF !important;
	}

	.button-1 {
		background-color: #0AA0A8 !important;
	}

	.button-2 {
		background-color: #B1C452 !important;
	}

	.post-item image {
		width: 60rpx;
		height: 60rpx;
		margin-left: 20rpx;
	}

	.post-item text {
		font-size: 34rpx;
		margin-left: 20rpx;
	}
</style>
