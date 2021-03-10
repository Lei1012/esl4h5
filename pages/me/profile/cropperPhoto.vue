<template>
	<view class="uni-flex uni-column photo-bg">
		<view class="flex-item photo-title">
			<!-- educator -->
			<text v-if="type==1">Profile Photo</text>
			<text v-if="type==2">Header photo</text>
			<text v-if="type==3">Profile pics (6 max) </text>
			<!-- business -->
			<text v-if="type == 4">Profile Photo</text>
			<text v-if="type == 5">Business Logo</text>
			<text v-if="type == 6">Header Photo</text>
			<text v-if="type == 7">Profile pics(6 max)</text>
			<!-- vendor -->
			<text v-if="type == 8">Profile Photo</text>
			<text v-if="type == 9">Vendor Logo</text>
			<text v-if="type == 10">Header Photo</text>
			<text v-if="type == 11">Profile pics(6 max)</text>
			<text v-if="type == 12">WeChat Official Account QR Code </text>
		</view>
		<view class="flex-item photo-box">
			<view style="padding: 30rpx;">
				
			</view>
		</view>
	
		<view class="flex-item photo-submit">
			<button @click="uploadFile">Upload</button>
		</view>
	
	</view>
</template>

<script>
	import profile from '@/api/profile.js';
	
	export default {
		data() {
			return {
				type:undefined
			}
		},
		onLoad(option) {
			var that = this;
			that.type = option.type;
		},
		methods: {
			
		}
	}
</script>

<style>
.photo-bg {
		width: 100%;
		height: 100%;
		background-color: #F4F5F6;

	}

	.photo-title {
		text-align: center;
		font-size: 36rpx;
		font-weight: 600;
		background-color: #004956;
		color: #FFFFFF;
		height: 200rpx;

		line-height: 200rpx;
	}

	.photo-box {
		width: 96%;
		margin: 0 auto;
		background-color: #FFFFFF;
		margin-top: 10%;
		border-radius: 20rpx;
	}

	.photo-submit {
		width: 80%;
		margin: 0 auto;
		margin-top: 10%;
		padding-bottom: 100rpx;

	}

	.photo-submit button {
		background-color: #004956;
		color: #FFFFFF;
		height: 80rpx;
		border-radius: 80rpx;
		line-height: 80rpx;
	}
</style>
