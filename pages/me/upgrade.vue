<template>
	<view class="upgrade-container">
		<view class="upgrade">
			<view class="upgrade-item" v-for="(item,index) in vipList" :key="index" @click="vipChecked(item.id)">
				<view class="level-name">¥{{item.money/100}} {{item.level_en}} </view>
				<view class="level-container">
					<!-- business -->
					<view class="level-item" v-if="identity==2 && item.level == 2">1 Year</view>
					<view class="level-item" v-if="identity==2 && item.level == 2">Limited Job Posts</view>
					<view class="level-item" v-if="identity==2 && item.level == 2">Customizable & Sharable Profiles
					</view>
					<view class="level-item" v-if="identity==2 && item.level == 2">Featured Jobs in mini program and
						social media</view>
					<view class="level-item" v-if="identity==2 && item.level == 2">Use Esl Passpot Discount Cards with
						vendors</view>
					<view class="level-item" v-if="identity==2 && item.level == 2">Dedicated Consultant</view>
					<view class="level-item" v-if="identity==2 && item.level == 2">Customizable Marketing Templates
					</view>
					<view class="level-item" v-if="identity==2 && item.level == 2">2 Wechat Moment Mentions</view>
					<view class="level-item" v-if="identity==2 && item.level == 2">1 Wechat Channel Mention</view>
					<view class="level-item" v-if="identity==2 && item.level == 2">2 International Social Media Mentions
					</view>
					<view class="level-item-container" v-if="identity==2 && item.level == 2">
						<view class="level-item-item-label">Official Account Advertising</view>
						<view class="level-item-item">New Member Article</view>
						<view class="level-item-item">Article Banner Advert</view>
					</view>

					<view class="level-item" v-if="identity==2 && item.level == 3">1 yr </view>
					<view class="level-item" v-if="identity==2 && item.level==3">Limited Job Posts</view>
					<view class="level-item" v-if="identity==2 && item.level == 3">Customizable & Sharable Profiles
					</view>
					<view class="level-item" v-if="identity==2 && item.level == 3">Featured Jobs in MP and social media
					</view>
					<view class="level-item" v-if="identity==2 && item.level == 3">Use Esl Passpot Discount Cards with
						vendors</view>
					<view class="level-item" v-if="identity==2 && item.level == 3">Dedicated Consultant</view>
					<view class="level-item" v-if="identity==2 && item.level == 3">Customizable Marketing Templates
					</view>
					<view class="level-item" v-if="identity==2 && item.level == 3">2 Wechat Moment Mentions</view>
					<view class="level-item" v-if="identity==2 && item.level == 3">1 Wechat Channel Mention</view>
					<view class="level-item" v-if="identity==2 && item.level == 3">2 International Social Media Mentions
					</view>
					<view class="level-item" v-if="identity==2 && item.level == 3">1 Dedicated Article</view>
					<view class="level-item" v-if="identity==2 && item.level == 3">15-day JobBoard banner</view>
					<view class="level-item" v-if="identity==2 && item.level == 3">15-day Featured Job</view>
					<view class="level-item" v-if="identity==2 && item.level == 3">1-Wechat Group Job Blast</view>
					<view class="level-item-container" v-if="identity==2 && item.level == 3">
						<view class="level-item-item-label">Official Account Advertising</view>
						<view class="level-item-item">New Member Article</view>
						<view class="level-item-item">1-monthArticle Banner Advert</view>
					</view>
					<!-- business end -->

					<!-- vendor -->
					<view class="level-item" v-if="identity==3 && item.level == 2">1 Year</view>
					<view class="level-item" v-if="identity==3 && item.level == 3">Pro Plan Features+ </view>

					<view class="level-item" v-if="identity==3 && item.level==3">1 extra Deal</view>
					<view class="level-item" v-if="identity==3 && item.level == 3">{{item.events_num}} Events</view>

					<view class="level-item" v-if="identity==3 && item.level == 2">{{item.deals_num}} Deals</view>
					<view class="level-item" v-if="identity==3 && item.level == 2">{{item.events_num}} Events</view>

					<view class="level-item" v-if="identity==3 && item.level == 2">Startup & Support Discounts</view>
					<view class="level-item" v-if="identity==3 && item.level == 2">WeChat Moment Quarterly Mentions</view>
					<view class="level-item" v-if="identity==3 && item.level == 2">Event Sponsorship Opporturnities
					</view>
					<view class="level-item-container" v-if="identity==3 && item.level == 2">
						<view class="level-item-item-label">Official Account Advertising</view>
						<view class="level-item-item">New vendor collective article</view>
						<view class="level-item-item">1-month article banner</view>
						<view class="level-item-item">Mentions in Articles</view>
						<view class="level-item-item">3 days top ranking</view>
					</view>

					<view class="level-item" v-if="identity==3 && item.level == 3">1 month Home pg feature</view>
					<view class="level-item" v-if="identity==3 && item.level == 3">1 month deal pg feature</view>
					<view class="level-item-container" v-if="identity==3 && item.level == 3">
						<view class="level-item-item-label">Official Account Advertising</view>
						<view class="level-item-item">Dedicated Article</view>
						<view class="level-item-item">3 months Article banner</view>
						<view class="level-item-item">1 week top ranking</view>
					</view>
					<!-- vendor end -->

				</view>
				<view class="upgrade-circle-container">
					<view class="up-circle" :class="item.id == levelId ? 'up-circle-checked' : '' "></view>
				</view>
			</view>
		</view>
		<view class="pay-button">
			<button type="default" v-if="identity != 3" @click="vipPay()">Pay</button>
			<button type="default" v-if="identity == 3" @click="submit()">Subscribe</button>
			<button class="help-button" type="default" @click="showContactStatus=true">Help</button>
		</view>

		<contactus @close="showContactStatus = false" :showContact="showContactStatus"></contactus>
	</view>
</template>

<script>
	import contactus from "@/components/xll-contact-us/xll-contact-us.vue";
	import user from '@/api/user.js';
	import jobs from '@/api/jobs.js';
	import profile from '@/api/profile.js';

	export default {
		data() {
			return {
				vipList: '',
				levelId: 0,
				money: 0,
				level: 0,
				vendorLevel: 0,
				businessLevel: 0,
				educatorLevel: 0,
				identity: 0,
				showContactStatus: false,
			}
		},
		components: {
			contactus
		},
		onLoad() {
			let _this = this;
			this.identity = uni.getStorageSync('identity');
			// 获取职位列表
			_this.getBasicInfo();

		},
		computed:{
			// #ifdef H5
			isWechat(){
				return this.$isWechat()
			}
			// #endif
			
		},
		methods: {
			async getVipList(level) {
				var _this = this;
				let identity = uni.getStorageSync('identity');
				let token = uni.getStorageSync('token');
				let data = {
					identity: identity,
					token: token
				}

				var res = await user.vipList(data);
				console.log(res);
				if (res.code == 200) {
					let message = res.message;
					// this.vipList = res.message;
					// console.log(_this.educatorLevel);
					if (level == 1) {
						_this.vipList = message.filter((item, index) => {
							_this.levelId = message[1].id;
							return item.level > 1;

						})
					}
					if (level == 2) {
						_this.vipList = message.filter((item, index) => {
							_this.levelId = message[2].id;
							return item.level > 2;

						})
					}
					console.log(_this.vipList)
				} else {
					uni.showToast({
						title: res.msg,
						icon: "none"
					})
				}

			},
			vipChecked(id) {
				this.levelId = id;
			},
			vipPay() {
				var _this = this;
				let identity = uni.getStorageSync('identity');
				let token = uni.getStorageSync('token');
				let data = {
					identity: identity,
					token: token,
					level_id: _this.levelId
				}
				user.changeVipLevel(data).then(res => {
					console.log(res)
					uni.showLoading({
						title: 'loading...'
					})
					let pre_data = {
						token: token,
						// total_fee: 1,
						total_fee: res.message.money,
						order_id: res.message.order_id,
						body: res.message.order_id
					}
					// #ifdef H5
					if(_this.isWechat){
						jobs.getPrepayId(pre_data).then(res => {
							console.log(res)
							uni.hideLoading();
							let wxpayData = res.message;
							this.$jwx.wxpay(wxpayData, function(result) {
								console.log(result)
								if (result.code == 1) {
									uni.$emit('userInfoUpdated', {
										msg: 'page updated'
									});
									uni.switchTab({
										url: '/pages/menu/me'
									})
								}
								if (result.code == -1) {
									uni.navigateTo({
										url: '/pages/public/payment/payment'
									})
								}
							})
						}).catch(error => {
							console.log(error)
						})
					}else{
						jobs.wapPay(pre_data).then(res=>{
							console.log(res)
						}).catch(err=>{
							console.log(err)
						})
					}
					
					// #endif

					// #ifdef MP-WEIXIN
					jobs.miniAppPay(pre_data).then(res => {
						console.log(res)
						uni.hideLoading();
						let wxpayData = res.message;
						uni.requestPayment({
							provider: 'wxpay',
							timeStamp: wxpayData.timeStamp,
							nonceStr: wxpayData.nonceStr,
							package: wxpayData.package,
							signType: wxpayData.signType,
							paySign: wxpayData.paySign,
							success: function(res) {
								uni.switchTab({
									url: '/pages/menu/me'
								})
							},
							fail: function(err) {
								console.log(err)
								uni.navigateTo({
									url: '/pages/public/payment/payment'
								})
							}
						});
					}).catch(error => {
						console.log(error)
					})

					// #endif

				}).catch(err => {
					console.log(err)
				})
			},
			async getBasicInfo() {
				var _this = this;
				let uid = uni.getStorageSync('uid');
				let token = uni.getStorageSync('token');
				let identity = uni.getStorageSync('identity');

				let data = {
					id: uid,
					token: token,
					identity: identity
				}
				var res = await profile.getBasicInfo(data);
				console.log(res)
				if (res.code == 200) {
					if (identity == 1) {
						if (res.message.educator_info) {
							_this.level = res.message.educator_info.level;
						}
					}
					if (identity == 2) {
						if (res.message.business_info) {
							_this.level = res.message.business_info.level;
						}
					}
					if (identity == 3) {
						if (res.message.vendor_info) {
							_this.level = res.message.vendor_info.level;
						}
					}

					this.getVipList(_this.level);

				} else {
					uni.showToast({
						title: res.msg,
						icon: "none"
					})
				}
			},
			submit() {
				console.log('submit')
				let token = uni.getStorageSync('token');
				let data = {
					level: this.levelId,
					token: token
				}

				user.preBuyVip(data).then(res => {
					console.log(res)
					if (res.code == 200) {

						uni.showModal({
							title: 'Great! ',
							content: 'Your account manager will be in touch shortly.',
							showCancel: false,
							cancelText: 'Cancel',
							confirmText: 'OK',
							confirmColor: '#00B3D2',
							success: function(res) {
								if (res.confirm) {
									uni.switchTab({
										url: '/pages/menu/me'
									})
								} else if (res.cancel) {
									console.log('用户点击取消');
								}
							}
						})

					} else {
						uni.showToast({
							title: res.msg,
							icon: "none"
						})
					}
				}).catch(err => {
					console.log(err)
				})
			}

		}
	}
</script>

<style>
	@import url("@/common/me/upgrade.css");
</style>
