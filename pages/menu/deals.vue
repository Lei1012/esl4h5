<template>
	<view class="uni-flex uni-column index-bg">
		<view class="flex-item flex-item-V " style="margin-top: 120rpx;">
			<view class="page-section swiper">
				<view class="page-section-spacing">
					<swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval"
						:duration="duration">
						<swiper-item v-for="(item,index) in adsListTop" :key="index"
							@click="turnBanner(item.relative_link)">
							<view class="swiper-item">
								<image :src="item.url" mode="widthFix" lazy-load="true"></image>
							</view>
						</swiper-item>
					</swiper>
				</view>
			</view>
		</view>

		<HMfilterDropdown :menuTop="0" :updateMenuName="false" :filterData="filterData"
			:defaultSelected="defaultSelected" @confirm="confirm">
		</HMfilterDropdown>

		<!-- <view class="flex-item flex-item-V latest-deals" v-if="recentDealsList.length>0">
			<view class="latest-deals-title">
				{{i18n.dealsrecentdeals}}
			</view>
			<swiper class="latest-deals-swiper" :indicator-dots="false" :autoplay="true" :interval="4000">
				<swiper-item v-for="(item,index) in recentDealsList" :key="item.id" @click="turnDealsDetail(item.id)">
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
		</view> -->

		<view class="xll-deals-list">

			<view class=" list-item" v-for="(item,index) in eventsOneList" :key="item.id + 90">
				<view class="list-item-l">
					<view class="interview-photo">
						<image @click="turnVendorProfile(item.user_id)" :src="item.user_info.logo" mode="aspectFill">
						</image>
					</view>
				</view>
				<view class="list-item-r" @click="turnEventDetail(item.id)">
					<view class="list-item-t">
						<view class=" list-item-1">
							<view class="list-item-name" v-if="item.user_info.vendor_name_en">
								{{item.user_info.vendor_name_en}}
							</view>
							<view class="list-item-title">{{item.name}}</view>
						</view>
						<view class="list-item-2">
							<view class="tags-item" v-if="item.event_place && item.event_place != 0">
								<text>{{item.event_place}}</text>
							</view>
							<view class="tags-item">
								<text v-if="item.is_all==1">Social</text>
								<text v-if="item.is_all==2">Professional</text>
							</view>
						</view>
					</view>
					<view class="list-item-b">
						<view class="location">{{item.location}}</view>
						<view class="date">{{item.date}}</view>
					</view>
				</view>
			</view>

			<view class=" list-item" v-for="(item,index) in dealsOneList" :key="item.id">
				<view class="list-item-l">
					<view class="interview-photo">
						<image @click="turnVendorProfile(item.user_id)" :src="item.user_info.logo" mode="aspectFit">
						</image>
					</view>
				</view>
				<view class="list-item-r" @click="turnDealsDetail(item.id)">
					<view class="list-item-name">{{item.user_info.vendor_name_en}}</view>
					<view class="list-item-title">{{item.title}}</view>
					<view class="list-item-2">
						<view class="tags-item tag-all-locations" v-if="item.is_all==1">
							All Locations
						</view>
						<view class="tags-item tag-limit" v-if="item.is_all==2">
							Limited
						</view>
						<view class="tags-item tag-deal" v-if="item.type==1">
							Deal
						</view>
						<view class="tags-item tag-discount" v-if="item.type==2">
							Discount
						</view>
						<view class="tags-item tag-dog-friendly" v-if="item.allowed_dog==1">
							<text>Dog Friendly</text>
						</view>

					</view>
				</view>
			</view>

			<view class="flex-item events-slider">
				<swiper class="swiper" :indicator-dots="false" :autoplay="true" :interval="5000" :duration="600">
					<swiper-item v-for="(item,index) in adsListMid" :key="index"
						@click="turnBanner(item.relative_link)">
						<view class="swiper-item">
							<image :src="item.url" mode="widthFix" lazy-load="true"></image>
						</view>
					</swiper-item>
				</swiper>
			</view>

			<view class=" list-item" v-for="(item,k) in dealsTwoList" :key="item.id">
				<view class="list-item-l">
					<view class="interview-photo">
						<image @click="turnVendorProfile(item.user_id)" :src="item.user_info.logo" mode="aspectFit">
						</image>
					</view>
				</view>
				<view class="list-item-r" @click="turnDealsDetail(item.id)">
					<view class="list-item-name">{{item.user_info.vendor_name_en}}</view>
					<view class="list-item-title">{{item.title}}</view>
					<view class="list-item-2">
						<view class="tags-item tag-all-locations" v-if="item.is_all==1">
							All Locations
						</view>
						<view class="tags-item tag-limit" v-if="item.is_all==2">
							Limited
						</view>
						<view class="tags-item tag-deal" v-if="item.type==1">
							Deal
						</view>
						<view class="tags-item tag-discount" v-if="item.type==2">
							Discount
						</view>
						<view class="tags-item tag-dog-friendly" v-if="item.allowed_dog==1">
							<text>Dog Friendly</text>
						</view>

					</view>
				</view>
			</view>

			<view class=" list-item" v-for="(item,index) in eventsTwoList" :key="item.id + 100">
				<view class="list-item-l">
					<view class="interview-photo">
						<image @click="turnVendorProfile(item.user_id)" :src="item.user_info.logo" mode="aspectFill">
						</image>
					</view>
				</view>
				<view class="list-item-r" @click="turnEventDetail(item.id)">
					<view class="list-item-t">
						<view class=" list-item-1">
							<view class="list-item-name" v-if="item.user_info.vendor_name_en">
								{{item.user_info.vendor_name_en}}
							</view>
							<view class="list-item-title">{{item.name}}</view>
						</view>
						<view class="list-item-2">
							<view class="tags-item" v-if="item.event_place && item.event_place != 0">
								<text>{{item.event_place}}</text>
							</view>
							<view class="tags-item">
								<text v-if="item.is_all==1">Social</text>
								<text v-if="item.is_all==2">Professional</text>
							</view>
						</view>
					</view>
					<view class="list-item-b">
						<view class="location">{{item.location}}</view>
						<view class="date">{{item.date}}</view>
					</view>
				</view>
			</view>

			<u-loadmore :status="status" :load-text="loadText" bgColor="#f4f5f6" />
		</view>

		<contactus @close="showContactStatus=false" :showContact="showContactStatus"></contactus>
		<selectRolePopup :rolePopupStatus="rolePopupStatus" :selectRoleIdentity="selectRoleIdentity"
			@close="rolePopupStatus=false"></selectRolePopup>
	</view>

</template>

<script>
	import HMfilterDropdown from '@/components/HM-filterDropdown/HM-filterDropdown.vue';
	import deals from '@/api/deals.js';
	import events from '@/api/events.js';
	import profile from '@/api/profile.js';
	import ads from '@/api/ads.js';
	import selectRolePopup from '@/components/select-role-popup/select-role-popup.vue';
	import contactus from "@/components/xll-contact-us/xll-contact-us.vue";
	import location from '@/api/location.js';

	export default {
		data() {
			return {

				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500,
				language: 'en-US',
				languageValue: 2,

				identity: 0, //当前身份、
				selectLocationValue: 89,
				subCateList: [],
				adsList: [],
				adsListTop: [],
				adsListMid: [],
				adsListBottom: [],
				recentDealsList: [],
				rolePopupStatus: false,
				selectRoleIdentity: 0,
				showContactStatus: false,

				defaultSelected: [],
				filterData: [{
						"name": "Category",
						"type": 'hierarchy',
						"submenu": [{
							"name": "All",
							"submenu": []
						}]
					},
					{
						"name": 'Location',
						"type": 'hierarchy',
						"submenu": [{
								"name": '附近',
								"value": "附近",
								"submenu": [

								]
							},
							{
								"name": '热门商圈',
								"value": "热门商圈",
								"submenu": [{
										"name": "全部商圈",
										"value": "全部商圈"
									},
									{
										"name": "燕岭/五山",
										"value": "燕岭/五山"
									},
								]
							},
						]
					},
				],

				dealsOnePage: 1,
				dealsTwoPage: 2,
				dealsOneLimit: 3,
				dealsTwoLimit: 3,
				dealsOneLastPage: 1,
				dealsTwoLastPage: 1,
				dealsOneList: [],
				dealsTwoList: [],

				eventsOnePage: 1,
				eventsTwoPage: 2,
				eventsOneLimit: 3,
				eventsTwoLimit: 3,
				eventsOneLastPage: 1,
				eventsTwoLastPage: 1,
				eventsOneList: [],
				eventsTwoList: [],
				status: 'loadmore',
				loadText: {
					loadmore: 'load more',
					loading: 'loading',
					nomore: 'no more'
				},

			}
		},
		components: {
			selectRolePopup,
			contactus,
			HMfilterDropdown
		},
		onShow() {

		},
		created() {
			this.getSubCateList(3);
		},
		onLoad(option) {
			var that = this;

			this.getAdsList();
			this.getRecentDealsList(1, 6);
			
			this.getLocationList();

			this.getDealsOneList(this.dealsOnePage, this.dealsOneLimit);
			this.getDealsTwoList(this.dealsTwoPage, this.dealsTwoLimit);

			this.getEventsOneList(this.eventsOnePage, this.eventsOneLimit);
			this.getEventsTwoList(this.eventsTwoPage, this.eventsTwoLimit);
		},
		computed: {
			i18n() {
				return this.$t('index')
			}
		},
		methods: {
			getLocationList(){
				let data = {}
				location.getAreas(data).then(res=>{
					console.log(res)
				}).catch(err=>{
					console.log(err)
				})
			},
			//接收菜单结果
			confirm(e) {
				console.log(e)
				this.filterResult = e.value;
			},
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
			selectLocation(value) {
				this.selectLocationValue = value;
			},
			getSubCateList(pid) {
				let data = {
					token: uni.getStorageSync('token'),
					pid: pid
				}
				profile.getSubCateList(data).then(res => {
					console.log(res)
					if (res.code == 200) {
						this.subCateList = res.message;
						let categories = res.message;
						let lan = uni.getStorageSync('language');
						let obj;
						categories.forEach(item => {
							if (lan == 'zh-CN') {
								obj = {
									name: item.identity_name,
									value: item.id
								}

							} else {
								obj = {
									name: item.identity_name,
									value: item.id
								}
							}
							this.filterData[0].submenu.push(obj)
						})

						console.log(this.filterData)
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
			turnEventsList() {
				let cityId = this.selectLocationValue;
				uni.navigateTo({
					url: '/pages/deals/events/list?cityId=' + cityId
				})
			},
			turnDealsList(id) {
				let cityId = this.selectLocationValue;
				uni.navigateTo({
					url: '/pages/deals/deals/list?cityId=' + cityId + '&typeId=' + id
				})
			},
			getAdsList() {
				let data = {
					page: 1,
					limit: 1000,
					cate: 6
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
			turnBanner(relativeLink) {

				if (relativeLink != '') {
					uni.navigateTo({
						url: relativeLink
					})
				} else {
					this.showContactStatus = true;
				}
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
			getEventsOneList(page, limit, city_id) {
				let data = {
					token: uni.getStorageSync('token'),
					page: page,
					limit: limit,
					city: city_id
				}
				events.eventList(data).then(res => {
					console.log(res)
					if (res.code == 200) {
						this.eventsOneList = res.message.data;
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
			getEventsTwoList(page, limit, city_id) {
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
						this.eventsTwoList = this.eventsTwoList.concat(eventsData);
						this.eventsTwoLastPage = res.message.last_page;
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
			getDealsOneList(dealsOnePage, dealsOneLimit, city_id, type_id) {
				let data = {
					token: uni.getStorageSync('token'),
					page: dealsOnePage,
					limit: dealsOneLimit,
					city: city_id,
					vendor_type_id: type_id
				}
				deals.dealsList(data).then(res => {
					console.log(res)
					if (res.code == 200) {
						this.dealsOneList = res.message.data;
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
			getDealsTwoList(dealsTwoPage, dealsTwoLimit, city_id, type_id) {
				let data = {
					token: uni.getStorageSync('token'),
					page: dealsTwoPage,
					limit: dealsTwoLimit,
					city: city_id,
					vendor_type_id: type_id
				}
				deals.dealsList(data).then(res => {
					console.log(res)
					if (res.code == 200) {
						let dealsData = res.message.data;
						this.dealsTwoList = this.dealsTwoList.concat(dealsData);
						this.dealsTwoLastPage = res.message.last_page;
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
		onReachBottom: function() {
			console.log('bottom')
			if (this.dealsTwoPage >= this.dealsTwoLastPage) return;
			this.status = 'loading';
			this.dealsTwoPage++;
			setTimeout(() => {
				this.getDealsTwoList(this.dealsTwoPage, this.dealsTwoLimit);
				if (this.dealsTwoPage >= this.dealsTwoLastPage) {
					this.status = 'nomore';
				} else {
					this.status = 'loading';
				}
			}, 1200)

			if (this.eventsTwoPage >= this.eventsTwoLastPage) return;
			this.status = 'loading';
			this.eventsTwoPage++;
			setTimeout(() => {
				this.getEventsTwoList(this.eventsTwoPage, this.eventsTwoLimit);
				if (this.eventsTwoPage >= this.eventsTwoLastPage) {
					this.status = 'nomore';
				} else {
					this.status = 'loading';
				}
			}, 1200)
		},
		onPullDownRefresh: function() {
			this.dealsOnePage = 1;
			this.dealsTwoPage = 2;
			this.dealsOneLimit = 3;
			this.dealsTwoLimit = 3;
			this.dealsOneLastPage = 1;
			this.dealsTwoLastPage = 1;
			this.dealsOneList = [];
			this.dealsTwoList = [];

			this.getRecentDealsList();
			this.getDealsOneList(1, this.dealsOneLimit);
			this.getDealsTwoList(2, this.dealsTwoLimit);
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);

		},
		onShareAppMessage: function() {

		},
		onShareTimeline: function() {

		},
		onAddToFavorites: function() {

		},
		onReady() {

		}
	}
</script>

<style>
	/* banner 750 * 340  */
	@import url("@/common/deals/index.css");
	@import url("@/common/deals/recent-deals.css");

	.list {
		position: fixed;
		z-index: 100;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		margin: auto;
	}

	.list-container {
		height: 100%;
	}

	.list-item {
		background-color: #FFFFFF;
		padding: 20rpx;
		width: 96%;
		/* height: 200rpx; */
		margin: 20rpx auto;
		border-radius: 20rpx;
		box-sizing: border-box;
		box-shadow: 0 0 30rpx 0 rgba(43, 86, 112, .1);
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.list-item-l {
		width: 20%;
		height: 100%;
		display: flex;
		align-items: center;
		flex-direction: row;
		justify-content: center;
	}

	.list-item-r {
		width: 80%;
	}


	.list-item-2 {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		flex-wrap: wrap;
		padding-top: 10rpx;
		padding-bottom: 10rpx;

	}


	.edit {
		margin-left: 20rpx;
	}

	.detail button,
	.edit button {
		background-color: rgba(0, 180, 210, 0.8);
		color: #FFFFFF;
		height: 60rpx;
		line-height: 60rpx;
		font-size: 28rpx;
		border-radius: 40rpx;

	}

	.left {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}

	.right {
		width: 40%;
		text-align: right;
	}

	.list-item-name {
		width: 100%;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		font-size: 32rpx;
		font-weight: 700;
		margin-left: 20rpx;
	}

	.list-item-title {
		width: 100%;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		font-size: 28rpx;
		/* font-weight: 600; */
		margin-left: 20rpx;
	}

	.salary {
		font-size: 32rpx;
		color: #00B3D2;
		font-weight: 600;
	}

	.tags-item {
		background-color: #EFE7EB;
		color: #000000;
		border-radius: 10rpx;
		padding-left: 10rpx;
		padding-right: 10rpx;
		margin-left: 10rpx;
		margin-top: 10rpx;
	}

	.experience {
		background-color: #00B3D2;
		color: #FFFFFF;
		border-radius: 10rpx;
		padding-left: 10rpx;
		padding-right: 10rpx;
	}

	.education {
		background-color: #00B3D2;
		color: #FFFFFF;
		border-radius: 10rpx;
		padding-left: 10rpx;
		padding-right: 10rpx;
		margin-left: 10rpx;
	}

	.business-name {
		font-size: 30rpx;
		line-height: 70rpx;
	}

	.interview-photo {
		height: 120rpx;
		width: 120rpx;
	}

	.interview-photo image {
		width: 100%;
		height: 100%;
		border-radius: 50%;

	}

	.interview-name {
		margin-left: 10rpx;
	}

	.job-location {
		color: #808080;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
	}

	.empty-image {
		width: 100%;
		height: 100%;
		text-align: center;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.empty-image image {
		width: 200rpx;
		height: 200rpx;
	}

	.tag-dog-friendly {
		background-color: #00B3D2;
		color: #FFFFFF;
	}

	.tag-all-locations {
		background-color: #00B3D2;
		color: #FFFFFF;
	}

	.tag-limit {
		background-color: #00B3D2;
		color: #FFFFFF;
	}

	.tag-deal {
		background-color: #00B3D2;
		color: #FFFFFF;
	}

	.tag-discount {
		background-color: #00B3D2;
		color: #FFFFFF;
	}

	.list-item-b {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		margin-top: 14rpx;
	}

	.location {
		width: 50%;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.date {
		color: #808080;
		font-size: 28rpx;
	}
</style>
