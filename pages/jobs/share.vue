<template>
	<view class="uni-flex uni-column">
		<view class="flex-item top-container" :style="{backgroundImage: businessUserInfo.header_photo != '' ? 'url('+businessUserInfo.header_photo+')' : 'url(https://oss.esl-passport.cn/esl_passport_25.png)'}">
			<view class="top-container-mask">
				<view class="top-t">
					<view class="top-left">
						<image :src="businessUserInfo.logo != '' ? businessUserInfo.logo : 'https://oss.esl-passport.cn/business.png' " mode="aspectFill"></image>
					</view>
					<view class="top-right">
						<text>{{jobValue.business_name}}</text> <br>
						<text>{{jobValue.nationality}}</text>
					</view>
				</view>

				<view class="top-b">
					<view class="top-b-l">
						<view class="top-b-contact">
							<button type="default" @click="contactUs">{{i18n.jobscontactus}}</button>
						</view>
						<view class="top-b-apply">
							<button type="default" @click="applyJob(jobValue.id)">{{i18n.jobsapply}}</button>
						</view>
					</view>
					<view class="top-b-r">
						<view class="top-b-r-collect">
							<!-- <image src="@/static/esl/collect.png" mode="scaleToFill"></image> -->
						</view>
						<view class="top-b-r-share" @click="shareYourJob">
							<image src="./static/share-w.png" mode="scaleToFill"></image>
						</view>
					</view>
				</view>
			</view>
		</view>

		<view class="flex-item jobs-desc-container">
			<view class="flex-item jobs-title" style="text-align: center;font-size: 38rpx;">
				{{jobValue.job_title}}
			</view>
			<view class="flex-item jobs-location" style="text-align: center;font-size: 34rpx;">
				{{jobValue.job_location}}, {{i18n.China}}
			</view>
			<view class="flex-item job-xll-tags">
				<view class="xll-tag" v-if="jobValue.employment_type==1">{{i18n.jobslistjobtypefulltime}}</view>
				<view class="xll-tag" v-if="jobValue.employment_type==2">{{i18n.jobslistjobtypeparttime}}</view>
				<view class="xll-tag" v-if="jobValue.employment_type==3">{{i18n.jobslistjobtypeseasonal}}</view>
				<view class="xll-tag" v-if="jobValue.is_online==1">{{i18n.jobsdetailonline}}</view>
				<view class="xll-tag" v-if="jobValue.is_equal==1">{{i18n.jobspostequalopportunity}}</view>
			</view>

		</view>

		<view class="flex-item position-detial-container">
			<view class="flex-item position-title">
				{{i18n.jobspositiondetails}}
			</view>

			<view class="flex-item benefits">
				<view class="benefits-1">{{i18n.jobspositiondesc}}</view>
				<view class="flex-item  jobs-desc">
					{{jobValue.desc}}
				</view>
			</view>
			<view class="flex-item application-due-date" v-if="jobValue.apply_due_date != '' && jobValue.apply_due_date !='0000-00-00' ">
				<view class="application-due-date-1">{{i18n.jobsapplicationduedate}}</view>
				<view class="application-due-date-2" v-if="jobValue.apply_due_date">
					{{jobValue.apply_due_date}}
				</view>
			</view>

			<view class="flex-item start-date" v-if="jobValue.entry_date">
				<view class="start-date-1">{{i18n.jobsstartdate}}</view>
				<view class="jobs-tags-container">
					<view class="jobs-tags">
						<view class="jobs-tags-item" v-if="jobValue.entry_date">
							{{jobValue.entry_date}}
						</view>
					</view>
				</view>
			</view>

			<view class="flex-item age-to-teach" v-if="jobValue.age_to_teach">
				<view class="age-to-teach-1">{{i18n.jobsagetoteach}}</view>
				<view class="jobs-tags-container">
					<view class="jobs-tags" >
						<view class="jobs-tags-item" v-for="(ageToTeach,index) in jobValue.age_to_teach" :key="index">
							{{ageToTeach.object_en}}
						</view>
					</view>
				</view>
			</view>

			<view class="flex-item subject" v-if="jobValue.subject">
				<view class="subject-1">{{i18n.jobssubject}}</view>
				<view class="jobs-tags-container">
					<view class="jobs-tags" >
						<view class="jobs-tags-item" v-for="(subject,index) in jobValue.subject" :key="index">
							{{subject.object_en}}
						</view>
					</view>
				</view>
			</view>

			<view class="flex-item online-job" v-if="jobValue.is_online == 1">
				<view class="online-job-1">{{i18n.jobsonlinejob}}</view>
				<view class="online-job-2">
					<text>Yes</text>
				</view>
			</view>
			<view class="number-vacancies">
				<view class="number-vacancies-1">{{i18n.jobsnumberofvacancies}}</view>
				<view class="number-vacancies-2">
					{{jobValue.numbers}}
				</view>
			</view>
		</view>
		<!-- compensation -->
		<view class="flex-item position-detial-container">
			<view class="flex-item position-title">
				{{i18n.jobsdetailcompensation}}
			</view>
			<view class="flex-item salary">
				<view class="salary-1">{{i18n.jobssalary}}</view>
				<view class="salary-2">
					{{jobValue.salary_min}}-{{jobValue.salary_max}}
				</view>
			</view>

			<view class="payment-period">
				<view class="payment-period-1">{{i18n.jobspaymentperiod}}</view>
				<view class="payment-period-2">
					{{jobValue.payment_period_en}}
				</view>
			</view>

			<view class="currency">
				<view class="currency-1">{{i18n.jobscurrency}}</view>
				<view class="currency-2">
					{{jobValue.currency}}
				</view>
			</view>
			<view class="flex-item benefits" v-if="jobValue.benefits">
				<view class="benefits-1">{{i18n.jobsbenefits}}</view>
				<view class="jobs-tags-container" >
					<view class="jobs-tags">
						<view class="jobs-tags-item" v-for="(benefit,index) in jobValue.benefits" :key="index">
							{{benefit.object_en}}
						</view>
					</view>
				</view>
			</view>
		</view>

		<view class="flex-item applicant-requirements">
			<view class="applicant-requirements-title">{{i18n.jobsapplicantrequirements}}</view>
			<view class="gender" v-if="jobValue.sex != 0">
				<view class="gender-1">{{i18n.jobsgender}}</view>
				<view class="gender-2">
					<text v-if="jobValue.sex==1">Male</text>
					<text v-if="jobValue.sex==2">Female</text>
					<text v-if="jobValue.sex==3">Both</text>
				</view>
			</view>
			<view class="teaching-certificate" v-if="jobValue.Teaching_certificate">
				<view class="teaching-certificate-1">{{i18n.jobsteachingcertificate}}</view>
				<view class="jobs-tags-container" >
					<view class="jobs-tags">
						<view class="jobs-tags-item" v-for="(item,index) in jobValue.Teaching_certificate" :key="index">
							{{item.object_en}}
						</view>
					</view>
				</view>
			</view>

			<view class="cpr-certified" v-if="jobValue.is_cpr == 1">
				<view class="cpr-certified-1">{{i18n.jobscprcertified}}</view>
				<view class="cpr-certified-2">
					<text>Required</text>
				</view>
			</view>

			<view class="first-aside-certified" v-if="jobValue.is_first_aide==1">
				<view class="first-aside-certified-1">{{i18n.jobsfirstasidecertified}}</view>
				<view class="first-aside-certified-2">
					<text>Required</text>
				</view>
			</view>

			<view class="teaching-exp" v-if="jobValue.teaching_times">
				<view class="teaching-exp-1">{{i18n.jobsteachingexperience}}</view>
				<view class="teaching-exp-2">
					{{jobValue.teaching_times_en}}
				</view>
			</view>

			<view class="teaching-license" v-if="jobValue.is_teaching_license==1">
				<view class="teaching-license-1">{{i18n.jobsteachinglicense}}</view>
				<view class="teaching-license-2">
					<text>Required</text>
				</view>
			</view>
			<view class="teaching-license" v-if="jobValue.is_mom_language==1">
				<view class="teaching-license-1">{{i18n.jobsnativespeaker}}</view>
				<view class="teaching-license-2">
					<text>Required</text>
				</view>
			</view>

			<view class="education" v-if="jobValue.education">
				<view class="education-1">{{i18n.jobseducation}}</view>
				<view class="education-2">
					{{jobValue.education_en}}
				</view>
			</view>

			<view class="nationality" v-if="jobValue.nationality">
				<view class="nationality-1">{{i18n.jobsnationality}}</view>
				<view class="jobs-tags-container" v-if="jobValue.nationality">
					<view class="jobs-tags">
						<view class="jobs-tags-item">
							{{jobValue.nationality}}
						</view>
					</view>
				</view>
			</view>

			<view class="languages" v-if="jobValue.languages">
				<view class="languages-1">{{i18n.jobslanguages}}</view>
				<view class="jobs-tags-container" >
					<view class="jobs-tags">
						<view class="jobs-tags-item" v-for="(item,index) in jobValue.languages" :key="index">
							{{item.object_en}}
						</view>
					</view>
				</view>
			</view>

			<view class="age">
				<view class="age-1">{{i18n.jobsage}}</view>
				<view class="age-2">
					{{jobValue.age_min}}-{{jobValue.age_max}}
				</view>
			</view>
		</view>

		<view class="flex-item contact-person-info" v-if="jobValue.interview_name != '' ">
			<view class="contact-person-info-title">{{i18n.jobscontactpersoninfo}}</view>
			<view class="contact">
				<view class="contact-l">
					<image
						:src="jobValue.interview_imgurl != '' ? jobValue.interview_imgurl : 'https://oss.esl-passport.cn/educator.png' "
						mode="aspectFill"></image>
				</view>
				<view class="contact-r">
					<view class="contact-name"> <b>{{i18n.jobsposthione}} {{jobValue.interview_name}}!</b></view>
					<view class="contact-nationality">{{jobValue.interview_nationlity}}</view>
					<view class="contact-phone" v-if="businessUserInfo.contact_phone !='' ">
						<view class="contact-copy-container-l">
							{{businessUserInfo.contact_phone}}
						</view>
						<view class="contact-copy-container-r">
							<image @click="phoneCall(businessUserInfo.contact_phone)" src="../../static/phonecall.png"
								mode="aspectFit"></image>
						</view>
					</view>
					<view class="contact-work-email" v-if="businessUserInfo.work_email !='' ">
						<view class="contact-copy-container-l">
							{{businessUserInfo.work_email}}
						</view>
						<view class="contact-copy-container-r">
							<image @click="copyEmail(businessUserInfo.work_email)" src="../../static/copy.png"
								mode="aspectFit"></image>
						</view>
					</view>
				</view>
			</view>
		</view>

		<view class="job-apply-button">
			<button type="default"  @click="applyJob(jobValue.id)">{{i18n.jobsapply}}</button>
		</view>

		<view class="wx-share" v-if="showWxShareStatus" @click="showWxShareStatus=false">
			<view class="wx-share-arrow"></view>
			<view class="wx-share-main">
				<p>Click share in the upper right corner</p>
			</view>
		</view>

		<!-- contact us -->
		<contactus @close="closeContact" :showContact="showContactStatus"></contactus>
		<xllfindmore></xllfindmore>

	</view>
</template>

<script>
	import profile from '@/api/profile.js';
	import jobs from '@/api/jobs.js';
	import contactus from "@/components/xll-contact-us/xll-contact-us.vue";
	import xllfindmore from '@/components/xll-find-more/xll-find-more.vue'

	export default {
		components: {
			contactus,
			xllfindmore
		},
		data() {
			return {
				jobId: 0,
				jobValue: '',
				identity: 0,
				showWxShareStatus: false,
				showContactStatus: false,
				businessUserInfo: ''
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
			var that = this;
			this.jobId = option.id;
			// console.log(this.jobId);
			this.getDetail(option.id);
			this.identity = uni.getStorageSync('identity');
			
		},
		methods: {
			closeContact(e) {
				// console.log(e)
				this.showContactStatus = false;
			},
			contactUs() {
				uni.pageScrollTo({
					scrollTop:1000000,
					duration:3
				})
			},
			getDetail(id) {
				let data = {
					job_id: id
				}
				jobs.visitorJobInfo(data).then(res => {
					console.log(res);
					if (res.code == 200) {
						this.jobValue = res.message;
						uni.setNavigationBarTitle({
							title:res.message.job_title
						})
						// #ifdef H5
						var img_url = res.message.interview_imgurl;
						if (res.message.interview_imgurl == '') {
							img_url = 'https://i.loli.net/2020/10/29/zgFvraCTjbd7fEs.png';
						}
						var url = window.location.href;
						var origin = window.location.origin;
						
						let turn_url = origin + '/esl_h5/pages/jobs/share?id=' + id;
						
						
						var currency = res.message.currency
						if(currency == 'CNY'){
							currency = '¥'
						}
						if(currency == 'USD'){
							currency = '$'
						}
						
						let salary = currency + ' ' + res.message.salary_min + '-' + res.message.salary_max
						
						let share_desc = salary + ' ' + res.message.job_location + ' ' + res.message.desc
						if (res.message.employment_type == 1) {
							var employment_type = this.i18n.jobslistemploymentfulltime
						}
						if (res.message.employment_type == 2) {
							var employment_type = this.i18n.jobslistemploymentparttime
						}
						if (res.message.employment_type == 3) {
							var employment_type = this.i18n.jobslistemploymentseasonal
						}
						let share_title = res.message.job_title + '-' + employment_type
						let data = {
							title: share_title, // 分享标题
							desc: share_desc, // 分享描述
							link: turn_url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
							imgUrl: img_url, // 分享图标
						}
						
						this.$jwx.updateAppMessageShareData(data, function(res) {
							console.log(res)
						})
						this.$jwx.updateTimelineShareData(data, function(res) {
							console.log(res)
						})
						// #endif
						
						let uid = res.message.user_id;
						profile.visitorUserInfo({
							id: uid,
							identity: 2
						}).then(res => {
							console.log(res)
							if (res.code == 200) {
								this.businessUserInfo = res.message.business_info;
							}
						})

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
			shareYourJob() {
				this.showWxShareStatus = true;
			},
			applyJob(id){
				// #ifdef H5
				var url = window.location.href;
				var origin = window.location.origin;
				let turn_url = origin + '/esl_h5/pages/jobs/details?id=' + id;
				window.location.href = turn_url;
				// #endif
				
				// #ifndef H5
				uni.navigateTo({
					url:'/pages/jobs/details?id=' + id
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
	@import url("@/common/jobs/details.css");
	@import url("@/common/public/contact-cv.css");

	.wx-share {
		position: fixed;
		z-index: 100;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		margin: auto;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.8);

	}

	.wx-share-arrow {
		background-image: url("./static/arrow-right.png");
		background-size: 100% 100%;
		background-repeat: no-repeat;
		background-position: 50%;
		width: 120rpx;
		height: 180rpx;
		position: absolute;
		right: 40rpx;
		top: 30rpx;

	}

	.wx-share-main {
		position: absolute;
		top: 260rpx;
		left: 50%;
		-webkit-transform: translate(-50%, 0);
		transform: translate(-50%, 0);
		width: 85%;
		background-color: rgba(0, 0, 0, 0.4);
		padding: 20rpx;
		border-radius: 20rpx;
	}

	.wx-share-main p {
		font-size: 34rpx;
		color: #FFFFFF;
	}
</style>
