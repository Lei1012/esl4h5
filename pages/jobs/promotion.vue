<template>
	<view>
		<view class="service">
			<view class="checkout-item" v-for="(item,index) in serviceList" :key="index" @click="checkedCheckoutItem(item.id,item.money,item.money+10000)">
				<view class="checkout-item-1">
					<image v-if="freeCheckedCheckoutList.indexOf(item.id) == -1" src="./static/ok-1.png" mode="aspectFill"></image>
					<image v-if="freeCheckedCheckoutList.indexOf(item.id) != -1" src="./static/ok-3.png" mode="aspectFill"></image>
				</view>
				<view class="checkout-item-2" :class="freeCheckedCheckoutList.indexOf(item.id) == -1 ? '' : 'checkout-item-2-active'">
					<text v-if="languageValue == 'en-US'">{{item.services_en}}</text>
					<text v-if="languageValue == 'zh-CN'">{{item.services_cn}}</text>
					<br>
					<text>{{item.services_desc}}</text>
				</view>
				<view class="checkout-item-3">
					<text :class="freeCheckedCheckoutList.indexOf(item.id) == -1 ? '' : 'checkout-item-3-active'">¥ {{ (item.money + 10000) / 100}}</text>
					<br>
					<text :class="freeCheckedCheckoutList.indexOf(item.id) == -1 ? '' : 'checkout-item-3-active'">¥ {{item.money / 100}}</text>
				</view>
			</view>
		</view>
		<view class="checkout-item checkout-total">
			<view class="checkout-item-1">
				<image src="./static/total-today.png" mode="aspectFill"></image>
			</view>
			<view class="checkout-item-2">
				<text>Total</text>
				<br>
				<text>Including Tax</text>
			</view>
			<view class="checkout-item-3">
				<text :class="freeCheckoutNowTotalValue!=0 ? 'checkout-item-3-active' : ''">¥ {{freeCheckoutNowTotalValue/100}}.00</text>
				<br>
				<text :class="freeCheckoutOldTotalValue!=0 ? 'checkout-item-3-active' : ''">¥ {{freeCheckoutOldTotalValue/100}}.00</text>
			</view>
		</view>
		<view class="button">
			<button type="default" @click="createPromotion">Create Promotion</button>
		</view>
	</view>

</template>

<script>
	import jobs from '@/api/jobs.js';
	export default {
		data() {
			return {
				languageValue: 'en-US',
				serviceList: [],
				freeCheckedCheckoutList: [],
				freeCheckoutNowTotalValue: 0,
				freeCheckoutOldTotalValue: 0,
				jobId:0,
				jobTitleValue:'Promotion'
			}
		},
		onLoad(option) {
			if (uni.getStorageSync('language') != '') {
				this.languageValue = uni.getStorageSync('language')
			}
			this.getJobServiceList()
			this.jobId = option.id
		},
		methods: {
			createPromotion(){
				var that = this;
				let freeCheckedCheckoutList = that.freeCheckedCheckoutList
				
				if(freeCheckedCheckoutList.length>0){
					uni.showLoading({
						title:'loading',
						mask:true
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
									// if (result.code == -1) {
									// 	uni.reLaunch({
									// 		url: '/'
									// 	})
									// }
								})
								
							}).catch(error => {
								console.log(error)
							})
							// #endif
							
							// #ifdef MP-WEIXIN
							jobs.miniAppPay(pre_data).then(res=>{
								console.log(res)
								uni.hideLoading();
								let wxpayData = res.message;
								uni.requestPayment({
								    provider: 'wxpay',
								    timeStamp: wxpayData.timeStamp,
								    nonceStr: wxpayData.nonceStr,
								    package: wxpayData.package,
								    signType:wxpayData.signType,
								    paySign: wxpayData.paySign,
								    success: function (res) {
								        uni.reLaunch({
								        	url: '/pages/jobs/index?current=0'
								        })
								    },
								    fail: function (err) {
										console.log(err)
										uni.navigateTo({
											url:'/pages/public/payment/payment'
										})
								    }
								});
							}).catch(error=>{
								console.log(error)
							})
							
							// #endif
							
						}
					}).catch(error => {
						console.log(error)
					})
				}
				
			},
			checkedCheckoutItem(index, oldValue, nowValue) {
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
				// console.log(this.freeCheckedCheckoutList)
			},
			getJobServiceList() {
				let data = {
					token: uni.getStorageSync('token')
				}
				jobs.serviceList(data).then(res => {
					console.log(res)
					if (res.code == 200) {
						this.serviceList = res.message;
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
		onShareAppMessage:function(){
			
		},
		onShareTimeline:function(){
			
		},
		onAddToFavorites:function(){
			
		},
	}
</script>

<style>
	page {
		background-color: #FFFFFF;
	}

	.service {
		border-bottom: 1rpx solid #EEEEEE;
		padding-bottom: 20rpx;
	}

	.checkout-item {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		margin-top: 20rpx;
	}

	.checkout-item-1 {
		width: 15%;
		text-align: center;
	}

	.checkout-item-1 image {
		width: 60rpx;
		height: 60rpx;

	}

	.checkout-item-2 {
		width: 60%;
		text-align: left;
	}

	.checkout-item-2 text:first-child {
		font-size: 30rpx;
		color: #515151;
	}

	.checkout-item-2 text:nth-child(3) {
		font-size: 30rpx;
		color: #bfbfbf;
	}

	.checkout-item-3 {
		width: 25%;
		text-align: center;
	}


	.checkout-item-3 text:first-child {
		font-size: 30rpx;
		color: #bfbfbf;
		text-decoration: line-through;
	}

	.checkout-item-3 text:nth-child(3) {
		font-size: 30rpx;
		color: #1d87ae;
	}


	.checkout-total {}

	.checkout-item-2-active {
		font-weight: 700;
		font-size: 34rpx;
	}

	.checkout-item-3-active {
		font-weight: 700;
		font-size: 38rpx;
	}

	.button {
		width: 100%;
		margin-top: 40rpx;
		padding-bottom: 80rpx;
	}

	.button button {
		width: 80%;
		height: 80rpx;
		line-height: 80rpx;
		background-color: #0AA0A8;
		color: #FFFFFF;
	}
</style>
