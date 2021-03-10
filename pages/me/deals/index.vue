<template>
	<view class="uni-flex uni-column deals-container">
		<view class="flex-item add-deals-container">
			<view class="logo">
				<image src="../../../static/esl-logo.png" mode="aspectFill"></image>
			</view>
			<view v-if="dealsList.length>0">
				<!-- <u-notice-bar mode="horizontal" type="primary" speed="280" color="#ffffff" bg-color="#333333" border-radius="10"
				 :list="[i18n.dealsnotetxt]"></u-notice-bar> -->
				
				<view class=" list-item" v-for="(item,index) in dealsList" :key="index">
					<view class="list-item-l">
						<view class="interview-photo">
							<image @click="turnVendorProfile(item.user_id)" :src="item.user_info.logo" mode="aspectFill"></image>
						</view>
					</view>
					<view class="list-item-r" @click="turnDetail(item.id)">
						<view class=" list-item-1">
							<view class="job-title">{{item.title}}</view>
							<!-- <view class="salary">{{item.pay_money}} </view> -->
						</view>
						<view class="list-item-2">
							<view class="tags-item">
								<text>{{item.user_info.vendor_name_en}}</text>
							</view>
							<!-- <view class="tags-item">
								<text>{{item.location}}</text>
							</view> -->
							<view class="tags-item">
								<text v-if="item.is_all==1">All Locations</text>
								<text v-if="item.is_all==2">Limited</text>
							</view>
							<view class="tags-item">
								<text v-if="item.due_contract==1">1 Year</text>
								<text v-if="item.due_contract==2">2 Year</text>
							</view>
							<view class="tags-item">
								<text v-if="item.type==1">Deal</text>
								<text v-if="item.type==2">Discount</text>
							</view>
							<view class="tags-item" v-if="item.allowed_dog==1">
								<text>Dog Friendly</text>
							</view>

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

			<view class="add-deals-item add-deals-first" v-if="dealsList.length<1" :class="dealsNum>=1 ? 'add-deals-first' : '' "
			 @click="addDeal(1)">
				{{i18n.dealsadddeal1}}
			</view>
			<view class="add-deals-item" v-if="dealsList.length<2" :class="dealsNum>=3 ? 'add-deals-first' : '' " @click="addDeal(3)">
				{{i18n.dealsadddeal2}}
			</view>
			<view class="add-deals-item" v-if="dealsList.length<3" :class="dealsNum>=3 ? 'add-deals-first' : '' " @click="addDeal(3)">
				{{i18n.dealsadddeal3}}
			</view>
			<view class="add-deals-item" v-if="dealsList.length<4" :class="dealsNum>=5 ? 'add-deals-first' : '' " @click="addDeal(5)">
				{{i18n.dealsadddeal4}}
			</view>
			<view class="add-deals-item" v-if="dealsList.length<5" :class="dealsNum>=5 ? 'add-deals-first' : '' " @click="addDeal(5)">
				{{i18n.dealsadddeal5}}
			</view>
		</view>
		<view class="flex-item deals-button">
			<button @click="showContactStatus=true" type="default">{{i18n.dealsmoredeals}}</button>
		</view>
		<contactus @close="closeContact" :showContact="showContactStatus"></contactus>
		<view class="deals-tips">
			<text>{{i18n.dealsnote}} {{i18n.dealsnotetxt}}</text>
		</view>
	</view>
</template>

<script>
	import profile from '@/api/profile.js';
	import deals from '@/api/deals.js';
	import contactus from "@/components/xll-contact-us/xll-contact-us.vue";
	export default {
		data() {
			return {
				page: 1,
				limit: 10,
				dealsList: [],
				showContactStatus: false,
				dealsNum: 0
			}
		},
		computed: {
			i18n() {
				return this.$t('index')
			}
		},
		components: {
			contactus
		},
		onShow() {
			this.getDealsList();
			this.getBasicInfo();
		},
		onLoad() {

		},
		methods: {
			turnVendorProfile(userId) {
				// #ifdef H5
				var url = window.location.href;
				var origin = window.location.origin;
				let turn_url = origin + '/esl_h5/pages/me/vendor/share?id=' + userId + '&type=deals';
				window.location.href = turn_url;
				// #endif
				
				// #ifndef H5
				uni.navigateTo({
					url:'/pages/me/vendor/share?id=' + userId + '&type=deals'
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
						if (res.message.vendor_info.deals_num) {
							this.dealsNum = res.message.vendor_info.deals_num;
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
			closeContact(e) {
				// console.log(e)
				this.showContactStatus = false;
			},
			addDeal(value) {
				if (this.dealsNum >= value) {
					uni.navigateTo({
						url: 'add'
					})
				}

			},
			getDealsList() {
				let data = {
					token: uni.getStorageSync('token'),
					page: this.page,
					limit: this.limit
				}
				deals.myDeals(data).then(res => {
					console.log(res);

					if (res.code == 200) {
						this.dealsList = res.message.data;

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
				let turn_url = origin + '/esl_h5/pages/me/deals/detail?id=' + id + '&source=1';
				window.location.href = turn_url;
				// #endif
				
				// #ifndef H5
				uni.navigateTo({
					url:'/pages/me/deals/detail?id=' + id + '&source=1'
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
	@import url("@/common/me/deals/index.css");
</style>
