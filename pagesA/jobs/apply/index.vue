<template>
	<view class="uni-flex uni-column list">
		<view class="empty" v-if="showEmptyStatus">
			<u-empty :text="i18n.applicationsemptytips" mode="list"></u-empty>
		</view>
		<view class="flex-item list-container" v-if="showEmptyStatus===false">
			<view class=" list-item" v-for="(item,index) in jobsList" :key="index" @click="turnJobDetail(item.job_id)">
				<view class="list-item-l">
					<image :src="item.logo !='' ? item.logo : 'https://oss.esl-passport.cn/business.png' " mode="aspectFit"
					 lazy-load></image>
				</view>
				<view class="list-item-r">
					<view class="job-title">{{item.job_title}}</view>
					<view class="salary">{{item.job.currency}} {{item.job.salary_min}}-{{item.job.salary_max}}</view>
					<view class="list-item-4">
						<view class="interview-name">
							{{item.job.business_name}}
						</view>
						<view class="job-location">
							{{item.job.job_location}}
						</view>
					</view>
				</view>

			</view>
			<u-loadmore :status="status" :load-text="loadText" bgColor="#f4f5f6" />
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
				showEmptyStatus: false
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
			this.getJobList(this.page, this.limit);
		},
		methods: {
			getJobList(page, limit) {
				let data = {
					token: uni.getStorageSync('token'),
					page: page,
					limit: limit
				}
				jobs.myApplyJobs(data).then(res => {
					console.log(res)
					if (res.code == 200) {

						this.jobsList = this.jobsList.concat(res.message.data);
						if (this.jobsList.length > 0) {
							this.showEmptyStatus = false;
						} else {
							this.showEmptyStatus = true;
						}
						this.lastPage = res.message.last_page;
						// this.page ++;
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
			getJobListRefresh(page, limit) {
				let data = {
					token: uni.getStorageSync('token'),
					page: page,
					limit: limit
				}
				jobs.myApplyJobs(data).then(res => {
					// console.log(res)
					if (res.code == 200) {
						this.jobsList = res.message.data;
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
			turnJobDetail(id) {
				// #ifdef H5
				var url = window.location.href;
				var origin = window.location.origin;
				let turn_url = origin + '/esl_h5/pagesA/jobs/details?id=' + id;
				window.location.href = turn_url;
				// #endif
				// #ifndef H5
				uni.navigateTo({
					url:'/pagesA/jobs/details?id='+id
				})
				// #endif
				
			}

		},
		onReachBottom:function(){
			if (this.page >= this.lastPage) return;
			this.status = 'loading';
			this.page++;
			setTimeout(() => {
				this.getJobList(this.page, this.limit);
				if (this.page >= this.lastPage) {
					this.status = 'nomore';
				} else {
					this.status = 'loading';
				}
			}, 1200)
		},
		onPullDownRefresh: function() {
			this.page = 1;
			this.getJobListRefresh(1, this.limit);
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
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
	@import url("@/common/jobs/applylist.css");
</style>
