<template>
	<view class="uni-flex uni-column prompt-bg">
		<view class="flex-item prompt-title">
			{{i18n.vendorlookinggreatpgtxt1}}<br>
			{{i18n.vendorlookinggreatpgtxt2}}
		</view>
		<view class="flex-item home-picture">
			<canvas canvas-id="canvasArcbar1" id="canvasArcbar1" class="charts3">
				<image v-if="vendorUserInfo.profile_photo !=''" :src="vendorUserInfo.profile_photo" mode="aspectFill">
				</image>
				<image v-if="vendorUserInfo.profile_photo ==''" :src="avatarUrl" mode="aspectFill"></image>
				<view v-if="vendorUserInfo.logo!=''" style="line-height: 80rpx; position: absolute;
				width:80rpx; height: 80rpx;border-radius: 80rpx; 
				right: 200rpx;top:160rpx;
				border: 1rpx solid #EEEEEE;background-size: contain;background-position: center;"
					:style=" {backgroundImage:'url('+vendorUserInfo.logo+')'}">
				</view>
				<view
					style="position: absolute;right: 50rpx;color: #FFFFFF;bottom: 80rpx;font-size: 38rpx;font-weight: 700;">
					<text>{{percent}}</text>
				</view>
				<view
					style="position: absolute;right: 20rpx;color: #FFFFFF;bottom: 50rpx;font-size: 30rpx;font-weight: 700;">
					<text>Complete</text>
				</view>
			</canvas>
			<view class="flex-item home-user-name">
				<text>{{vendorUserInfo.first_name}} {{vendorUserInfo.last_name}}</text>
			</view>
		</view>

		<view class="account-qrcode">
			<view class="account-qrcode-1">Speed up the process</view>
			<view class="account-qrcode-2">
				<uni-icons type="pulldown" size="30"></uni-icons>
			</view>
			<view class="account-qrcode-3">
				<image :src="list[0].url" mode="aspectFill" @click="previewQrcode(list[0].url)"></image>
				<text>Save and Scan</text>
			</view>
		</view>

		<view class="flex-item prompt-button">
			<view class="prompt-button-1">
				<button type="default" @click="turnMyHomepage">Home</button>
			</view>
			<view class="prompt-button-2">
				<button type="default" @click="turnMyProfile">Profile</button>
			</view>
		</view>
	</view>
</template>

<script>
	import profile from '@/api/profile.js';
	import uCharts from '@/components/u-charts/u-charts.js';
	import ads from '@/api/ads.js';
	var _self;
	var canvaArcbar1;
	export default {
		data() {
			return {
				cWidth3: '', //圆弧进度图
				cHeight3: '', //圆弧进度图
				arcbarWidth: '', //圆弧进度图，进度条宽度,此设置可使各端宽度一致
				pixelRatio: 1,
				chartData: {
					series: [{
						name: '正确率',
						data: 0.5,
						color: '#00b3d2'
					}]
				},
				percent: '',
				basicUserInfo: {},
				vendorUserInfo: {},
				list: []
			}
		},
		computed: {
			i18n() {
				return this.$t('index')
			}
		},
		onLoad() {
			_self = this;
			this.cWidth3 = uni.upx2px(600); //这里要与样式的宽高对应
			this.cHeight3 = uni.upx2px(300); //这里要与样式的宽高对应
			this.arcbarWidth = uni.upx2px(24);
			this.getBasicInfo();
			this.getAds();
			this.updateVendorProfile();
		},
		methods: {
			previewQrcode(url){
				uni.previewImage({
					urls:[url]
				})
			},
			getAds() {
				let data = {
					token: uni.getStorageSync('token'),
					limit: 1000,
					cate: 8
				}
				ads.list(data).then(res => {
					// console.log(res)
					if (res.code == 200) {
						this.list = res.message.data.filter(item => item.position == 1);
					}
				}).catch(error => {
					console.log(error)
				})
			},
			turnMyHomepage() {
				uni.reLaunch({
					url: '/pages/home/index'
				})
			},
			turnMyProfile() {
				uni.reLaunch({
					url: 'home'
				})
			},
			updateVendorProfile() {
				let data = {
					token: uni.getStorageSync('token')
				}
				profile.updateVendorProfile(data).then(res => {
					console.log(res)
					if (res.code == 200) {
						this.percent = res.message + '%';
						this.correctRate = res.message / 100;
						let char_data = {
							series: [{
								name: '正确率',
								data: this.correctRate,
								color: '#00b3d2'
							}]
						}

						this.showArcbar("canvasArcbar1", char_data);

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
			showArcbar(canvasId, chartData) {
				this.percent = Math.round(chartData.series[0].data * 100) + '%';
				canvaArcbar1 = new uCharts({
					$this: _self,
					canvasId: canvasId,
					type: 'arcbar',
					fontSize: 11,
					legend: {
						show: false
					},
					background: '#FFFFFF',
					pixelRatio: _self.pixelRatio,
					series: chartData.series,
					animation: true,
					width: _self.cWidth3 * _self.pixelRatio,
					height: _self.cHeight3 * _self.pixelRatio,
					dataLabel: true,
					// title: {
					// 	name: Math.round(chartData.series[0].data*100)+'%',//这里我自动计算了，您可以直接给任意字符串
					// 	color: '#0AA0A8',
					// 	fontSize: 25 * _self.pixelRatio
					// },
					// subtitle: {
					// 	name: 'name', //这里您可以直接给任意字符串
					// 	color: '#666666',
					// 	fontSize: 15 * _self.pixelRatio
					// },
					extra: {
						arcbar: {
							type: 'default',
							width: _self.arcbarWidth * _self.pixelRatio, //圆弧的宽度
						}
					}
				});
			},
			getBasicInfo() {
				var that = this;
				let data = {
					id: uni.getStorageSync('uid'),
					token: uni.getStorageSync('token'),
					identity: 3
				}
				profile.getBasicInfo(data).then(res => {
					console.log(res)
					if (res.code == 200) {
						that.avatarUrl = res.message.headimgurl;
						// 			that.percent = res.message.is_vendor + '%';
						// 			that.correctRate = res.message.is_vendor / 100;

						// 			let chartData = {
						// 				series: [{
						// 					name: '正确率',
						// 					data: that.correctRate,
						// 					color: '#00b3d2'
						// 				}]
						// 			}
						// 			this.showArcbar("canvasArcbar1", chartData);

						that.basicUserInfo = res.message;
						that.vendorUserInfo = res.message.vendor_info;


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
		onShareAppMessage: function() {

		},
		onShareTimeline: function() {

		},
		onAddToFavorites: function() {

		},
	}
</script>

<style>
	page {
		background-color: #FFFFFF;
	}

	.prompt-title {
		width: 96%;
		margin: 40rpx auto 0;
		text-align: center;
		font-size: 34rpx;
	}

	.home-picture {
		margin-top: 40rpx;
		text-align: center;
		position: relative;
	}

	.charts3 {
		width: 600rpx;
		height: 260rpx;
		margin: 0 auto;
		margin-top: 10rpx;

	}

	.charts3 image {
		width: 200rpx;
		height: 200rpx;
		border-radius: 200rpx;
		margin-top: 50rpx;
	}

	.account-qrcode {
		margin-top: 40rpx;
	}

	.account-qrcode-1 {
		text-align: center;
		font-size: 34rpx;
	}

	.account-qrcode-2 {
		text-align: center;
	}

	.account-qrcode-3 {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.account-qrcode-3 image {
		width: 300rpx;
		height: 300rpx;
	}

	.account-qrcode-3 text {
		font-size: 30rpx;
	}

	.prompt-button {
		width: 80%;
		margin: 40rpx auto;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
	}

	.prompt-button-1 button {
		background-color: #0AA0A8;
		color: #FFFFFF;
		font-size: 34rpx;
		padding-left: 40rpx;
		padding-right: 40rpx;
	}

	.prompt-button-2 button {
		background-color: #004956;
		color: #FFFFFF;
		font-size: 34rpx;
		padding-left: 40rpx;
		padding-right: 40rpx;
	}
</style>
