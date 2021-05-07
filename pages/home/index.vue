<template>
	<view class="uni-flex uni-column index-bg">
		<view class="flex-item flex-item-V ">
			<view class="page-section swiper">
				<view class="page-section-spacing">
					<swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval"
						:duration="duration">
						<swiper-item v-for="(item,index) in adsListTop" :key="index"
							@click="turnBanner(item.relative_link)">
							<view class="swiper-item">
								<image :src="item.url" mode="scaleToFit" lazy-load="true"></image>
							</view>
						</swiper-item>
					</swiper>
				</view>
			</view>
		</view>

		<view class="home-changelanguage">
			<xll-changelanguage></xll-changelanguage>
		</view>

		<view class="flex-item flex-item-V index-box">
			<view class="index-box-box" v-if="identity==1">
				<view class="index-box-item" @click="searchJobs">
					<image src="/static/esl/search-jobs.png" class="image" mode="aspectFit" />
					<text class="text">{{i18n.homesearchjobs}}</text>
				</view>
				<view class="index-box-item" @click="showDiscountStatus=true">
					<image src="/static/home/discount.png" class="image" mode="aspectFit" />
					<text class="text">{{i18n.homediscountcard}}</text>
				</view>
				<view class="index-box-item" @click="turnDeals">
					<image src="/static/esl/deals.png" class="image" mode="aspectFit" />
					<text class="text">{{i18n.homedeals}}</text>
				</view>
				<view class="index-box-item" @click="turnMyProfile">
					<image src="/static/esl/profile.png" class="image" mode="aspectFit" />
					<text class="text">{{i18n.homeeditprofile}}</text>
				</view>
				<!-- #ifdef H5 -->
				<view class="index-box-item" @click="showContactStatus=true">
					<image src="/static/esl/contact-us.png" class="image" mode="aspectFit" />
					<text class="text">{{i18n.homecontact}} </text>
				</view>
				<view class="index-box-item" @click="showContactStatus=true">
					<image src="/static/esl/help.png" class="image" mode="aspectFit" />
					<text class="text">{{i18n.homehelp}}</text>
				</view>
				<!-- #endif -->

				<!-- #ifdef MP-WEIXIN -->
				<button class="index-box-item-button" type="default" open-type="contact" show-message-card="true">
					<image src="/static/esl/contact-us.png" class="image" mode="aspectFit" /> <text
						class="text">{{i18n.homecontact}}
					</text>
				</button>
				<button class="index-box-item-button" type="default" open-type="contact" show-message-card="true">
					<image src="/static/esl/help.png" class="image" mode="aspectFit" /> <text
						class="text">{{i18n.homehelp}}</text>
				</button>
				<!-- #endif -->
			</view>

			<view class="index-box-box" v-if="identity==2">
				<view class="index-box-item" @click="showPostJobStatus=true">
					<image src="/static/esl/post-a-job.png" class="image" mode="aspectFit" />
					<text class="text">{{i18n.homepostjobs}}</text>
				</view>
				<view class="index-box-item" @click="showDiscountStatus=true">
					<image src="/static/home/discount.png" class="image" mode="aspectFit" />
					<text class="text">{{i18n.homediscountcard}}</text>
				</view>
				<view class="index-box-item" @click="turnDeals">
					<image src="/static/esl/deals.png" class="image" mode="aspectFit" />
					<text class="text">{{i18n.homedeals}}</text>
				</view>
				<view class="index-box-item" @click="turnMyProfile">
					<image src="/static/esl/profile.png" class="image" mode="aspectFit" />
					<text class="text">{{i18n.homeeditprofile}}</text>
				</view>
				<!-- #ifdef H5 -->
				<view class="index-box-item" @click="showContactStatus=true">
					<image src="/static/esl/contact-us.png" class="image" mode="aspectFit" />
					<text class="text">{{i18n.homecontact}} </text>
				</view>
				<view class="index-box-item" @click="showContactStatus=true">
					<image src="/static/esl/help.png" class="image" mode="aspectFit" />
					<text class="text">{{i18n.homehelp}}</text>
				</view>
				<!-- #endif -->
				<!-- #ifdef MP-WEIXIN -->
				<button class="index-box-item-button" type="default" open-type="contact" show-message-card="true">
					<image src="/static/esl/contact-us.png" class="image" mode="aspectFit" /> <text
						class="text">{{i18n.homecontact}}
					</text>
				</button>
				<button class="index-box-item-button" type="default" open-type="contact" show-message-card="true">
					<image src="/static/esl/help.png" class="image" mode="aspectFit" /> <text
						class="text">{{i18n.homehelp}}</text>
				</button>
				<!-- #endif -->
			</view>

			<view class="index-box-box" v-if="identity==3">
				<view class="index-box-item" @click="turnMyDeals">
					<image src="/static/esl/deals.png" class="image" mode="aspectFit" />
					<text class="text">{{i18n.homecreatedeal}}</text>
				</view>
				<view class="index-box-item" @click="turnMyEvents">
					<image src="/static/esl/post-a-job.png" class="image" mode="aspectFit" />
					<text class="text">{{i18n.homepostevent}}</text>
				</view>
				<view class="index-box-item" @click="showDiscountStatus=true">
					<image src="/static/home/discount.png" class="image" mode="aspectFit" />
					<text class="text">{{i18n.homediscountcard}}</text>
				</view>
				<view class="index-box-item" @click="turnMyProfile">
					<image src="/static/esl/profile.png" class="image" mode="aspectFit" />
					<text class="text">{{i18n.homeeditprofile}}</text>
				</view>
				<!-- #ifdef H5 -->
				<view class="index-box-item" @click="showContactStatus=true">
					<image src="/static/esl/contact-us.png" class="image" mode="aspectFit" />
					<text class="text">{{i18n.homecontact}} </text>
				</view>
				<view class="index-box-item" @click="showContactStatus=true">
					<image src="/static/esl/ads-icon.png" class="image" mode="aspectFit" />
					<text class="text">{{i18n.homeadvertise}}</text>
				</view>
				<!-- #endif -->
				<!-- #ifdef MP-WEIXIN -->
				<button class="index-box-item-button" type="default" open-type="contact" show-message-card="true">
					<image src="/static/esl/contact-us.png" class="image" mode="aspectFit" /> <text
						class="text">{{i18n.homecontact}}
					</text>
				</button>
				<button class="index-box-item-button" type="default" open-type="contact" show-message-card="true">
					<image src="/static/esl/ads-icon.png" class="image" mode="aspectFit" /> <text
						class="text">{{i18n.homeadvertise}}</text>
				</button>
				<!-- #endif -->
			</view>

			<view class="index-box-box" v-if="!identity">
				<view class="index-box-item" @click="turnDeals">
					<image src="/static/esl/home-deals.png" class="image" mode="aspectFit" />
					<text class="text">{{i18n.homedeals}}</text>
				</view>
				<view class="index-box-item" @click="openIdentity(3)">
					<image src="/static/esl/home-offer-deals.png" class="image" mode="aspectFit" />
					<text class="text">{{i18n.homecreatedeal}}</text>
				</view>
				<view class="index-box-item" @click="showDiscountStatus=true">
					<image src="/static/home/discount.png" class="image" mode="aspectFit" />
					<text class="text">{{i18n.homediscountcard}}</text>
				</view>
				<!-- #ifdef H5 -->
				<view class="index-box-item" @click="showContactStatus=true">
					<image src="/static/esl/ads-icon.png" class="image" mode="aspectFit" />
					<text class="text">{{i18n.homeadvertise}}</text>
				</view>
				<!-- #endif -->
				<!-- #ifdef MP-WEIXIN -->
				<button class="index-box-item-button" type="default" open-type="contact" show-message-card="true">
					<image src="/static/esl/ads-icon.png" class="image" mode="aspectFit" /> <text
						class="text">{{i18n.homeadvertise}}</text>
				</button>
				<!-- #endif -->
				<!-- #ifdef H5 -->
				<view class="index-box-item" @click="openIdentity(2)">
					<image src="/static/esl/post-a-job.png" class="image" mode="aspectFit" />
					<text class="text">{{i18n.homepostjobs}}</text>
				</view>
				<!-- #endif -->
				<!-- #ifdef MP-WEIXIN -->
				<view class="index-box-item" @click="openIdentity(2)">
					<image src="/static/esl/post-a-job.png" class="image" mode="aspectFit" />
					<text class="text">{{i18n.homeposthere}}</text>
				</view>
				<!-- #endif -->


				<!-- #ifdef H5 -->
				<view class="index-box-item" @click="showContactStatus=true">
					<image src="/static/esl/contact-us.png" class="image" mode="aspectFit" />
					<text class="text">{{i18n.homecontact}} </text>
				</view>
				<!-- #endif -->
				<!-- #ifdef MP-WEIXIN -->
				<button class="index-box-item-button" type="default" open-type="contact" show-message-card="true">
					<image src="/static/esl/contact-us.png" class="image" mode="aspectFit" /> <text
						class="text">{{i18n.homecontact}}
					</text>
				</button>
				<!-- #endif -->

			</view>

		</view>

		<view class="home-signup" v-if="!identity">
			<button type="default" v-if="!hasLoginStatus"  @click="miniLogin()">{{i18n.homesignup}}</button>
			<button type="default" v-if="hasLoginStatus"  @click="openIdentity()">{{i18n.homesignup}}</button>
		</view>

		<view class="flex-item flex-item-V latest-jobs" v-if="showRecentJobsStatus">
			<view class="latest-jobs-title">
				{{i18n.homefeatjobs}}
			</view>
			<swiper class="latest-jobs-swiper" circular :indicator-dots="false" :autoplay="true" interval="2500">
				<swiper-item v-for="(item,index) in jobList" :key="index">
					<view class="latest-jobs-item ">
						<view class="latest-jobs-item-top" @click="turnJobDetail(item.id)">
							<view class="latest-jobs-item-l">
								<image :src="item.logo ? item.logo : 'https://oss.esl-passport.cn/business.png'"
									mode="aspectFit"></image>
							</view>
							<view class="latest-jobs-item-r">
								<view class="latest-jobs-item-r-1">
									<view class="job-title">{{item.job_title}}</view>
									<view class="jobs-view">
										<uni-icons type="eye" size="14"></uni-icons>
										<text>{{item.views}}</text>
									</view>
								</view>
								<view class="latest-jobs-item-r-2">
									<view class="salary">
										<text v-if="item.currency=='CNY'">¥</text>
										<text v-if="item.currency=='USD'">$</text>
										<text
											v-if="item.currency!='CNY' && item.currency !='USD'">{{item.currency}}</text>
										<text>{{item.salary_min}}-{{item.salary_max}}</text>
									</view>
									<view class="job-type" v-if="item.employment_type==1">
										{{i18n.jobslistemploymentfulltime}}
									</view>
									<view class="job-type" v-if="item.employment_type==2">
										{{i18n.jobslistemploymentparttime}}
									</view>
									<view class="job-type" v-if="item.employment_type==3">
										{{i18n.jobslistemploymentseasonal}}
									</view>

								</view>

								<view class="latest-jobs-item-r-4">
									{{item.business_name}}
								</view>
								<view class="latest-jobs-item-r-3">
									<view class="last-job-location">
										<block v-if="item.citys && languageValue=='en-US' ">{{item.citys.Pinyin}}
										</block>
										<block v-if="item.citys && languageValue=='zh-CN' ">{{item.citys.ShortName}}
										</block>
									</view>
									<view class="last-refresh-time">{{item.refresh_time | xllDateFormat(languageValue) }}
									</view>
								</view>
							</view>
						</view>

						<view class="latest-jobs-item-bottom">
							<view class="latest-jobs-item-bottom-button" @click="applyJobs(item.id)">
								{{i18n.homeapplyjob}}
							</view>
						</view>
					</view>
				</swiper-item>
			</swiper>
		</view>

		<view class="flex-item flex-item-V latest-deals" v-if="showRecentDealsStatus">
			<view class="latest-deals-title">
				{{i18n.dealsrecentdeals}}
			</view>
			<swiper class="latest-deals-swiper" :indicator-dots="false" :autoplay="true" :interval="2500">
				<swiper-item v-for="(item,index) in recentDealsList" :key="index" @click="turnDealsDetail(item.id)">
					<view class="latest-deals-item ">
						<view class="latest-deals-item-top">
							<view class="latest-deals-item-l">
								<image v-if="item.user_info" :src="item.user_info.logo" mode="aspectFit" lazy-load>
								</image>
							</view>
							<view class="latest-deals-item-r">
								<view class="latest-deals-item-r-1">{{item.user_info.vendor_name_en}}</view>
								<view class="latest-deals-item-r-2">{{item.title}}</view>
							</view>
						</view>
					</view>
				</swiper-item>
			</swiper>
		</view>

		<view class="flex-item events-slider" v-if="identity == 0 || identity =='' ">
			<swiper class="swiper" :indicator-dots="false" :autoplay="true" :interval="5000" :duration="600">
				<swiper-item style="height: 306rpx;" v-for="(item,index) in dealsAdsListMid" :key="index"
					@click="turnBanner(item.relative_link)">
					<view class="swiper-item">
						<image :src="item.url" mode="widthFix" lazy-load="true"></image>
					</view>
				</swiper-item>
			</swiper>
		</view>
		<view class="flex-item  why-esl-passport">
			<view class="why-esl-passport-title">
				{{i18n.homebannergopro}}
			</view>
			<view class="why-esl-passport-img">
				<swiper class="why-esl-passport-img-swiper" :indicator-dots="false" :autoplay="true" :interval="4000"
					:duration="500">
					<swiper-item v-for="(item,index) in adsListMid" :key="index"
						@click="upgradeAndGoPro(item.relative_link)">
						<view class="swiper-item">
							<image :src="item.url" mode="widthFix" lazy-load="true"></image>
						</view>
					</swiper-item>
				</swiper>
			</view>
		</view>

		<view class="flex-item" v-if="adsListArticles.length>0">
			<swiper class="article-swiper" :indicator-dots="false" :autoplay="true" :interval="5000" :duration="2000" circular>
				<swiper-item v-for="(item,index) in adsListArticles" :key="index" @click="turnArticle(item.link)">
					<view class="flex-item article">
						<view class="article-image">
							<image :src="item.url" mode="widthFix" lazy-load="true"></image>
						</view>
						<view class="article-title">
							{{item.title}}
						</view>
						<view class="article-detail">
							<view class="article-detail-txt">Detail</view>
							<uni-icons type="forward"></uni-icons>
						</view>
					</view>
				</swiper-item>
			</swiper>
		</view>

		<view class="flex-item  why-esl-passport">
			<view class="why-esl-passport-title">
				{{i18n.homebannerfollowus}}
			</view>
			<view class="why-esl-passport-img">
				<swiper class="why-esl-passport-img-swiper" :indicator-dots="false" :autoplay="true" :interval="6000"
					:duration="500">
					<swiper-item v-for="(item,index) in adsListBottom" :key="index">
						<!-- <view class="swiper-item">
							<image :src="item.url" mode="widthFix" lazy-load="true"></image>
						</view> -->
						<view class="swiper-item swiper-item-bg" :style="{backgroundImage:'url('+item.url+')'}">
							<view class="qrcode-image" @click="qrcodeType = 1;showQrcode=true"></view>
							<view class="qrcode-image" @click="qrcodeType = 2;showQrcode=true"></view>
							<view class="qrcode-image" @click="qrcodeType = 3;showQrcode=true"></view>
							<view class="qrcode-image" @click="qrcodeType = 4;showQrcode=true"></view>
							<view class="qrcode-image" @click="qrcodeType = 5;showQrcode=true"></view>
						</view>
					</swiper-item>
				</swiper>
			</view>
			<xll-qrcode-popup @close="closeQrcode" :showQrcode="showQrcode" :codeType="qrcodeType"></xll-qrcode-popup>
		</view>

		<contactus @close="showContactStatus = false" :showContact="showContactStatus"></contactus>
		<discountcard @close="showDiscountStatus=false" :showContact="showDiscountStatus"></discountcard>
		<selectRolePopup :rolePopupStatus="rolePopupStatus" :selectRoleIdentity="selectRoleIdentity"
			@close="rolePopupStatus=false"></selectRolePopup>
		<xllwechatofficialaccount :show="showOfficialStatus" @close="showOfficialStatus=false">
		</xllwechatofficialaccount>

		<!-- #ifdef MP-WEIXIN -->
		<aTip :isCustom="false" :text="i18n.addtomyminiprograms" :closeColor="false"></aTip>
		<!-- #endif -->

		<how-post-job @close="showPostJobStatus=false" :showPostJobStatus="showPostJobStatus"></how-post-job>
		<!-- #ifdef MP-WEIXIN -->
		<official-account class="official-account"></official-account>
		<!-- #endif -->

		<!-- #ifdef H5 -->
		<view style="height: 160rpx;width: 100%;"></view>
		<!-- #endif -->
		<u-no-network></u-no-network>
	</view>

</template>

<script>
	import {
		dateUtils,
		howLong
	} from '@/common/util.js';
	import profile from '@/api/profile.js';
	import deals from '@/api/deals.js';
	import login from '@/api/login.js';
	import jobs from '@/api/jobs.js';
	import ads from '@/api/ads.js';

	import {
		getUrlCode
	} from '@/common/util.js';
	import contactus from "@/components/xll-contact-us/xll-contact-us.vue";
	import discountcard from "@/components/xll-discount-card/xll-discount-card.vue";
	import xllwechatofficialaccount from "@/components/xll-wechat-official-account/xll-wechat-official-account.vue";
	import selectRolePopup from '@/components/select-role-popup/select-role-popup.vue';

	// #ifdef MP-WEIXIN
	import aTip from "@/components/a_tip/aTip";
	// #endif

	export default {
		data() {
			var _this = this;
			return {
				showQrcode: false,
				qrcodeType: 1,
				// #ifdef H5
				appid: _this.$appid,
				redirect_uri: _this.$redirect_uri,
				response_type: _this.$response_type,
				scope: _this.$scope,
				state: _this.$state,
				// #endif
				rolePopupStatus: false, // 角色选择弹框
				selectRoleValue: 0, //选择的角色值

				indicatorDots: true,
				autoplay: true,
				interval: 3000,
				duration: 500,
				language: 'en-US',

				is_educator: 0,
				is_business: 0,
				is_vendor: 0,
				is_other: 0,
				identity: 0, //当前身份、
				mobile: '', // 用户手机号
				token: '',

				jobList: [],
				showRecentJobsStatus: false,

				adsList: [],
				adsListTop: [],
				adsListMid: [],
				adsListBottom: [],
				adsListArticles: [],

				dealsAdsListTop: [],
				dealsAdsListMid: [],
				dealsAdsListBottom: [],

				showDiscountStatus: false,
				showContactStatus: false,

				profilePercentValue: 0,
				recentDealsList: [],
				showRecentDealsStatus: false,

				selectRoleIdentity: 0,
				showOfficialStatus: false,

				showPostJobStatus: false,

				articleImageHeight: 300,
			}
		},
		components: {
			contactus,
			discountcard,
			selectRolePopup,
			xllwechatofficialaccount,
			// #ifdef MP-WEIXIN
			aTip
			// #endif

		},
		filters: {
			xllDateFormat(value,a) {
				let date = dateUtils.parse(value);
				return howLong(Date.parse(date) / 1000,a);
			}
		},
		onShow() {
			// #ifdef H5
			uni.setTabBarItem({
				index: 1,
				text: this.i18n.tabbarjobs
			})
			// #endif
			// #ifdef MP-WEIXIN
			let token = uni.getStorageSync('token');
			let identity = uni.getStorageSync('identity');

			if (token != '' && identity && identity != 0) {
				uni.setTabBarItem({
					index: 1,
					text: this.i18n.tabbarjobs
				})
			}
			// #endif
			this.getAdsList();
		},
		computed: {
			i18n() {
				return this.$t('index')
			},
			hasLoginStatus() {
				let token = uni.getStorageSync('token');
				if (token) {
					return true;
				} else {
					return false;
				}
			},
			languageValue() {
				let language = uni.getStorageSync('language');
				return language ? language : 'en-US';
			},
			// #ifdef H5
			isWechat() {
				return this.$isWechat()
			}
			// #endif

		},
		onUnload() {
			uni.$off('changeIdentity');
			uni.$off('changeLanguage');
		},
		onLoad(option) {

			var that = this;

			uni.$on('changeIdentity', function(data) {
				console.log('监听到事件来自 changeIdentity ，携带参数 identity 为：' + data);
				that.identity = data;
			})

			uni.$on('changeLanguage', function(data) {
				console.log('监听changelanguage', data);
			})

			let uid = uni.getStorageSync('uid');
			let token = uni.getStorageSync('token');
			let language = uni.getStorageSync('language');
			let identity = uni.getStorageSync('identity');
			if (identity) {
				that.identity = identity;
			}

			if (token && token != '') {
				//获取职位列表
				this.getJobsList();
				this.getRecentDealsList(1, 6);
				this.getBasicInfo(token, uid);
			}

			if (language && language != '') {
				if (language == 'zh-CN') {
					uni.setStorageSync("language", 'zh-CN')
					this.language = 'zh-CN';
					this._i18n.locale = 'zh-CN';
				}
				if (language == 'en-US') {
					this.language = 'en-US';
					uni.setStorageSync("language", 'en-US')
					this._i18n.locale = 'en-US';
				}

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
				if (token != '' && identity && identity != 0) {
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

			}

		},
		methods: {
			getBasicInfo(token, uid) {
				var that = this;
				let data = {
					token: token,
					id: uid
				}
				profile.getBasicInfo(data).then(res => {
					console.log(res)
					if (res.code == 200) {
						let unionid = res.message.unionid;
						let phone = res.message.phone;
						let nickname = res.message.nickname;
						let uid = res.message.id;
						let identity = res.message.identity;
						let isEducator = res.message.is_educator;
						let isBusiness = res.message.is_business;
						let isVendor = res.message.is_vendor;
						let isOther = res.message.is_other;

						uni.setStorageSync('unionid', unionid)
						uni.setStorageSync('phone', phone)
						uni.setStorageSync('nickname', nickname)
						uni.setStorageSync('uid', uid)

						that.is_educator = isEducator;
						that.is_business = isBusiness;
						that.is_vendor = isVendor;
						that.is_other = isOther;
						that.mobile = phone;
						if (identity == 0) {
							uni.setStorageSync('identity', 0)
							that.identity = 0;
						}
						if (identity == 1) {
							if (isEducator == 0) {
								uni.setStorageSync('identity', 0)
								that.identity = 0;
							} else {
								uni.setStorageSync('identity', identity)
								that.identity = identity;
							}
						}
						if (identity == 2) {
							if (isBusiness == 0) {
								uni.setStorageSync('identity', 0)
								that.identity = 0;
							} else {
								uni.setStorageSync('identity', identity)
								that.identity = identity;
							}
						}

						if (identity == 3) {
							if (isVendor == 0) {
								uni.setStorageSync('identity', 0)
								that.identity = 0;
							} else {
								uni.setStorageSync('identity', identity)
								that.identity = identity;
							}
						}
						if (identity == 4) {
							if (isOther == 0) {
								uni.setStorageSync('identity', 0)
								that.identity = 0;
							} else {
								uni.setStorageSync('identity', identity)
								that.identity = identity;
							}
						}
						// #ifdef H5
						// let subscribeValue = res.message.subscribe;

						// if (this.isWechat) {
						// 	if (subscribeValue === 0) {
						// 		this.showOfficialStatus = true
						// 	}
						// }
						// #endif

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
			openIdentity(identity) {
				this.rolePopupStatus = true;
				this.selectRoleIdentity = identity;
			},
			getRecentDealsList(page, limit) {
				let identity = uni.getStorageSync('identity');
				let token = uni.getStorageSync('token');

				let data = {
					token: token,
					page: page,
					limit: limit
				}
				deals.dealsList(data).then(res => {
					console.log(res)
					if (res.code == 200) {
						let list = res.message.data;
						this.recentDealsList = list;

						if (list.length > 0) {
							this.showRecentDealsStatus = true;
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
			},
			turnDealsDetail(id) {
				// #ifdef MP-WEIXIN
				let token = uni.getStorageSync('token');
				if (token == '') {
					var pages = getCurrentPages(); // 当前页面
					var currentPagePath = pages[pages.length - 1]; // 前一个页面

					if (currentPagePath.route == 'pagesC/login/index') {
						return;
					}
					return uni.navigateTo({
						url: '/pagesC/login/index?redirect=' + encodeURIComponent(currentPagePath.route)
					})
				}
				// #endif

				let identity = uni.getStorageSync('identity')
				if (identity == 0) {
					this.rolePopupStatus = true;
					this.selectRoleIdentity = 0;
				} else {
					// #ifdef H5
					var url = window.location.href;
					var origin = window.location.origin;
					let turn_url = origin + '/esl_h5/pagesB/me/deals/detail?id=' + id;
					window.location.href = turn_url;
					// #endif

					// #ifndef H5
					uni.navigateTo({
						url: '/pagesB/me/deals/detail?id=' + id
					})
					// #endif
				}

			},
			closeQrcode() {
				this.showQrcode = false;
			},
			turnMyProfile: function() {
				// #ifdef MP-WEIXIN
				let token = uni.getStorageSync('token');
				if (token == '') {
					var pages = getCurrentPages(); // 当前页面
					var currentPagePath = pages[pages.length - 1]; // 前一个页面

					if (currentPagePath.route == 'pagesC/login/index') {
						return;
					}
					return uni.navigateTo({
						url: '/pagesC/login/index?redirect=' + encodeURIComponent(currentPagePath.route)
					})
				}
				// #endif

				if (this.identity == 1) {
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

				}
				if (this.identity == 2) {
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

				}
				if (this.identity == 3) {
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

				}

			},
			searchEvents() {
				uni.switchTab({
					url: '/pages/menu/job'
				})
			},
			turnDeals() {
				uni.switchTab({
					url: '/pages/menu/deals'
				})
			},
			turnMyDeals() {
				// #ifdef MP-WEIXIN
				let token = uni.getStorageSync('token');
				if (token == '') {
					var pages = getCurrentPages(); // 当前页面
					var currentPagePath = pages[pages.length - 1]; // 前一个页面

					if (currentPagePath.route == 'pagesC/login/index') {
						return;
					}
					return uni.navigateTo({
						url: '/pagesC/login/index?redirect=' + encodeURIComponent(currentPagePath.route)
					})
				}
				// #endif

				let data = {
					token: uni.getStorageSync('token'),
					id: uni.getStorageSync('uid'),
					identity: 3
				}
				profile.getBasicInfo(data).then(res => {
					console.log(res)
					if (res.code == 200) {
						let vendorInfo = res.message.vendor_info;
						if (vendorInfo.deals_count < vendorInfo.deals_num) {
							uni.navigateTo({
								url: '/pagesB/me/deals/add'
							})
						} else {
							uni.navigateTo({
								url: '/pagesB/me/deals/index'
							})
						}
					}
				}).catch(error => {
					console.log(error)
				})

			},
			turnMyEvents() {
				// #ifdef MP-WEIXIN
				let token = uni.getStorageSync('token');
				if (token == '') {
					var pages = getCurrentPages(); // 当前页面
					var currentPagePath = pages[pages.length - 1]; // 前一个页面

					if (currentPagePath.route == 'pagesC/login/index') {
						return;
					}
					return uni.navigateTo({
						url: '/pagesC/login/index?redirect=' + encodeURIComponent(currentPagePath.route)
					})
				}
				// #endif
				let data = {
					token: uni.getStorageSync('token'),
					id: uni.getStorageSync('uid'),
					identity: 3
				}
				profile.getBasicInfo(data).then(res => {
					console.log(res)
					if (res.code == 200) {
						let vendorInfo = res.message.vendor_info;
						if (vendorInfo.event_count < vendorInfo.events_num) {
							uni.navigateTo({
								url: '/pagesB/me/events/add'
							})
						} else {
							uni.navigateTo({
								url: '/pagesB/me/events/index'
							})
						}
					}
				}).catch(error => {
					console.log(error)
				})

			},
			searchJobs() {
				uni.switchTab({
					url: '/pages/menu/job'
				});
			},
			getJobsList() {
				let token = uni.getStorageSync('token');
				let identity = uni.getStorageSync('identity');

				let data = {
					token: token,
					ad_type: 1
				}
				jobs.featureList(data).then(res => {
					console.log(res);
					if (res.code == 200) {
						let list = res.message;
						this.jobList = list;
						// #ifdef H5
						if (list.length > 0 && identity != 3) {
							this.showRecentJobsStatus = true;
						}
						// #endif
						// #ifdef MP-WEIXIN
						if (list.length > 0 && identity != 0 && identity != '' && identity != 3) {
							this.showRecentJobsStatus = true;
						}
						// #endif

					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
					}
				}).catch(error => {
					console.log(error);
				})
			},
			getAdsList() {
				let data = {
					page: 1,
					limit: 100
				}
				ads.list(data).then(res => {
					console.log(res)
					if (res.code == 200) {
						this.adsListTop = res.message.data.filter(item => item.position == 1 && item.cate == 1)
						this.adsListMid = res.message.data.filter(item => item.position == 2 && item.cate == 1)
						this.adsListBottom = res.message.data.filter(item => item.position == 3 && item.cate == 1)
						this.dealsAdsListTop = res.message.data.filter(item => item.position == 1 && item.cate ==
							6)
						this.dealsAdsListMid = res.message.data.filter(item => item.position == 2 && item.cate ==
							6)
						this.dealsAdsListBottom = res.message.data.filter(item => item.position == 3 && item
							.cate == 6)
						this.adsListArticles = res.message.data.filter(item => item.position == 4 && item.cate ==
							1)

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
			turnJobDetail(id) {
				// #ifdef MP-WEIXIN
				let token = uni.getStorageSync('token');
				if (token == '') {
					var pages = getCurrentPages(); // 当前页面
					var currentPagePath = pages[pages.length - 1]; // 前一个页面

					if (currentPagePath.route == 'pagesC/login/index') {
						return;
					}
					return uni.navigateTo({
						url: '/pagesC/login/index?redirect=' + encodeURIComponent(currentPagePath.route)
					})
				}
				// #endif
				let identity = uni.getStorageSync('identity')
				if (identity == 4 || identity == 0) {
					this.rolePopupStatus = true;
					this.selectRoleIdentity = 0
				} else {
					// #ifdef H5
					var url = window.location.href;
					var origin = window.location.origin;
					let turn_url = origin + '/esl_h5/pagesA/jobs/details?id=' + id;
					window.location.href = turn_url;
					// #endif
					// #ifndef H5
					uni.navigateTo({
						url: '/pagesA/jobs/details?id=' + id
					})
					// #endif
				}
			},
			applyJobs(id) {
				// #ifdef MP-WEIXIN
				let token = uni.getStorageSync('token');
				if (token == '') {
					var pages = getCurrentPages(); // 当前页面
					var currentPagePath = pages[pages.length - 1]; // 前一个页面

					if (currentPagePath.route == 'pagesC/login/index') {
						return;
					}
					return uni.navigateTo({
						url: '/pagesC/login/index?redirect=' + encodeURIComponent(currentPagePath.route)
					})
				}
				// #endif
				let identity = uni.getStorageSync('identity')
				if (identity == 0 || identity == 4) {
					this.rolePopupStatus = true;
					this.selectRoleIdentity = 1;
					return;
				}
				if (identity == 2 || identity == 3) {
					this.rolePopupStatus = true;
					this.selectRoleIdentity = 1;
					return;
				}

				uni.showModal({
					title: this.i18n.applyjobmodaltips,
					content: this.i18n.applyjobmodalcontent,
					confirmText: this.i18n.applyjobmodalconfirmtext,
					cancelText: this.i18n.applyjobmodalcanceltext,
					success: function(res) {
						if (res.confirm) {
							console.log('用户点击确定');
							let data = {
								job_id: id,
								token: uni.getStorageSync('token')
							}
							jobs.applyJobs(data).then(res => {
								console.log(res)
								if (res.code == 200) {
									uni.showToast({
										title: '',
										icon: 'success'
									})
								} else {
									uni.showToast({
										title: res.msg,
										icon: 'none'
									})
								}
							}).catch(error => {
								console.log(error);
							})
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});

			},
			turnBanner(relativeLink) {

				if (relativeLink != '') {
					uni.navigateTo({
						url: relativeLink
					})
				} else {
					// // #ifdef MP-WEIXIN
					// let token = uni.getStorageSync('token');
					// if (token == '') {
					// 	var pages = getCurrentPages(); // 当前页面
					// 	var currentPagePath = pages[pages.length - 1]; // 前一个页面

					// 	if (currentPagePath.route == 'pagesC/login/index') {
					// 		return;
					// 	}
					// 	return uni.navigateTo({
					// 		url: '/pagesC/login/index?redirect=' + encodeURIComponent(currentPagePath.route)
					// 	})
					// }
					// // #endif
					// this.rolePopupStatus = true;
					// this.selectRoleIdentity = 0;
				}

			},
			upgradeAndGoPro(relativeLink) {
				if (relativeLink != '') {
					uni.navigateTo({
						url: relativeLink
					})
				} else {
					// #ifdef MP-WEIXIN
					let token = uni.getStorageSync('token');
					if (token == '') {
						var pages = getCurrentPages(); // 当前页面
						var currentPagePath = pages[pages.length - 1]; // 前一个页面

						if (currentPagePath.route == 'pagesC/login/index') {
							return;
						}
						return uni.navigateTo({
							url: '/pagesC/login/index?redirect=' + encodeURIComponent(currentPagePath.route)
						})
					}
					// #endif
					let identity = uni.getStorageSync('identity');

					if (identity && identity > 0) {
						uni.navigateTo({
							url: '/pagesB/me/upgrade'
						})
					}
				}

			},
			miniLogin() {
				let token = uni.getStorageSync('token')
				if (token == '') {
					var pages = getCurrentPages(); // 当前页面
					var currentPagePath = pages[pages.length - 1]; // 前一个页面

					if (currentPagePath.route == 'pagesC/login/index') {
						return;
					}
					return uni.navigateTo({
						url: '/pagesC/login/index?redirect=' + encodeURIComponent(currentPagePath.route)
					})
				} else {
					this.rolePopupStatus = true;
					this.selectRoleIdentity = 0;
				}

			},
			turnArticle(link) {
				if (link != '') {
					// #ifdef MP-WEIXIN
					uni.navigateTo({
						url: '/pagesD/webview/webview?url=' + link
					})
					// #endif
					// #ifdef H5
					window.location.href = link;
					// #endif
				}
			}

		},
		onShareAppMessage: function(res) {
			console.log(res)
			return {
				title: 'ESL Passport',
				path: '/pages/home/index'
			}
		},
		onShareTimeline: function(res) {
			console.log(res)
			return {
				title: 'ESL Passport',
				path: '/pages/home/index'
			}

		},
		onAddToFavorites: function() {

		},
		onReady: function() {
			console.log('on Ready')
		}
	}
</script>

<style>
	/* banner 750 * 340   750 * 240 */
	@import url("@/common/home/index.css");
	@import url("@/common/home/role-popup.css");
	@import url("@/common/jobs/latest-jobs.css");
	@import url("@/common/deals/recent-deals.css");

	.swiper-item-bg {
		background-position: center;
		background-size: 100% 100%;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		padding-top: 120rpx;
		padding-left: 60rpx;
		padding-right: 60rpx;
	}

	.swiper-item-bg image {
		width: 120rpx;
		height: 120rpx;
	}

	.qrcode-image {
		width: 120rpx;
		height: 100rpx;
		/* border: 1rpx solid #EEEEEE; */
	}

	.official-account {
		width: 96%;
		margin: 0 auto;
		margin-top: 40rpx;
	}

	.home-signup {
		width: 50%;
		margin: 40rpx auto 0;

	}

	.home-signup button {
		background-color: #B1C452;
		color: #FFFFFF;
		font-size: 30rpx;
	}
</style>
