<template>
	<view class="uni-flex uni-column ">
		<view class="flex-item photo-top-container" :style="{backgroundImage: businessUserInfo.header_photo != '' ? 'url('+businessUserInfo.header_photo+')' : 'url('+backgroundPictureSrc+')'} ">
			<view class="photo-top">
				<image :src="businessUserInfo.logo != '' ? businessUserInfo.logo : 'https://oss.esl-passport.cn/business.png' " mode="aspectFit"></image>
			</view>
		</view>
		<view class="flex-item bg">
			<view class="basic-info">
				<view class="basic-info-t">
					<view class="basic-info-t-title">{{i18n.profilebusinessbasicinfo}}</view>
				</view>
				<view class="basic-info-b">
					<view class="basic-info-item" v-if="businessUserInfo.business_bio!=''">
						<text>{{i18n.profilebusinessbio}}:</text>
						<text>
							{{businessUserInfo.business_bio}}
						</text>
					</view>
					<view class="basic-info-item" v-if="businessUserInfo.year_founded!=''">
						<text>{{i18n.profileyearfounded}}:</text>
						<text>{{businessUserInfo.year_founded}}</text>
					</view>
					<view class="basic-info-item" v-if="businessUserInfo.district !='' || businessUserInfo.province !='' || businessUserInfo.city !='' ">
						<text>{{i18n.profilelocation}}:</text>
						<text>{{businessUserInfo.district}}, {{businessUserInfo.city}}, {{businessUserInfo.province}}</text>
					</view>
					<view class="basic-info-item" v-if="businessUserInfo.website!=''">
						<text>{{i18n.profilewebsite}}:</text>
						<text>{{businessUserInfo.website}}</text>
					</view>
					<view class="basic-info-item" style="width: 100%;" v-if="businessUserInfo.business_phone!=''">
						<text>{{i18n.profilebusinessphone}}:</text>
						<text>{{businessUserInfo.business_phone}}</text>
					</view>
					<view class="basic-info-item" v-if="businessUserInfo.contact_name!=''">
						<text>{{i18n.profilecontactname}}:</text>
						<text>{{businessUserInfo.contact_name}}</text>
					</view>
					<view class="basic-info-item" style="width: 100%;" v-if="businessUserInfo.contact_phone!=''">
						<text>{{i18n.profilecontactphone}}:</text>
						<text>{{businessUserInfo.contact_phone}}</text>
					</view>
					<view class="basic-info-item uni-flex uni-row">
						<view class="profile-detail-item-box-item-tg" v-if="businessUserInfo.is_currently_hiring ==1 ">
							<text>{{i18n.profilecurrentlyhiring}}:</text>
							<view class="profile-detail-item-box-item-tg-right"></view>
						</view>
					</view>
				</view>
			</view>
			<!-- company policy -->
			<view class="company-policy">
				<view class="company-policy-title">{{i18n.profilebusinesscompanypolicies}}</view>
				<!-- student age -->
				<view class="student-age">
					<view class="student-age-t">
						<view class="student-age-title">{{i18n.profilebusinessourstudentage}}</view>
					</view>
					<view class="student-age-b" v-if="canEditStudentAge===false">
						<view class="student-age-item" v-for="(item,i) in studentAgeList" :key="i">
							{{item.object_en}}
						</view>
					</view>
				</view>
				<view class="subject">
					<view class="subject-t">
						<view class="subject-title">{{i18n.profilebusinesssubjectsweteach}}</view>
					</view>
					<view class="subject-b" v-if="canEditSubject===false">
						<view class="subject-item" v-for="(item,i) in subjectList" :key="i">
							{{item.object_en}}
						</view>
					</view>
				</view>
			</view>

			<view class="school-container" v-if="businessUserInfo.is_school==1">
				<view class="school-t">
					<view class="school-title">{{i18n.profilebusinesseducationinfo}}</view>
				</view>
				<view class="school-c">
					<view class="basic-info-item" v-if="businessUserInfo.curriculum!=''">
						<text>{{i18n.profilecurriculum}}:</text>
						<text>{{businessUserInfo.curriculum}}</text>
					</view>
					<view class="basic-info-item" v-if="businessUserInfo.staff_student_ratio!=''">
						<text>{{i18n.profileaverageclasssize}}:</text>
						<text>{{businessUserInfo.staff_student_ratio}}</text>
					</view>
					<view class="basic-info-item" v-if="businessUserInfo.technology_available!=''">
						<text>{{i18n.profiletechnologyavailable}}:</text>
						<text>{{businessUserInfo.technology_available}}</text>
					</view>
					<view class="basic-info-item uni-flex uni-row">
						<view class="profile-detail-item-box-item-tg" v-if="businessUserInfo.is_special_needs ==1 ">
							<text>{{i18n.profilespecialneeds}}:</text>
							<view class="profile-detail-item-box-item-tg-right"></view>
						</view>
						<view class="profile-detail-item-box-item-tg" v-if="businessUserInfo.is_events ==1 ">
							<text>{{i18n.profileevents}}:</text>
							<view class="profile-detail-item-box-item-tg-right"></view>
						</view>
						<view class="profile-detail-item-box-item-tg" v-if="businessUserInfo.felds_trips ==1 ">
							<text>{{i18n.profilefieldstrips}}:</text>
							<view class="profile-detail-item-box-item-tg-right"></view>
						</view>
					</view>

				</view>
			</view>

			<view class="our-jobs">
				<view class="our-jobs-t">
					<view class="our-jobs-t-title">{{i18n.profilebusinesscurrentopenpositions}}</view>
				</view>
				<!-- benefits -->
				<view class="benefits">
					<view class="benefits-t">
						<view class="benefits-title">{{i18n.profilebusinessemploymentbenefits}}</view>
					</view>
					<!-- benefits tags展示 -->
					<view class="benefits-b" v-if="canEditBenefits===false">
						<view class="benefits-item" v-for="(item,i) in benefitsList" :key="i">
							{{item.object_en}}
						</view>
					</view>
					<!-- benefits 编辑 -->
				</view>
				<!-- job type -->
				<view class="job-type">
					<view class="job-type-t">
						<view class="job-type-title">{{i18n.profilejobtype}}</view>
					</view>
					<!-- job type tags展示 -->
					<view class="job-type-b" v-if="canEditJobType===false">
						<view class="job-type-item" v-for="(item,i) in jobTypeList" :key="i">
							{{item.object_en}}
						</view>
					</view>
				</view>
			</view>

			<view class="user-info">
				<view class="user-info-l">
					<image :src="businessUserInfo.profile_photo !='' ? businessUserInfo.profile_photo : 'https://oss.esl-passport.cn/educator.png' " mode="aspectFit"></image>
				</view>
				<view class="user-info-r">
					<view class="user-job-title">{{businessUserInfo.job_title}}</view>
					<view class="user-fl-name">{{businessUserInfo.first_name}} {{businessUserInfo.last_name}}</view>
					<view class="user-phone">{{basicUserInfo.phone}}</view>
				</view>
			</view>

			<view class="profile-media">
				<view class="profile-detail-relative "  v-if="businessUserInfo.header_photo">
					<view class="profile-detail-item-title">{{i18n.profileheaderphoto}}</view>
					<view class="profile-detail-item-box profile-header-photo" >
						<view class="profile-header-photo-1">
							<image @click="previewYourImage(businessUserInfo.header_photo)" :src="businessUserInfo.header_photo" mode="aspectFill"></image>
						</view>
					</view>
				</view>
				<view class="profile-detail-relative "  v-if="userImagesList.length > 0">
					<view class="profile-detail-item-title">{{i18n.profilepics6max}}</view>
					<view class="profile-detail-item-box">
						<view class="profile-detail-item-box pics-flex-row">
							<view class="profile-profile-pics-item" v-for="(image,i) in userImagesList" :key="i">
								<image @click="previewPics(i)" :src="image.url" mode="aspectFill"></image>
							</view>
						</view>
					</view>
				</view>
				<view class="profile-detail-relative " v-if="businessUserInfo.video_url">
					<view class="profile-detail-item-title">{{i18n.profileintrovideo}}</view>
					<view class="profile-detail-item-box" >
						<view class="profile-intro-video">
							<video id="myVideo" :muted="false" preload="metadata" @loadedmetadata="loadedMetaData"
							:poster="businessUserInfo.profile_photo"
							  x5-video-player-type="h5-page" :src="businessUserInfo.video_url"
							 controls></video>
						</view>
					</view>
				</view>
			</view>

		</view>
		<!-- #ifdef H5 -->
		<xllfindmore></xllfindmore>
		<!-- #endif -->
		
	</view>
</template>

<script>
	import profile from '@/api/profile.js';
	import xllfindmore from '@/components/xll-find-more/xll-find-more.vue'

	export default {
		data() {
			return {
				
				basicUserInfo: {},
				businessUserInfo: {},
				anchorPoint: '',
				avatarUrl: "",
				uerInfo: {},

				current: 0,
				backgroundPictureSrc: 'https://oss.esl-passport.cn/esl_passport_25.png',
				introVideoSrc: '',
				hobbiesList: [],
				subjectList: [],
				studentAgeList: [],
				benefitsList: [],
				jobTypeList: [],

				languagesList: [],
				userImagesList: [],

				canEditStudentAge: false,
				editStudentAgeList: [],
				addStudentAgeStatus: false,
				ownStudentAgeValue: '',
				ownStudentAgeList: [],
				selectStudentAgeList: [],
				selectStudentAgeArr: [],

				canEditSubject: false,
				editSubjectList: [],
				addSubjectStatus: false,
				ownSubjectValue: '',
				ownSubjectList: [],
				selectSubjectList: [],
				selectSubjectArr: [],

				canEditBenefits: false,
				editBenefitsList: [],
				addBenefitsStatus: false,
				ownBenefitsValue: '',
				ownBenefitsList: [],
				selectBenefitsList: [],
				selectBenefitsArr: [],

				canEditJobType: false,
				editJobTypeList: [],
				addJobTypeStatus: false,
				ownJobTypeValue: '',
				ownJobTypeList: [],
				selectJobTypeList: [],
				selectJobTypeArr: [],
				userId: undefined,
				identity: undefined

			}
		},
		components: {
			xllfindmore
		},
		computed: {
			i18n() {
				return this.$t('index')
			}
		},
		onLoad(option) {
			this.userId = option.id;
			if (option.type == 'job') {
				uni.setNavigationBarTitle({
					title: 'Company Profile'
				})
			}
			this.getBasicInfo();
		},
		methods: {
			loadedMetaData(e) {
				console.log(e)
				
			},
			previewYourImage(image) {
				uni.previewImage({
					urls: [image]
				})
			},
			previewPics(i){
				let list = this.userImagesList
				let urls = []
				list.forEach(item=>{
					urls.push(item.url)
				})
				uni.previewImage({
					current:i,
					urls:urls
				})
			},
			chooseAvatarImage() {
				uni.chooseImage({
					count: 6, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album', 'camera'], //从相册选择
					success: function(res) {
						console.log(JSON.stringify(res.tempFilePaths));
					}
				})
			},
			onClickItem(e) {
				if (this.current !== e.currentIndex) {
					this.current = e.currentIndex;
				}
			},
			getBasicInfo() {
				var that = this;
				let data = {
					id: that.userId,
					identity: 2
				}
				profile.visitorUserInfo(data).then(res => {
					console.log(res)
					if (res.code == 200) {
						// #ifdef H5
						var img_url = res.message.business_info.profile_photo;
						if (res.message.business_info.profile_photo == '') {
							img_url = 'https://i.loli.net/2020/10/29/zgFvraCTjbd7fEs.png';
						}
						var url = window.location.href;
						var origin = window.location.origin;
						let user_id = this.userId;
						console.log(origin)
						let turn_url = origin + '/esl_h5/pagesB/me/business/share?id=' + user_id;
						// window.location.href = turn_url;
						let share_data = {
							title: res.message.business_info.first_name + res.message.business_info.last_name, // 分享标题
							desc: res.message.business_info.bio, // 分享描述
							link: turn_url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
							imgUrl: img_url, // 分享图标
						}
						this.$jwx.updateAppMessageShareData(share_data, function(res) {
							console.log(res)
						})
						this.$jwx.updateTimelineShareData(share_data, function(res) {
							console.log(res)
						})
						// #endif
						
						that.avatarUrl = res.message.headimgurl;
						that.basicUserInfo = res.message;
						that.businessUserInfo = res.message.business_info;

						if (res.message.business_info.subject != undefined) {
							that.subjectList = res.message.business_info.subject;
						}
						if (res.message.business_info.Student_Age != undefined) {
							that.studentAgeList = res.message.business_info.Student_Age;
						}
						if (res.message.business_info.job_type != undefined) {
							that.jobTypeList = res.message.business_info.job_type;
						}
						if (res.message.business_info.benefits != undefined) {
							that.benefitsList = res.message.business_info.benefits;
						}

						that.languagesList = res.message.business_info.languages;
						that.userImagesList = res.message.business_info.user_images;

						let hobbies = res.message.business_info.hobbies;
						that.hobbiesList = hobbies.split(',');

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


		},
		onShareAppMessage:function(){
			
		},
		onShareTimeline:function(){
			
		},
		onAddToFavorites:function(){
			
		},
		onReady: function(res) {
			var that = this;
			// #ifdef H5
			this.videoContext = uni.createVideoContext('myVideo')
			setTimeout(function(){
				that.videoContext.play()
			},1000)
			setTimeout(function(){
				that.videoContext.pause()
			},3000)
			// #endif
		},
	}
</script>

<style>
	@import url("@/common/me/share.css");

	.basic-info {
		margin-top: 0;
		padding-top: 50rpx;
	}
</style>
