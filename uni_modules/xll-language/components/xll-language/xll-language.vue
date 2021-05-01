<template>
	<view>
		<view class="language-popup-bg" v-if="languagePopup" @click="closeLanguagePopup()"></view>
		<view class="language-popup" v-if="languagePopup">
			<view class="language-text">{{i18n.accountchangelanguage}}</view>
			<view class="language-options">
				<view class="language-option" :class="languageOptionValue==1 ? 'language-option-active' : ''"
					@click="changeLanguageValue(1)">
					<view class="language-option-logo">
						<image src="/static/china-flag.png" mode="widthFix"></image>
					</view>
					<view class="language-option-text"><text>Chinese/简体中文</text></view>
				</view>
				<view class="language-option" :class="languageOptionValue==2 ? 'language-option-active' : ''"
					@click="changeLanguageValue(2)">
					<view class="language-option-logo">
						<image src="/static/america-flag.png" mode="widthFix"></image>
					</view>
					<view class="language-option-text"><text>English</text></view>
				</view>
			</view>
			<view class="language-confirm">
				<button @click="changeLanguage">{{i18n.confirm}}</button>
			</view>
		</view>
	</view>
</template>
<script>
	import login from '@/api/login.js';
	export default {
		name: 'xllLanguage',
		props: {
			show: {
				type: Boolean,
				default: false
			},

		},
		data() {
			return {
				languageOptionValue: 1

			};
		},
		watch: {

		},
		computed: {
			i18n() {
				return this.$t('index')
			},
			languagePopup() {
				return this.show;
			}
		},
		mounted() {
			let language = uni.getStorageSync('language');
			if(language==='zh-CN'){this.languageOptionValue=1}
			if(language==='en-US'){this.languageOptionValue=2}
		},
		methods: {
			closeLanguagePopup() {
				this.$emit('close')
			},
			changeLanguageValue: function(e) {
				this.languageOptionValue = e;
			},
			changeLanguage: function() {
				var languageOptionValue = this.languageOptionValue;
				let token = uni.getStorageSync('token');
				let identity = uni.getStorageSync('identity');

				if (languageOptionValue == 1) {
					uni.setStorageSync("language", 'zh-CN')
					this._i18n.locale = 'zh-CN';
					if (token) {
						this.changeLanguageApi(1);
					}

				}
				if (languageOptionValue == 2) {
					uni.setStorageSync("language", 'en-US')
					this._i18n.locale = 'en-US';
					if (token) {
						this.changeLanguageApi(2);
					}

				}
				this.$emit('close');
				uni.setTabBarItem({
					index: 0,
					text: this.i18n.tabbarhome
				})
				// #ifdef H5
				uni.setTabBarItem({
					index: 1,
					text: this.i18n.tabbarjobs
				})
				// #endif

				// #ifdef MP-WEIXIN
				if (token && identity) {
					uni.setTabBarItem({
						index: 1,
						text: this.i18n.tabbarjobs
					})
				} else {
					uni.setTabBarItem({
						index: 1,
						text: this.i18n.tabbarevents
					})
				}
				// #endif

				uni.setTabBarItem({
					index: 2,
					text: this.i18n.tabbardeals
				})
				uni.setTabBarItem({
					index: 3,
					text: this.i18n.tabbarme
				})
			},
			changeLanguageApi: function(language) {
				var that = this;
				let data = {
					language: language,
					unionid: uni.getStorageSync('unionid'),
					token: uni.getStorageSync('token')
				}
				login.changeLanguageAndIdentity(data).then(res => {
					if (res.code == 200) {
						// uni.showToast({
						// 	title: that.i18n.languageSwitchSuccess,
						// 	icon: 'success'
						// })
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
					}

				}).catch(err => {
					uni.showToast({
						title: err.msg,
						icon: 'none'
					})
				})
			},

		}

	}
</script>
<style>
	.language-popup-bg {
		width: 100%;
		height: 100%;
		position: fixed;
		z-index: 1000;
		top: 0;
		background-color: rgba(0, 0, 0, 0.4)
	}

	.language-popup {
		width: 90%;
		height: 600rpx;
		position: fixed;
		z-index: 1100;
		top: 0;
		right: 0;
		left: 0;
		bottom: 0;
		margin: auto;
		background-color: #FFFFFF;
		border-radius: 40rpx;
	}

	.language-text {
		height: 120rpx;
		line-height: 120rpx;
		font-size: 40rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight: 700;
	}

	.language-options {
		width: 90%;
		margin: 0 auto;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		flex-wrap: wrap;
	}

	.language-option {
		width: 48%;
		height: 320rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

		border-radius: 40rpx;
		border: 1px solid #EEEEEE;

	}

	.language-option-logo {
		width: 160rpx;
		height: 160rpx;
	}

	.language-option-logo image {
		width: 160rpx;
		height: 160rpx;
		border-radius: 160rpx;
	}

	.language-option-text {
		font-size: 28rpx;
		font-weight: 700;
		margin-top: 10rpx;
	}

	.language-confirm {
		width: 90%;
		margin: 50rpx auto 0;
	}

	.language-confirm button {
		border-radius: 20rpx;
		background-color: #0AA0A8;
		color: #FFFFFF;
		font-weight: 700;
		font-size: 30rpx;
		line-height: 80rpx;
	}

	.language-option-active {
		background-color: #0AA0A8;
		color: #FFFFFF;
	}
</style>
