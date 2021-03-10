<template>
	<view class="uni-flex uni-column welcome-bg">
		<view class="flex-item welcome-logo  animate__animated  animate__rotateIn">
			<image src="/static/esl-logo.png" lazy-load="true"></image>
		</view>
		<view class="flex-item welcome-intro animate__animated  animate__rubberBand ">
			<text v-if="identity==1">{{i18n.welcomepagetxtone}} {{firstname}}! {{i18n.welcomepagetxttwo}}</text>
			<text v-if="identity==2">{{i18n.welcomebusinesspagetxtone}} {{firstname}}! {{i18n.welcomebusinesspagetxttwo}}</text>
			<text v-if="identity==3">{{i18n.welcomevendorpagetxtone}} {{firstname}}! {{i18n.welcomevendorpagetxttwo}}</text>
		</view>
		<view class="flex-item welcome-button">
			<button type="default" @click="createMyProfile">
				{{i18n.welcomepgbutton1}}
			</button>
		</view>
		<view class="flex-item later-button">
			<button type="default" @click="laterCreateMyProfile">
				{{i18n.welcomepgbutton2}}
			</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				firstname: '',
				identity: 1
			}
		},
		computed: {
			i18n() {
				return this.$t('index')
			}
		},
		onLoad(option) {
			this.identity = uni.getStorageSync('identity')
			this.firstname = option.firstname
		},
		methods: {
			createMyProfile: function() {
				let identity = uni.getStorageSync('identity')

				if (identity == 1) {
					uni.reLaunch({
						url:'educator/edit/basic?firstEdit=1'
					})
				}
				if (identity == 2) {
					uni.reLaunch({
						url: 'business/edit/basic?firstEdit=1'
					})
				}
				if (identity == 3) {
					uni.reLaunch({
						url: 'vendor/edit/basic?firstEdit=1'
					})
				}

			},
			laterCreateMyProfile: function() {
				// console.log('12')
				uni.reLaunch({
					url: '/pages/home/index'
				})

			}
		}
	}
</script>

<style>
	.welcome-bg {
		width: 100%;
		height: 100%;
		background-color: #F4F5F6;
	}

	.welcome-logo {
		width: 100%;
		text-align: center;
		margin-top: 10%;
	}

	.welcome-logo image {
		width: 200rpx;
		height: 200rpx;
		border-radius: 200rpx;
	}

	.welcome-intro {
		width: 90%;
		margin: 0 auto;
		text-align: center;
		color: #000000;
		font-size: 32rpx;
		font-weight: 600;
		margin-top: 10%;

	}

	.welcome-arrow {
		margin: 0 auto;
		margin-top: 10%;
	}

	.welcome-arrow image {
		width: 100rpx;
		height: 100rpx;
		/* max-width: 100%; */
		/* width: 80rpx; */
		/* max-height: 100%; */
	}

	.welcome-button {
		width: 80%;
		margin: 0 auto;
		margin-top: 10%;
	}

	.welcome-button button {
		height: 100rpx;
		background-color: #0AA0A8;
		border-radius: 100rpx;
		line-height: 100rpx;
		color: #FFFFFF;
	}

	.later-button {
		width: 80%;
		margin: 0 auto;
		margin-top: 10%;
	}

	.later-button button {
		height: 100rpx;
		background-color: #E0E0E0;
		border-radius: 100rpx;
		line-height: 100rpx;
		color: #808080;
	}
</style>
