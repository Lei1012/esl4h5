<template>
	<view class="uni-flex uni-column prompt-bg">
		<view class="flex-item prompt-title">
			<text>{{i18n.lookinggreatpgtxt}}</text>
		</view>
		<view class="flex-item home-picture">
			<canvas canvas-id="canvasArcbar1" id="canvasArcbar1" class="charts3">
				<image :src="businessUserInfo.profile_photo" mode="aspectFill"></image>
				<view style="position: absolute;right: 50rpx;color: #00B3D2;bottom: 80rpx;font-size: 38rpx;font-weight: 700;">
					<text>{{percent}}</text>
				</view>
				<view style="position: absolute;right: 20rpx;color: #00B3D2;bottom: 50rpx;font-size: 30rpx;font-weight: 700;">
					<text>complete</text>
				</view>
			</canvas>
			<view class="flex-item home-user-name">
				{{businessUserInfo.first_name}} {{businessUserInfo.last_name}}
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
				basicUserInfo:{},
				businessUserInfo:{},
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
			this.updateBusProfile()
		},
		methods: {
			turnMyHomepage(){
				uni.reLaunch({
					url:'/pages/home/index'
				})
			},
			turnMyProfile(){
				uni.reLaunch({
					url:'home'
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
					token: uni.getStorageSync('token')
				}
				profile.getBasicInfo(data).then(res => {
					console.log(res)
					if (res.code == 200) {
						that.avatarUrl = res.message.headimgurl;
						that.basicUserInfo = res.message;
						that.businessUserInfo = res.message.business_info;
						
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
			updateBusProfile(){
				let data = {
					token:uni.getStorageSync('token')
				}
				profile.updateBusProfile(data).then(res=>{
					console.log(res)
					if(res.code ==  200){
						this.percent=res.message + '%';
						this.correctRate = res.message / 100;
						let char_data = {
							series: [{
								name: '正确率',
								data: this.correctRate,
								color: '#00b3d2'
							}]
						}
						
						this.showArcbar("canvasArcbar1", char_data);
						
					}else{
						uni.showToast({
							title:res.msg,
							icon:'none'
						})
					}
				}).catch(error=>{
					console.log(error)
				})
			},
		},
		onShareAppMessage:function(){
			
		},
		onShareTimeline:function(){
			
		},
		onAddToFavorites:function(){
			
		},
	}
</script>

<style>
	.prompt-bg{
		width: 100%;
		height: 100%;
		background-color: #FFFFFF;
	}
	.prompt-title{
		width: 100%;
		text-align: center;
		font-size: 38rpx;
		margin-top: 10%;
	}
	
	.home-picture {
		margin-top: 10%;
		text-align: center;
		background-color: #FFFFFF;
	}

	.charts3 {
		width: 600rpx;
		height: 300rpx;
		margin: 0 auto;
	}

	.charts3 image {
		width: 200rpx;
		height: 200rpx;
		border-radius: 200rpx;
		top: 50rpx;
	}

	.profile-detail {
		background-color: #FFFFFF;

	}

	.profile-detail-relative {
		position: relative;
		border-bottom: 1rpx solid #EEEEEE;
	}

	.profile-detail-basic {}

	.profile-edit-button {
		position: absolute;
		width: 120rpx;
		height: 80rpx;
		line-height: 80rpx;
		right: 0;
		top: 0;
		bottom: 0;
		margin: auto;

	}
	
	.prompt-button{
		width: 80%;
		margin: 0 auto;
		margin-top: 10%;
	}
	.prompt-button-1 button{
		background-color: #0AA0A8;
		height: 100rpx;
		line-height: 100rpx;
		border-radius: 100rpx;
		color: #FFFFFF;
	}
	.prompt-button-2{
		margin-top: 20rpx;
	}
	.prompt-button-2 button{
		background-color: #004956;
		height: 100rpx;
		line-height: 100rpx;
		border-radius: 100rpx;
		color: #FFFFFF;
	}
</style>
