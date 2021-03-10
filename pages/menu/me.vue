<template>
	<view class="uni-flex uni-column me-bg">
		<view class="flex-item me-header-info u-skeleton">
			<view class="me-header-info-l u-skeleton-circle">
				<image @click="turnMyProfile" :src="avatarUrl" mode="aspectFill" lazy-load></image>
			</view>
			<view class="me-header-info-r ">
				<view class="me-header-info-r-1 u-skeleton-rect">
					<text>{{nickname}}</text>
				</view>
				<view class="me-header-info-r-2 u-skeleton-rect">
					<image src="../../static/esl/location.png" mode="aspectFit"></image>
					<text>{{location}}</text>
				</view>
				<view class="me-header-info-r-3 u-skeleton-rect">
					<text v-if="identity==1">{{i18n.meeducator}}</text>
					<text v-if="identity==2">{{i18n.mebusiness}}</text>
					<text v-if="identity==3">{{i18n.mevendor}}</text>
					<text v-if="identity==0 || identity==4">{{i18n.meguest}}</text>
				</view>
				<view class="me-header-info-r-4 u-skeleton-rect">
					<text v-if="identity==1 && educatorLevel==1">{{i18n.mebasiclevel}}</text>
					<text v-if="identity==1 && educatorLevel==2">{{i18n.meprolevel}}</text>
					<text v-if="identity==1 && educatorLevel==3">{{i18n.mepluslevel}}</text>
					<text v-if="identity==2 && businessLevel == 1">{{i18n.mebasiclevel}}</text>
					<text v-if="identity==2 && businessLevel == 2">{{i18n.meprolevel}}</text>
					<text v-if="identity==2 && businessLevel == 3">{{i18n.mepluslevel}}</text>
					<text v-if="identity==3 && vendorLevel == 1">{{i18n.mebasiclevel}}</text>
					<text v-if="identity==3 && vendorLevel == 2">{{i18n.meprolevel}}</text>
					<text v-if="identity==3 && vendorLevel == 3">{{i18n.mepluslevel}}</text>
					<view class="me-level-upgrade" @click="showContactStatus=true">{{i18n.meupgrade}}</view>
				</view>
			</view>
		</view>

		<view class="flex-item user-verified" v-if="identity == 3">
			<button @click="showContactStatus=true">{{i18n.Verified}}</button>
		</view>
		<view class="flex-item me-center-list ">
			<view class="center-list border-top-left-right-radius">
				<view class="center-list-item border-bottom " v-if="identity!=4 && identity!=0" @click="turnAccountInfo">
					<image src="../../static/me/my-account.png" mode="aspectFill"></image>
					<text class="list-text">{{i18n.accountpgaccountinfo}}</text>
				</view>
				<view class="center-list-item border-bottom" v-if="identity!=4 && identity!=0" @click="turnMyProfile">
					<image src="../../static/me/profile.png" mode="aspectFill"></image>
					<text class="list-text">{{i18n.accountpgeditprofile}}</text>
				</view>
				<view class="center-list-item border-bottom" @click="showDiscountStatus=true">
					<image src="../../static/me/discount.png" mode="aspectFill"></image>
					<text class="list-text">{{i18n.accountpgdiscount}}</text>
				</view>
				<discountcard @close="closeDiscount" :showContact="showDiscountStatus"></discountcard>
				<view class="center-list-item border-bottom" @click="showLanguagePopup">
					<image src="../../static/me/language-change.png" mode="aspectFill"></image>
					<text class="list-text">{{i18n.accountpglanguage}}</text>
				</view>
				<view class="center-list-item border-bottom" @click="showRolePopup">
					<image src="../../static/me/switch-identity.png" mode="aspectFill"></image>
					<text class="list-text">{{i18n.accountinfoadd}}</text>
				</view>
				<!-- #ifdef H5 -->
				<view class="center-list-item border-bottom" @click="showContactStatus=true">
					<image src="../../static/me/contact-icon.png" mode="aspectFill"></image>
					<text class="list-text">{{i18n.accountpgcontact}}</text>
				</view>
				<!-- #endif -->
				<!-- #ifdef MP-WEIXIN -->
				<button class="center-list-item-button border-bottom" type="default" open-type="contact" show-message-card="true">
					<image src="../../static/me/contact-icon.png" mode="aspectFill"></image>
					<text class="list-text">{{i18n.accountpgcontact}}</text>
				</button>
				<!-- #endif -->
				
				<contactus @close="closeContact" :showContact="showContactStatus"></contactus>

				<view class="center-list-item border-bottom" v-if="identity==2 || identity ==1" @click="turnMyJobs(identity)">
					<image src="../../static/me/jobs.png" mode="aspectFill"></image>
					<text class="list-text" v-if="identity==1">{{i18n.memyapplications}}</text>
					<text class="list-text" v-if="identity==2">{{i18n.accountpgmyjobs}}</text>
				</view>

				<view class="center-list-item border-bottom" v-if="identity==3" @click="turnMyDeals">
					<image src="../../static/me/deals.png" mode="aspectFill"></image>
					<text class="list-text">{{i18n.accountpgmydeals}}</text>
				</view>
				<view class="center-list-item border-bottom" v-if="identity==3" @click="turnMyEvents">
					<image src="../../static/me/events.png" mode="aspectFill"></image>
					<text class="list-text">{{i18n.accountpgmyevents}}</text>
				</view>
			</view>
		</view>

		<view class="flex-item xll-ads">
			<swiper class="xll-ads-swiper" :indicator-dots="false" :autoplay="true" :interval="4000" :duration="500">
				<swiper-item v-for="(item,index) in meAdsListBottom" :key="index">
					<view class="swiper-item">
						<image @click="showContactStatus=true" :src="item.url" mode="scaleToFit" lazy-load="true"></image>
					</view>
				</swiper-item>
			</swiper>
		</view>

		<!-- 语言选择框 -->
		<view class="language-popup-bg" v-if="languagePopup" @click="closeLanguagePopup"></view>
		<view class="language-popup" v-if="languagePopup">
			<view class="language-text">{{i18n.accountchangelanguage}}</view>
			<view class="language-options">
				<view class="language-option" :class="languageOptionValue==1 ? 'language-option-active' : ''" @click="changeLanguageValue(1)">
					<view class="language-option-logo">
						<image src="/static/china-flag.png"></image> <br>
						<text>Chinese/简体中文</text>
					</view>
				</view>
				<view class="language-option" :class="languageOptionValue==2 ? 'language-option-active' : ''" @click="changeLanguageValue(2)">
					<view class="language-option-logo">
						<image src="/static/america-flag.png"></image> <br>
						<text>English</text>
					</view>
				</view>
			</view>
			<view class="language-confirm">
				<button @click="changeLanguage">{{i18n.confirm}}</button>
			</view>
		</view>
		<!-- 语言选择end -->

		<!-- 角色选择弹框 -->
		<view class="role-popup-bg" v-if="rolePopupStatus" @click="rolePopupStatus=false"></view>
		<view class="role-popup" v-if="rolePopupStatus">
			<view class="language-change">
				<view class="language-en">English</view>
				<view class="language-switch">
					<switch color="#004956" :checked="language=='zh-CN'" @change="changeLang" />
				</view>
				<view class="language-cn">
					中文/CN
				</view>
			</view>
			<view class="role-intro">
				<text>
					{{i18n.roleIntrotop}} <br>
					{{i18n.roleIntrobottom}}
				</text>
			</view>
			<view class="role-roles">
				<view class="role-item" @click="selectRole(1)">{{i18n.educatorbutton}}</view>
				<view class="role-item" @click="selectRole(2)">{{i18n.businessbutton}}</view>
				<view class="role-item" @click="selectRole(3)">{{i18n.vendorbutton}}</view>
				<!-- <view class="role-item" @click="selectRole(4)">{{i18n.otherbutton}}</view> -->
			</view>
		</view>
		<!-- 角色选择弹框 end -->
	</view>
</template>

<script>
	import profile from '@/api/profile.js';
	import login from '@/api/login.js';
	import contactus from "@/components/xll-contact-us/xll-contact-us.vue";
	import discountcard from "@/components/xll-discount-card/xll-discount-card.vue";
	import ads from '@/api/ads.js';

	export default {
		data() {
			return {
				login: false,
				avatarUrl: "",
				nickname: "",
				location: "",
				jobTitle: "",
				uerInfo: {},
				languagePopup: false,
				languageOptionValue: 0,
				educatorInfo: '',
				businessInfo: '',
				vendorInfo: '',
				otherInfo: '',

				rolePopupStatus: false, // 角色选择弹框
				selectRoleValue: 0, //选择的角色值
				language: 'en-US',
				languageValue: 2,
				is_educator: 0,
				is_business: 0,
				is_vendor: 0,
				is_other: 0,
				identity: 0, //当前身份、
				mobile: '', // 用户手机号
				showContactStatus: false,
				showDiscountStatus: false,
				educatorLevel: 0,
				businessLevel: 0,
				vendorLevel: 0,
				meAdsListBottom: []
			}
		},
		components: {
			contactus,
			discountcard
		},
		computed: {
			i18n() {
				return this.$t('index')
			}
		},
		onShow() {
			this.getBasicInfo()
		},
		onLoad() {
			var that = this;
			that.identity = uni.getStorageSync('identity');

			uni.$on('changeIdentity', function(data) {
				that.identity = data;
			})
			this.getAdsList();
			
		},
		onUnload() {
			uni.$off('changeIdentity');
		},
		methods: {
			getAdsList() {
				let data = {
					page: 1,
					limit: 10,
					cate: 9
				}
				ads.list(data).then(res => {
					console.log(res)
					if (res.code == 200) {
						this.meAdsListBottom = res.message.data.filter(item => item.position == 3)

					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
					}
				}).catch(error => {
					console.log(error)
				})
			},
			closeContact(e) {
				// console.log(e)
				this.showContactStatus = false;
			},
			closeDiscount(e) {
				this.showDiscountStatus = false;
			},
			changeLanguageValue: function(e) {
				this.languageOptionValue = e;
			},
			showLanguagePopup: function() {
				this.languagePopup = true;
			},
			closeLanguagePopup: function() {
				this.languagePopup = false;
			},
			changeLanguage: function() {
				var languageOptionValue = this.languageOptionValue;
				if (languageOptionValue == 1) {
					this.languageChecked = true;
					uni.setStorageSync("language", 'zh-CN')
					this._i18n.locale = 'zh-CN';
					this.changeLanguageApi(1);
				}
				if (languageOptionValue == 2) {
					this.languageChecked = false;
					uni.setStorageSync("language", 'en-US')
					this._i18n.locale = 'en-US';
					this.changeLanguageApi(2);
				}
				this.languagePopup = false;
				uni.setTabBarItem({
					index: 0,
					text: this.i18n.tabbarhome
				})
				uni.setTabBarItem({
					index: 1,
					text: this.i18n.tabbarjobs
				})
				uni.setTabBarItem({
					index: 2,
					text: this.i18n.tabbardeals
				})
				uni.setTabBarItem({
					index: 3,
					text: this.i18n.tabbarme
				})
			},
			showRolePopup: function(e) {
				this.rolePopupStatus = true;
				this.language = uni.getStorageSync('language');
			},
			changeLang: function(e) {

				if (e.target.value) {
					uni.setStorageSync("language", 'zh-CN')
					this.language = 'zn-CN';
					this.languageValue = 1;
					this._i18n.locale = 'zh-CN';
					this.changeLanguageApi(1);
				} else {
					uni.setStorageSync("language", 'en-US')
					this.language = 'en-US';
					this.languageValue = 2;
					this._i18n.locale = 'en-US';
					this.changeLanguageApi(2);
				}

				uni.setTabBarItem({
					index: 0,
					text: this.i18n.tabbarhome
				})
				uni.setTabBarItem({
					index: 1,
					text: this.i18n.tabbarjobs
				})
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
			selectRole: function(e) {
				var that = this;
				that.rolePopupStatus = false;

				if (that.mobile == '') {
					uni.navigateTo({
						url: '/pages/role/wxBindMobile?roleValue=' + e + '&language=' + that.languageValue
					})
				} else {
					if (e == 1) {
						if (that.is_educator >= 10) {
							this.changeIdentityApi(1)
						} else {
							uni.navigateTo({
								url: '/pages/role/educator?roleValue=' + e + '&language=' + that.languageValue
							})
						}

					}
					if (e == 2) {
						if (that.is_business >= 10) {
							this.changeIdentityApi(2)
						} else {
							uni.navigateTo({
								url: '/pages/role/business?roleValue=' + e + '&language=' + that.languageValue
							})
						}

					}
					if (e == 3) {
						if (that.is_vendor >= 10) {
							this.changeIdentityApi(3)
						} else {
							uni.navigateTo({
								url: '/pages/role/vendor?roleValue=' + e + '&language=' + that.languageValue
							})
						}

					}
					if (e == 4) {
						this.changeIdentityApi(4)
					}

				}

			},
			changeIdentityApi: function(identity) {
				let data = {
					identity: identity,
					unionid: uni.getStorageSync('unionid'),
					token: uni.getStorageSync('token')
				}
				login.changeLanguageAndIdentity(data).then(res => {
					if (res.code == 200) {
						
						uni.$emit('changeIdentity', identity);
						this.identity = identity;
						uni.setStorageSync('identity', identity);

						this.getBasicInfo();
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
			getBasicInfo() {
				var that = this;
				let data = {
					id: uni.getStorageSync('uid'),
					token: uni.getStorageSync('token'),
					identity: that.identity
				}
				profile.getBasicInfo(data).then(res => {
					console.log(res)
					if (res.code == 200) {
						this.is_educator = res.message.is_educator;
						this.is_business = res.message.is_business;
						this.is_vendor = res.message.is_vendor;
						this.is_other = res.message.is_other;
						this.identity = res.message.identity;
						this.mobile = res.message.phone;

						let educatorInfo = res.message.educator_info;
						let businessInfo = res.message.business_info;
						let vendorInfo = res.message.vendor_info;
						let headimgurl = res.message.headimgurl;
						let nickname = res.message.nickname;
						let location = res.message.city + ', ' + res.message.province;

						that.avatarUrl = headimgurl;
						that.nickname = nickname;
						that.location = location;
						that.jobTitle = '';

						if (that.identity == 1) {
							if (educatorInfo != undefined) {
								let profilePhoto = res.message.educator_info.profile_photo;
								that.avatarUrl = profilePhoto;
								if (profilePhoto == '') {
									that.avatarUrl = headimgurl;
								}
								that.nickname = res.message.educator_info.first_name + ' ' + res.message.educator_info.last_name;
								that.location = res.message.educator_info.district + ', ' + res.message.educator_info.city;
								that.jobTitle = res.message.educator_info.nationality;
								this.educatorLevel = res.message.educator_info.level
							}
						}
						if (that.identity == 2) {
							if (businessInfo != undefined) {
								that.avatarUrl = res.message.business_info.profile_photo;
								that.nickname = res.message.business_info.first_name + ' ' + res.message.business_info.last_name;
								that.location = res.message.business_info.district + ', ' + res.message.business_info.city;
								that.jobTitle = res.message.business_info.business_name;
								if (that.avatarUrl == '') {
									that.avatarUrl = headimgurl;
								}
								this.businessLevel = res.message.business_info.level
							}
						}
						if (that.identity == 3) {
							if (vendorInfo != undefined) {
								that.avatarUrl = res.message.vendor_info.profile_photo;
								that.nickname = res.message.vendor_info.first_name + ' ' + res.message.vendor_info.last_name;
								that.location = res.message.vendor_info.district + ', ' + res.message.vendor_info.city;
								that.jobTitle = res.message.vendor_info.vendor_name;
								if (that.avatarUrl == '') {
									that.avatarUrl = headimgurl;
								}
								this.vendorLevel = res.message.vendor_info.level
							}

						}

					} else {
						uni.showToast({
							title: res.msg,
							icon: "none"
						})
					}
				}).catch(err => {
					console.log(err)
				})
			},
			turnMyProfile: function() {
				if (this.identity == 1) {
					if (this.is_educator >= 10) {
						// #ifdef H5
						var url = window.location.href;
						var origin = window.location.origin;
						let turn_url = origin + '/esl_h5/pages/me/educator/home';
						window.location.href = turn_url;
						// #endif
						// #ifndef H5
						uni.navigateTo({
							url:'/pages/me/educator/home'
						})
						// #endif
						
					} else {
						uni.navigateTo({
							url: '/pages/role/educator'
						})
					}

				}
				if (this.identity == 2) {
					if(this.is_business>=10){
						// #ifdef H5
						var url = window.location.href;
						var origin = window.location.origin;
						let turn_url = origin + '/esl_h5/pages/me/business/home';
						window.location.href = turn_url;
						// #endif
						// #ifndef H5
						uni.navigateTo({
							url:'/pages/me/business/home'
						})
						// #endif
						
					}else{
						uni.navigateTo({
							url: '/pages/role/business'
						})
					}
					
				}
				if (this.identity == 3) {
					if(this.is_vendor>=10){
						// #ifdef H5
						var url = window.location.href;
						var origin = window.location.origin;
						let turn_url = origin + '/esl_h5/pages/me/vendor/home';
						window.location.href = turn_url;
						// #endif
						// #ifndef H5
						uni.navigateTo({
							url:'/pages/me/vendor/home'
						})
						// #endif
					
					}else{
						uni.navigateTo({
							url: '/pages/role/vendor'
						})
					}
					
				}

			},
			turnAccountInfo: function() {
				uni.navigateTo({
					url: '/pages/me/accountInfo/index'
				})
			},
			turnMyJobs(identity) {
				if (identity == 2) {
					uni.navigateTo({
						url: '/pages/jobs/index'
					})
				}
				if (identity == 1) {
					uni.navigateTo({
						url: '/pages/jobs/apply/index'
					})
				}
			},
			turnMyDeals() {
				uni.navigateTo({
					url: '/pages/me/deals/index'
				})
			},
			turnMyEvents() {
				uni.navigateTo({
					url: '/pages/me/events/index'
				})
			},


		},
		onShareAppMessage:function(){
			
		},
		onShareTimeline:function(){
			
		},
		onAddToFavorites:function(){
			
		},
	}
</script>

<style>
	@import url("@/common/me/index.css");
	@import url("@/common/home/role-popup.css");
</style>
