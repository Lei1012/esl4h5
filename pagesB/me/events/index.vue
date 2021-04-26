<template>
	<view class="uni-flex uni-column deals-container">
		<view class="flex-item add-deals-container">
			<view class="logo">
				<image src="@/static/esl-logo.png" mode="aspectFill"></image>
			</view>
			<view v-if="eventsList.length>0">
				<!-- <u-notice-bar mode="horizontal" type="primary" speed="280" color="#ffffff" bg-color="#333333" border-radius="10" :list="[i18n.eventsnotetxt]"></u-notice-bar> -->
				<view class=" list-item" v-for="(item,index) in eventsList" :key="index">
					<view class="list-item-l">
						<view class="interview-photo">
							<image @click="turnVendorProfile(item.user_id)" :src="item.user_info.logo" mode="aspectFill"></image>
						</view>
					</view>
					<view class="list-item-r" @click="turnDetail(item.id)">
						<view class="list-item-t">
							<view class=" list-item-1">
								<view class="job-title">{{item.name}}</view>
							</view>
							<view class="list-item-2">
								<view class="tags-item" v-if="item.event_place && item.event_place != 0">
									<text>{{item.event_place}}</text>
								</view>
								<view class="tags-item" v-if="item.user_info.vendor_name_en">
									<text>{{item.user_info.vendor_name_en}}</text>
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
					
					<view class="list-item-tag actived-0" v-if="item.status==0">
						{{i18n.dealsmyunderreview}}
					</view>
					<view class="list-item-tag actived-1" v-if="item.status==1">
						{{i18n.dealsmyapproved}}
					</view>
					<view class="list-item-tag actived-2" v-if="item.status==2">
						{{i18n.dealsmyrejected}}
					</view>
				</view>
			</view>
			<view class="add-deals-item" v-if="eventsList.length<1" :class="eventsNum>=2 ? 'add-deals-first' : '' "  @click="addDeal(1)" >
				{{i18n.eventsaddevent1}}
			</view>
			<view class="add-deals-item" v-if="eventsList.length<2" :class="eventsNum>=2 ? 'add-deals-first' : '' "  @click="addDeal(2)">
				{{i18n.eventsaddevent2}}
			</view>
			<view class="add-deals-item" v-if="eventsList.length<3" :class="eventsNum>=4 ? 'add-deals-first' : '' "  @click="addDeal(3)">
				{{i18n.eventsaddevent3}}
			</view>
			<view class="add-deals-item" v-if="eventsList.length<4" :class="eventsNum>=4 ? 'add-deals-first' : '' "  @click="addDeal(4)">
				{{i18n.eventsaddevent4}}
			</view>
			
		</view>
		<view class="flex-item deals-button">
			<button @click="showContactStatus=true" type="default">{{i18n.eventsmoreevent}}</button>
		</view>
		<view class="events-tips">
			<text>{{i18n.eventsnote}} {{i18n.eventsnotetxt}}</text>
		</view>
		<contactus @close="closeContact" :showContact="showContactStatus"></contactus>
	</view>
</template>

<script>
	import profile from '@/api/profile.js';
	import events from '@/api/events.js';
	import contactus from "@/components/xll-contact-us/xll-contact-us.vue";
	export default {
		data() {
			return {
				page: 1,
				limit: 10,
				eventsList: [],
				showContactStatus:false,
				eventsNum:0
			}
		},
		computed: {
			i18n() {
				return this.$t('index')
			}

		},
		components:{
			contactus
		},
		onShow() {
			this.getEventsList();
			this.getBasicInfo();
		},
		onLoad() {

		},
		methods: {
			turnVendorProfile(userId) {
				// #ifdef H5
				var url = window.location.href;
				var origin = window.location.origin;
				let turn_url = origin + '/esl_h5/pagesB/me/vendor/share?id=' + userId + '&type=events';
				window.location.href = turn_url;
				// #endif
				
				// #ifndef H5
				uni.navigateTo({
					url:'/pagesB/me/vendor/share?id=' + userId + '&type=events'
				})
				// #endif
				
			},
			getBasicInfo() {
				var that = this;
				let data = {
					id: uni.getStorageSync('uid'),
					token: uni.getStorageSync('token')
				}
				profile.getBasicInfo(data).then(res => {
					console.log(res)
					if (res.code == 200) {
						if(res.message.vendor_info.events_num ){
							this.eventsNum = res.message.vendor_info.events_num;
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
			closeContact(e){
				// console.log(e)
				this.showContactStatus=false;
			},
			addDeal(value) {
				if(this.eventsNum>=value){
					uni.navigateTo({
						url: 'add'
					})
				}
				
			},
			getEventsList() {
				let data = {
					token: uni.getStorageSync('token'),
					page: this.page,
					limit: this.limit
				}
				events.myEvent(data).then(res => {
					console.log(res);

					if (res.code == 200) {
						this.eventsList = res.message.data;
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
			turnEdit(id) {
				uni.navigateTo({
					url: 'add?id=' + id
				})
			},
			turnDetail(id) {
				// #ifdef H5
				var url = window.location.href;
				var origin = window.location.origin;
				let turn_url = origin + '/esl_h5/pagesB/me/events/detail?id=' + id;
				window.location.href = turn_url;
				// #endif
				
				// #ifndef H5
				uni.navigateTo({
					url:'/pagesB/me/events/detail?id=' + id
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
	}
</script>

<style>
	@import url("@/common/me/events/index.css");
</style>
