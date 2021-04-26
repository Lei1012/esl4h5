<template>
	<view class="uni-flex uni-column ">
		<view class="flex-item photo-top-container" :style="{backgroundImage: educatorInfo.header_photo != '' ? 'url('+educatorInfo.header_photo+')' : 'url('+backgroundPictureSrc+')'} ">
			<view class="photo-top">
				<image :src="educatorInfo.profile_photo !='' ? educatorInfo.profile_photo : 'https://oss.esl-passport.cn/educator.png' " mode="aspectFill"></image>
			</view>
		</view>
		<view class="flex-item bg ">
			<!-- basic-info -->
			<view class="basic-info share-first">
				<view class="basic-info-t">
					<view class="basic-info-t-title" style="height: 60rpx;">
						{{i18n.profilebasicinfo}}
					</view>
				</view>
				<view class="basic-info-b">
					<view class="basic-info-item" style="width: 100%;" v-if="educatorInfo.first_name || educatorInfo.last_name ">
						<text>{{i18n.shareprofilename}}:</text>
						<text>{{educatorInfo.first_name}} {{educatorInfo.last_name}}</text>
					</view>
					<view class="basic-info-item" v-if="educatorInfo.nickname">
						<text>{{i18n.profilenickname}}:</text>
						<text>{{educatorInfo.nickname}}</text>
					</view>
					<view class="basic-info-item" v-if="educatorInfo.city ">
						<text>{{i18n.profilecurrentcity}}: </text>
						<text>{{educatorInfo.city}}</text>
					</view>
					<view class="basic-info-item" v-if="basicUserInfo.birthday && basicUserInfo.birthday!='0000-00-00' ">
						<text>{{i18n.profilebirthdate}}:</text>
						<text>{{basicUserInfo.birthday}}</text>
					</view>
					<view class="basic-info-item" v-if="educatorInfo.nationality">
						<text>{{i18n.profilenationality}}:</text>
						<text>{{educatorInfo.nationality}}</text>
					</view>
					<view class="basic-info-item" v-if="basicUserInfo.sex==1 || basicUserInfo.sex==2 || basicUserInfo.sex ==3">
						<text>{{i18n.profilegender}}:</text>
						<text v-if="basicUserInfo.sex == 1">Male</text>
						<text v-if="basicUserInfo.sex == 2">Female</text>
						<text v-if="basicUserInfo.sex == 3">Undisclosed</text>
					</view>
				</view>
			</view>
			<!-- Credentials  -->
			<view class="credentials">
				<view class="credentials-t">
					<view class="credentials-t-title">{{i18n.profilecredentials}}</view>
				</view>
				<view class="credentials-b">
					<view class="languages" v-if="languagesList.length>0">
						<view class="languages-top">
							<view class="languages-title">{{i18n.profilelanguages}}</view>
						</view>
						<view class="languages-container">
							<view class="languages-item" v-for="(language,i) in languagesList" :key="i">
								{{language.object_en}}
								<u-rate :disabled="true" custom-prefix="custom-icon" active-icon="xll-yuan" inactive-icon="circleo"
								 active-color="#b1c452" v-model="language.object_score" :count="language.object_score"></u-rate>
							</view>
						</view>
					</view>
					<view class="education">
						<view class="education-t">
							<view class="education-title">{{i18n.profileeducation}}</view>
						</view>
						<view class="education-b">
							<view v-for="(education,i) in educationInfo" :key="i">
								<view class="education-item">
									<view class="education-school-name">{{education.school_name}}</view>
									<view class="education-item-2">
										<view class="education-field">{{education.field_of_study}}</view>
									</view>
									<view class="education-item-3">
										<view class="education-degree">{{education.degree}}</view>
										<view class="education-date">{{education.start_time | date('mm/yyyy')}}-{{education.end_time | date('mm/yyyy')}}</view>
									</view>
									<view style="border: 1rpx solid #E1E1E1;"></view>
								</view>
							</view>
						</view>
					</view>
					<view class="certifications" v-if="certificationsList.length>0">
						<view class="certifications-t">
							<view class="certifications-title">{{i18n.profilecertifications}}</view>
						</view>
						<!-- certifications 展示 -->
						<view class="certifications-b">
							<view class="certifications-item" v-for="(cer,i) in certificationsList" :key="i">
								{{cer.object_en}}
							</view>
						</view>

					</view>

				</view>
			</view>

			<!-- Experience -->
			<view class="experience">
				<view class="exp-title">{{i18n.profileexperience}}</view>
				<view class="countries-travel">
					<view class="countries-travel-t">
						<view class="countries-travel-title countries-travel-fontsize">Teaching Experience</view>
					</view>
					<!-- 工作经验 -->
					<view class="countries-travel-b">
						<view class="countries-travel-item" v-for="(item,i) in teachExpList" :key="i">
							{{item.object_en}}
						</view>
					</view>
				</view>
				<!-- 展示界面 -->
				<view class="countries-travel" v-if="countriesTraveledList.length>0">
					<view class="countries-travel-t">
						<view class="countries-travel-title countries-travel-fontsize">{{i18n.profilecountriestraveled}}</view>
					</view>
					<!-- 旅行过的国家展示tags -->
					<view class="countries-travel-b" v-if="canEditCountriesTraveled===false">
						<view class="countries-travel-item" v-for="(country,i) in countriesTraveledList" :key="i">
							{{country.object_en}}
						</view>
					</view>
				</view>
				<view class="countries-travel" v-if="countriesLivedList.length>0">
					<view class="countries-travel-t">
						<view class="countries-travel-title countries-travel-fontsize">{{i18n.profilecountrieslived}}</view>
					</view>
					<!-- countries lived tags展示 -->
					<view class="countries-travel-b" v-if="canEditCountriesLived===false">
						<view class="countries-travel-item" v-for="(country,i) in countriesLivedList" :key="i">
							{{country.object_en}}
						</view>
					</view>
				</view>
				<view class="work-exp">
					<view class="work-exp-t">
						<view class="work-exp-title">{{i18n.profileworkexperience}}</view>
					</view>
					<view class="work-exp-b">
						<view v-for="(work,i) in workInfo" :key="i">
							<view class="work-exp-b-item">
								<view class="work-exp-item-1">
									{{work.company_name}}
								</view>
								<view class="work-exp-item-2">
									<view class="work-exp-job-title">{{work.title}}</view>
									<view class="work-exp-date">{{work.work_time_from | date('mm/yyyy')}} - {{work.work_time_to | date('mm/yyyy')}}</view>
								</view>
								<view class="work-exp-item-3">{{work.location}}</view>

								<view class="work-exp-item-4">
									<text>{{work.teaching_experience}}</text>
								</view>
								<view style="border: 1rpx solid #E1E1E1;"></view>
							</view>
						</view>
					</view>
				</view>


			</view>

			<view class="interest">
				<view class="interest-t">
					<view class="interest-title">{{i18n.profileinterest}}</view>
				</view>
				<view class="bio" v-if="educatorInfo.bio !=''">
					<view class="bio-title">{{i18n.profilebio}}</view>
					<view class="bio-content">
						{{educatorInfo.bio}}
					</view>
				</view>
				<view class="hobbies" v-if="hobbiesList.length>0">
					<view class="hobbies-title">{{i18n.profilehobbies}}</view>
					<view class="hobbies-container">
						<view class="hobbies-item" v-for="(hobby,i) in hobbiesList" :key="i">
							<text v-if="hobby != '' ">{{hobby}}</text>
						</view>
					</view>
				</view>
			</view>

			<view class="preferences-container">
				<!-- subject -->
				<view class="subject" v-if="subjectList.length>0">
					<view class="subject-t">
						<view class="subject-title">{{i18n.profilesubject}}</view>
					</view>
					<!-- subject tags展示 -->
					<view class="subject-b" v-if="canEditSubject===false">
						<view class="subject-item" v-for="(item,i) in subjectList" :key="i">
							{{item.object_en}}
						</view>
					</view>
				</view>
				<!-- location -->
				<view class="location" v-if="locationList.length>0">
					<view class="location-t">
						<view class="location-title">{{i18n.profilelocation}}</view>

					</view>
					<!-- location tags展示 -->
					<view class="location-b" v-if="canEditLocation===false">
						<view class="location-item" v-for="(item,i) in locationList" :key="i">
							{{item.object_en}}
						</view>
					</view>
				</view>
				<!-- job type -->
				<view class="job-type" v-if="jobTypeList.length>0">
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
				<!-- age to teach -->
				<view class="age-to-teach" v-if="ageToTeachList.length>0">
					<view class="age-to-teach-t">
						<view class="age-to-teach-title">{{i18n.profileagetoteach}}</view>

					</view>
					<!-- age to teach tags展示 -->
					<view class="age-to-teach-b" v-if="canEditAgeToTeach===false">
						<view class="age-to-teach-item" v-for="(item,i) in ageToTeachList" :key="i">
							{{item.object_en}}
						</view>
					</view>
				</view>
				<!-- region -->
				<view class="region" v-if="regionList.length>0">
					<view class="region-t">
						<view class="region-title">{{i18n.profileregion}}</view>
					</view>
					<!--region tags展示 -->
					<view class="region-b" v-if="canEditRegion===false">
						<view class="region-item" v-for="(item,i) in  regionList" :key="i">
							{{item.object_en}}
						</view>
					</view>
				</view>
				<!-- benefits -->
				<view class="benefits" v-if="benefitsList.length>0">
					<view class="benefits-t">
						<view class="benefits-title">{{i18n.profilebenefits}}</view>
					</view>
					<!-- benefits tags展示 -->
					<view class="benefits-b" v-if="canEditBenefits===false">
						<view class="benefits-item" v-for="(item,i) in benefitsList" :key="i">
							{{item.object_en}}
						</view>
					</view>
				</view>
			</view>

			<view class="profile-media">
				<view class="profile-detail-relative " v-if="userImagesList.length>0">
					<view class="profile-detail-item-title">{{i18n.edushareprofilepics}}</view>
					<view class="profile-detail-item-box pics-flex-row">
						<view class="profile-profile-pics-item" v-for="(image,i) in userImagesList" :key="i">
							<image @click="previewPics(i)" :src="image.url" mode="aspectFit"></image>
						</view>
					</view>
				</view>
				<view class="profile-detail-relative " v-if="educatorInfo.video_url != '' ">
					<view class="profile-detail-item-title">{{i18n.profileintrovideo}}</view>
					<view class="profile-detail-item-box" v-if="educatorInfo.video_url">
						<view class="profile-intro-video">
							<video id="myVideo" :muted="false" preload="metadata" @loadedmetadata="loadedMetaData" x5-video-player-type="h5-page"
							 :poster="educatorInfo.profile_photo" :src="educatorInfo.video_url" controls></video>
						</view>
					</view>
				</view>
			</view>

			<view class="basic-info " style="margin-top: 20rpx;">
				<view class="basic-info-t">
					<view class="basic-info-t-title" style="height: 60rpx;">
						{{i18n.applicationcontactinfo}}
					</view>
				</view>
				<view class="basic-info-b">
					<view class="basic-info-item" v-if="educatorInfo.email!=''">
						<text>{{i18n.basiceduemail}}:</text>
						<text>{{educatorInfo.email}}</text>
					</view>
					<view class="basic-info-item" v-if="educatorInfo.wx_id!=''">
						<text>{{i18n.educatorwechatid}}:</text>
						<text>{{educatorInfo.wx_id}}</text>
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
	import profile from '@/api/profile.js'
	import xllfindmore from '@/components/xll-find-more/xll-find-more.vue'

	export default {
		data() {
			let correctRate = this.correctRate;
			return {

				scrollTop: 0,
				basicUserInfo: {},
				educatorInfo: {},
				anchorPoint: '', // 锚点
				avatarUrl: "",
				uerInfo: {},

				backgroundPictureSrc: 'https://oss.esl-passport.cn/esl_passport_25.png',
				introVideoSrc: '',
				hobbiesList: [],
				countriesList: [],
				countriesTraveledList: [],
				countriesLivedList: [],
				languagesList: [],
				subjectList: [],
				jobTypeList: [],
				ageToTeachList: [],
				regionList: [],
				benefitsList: [],
				userImagesList: [],
				workInfo: [],
				educationInfo: [],
				certificationsList: [],
				locationList: [],

				canEditCertifications: false,
				editCertificationsList: [],
				addCertificationsStatus: false,
				ownCertificationsValue: '',
				ownCertificationsList: [],
				selectCertificationsList: [],
				selectCertificationsArr: [],

				canEditCountriesTraveled: false,
				editCountriesTraveledList: [],
				addCountriesTraveledStatus: false,
				ownCountriesTraveledValue: '',
				ownCountriesTraveledList: [],
				selectCountriesTraveledList: [],
				selectCountriesTraveledArr: [],

				canEditCountriesLived: false,
				editCountriesLivedList: [],
				addCountriesLivedStatus: false,
				ownCountriesLivedValue: '',
				ownCountriesLivedList: [],
				selectCountriesLivedList: [],
				selectCountriesLivedArr: [],

				canEditSubject: false,
				editSubjectList: [],
				addSubjectStatus: false,
				ownSubjectValue: '',
				ownSubjectList: [],
				selectSubjectList: [],
				selectSubjectArr: [],

				canEditLocation: false,
				editLocationList: [],
				addLocationStatus: false,
				ownLocationValue: '',
				ownLocationList: [],
				selectLocationList: [],
				selectLocationArr: [],

				canEditJobType: false,
				editJobTypeList: [],
				addJobTypeStatus: false,
				ownJobTypeValue: '',
				ownJobTypeList: [],
				selectJobTypeList: [],
				selectJobTypeArr: [],

				canEditAgeToTeach: false,
				editAgeToTeachList: [],
				addAgeToTeachStatus: false,
				ownAgeToTeachValue: '',
				ownAgeToTeachList: [],
				selectAgeToTeachList: [],
				selectAgeToTeachArr: [],

				canEditRegion: false,
				editRegionList: [],
				addRegionStatus: false,
				ownRegionValue: '',
				ownRegionList: [],
				selectRegionList: [],
				selectRegionArr: [],

				canEditBenefits: false,
				editBenefitsList: [],
				addBenefitsStatus: false,
				ownBenefitsValue: '',
				ownBenefitsList: [],
				selectBenefitsList: [],
				selectBenefitsArr: [],
				userId: undefined,
				identity: undefined,
				applicationContact: '',
				teachExpList: []

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
			if (option.type == 'resume') {
				this.getApplicationContact(option.id)
				uni.setNavigationBarTitle({
					title: 'Application'
				})

			}
			this.getBasicInfo()
		},
		methods: {
			loadedMetaData(e) {
				console.log(e)

			},
			previewPics(i) {
				let list = this.userImagesList
				let urls = []
				list.forEach(item => {
					urls.push(item.url)
				})
				uni.previewImage({
					current: i,
					urls: urls
				})
			},
			previewYourImage(image) {
				uni.previewImage({
					urls: [image]
				})
			},
			getApplicationContact(userId) {
				let data = {
					user_id: userId,
					token: uni.getStorageSync('token')
				}
				profile.getApplicationContact(data).then(res => {
					console.log('application contact')
					console.log(res)
					if (res.code == 200) {
						this.applicationContact = res.message.apply_contact;
					}
				}).catch(error => {
					console.log(error)
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
					identity: 1
				}
				profile.visitorUserInfo(data).then(res => {
					console.log(res)
					if (res.code == 200) {
						var img_url = res.message.educator_info.profile_photo;
						let educatorInfo = res.message.educator_info;

						if (educatorInfo.profile_photo == '') {
							img_url = 'https://i.loli.net/2020/10/29/zgFvraCTjbd7fEs.png';
						}
						// #ifdef H5
						var url = window.location.href;
						var origin = window.location.origin;
						let user_id = that.userId;
						let turn_url = origin + '/esl_h5/pagesB/me/educator/share?id=' + user_id;
						// window.location.href = turn_url;
						let share_data = {
							title: educatorInfo.first_name + educatorInfo.last_name, // 分享标题
							desc: educatorInfo.bio, // 分享描述
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
						that.educatorInfo = res.message.educator_info;

						if (educatorInfo.places_lived) {
							that.countriesLivedList = educatorInfo.places_lived;
						}
						if (educatorInfo.places_traveled) {
							that.countriesTraveledList = educatorInfo.places_traveled;
						}
						if (educatorInfo.languages) {
							that.languagesList = educatorInfo.languages;
						}

						if (educatorInfo.Location) {
							that.locationList = educatorInfo.Location;
						}
						if (educatorInfo.job_type) {
							that.jobTypeList = educatorInfo.job_type;
						}
						if (educatorInfo.age_to_teach) {
							that.ageToTeachList = educatorInfo.age_to_teach;
						}
						if (educatorInfo.region) {
							that.regionList = educatorInfo.region;
						}
						if (educatorInfo.benefits) {
							that.benefitsList = educatorInfo.benefits;
						}
						if (educatorInfo.subject) {
							that.subjectList = educatorInfo.subject;
						}

						if (educatorInfo.Teaching_experience) {
							that.teachExpList = educatorInfo.Teaching_experience;
						}
						if (educatorInfo.Teaching_certificate) {
							that.certificationsList = educatorInfo.Teaching_certificate;
						}
						if (educatorInfo.user_images) {
							that.userImagesList = educatorInfo.user_images;
						}
						if (educatorInfo.work_info) {
							that.workInfo = educatorInfo.work_info;
						}
						if (educatorInfo.education_info) {
							that.educationInfo = educatorInfo.education_info;
						}

						let hobbies = educatorInfo.hobbies;
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
		onShareAppMessage: function() {

		},
		onShareTimeline: function() {

		},
		onAddToFavorites: function() {

		},
		onReady: function() {
			var that = this;
			// #ifdef H5
			this.videoContext = uni.createVideoContext('myVideo')
			setTimeout(function() {
				that.videoContext.play()
			}, 2000)
			setTimeout(function() {
				that.videoContext.pause()
			}, 3000)
			// #endif
		}
	}
</script>

<style>
	@import url("@/common/me/share.css");
</style>
