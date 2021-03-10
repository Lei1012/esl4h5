<template>
	<view>
		<view class="find-more-bar" @click="showMoreContainer">Our App</view>
		<view class="find-more-bg" v-if="showMoreStatus">
			<view class="close-btn" @click="close">×</view>
			<view class="find-more-contanier">
				<view class="find-more-text">
					<text>Currently, our platform lives in our Official Account.  In early 2021 you can use our mini-program! <br> <br> 现在app只能通过微信公众号的入口打开，但2021年初我们的小程序就上线了！</text>
				</view>
				<view class="wx-account">
					<image src="@/static/qrcode/wx-qrcode.png" mode="aspectFill"></image>
				</view>
				<view class="now-turn-button" @click="jumpNow">I Already Follow <br> 我已经关注了</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				showMoreStatus: false
			};
		},
		methods: {
			showMoreContainer() {
				this.showMoreStatus = true;
			},
			close() {
				this.showMoreStatus = false;
			},
			jumpNow() {
				var url = window.location.href;
				var origin = window.location.origin;
				console.log(origin)
				let turn_url = origin + '/esl_h5/pages/home/index'
				window.location.href = turn_url;
			}
		}
	}
</script>

<style>
	.find-more-bar {
		position: fixed;
		z-index: 1000;
		right: 0;
		top: 50%;
		writing-mode: vertical-lr;
		word-wrap: break-word;
		background-image: linear-gradient( 135deg, #79F1A4 10%, #0E5CAD 100%);
		color: #FFFFFF;
		padding-top: 20rpx;
		padding-bottom: 20rpx;
		padding-right: 4rpx;
		padding-left: 4rpx;
		font-size: 34rpx;
		border-top-left-radius: 10rpx;
		border-bottom-left-radius: 10rpx;

	}

	.find-more-bg {
		position: fixed;
		z-index: 1100;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		margin: auto;
		width: 100%;
		height: 100%;
		background-image: linear-gradient(135deg, #92FFC0 10%, #002661 100%);
		display: flex;
		align-items: center;
	}

	.find-more-contanier {
		width: 90%;
		margin: 0 auto;
	}

	.find-more-text {
		color: #FFFFFF;
		font-size: 34rpx;
		font-weight: 700;
		padding-bottom: 20rpx;
		text-align: center;
	}

	.wx-account {
		width: 300rpx;
		height: 300rpx;
		margin: 0 auto;
		background-color: #FFFFFF;
		border-radius: 10rpx;
	}

	.wx-account image {
		width: 100%;
		height: 100%;
		border-radius: 10rpx;
	}

	.now-turn-button {
		background-image: linear-gradient(135deg, #2AFADF 10%, #4C83FF 100%);
		color: #FFFFFF;
		font-size: 34rpx;
		text-align: center;
		width: 60%;
		margin: 40rpx auto;
		border-radius: 10rpx;
	}

	.close-btn {
		position: fixed;
		z-index: 1200;
		top: 40rpx;
		right: 20rpx;
		width: 80rpx;
		height: 80rpx;
		line-height: 80rpx;
		text-align: center;
		font-size: 24px;
		color: #FFFFFF;
	}
</style>
