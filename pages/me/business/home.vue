<template>
	<view class="uni-flex uni-column home-bg">
		<view class="flex-item home-picture" :style="{backgroundImage:'url('+backgroundPictureSrc+')'}">
			<canvas canvas-id="canvasArcbar1" id="canvasArcbar1" class="charts3">
				<image v-if="businessUserInfo.profile_photo !=''" :src="businessUserInfo.profile_photo" mode="aspectFill" @click="turnEditProfilePhoto(4,businessUserInfo.profile_photo)"></image>
				<image v-if="businessUserInfo.profile_photo ==''" :src="avatarUrl" mode="aspectFill" @click="turnEditProfilePhoto(4,businessUserInfo.profile_photo)"></image>
				<view v-if="businessUserInfo.logo!=''" style="line-height: 80rpx; position: absolute;
				width:80rpx; height: 80rpx;border-radius: 80rpx; 
				right: 200rpx;top:160rpx;
				border: 1rpx solid #EEEEEE;background-size: contain;background-position: center;"
				 :style=" {backgroundImage:'url('+businessUserInfo.logo+')'}" @click="turnEditProfilePhoto(5,businessUserInfo.logo)">
				</view>
				<view style="position: absolute;right: 50rpx;color: #FFFFFF;bottom: 80rpx;font-size: 38rpx;font-weight: 700;">
					<text>{{percent}}</text>
				</view>
				<view style="position: absolute;right: 20rpx;color: #FFFFFF;bottom: 50rpx;font-size: 30rpx;font-weight: 700;">
					<text>Complete</text>
				</view>
			</canvas>
			<view class="flex-item home-user-name">
				<text>{{businessUserInfo.first_name}} {{businessUserInfo.last_name}}</text>
			</view>
		</view>

		<view class="flex-item home-info">
			<!-- <u-tabs-swiper ref="tabs" :list="itemList" :is-scroll="true"></u-tabs-swiper> -->
			<uni-segmented-control class="segmented-control-bg" :current="current" :values="items" @clickItem="onClickItem"
			 style-type="text" active-color="#333333"></uni-segmented-control>
			<view class="profile-content">
				<view v-if="current ===0">
					<view class="basic-info">
						<view class="basic-info-t">
							<view class="basic-info-t-title">{{i18n.profilebusinessbasicinfo}}</view>
							<view class="edit-icon" @click="turnEditBusinessBasic">
								<image src="../static/esl/edit.png" mode="aspectFill"></image>
							</view>
						</view>
						<view class="basic-info-b">
							<view class="basic-info-item" v-if="businessUserInfo.business_name!=''">
								<text>{{i18n.profilebusinessinfobusinessname}}:</text>
								<text>
									{{businessUserInfo.business_name}}
								</text>
							</view>
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
								<text> {{businessUserInfo.district}}, {{businessUserInfo.city}}, {{businessUserInfo.province}}</text>
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
							<view class="basic-info-item uni-flex uni-row">
								<view class="profile-detail-item-box-item-tg" v-if="businessUserInfo.is_currently_hiring ==1 ">
									<text>{{i18n.profilecurrentlyhiring}}:</text>
									<view class="profile-detail-item-box-item-tg-right"></view>
								</view>
							</view>
						</view>
					</view>
					<!-- 是不是学校 school -->
					<view class="a-school" v-if="businessUserInfo.is_school==0">
						<view class="a-school-l">
							{{i18n.profilebusinessbasicisschool}}
						</view>
						<view class="a-school-r">
							<button type="default" @click="turnEditBusinessSchool">Yes</button>
						</view>
					</view>
					<view class="basic-info" v-if="businessUserInfo.is_school==1">
						<view class="basic-info-t">
							<view class="basic-info-t-title">{{i18n.profilebusinessbasicisschool}}</view>
							<view class="edit-icon" @click="turnEditBusinessSchool">
								<image src="../static/esl/edit.png" mode="aspectFill"></image>
							</view>
						</view>
						<view class="basic-info-b" style="padding-bottom: 0;">
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
							<view class="basic-info-item uni-flex uni-row" >
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

						<!-- student age -->
						<view class="student-age">
							<view class="student-age-t">
								<view class="student-age-title">{{i18n.profilebusinessourstudentage}}</view>
								<view class="edit-icon" @click="turnSearchTags(73)" v-if="canEditStudentAge===false">
									<image src="../static/esl/edit.png" mode="aspectFill"></image>
								</view>
								<view class="edit-icon" @click="studentAgeConfirm" v-if="canEditStudentAge">
									<image src="../static/esl/confirm-icon.png" mode="aspectFill"></image>
								</view>
							</view>
							<!-- student age tags展示 -->
							<view class="student-age-b" v-if="canEditStudentAge===false">
								<view class="student-age-item" v-for="(item,i) in studentAgeList" :key="i">
									{{item.object_en}}
								</view>
							</view>
							<!-- student age 编辑 -->
							<view class="jobs-tags-container" v-if="canEditStudentAge">
								<view class="jobs-tags">
									<view class="jobs-tags-item" :class=" selectStudentAgeList.findIndex((element)=>element.id===item.id) == -1 ? '' : 'tags-active' "
									 v-for="(item,index) in editStudentAgeList" :key="item.id" @click="selectStudentAge(item,1)">
										{{item.object_en}}
									</view>
									<view class="jobs-tags-item" :class=" selectStudentAgeList.findIndex((element)=>element===item) == -1 ? '' : 'tags-active' "
									 v-for="(item,index) in ownStudentAgeList" :key="index" @click="selectStudentAge(item,2)">
										{{item.object_name}}
									</view>
								</view>
								<!-- <view class="jobs-tags-item" v-if="addStudentAgeStatus==false" @click="addStudentAgeStatus=true">Add+</view> -->
								<view class="jobs-tags-add">
									<view class="jobs-tags-item-add" v-if="addStudentAgeStatus">
										<input type="text" v-model="ownStudentAgeValue" placeholder="Add student age">
										<view class="jobs-tags-item-add-button">
											<button type="default" v-if="ownStudentAgeValue.length>0" @click="addOwnStudentAge">Confirm</button>
											<button type="default" v-if="ownStudentAgeValue.length==0" @click="addStudentAgeStatus=false">Cancel</button>
										</view>
									</view>
								</view>
							</view>
							<!-- subject -->
							<view class="subject" style="padding-right: 0;">
								<view class="subject-t">
									<view class="subject-title">{{i18n.profilebusinesssubjectsweteach}}</view>
									<view class="edit-icon" @click="turnSearchTags(1)" v-if="canEditSubject===false">
										<image src="../static/esl/edit.png" mode="aspectFill"></image>
									</view>
									<view class="edit-icon" @click="subjectConfirm" v-if="canEditSubject">
										<image src="../static/esl/confirm-icon.png" mode="aspectFill"></image>
									</view>
								</view>
								<!-- subject tags展示 -->
								<view class="subject-b" v-if="canEditSubject===false">
									<view class="subject-item" v-for="(item,i) in subjectList" :key="i">
										{{item.object_en}}
									</view>
								</view>
								<!-- subject 编辑 -->
								<view class="jobs-tags-container" v-if="canEditSubject">
									<view class="jobs-tags">
										<view class="jobs-tags-item" :class=" selectSubjectList.findIndex((element)=>element.id===item.id) == -1 ? '' : 'tags-active' "
										 v-for="(item,index) in editSubjectList" :key="item.id" @click="selectSubject(item,1)">
											{{item.object_en}}
										</view>
										<view class="jobs-tags-item" :class=" selectSubjectList.findIndex((element)=>element===item) == -1 ? '' : 'tags-active' "
										 v-for="(item,index) in ownSubjectList" :key="index" @click="selectSubject(item,2)">
											{{item.object_name}}
										</view>
									</view>
									<view class="jobs-tags-item" v-if="addSubjectStatus==false" @click="addSubjectStatus=true">Add+</view>
									<view class="jobs-tags-add">
										<view class="jobs-tags-item-add" v-if="addSubjectStatus">
											<input type="text" v-model="ownSubjectValue" placeholder="Add subject">
											<view class="jobs-tags-item-add-button">
												<button type="default" v-if="ownSubjectValue.length>0" @click="addOwnSubject">Confirm</button>
												<button type="default" v-if="ownSubjectValue.length==0" @click="addSubjectStatus=false">Cancel</button>
											</view>
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>

					<view class="our-jobs">
						<view class="our-jobs-t">
							<view class="our-jobs-t-title">{{i18n.profileourjobs}}</view>
						</view>
						<!-- benefits -->
						<view class="benefits" style="margin-top: 0;">
							<view class="benefits-t">
								<view class="benefits-title">{{i18n.profilebusinessemploymentbenefits}}</view>
								<view class="edit-icon" @click="turnSearchTags(6)" v-if="canEditBenefits===false">
									<image src="../static/esl/edit.png" mode="aspectFill"></image>
								</view>
								<view class="edit-icon" @click="benefitsConfirm" v-if="canEditBenefits">
									<image src="../static/esl/confirm-icon.png" mode="aspectFill"></image>
								</view>
							</view>
							<!-- benefits tags展示 -->
							<view class="benefits-b" v-if="canEditBenefits===false">
								<view class="benefits-item" v-for="(item,i) in benefitsList" :key="i">
									{{item.object_en}}
								</view>
							</view>
							<!-- benefits 编辑 -->
							<view class="jobs-tags-container" v-if="canEditBenefits">
								<view class="jobs-tags">
									<view class="jobs-tags-item" :class=" selectBenefitsList.findIndex((element)=>element.id===item.id) == -1 ? '' : 'tags-active' "
									 v-for="(item,index) in editBenefitsList" :key="item.id" @click="selectBenefits(item,1)">
										{{item.object_en}}
									</view>
									<view class="jobs-tags-item" :class=" selectBenefitsList.findIndex((element)=>element===item) == -1 ? '' : 'tags-active' "
									 v-for="(item,index) in ownBenefitsList" :key="index" @click="selectBenefits(item,2)">
										{{item.object_name}}
									</view>
								</view>
								<view class="jobs-tags-item" v-if="addBenefitsStatus==false" @click="addBenefitsStatus=true">Add+</view>
								<view class="jobs-tags-add">
									<view class="jobs-tags-item-add" v-if="addBenefitsStatus">
										<input type="text" v-model="ownBenefitsValue" placeholder="Add benefits">
										<view class="jobs-tags-item-add-button">
											<button type="default" v-if="ownBenefitsValue.length>0" @click="addOwnBenefits">Confirm</button>
											<button type="default" v-if="ownBenefitsValue.length==0" @click="addBenefitsStatus=false">Cancel</button>
										</view>
									</view>

								</view>
							</view>
						</view>

						<!-- job type -->
						<view class="job-type" style="margin-top: 0;">
							<view class="job-type-t">
								<view class="job-type-title">{{i18n.profilejobtype}}</view>
								<view class="edit-icon" @click="turnSearchTags(3)" v-if="canEditJobType===false">
									<image src="../static/esl/edit.png" mode="aspectFill"></image>
								</view>
								<view class="edit-icon" @click="jobTypeConfirm" v-if="canEditJobType">
									<image src="../static/esl/confirm-icon.png" mode="aspectFill"></image>
								</view>
							</view>
							<!-- job type tags展示 -->
							<view class="job-type-b" v-if="canEditJobType===false">
								<view class="job-type-item" v-for="(item,i) in jobTypeList" :key="i">
									{{item.object_en}}
								</view>
							</view>
							<!-- job type 编辑 -->
							<view class="jobs-tags-container" v-if="canEditJobType">
								<view class="jobs-tags">
									<view class="jobs-tags-item" :class=" selectJobTypeList.findIndex((element)=>element.id===item.id) == -1 ? '' : 'tags-active' "
									 v-for="(item,index) in editJobTypeList" :key="item.id" @click="selectJobType(item,1)">
										{{item.object_en}}
									</view>
									<view class="jobs-tags-item" :class=" selectJobTypeList.findIndex((element)=>element===item) == -1 ? '' : 'tags-active' "
									 v-for="(item,index) in ownJobTypeList" :key="index" @click="selectJobType(item,2)">
										{{item.object_name}}
									</view>
								</view>
								<view class="jobs-tags-item" v-if="addJobTypeStatus==false" @click="addJobTypeStatus=true">Add+</view>
								<view class="jobs-tags-add">
									<view class="jobs-tags-item-add" v-if="addJobTypeStatus">
										<input type="text" v-model="ownJobTypeValue" placeholder="Add job type">
										<view class="jobs-tags-item-add-button">
											<button type="default" v-if="ownJobTypeValue.length>0" @click="addOwnJobType">Confirm</button>
											<button type="default" v-if="ownJobTypeValue.length==0" @click="addJobTypeStatus=false">Cancel</button>
										</view>
									</view>

								</view>
							</view>
						</view>
					</view>
				</view>

				<view class="profile-media" v-if="current === 1">
					<view class="profile-detail-relative ">
						<view class="profile-detail-item-title">{{i18n.profileprofilephoto}}</view>
						<view class="profile-detail-item-box" v-if="businessUserInfo.profile_photo">
							<view class="profile-photo-1">
								<image @click="previewYourImage(businessUserInfo.profile_photo)" :src="businessUserInfo.profile_photo" mode="aspectFill"></image>
							</view>
						</view>
						<view class="profile-edit-button" @click="turnEditProfilePhoto(4,businessUserInfo.profile_photo)">
							<!-- {{i18n.profileedit}} -->
							<image src="../static/esl/upload.png" mode="aspectFit"></image>
						</view>
					</view>
					<view class="profile-detail-relative ">
						<view class="profile-detail-item-title">{{i18n.profilebusinesslogo}}</view>
						<view class="profile-detail-item-box" v-if="businessUserInfo.logo">
							<view class="profile-photo-1">
								<image @click="previewYourImage(businessUserInfo.logo)" :src="businessUserInfo.logo" mode="aspectFill"></image>
							</view>
						</view>
						<view class="profile-edit-button" @click="turnEditProfilePhoto(5,businessUserInfo.logo)">
							<!-- {{i18n.profileedit}} -->
							<image src="../static/esl/upload.png" mode="aspectFit"></image>
						</view>
					</view>
					<view class="profile-detail-relative ">
						<view class="profile-detail-item-title">{{i18n.profileheaderphoto}}</view>
						<view class="profile-detail-item-box profile-header-photo" v-if="businessUserInfo.header_photo">
							<view class="profile-header-photo-1">
								<image @click="previewYourImage(businessUserInfo.header_photo)" :src="businessUserInfo.header_photo" mode="aspectFill"></image>
							</view>
						</view>
						<view class="profile-edit-button" @click="turnEditProfilePhoto(6,businessUserInfo.header_photo)">
							<!-- {{i18n.profileedit}} -->
							<image src="../static/esl/upload.png" mode="aspectFit"></image>
						</view>
					</view>
					<view class="profile-detail-relative ">
						<view class="profile-detail-item-title">{{i18n.profilepics6max}}</view>
						<view class="profile-detail-item-box" v-if="userImagesList.length > 0">
							<view class="profile-detail-item-box pics-flex-row">
								<view class="profile-profile-pics-item" v-for="(image,i) in userImagesList" :key="i">
									<image @click="previewYourImage(image.url)" :src="image.url" mode="aspectFill"></image>
								</view>
							</view>
						</view>
						<view class="profile-edit-button" @click="turnEditProfilePhotoMulti(7,userImagesList)">
							<image src="../static/esl/upload.png" mode="aspectFit"></image>
						</view>
					</view>
					<view class="profile-detail-relative ">
						<view class="profile-detail-item-title">{{i18n.profileintrovideo}}</view>
						<view class="profile-detail-item-box" v-if="businessUserInfo.video_url">
							<view class="profile-intro-video">
								<video id="myVideo"  :src="businessUserInfo.video_url" @error="videoErrorCallback" controls></video>
							</view>
						</view>
						<view class="profile-edit-button" @click="turnEditProfileVideo(2,businessUserInfo.video_url)">
							<image src="../static/esl/upload.png" mode="aspectFit"></image>
						</view>
					</view>
				</view>

				<view class="basic-info" v-if="current===2">
					<view class="basic-info-t">
						<view class="basic-info-t-title">{{i18n.profileyourcontactbasicinfo}}</view>
						<view class="edit-icon" @click="turnEditYourBasic">
							<image src="../static/esl/edit.png" mode="aspectFit"></image>
						</view>
					</view>
					<view class="basic-info-b">
						<view class="basic-info-item" v-if="businessUserInfo.first_name!='' || businessUserInfo.last_name !='' " style="width: 100%;">
							<text>{{i18n.profilefirstandlastname}}:</text>
							<text>{{businessUserInfo.first_name}} {{businessUserInfo.last_name}}</text>
						</view>
						<view style="width: 100%;" class="basic-info-item" v-if="businessUserInfo.nickname!='' ">
							<text>{{i18n.profilenickname}}:</text>
							<text>{{businessUserInfo.nickname}}</text>
						</view>
						<view class="basic-info-item" style="width: 100%;" v-if="businessUserInfo.contact_phone!=''">
							<text>{{i18n.profilecontactphone}}:</text>
							<text>{{businessUserInfo.contact_phone}}</text>
						</view>
						<view class="basic-info-item" v-if="businessUserInfo.nationality!=''">
							<text>{{i18n.profilenationality}}:</text>
							<text>{{businessUserInfo.nationality}}</text>
						</view>
						<view class="basic-info-item" v-if="businessUserInfo.wx_id!=''">
							<text>{{i18n.businesswechatid}}:</text>
							<text>{{businessUserInfo.wx_id}}</text>
						</view>
						<view class="basic-info-item" v-if="basicUserInfo.sex==1 || basicUserInfo.sex ==2 || basicUserInfo.sex == 3">
							<text>{{i18n.profilegender}}:</text>
							<text v-if="basicUserInfo.sex == 1">Male</text>
							<text v-if="basicUserInfo.sex == 2">Female</text>
							<text v-if="basicUserInfo.sex == 3">Undisclosed</text>
						</view>
						<view v-if="businessUserInfo.job_title!='' " class="basic-info-item" style="width: 100%;">
							<text>{{i18n.profilejobtitle}}:</text>
							<text>{{businessUserInfo.job_title}}</text>
						</view>
						<view v-if="businessUserInfo.bio!='' " class="basic-info-item" style="width: 100%;">
							<text>{{i18n.profilesmallbio}}:</text>
							<text>{{businessUserInfo.bio}}</text>
						</view>
					</view>
					<view class="hobbies" v-if="hobbiesList.length>0">
						<view class="hobbies-title">{{i18n.profilehobbies}}</view>
						<view class="hobbies-container">
							<view class="hobbies-item" v-for="(hobby,i) in hobbiesList" :key="i">
								<text v-if="hobby !='' ">{{hobby}}</text>
							</view>
						</view>
					</view>

					<view class="languages">
						<view class="languages-top">
							<view class="languages-title">{{i18n.profilelanguages}}</view>
							<view class="edit-icon" @click="turnRateSkillsList(2)">
								<image src="../static/esl/edit.png" mode="aspectFill"></image>
							</view>
						</view>
						<view class="languages-container">
							<view class="languages-item" v-for="(language,i) in languagesList" :key="i">
								{{language.object_en}}
								<u-rate :disabled="true" custom-prefix="custom-icon" active-icon="xll-yuan" inactive-icon="circleo"
								 active-color="#b1c452" v-model="language.object_score" :count="language.object_score"></u-rate>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<view class="gohome">
			<button type="default" @click="turnHomepage()">Back to homepage</button>
		</view>
	</view>
</template>

<script>
	import uCharts from '@/components/u-charts/u-charts.js';
	var _self;
	var canvaArcbar1;
	import profile from '@/api/profile.js'


	export default {
		data() {
			return {
				scrollTop: 0,
				basicUserInfo: {},
				businessUserInfo: {},
				anchorPoint: '',
				avatarUrl: "https://oss.esl-passport.cn/educator.png",
				uerInfo: {},
				cWidth3: '', //圆弧进度图
				cHeight3: '', //圆弧进度图
				arcbarWidth: '', //圆弧进度图，进度条宽度,此设置可使各端宽度一致
				pixelRatio: 1,
				chartData: {
					series: [{
						name: '正确率',
						data: 0.5,
						color: '#00b3d2'
					}]
				},
				percent: '',
				itemList: [{
					name: 'You'
				}, {
					name: 'Details'
				}, {
					name: 'Media'
				}],
				items: ['Business', 'Media', 'You'],
				current: 0,
				backgroundPictureSrc: 'https://oss.esl-passport.cn/esl_passport_26.png',
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
				metaDuration: 0,
				
				isSchoolStatus:false,
			}
		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		},
		onShow() {
			
			this.getBasicInfo();
			this.updateBusProfile();
			// #ifdef MP-WEIXIN
			let token = uni.getStorageSync('token');
			if (token == '') {
				var pages = getCurrentPages(); // 当前页面
				var currentPagePath = pages[pages.length - 1]; // 前一个页面
				
				if(currentPagePath.route == 'pages/login/index'){
					return;
				}
				return uni.navigateTo({
					url: '/pages/login/index?redirect='+encodeURIComponent(currentPagePath.route)
				})
			}
			// #endif
		},
		computed: {
			i18n() {
				return this.$t('index')
			}
		},
		onLoad(option) {
			_self = this;
			this.cWidth3 = uni.upx2px(600); //这里要与样式的宽高对应
			this.cHeight3 = uni.upx2px(300); //这里要与样式的宽高对应
			this.arcbarWidth = uni.upx2px(24);
			if (option.current != undefined && option.current != '') {
				this.current = Number(option.current);
			}
			this.identity = uni.getStorageSync('identity');

		},
		methods: {
			loadedMetaData(e) {
				console.log(e)
				var that = this;
				// #ifdef H5
				this.videoContext = uni.createVideoContext('myVideo')
				setTimeout(function(){
					that.videoContext.play()
				},1000)
				setTimeout(function(){
					that.videoContext.pause()
				},1500)
				// #endif
			},
			turnHomepage() {
				uni.reLaunch({
					url: '/pages/home/index'
				})
			},
			updateBusProfile() {
				let data = {
					token: uni.getStorageSync('token')
				}
				profile.updateBusProfile(data).then(res => {
					console.log(res)
					if (res.code == 200) {
						this.percent = res.message + '%';
						this.correctRate = res.message / 100;
						let char_data = {
							series: [{
								name: '正确率',
								data: this.correctRate,
								color: '#00b3d2'
							}]
						}

						this.showArcbar("canvasArcbar1", char_data);

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
			turnRateSkillsList(type) {
				uni.navigateTo({
					url: '../profile/rateSkillsList?type=' + type
				})
			},
			previewYourImage(image) {
				uni.previewImage({
					urls: [image]
				})
			},
			turnEditYourBasic() {
				var that = this;
				uni.navigateTo({
					url: 'edit/basic'
				})
			},
			turnEditBusinessSchool() {
				// #ifdef H5
				var url = window.location.href;
				var origin = window.location.origin;
				let turn_url = origin + '/esl_h5/pages/me/business/edit/school';
				window.location.href = turn_url;
				// #endif
				// #ifndef H5
				uni.navigateTo({
					url: 'edit/school'
				})
				// #endif


			},
			turnEditBusinessBasic() {
				uni.navigateTo({
					url: 'edit/businessBasic'
				})
				// var url = window.location.href;
				// var origin = window.location.origin;
				// let turn_url = origin + '/esl_h5/pages/me/business/edit/businessBasic';
				// window.location.href = turn_url;
			},
			turnEditOurJobs() {
				uni.navigateTo({
					url: 'edit/jobs'
				})
			},
			turnSearchTags(type) {

				// student age
				let data = {
					token: uni.getStorageSync('token'),
					pid: type
				}
				this.selectStudentAgeList = [];
				this.ownStudentAgeList = [];

				profile.getUserObjectList(data).then(res => {
					if (type == 73) {
						this.editStudentAgeList = res.message;
						console.log(this.studentAgeList);
						let len = this.studentAgeList.length;
						let studentAgeList = this.studentAgeList;
						console.log(len);
						for (var i = 0; i < len; i++) {
							console.log(studentAgeList[i].object_id);
							if (studentAgeList[i].object_id == 0) {
								let obj = {
									id: studentAgeList[i].object_id,
									object_pid: studentAgeList[i].object_pid,
									object_name: studentAgeList[i].object_en
								}
								this.ownStudentAgeList.push(obj);
								this.selectStudentAgeList.push(obj)
							} else {
								let obj = {
									id: studentAgeList[i].object_id,
									pid: studentAgeList[i].object_pid,
									object_en: studentAgeList[i].object_en,
									object_cn: studentAgeList[i].object_cn
								}
								this.selectStudentAgeList.push(obj)
							}
						}

						this.canEditStudentAge = true;
					}

					if (type == 1) {
						this.editSubjectList = res.message;
						let len = this.subjectList.length;
						let subjectList = this.subjectList;
						console.log(len);
						for (var i = 0; i < len; i++) {
							console.log(subjectList[i].object_id);
							if (subjectList[i].object_id == 0) {
								let obj = {
									id: subjectList[i].object_id,
									object_pid: subjectList[i].object_pid,
									object_name: subjectList[i].object_en
								}
								this.ownSubjectList.push(obj);
								this.selectSubjectList.push(obj)
							} else {
								let obj = {
									id: subjectList[i].object_id,
									pid: subjectList[i].object_pid,
									object_en: subjectList[i].object_en,
									object_cn: subjectList[i].object_cn
								}
								this.selectSubjectList.push(obj)
							}
						}

						this.canEditSubject = true;
					}

					// benefits
					if (type == 6) {
						this.editBenefitsList = res.message;
						console.log(this.benefitsList);
						let len = this.benefitsList.length;
						let benefitsList = this.benefitsList;
						console.log(len);
						for (var i = 0; i < len; i++) {
							console.log(benefitsList[i].object_id);
							if (benefitsList[i].object_id == 0) {
								let obj = {
									id: benefitsList[i].object_id,
									object_pid: benefitsList[i].object_pid,
									object_name: benefitsList[i].object_en
								}
								this.ownBenefitsList.push(obj);
								this.selectBenefitsList.push(obj)
							} else {
								let obj = {
									id: benefitsList[i].object_id,
									pid: benefitsList[i].object_pid,
									object_en: benefitsList[i].object_en,
									object_cn: benefitsList[i].object_cn
								}
								this.selectBenefitsList.push(obj)
							}
						}

						this.canEditBenefits = true;
					}

					// job type
					if (type == 3) {
						this.editJobTypeList = res.message;
						console.log(this.jobTypeList);
						let len = this.jobTypeList.length;
						let jobTypeList = this.jobTypeList;
						console.log(len);
						for (var i = 0; i < len; i++) {
							console.log(jobTypeList[i].object_id);
							if (jobTypeList[i].object_id == 0) {
								let obj = {
									id: jobTypeList[i].object_id,
									object_pid: jobTypeList[i].object_pid,
									object_name: jobTypeList[i].object_en
								}
								this.ownJobTypeList.push(obj);
								this.selectJobTypeList.push(obj)
							} else {
								let obj = {
									id: jobTypeList[i].object_id,
									pid: jobTypeList[i].object_pid,
									object_en: jobTypeList[i].object_en,
									object_cn: jobTypeList[i].object_cn
								}
								this.selectJobTypeList.push(obj)
							}
						}

						this.canEditJobType = true;
					}

				}).catch(error => {
					console.log(error)
				})
			},
			turnEditProfilePhoto(type, source) {
				let a = encodeURI(source);
				uni.navigateTo({
					url: '../profile/photo?type=' + type + '&source=' + a
				})
			},
			turnEditProfilePhotoMulti(type, source) {
				// console.log(source);
				uni.navigateTo({
					url: '../profile/photo?type=' + type,
					success() {
						uni.setStorageSync('userImageList', JSON.stringify(source));
					}
				})
			},
			turnEditProfileVideo(type, source) {
				uni.navigateTo({
					url: '../profile/video?type=' + type + '&source=' + source
				})
			},
			showArcbar(canvasId, chartData) {
				this.percent = Math.round(chartData.series[0].data * 100) + '%';
				canvaArcbar1 = new uCharts({
					$this: _self,
					canvasId: canvasId,
					type: 'arcbar',
					fontSize: 11,
					legend: {
						show: false
					},
					background: '#FFFFFF',
					pixelRatio: _self.pixelRatio,
					series: chartData.series,
					animation: true,
					width: _self.cWidth3 * _self.pixelRatio,
					height: _self.cHeight3 * _self.pixelRatio,
					dataLabel: true,
					// title: {
					// 	name: Math.round(chartData.series[0].data*100)+'%',//这里我自动计算了，您可以直接给任意字符串
					// 	color: '#0AA0A8',
					// 	fontSize: 25 * _self.pixelRatio
					// },
					// subtitle: {
					// 	name: 'name', //这里您可以直接给任意字符串
					// 	color: '#666666',
					// 	fontSize: 15 * _self.pixelRatio
					// },
					extra: {
						arcbar: {
							type: 'default',
							width: _self.arcbarWidth * _self.pixelRatio, //圆弧的宽度
						}
					}
				});

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

			videoErrorCallback: function(e) {
				console.log(e);
				// uni.showModal({
				// 	content: e.target.errMsg,
				// 	showCancel: false
				// })
			},
			getBasicInfo() {
				var that = this;
				let data = {
					id: uni.getStorageSync('uid'),
					token: uni.getStorageSync('token')
				}
				profile.getBasicInfo(data).then(res => {
					console.log(res)
					if (res.code == 200) {
						// #ifdef H5
						var img_url = res.message.business_info.profile_photo;
						if (res.message.business_info.profile_photo == '') {
							img_url = 'https://i.loli.net/2020/10/29/zgFvraCTjbd7fEs.png';
						}
						var url = window.location.href;
						var origin = window.location.origin;
						let user_id = uni.getStorageSync('uid');
						console.log(origin)
						let turn_url = origin + '/esl_h5/pages/me/business/share?id=' + user_id;
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

						// that.avatarUrl = res.message.headimgurl;
						// that.percent = res.message.is_business + '%';
						// that.correctRate = res.message.is_business / 100;

						// let chartData = {
						// 	series: [{
						// 		name: '正确率',
						// 		data: that.correctRate,
						// 		color: '#00b3d2'
						// 	}]
						// }
						// this.showArcbar("canvasArcbar1", chartData);

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
						if (hobbies != '') {
							that.hobbiesList = hobbies.split(',');
						}


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
			addOwnStudentAge() {
				this.addStudentAgeStatus = false;
				let obj = {
					id: 0,
					object_name: this.ownStudentAgeValue,
					object_pid: 73
				}
				let index = this.selectStudentAgeList.findIndex((element) => element === obj);
				if (index == -1) {
					// if (this.selectStudentAgeList.length > 4) {
					// 	return false;
					// }
					this.selectStudentAgeList.push(obj);
					this.ownStudentAgeList.push(obj);
					this.ownStudentAgeValue = '';
				} else {
					this.selectStudentAgeList.splice(index, 1);
				}

			},
			selectStudentAge(value, type) {

				if (type == 1) {
					var index = this.selectStudentAgeList.findIndex((element) => element.id === value.id);
				}
				if (type == 2) {
					var index = this.selectStudentAgeList.findIndex((element) => element === value);
				}

				if (index == -1) {
					// if (this.selectStudentAgeList.length > 4) {
					// 	return false;
					// }
					this.selectStudentAgeList.push(value);

				} else {
					this.selectStudentAgeList.splice(index, 1);
				}
				console.log(this.selectStudentAgeList)
			},
			studentAgeConfirm() {

				let expand = [];
				let objectArr = [];
				this.selectStudentAgeList.forEach(item => {
					console.log(item);
					if (item.id === 0) {
						expand.push(item.object_name);
					} else {
						objectArr.push(item.id);
					}
				})

				let data = {
					token: uni.getStorageSync('token'),
					object_pid: 73,
					object_id: objectArr,
					expand: expand
				}

				profile.addProfile(data).then(res => {
					if (res.code == 200) {
						console.log('StudentAge--submit--' + res.data);
						this.canEditStudentAge = false;
						this.getBasicInfo();
					} else {
						console.log('StudentAge--submit--' + res.msg);
					}

				}).catch(error => {
					console.log(error)
				})
			},
			addOwnSubject() {
				this.addSubjectStatus = false;
				let obj = {
					id: 0,
					object_name: this.ownSubjectValue,
					object_pid: 1
				}
				let index = this.selectSubjectList.findIndex((element) => element === obj);
				if (index == -1) {
					// if (this.selectSubjectList.length > 4) {
					// 	return false;
					// }
					this.selectSubjectList.push(obj);
					this.ownSubjectList.push(obj);
					this.ownSubjectValue = '';

				} else {
					this.selectSubjectList.splice(index, 1);
				}

			},
			selectSubject(value, type) {

				if (type == 1) {
					var index = this.selectSubjectList.findIndex((element) => element.id === value.id);
				}
				if (type == 2) {
					var index = this.selectSubjectList.findIndex((element) => element === value);
				}

				if (index == -1) {
					// if (this.selectSubjectList.length > 4) {
					// 	return false;
					// }
					this.selectSubjectList.push(value);

				} else {
					this.selectSubjectList.splice(index, 1);
				}
				console.log(this.selectSubjectList)
			},
			subjectConfirm() {

				let expand = [];
				let objectArr = [];
				this.selectSubjectList.forEach(item => {
					console.log(item);
					if (item.id === 0) {
						expand.push(item.object_name);
					} else {
						objectArr.push(item.id);
					}
				})

				let data = {
					token: uni.getStorageSync('token'),
					object_pid: 1,
					object_id: objectArr,
					expand: expand
				}

				profile.addProfile(data).then(res => {
					if (res.code == 200) {
						console.log('subject--submit--' + res.data);
						this.canEditSubject = false;
						this.getBasicInfo();
					} else {
						console.log('subject--submit--' + res.msg);
					}

				}).catch(error => {
					console.log(error)
				})
			},
			addOwnBenefits() {
				this.addBenefitsStatus = false;
				let obj = {
					id: 0,
					object_name: this.ownBenefitsValue,
					object_pid: 6
				}
				let index = this.selectBenefitsList.findIndex((element) => element === obj);
				if (index == -1) {
					// if (this.selectBenefitsList.length > 4) {
					// 	return false;
					// }
					this.selectBenefitsList.push(obj);
					this.ownBenefitsList.push(obj);
					this.ownBenefitsValue = '';
				} else {
					this.selectBenefitsList.splice(index, 1);
				}

			},
			selectBenefits(value, type) {

				if (type == 1) {
					var index = this.selectBenefitsList.findIndex((element) => element.id === value.id);
				}
				if (type == 2) {
					var index = this.selectBenefitsList.findIndex((element) => element === value);
				}

				if (index == -1) {
					// if (this.selectBenefitsList.length > 4) {
					// 	return false;
					// }
					this.selectBenefitsList.push(value);

				} else {
					this.selectBenefitsList.splice(index, 1);
				}
				console.log(this.selectBenefitsList)
			},
			benefitsConfirm() {

				let expand = [];
				let objectArr = [];
				this.selectBenefitsList.forEach(item => {
					console.log(item);
					if (item.id === 0) {
						expand.push(item.object_name);
					} else {
						objectArr.push(item.id);
					}
				})

				let data = {
					token: uni.getStorageSync('token'),
					object_pid: 6,
					object_id: objectArr,
					expand: expand
				}

				profile.addProfile(data).then(res => {
					if (res.code == 200) {
						console.log('benefits--submit--' + res.data);
						this.canEditBenefits = false;
						this.getBasicInfo();
					} else {
						console.log('benefits--submit--' + res.msg);
					}

				}).catch(error => {
					console.log(error)
				})
			},
			addOwnJobType() {
				this.addJobTypeStatus = false;
				let obj = {
					id: 0,
					object_name: this.ownJobTypeValue,
					object_pid: 3
				}
				let index = this.selectJobTypeList.findIndex((element) => element === obj);
				if (index == -1) {
					// if (this.selectJobTypeList.length > 4) {
					// 	return false;
					// }
					this.selectJobTypeList.push(obj);
					this.ownJobTypeList.push(obj);
					this.ownJobTypeValue = '';
				} else {
					this.selectJobTypeList.splice(index, 1);
				}

			},
			selectJobType(value, type) {

				if (type == 1) {
					var index = this.selectJobTypeList.findIndex((element) => element.id === value.id);
				}
				if (type == 2) {
					var index = this.selectJobTypeList.findIndex((element) => element === value);
				}

				if (index == -1) {
					// if (this.selectJobTypeList.length > 4) {
					// 	return false;
					// }
					this.selectJobTypeList.push(value);

				} else {
					this.selectJobTypeList.splice(index, 1);
				}
				console.log(this.selectJobTypeList)
			},
			jobTypeConfirm() {

				let expand = [];
				let objectArr = [];
				this.selectJobTypeList.forEach(item => {
					console.log(item);
					if (item.id === 0) {
						expand.push(item.object_name);
					} else {
						objectArr.push(item.id);
					}
				})

				let data = {
					token: uni.getStorageSync('token'),
					object_pid: 3,
					object_id: objectArr,
					expand: expand
				}

				profile.addProfile(data).then(res => {
					if (res.code == 200) {
						console.log('jobtype--submit--' + res.data);
						this.canEditJobType = false;
						this.getBasicInfo();
					} else {
						console.log('jobtype--submit--' + res.msg);
					}

				}).catch(error => {
					console.log(error)
				})
			},

		},
		onShareAppMessage:function(){
			let uid = uni.getStorageSync('uid');
			let businessInfo = this.businessUserInfo;
			
			return {
				title:businessInfo.first_name + ' ' + businessInfo.last_name,
				path:'/pages/me/business/share?id='+uid
			}
		},
		onShareTimeline:function(){
			let uid = uni.getStorageSync('uid');
			let businessInfo = this.businessUserInfo;
			
			return {
				title:businessInfo.first_name + ' ' + businessInfo.last_name,
				path:'/pages/me/business/share?id='+uid,
				imageUrl:businessInfo.profile_photo
			}
		},
		onAddToFavorites:function(){
			
		},
		onReady: function(res) {
			// #ifndef MP-ALIPAY
			this.videoContext = uni.createVideoContext('myVideo')
			// #endif
			
		}
	}
</script>

<style>
	@import url("@/common/me/home.css");

	.jobs-tags-container {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		flex-wrap: wrap;
		margin-top: 10rpx;
	}

	.jobs-tags {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		flex-wrap: wrap;

	}

	.jobs-tags-item {
		background-color: rgba(0, 179, 210, 0.1);
		padding-left: 20rpx;
		padding-right: 20rpx;
		padding-top: 10rpx;
		padding-bottom: 10rpx;
		border-radius: 20rpx;
		margin-top: 10rpx;
		margin-left: 10rpx;
		font-size: 30rpx;
		/* width: 100%; */
	}

	.jobs-tags-add {
		width: 100%;
		margin-top: 10rpx;
	}

	.jobs-tags-item-add {
		width: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-around;
		flex-wrap: wrap;
	}

	.jobs-tags-item-add input {
		width: 70%;
		border: 1rpx solid #EEEEEE;
		height: 80rpx;
		line-height: 80rpx;
		font-size: 30rpx;
	}

	.jobs-tags-item-add-button {
		width: 20%;

	}

	.jobs-tags-item-add-button button {
		width: 100%;
		text-align: center;
		height: 80rpx;
		line-height: 80rpx;
		background-color: #0AA0A8;
		color: #FFFFFF;
		font-size: 30rpx;
		padding: 0;
		border-radius: 20rpx;
	}

	.tags-active {
		background-color: #00CE47;
		color: #FFFFFF;
	}
	
	
	.a-school{
		background-color: #FFFFFF;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		margin-top: 20rpx;
		padding: 10rpx 20rpx;
		border-radius: 20rpx;
	}
	
	.a-school-l{
		font-size: 34rpx;
		font-weight: 700;
		
	}
	.a-school-r button{
		height: 80rpx;
		background-color: #0AA0A8;
		color: #FFFFFF;
		line-height: 80rpx;
		font-size: 34rpx;
	}
	
</style>
