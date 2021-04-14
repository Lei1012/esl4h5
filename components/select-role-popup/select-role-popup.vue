<template>
	<view>
		<!-- 角色选择弹框 -->
		<view class="role-popup-bg" v-if="rolePopupStatus" @click="closePopup"></view>
		<view class="role-popup" v-if="rolePopupStatus">
			<view class="language-change">
				<view class="language-en">English</view>
				<view class="language-switch">
					<switch color="#0AA0A8" :checked="language=='zh-CN'" @change="changeLang" />
				</view>
				<view class="language-cn">
					中文/CN
				</view>
			</view>
			<view class="role-intro">
				{{i18n.roleIntrotop}} <br>
				{{i18n.roleIntrobottom}}
			</view>
			<view class="role-roles">
				<view class="role-item" :class="selectRoleIdentity==1 ? 'role-item-actived' : '' "
					@click="selectRole(1)">
					{{i18n.educatorbutton}}
					<image class="animate__animated animate__flash" v-if="selectRoleIdentity==1"
						src="@/static/esl/click-w-icon.png" mode="aspectFill"></image>
				</view>
				<view class="role-item" :class="selectRoleIdentity==2 ? 'role-item-actived' : '' "
					@click="selectRole(2)">
					{{i18n.businessbutton}}
					<image class="animate__animated animate__flash" v-if="selectRoleIdentity==2"
						src="@/static/esl/click-w-icon.png" mode="aspectFill"></image>
				</view>
				<view class="role-item" :class="selectRoleIdentity==3 ? 'role-item-actived' : '' "
					@click="selectRole(3)">
					{{i18n.vendorbutton}}
					<image class="animate__animated animate__flash" v-if="selectRoleIdentity==3"
						src="@/static/esl/click-w-icon.png" mode="aspectFill"></image>
				</view>

			</view>
		</view>
		<!-- 角色选择弹框 end -->
	</view>
</template>

<script>
	import login from '@/api/login.js';
	import profile from '@/api/profile.js';
	export default {
		data() {
			return {
				selectRoleValue: 0, //选择的角色值
				language: '',
				languageValue: 2,

				is_educator: 0,
				is_business: 0,
				is_vendor: 0,
				is_other: 0,
				identity: 0, //当前身份、
				mobile: '', // 用户手机号

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
			selectRole: function(e) {
				var that = this;

				that.$emit('close')

				let mobile = uni.getStorageSync('phone');
				let token = uni.getStorageSync('token');
				let uid = uni.getStorageSync('uid');

				// #ifdef MP-WEIXIN
				if (token == '' || !token) {
					var pages = getCurrentPages(); // 当前页面
					var currentPagePath = pages[pages.length - 1]; // 前一个页面

					if (currentPagePath.route == 'pages/login/index') {
						return;
					}
					return uni.navigateTo({
						url: '/pages/login/index?redirect=' + currentPagePath.route
					})
				}
				// #endif
				
				if (!token || token == '') {
					uni.navigateTo({
						url: '/pages/login/index'
					})
				} else {
					let data = {
						token: token,
						id: uid
					}

					profile.getBasicInfo(data).then(res => {
						// console.log(res)
						if (res.code == 200) {
							uni.setStorageSync('unionid', res.message.unionid)
							uni.setStorageSync('phone', res.message.phone)
							uni.setStorageSync('nickname', res.message.nickname)
							uni.setStorageSync('uid', res.message.id)
							// uni.setStorageSync('identity', res.message.identity)
							that.is_educator = res.message.is_educator;
							that.is_business = res.message.is_business;
							that.is_vendor = res.message.is_vendor;
							that.is_other = res.message.is_other;
							that.identity = res.message.identity;
							that.mobile = res.message.phone;

							if (e == 1) {
								if (that.is_educator >= 10) {
									this.changeIdentityApi(1)
								} else {
									uni.navigateTo({
										url: '/pages/role/educator?roleValue=' + e + '&language=' +
											that.languageValue
									})
								}

							}
							if (e == 2) {
								if (that.is_business >= 10) {
									this.changeIdentityApi(2)
								} else {
									uni.navigateTo({
										url: '/pages/role/business?roleValue=' + e + '&language=' +
											that.languageValue
									})
								}

							}
							if (e == 3) {
								if (that.is_vendor >= 10) {
									this.changeIdentityApi(3)
								} else {
									uni.navigateTo({
										url: '/pages/role/vendor?roleValue=' + e + '&language=' +
											that.languageValue
									})
								}

							}


						} else {
							uni.showToast({
								title: res.msg,
								icon: 'none'
							})
						}

					}).catch(error => {
						console.log(error)
					})

				}

			},
			changeLang: function(e) {
				var _this = this;
				if (e.target.value) {
					// uni.setStorageSync("language", 'zh-CN')
					_this.language = 'zh-CN';
					_this.languageValue = 1;
					_this._i18n.locale = 'zh-CN';
					_this.changeLanguageApi(1);
				} else {
					// uni.setStorageSync("language", 'en-US')
					_this.language = 'en-US';
					_this.languageValue = 2;
					_this._i18n.locale = 'en-US';
					_this.changeLanguageApi(2);
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
				let token = uni.getStorageSync('token');
				let identity = uni.getStorageSync('identity');
				if (token != '' && identity && identity != 0) {
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
	@import url("@/common/home/role-popup.css");
</style>
