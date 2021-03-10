<template>
	<view v-if="show">
		<view class="contact-us-bg" ></view>
		<view class="contact-us" >
			<view class="contact-us-title">
				<text class="contact-us-title-text-1">{{i18n.firstloginprompt}}</text>
			</view>
			<view class="contact-image">
				<view class="contact-jl animate__animated  animate__flash">
					<image class="contact-jl-img" src="@/static/esl/jiantou-r.png" mode="aspectFill"></image>
				</view>
				<view class="contact-qrcode">
					<image class="contact-qrcode-img" src="@/static/qrcode/wx-qrcode.png" mode="aspectFit"></image>
				</view>
				<view class="contact-jr animate__animated  animate__flash">
					<image class="contact-jr-img" src="@/static/esl/jiantou-l.png" mode="aspectFill"></image>
				</view>
			</view>

		</view>
	</view>
</template>

<script>
	import ads from '@/api/ads.js';
	export default {
		name: 'contactus',
		props: {
			show: {
				type: Boolean,
				default: false
			},

		},
		data() {
			return {
				
			}
		},
		computed: {
			i18n() {
				return this.$t('index')
			}
		},
		watch: {
			
		},
		methods: {
			close() {
				var that =this;
				that.$emit('close');
				
			}
		}
	}
</script>

<style>
	.contact-us-bg {
		background-color: rgba(0, 0, 0, 0.5);
		width: 100%;
		height: 100%;
		position: fixed;
		z-index: 1000;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		margin: auto;
	}

	.contact-us {
		width: 620rpx;
		height: 620rpx;
		position: fixed;
		z-index: 1100;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		margin: auto;
		padding: 20rpx 30rpx;
		background-color: #FFFFFF;
		border-radius: 20rpx;
	}

	.contact-us-title {
		text-align: center;
		padding: 20rpx 30rpx;
	}
	
	.contact-us-title-text-1{
		font-size: 34rpx;
		font-weight: 700;
	}

	.contact-image {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		padding-top: 40rpx;
	}

	.contact-jl {
		width: 25%;
		text-align: right;
	}

	.contact-jl-img {
		width: 80rpx;
		height: 80rpx;
	}

	.contact-jr {
		width: 25%;
		text-align: left;
	}

	.contact-jr-img {
		width: 80rpx;
		height: 80rpx;
	}

	.contact-qrcode {
		width: 50%;
		text-align: center;
	}

	.contact-qrcode-img {
		width: 280rpx;
		height: 280rpx;
		border-radius: 20rpx;

	}
</style>
