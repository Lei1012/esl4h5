<template>
	<view class="uni-flex uni-column list">

		<HMfilterDropdown  v-if="!showEventStatus" :filterData="filterData" :defaultSelected="defaultSelected" @confirm="confirm"></HMfilterDropdown>

		<view class="empty" v-if="showEmptyStatus">
			<u-empty :text="i18n.emptytips1"  mode="list"></u-empty>
		</view>
		
		<view class="event-list" v-if="showEventStatus">
			<view class="event-list-item" v-for="(item,index) in eventsList" :key="item.id">
				<view class="events-tips">Events</view>
				<view class="event-list-item-l">
					<view class="event-interview-photo">
						<image @click="turnVendorProfile(item.user_id)" :src="item.user_info.logo" mode="aspectFill">
						</image>
					</view>
				</view>
				<view class="event-list-item-r" @click="turnEventDetail(item.id)">

					<view class="event-list-item-t">
						<view class=" event-list-item-1">
							<view class="event-list-item-name" v-if="item.user_info.vendor_name_en">
								{{item.user_info.vendor_name_en}}
							</view>
							<view class="event-list-item-title">{{item.name}}</view>
						</view>
						<view class="event-list-item-2">
							<view class="event-tags-item" v-if="item.event_place && item.event_place != 0">
								<text>{{item.event_place}}</text>
							</view>
							<view class="event-tags-item">
								<text v-if="item.is_all==1">Social</text>
								<text v-if="item.is_all==2">Professional</text>
							</view>
						</view>
					</view>
					<view class="event-list-item-b">
						<view class="event-location" v-if="item.citys">{{item.citys.Pinyin}}</view>
						<view class="event-date">{{item.date}}</view>
					</view>
				</view>
			</view>
			<u-loadmore :status="status" :load-text="loadText" bgColor="#f4f5f6" />
		</view>

		<view class="flex-item  list-container " v-if="!showEmptyStatus && !showEventStatus">
			<view class="flex-item flex-item-V latest-jobs" v-if="recentJobList.length>0 ">
				<view class="latest-jobs-title">{{i18n.homefeatjobs}}</view>
				<swiper class="latest-jobs-swiper  " :indicator-dots="false" :autoplay="true" interval="1500"
					:circular="true">
					<swiper-item  v-for="(item,index) in recentJobList" :key="index">
						<view class="latest-jobs-item ">
							<view class="latest-jobs-item-top" @click="turnJobDetail(item.id)">
								<view class="latest-jobs-item-l">
									<image  :src="item.logo ? item.logo : 'https://oss.esl-passport.cn/business.png'" mode="aspectFit"></image>
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
									<view class="latest-jobs-item-r-3">
										<view class="interview-name">
											{{item.business_name}}
										</view>
										<view class="job-location"
											v-if="item.citys && languageValue=='en-US' ">
											{{item.citys.Pinyin}}
										</view>
										<view class="job-location" v-if="item.citys && languageValue=='zh-CN' ">
											{{item.citys.ShortName}}
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

			<view class="list-item " v-for="(item,index) in jobsListOne" :key="item.id" @click="turnJobDetail(item.id)">
				<view class="list-item-l">
					<view class="list-item-l-circle">
						<image  :src="item.logo ? item.logo : 'https://oss.esl-passport.cn/business.png'" mode="aspectFit"></image>
					</view>
				</view>
				<view class="list-item-r">
					<view class="list-item-r-t">
						<view class="job-title">{{item.job_title}}</view>
						<view class="jobs-view">
							<uni-icons type="eye" size="14"></uni-icons>
							<text>{{item.views}}</text>
						</view>
					</view>
					<view class="list-item-2">
						<view class="salary">
							<text v-if="item.currency=='CNY'">¥</text>
							<text v-if="item.currency=='USD'">$</text>
							<text v-if="item.currency!='CNY' && item.currency !='USD'">{{item.currency}}</text>
							<text>{{item.salary_min}}-{{item.salary_max}}</text>
						</view>
						<view class="job-type" v-if="item.employment_type==1">{{i18n.jobslistemploymentfulltime}}</view>
						<view class="job-type" v-if="item.employment_type==2">{{i18n.jobslistemploymentparttime}}</view>
						<view class="job-type" v-if="item.employment_type==3">{{i18n.jobslistemploymentseasonal}}</view>
					</view>
					<view class="list-item-4">
						<view class="interview-name">
							{{item.business_name}}
						</view>
						<view class="job-location"
							v-if="item.citys && languageValue=='en-US' ">
							{{item.citys.Pinyin}}
						</view>
						<view class="job-location" v-if="item.citys && languageValue=='zh-CN' ">
							{{item.citys.ShortName}}
						</view>
					</view>
				</view>
			</view>

			<view class="flex-item xll-ads">
				<swiper class="xll-ads-swiper" :indicator-dots="false" :autoplay="true" :interval="4000"
					:duration="500">
					<swiper-item v-for="(item,index) in jobsAdsListBottom" :key="index">
						<view class="swiper-item">
							<image :src="item.url" @click="turnBanner(item.relative_link)" mode="widthFix"
								lazy-load="true">
							</image>
						</view>
					</swiper-item>
				</swiper>
			</view>

			<view class=" list-item" v-for="(item,index) in jobsListTwo" :key="index" @click="turnJobDetail(item.id)">
				<view class="list-item-l">
					<view class="list-item-l-circle">
						<image  :src="item.logo ? item.logo : 'https://oss.esl-passport.cn/business.png'" mode="aspectFit"></image>
					</view>
				</view>
				<view class="list-item-r">
					<view class="list-item-r-t">
						<view class="job-title">{{item.job_title}}</view>
						<view class="jobs-view">
							<uni-icons type="eye" size="14"></uni-icons>
							<text>{{item.views}}</text>
						</view>
					</view>
					<view class="list-item-2">
						<view class="salary">
							<text v-if="item.currency=='CNY'">¥</text>
							<text v-if="item.currency=='USD'">$</text>
							<text v-if="item.currency!='CNY' && item.currency !='USD'">{{item.currency}}</text>
							<text>{{item.salary_min}}-{{item.salary_max}}</text>
						</view>
						<view class="job-type" v-if="item.employment_type==1">{{i18n.jobslistemploymentfulltime}}</view>
						<view class="job-type" v-if="item.employment_type==2">{{i18n.jobslistemploymentparttime}}</view>
						<view class="job-type" v-if="item.employment_type==3">{{i18n.jobslistemploymentseasonal}}</view>

					</view>
					<view class="list-item-4">
						<view class="interview-name">
							{{item.business_name}}
						</view>
						<view class="job-location"
							v-if="item.citys && languageValue=='en-US'">
							{{item.citys.Pinyin}}
						</view>
						<view class="job-location" v-if="item.citys && languageValue=='zh-CN'">
							{{item.citys.ShortName}}
						</view>
					</view>
				</view>
			</view>

			<u-loadmore v-if="jobsListOne.length>0" :status="status" :load-text="loadText" bgColor="#f4f5f6" />
		</view>
		
		<contactus @close="closeContact" :showContact="showContactStatus"></contactus>
		<selectRolePopup :rolePopupStatus="rolePopupStatus" :selectRoleIdentity="selectRoleIdentity"
			@close="rolePopupStatus=false"></selectRolePopup>
		<u-no-network></u-no-network>
	</view>
</template>

<script>
	import HMfilterDropdown from '@/components/HM-filterDropdown/HM-filterDropdown.vue';
	import selectRolePopup from '@/components/select-role-popup/select-role-popup.vue';
	import contactus from "@/components/xll-contact-us/xll-contact-us.vue";
	import jobs from '@/api/jobs.js';
	import events from '@/api/events.js';
	import ads from '@/api/ads.js';
	import profile from '@/api/profile.js';

	export default {
		data() {
			var _this = this;
			return {
				jobsList: [],
				jobsListOne: [],
				jobsListTwo: [],
				jobsPage: 1,
				jobsLimit: 8,
				status: 'loadmore',
				jobsLastPage: 0,
				
				loadText: {
					loadmore: 'load more',
					loading: 'loading',
					nomore: 'no more'
				},
				showEmptyStatus: false,
				recentJobList: [],
				rolePopupStatus: false,
				selectRoleIdentity: 0,
				jobsAdsListBottom: [],
				showContactStatus: false,
				ageToTeachList: [],
				themeColor: '#0aa0a8',
				titleColor: '#000000',
				filterResult: '',
				defaultSelected: [],
				

				showEventStatus: false,
				eventsList: [],
				eventsPage: 1,
				eventsLimit: 10,
				eventsLastPage: 1,

			}
		},
		components: {
			selectRolePopup,
			contactus,
			HMfilterDropdown
		},
		computed: {
			i18n() {
				return this.$t('index')
			},
			languageValue(){
				let language = uni.getStorageSync('language');
				return language ? language : 'en-US';
			},
			filterData(){
				let token= uni.getStorageSync('token');
				if(token){
					this.getSubCateList()
				}
				return [{
						"name": this.$t('index').jobslistjobtype,
						"type": 'radio',
						"submenu": [{
							"name": this.$t('index').jobslistjobtype,
							"submenu": [{
									"name": this.$t('index').jobslistjobtypefulltime,
									"value": 1
								},
								{
									"name": this.$t('index').jobslistjobtypeparttime,
									"value": 2
								},
								{
									"name": this.$t('index').jobslistjobtypeseasonal,
									"value": 3
								}
							]
						}]
					},
					{
						"name": this.$t('index').jobfiltersalary,
						"type": 'radio',
						"submenu": [{
							"name":  this.$t('index').jobfiltersalary,
							"submenu": [{
									"name": this.$t('index').filterjobsalary1,
									"value": 1
								},
								{
									"name": this.$t('index').filterjobsalary2,
									"value": 2
								},
								{
									"name": this.$t('index').filterjobsalary3,
									"value": 3
								},
								{
									"name": this.$t('index').filterjobsalary4,
									"value": 4
								}

							]
						}]
					},
					{
						"name":this.$t('index').jobfiltergender,
						"type": 'radio',
						"submenu": [{
							"name": "Gender Specification",
							"submenu": [{
									"name": this.$t('index').jobslistgenderone,
									"value": 1
								},
								{
									"name": this.$t('index').jobslistgendertwo,
									"value": 2
								}

							]
						}]
					},
					{
						"name": this.$t('index').jobfilterfilter,
						"type": 'filter',
						"submenu": [{
								"name": "Student Age",
								"submenu": []
							}
						]
					}
				]
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
		},
		onLoad(option) {

			var _this = this;

			let token = uni.getStorageSync('token');
			let identity = uni.getStorageSync('identity');

			this.identity = identity;
			
			// #ifdef H5
			if(token){
				this.getRecentJobsList();
			}
			this.getJobsAdsList();
			this.getJobList(this.jobsPage, this.jobsLimit, this.filterResult);
			// #endif

			// #ifdef MP-WEIXIN
			if (token != '' && identity && identity != 0) {
				this.getRecentJobsList();
				this.getJobsAdsList();
				
				this.getJobList(this.jobsPage, this.jobsLimit, this.filterResult);
			} else {
				this.showEventStatus = true;
				uni.setNavigationBarTitle({
					title: 'Events'
				})
				this.getEventsList(_this.eventsPage, _this.eventsLimit, 0);
			}
			// #endif
			let language = this.languageValue;
			
			if (language) {
				if (language == 'zh-CN') {
					this._i18n.locale = 'zh-CN';
				}
				if (language == 'en-US') {
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
			turnEventDetail(id) {
				// #ifdef H5
				var url = window.location.href;
				var origin = window.location.origin;
				let turn_url = origin + '/esl_h5/pages/me/events/detail?id=' + id;
				window.location.href = turn_url;
				// #endif

				// #ifndef H5
				uni.navigateTo({
					url: '/pages/me/events/detail?id=' + id
				})
				// #endif
			},
			turnBanner(relativeLink) {
				if (relativeLink != '') {
					uni.navigateTo({
						url: relativeLink
					})
				} else {
					this.showContactStatus = true;
				}
			},
			//接收菜单结果
			confirm(e) {
				console.log(e)
				this.filterResult = e.value;
				this.jobsListOne = [];
				this.jobsListTwo = [];
				this.jobsPage = 1;
				
				this.getJobList(this.jobsPage, this.jobsLimit, this.filterResult);
			},

			closeContact(e) {
				// console.log(e)
				this.showContactStatus = false;
			},
			getJobsAdsList() {
				let data = {
					page: 1,
					limit: 10,
					cate: 2
				}
				ads.list(data).then(res => {
					console.log(res)
					if (res.code == 200) {
						this.jobsAdsListBottom = res.message.data.filter(item => item.position == 3)

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
			getRecentJobsList() {
				let data = {
					token: uni.getStorageSync('token'),
					ad_type: 2
				}
				jobs.featureList(data).then(res => {
					console.log(res);
					if (res.code == 200) {
						this.recentJobList = res.message;
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
			getJobList(page, limit, filterResult) {
				if (filterResult != '') {

					// console.log(this.filterResult)
					let filterResult = this.filterResult;
					let employmentType;
					let gender;
					let ageToTeach = [];
					let salaryBegin;
					let salaryEnd;

					filterResult.forEach((item, index) => {
						if (item[0].length > 0) {
							if (index == 0) {
								employmentType = item[0][0]
							}
							if (index == 1) {
								if (item[0][0] == 1) {
									salaryBegin = 0;
									salaryEnd = 5000;
								}
								if (item[0][0] == 2) {
									salaryBegin = 5000;
									salaryEnd = 10000;
								}
								if (item[0][0] == 3) {
									salaryBegin = 10000;
									salaryEnd = 15000;
								}
								if (item[0][0] == 4) {
									salaryBegin = 15000;
									// salaryEnd = 5000;
								}
							}
							if (index == 2) {
								gender = item[0][0]
							}
							if (index == 3) {
								ageToTeach = item[0]
							}
						}

					})
					// console.log(employmentType)
					var data = {
						token: uni.getStorageSync('token'),
						page: page,
						limit: limit
					}
					if (employmentType) {
						data.employment_type = employmentType
					}
					if (ageToTeach.length > 0) {
						data.age_to_teach = ageToTeach
					}
					if (gender) {
						data.sex = gender
					}
					if (salaryBegin) {
						data.salary_begin = salaryBegin;
					}
					if (salaryEnd) {
						data.salary_end = salaryEnd;
					}

				} else {
					var data = {
						token: uni.getStorageSync('token'),
						page: page,
						limit: limit
					}
				}

				jobs.jobList(data).then(res => {
					console.log(res)
					if (res.code == 200) {
						let jobData = res.message.data;
						if (jobData.length > 0) {
							this.showEmptyStatus = false;
						} else {
							this.showEmptyStatus = true;
						}
						
						if(page == 1){
							let jobsListOne = jobData.slice(0,3);
							let jobsListTwo = jobData.slice(3);
							this.jobsListOne = jobsListOne;
							this.jobsListTwo = jobsListTwo;
							
						}else{
							this.jobsListTwo = this.jobsListTwo.concat(jobData);
						}
						this.jobsLastPage = res.message.last_page;
						
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
				if (identity == 0) {
					this.rolePopupStatus = true;
					this.selectRoleIdentity = 0;
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
			getSubCateList(type) {

				let data = {
					token: uni.getStorageSync('token')
				}
				profile.getUserObjectList(data).then(res => {
					// console.log(res);
					if (res.code == 200) {
						let ageToTeachList = res.message.filter(item => item.pid === 4); //age to teach

						let lan = uni.getStorageSync('language')
						// console.log(ageToTeachList);
						ageToTeachList.forEach(item => {
							if (lan == 'zh-CN') {
								var obj = {
									name: item.object_cn,
									value: item.id
								}

							} else {
								var obj = {
									name: item.object_en,
									value: item.id
								}
							}
							this.filterData[3].submenu[0].submenu.push(obj)

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
			},

			getEventsList(page, limit, city_id) {
				let data = {
					token: uni.getStorageSync('token'),
					page: page,
					limit: limit,
					city: city_id
				}
				events.eventList(data).then(res => {
					console.log(res)
					if (res.code == 200) {
						let eventsData = res.message.data;
						this.eventsList = this.eventsList.concat(eventsData);
						this.eventsLastPage = res.message.last_page;
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

		},
		onShareAppMessage: function() {

		},
		onShareTimeline: function() {

		},
		onAddToFavorites: function() {

		},
		onReachBottom: function() {
			console.log('bottom')
			if (this.showEventStatus) {
				if (this.eventsPage >= this.eventsLastPage) return;
				this.status = 'loading';
				this.eventsPage++;
				setTimeout(() => {
					this.getEventsList(this.eventsPage, this.eventsLimit, 0);
					if (this.eventsPage >= this.eventsLastPage) {
						this.status = 'nomore';
					} else {
						this.status = 'loading';
					}
				}, 1200)
			} else {
				if (this.jobsPage >= this.jobsLastPage) return;
				this.status = 'loading';
				this.jobsPage++;
				setTimeout(() => {
					this.getJobList(this.jobsPage, this.jobsLimit, this.filterResult);
					if (this.jobsPage >= this.jobsLastPage) {
						this.status = 'nomore';
					} else {
						this.status = 'loading';
					}
				}, 1000)
			}
		},
		onPullDownRefresh: function() {
			this.jobsPage = 1;
			this.jobsListOne = [];
			this.jobsListTwo =[];
			this.jobsLimit = 8;
			this.jobsLastPage = 0;
			this.getJobList(this.jobsPage,this.jobsLimit ,this.filterResult);
			this.getRecentJobsList();
			
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},

	}
</script>

<style>
	@import url("@/common/jobs/list.css");
	@import url("@/common/jobs/latest-jobs.css");
	@import url("@/common/deals/events.css");
</style>
