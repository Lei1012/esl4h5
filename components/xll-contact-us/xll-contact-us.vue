<template>
	<view v-if="status">
		<view class="contact-us-bg" v-if="list.length>0" @click="closeContact"></view>
		<view class="contact-us" v-if="list.length>0">
			<view class="contact-us-title">
				<view class="contact-us-title-text-1">Until we open in-app chats, please contact us directly for this feature.</view>
				<view class="contact-us-title-text-2">在开启站内聊天功能之前，<br> 请直接联系我们。</view>
			</view>
			<!-- #ifdef H5 -->
			<view class="contact-image">
				<view class="contact-jl animate__animated  animate__flash">
					<image class="contact-jl-img" src="@/static/esl/jiantou-r.png" mode="aspectFill"></image>
				</view>
				<view class="contact-qrcode">
					<image class="contact-qrcode-img" :src="list[0].url" mode="aspectFit"></image>
				</view>
				<view class="contact-jr animate__animated  animate__flash">
					<image class="contact-jr-img" src="@/static/esl/jiantou-l.png" mode="aspectFill"></image>
				</view>
			</view>
			<!-- #endif -->
			
			<!-- #ifdef MP-WEIXIN -->
			<button class="contact-button" type="default" open-type="contact" show-message-card="true" :send-message-img="list[0].url">
				Contact Us
			</button>
			<!-- #endif -->
			

		</view>
	</view>
</template>

<script>
	import ads from '@/api/ads.js';
	export default {
		name: 'contactus',
		props: {
			showContact: {
				type: Boolean,
				default: false
			},

		},
		data() {
			return {
				status: this.showContact,
				list: []
			}
		},
		computed: {

		},
		watch: {
			showContact(val) {
				this.status = val;
			}
		},
		methods: {
			closeContact() {
				var that = this;
				that.$emit('close');
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
			}

		},
		mounted() {
			this.getAds();
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
		/* #ifdef H5 */
		height: 660rpx;
		/* #endif */
		/* #ifdef MP-WEIXIN */
		height: 500rpx;
		/* #endif */
		
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
	}

	.contact-us-title-text-1 {
		font-size: 34rpx;
		font-weight: 700;
	}

	.contact-us-title-text-2 {
		font-size: 34rpx;
		word-wrap: break-word;

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

	.contact-button {
		width: 80%;
		height: 80rpx;
		background-color: #0AA0A8 !important;
		color: #FFFFFF !important;
		line-height: 80rpx;
		margin-top: 40rpx;
	}
	
</style>
