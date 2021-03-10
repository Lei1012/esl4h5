<template>
	<view class="uni-flex uni-column member-bg">
		<view class="flex-item member-title">
			<text>Please choose your
				subscription plan</text>
		</view>
		<view class="flex-item member-basic" @click="selectMember(1)">
			<view class="member-basic-1"><text>Basic Member</text></view>
			<view class="member-basic-2"><text>Always FREE</text></view>
			<view class="member-basic-3">
				<image src="../../static/esl/arrow-right-icon.png" mode="aspectFill"></image>
			</view>
		</view>
		<view class="flex-item member-pro" @click="selectMember(2)">
			<view class="member-pro-1"><text>PRO Member </text></view>
			<view class="member-pro-2"><text>￥1500/year</text></view>
			<view class="member-pro-3">
				<image src="../../static/esl/arrow-right-icon.png" mode="aspectFill"></image>
			</view>
		</view>
		<view class="flex-item member-benefits">
			<view class="member-benefits-1"><text>member benefits</text></view>
			<view class="member-benefits-2">
				<view class="member-benefits-2-item">
					<view class="member-benefits-2-item-circle">
						Unlimited Job Posts
					</view>
				</view>
				<view class="member-benefits-2-item">
					<view class="member-benefits-2-item-circle">
						Modeer Marketing
					</view>
				</view>
				<view class="member-benefits-2-item">
					<view class="member-benefits-2-item-circle">
						Consulting
					</view>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {


			}
		},
		components: {

		},
		computed: {
			i18n() {
				return this.$t('index')
			}
		},
		methods: {
			selectMember: function(type) {
				if (type == 1) {
					uni.reLaunch({
						url:'./welcome'
					})
				}
			}

		}
	}
</script>

<style>
	.member-bg {
		width: 100%;
		height: 100%;
		background-color: #F8F8F8;
	}

	.member-title {
		width: 80%;
		margin: 0 auto;
		text-align: center;
		font-size: 44rpx;
		font-weight: 700;
		margin-top: 10%;
	}

	.member-basic {
		width: 80%;
		height: 200rpx;
		margin: 0 auto;
		margin-top: 10%;
		text-align: center;
		background-color: #0AA0A8;
		border-radius: 40rpx;
		position: relative;
		box-sizing: border-box;
	}


	.member-basic-1 {
		height: 100rpx;
		line-height: 140rpx;
		font-size: 38rpx;
		color: #FFFFFF;
		font-weight: 600;
	}

	.member-basic-2 {
		height: 100rpx;
		line-height: 100rpx;
		font-size: 30rpx;
		color: #FFFFFF;
		font-weight: 600;
	}

	.member-basic-3 {
		position: absolute;
		right: 20rpx;
		top: 0;
		bottom: 0;
		width: 80rpx;
		height: 80rpx;
		margin: auto;
	}

	.member-basic-3 image {
		width: 100%;
		height: 100%;
	}

	.member-pro {
		width: 80%;
		height: 200rpx;
		margin: 0 auto;
		margin-top: 10%;
		text-align: center;
		background-color: #004956;
		border-radius: 40rpx;
		box-sizing: border-box;
		position: relative;
	}

	.member-pro-1 {
		height: 100rpx;
		line-height: 140rpx;
		font-size: 38rpx;
		color: #FFFFFF;
		font-weight: 600;
	}

	.member-pro-2 {
		height: 100rpx;
		line-height: 100rpx;
		font-size: 30rpx;
		color: #FFFFFF;
		font-weight: 600;
	}
	.member-pro-3 {
		position: absolute;
		right: 20rpx;
		top: 0;
		bottom: 0;
		width: 80rpx;
		height: 80rpx;
		margin: auto;
	}
	
	.member-pro-3 image {
		width: 100%;
		height: 100%;
	}
	

	.member-benefits {
		width: 90%;
		height: 400rpx;
		margin: 0 auto;
		margin-top: 10%;
		text-align: center;
		background-color: #004956;
		border-radius: 40rpx;
		box-sizing: border-box;
	}

	.member-benefits-1 {
		height: 100rpx;
		line-height: 100rpx;
		font-size: 38rpx;
		color: #FFFFFF;
		font-weight: 600;
	}

	.member-benefits-2 {

		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
	}

	.member-benefits-2-item {
		width: 30%;
		height: 100%;
	}

	.member-benefits-2-item-circle {
		width: 180rpx;
		height: 180rpx;
		border-radius: 180rpx;
		margin: 0 auto;
		background-color: #FFFFFF;
		font-size: 24rpx;
		padding: 40rpx;
		text-align: center;
	}
</style>
