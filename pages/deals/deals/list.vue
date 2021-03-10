<template>
	<view class="uni-flex uni-column list">
		<view class="empty-image" v-if="showEmptyStatus">
			<image src="@/static/esl/empty.png" mode="aspectFit"></image>
		</view>
		<view class="flex-item list-container" v-if="showEmptyStatus===false">
			<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="reachBottom" >
				<view class=" list-item" v-for="(item,index) in dealsList" :key="index">
					<view class="list-item-l">
						<view class="interview-photo" >
							<image  @click="turnVendorProfile(item.user_id)" :src="item.user_info.logo" mode="aspectFit"></image>
						</view>
					</view>
					<view class="list-item-r"  @click="turnDealsDetail(item.id)">
						<view class="job-title">{{item.title}}</view>
						<view class="list-item-2">
							<view class="tags-item">
								<text >{{item.user_info.vendor_name_en}}</text>
							</view>
							<view class="tags-item">
								<text>{{item.location}}</text>
							</view>
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
								<text >Dog Friendly</text>
							</view>
						
						</view>
					</view>

				</view>
				<u-loadmore :status="status" :load-text="loadText" bgColor="#f4f5f6" />
			</scroll-view>

		</view>
		<selectRolePopup :rolePopupStatus="rolePopupStatus" :selectRoleIdentity="selectRoleIdentity" @close="rolePopupStatus=false"></selectRolePopup>
	</view>
</template>

<script>
	import deals from '@/api/deals.js';
	import selectRolePopup from '@/components/select-role-popup/select-role-popup.vue'
	
	export default {
		data() {
			return {
				dealsList: [],
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
				showEmptyStatus:false,
				rolePopupStatus: false,
				selectRoleIdentity: 0,
			}
		},
		components:{
			selectRolePopup
		},
		computed: {
			i18n() {
				return this.$t('index')
			}
		},
		onLoad(option) {
			this.cityId = option.cityId;
			this.typeId = option.typeId;
			this.getDealsList(this.page, this.limit, this.cityId,this.typeId);
		},
		methods: {
			turnVendorProfile(userId){
				// #ifdef H5
				var url = window.location.href;
				var origin = window.location.origin;
				let turn_url = origin+'/esl_h5/pages/me/vendor/share?id='+userId +'&type=deals';
				window.location.href = turn_url;
				// #endif
				
				// #ifndef H5
				uni.navigateTo({
					url:'/pages/me/vendor/share?id='+userId +'&type=deals'
				})
				// #endif
			
				
			},
			getDealsList(page, limit, city_id,type_id) {
				let data = {
					token: uni.getStorageSync('token'),
					page: page,
					limit: limit,
					city: city_id,
					vendor_type_id:type_id
				}
				deals.dealsList(data).then(res => {
					console.log(res)
					if (res.code == 200) {
						this.dealsList = this.dealsList.concat(res.message.data);
						if(this.dealsList.length>0){
							this.showEmptyStatus=false;
						}else{
							this.showEmptyStatus=true;
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
			getDealsListRefresh(page, limit, city_id,type_id) {
				let data = {
					token: uni.getStorageSync('token'),
					page: page,
					limit: limit,
					city: city_id,
					vendor_type_id:type_id
				}
				deals.dealsList(data).then(res => {
					console.log(res)
					if (res.code == 200) {
						this.dealsList = res.message.data;
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
					this.getDealsList(this.page, this.limit, this.cityId,this.typeId);
					if (this.page >= this.lastPage) {
						this.status = 'nomore';
					} else {
						this.status = 'loading';
					}
				}, 1200)

			},
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
			this.getDealsListRefresh(1, this.limit, this.cityId,this.typeId);
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
	}
</script>

<style>
	page {
		background-color: #F4F5F6;
	}

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
	.list-item-l{
		width: 20%;
		height: 100%;
		display: flex;
		align-items: center;
		flex-direction: row;
		justify-content: center;
	}
	
	.list-item-r{
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


	.job-title {
		width: 100%;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		font-size: 34rpx;
		font-weight: 700;
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
		height:120rpx;
		width: 120rpx;
	}

	.interview-photo image {
		width:100%;
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
	.tag-dog-friendly{
		background-color: #00B3D2;
		color: #FFFFFF;
	}
	.tag-all-locations{
		background-color: #00B3D2;
		color: #FFFFFF;
	}
	.tag-limit{
		background-color: #00B3D2;
		color: #FFFFFF;
	}
	.tag-deal{
		background-color: #00B3D2;
		color: #FFFFFF;
	}
	.tag-discount{
		background-color: #00B3D2;
		color: #FFFFFF;
	}
</style>
