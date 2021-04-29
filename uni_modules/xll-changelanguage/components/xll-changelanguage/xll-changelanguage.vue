<template>
	<view class="language-container">
		<view class="lan-en">English</view>
		<view class="lan-switch">
			<switch color="#0AA0A8" :checked="language=='zh-CN'" style="transform: scale(0.7);"  @change="changeLang" />
		</view>
		<view class="lan-cn">
			中文/CN
		</view>
	</view>
</template>
<script>
	import login from '@/api/login.js';
	import profile from '@/api/profile.js';
	export default {
		data() {
			return {
				language: 'en-US',
				languageValue: 2,
			};
		},
		computed: {
			i18n() {
				return this.$t('index')
			}
		},
		props: {
			rolePopupStatus: {
				type: Boolean,
				default: false
			},
			selectRoleIdentity: {
				type: Number,
				default: 0
			}
	
	
		},
		mounted() {
			var that = this;
	
		},
		methods: {
			closePopup() {
				var that = this
				that.$emit('close')
				that.language = uni.getStorageSync('language');
			},
			changeLang: function(e) {
				var _this = this;
				let token = uni.getStorageSync('token');
				let identity = uni.getStorageSync('identity');
				
				if (e.target.value) {
					// uni.setStorageSync("language", 'zh-CN')
					_this.language = 'zh-CN';
					_this.languageValue = 1;
					_this._i18n.locale = 'zh-CN';
					if(token){
						_this.changeLanguageApi(1);
					}
					
				} else {
					// uni.setStorageSync("language", 'en-US')
					_this.language = 'en-US';
					_this.languageValue = 2;
					_this._i18n.locale = 'en-US';
					if(token){
						_this.changeLanguageApi(2);
					}
					
				}
	
				uni.setTabBarItem({
					index: 0,
					text: _this.i18n.tabbarhome
				})
				// #ifdef H5
				uni.setTabBarItem({
					index: 1,
					text: _this.i18n.tabbarjobs
				})
				// #endif
				// #ifdef MP-WEIXIN
				if (token && identity) {
					uni.setTabBarItem({
						index: 1,
						text: _this.i18n.tabbarjobs
					})
				} else {
					uni.setTabBarItem({
						index: 1,
						text: _this.i18n.tabbarevents
					})
				}
				// #endif
	
				uni.setTabBarItem({
					index: 2,
					text: _this.i18n.tabbardeals
				})
				uni.setTabBarItem({
					index: 3,
					text: _this.i18n.tabbarme
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
						if (language == 1) {
							uni.setStorageSync('language', 'zh-CN')
						}
						if (language == 2) {
							uni.setStorageSync('language', 'en-US')
						}
	
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
			changeIdentityApi: function(identity) {
				let data = {
					identity: identity,
					unionid: uni.getStorageSync('unionid'),
					token: uni.getStorageSync('token')
				}
				login.changeLanguageAndIdentity(data).then(res => {
					if (res.code == 200) {
						uni.$emit('changeIdentity', identity)
						this.identity = identity;
						uni.setStorageSync('identity', identity)
	
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
	
	.language-container {
		width: 99%;
		margin: 20rpx auto 0;
		
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
		align-items: center;
	}
	
	.lan-en {
		width: 30%;
		font-size: 30rpx;
		text-align: right;
	}
	
	.lan-switch {
		width: 30%;
		text-align: center;
	}
	
	.lan-cn {
		width: 30%;
		font-size: 30rpx;
		text-align: left;
	}
	
</style>
