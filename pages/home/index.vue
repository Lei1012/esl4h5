<template>
	<view class="uni-flex uni-column index-bg">
		<view class="flex-item flex-item-V ">
			<view class="page-section swiper">
				<view class="page-section-spacing">
					<swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval"
						:duration="duration">
						<swiper-item v-for="(item,index) in adsListTop" :key="index" @click="turnBanner(item.relative_link,item.link)">
							<view class="swiper-item">
								<image :src="item.url" mode="scaleToFit" lazy-load="true"></image>
							</view>
						</swiper-item>
					</swiper>
				</view>
			</view>
		</view>
		<view class="flex-item flex-item-V index-box">

			<view class="index-box-box" v-if="identity==1">
				<view class="index-box-item" @click="searchJobs">
					<image src="/static/esl/search-jobs.png" class="image" mode="aspectFit" />
					<text class="text">{{i18n.homesearchjobs}}</text>
				</view>
				<view class="index-box-item" @click="showDiscountStatus=true">
					<image src="/static/esl/discount.png" class="image" mode="aspectFit" />
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
					<image src="/static/esl/discount.png" class="image" mode="aspectFit" />
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
					<image src="/static/esl/discount.png" class="image" mode="aspectFit" />
					<text class="text">{{i18n.homediscountcard}}</text>
				</view>
				<!-- <view class="index-box-item" @click="showDiscountStatus=true">
					<image src="/static/esl/discount.png" class="image" mode="aspectFit" /> 
					<text class="text">{{i18n.homediscountcard}}</text>
				</view> -->
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

			<view class="index-box-box" v-if="identity==4 || identity == 0">
				<!-- @click="openIdentity(1)" -->
				<view class="index-box-item" @click="searchJobs">
					<image src="/static/esl/search-jobs.png" class="image" mode="aspectFit" />
					<!-- #ifdef H5 -->
					<text class="text">{{i18n.homesearchjobs}}</text>
					<!-- #endif -->
					<!-- #ifdef MP-WEIXIN -->
					<text class="text">{{i18n.homesearchgigs}}</text>
					<!-- #endif -->
					
				</view>
				<view class="index-box-item" @click="turnDeals">
					<image src="/static/esl/deals.png" class="image" mode="aspectFit" />
					<text class="text">{{i18n.homedeals}}</text>
				</view>
				<view class="index-box-item" @click="showContactStatus=true">
					<image src="/static/esl/help.png" class="image" mode="aspectFit" />
					<text class="text">{{i18n.homehelp}}</text>
				</view>
				<view class="index-box-item" @click="openIdentity(2)">
					<image src="/static/esl/post-a-job.png" class="image" mode="aspectFit" />
					<!-- #ifdef H5 -->
					<text class="text">{{i18n.homepostjobs}}</text>
					<!-- #endif -->
					<!-- #ifdef MP-WEIXIN -->
					<text class="text">{{i18n.homepostgigs}}</text>
					<!-- #endif -->
				</view>
				<view class="index-box-item" @click="openIdentity(3)">
					<image src="/static/esl/deals.png" class="image" mode="aspectFit" />
					<text class="text">{{i18n.homecreatedeal}}</text>
				</view>
				<view class="index-box-item" @click="showDiscountStatus=true">
					<image src="/static/esl/discount.png" class="image" mode="aspectFit" />
					<text class="text">{{i18n.homediscountcard}}</text>
				</view>
			</view>
		</view>
		<!-- #ifdef H5 -->
		<view class="flex-item flex-item-V latest-jobs"
			v-if="(identity==1 && jobList.length>0) || (identity==4 && jobList.length>0) || (identity==0 && jobList.length>0)">
			<view class="latest-jobs-title">
				{{i18n.homefeatjobs}}
			</view>
			<swiper class="latest-jobs-swiper" circular :indicator-dots="false" :autoplay="true" interval="2000">
				<swiper-item v-for="(item,index) in jobList" :key="index">
					<view class="latest-jobs-item ">
						<view class="latest-jobs-item-top" @click="turnJobDetail(item.id)">
							<view class="latest-jobs-item-l">
								<image :src="item.logo !='' ? item.logo : 'https://oss.esl-passport.cn/business.png' "
									mode="aspectFit" lazy-load></image>
							</view>
							<view class="latest-jobs-item-r">
								<view class="latest-jobs-item-r-1">
									<view class="job-title">{{item.job_title}}</view>
									<view class="jobs-view">
										<image src="@/static/view_line.png" mode="aspectFit"></image>
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
		
								<view class="latest-jobs-item-r-3">
									<view class="interview-name">
										{{item.business_name}}
									</view>
									<view class="job-location">
										{{item.job_location}}
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
		<!-- #endif -->
		
		<!-- #ifdef MP-WEIXIN -->
		<view class="flex-item flex-item-V latest-jobs"
			v-if="(identity==1 && jobList.length>0)">
			<view class="latest-jobs-title">
				{{i18n.homefeatjobs}}
			</view>
			<swiper class="latest-jobs-swiper" circular :indicator-dots="false" :autoplay="true" interval="2000">
				<swiper-item v-for="(item,index) in jobList" :key="index">
					<view class="latest-jobs-item ">
						<view class="latest-jobs-item-top" @click="turnJobDetail(item.id)">
							<view class="latest-jobs-item-l">
								<image :src="item.logo !='' ? item.logo : 'https://oss.esl-passport.cn/business.png' "
									mode="aspectFit" lazy-load></image>
							</view>
							<view class="latest-jobs-item-r">
								<view class="latest-jobs-item-r-1">
									<view class="job-title">{{item.job_title}}</view>
									<view class="jobs-view">
										<image src="@/static/view_line.png" mode="aspectFit"></image>
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
		
								<view class="latest-jobs-item-r-3">
									<view class="interview-name">
										{{item.business_name}}
									</view>
									<view class="job-location">
										{{item.job_location}}
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
		<!-- #endif -->
		

		<view class="flex-item flex-item-V latest-deals"
			v-if="(identity==3 && recentDealsList.length>0) || (identity==4 && recentDealsList.length>0) || (identity==0 && recentDealsList.length>0)">
			<view class="latest-deals-title">
				{{i18n.dealsrecentdeals}}
			</view>
			<swiper class="latest-deals-swiper" :indicator-dots="false" :autoplay="true" :interval="2000">
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

		<view class="flex-item events-slider" v-if="identity == 0 || identity==4">
			<swiper class="swiper" :indicator-dots="false" :autoplay="true" :interval="5000" :duration="600">
				<swiper-item style="height: 306rpx;" v-for="(item,index) in dealsAdsListMid" :key="index"
					@click="turnBanner(item.relative_link,item.link)">
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
					<swiper-item v-for="(item,index) in adsListMid" :key="index" @click="turnBanner(item.relative_link,item.link)">
						<view class="swiper-item">
							<image :src="item.url" mode="widthFix" lazy-load="true"></image>
						</view>
					</swiper-item>
				</swiper>
			</view>
		</view>
		<view class="flex-item  why-esl-passport">
			<view class="why-esl-passport-title">
				{{i18n.homebannerfollowus}}
			</view>
			<view class="why-esl-passport-img">
				<swiper class="why-esl-passport-img-swiper" :indicator-dots="false" :autoplay="true" :interval="6000"
					:duration="500">
					<swiper-item v-for="(item,index) in adsListBottom" :key="index" @click="turnBanner(item.relative_link,item.link)">
						<view class="swiper-item">
							<image :src="item.url" mode="widthFix" lazy-load="true"></image>
						</view>
						<!-- <view class="swiper-item swiper-item-bg" :style="{backgroundImage:'url('+item.url+')'}"> -->
							<!-- <view class="qrcode-image" @click="qrcodeType = 1;showQrcode=true"></view>
							<view class="qrcode-image" @click="qrcodeType = 2;showQrcode=true"></view>
							<view class="qrcode-image" @click="qrcodeType = 3;showQrcode=true"></view>
							<view class="qrcode-image" @click="qrcodeType = 4;showQrcode=true"></view>
							<view class="qrcode-image" @click="qrcodeType = 5;showQrcode=true"></view> -->
						<!-- </view> -->
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
		<aTip :isCustom="false" text='Add to my mini program' :closeColor="false"></aTip>
		<!-- #endif -->

		<!-- howpostjob -->
		<how-post-job @close="showPostJobStatus=false" :showPostJobStatus="showPostJobStatus"></how-post-job>
		<!-- #ifdef MP-WEIXIN -->
		<official-account class="official-account"></official-account>
		<!-- #endif -->
	</view>

</template>

<script>
	import profile from '@/api/profile.js';
	import deals from '@/api/deals.js';
	import login from '@/api/login.js';
	import jobs from '@/api/jobs.js';
	import ads from '@/api/ads.js';

	import contactus from "@/components/xll-contact-us/xll-contact-us.vue";
	import discountcard from "@/components/xll-discount-card/xll-discount-card.vue";
	import xllwechatofficialaccount from "@/components/xll-wechat-official-account/xll-wechat-official-account.vue"
	import selectRolePopup from '@/components/select-role-popup/select-role-popup.vue'

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
				interval: 2000,
				duration: 500,
				language: 'en-US',
				languageValue: 2,

				is_educator: 0,
				is_business: 0,
				is_vendor: 0,
				is_other: 0,
				identity: 0, //当前身份、
				mobile: '', // 用户手机号

				jobList: [],

				adsList: [],
				adsListTop: [],
				adsListMid: [],
				adsListBottom: [],
				dealsAdsListTop: [],
				dealsAdsListMid: [],
				dealsAdsListBottom: [],

				showDiscountStatus: false,
				showContactStatus: false,

				profilePercentValue: 0,
				recentDealsList: [],

				selectRoleIdentity: 0,
				showOfficialStatus: false,

				showPostJobStatus: false,


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
		onShow() {
			this.getAdsList();
			this.getDealsAdsList();
		},
		computed: {
			i18n() {
				return this.$t('index')
			}
		},
		onUnload() {
			uni.$off('changeIdentity');
		},
		onLoad(option) {

			var that = this;
			let wxcode = option.code;
			let reLoginStatus = option.reLogin;
			let uid = uni.getStorageSync('uid');
			let token = uni.getStorageSync('token');
			let language = uni.getStorageSync('language');

			that.identity = uni.getStorageSync('identity');
			if(that.identity != 0){
				uni.setTabBarItem({
					index: 1,
					text: this.i18n.tabbarjobs
				})
			}

			uni.$on('changeIdentity', function(data) {
				console.log('监听到事件来自 changeIdentity ，携带参数 identity 为：' + data);
				that.identity = data;
				// #ifdef MP-WEIXIN
				if(data == 0){
					uni.setTabBarItem({
						index:1,
						text:'Events'
					})
				}
				// #endif
				
			})

			if (token == '') {
				console.log('token空，需要登录')
				// #ifdef H5
				if (wxcode != '' && wxcode != null && wxcode != undefined) {
					that.getUserInfo(wxcode)
					that.updateBusProfile()
				}
				// #endif

			} else {
				console.log('token已存在')
				//获取职位列表
				this.getJobsList();
				this.getRecentDealsList(1, 6);

				let data = {
					token: token,
					id: uid
				}
				profile.getBasicInfo(data).then(res => {
					console.log(res)
					if (res.code == 200) {
						uni.setStorageSync('unionid', res.message.unionid)
						uni.setStorageSync('phone', res.message.phone)
						uni.setStorageSync('nickname', res.message.nickname)
						uni.setStorageSync('uid', res.message.id)
						uni.setStorageSync('identity', res.message.identity)
						that.is_educator = res.message.is_educator;
						that.is_business = res.message.is_business;
						that.is_vendor = res.message.is_vendor;
						that.is_other = res.message.is_other;
						that.identity = res.message.identity;
						that.mobile = res.message.phone;
						// #ifdef H5
						let subscribeValue = res.message.subscribe;
						if (subscribeValue === 0) {
							this.showOfficialStatus = true
						}
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
			}

			if (language != '') {
				if (language == 'zh-CN') {
					uni.setStorageSync("language", 'zh-CN')
					this.language = 'zh-CN';
					this.languageValue = 1;
					this._i18n.locale = 'zh-CN';
				}
				if (language == 'en-US') {
					this.language = 'en-US';
					this.languageValue = 2;
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
				if(that.identity == 0){
					uni.setTabBarItem({
						index:1,
						text:'Events'
					})
				}else{
					uni.setTabBarItem({
						index: 1,
						text: this.i18n.tabbarjobs
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
			openIdentity(identity) {
				this.rolePopupStatus = true;
				this.selectRoleIdentity = identity;
			},
			getRecentDealsList(page, limit) {
				let data = {
					token: uni.getStorageSync('token'),
					page: page,
					limit: limit
				}
				deals.dealsList(data).then(res => {
					console.log(res)
					if (res.code == 200) {
						this.recentDealsList = res.message.data;
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
				let identity = uni.getStorageSync('identity')
				if (identity == 0) {
					this.rolePopupStatus = true;
					this.selectRoleIdentity = 0;
				} else {
					// #ifdef H5
					var url = window.location.href;
					var origin = window.location.origin;
					let turn_url = origin + '/esl_h5/pages/me/deals/detail?id=' + id;
					window.location.href = turn_url;
					// #endif

					// #ifndef H5
					uni.navigateTo({
						url: '/pages/me/deals/detail?id=' + id
					})
					// #endif
				}

			},
			closeQrcode() {
				this.showQrcode = false;
			},
			closeContact(e) {
				// console.log(e)
				this.showContactStatus = false;
			},
			closeDiscount(e) {
				this.showDiscountStatus = false;
			},
			changeIndicatorDots(e) {
				this.indicatorDots = !this.indicatorDots
			},
			changeAutoplay(e) {
				this.autoplay = !this.autoplay
			},
			intervalChange(e) {
				this.interval = e.target.value
			},
			durationChange(e) {
				this.duration = e.target.value
			},
			selectMemberType: function() {
				uni.reLaunch({
					url: '/pages/me/member'
				})
			},
			postJob() {
				let uid = uni.getStorageSync('uid')
				let data = {
					user_id: uid
				}
				profile.getUserIntegrity(data).then(res => {
					// console.log(res)
					if (res.code == 200) {
						let percentValue = res.message.is_business
						// this.profilePercentValue = res.message.is_business;
						if (percentValue < 50) {
							uni.reLaunch({
								url: '/pages/me/business/prompt'
							})
						} else {
							uni.navigateTo({
								url: '/pages/jobs/jobs?jobmd5=' + this.$u.guid(32)
							})
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
			turnMyProfile: function() {
				if (this.identity == 1) {
					// #ifdef H5
					var url = window.location.href;
					var origin = window.location.origin;
					let turn_url = origin + '/esl_h5/pages/me/educator/home';
					window.location.href = turn_url;
					// #endif
					// #ifndef H5
					uni.navigateTo({
						url: '/pages/me/educator/home'
					})
					// #endif

				}
				if (this.identity == 2) {
					// #ifdef H5
					var url = window.location.href;
					var origin = window.location.origin;
					let turn_url = origin + '/esl_h5/pages/me/business/home';
					window.location.href = turn_url;
					// #endif
					// #ifndef H5
					uni.navigateTo({
						url: '/pages/me/business/home'
					})
					// #endif

				}
				if (this.identity == 3) {
					// #ifdef H5
					var url = window.location.href;
					var origin = window.location.origin;
					let turn_url = origin + '/esl_h5/pages/me/vendor/home';
					window.location.href = turn_url;
					// #endif
					// #ifndef H5
					uni.navigateTo({
						url: '/pages/me/vendor/home'
					})
					// #endif

				}

			},
			turnDeals() {
				uni.switchTab({
					url: '/pages/menu/deals'
				})
			},
			turnMyDeals() {
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
								url: '/pages/me/deals/add'
							})
						} else {
							uni.navigateTo({
								url: '/pages/me/deals/index'
							})
						}
					}
				}).catch(error => {
					console.log(error)
				})

			},
			turnMyEvents() {
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
								url: '/pages/me/events/add'
							})
						} else {
							uni.navigateTo({
								url: '/pages/me/events/index'
							})
						}
					}
				}).catch(error => {
					console.log(error)
				})

			},
			searchJobs() {
				let identity = uni.getStorageSync('identity');
				if(identity == 0){
					this.rolePopupStatus = true;
					this.selectRoleIdentity = 1;
					return;
				}
				uni.switchTab({
					url: '/pages/menu/job'
				});
			},
			getCode() {
				var that = this;
				const appid = that.appid
				const redirect_uri = encodeURIComponent(that.redirect_uri)
				const response_type = that.response_type
				const scope = that.scope
				const state = that.state
				const url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + appid + '&redirect_uri=' +
					redirect_uri +
					'&response_type=' + response_type + '&scope=' + scope + '&state=' + state + '#wechat_redirect'
				// 截取地址中的code，如果没有code就去微信授权，如果已经获取到code了就直接把code传给后台获取openId
				// console.log(url)
				let code = this.getUrlCode('code')
				if (code === null || code === '') {
					window.location.href = url
				}

			},
			getCodeRefresh() {
				var that = this;
				const appid = that.appid
				const redirect_uri = encodeURIComponent(that.redirect_uri)
				const response_type = that.response_type
				const scope = that.scope
				const state = that.state
				const url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + appid + '&redirect_uri=' +
					redirect_uri +
					'&response_type=' + response_type + '&scope=' + scope + '&state=' + state + '#wechat_redirect'
				// 截取地址中的code，如果没有code就去微信授权，如果已经获取到code了就直接把code传给后台获取openId
				// console.log(url)
				window.location.href = url

			},
			getUrlCode(name) {
				return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) ||
					[, ''
					])[1]
					.replace(/\+/g, '%20')) || null
			},
			isWechat() {
				// return String(navigator.userAgent.toLowerCase().match(/MicroMessenger/i)) === "micromessenger";
				return true;
			},
			getUserInfo: function(code) {
				var that = this;
				let data = {
					code: code,
					platform: 'mp'
				}
				login.getUserInfoByWxCode(data).then(res => {
					console.log(res)
					if (res.code == 200) {
						let message = res.message;
						let unionid = message.unionid;
						let phone = message.phone;
						let token = message.token;

						// #ifdef H5
						let subscribeValue = res.message.subscribe;

						if (subscribeValue === 0) {
							this.showOfficialStatus = true
						}
						// #endif

						uni.setStorageSync('unionid', unionid)
						uni.setStorageSync('phone', phone)
						uni.setStorageSync('nickname', message.nickname)
						uni.setStorageSync('token', token)
						uni.setStorageSync('uid', message.id)
						uni.setStorageSync('identity', message.identity)

						this.is_educator = message.is_educator;
						this.is_business = message.is_business;
						this.is_vendor = message.is_vendor;
						this.is_other = message.is_other;
						this.identity = message.identity;
						this.mobile = message.phone;

						if (message.language == 0) {
							this.languageValue = 2;
						} else {
							this.languageValue = message.language;
						}
						if (message.language == 1) {
							uni.setStorageSync('language', 'zh-CN')
						}
						if (message.language == 2) {
							uni.setStorageSync('language', 'en-US')
						}

						// 用户第一次进入 没有选择身份
						// if (message.identity == 0) {
						// 	this.rolePopupStatus = true;
						// }

						// 如果用户educator
						// if (message.identity == 1) {
						// 	if (message.is_educator == 0) {
						// 		uni.reLaunch({
						// 			url: '../role/educator'
						// 		})
						// 	}
						// }
						// 如果用户business
						// if (message.identity == 2) {
						// 	if (message.is_business == 0) {
						// 		uni.reLaunch({
						// 			url: '../role/business'
						// 		})
						// 	}
						// }
						// 如果用户vendor
						// if (message.identity == 3) {
						// 	if (message.is_vendor == 0) {
						// 		uni.reLaunch({
						// 			url: '../role/vendor'
						// 		})
						// 	}
						// }
						// 如果用户other

						//获取职位列表
						this.getJobsList();
						this.getRecentDealsList(1, 6)


					}
					if (res.code == 400) {
						uni.removeStorageSync('token')
						this.getCodeRefresh();
					}
				}).catch(err => {
					console.log(err)
				})

			},
			getJobsList() {
				let data = {
					token: uni.getStorageSync('token'),
					ad_type: 1
				}
				jobs.featureList(data).then(res => {
					console.log(res);
					if (res.code == 200) {
						this.jobList = res.message;
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
					limit: 100,
					cate: 1
				}
				ads.list(data).then(res => {
					console.log(res)
					if (res.code == 200) {
						this.adsListTop = res.message.data.filter(item => item.position == 1)
						this.adsListMid = res.message.data.filter(item => item.position == 2)
						this.adsListBottom = res.message.data.filter(item => item.position == 3)
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
			getDealsAdsList() {
				let data = {
					page: 1,
					limit: 1000,
					cate: 6
				}
				ads.list(data).then(res => {
					console.log(res)
					if (res.code == 200) {
						this.dealsAdsListTop = res.message.data.filter(item => item.position == 1)
						this.dealsAdsListMid = res.message.data.filter(item => item.position == 2)
						this.dealsAdsListBottom = res.message.data.filter(item => item.position == 3)
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

				let identity = uni.getStorageSync('identity')
				if (identity == 4 || identity == 0) {
					this.rolePopupStatus = true;
					this.selectRoleIdentity = 0
				} else {
					// #ifdef H5
					var url = window.location.href;
					var origin = window.location.origin;
					let turn_url = origin + '/esl_h5/pages/jobs/details?id=' + id;
					window.location.href = turn_url;
					// #endif
					// #ifndef H5
					uni.navigateTo({
						url: '/pages/jobs/details?id=' + id
					})
					// #endif
				}
			},
			applyJobs(id) {
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
			turnBanner(relativeLink,link) {
				// if (link != '') {
				// 	window.location.href = link;
				// }
				let identity = uni.getStorageSync('identity');
				if(identity == 0){
					if(link !=''){
						uni.navigateTo({
							url:'/pages/webview/webview?url='+link
						})
					}else{
						this.showContactStatus=true;
					}
				}else{
					if(relativeLink != ''){
						uni.navigateTo({
							url:relativeLink
						})
					}else{
						this.showContactStatus=true;
					}
					
				}
				

			},



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
			var _this = this;
			let token = uni.getStorageSync('token')

			if (token == '') {
				// #ifdef H5
				let code = _this.getUrlCode('code')
				if (code == null || code == '') {
					this.getCode();
				}
				// #endif
				
				// #ifdef MP-WEIXIN
				// uni.navigateTo({
				// 	url: '/pages/login/index'
				// })
				// #endif

			}
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
	
	.official-account{
		width: 96%;
		margin: 0 auto;
		margin-top: 40rpx;
	}
</style>
