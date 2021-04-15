<template>
	<view>
		<view class="flex-item checkout">
			<!-- 3D轮播 -->
			<swiper class="imageContainer" next-margin="100rpx" previous-margin="20rpx" :style="'height:'+swiperHeight + 'rpx;' "
				 @change="checkoutChange"  :autoplay="false">
				<swiper-item class="swiperitem" v-if="businessLevel==1">
					<view class="swiperitem-container">
						<view class="checkout-title">{{i18n.jobspriceforfreemembers}}</view>
						<view class="checkout-feature">Get featured on: </view>
						<view class="checkout-item" v-for="(item,index) in basicServiceList" :key="index">
							<view class="checkout-item-1">
								<view class="checkout-item-1-1" v-if="languageValue == 'en-US'">{{item.services_en}}
								</view>
								<view class="checkout-item-1-1" v-if="languageValue == 'zh-CN'">{{item.services_cn}}
								</view>
								<view class="checkout-item-1-2">{{item.services_desc}}</view>
							</view>
							<view class="checkout-item-2">
								<view class="checkout-item-2-1">¥ {{ parseInt(item.originally_money/100) }}.00</view>
								<view class="checkout-item-2-2">¥ {{parseInt(item.money/100)}}.00</view>
							</view>
							<view class="checkout-item-3">
								<switch style="transform:scale(0.6)" type="switch" color="#0AA0A8"
									:checked="freeCheckedCheckoutList.indexOf(item.id) != -1 "
									@change="checkoutItemChecked($event,item.id,parseInt(item.money/100),parseInt(item.originally_money/100))" />
							</view>
						</view>
						<view class="checkout-item checkout-total">
							<view class="checkout-total-1">
								<image src="./static/total-today.png" mode="aspectFill"></image>
								<view class="checkout-total-1-c">
									<view class="checkout-total-1-1">Total</view>
									<view class="checkout-total-1-2">Including Tax</view>
								</view>
							</view>
							<view class="checkout-total-3">
								<view class="checkout-total-3-1">¥ {{freeCheckoutNowTotalValue}}.00</view>
								<view class="checkout-total-3-2">¥ {{freeCheckoutOldTotalValue}}.00</view>
							</view>
						</view>
						<view class="checkout-btn">
							<button type="default" @click="createPromotion">Promotions</button>
						</view>
					</view>
				</swiper-item>
				<swiper-item class="swiperitem" v-if="businessLevel <= 2">
					<view class="swiperitem-container">
						<view class="checkout-title">{{i18n.jobspriceforpromembers}}</view>
						<view class="checkout-feature">Get featured on: </view>
						<view class="checkout-item" v-for="(item,index) in proServiceList" :key="index">
							<view class="checkout-item-1">
								<view class="checkout-item-1-1" v-if="languageValue == 'en-US'">{{item.services_en}}
								</view>
								<view class="checkout-item-1-1" v-if="languageValue == 'zh-CN'">{{item.services_cn}}
								</view>
								<view class="checkout-item-1-2">{{item.services_desc}}</view>
							</view>
							<view class="checkout-item-2">
								<view class="checkout-item-2-1">¥ {{ parseInt(item.originally_money/100) }}.00</view>
								<view class="checkout-item-2-2">¥ {{parseInt(item.money/100)}}.00</view>
							</view>
							<view class="checkout-item-3">
								<switch style="transform:scale(0.6)" type="switch" color="#0AA0A8"
									:checked="freeCheckedCheckoutList.indexOf(item.id) != -1 "
									@change="checkoutItemChecked($event,item.id,parseInt(item.money/100),parseInt(item.originally_money/100))" />
							</view>
						</view>
						<view class="checkout-item checkout-total">
							<view class="checkout-total-1">
								<image src="./static/total-today.png" mode="aspectFill"></image>
								<view class="checkout-total-1-c">
									<view class="checkout-total-1-1">Total</view>
									<view class="checkout-total-1-2">Including Tax</view>
								</view>
							</view>
							<view class="checkout-total-3">
								<view class="checkout-total-3-1">¥ {{freeCheckoutNowTotalValue}}.00</view>
								<view class="checkout-total-3-2">¥ {{freeCheckoutOldTotalValue}}.00</view>
							</view>
						</view>
						<view class="checkout-btn">
							<button type="default" v-if="businessLevel==2" @click="createPromotion">Promotions</button>
							<button type="default" v-if="businessLevel==1" @click="turnUpgrade">Save & Upgrade</button>
						</view>
					</view>
				</swiper-item>
				<swiper-item class="swiperitem" v-if="businessLevel <= 3">
					<view class="swiperitem-container">
						<view class="checkout-title">{{i18n.jobspriceforplusmembers}}</view>
						<view class="checkout-feature">Get featured on: </view>
						<view class="checkout-item" v-for="(item,index) in plusServiceList" :key="index">
							<view class="checkout-item-1">
								<view class="checkout-item-1-1" v-if="languageValue == 'en-US'">{{item.services_en}}
								</view>
								<view class="checkout-item-1-1" v-if="languageValue == 'zh-CN'">{{item.services_cn}}
								</view>
								<view class="checkout-item-1-2">{{item.services_desc}}</view>
							</view>
							<view class="checkout-item-2">
								<view class="checkout-item-2-1">¥ {{ parseInt(item.originally_money/100) }}.00</view>
								<view class="checkout-item-2-2">¥ {{parseInt(item.money/100)}}.00</view>
							</view>
							<view class="checkout-item-3">
								<switch style="transform:scale(0.6)" type="switch" color="#0AA0A8"
									:checked="freeCheckedCheckoutList.indexOf(item.id) != -1 "
									@change="checkoutItemChecked($event,item.id,parseInt(item.money/100),parseInt(item.originally_money/100))" />
							</view>
						</view>
						<view class="checkout-item checkout-total">
							<view class="checkout-total-1">
								<image src="./static/total-today.png" mode="aspectFill"></image>
								<view class="checkout-total-1-c">
									<view class="checkout-total-1-1">Total</view>
									<view class="checkout-total-1-2">Including Tax</view>
								</view>
							</view>
							<view class="checkout-total-3">
								<view class="checkout-total-3-1">¥ {{freeCheckoutNowTotalValue}}.00</view>
								<view class="checkout-total-3-2">¥ {{freeCheckoutOldTotalValue}}.00</view>
							</view>
						</view>
						<view class="checkout-btn">
							<button type="default" v-if="businessLevel==3" @click="createPromotion">Promotions</button>
							<button type="default" v-if="businessLevel<3" @click="turnUpgrade">Save & Upgrade</button>
						</view>
					</view>
				</swiper-item>

			</swiper>
		</view>
	</view>

</template>

<script>
	import jobs from '@/api/jobs.js';
	import profile from '@/api/profile.js';
	export default {
		data() {
			return {
				languageValue: 'en-US',
				serviceList: [],
				freeCheckedCheckoutList: [],
				freeCheckoutNowTotalValue: 0,
				freeCheckoutOldTotalValue: 0,
				jobId: 0,
				jobTitleValue: 'Promotion',
				swiperHeight: 300,
				businessLevel: 1,
				basicServiceList: [],
				proServiceList: [],
				plusServiceList: [],

			}
		},
		computed: {
			i18n() {
				return this.$t('index')
			}
		},
		onLoad(option) {
			if (uni.getStorageSync('language') != '') {
				this.languageValue = uni.getStorageSync('language')
			}
			this.getBasicUserInfo();
			this.jobId = option.id
		},
		methods: {
			turnUpgrade(){
				uni.navigateTo({
					url:'/pages/me/upgrade'
				})
			},
			checkoutChange(e) {
				console.log(e)
				this.freeCheckedCheckoutList = [];
				this.freeCheckoutNowTotalValue = 0;
				this.freeCheckoutOldTotalValue = 0;
			},
			getBasicUserInfo() {
				var that = this;
				let uid = uni.getStorageSync('uid');
				let token = uni.getStorageSync('token');

				let data = {
					id: uid,
					token: token
				}

				profile.getBasicInfo(data).then(res => {
					console.log(res)
					if (res.code == 200) {
						let businessInfo = res.message.business_info;

						that.businessUserInfo = businessInfo;
						that.businessId = businessInfo.id;
						that.businessName = businessInfo.business_name;
						if (this.isYouTheInterview == 1) {
							that.theInterviewName = businessInfo.first_name + ' ' + businessInfo.last_name;
							that.theInterviewNationality = businessInfo.nationality;
							that.theInterviewPhoto = businessInfo.profile_photo;
						}
						that.businessLevel = businessInfo.level;
						that.getJobServiceList();
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
			createPromotion() {
				var that = this;
				let freeCheckedCheckoutList = that.freeCheckedCheckoutList

				if (freeCheckedCheckoutList.length > 0) {
					uni.showLoading({
						title: 'loading',
						mask: true
					})
					let service_data = {
						job_id: that.jobId,
						services: that.freeCheckedCheckoutList,
						token: uni.getStorageSync('token')
					}
					jobs.addJobServices(service_data).then(res => {
						console.log(res)
						if (res.code == 200) {

							let pre_data = {
								token: uni.getStorageSync('token'),
								// total_fee: 1,
								total_fee: res.data.money,
								order_id: res.data.order_id,
								body: this.jobTitleValue
							}
							// #ifdef H5
							jobs.getPrepayId(pre_data).then(res => {
								// console.log(res)
								uni.hideLoading();
								let wxpayData = res.message;
								this.$jwx.wxpay(wxpayData, function(result) {
									console.log(result)
									if (result.code == 1) {
										uni.reLaunch({
											url: '/pages/jobs/index?current=0'
										})
									}
									if (result.code == -1) {
										uni.navigateTo({
											url:'/pages/public/payment/payment'
										})
									}
								})

							}).catch(error => {
								console.log(error)
							})
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
										uni.reLaunch({
											url: '/pages/jobs/index?current=0'
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

						}
					}).catch(error => {
						console.log(error)
					})
				}

			},
			checkoutItemChecked(e, index, oldValue, nowValue) {
				let freeCheckedCheckoutList = this.freeCheckedCheckoutList;
				if (freeCheckedCheckoutList.indexOf(index) == -1) {
					this.freeCheckedCheckoutList.push(index);
					this.freeCheckoutNowTotalValue = this.freeCheckoutNowTotalValue + nowValue;
					this.freeCheckoutOldTotalValue = this.freeCheckoutOldTotalValue + oldValue;
				} else {
					this.freeCheckedCheckoutList.splice(this.freeCheckedCheckoutList.indexOf(index), 1);
					this.freeCheckoutNowTotalValue = this.freeCheckoutNowTotalValue - nowValue;
					this.freeCheckoutOldTotalValue = this.freeCheckoutOldTotalValue - oldValue;
				}
			
			},
			getJobServiceList() {
				let token = uni.getStorageSync('token');

				let data = {
					token: token,
					identity: 2,
					page: 1,
					limit: 200
				}

				jobs.serviceList(data).then(res => {
					console.log(res)
					if (res.code == 200) {
						let level = this.businessLevel;
						let result = res.message.data;

						let basicServiceList = result.filter(item => item.level == 1);
						this.basicServiceList = basicServiceList;
						let basicLen = basicServiceList.length;

						let proServiceList = result.filter(item => item.level == 2);
						this.proServiceList = proServiceList;
						let proLen = proServiceList.length;

						let plusServiceList = result.filter(item => item.level == 3);
						this.plusServiceList = plusServiceList;
						let plusLen = plusServiceList.length;

						let len = Math.max(basicLen, proLen, plusLen);
						this.swiperHeight = 460 + (len * 140);

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
	page {
		background-color: #F4F5F6;
	}

	.checkout {
		margin-top: 20rpx;
		padding: 20rpx 0;
	}

	.imageContainer {
		width: 100%;
	}

	.swiperitem {
		box-sizing: border-box;
	}

	.swiperitem-container {
		width: 98%;
		height: 100%;
		margin: 0 auto;
		background-color: #FFFFFF;
		border-radius: 20rpx;
		box-sizing: border-box;
		overflow-y: scroll;
		padding: 4rpx;
	}

	.post-this-job {
		margin-top: 20rpx;
		padding-top: 40rpx;
		padding-bottom: 40rpx;
		background-color: #FFFFFF;

	}

	.post-this-job button {
		width: 80%;
		height: 80rpx;
		line-height: 80rpx;
		background-color: #0AA0A8;
		color: #FFFFFF;
	}

	.checkout-t {
		text-align: center;
		font-size: 34rpx;
		font-weight: 700;
		line-height: 80rpx;
		color: #FFFFFF;
	}

	.checkout-title {
		text-align: center;
		font-size: 32rpx;
		font-weight: 700;
		padding: 20rpx;
		border-bottom: 1rpx solid #EEEEEE;
	}

	.checkout-feature {
		font-size: 30rpx;
		font-weight: 700;
		text-indent: 20rpx;
		line-height: 80rpx;
	}

	.checkout-item {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		height: 140rpx;
		padding-left: 20rpx;
	}

	.checkout-item-1 {
		width: 52%;
		text-align: center;
	}

	.checkout-item-1-1 {
		font-size: 28rpx;
		text-align: left;
		height: 50rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		padding-right: 16rpx;
	}

	.checkout-item-1-2 {
		font-size: 24rpx;
		text-align: left;
		color: #808080;
		height: 90rpx;
		word-wrap: break-word;
		word-break: break-all;
		text-overflow: ellipsis;
		overflow: hidden;
		padding-right: 10rpx;
	}

	.checkout-item-2 {
		width: 30%;
		text-align: left;
	}

	.checkout-item-2-1 {
		font-size: 28rpx;
		height: 50rpx;
		text-decoration: line-through;
		color: #808080;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.checkout-item-2-2 {
		font-size: 28rpx;
		height: 90rpx;
	}

	.checkout-item-3 {
		width: 18%;
		text-align: center;
		height: 140rpx;
	}

	.checkout-total {
		border-top: 1rpx solid #EEEEEE;
		padding-top: 40rpx;
	}

	.checkout-total-1 {
		width: 70%;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}

	.checkout-total-1 image {
		width: 80rpx;
		height: 80rpx;
	}

	.checkout-total-1-c {
		margin-left: 10rpx;
	}

	.checkout-total-1-1 {
		font-size: 30rpx;
		font-weight: 700;
	}

	.checkout-total-1-2 {
		font-size: 28rpx;
		color: #808080;
	}

	.checkout-total-3 {
		width: 30%;
	}

	.checkout-total-3-1 {
		font-size: 28rpx;
		text-decoration: line-through;
		color: #808080;

	}

	.checkout-total-3-2 {
		font-size: 34rpx;
		color: #00B3D2;
	}

	.checkout-btn {
		margin-top: 20rpx;
	}

	.checkout-btn button {
		background-color: #0AA0A8;
		color: #FFFFFF;
		line-height: 80rpx;
		font-size: 30rpx;
		width: 90%;
		margin: 0 auto;
	}

	.checkout-attention {
		margin-top: 20rpx;
	}
</style>
