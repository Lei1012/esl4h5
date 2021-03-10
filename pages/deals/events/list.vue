<template>
	<view class="uni-flex uni-column list">
		<view class="empty-image" v-if="showEmptyStatus">
			<image src="@/static/esl/empty.png" mode="aspectFit"></image>
		</view>
		<view class="flex-item list-container" v-if="showEmptyStatus===false">
			<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="reachBottom" >
				
				<view class=" list-item" v-for="(item,index) in eventsList" :key="index">
					<view class="list-item-l">
						<view class="interview-photo">
							<image @click="turnVendorProfile(item.user_id)" :src="item.user_info.logo" mode="aspectFill"></image>
						</view>
					</view>
					<view class="list-item-r" @click="turnEventDetail(item.id)">
						<view class="list-item-t">
							<view class=" list-item-1">
								<view class="job-title">{{item.name}}</view>
							</view>
							<view class="list-item-2">
								<view class="tags-item" v-if="item.event_place && item.event_place != 0">
									<text>{{item.event_place}}</text>
								</view>
								<!-- <view class="tags-item" v-if="item.user_info.vendor_name_en">
									<text>{{item.user_info.vendor_name_en}}</text>
								</view> -->
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
			</scroll-view>

		</view>

	</view>
</template>

<script>
	import events from '@/api/events.js';

	export default {
		data() {
			return {
				eventsList: [],
				cityId: undefined,
				typeId: undefined,
				page: 1,
				limit: 10,
				status: 'loadmore',
				lastPage: 0,
				loadText: {
					loadmore: 'load more',
					loading: 'loading',
					nomore: 'no more'
				},
				showEmptyStatus:false
			}
		},
		computed: {
			i18n() {
				return this.$t('index')
			}
		},
		onLoad(option) {
			this.cityId = option.cityId;
			// this.cateId = option.id;
			this.getEventsList(this.page, this.limit, this.cityId)
		},
		methods: {
			turnVendorProfile(userId) {
				// #ifdef H5
				var url = window.location.href;
				var origin = window.location.origin;
				let turn_url = origin + '/esl_h5/pages/me/vendor/share?id=' + userId + '&type=events';
				window.location.href = turn_url;
				// #endif
				
				// #ifndef H5
				uni.navigateTo({
					url:'/pages/me/vendor/share?id=' + userId + '&type=events'
				})
				// #endif
				
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
						this.eventsList = this.eventsList.concat(res.message.data);
						if(this.eventsList.length>0){
							this.showEmptyStatus=false
						}else{
							this.showEmptyStatus=true
						}
						this.lastPage = res.message.last_page
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
			getEventsListRefresh(page, limit, city_id) {
				let data = {
					token: uni.getStorageSync('token'),
					page: page,
					limit: limit,
					city: city_id
				}
				events.eventList(data).then(res => {
					if (res.code == 200) {
						this.eventsList = res.message.data;
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
			reachBottom() {
				if (this.page >= this.lastPage) return;
				this.status = 'loading';
				this.page = ++this.page;
				setTimeout(() => {
					this.getEventsList(this.page, this.limit, this.cityId);
					if (this.page >= this.lastPage) {
						this.status = 'nomore';
					} else {
						this.status = 'loading';
					}
				}, 1200)

			},
			turnEventDetail(id) {
				// #ifdef H5
				var url = window.location.href;
				var origin = window.location.origin;
				let turn_url = origin+'/esl_h5/pages/me/events/detail?id='+id;
				window.location.href = turn_url;
				// #endif
				
				// #ifndef H5
				uni.navigateTo({
					url:'/pages/me/events/detail?id='+id
				})
				// #endif
			}
		},
		onShareAppMessage:function(){
			
		},
		onShareTimeline:function(){
			
		},
		onAddToFavorites:function(){
			
		},
		onPullDownRefresh: function() {
			this.page=1;
			this.getEventsListRefresh(1, this.limit,this.cityId);
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
	}
</script>

<style>
	@import url("@/common/me/events/index.css");
</style>
