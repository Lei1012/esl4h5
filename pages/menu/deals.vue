<template>
	<view class="uni-flex uni-column index-bg">
		<view class="flex-item flex-item-V " style="margin-top: 110rpx;">
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

		<view class="xll-deals-list">
			
			<view class=" list-item" v-for="(item,index) in dealsOneList" :key="item.id" v-if="showDealsStatus">
				<view class="deals-tips">Deals</view>
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
			
			<view class="flex-item events-slider" v-if="showDealsStatus && dealsOneList.length>0">
				<swiper class="swiper" :indicator-dots="false" :autoplay="true" :interval="5000" :duration="600">
					<swiper-item v-for="(item,index) in adsListMid" :key="index"
						@click="turnBanner(item.relative_link)">
						<view class="swiper-item">
							<image :src="item.url" mode="widthFix" lazy-load="true"></image>
						</view>
					</swiper-item>
				</swiper>
			</view>
			
			<view class=" list-item" v-for="(item,index) in eventsOneList" :key="item.name" v-if="showEventsStatus">
				<view class="events-tips">Events</view>
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
					<view class="list-item-b" v-if="item.citys">
						<view class="location" v-if="language=='en-US' || !language">{{item.citys.Pinyin}}</view>
						<view class="location" v-if="language=='zh-CN'">{{item.citys.ShortName}}</view>
						<view class="date">{{item.date}}</view>
					</view>
				</view>
			</view>
			
			<view class="flex-item events-slider" v-if="showEventsStatus && eventsOneList.length>0 && adsListBottom.length>0">
				<swiper class="swiper" :indicator-dots="false" :autoplay="true" :interval="5000" :duration="600">
					<swiper-item v-for="(item,index) in adsListBottom" :key="index"
						@click="turnBanner(item.relative_link)">
						<view class="swiper-item">
							<image :src="item.url" mode="widthFix" lazy-load="true"></image>
						</view>
					</swiper-item>
				</swiper>
			</view>
			
			<view class=" list-item" v-for="(item,k) in dealsTwoList" :key="item.id" v-if="showDealsStatus">
				<view class="deals-tips">Deals</view>
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

			<view class=" list-item" v-for="(item,index) in eventsTwoList" :key="item.name" v-if="showEventsStatus">
				<view class="events-tips">Events</view>
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
					<view class="list-item-b" v-if="item.citys">
						<view class="location" v-if="language=='en-US' || !language">{{item.citys.Pinyin}}</view>
						<view class="location" v-if="language=='zh-CN'">{{item.citys.ShortName}}</view>
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
			var _this = this;
			return {
				
				indicatorDots: true,
				autoplay: true,
				interval: 3000,
				duration: 1000,
				language: 'en-US',

				identity: 0, //当前身份、
				selectLocationValue: 89,
				subCateList: [],
				adsList: [],
				adsListTop: [],
				adsListMid: [],
				adsListBottom: [],
				
				rolePopupStatus: false,
				selectRoleIdentity: 0,
				showContactStatus: false,

				defaultSelected: [],
				filterData: [{
						"name": _this.$t('index').dealsfiltercategory,
						"type": 'hierarchy',
						"submenu": [{
							"name": _this.$t('index').dealsfilterall,
							"value": 0,
							"submenu": []
						}]
					},
					{
						"name": _this.$t('index').dealsfilterlocation,
						"type": 'hierarchy',
						"submenu": [{
							"name": _this.$t('index').dealsfilterall,
							"value": 0,
							"submenu": [

							]
						}]
					},
				],
				dealsOneList: [],
				dealsTwoList: [],
				dealsPage:1,
				dealsLimit:6,
				dealsLastPage:1,
				
				eventsOneList: [],
				eventsTwoList: [],
				eventsPage:1,
				eventsLimit:6,
				eventsLastPage:1,
				
				status: 'loadmore',
				loadText: {
					loadmore: 'load more',
					loading: 'loading',
					nomore: 'no more'
				},

				categoryId: 0,
				cityId: 0,
				showDealsStatus: true,
				showEventsStatus: true,

			}
		},
		components: {
			selectRolePopup,
			contactus,
			HMfilterDropdown
		},
		onShow() {
			// #ifdef H5
			uni.setTabBarItem({
				index: 1,
				text:this.i18n.tabbarjobs
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
		created() {
			this.getSubCateList(3);
			this.getDealsAreaList();
		},
		onLoad(option) {
			var that = this;
			this.language = uni.getStorageSync('language');
			
			this.getAdsList();
			this.getDealsList(this.dealsPage, this.dealsLimit, this.categoryId, this.cityId);
			this.getEventsList(this.eventsPage,this.eventsLimit,this.cityId)
			
		},
		computed: {
			i18n() {
				return this.$t('index')
			}
		},
		methods: {
			getDealsAreaList() {
				deals.dealsAreaList().then(res => {
					console.log(res)
					if (res.code == 200) {

						let categories = res.message;
						let lan = uni.getStorageSync('language');
						let obj;
						categories.forEach(item => {
							if (lan == 'zh-CN') {
								obj = {
									name: item.ShortName,
									value: item.id
								}

							} else {
								obj = {
									name: item.Pinyin,
									value: item.id
								}
							}
							this.filterData[1].submenu.push(obj)
						})

						console.log(this.filterData)
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
					}
				}).catch(err => {
					console.log(err)
				})
			},
			initDealsList() {
				this.dealsOneList = [];
				this.dealsTwoList =  [];
				this.dealsPage = 1;
				this.dealsLimit = 6;
				this.dealsLastPage = 1;
				
				this.getDealsList(this.dealsPage, this.dealsLimit, this.categoryId, this.cityId);

			},
			initEventsList() {
				
				this.eventsOneList = [];
				this.eventsTwoList = [];
				this.eventsPage = 1;
				this.eventsLimit = 6;
				this.eventsLastPage = 1;
				
				this.getEventsList(this.eventsPage,this.eventsLimit,this.cityId)
			},
			//接收菜单结果
			confirm(e) {
				console.log(e)
				let value = e.value;

				let categoryId = value[0][0];
				let cityId = value[1][0];
				if(categoryId != null){
					this.categoryId = categoryId;
				}
				if(cityId != null){
					this.cityId = cityId;
				}
				console.log(categoryId)
				console.log(cityId)
				
				if (categoryId != 0 && categoryId!=null) {
					if(categoryId == 17){
						this.showDealsStatus = false;
						this.showEventsStatus = true;
						this.initEventsList();
					}else{
						this.initDealsList();
						this.showEventsStatus = false;
						this.showDealsStatus = true;
					}
				
				} else {
					this.showDealsStatus = true;
					this.showEventsStatus = true;
					this.initDealsList();
					this.initEventsList();
				}

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
			getEventsList(page,limit,city_id){
				
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
						if(page == 1){
							let eventsOneList = eventsData.slice(0,3);
							let eventsTwoList = eventsData.slice(3);
							this.eventsOneList = eventsOneList;
							this.eventsTwoList = eventsTwoList;
						}else{
							this.eventsTwoList = this.eventsTwoList.concat(eventsData);
						}
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
			getDealsList(page, limit, typeId, cityId){
				let data = {
					token: uni.getStorageSync('token'),
					page: page,
					limit: limit,
					vendor_type_id: typeId,
					city: cityId
				}
				deals.dealsList(data).then(res => {
					console.log(res)
					if (res.code == 200) {
						let dealsData = res.message.data;
						if(page == 1){
							let dealsOneList = dealsData.slice(0,3);
							let dealsTwoList = dealsData.slice(3);
							this.dealsOneList = dealsOneList;
							this.dealsTwoList = dealsTwoList;
							
						}else{
							this.dealsTwoList = this.dealsTwoList.concat(dealsData);
						}
						this.dealsLastPage = res.message.last_page;
						
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
			var _this = this;
			
			if (this.dealsPage >= this.dealsLastPage && this.eventsPage >= this.eventsLastPage){
				_this.status = 'nomore';
			} else{
				this.status = 'loading';
				this.dealsPage++;
				this.eventsPage++;
				
				setTimeout(() => {
					_this.getDealsList(_this.dealsPage, _this.dealsLimit, _this.categoryId, _this.cityId);
					_this.getEventsList(_this.eventsPage, _this.eventsLimit, _this.cityId);
					if (_this.dealsPage >= _this.dealsLastPage && _this.eventsPage >= _this.eventsLastPage) {
						_this.status = 'nomore';
					} else {
						_this.status = 'loading';
					}
				}, 1000)
			}

		},
		onPullDownRefresh: function() {
			this.initDealsList();
			this.initEventsList();
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
		position: relative;
		overflow: hidden;
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

	.deals-tips {
		position: absolute;
		right: 0rpx;
		top: 0rpx;
		background-color: #0AA0A8;
		color: #FFFFFF;
		font-size: 24rpx;
		text-align: center;
		border-radius: 4rpx;
		padding: 4rpx 16rpx;
	}

	.events-tips {
		position: absolute;
		right: 0rpx;
		top: 0rpx;
		background-color: #B1C452;
		color: #FFFFFF;
		font-size: 24rpx;
		text-align: center;
		border-radius: 4rpx;
		padding: 4rpx 16rpx;
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
		padding-left: 20rpx;
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
