<template>
	<view class="uni-flex uni-column prompt-bg">
		<view class="flex-item prompt-title">
			<text>{{i18n.lookinggreatpgtxt}}</text>
		</view>
		<view class="flex-item home-picture">
			<canvas canvas-id="canvasArcbar1" id="canvasArcbar1" class="charts3">
				<image :src="educatorInfo.profile_photo" mode="aspectFill"></image>
				<view style="position: absolute;right: 50rpx;color: #00B3D2;bottom: 80rpx;font-size: 38rpx;font-weight: 700;">
					<text>{{percent}}</text>
				</view>
				<view style="position: absolute;right: 20rpx;color: #00B3D2;bottom: 50rpx;font-size: 30rpx;font-weight: 700;">
					<text>complete</text>
				</view>
			</canvas>
			<view class="flex-item home-user-name">
				{{educatorInfo.first_name}} {{educatorInfo.last_name}}
			</view>
		</view>
		<view class="flex-item prompt-button">
			<view class="prompt-button-1">
				<button type="default" @click="turnMyProfile">{{i18n.lookinggreatpgbutton1}}</button>
			</view>
			<view class="prompt-button-2">
				<button type="default" @click="turnMyHomepage">{{i18n.lookinggreatpgbutton2}}</button>
			</view>
		</view>
	</view>
</template>

<script>
	import profile from '@/api/profile.js';
	import uCharts from '@/components/u-charts/u-charts.js';
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
				educatorInfo: {},
				basicUserInfo: {}
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
			this.getBasicInfo()
			this.updateEduProfile()
		},
		methods: {
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
					identity: uni.getStorageSync('identity')
				}
				profile.getBasicInfo(data).then(res => {
					console.log(res)
					if (res.code == 200) {
						that.avatarUrl = res.message.headimgurl;
						// 			that.percent = res.message.is_educator + '%';
						// 			that.correctRate = res.message.is_educator / 100;
						// 			let char_data = {
						// 				series: [{
						// 					name: '正确率',
						// 					data: that.correctRate,
						// 					color: '#00b3d2'
						// 				}]
						// 			}

						// 			this.showArcbar("canvasArcbar1", char_data);

						that.basicUserInfo = res.message;
						that.educatorInfo = res.message.educator_info;

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
			updateEduProfile() {
				let data = {
					token: uni.getStorageSync('token')
				}
				profile.updateEduProfile(data).then(res => {
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
	@import url("@/common/me/prompt.css");
</style>
