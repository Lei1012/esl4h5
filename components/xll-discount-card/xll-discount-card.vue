<template>
	<view v-if="status">
		<view class="contact-us-bg" @click="closeContact"></view>
		<view class="contact-us">
			<image class="contact-us-img" :src="list[0].url" mode="aspectFit"></image>
		</view>
	</view>
</template>

<script>
	import ads from '@/api/ads.js';
	export default {
		name: 'discountcard',
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
					cate: 7
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
			// console.log('discount -- ')
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
		width: 546rpx;
		height: 363rpx;
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
		border-radius: 40rpx;
	}
</style>
