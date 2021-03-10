<template>
	<view v-if="status">
		<view class="contact-us-bg" @click="closeQrcode"></view>
		<view class="contact-us">
			<!-- #ifdef H5 -->
			<image class="contact-us-img" v-if="codeType==1" src="https://i.loli.net/2021/02/02/licyr3IF4qnYs8M.png" mode="aspectFill"></image>
			<image class="contact-us-img" v-if="codeType==2" src="https://i.loli.net/2021/02/02/MAc7oCJVEHNryU9.png" mode="aspectFill"></image>
			<image class="contact-us-img" v-if="codeType==3" src="https://i.loli.net/2021/02/02/ngjEOr1iSYsVv7b.png" mode="aspectFill"></image>
			<image class="contact-us-img" v-if="codeType==4" src="https://i.loli.net/2021/02/02/ahoeFzJPZbqg28X.png" mode="aspectFill"></image>
			<image class="contact-us-img" v-if="codeType==5" src="https://i.loli.net/2021/02/02/4aHOIc82CNfTXqA.png" mode="aspectFill"></image>
			<!-- #endif -->
			<!-- #ifdef MP-WEIXIN -->
			<button v-if="codeType==1" type="default" class="contact-button" open-type="contact" show-message-card="true"
			 send-message-img="https://i.loli.net/2021/02/02/licyr3IF4qnYs8M.png">
				<image class="contact-us-img" src="https://i.loli.net/2021/02/02/licyr3IF4qnYs8M.png" mode="aspectFill"></image>
			</button>
			<button v-if="codeType==2" type="default" class="contact-button" open-type="contact" show-message-card="true"
			 send-message-img="https://i.loli.net/2021/02/02/MAc7oCJVEHNryU9.png">
				<image class="contact-us-img" src="https://i.loli.net/2021/02/02/MAc7oCJVEHNryU9.png" mode="aspectFill"></image>
			</button>
			<button v-if="codeType==3" type="default" class="contact-button" open-type="contact" show-message-card="true"
			 send-message-img="https://i.loli.net/2021/02/02/ngjEOr1iSYsVv7b.png">
				<image class="contact-us-img" src="https://i.loli.net/2021/02/02/ngjEOr1iSYsVv7b.png" mode="aspectFill"></image>
			</button>
			<button v-if="codeType==4" type="default" class="contact-button" open-type="contact" show-message-card="true"
			 send-message-img="https://i.loli.net/2021/02/02/ahoeFzJPZbqg28X.png">
				<image class="contact-us-img" src="https://i.loli.net/2021/02/02/ahoeFzJPZbqg28X.png" mode="aspectFill"></image>
			</button>
			<button v-if="codeType==5" type="default" class="contact-button" open-type="contact" show-message-card="true"
			 send-message-img="https://i.loli.net/2021/02/02/4aHOIc82CNfTXqA.png">
				<image class="contact-us-img" src="https://i.loli.net/2021/02/02/4aHOIc82CNfTXqA.png" mode="aspectFill"></image>
			</button>
			<!-- #endif -->
		</view>
	</view>
</template>

<script>
	export default {
		name: 'qrcode',
		props: {
			showQrcode: {
				type: Boolean,
				default: false
			},
			codeType: {
				type: Number,
				default: 1
			}
		},
		data() {
			return {
				status: this.showQrcode,
				list: []
			}
		},
		computed: {

		},
		watch: {
			showQrcode(val) {
				this.status = val;
			}
		},
		methods: {
			closeQrcode() {
				var that = this;
				that.$emit('close');
			},


		},
		mounted() {

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
		width: 500rpx;
		height: 500rpx;
		position: fixed;
		z-index: 1100;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		margin: auto;

	}

	.contact-us-img {
		width: 100%;
		height: 100%;
		border-radius: 20rpx;
	}

	.contact-button {
		padding: 0;
		margin: 0;
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: #FFFFFF;
	}

	.contact-button::after {
		border: none;
	}
</style>
