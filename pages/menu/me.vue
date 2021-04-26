<template>
	<view class="uni-flex uni-column me-bg">
		<view class="flex-item me-header-info u-skeleton">
			<view class="me-header-info-l ">
				<image class="u-skeleton-circle"  @click="turnMyProfile" :src="avatarUrl" mode="aspectFill" lazy-load></image>
			</view>
			<view class="me-header-nologin-info-r" v-if="showLoginBtnStatus">
				<view class="login-btn u-skeleton-rect">
					<button type="default" @click="miniLogin">{{i18n.melogin}}</button>
				</view>
			</view>
			<view class="me-header-info-r" v-if="!showLoginBtnStatus">
				<view class="me-header-info-r-1  u-skeleton-fillet">
					<text v-if="nickname != '' ">{{nickname}}</text>
					<!-- #ifdef MP-WEIXIN -->
					<open-data v-if="nickname=='' " type="userNickName"></open-data>
					<!-- #endif -->
				</view>
				<view class="me-header-info-r-2 u-skeleton-fillet">
					<u-icon name="map" size="28"></u-icon>
					<text v-if="location!='' ">{{location}}</text>
					<!-- #ifdef MP-WEIXIN -->
					<view v-if="location=='' ">
						<open-data  type="userCity"></open-data>, <open-data type="userProvince"></open-data>
					</view>
					<!-- #endif -->
				</view>
				<view class="me-header-info-r-3 u-skeleton-fillet">
					<text v-if="identity==1">{{i18n.meeducator}}</text>
					<text v-if="identity==2">{{i18n.mebusiness}}</text>
					<text v-if="identity==3">{{i18n.mevendor}}</text>
					<text v-if="identity==0 || identity==4">{{i18n.meguest}}</text>
				</view>
				<view class="me-header-info-r-4 u-skeleton-fillet">
					<text v-if="identity==1 && educatorLevel==1">{{i18n.mebasiclevel}}</text>
					<text v-if="identity==1 && educatorLevel==2">{{i18n.meprolevel}}</text>
					<text v-if="identity==1 && educatorLevel==3">{{i18n.mepluslevel}}</text>
					<text v-if="identity==2 && businessLevel == 1">{{i18n.mebasiclevel}}</text>
					<text v-if="identity==2 && businessLevel == 2">{{i18n.meprolevel}}</text>
					<text v-if="identity==2 && businessLevel == 3">{{i18n.mepluslevel}}</text>
					<text v-if="identity==3 && vendorLevel == 1">{{i18n.mebasiclevel}}</text>
					<text v-if="identity==3 && vendorLevel == 2">{{i18n.meprolevel}}</text>
					<text v-if="identity==3 && vendorLevel == 3">{{i18n.mepluslevel}}</text>
					<view class="me-level-upgrade u-skeleton-rect" v-if=" (identity==2 && businessLevel!=3) || (identity==3 && vendorLevel !=3)">
						<button type="default" @click="upgradeLevel">{{i18n.meupgrade}}</button>
					</view>
				</view>
			</view>
		</view>

		<view class="flex-item user-verified" v-if="identity == 3">
			<button @click="showContactStatus=true">{{i18n.Verified}}</button>
		</view>
		<view class="flex-item me-center-list">
			<view class="center-list border-top-left-right-radius">
				<view class="center-list-item border-bottom " v-if="identity && !showLoginBtnStatus"
					@click="turnAccountInfo">
					<u-icon name="content_account" custom-prefix="custom-icon" size="34" color="#000000"></u-icon>
					<text class="list-text">{{i18n.accountpgaccountinfo}}</text>
					<u-icon name="arrow-right" size="28" color="#808080"></u-icon>
				</view>
				<view class="center-list-item border-bottom" v-if="identity && !showLoginBtnStatus"
					@click="turnMyProfile">
					<u-icon name="profile" custom-prefix="custom-icon" size="34" color="#000000"></u-icon>
					<text class="list-text">{{i18n.accountpgeditprofile}}</text>
					<u-icon name="arrow-right" size="28" color="#808080"></u-icon>
				</view>
				<view class="center-list-item border-bottom" v-if="identity && !showLoginBtnStatus"
					@click="showDiscountStatus=true">
					<u-icon name="discount1" custom-prefix="custom-icon" size="34" color="#000000"></u-icon>
					<text class="list-text">{{i18n.accountpgdiscount}}</text>
					<u-icon name="arrow-right" size="28" color="#808080"></u-icon>
				</view>

				<view class="center-list-item border-bottom" @click="showLanguagePopupStatus=true">
					<u-icon name="languagechange" custom-prefix="custom-icon" size="34" color="#000000"></u-icon>
					<text class="list-text">{{i18n.accountpglanguage}}</text>
					<u-icon name="arrow-right" size="28" color="#808080"></u-icon>
				</view>
				<view class="center-list-item border-bottom" v-if="!showLoginBtnStatus" @click="showRolePopup">
					<u-icon name="Switchaccount" custom-prefix="custom-icon" size="34" color="#000000"></u-icon>
					<text class="list-text">{{i18n.accountinfoadd}}</text>
					<u-icon name="arrow-right" size="28" color="#808080"></u-icon>
				</view>
				<!-- #ifdef H5 -->
				<view class="center-list-item border-bottom" @click="showContactStatus=true">
					<u-icon name="contact" custom-prefix="custom-icon" size="34" color="#000000"></u-icon>
					<text class="list-text">{{i18n.accountpgcontact}}</text>
					<u-icon name="arrow-right" size="28" color="#808080"></u-icon>
				</view>
				<!-- #endif -->
				<!-- #ifdef MP-WEIXIN -->
				<button class="center-list-item-button border-bottom" type="default" open-type="contact"
					show-message-card="true">
					<u-icon name="contact" custom-prefix="custom-icon" size="34" color="#000000"></u-icon>
					<text class="list-text">{{i18n.accountpgcontact}}</text>
					<u-icon name="arrow-right" size="28" color="#808080"></u-icon>
				</button>
				<!-- #endif -->
				<view class="center-list-item border-bottom" v-if="identity==2 || identity ==1"
					@click="turnMyJobs(identity)">
					<u-icon name="jobs" custom-prefix="custom-icon" size="34" color="#000000"></u-icon>
					<text class="list-text" v-if="identity==1">{{i18n.memyapplications}}</text>
					<text class="list-text" v-if="identity==2">{{i18n.accountpgmyjobs}}</text>
					<u-icon name="arrow-right" size="28" color="#808080"></u-icon>
				</view>
				<view class="center-list-item border-bottom" v-if="identity==2" @click="showPostJobStatus=true">
					<u-icon name="fabuzhiwei" custom-prefix="custom-icon" size="34" color="#000000"></u-icon>
					<text class="list-text">{{i18n.homepostjobs}}</text>
					<u-icon name="arrow-right" size="28" color="#808080"></u-icon>
				</view>

				<view class="center-list-item border-bottom" v-if="identity==3" @click="turnMyDeals">
					<u-icon name="deals" custom-prefix="custom-icon" size="34" color="#000000"></u-icon>
					<text class="list-text">{{i18n.accountpgmydeals}}</text>
					<u-icon name="arrow-right" size="28" color="#808080"></u-icon>
				</view>
				<view class="center-list-item border-bottom" v-if="identity==3" @click="turnMyEvents">
					<u-icon name="events" custom-prefix="custom-icon" size="34" color="#000000"></u-icon>
					<text class="list-text">{{i18n.accountpgmyevents}}</text>
					<u-icon name="arrow-right" size="28" color="#808080"></u-icon>
				</view>
			</view>
		</view>

		<view class="flex-item xll-ads">
			<swiper class="xll-ads-swiper" :indicator-dots="false" :autoplay="true" :interval="4000" :duration="500">
				<swiper-item v-for="(item,index) in meAdsListBottom" :key="index">
					<view class="swiper-item">
						<image @click="adsTurn(item.relative_link)" :src="item.url" mode="scaleToFit" lazy-load="true">
						</image>
					</view>
				</swiper-item>
			</swiper>
		</view>
		
		<view class="logout" v-if="!showLoginBtnStatus">
			<button type="default" @click="logout()">{{i18n.melogout}}</button>
		</view>
		
		<!-- 语言选择框 -->
		<xllLanguage :show="showLanguagePopupStatus" @close="showLanguagePopupStatus=false"></xllLanguage>
		<!-- 语言选择end -->

		<discountcard @close="closeDiscount" :showContact="showDiscountStatus"></discountcard>
		<contactus @close="closeContact" :showContact="showContactStatus"></contactus>
		<!-- 角色选择弹框 -->
		<selectRolePopup :rolePopupStatus="rolePopupStatus" :selectRoleIdentity="selectRoleIdentity"
			@close="rolePopupStatus=false"></selectRolePopup>
		<!-- 角色选择弹框 end -->
		<how-post-job @close="showPostJobStatus=false" :showPostJobStatus="showPostJobStatus"></how-post-job>
		<contactus @close="showContactStatus = false" :showContact="showContactStatus"></contactus>
		
			<!--引用组件-->
		<u-skeleton :loading="skeletonLoading" :animation="true" bgColor="#ffffff"></u-skeleton>
		<u-no-network></u-no-network>
	</view>
</template>

<script>
	import profile from '@/api/profile.js';
	import login from '@/api/login.js';
	import xllLanguage from '@/uni_modules/xll-language/components/xll-language/xll-language.vue';
	import contactus from "@/components/xll-contact-us/xll-contact-us.vue";
	import discountcard from "@/components/xll-discount-card/xll-discount-card.vue";
	import selectRolePopup from "@/components/select-role-popup/select-role-popup.vue"
	import ads from '@/api/ads.js';

	export default {
		data() {
			return {
				skeletonLoading: false,
				login: false,
				avatarUrl: "https://oss.esl-passport.cn/educator.png",
				nickname: "",
				location: "",
				jobTitle: "",
				uerInfo: {},
				
				educatorInfo: '',
				businessInfo: '',
				vendorInfo: '',
				otherInfo: '',

				rolePopupStatus: false, // 角色选择弹框
				selectRoleIdentity: 0,
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
				meAdsListBottom: [],

				showPostJobStatus: false,

				showLoginBtnStatus: false,
				showLanguagePopupStatus:false,

			}
		},
		components: {
			contactus,
			discountcard,
			selectRolePopup,
			xllLanguage
			
		},
		computed: {
			i18n() {
				return this.$t('index')
			},
			// #ifdef H5
			isWechat() {
				return this.$isWechat()
			}
			// #endif
			
		},
		onShow() {
			var _this = this;
			let token = uni.getStorageSync('token');
			let identity = uni.getStorageSync('identity');
			
			if(!identity && token){
				_this.rolePopupStatus = true;
			}
			// #ifdef H5
			uni.setTabBarItem({
				index: 1,
				text: this.i18n.tabbarjobs
			})
			// #endif
			// #ifdef MP-WEIXIN
			if (token != '' && identity && identity != 0) {
				uni.setTabBarItem({
					index: 1,
					text: this.i18n.tabbarjobs
				})
			}
			// #endif

		},
		onLoad() {
			var _this = this;
			let token = uni.getStorageSync('token');

			this.getAdsList();

			if (!token) {
				_this.showLoginBtnStatus = true;
			} else {
				
				_this.showLoginBtnStatus = false;
				let uid = uni.getStorageSync('uid');
				let token = uni.getStorageSync('token');
				let identity = uni.getStorageSync('identity');
				if(identity){
					_this.skeletonLoading = true;
				}
				_this.identity = identity;
				_this.getBasicInfo(uid, token, identity);
			}

			uni.$on('changeIdentity', function(data) {
				_this.identity = data;
				let uid = uni.getStorageSync('uid');
				let token = uni.getStorageSync('token');
				_this.getBasicInfo(uid, token, data);
			})
			uni.$on('userInfoUpdated', function(data) {
				console.log(data)
				let uid = uni.getStorageSync('uid');
				let token = uni.getStorageSync('token');
				let identity = _this.identity;
				_this.getBasicInfo(uid, token, identity);
			})

			uni.$on('tokenUpdated', function(data) {
				console.log(data)
				_this.showLoginBtnStatus = false;
				_this.getBasicInfo(data.uid, data.token, data.identity);
				_this.identity = data.identity;
			})

		},
		onUnload() {
			uni.$off('changeIdentity');
			uni.$off('userInfoUpdated');
			uni.$off('tokenUpdated');
		},
		methods: {
			adsTurn(relativeLink) {
				if (relativeLink != '') {
					uni.navigateTo({
						url: relativeLink
					})
				} else {
					this.showContactStatus = true;
				}
			},
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
			
			showRolePopup: function(e) {
				this.rolePopupStatus = true;
				this.language = uni.getStorageSync('language');
			},
			getBasicInfo(uid, token, identity) {
				var that = this;

				let data = {
					id: uid,
					token: token,
					identity: identity
				}
				profile.getBasicInfo(data).then(res => {
					console.log(res)
					if (res.code == 200) {
						this.is_educator = res.message.is_educator;
						this.is_business = res.message.is_business;
						this.is_vendor = res.message.is_vendor;
						this.is_other = res.message.is_other;
						this.mobile = res.message.phone;

						let educatorInfo = res.message.educator_info;
						let businessInfo = res.message.business_info;
						let vendorInfo = res.message.vendor_info;
						
						if (that.identity == 1) {
							if (educatorInfo) {
								let profilePhoto = res.message.educator_info.profile_photo;
								let firstName = res.message.educator_info.first_name;
								let lastName =  res.message.educator_info.last_name;
								let district = res.message.educator_info.district;
								let city  = res.message.educator_info.city;
								let level = res.message.educator_info.level;
								
								if(profilePhoto !='' ){
									that.avatarUrl = profilePhoto;
								}
								
								that.nickname = firstName + ' ' + lastName;
								that.location = district + ', ' + city;
								this.educatorLevel = level;
							}
						}
						if (that.identity == 2) {
							if (businessInfo) {
								let profilePhoto = res.message.business_info.profile_photo;
								let firstName = res.message.business_info.first_name;
								let lastName =  res.message.business_info.last_name;
								let district = res.message.business_info.district;
								let city  = res.message.business_info.city;
								let level = res.message.business_info.level;
								
								if(profilePhoto !='' ){
									that.avatarUrl = profilePhoto;
								}
								
								that.nickname = firstName + ' ' + lastName;
								that.location = district + ', ' + city;
								this.businessLevel = level;
								
							}
						}
						if (that.identity == 3) {
							if (vendorInfo) {
								let profilePhoto = res.message.vendor_info.profile_photo;
								let firstName = res.message.vendor_info.first_name;
								let lastName =  res.message.vendor_info.last_name;
								let district = res.message.vendor_info.district;
								let city  = res.message.vendor_info.city;
								let level = res.message.vendor_info.level;
								
								if(profilePhoto !='' ){
									that.avatarUrl = profilePhoto;
								}
								
								that.nickname = firstName + ' ' + lastName;
								that.location = district + ', ' + city;
								this.vendorLevel = level;
								
							}

						}

						// #ifdef H5
						if (that.identity == 0 && !this.isWechat) {
							that.nickname = "First & Last Name";
							that.location = 'District, City';
						}
						// #endif
						
						this.skeletonLoading = false;

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
						let turn_url = origin + '/esl_h5/pagesB/me/educator/home';
						window.location.href = turn_url;
						// #endif
						// #ifndef H5
						uni.navigateTo({
							url: '/pagesB/me/educator/home'
						})
						// #endif

					} else {
						uni.navigateTo({
							url: '/pagesC/role/educator'
						})
					}

				}
				if (this.identity == 2) {
					if (this.is_business >= 10) {
						// #ifdef H5
						var url = window.location.href;
						var origin = window.location.origin;
						let turn_url = origin + '/esl_h5/pagesB/me/business/home';
						window.location.href = turn_url;
						// #endif
						// #ifndef H5
						uni.navigateTo({
							url: '/pagesB/me/business/home'
						})
						// #endif

					} else {
						uni.navigateTo({
							url: '/pagesC/role/business'
						})
					}

				}
				if (this.identity == 3) {
					if (this.is_vendor >= 10) {
						// #ifdef H5
						var url = window.location.href;
						var origin = window.location.origin;
						let turn_url = origin + '/esl_h5/pagesB/me/vendor/home';
						window.location.href = turn_url;
						// #endif
						// #ifndef H5
						uni.navigateTo({
							url: '/pagesB/me/vendor/home'
						})
						// #endif

					} else {
						uni.navigateTo({
							url: '/pagesC/role/vendor'
						})
					}

				}

			},
			turnAccountInfo: function() {
				uni.navigateTo({
					url: '/pagesB/me/accountInfo/index'
				})
			},
			turnMyJobs(identity) {
				if (identity == 2) {
					uni.navigateTo({
						url: '/pagesA/jobs/index'
					})
				}
				if (identity == 1) {
					uni.navigateTo({
						url: '/pagesA/jobs/apply/index'
					})
				}
			},
			turnMyDeals() {
				uni.navigateTo({
					url: '/pagesB/me/deals/index'
				})
			},
			turnMyEvents() {
				uni.navigateTo({
					url: '/pagesB/me/events/index'
				})
			},
			upgradeLevel() {
				uni.navigateTo({
					url: '/pagesB/me/upgrade'
				})

			},
			miniLogin() {
				uni.navigateTo({
					url: '/pagesC/login/index'
				})
			},
			logout(){
				uni.clearStorageSync();
				uni.reLaunch({
					url:'/pages/menu/me'
				})
			}

		},
		onShareAppMessage: function() {

		},
		onShareTimeline: function() {

		},
		onAddToFavorites: function() {

		},
	}
</script>

<style>
	@import url("@/common/me/index.css");
	@import url("@/common/home/role-popup.css");
	
	.logout{
		width: 80%;
		margin: 20rpx auto;
	}
	.logout button{
		background-color: #0AA0A8;
		color: #FFFFFF;
		font-size: 30rpx;
		line-height: 80rpx;
	}
</style>
