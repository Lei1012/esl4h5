<template>
	<view class="pay">
		<view class="pay-img"><image src="https://i.loli.net/2021/02/08/SAj4GndvFtQe9Py.png" mode="aspectFill"></image></view>
		<view class="pay-txt">Payment failed</view>
		<button type="default" @click="back">Back</button>
	</view>
	
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			back(){
				uni.navigateBack({
					delta:1
				})
			}
		}
	}
</script>

<style>
	page{
		background-color: #FFFFFF;
	}
	.pay{
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.pay-img{
		text-align: center;
	}
	.pay-img image{
		width: 100rpx;
		height: 100rpx;
	}
	.pay-txt{
		font-size: 32rpx;
		font-weight: 700;
		margin-top: 40rpx;
	}
	.pay button{
		margin-top: 40rpx;
		background-color: #00B3D2;
		color: #FFFFFF;
		font-size: 30rpx;
	}
</style>
