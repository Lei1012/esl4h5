<template>
	<view class="uni-flex uni-column list">
		<view class="empty-image" v-if="showEmptyStatus">
			<image src="@/static/esl/empty.png" mode="aspectFit"></image>
		</view>
		<view class="flex-item list-container" v-if="showEmptyStatus===false">
			<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="reachBottom" >
				
				<view class=" list-item" v-for="(item,index) in jobsList" :key="index" @click="turnJobDetail(item.user_id)">
					<view class="list-item-l">
						<image :src="item.educator.profile_photo != '' ? item.educator.profile_photo : 'https://oss.esl-passport.cn/educator.png' " mode="aspectFit"></image>
					</view>
					<view class="list-item-r">
						<view class="list-item-r-t">
							<view class="job-title">{{item.job_title}}</view>
						</view>
						<view class="list-item-2">
							<view class="salary">
								<text v-if="item.currency=='CNY'">¥</text>
								<text v-if="item.currency=='USD'">$</text>
								<text v-if="item.currency!='CNY' && item.currency !='USD'">{{item.currency}}</text>
								<text>{{item.salary_min}}-{{item.salary_max}}</text>
							</view>
							<view class="job-type" v-if="item.employment_type==1">{{i18n.jobslistemploymentfulltime}}</view>
							<view class="job-type" v-if="item.employment_type==2">{{i18n.jobslistemploymentparttime}}</view>
							<view class="job-type" v-if="item.employment_type==3">{{i18n.jobslistemploymentseasonal}}</view>
						</view>
						<view class="list-item-3">
							{{item.business_name}}
						</view>
					</view>
				</view>
				<u-loadmore :status="status" :load-text="loadText" bgColor="#f4f5f6" />
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import jobs from '@/api/jobs.js';
	export default {
		data() {
			return {
				jobsList: [],
				page: 1,
				limit: 6,
				status: 'loadmore',
				lastPage: 0,
				loadText: {
					loadmore: 'load more',
					loading: 'loading',
					nomore: 'no more'
				},
				jobId: 0,
				showEmptyStatus:false

			}
		},
		computed: {
			i18n() {
				return this.$t('index')
			}
		},
		onShow() {
			
		},
		onLoad(option) {
			this.jobId = option.id;
			this.getJobResumeList(this.page, this.limit);
			// this.getJobList(this.page, this.limit);
		},
		methods: {
			getJobResumeList(page, limit) {
				let data = {
					token: uni.getStorageSync('token'),
					page: page,
					limit: limit,
					job_id: this.jobId
				}
				jobs.getJobResume(data).then(res => {
					console.log(res)
					if (res.code == 200) {
						this.jobsList = this.jobsList.concat(res.message.data);
						if(this.jobsList.length>0){
							this.showEmptyStatus=false;
						}else{
							this.showEmptyStatus=true;
						}
						this.lastPage = res.message.last_page;
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
					this.getJobList(this.page, this.limit);
					if (this.page >= this.lastPage) {
						this.status = 'nomore';
					} else {
						this.status = 'loading';
					}
				}, 1200)

			},
			turnJobDetail(id) {
				// #ifdef H5
				var url = window.location.href;
				var origin = window.location.origin;
				let turn_url = origin+'/esl_h5/pagesB/me/educator/share?id='+id + '&type=resume';
				window.location.href = turn_url;
				// #endif
				// #ifndef H5
				uni.navigateTo({
					url:'/pagesB/me/educator/share?id='+id + '&type=resume'
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
	@import url("@/common/jobs/list.css");
	.item-container{
		width: 98%;
		margin: 0 auto;
	}
	.profile-photo,.header-photo{
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
	}
	.profile-photo image,.header-photo image{
		width: 120rpx;
		height: 120rpx;
		border-radius: 120rpx;
	}
	.video-intro{
		
	}
	/deep/ .u-collapse-body{
		height: auto;
	}
</style>
