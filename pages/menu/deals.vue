<template>
	<view class="uni-flex uni-column index-bg">
		<view class="flex-item flex-item-V ">
			<view class="page-section swiper">
				<view class="page-section-spacing">
					<swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
						<swiper-item v-for="(item,index) in adsListTop" :key="index" @click="turnBanner(item.relative_link)">
							<view class="swiper-item">
								<image :src="item.url" mode="scaleToFit" lazy-load="true"></image>
							</view>
						</swiper-item>
					</swiper>
				</view>
			</view>
		</view>
		<view class="flex-item location-filter">
			<view class="location-button " :class="selectLocationValue===89 ? 'location-shanghai-active' : ''" @click="selectLocation(89)">{{i18n.dealsshanghai}}</view>
			<view class="location-button  location-other" :class="selectLocationValue===0 ? 'location-other-active' : ''" @click="selectLocation(0)">{{i18n.dealsother}}</view>
		</view> 
		<view class="flex-item flex-item-V index-box">
			<view class="index-box-box">
				<view class="index-box-item " :class="selectLocationValue===89 ? 'animate__animated animate__fadeInRight' : 'animate__animated animate__fadeInLeft' " @click="turnEventsList()">
					<image  src="/static/deals/events-1.png" class="image" mode="aspectFit" /> <br>
					<text class="text">{{i18n.dealsevents}}</text>
				</view>
				<view class="index-box-item" :class="selectLocationValue===89 ? 'animate__animated animate__fadeInRight' : 'animate__animated animate__fadeInLeft' "  @click="turnDealsList(18)" >
					<image src="/static/deals/fitness-1.png" class="image" mode="aspectFit" /> <br>
					<text class="text">{{i18n.dealsfintness}}</text>
				</view>
				<view class="index-box-item" :class="selectLocationValue===89 ? 'animate__animated animate__fadeInRight' : 'animate__animated animate__fadeInLeft' "  @click="turnDealsList(19)" >
					<image src="/static/deals/health-1.png" class="image" mode="aspectFit" /> <br>
					<text class="text">{{i18n.dealshealth}}</text>
				</view>
				<view class="index-box-item" :class="selectLocationValue===89 ? 'animate__animated animate__fadeInRight' : 'animate__animated animate__fadeInLeft' "  @click="turnDealsList(20)" >
					<image src="/static/deals/food-bev-1.png" class="image" mode="aspectFit" /> <br>
					<text class="text">{{i18n.dealsfoodandbev}}</text>
				</view>
				<view class="index-box-item" :class="selectLocationValue===89 ? 'animate__animated animate__fadeInRight' : 'animate__animated animate__fadeInLeft' "  @click="turnDealsList(21)" >
					<image src="/static/deals/spa-1.png" class="image" mode="aspectFit" /> <br>
					<text class="text">{{i18n.dealsspaandbeauty}}</text>
				</view>
				<view class="index-box-item" :class="selectLocationValue===89 ? 'animate__animated animate__fadeInRight' : 'animate__animated animate__fadeInLeft' "  @click="turnDealsList(22)" >
					<image src="/static/deals/other-1.png" class="image" mode="aspectFit" /> <br>
					<text class="text">{{i18n.dealsother}} </text>
				</view>
			</view>
		</view>
		<!-- recent deals -->
		<view class="flex-item flex-item-V latest-deals" v-if="recentDealsList.length>0">
			<view class="latest-deals-title">
				{{i18n.dealsrecentdeals}}
			</view>
			<swiper class="latest-deals-swiper" :indicator-dots="false" :autoplay="true" :interval="2000">
				<swiper-item v-for="(item,index) in recentDealsList" :key="index" @click="turnDealsDetail(item.id)">
					<view class="latest-deals-item ">
						<view class="latest-deals-item-top">
							<view class="latest-deals-item-l">
								<image v-if="item.user_info" :src="item.user_info.logo" mode="aspectFit" lazy-load></image>
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
		
		<view class="flex-item events-slider">
			<swiper class="swiper" :indicator-dots="false"  :autoplay="true" :interval="5000" :duration="600">
				<swiper-item v-for="(item,index) in adsListMid" :key="index" @click="turnBanner(item.relative_link)">
					<view class="swiper-item">
						<image :src="item.url" mode="scaleToFit" lazy-load="true"></image>
					</view>
				</swiper-item>
			</swiper>
		</view>
		<contactus @close="showContactStatus=false" :showContact="showContactStatus"></contactus>
		<selectRolePopup :rolePopupStatus="rolePopupStatus" :selectRoleIdentity="selectRoleIdentity" @close="rolePopupStatus=false"></selectRolePopup>
	</view>

</template>

<script>
	import deals from '@/api/deals.js'
	import profile from '@/api/profile.js';
	import ads from '@/api/ads.js';
	import selectRolePopup from '@/components/select-role-popup/select-role-popup.vue';
	import contactus from "@/components/xll-contact-us/xll-contact-us.vue";
	
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
				selectLocationValue:89,
				subCateList:[],
				adsList:[],
				adsListTop:[],
				adsListMid:[],
				adsListBottom:[],
				recentDealsList:[],
				rolePopupStatus: false,
				selectRoleIdentity: 0,
				showContactStatus: false,
				
			}
		},
		components:{
			selectRolePopup,
			contactus,
		},
		onShow() {
			
		},
		onLoad(option) {
			var that = this;
			this.getSubCateList(3);
			this.getAdsList();
			this.getRecentDealsList(1,6)
		},
		computed: {
			i18n() {
				return this.$t('index')
			}
		},
		methods: {
			turnDealsDetail(id) {
				let identity = uni.getStorageSync('identity')
				if (identity == 0) {
					this.rolePopupStatus = true;
					this.selectRoleIdentity = 0;
				}else{
					// #ifdef H5
					var url = window.location.href;
					var origin = window.location.origin;
					let turn_url = origin+'/esl_h5/pages/me/deals/detail?id='+id;
					window.location.href = turn_url;
					// #endif
					// #ifndef H5
					uni.navigateTo({
						url:'/pages/me/deals/detail?id='+id
					})
					// #endif
				}
				
				
			},
			selectLocation(value){
				this.selectLocationValue = value;
			},
			getSubCateList(pid){
				let data = {
					token:uni.getStorageSync('token'),
					pid:pid
				}
				profile.getSubCateList(data).then(res=>{
					console.log(res)
					if(res.code == 200){
						this.subCateList=res.message;
					}else{
						uni.showToast({
							title:res.msg,
							icon:'none'
						})
					}
				}).catch(error=>{
					console.log(error)
				})
			},
			turnEventsList(){
				let cityId = this.selectLocationValue;
				uni.navigateTo({
					url:'/pages/deals/events/list?cityId='+ cityId
				})
			},
			turnDealsList(id){
				let cityId = this.selectLocationValue;
				uni.navigateTo({
					url:'/pages/deals/deals/list?cityId='+cityId+'&typeId='+id
				})
			},
			getAdsList(){
				let data = {
					page:1,
					limit:1000,
					cate:6
				}
				ads.list(data).then(res=>{
					console.log(res)
					if(res.code == 200){
						this.adsListTop = res.message.data.filter(item=>item.position==1)
						this.adsListMid = res.message.data.filter(item=>item.position==2)
						this.adsListBottom = res.message.data.filter(item=>item.position==3)
					}else{
						uni.showToast({
							title:res.msg,
							icon:'none'
						})
					}
					
					
				}).catch(error=>{
					console.log(error)
				})
			},
			turnBanner(relativeLink){
				// if(link!=''){
				// 	window.location.href=link;
				// }
				if(relativeLink !=''){
					uni.navigateTo({
						url:relativeLink
					})
				}else{
					this.showContactStatus =true;
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
			
		},
		onShareAppMessage:function(){
			
		},
		onShareTimeline:function(){
			
		},
		onAddToFavorites:function(){
			
		},
		onReady() {
			
		}
	}
</script>

<style>
	/* banner 750 * 340  */
	@import url("@/common/deals/index.css");
	@import url("@/common/deals/recent-deals.css");
	
</style>
