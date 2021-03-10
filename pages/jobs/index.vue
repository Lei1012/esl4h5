<template>
	<view class="wrap">
		<view class="u-tabs-box">
			<u-tabs-swiper activeColor="#0aa0a8" ref="tabs" :list="list" :current="current" @change="change" :is-scroll="false"
			 swiperWidth="750"></u-tabs-swiper>
		</view>
		<swiper class="swiper-box" :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish">
			<swiper-item class="swiper-item">
				<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="reachBottomApproved()">

					<view class=" list-item" v-for="(item,index) in jobsListApproved" :key="index">
						<view class="edit" @click="turnEditJob(item.id)">
							<image src="./static/jobs/edit-job.png" mode="aspectFill"></image>
						</view>
						<view class="list-item-left">
							<image @click="turnBusinessProfile(item.user_id)" :src="item.logo !='' ? item.logo : 'https://oss.esl-passport.cn/business.png' " mode="aspectFit"></image>
						</view>
						<view class="list-item-right">
							<view class="job-title">{{item.job_title}}</view>
							<view class="salary">{{item.currency}} {{item.salary_min}}-{{item.salary_max}}</view>
							<view class="business-location">
								<view class="business-name">{{item.business_name}}</view>
								<view class="job-location">{{item.job_location}}</view>
							</view>
							<view class="xll-promotion-applications">
								<view class="xll-promotion" @click="turnPromotion(item.id)">{{i18n.myjobspromotion}}</view>
								<view class="xll-applications" @click="turnJobResume(item.id)">Applications: {{item.resume_count}}</view>
							</view>
						</view>

						<view class="xll-view-openclose">
							<view class="xll-views">{{i18n.myjobsviews}}: {{item.views}}</view>
							<view class="xll-openclose">
								{{i18n.myjobsopenclose}}:
								<switch style="transform:scale(0.7)" :checked="item.is_open==1" color="#0AA0A8" @change="changeJobOpenStatus(item.id,$event)" />
							</view>
						</view>
					</view>
					<u-loadmore :status="status" :load-text="loadText" bgColor="#f2f2f2" />
				</scroll-view>
			</swiper-item>

			<swiper-item class="swiper-item">
				<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="reachBottomUnderReview()">
					<view class="under-review-tips">
						<text>{{i18n.jobsunderreviewnote}} {{i18n.jobsunderreviewnotetxt}}</text>
					</view>
					<view class=" list-item" v-for="(item,index) in jobsListUnderReview" :key="index">
						<view class="edit" @click="turnEditJob(item.id)">
							<image src="./static/jobs/edit-job.png" mode="aspectFill"></image>
						</view>
						<view class="list-item-left">
							<image @click="turnBusinessProfile(item.user_id)" :src="item.logo !='' ? item.logo : 'https://oss.esl-passport.cn/business.png' " mode="aspectFit"></image>
						</view>
						<view class="list-item-right" @click="turnJobDetails(item.id)">
							<view class="job-title">{{item.job_title}}</view>
							<view class="salary">{{item.currency}} {{item.salary_min}}-{{item.salary_max}}</view>
							<view class="business-location">
								<view class="business-name">{{item.business_name}}</view>
								<view class="job-location">{{item.job_location}}</view>
							</view>
						</view>
					</view>
					<u-loadmore :status="status" :load-text="loadText" bgColor="#f2f2f2" />
				</scroll-view>
			</swiper-item>

			<swiper-item class="swiper-item">
				<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="reachBottomRejected()">

					<view class=" list-item" v-for="(item,index) in jobsListRejected" :key="index">
						<view class="list-item-left">
							<image @click="turnBusinessProfile(item.user_id)" :src="item.logo !='' ? item.logo : 'https://oss.esl-passport.cn/business.png' " mode="aspectFit"></image>
						</view>
						<view class="list-item-right" @click="turnJobDetails(item.id)">
							<view class="job-title">{{item.job_title}}</view>
							<view class="salary">{{item.currency}} {{item.salary_min}}-{{item.salary_max}}</view>
							<view class="business-location">
								<view class="business-name">{{item.business_name}}</view>
								<view class="job-location">{{item.job_location}}</view>
							</view>
						</view>
					</view>
					<u-loadmore :status="status" :load-text="loadText" bgColor="#f2f2f2" />
				</scroll-view>
			</swiper-item>
		</swiper>

	</view>

</template>

<script>
	import jobs from '@/api/jobs.js';

	export default {
		data() {
			var _this = this;
			return {
				list: [{
					name: _this.$t('index').jobsmyjobsapproved
				}, {
					name: _this.$t('index').jobsmyjobsunderreview
				}, {
					name: _this.$t('index').jobsmyjobsrejected
				}],
				current: 0,
				swiperCurrent: 0,
				tabsHeight: 0,
				dx: 0,
				jobsList: [],
				jobsListApproved: [],
				jobsListUnderReview: [],
				jobsListRejected: [],
				page: 1,
				pageApproved: 1,
				pageUnderReview: 1,
				pageRejected: 1,
				limit: 10,
				status: 'loadmore',
				lastPage: 0,
				lastPageApproved: 0,
				lastPageUnReview: 0,
				lastPageRejected: 0,
				loadText: {
					loadmore: 'load more',
					loading: 'loading',
					nomore: 'no more'
				},
				identity: 0,

			};
		},
		onLoad(option) {

			if (option.current) {
				this.current = option.current
				this.swiperCurrent = option.current
			}
			this.getJobListApproved(this.pageApproved, this.limit);
			this.getJobListUnderReview(this.pageUnderReview, this.limit);
			this.getJobListRejected(this.pageRejected, this.limit);

		},
		onShow() {

		},
		computed: {
			i18n() {
				return this.$t('index')
			}
		},
		methods: {
			changeJobOpenStatus(jobId, e) {

				var is_open;
				if (e.detail.value) {
					is_open = 1
				} else {
					is_open = 0
				}
				let data = {
					job_id: jobId,
					is_open: is_open,
					token: uni.getStorageSync('token')
				}

				jobs.changeJobs(data).then(res => {
					console.log(res)
					if (res.code == 200) {
						uni.showToast({
							title: '',
							icon: 'success'
						})
					} else {
						uni.showToast({
							title: res.msg
						})
					}
				}).catch(err => {
					console.log(err)
				})
			},
			turnHomepage() {
				uni.reLaunch({
					url: '/pages/home/index'
				})
			},
			trigger(e) {
				console.log(e)
				if (e.index == 0) {
					uni.switchTab({
						url: '/pages/home/index'
					})
				}
				if (e.index == 1) {
					uni.switchTab({
						url: '/pages/menu/job'
					})
				}
				if (e.index == 2) {
					uni.switchTab({
						url: '/pages/deals/index'
					})
				}
				if (e.index == 3) {
					uni.switchTab({
						url: '/pages/menu/me'
					})
				}

			},
			turnBusinessProfile(id) {
				// #ifdef H5
				var url = window.location.href;
				var origin = window.location.origin;
				let turn_url = origin + '/esl_h5/pages/me/business/share?id=' + id + '&type=job';
				window.location.href = turn_url;
				// #endif
				// #ifndef H5
				uni.navigateTo({
					url: '/pages/me/business/share?id=' + id + '&type=job'
				})
				// #endif

			},
			getJobListApproved(page, limit) {
				let data = {
					token: uni.getStorageSync('token'),
					page: page,
					limit: limit,
					status: 1
				}
				jobs.myJobs(data).then(res => {
					console.log(res)
					if (res.code == 200) {
						this.jobsListApproved = this.jobsListApproved.concat(res.message.data);
						this.lastPageApproved = res.message.last_page;
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
			getJobListUnderReview(page, limit) {
				let data = {
					token: uni.getStorageSync('token'),
					page: page,
					limit: limit,
					status: 0
				}

				jobs.myJobs(data).then(res => {
					console.log(res)
					if (res.code == 200) {
						this.jobsListUnderReview = this.jobsListUnderReview.concat(res.message.data);
						this.lastPageUnReview = res.message.last_page;
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
			getJobListRejected(page, limit) {
				let data = {
					token: uni.getStorageSync('token'),
					page: page,
					limit: limit,
					status: 2
				}

				jobs.myJobs(data).then(res => {
					console.log(res)
					if (res.code == 200) {
						this.jobsListRejected = this.jobsListRejected.concat(res.message.data);
						this.lastPageRejected = res.message.last_page;
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
			reachBottomApproved() {
				if (this.pageApproved >= this.lastPageApproved) return;
				this.status = 'loading';
				this.pageApproved++;
				setTimeout(() => {
					this.getJobListApproved(this.pageApproved, this.limit);
					if (this.pageApproved >= this.lastPageApproved) {
						this.status = 'nomore';
					} else {
						this.status = 'loading';
					}
				}, 1200)
			},
			reachBottomUnderReview() {
				if (this.pageUnderReview >= this.lastPageUnReview) return;
				this.status = 'loading';
				this.pageUnderReview++;
				setTimeout(() => {
					this.getJobListUnderReview(this.pageUnderReview, this.limit);
					if (this.pageUnderReview >= this.lastPageUnReview) {
						this.status = 'nomore';
					} else {
						this.status = 'loading';
					}
				}, 1200)

			},
			reachBottomRejected() {
				if (this.pageRejected >= this.lastPageRejected) return;
				this.status = 'loading';
				this.pageRejected++;
				setTimeout(() => {
					this.getJobListRejected(this.pageRejected, this.limit);
					if (this.pageRejected >= this.lastPageRejected) {
						this.status = 'nomore';
					} else {
						this.status = 'loading';
					}
				}, 1200)

			},
			// tab栏切换
			change(index) {
				this.swiperCurrent = index;
				// console.log(index)
			},
			transition({
				detail: {
					dx
				}
			}) {
				this.$refs.tabs.setDx(dx);
			},
			animationfinish({
				detail: {
					current
				}
			}) {
				this.$refs.tabs.setFinishCurrent(current);
				this.swiperCurrent = current;
				this.current = current;
			},
			turnJobDetails(id) {
				// #ifdef H5
				var url = window.location.href;
				var origin = window.location.origin;
				let turn_url = origin + '/esl_h5/pages/jobs/details?id=' + id;
				window.location.href = turn_url;
				// #endif

				// #ifndef H5
				uni.navigateTo({
					url: '/pages/jobs/details?id=' + id
				})
				// #endif

			},
			turnEditJob(id) {
				uni.navigateTo({
					url: 'jobs?id=' + id + '&jobmd5=' + this.$u.guid(32)
				})
			},
			turnJobResume(id) {
				uni.navigateTo({
					url: 'resume?id=' + id
				})
			},
			turnPromotion(id) {
				uni.navigateTo({
					url: 'promotion?id=' + id
				})
			}

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

	.centre {
		text-align: center;
		margin: 200rpx auto;
		font-size: 32rpx;
	}

	.centre image {
		width: 164rpx;
		height: 164rpx;
		border-radius: 50%;
		margin-bottom: 20rpx;
	}

	.centre .tips {
		font-size: 24rpx;
		color: #999999;
		margin-top: 20rpx;
	}

	.centre .btn {
		margin: 80rpx auto;
		width: 200rpx;
		border-radius: 32rpx;
		line-height: 64rpx;
		color: #ffffff;
		font-size: 26rpx;
		background: linear-gradient(270deg, #f9745a 0%, #ff9e01 100%);
	}

	.wrap {
		display: flex;
		flex-direction: column;
		height: calc(100vh - var(--window-top));
		width: 100%;
	}

	.swiper-box {
		flex: 1;
		/* padding-bottom: 100rpx; */
	}

	.swiper-item {
		height: 100%;
		background-color: #F4F5F6
	}

	.list-item {
		width: 96%;
		margin: 0 auto;
		position: relative;

		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		flex-wrap: wrap;

		background-color: #FFFFFF;
		margin-top: 20rpx;
		border-radius: 20rpx;
		padding: 10rpx;
		box-sizing: border-box;
		box-shadow: 0 0 30rpx 0 rgba(43, 86, 112, .1);
	}

	.list-item-left {
		width: 25%;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}

	.list-item-left image {
		width: 140rpx;
		height: 140rpx;
		border-radius: 140rpx;
		border: 1rpx solid #EEEEEE;
	}

	.list-item-right {
		width: 75%;

	}


	.job-title {
		width: 80%;
		font-size: 34rpx;
		font-weight: 700;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	.salary {
		font-size: 30rpx;
		color: #00B3D2;
	}

	.business-location {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		padding-right: 20rpx;
	}

	.business-name {
		font-size: 30rpx;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		width: 50%;
	}

	.job-location {
		font-size: 30rpx;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		width: 40%;
		text-align: right;
	}

	.edit {
		position: absolute;
		top: 10rpx;
		right: 10rpx;
	}

	.edit image {
		width: 60rpx;
		height: 60rpx;

	}

	.application {
		margin-top: 10rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: flex-start;
	}

	.application image {
		width: 60rpx;
		height: 60rpx;
	}

	.application text {
		margin-left: 10rpx;
		color: #00B3D2;
	}

	.status {
		height: 40rpx;
		background-color: #004956;
	}

	.xll-promotion-applications {
		width: 100%;

		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: flex-start;
	}

	.xll-applications {
		background-color: #0AA0A8;
		color: #FFFFFF;
		padding: 10rpx 20rpx;
		border-radius: 10rpx;
		margin-left: 40rpx;
	}

	.xll-views {
		font-size: 28rpx;
		color: #808080;
	}

	.xll-openclose {
		color: #808080;
		font-size: 28rpx;
	}

	.xll-promotion {
		font-size: 28rpx;
		background-color: #0AA0A8;
		color: #FFFFFF;
		padding: 10rpx 20rpx;
		border-radius: 10rpx;
	}

	.xll-view-openclose {
		width: 96%;
		margin: 0 auto;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		border-top: 1rpx solid #EEEEEE;
		margin-top: 20rpx;
		padding-top: 10rpx;
	}

	.homepage-back {
		position: fixed;
		z-index: 2000;
		left: 10rpx;
		top: 80%;
		width: 80rpx;
		height: 80rpx;
		border-radius: 10rpx;
		background-color: rgba(0, 0, 0, 0.8);
		background-image: url(@/static/home.png);
		background-position: center;
		background-size: 60%;
		background-repeat: no-repeat;
	}

	.under-review-tips {
		width: 100%;
		padding: 10rpx 30rpx;
		font-size: 28rpx;
		color: #FFFFFF;
		background-color: #0AA0A8;
		text-align: center;
	}

	.notice-under-review {
		width: 96%;
		margin: 0 auto;
		margin-top: 20rpx;
	}
</style>
