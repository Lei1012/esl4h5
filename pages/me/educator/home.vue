<template>
	<view class="uni-flex uni-column home-bg">
		<view class="flex-item home-picture" :style="{backgroundImage:'url('+backgroundPictureSrc+')'}">
			<canvas canvas-id="canvasArcbar1" id="canvasArcbar1" class="charts3">
				<image :src="educatorInfo.profile_photo != '' ? educatorInfo.profile_photo :  basicUserInfo.headimgurl" mode="aspectFill"
				 @click="turnEditProfilePhoto(1,educatorInfo.profile_photo)"></image>
				<view style="position: absolute;right: 50rpx;color: #FFFFFF;bottom: 80rpx;font-size: 38rpx;font-weight: 700;">
					<text>{{percent}}</text>
				</view>
				<view style="position: absolute;right: 20rpx;color: #FFFFFF;bottom: 50rpx;font-size: 30rpx;font-weight: 700;">
					<text>Complete</text>
				</view>
			</canvas>
			<view class="flex-item home-user-name">
				<text>{{educatorInfo.first_name}} {{educatorInfo.last_name}}</text>
			</view>
		</view>
		<view class="flex-item home-info">
			<uni-segmented-control class="segmented-control-bg" :current="current" :values="items" @clickItem="onClickItem"
			 style-type="text" active-color="#333333"></uni-segmented-control>
			<view class="profile-content">
				<view v-if="current == 0">
					<!-- basic-info -->
					<view class="basic-info">
						<view class="basic-info-t">
							<view class="basic-info-t-title">{{i18n.profilebasicinfo}}</view>
							<view class="edit-icon" @click="turnEditProfileBasic">
								<image src="../static/esl/edit.png" mode="aspectFill"></image>
							</view>
						</view>
						<view class="basic-info-b">
							<view class="basic-info-item" style="width: 100%;" v-if="educatorInfo.first_name!='' || educatorInfo.last_name != '' ">
								<text>{{i18n.profilefirstandlastname}}:</text>
								<text>{{educatorInfo.first_name}} {{educatorInfo.last_name}}</text>
							</view>
							<view class="basic-info-item" v-if="educatorInfo.nickname!=''">
								<text>{{i18n.profilenickname}}:</text>
								<text>{{educatorInfo.nickname}}</text>
							</view>
							<view class="basic-info-item" v-if="educatorInfo.city != '' ">
								<text>{{i18n.profilecurrentcity}}:</text>
								<text>{{educatorInfo.city}}</text>
							</view>
							<view class="basic-info-item" v-if="basicUserInfo.birthday!='' && basicUserInfo.birthday != '0000-00-00' ">
								<text>{{i18n.profilebirthdate}}:</text>
								<text>{{basicUserInfo.birthday}}</text>
							</view>
							<view class="basic-info-item" v-if="educatorInfo.nationality!=''">
								<text>{{i18n.profilenationality}}:</text>
								<text>{{educatorInfo.nationality}}</text>
							</view>
							<view class="basic-info-item" v-if="educatorInfo.wx_id!=''">
								<text>{{i18n.educatorwechatid}}:</text>
								<text>{{educatorInfo.wx_id}}</text>
							</view>
							<view class="basic-info-item" v-if="educatorInfo.sub_identity_name!=''">
								<text>{{i18n.profileeducategory}}:</text>
								<text>{{educatorInfo.sub_identity_name}}</text>
							</view>
							<view class="basic-info-item" v-if="educatorInfo.email!=''">
								<text>{{i18n.basiceduemail}}:</text>
								<text>{{educatorInfo.email}}</text>
							</view>
							<view class="basic-info-item" v-if="basicUserInfo.sex==1 || basicUserInfo.sex==2 || basicUserInfo.sex ==3">
								<text>{{i18n.profilegender}}:</text>
								<text v-if="basicUserInfo.sex == 1">Male</text>
								<text v-if="basicUserInfo.sex == 2">Female</text>
								<text v-if="basicUserInfo.sex == 3">Undisclosed</text>
							</view>
							<view class="basic-info-item uni-flex uni-row">
								<view class="profile-detail-item-box-item-tg" v-if="basicUserInfo.is_seeking ==1 ">
									<text>{{i18n.profilejobseeking}}:</text>
									<view class="profile-detail-item-box-item-tg-right"></view>
								</view>
								<view class="profile-detail-item-box-item-tg" v-if="basicUserInfo.is_public ==1 ">
									<text>{{i18n.profilepublicprofile}}:</text>
									<view class="profile-detail-item-box-item-tg-right"></view>
								</view>
							</view>
						</view>
					</view>
					<!-- Credentials  -->
					<view class="credentials">
						<view class="credentials-t">
							<view class="credentials-t-title">{{i18n.profilecredentials}}</view>
						</view>
						<view class="credentials-b">
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
							<view class="certifications">
								<view class="certifications-t">
									<view class="certifications-title">{{i18n.profilecertifications}}</view>
									<view class="edit-icon" @click="turnIndexList(7)" v-if="canEditCertifications === false">
										<image src="../static/esl/edit.png" mode="aspectFill"></image>
									</view>
									<view class="edit-icon" @click="certificationsConfirm" v-if="canEditCertifications">
										<image src="../static/esl/confirm-icon.png" mode="aspectFill"></image>
									</view>
								</view>
								<!-- certifications 展示 -->
								<view class="certifications-b" v-if="canEditCertifications === false">
									<view class="certifications-item" v-for="(cer,i) in certificationsList" :key="i">
										{{cer.object_en}}
									</view>
								</view>
								<!-- certifications 编辑tags -->
								<view class="jobs-tags-container" v-if="canEditCertifications">
									<view class="jobs-tags">
										<view class="jobs-tags-item" :class=" selectCertificationsList.findIndex((element)=>element.id===item.id) == -1 ? '' : 'tags-active' "
										 v-for="(item,index) in editCertificationsList" :key="item.id" @click="selectCertifications(item,1)">
											{{item.object_en}}
										</view>
										<view class="jobs-tags-item" :class=" selectCertificationsList.findIndex((element)=>element===item) == -1 ? '' : 'tags-active' "
										 v-for="(item,index) in ownCertificationsList" :key="index" @click="selectCertifications(item,2)">
											{{item.object_name}}
										</view>
									</view>
									<view class="jobs-tags-item" v-if="addCertificationsStatus==false" @click="addCertificationsStatus=true">Add+</view>
									<view class="jobs-tags-add">
										<view class="jobs-tags-item-add" v-if="addCertificationsStatus">
											<input type="text" v-model="ownCertificationsValue" placeholder="Add certifications">
											<view class="jobs-tags-item-add-button">
												<button type="default" v-if="ownCertificationsValue.length>0" @click="addOwnCertifications">Confirm</button>
												<button type="default" v-if="ownCertificationsValue.length==0" @click="addCertificationsStatus=false">Cancel</button>
											</view>
										</view>
									</view>
								</view>
							</view>
							<view class="education">
								<view class="education-t">
									<view class="education-title">{{i18n.profileeducation}}</view>
									<view class="add-icon" @click="turnEducation">
										<image src="../static/esl/add.png" mode="aspectFill"></image>
									</view>
								</view>
								<view class="education-b">
									<view v-for="(education,i) in educationInfo" :key="i">
										<view class="education-item" v-if="i<=educationNum">
											<view class="education-school-name">{{education.school_name}}</view>
											<view class="education-item-2">
												<view class="education-field">{{education.field_of_study}}</view>
												<view class="edit-icon" @click="turnEditEducation(education)">
													<image src="../static/esl/edit.png" mode="aspectFill"></image>
												</view>
											</view>
											<view class="education-item-3">
												<view class="education-degree">{{education.degree}}</view>
												<view class="education-date">{{education.start_time | date('mm/yyyy')}}-{{education.end_time | date('mm/yyyy')}}</view>
											</view>
											<view style="border: 1rpx solid #E1E1E1;"></view>
										</view>
									</view>
									<view class="show-more" v-if="showMoreEducationStatus " @click="showMoreEducation">Show more</view>
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
								<view class="edit-icon" @click="turnIndexList(120)" v-if="canEditTeachExp===false">
									<image src="../static/esl/edit.png" mode="aspectFill"></image>
								</view>
								<view class="edit-icon" @click="teachExpConfirm" v-if="canEditTeachExp">
									<image src="../static/esl/confirm-icon.png" mode="aspectFill"></image>
								</view>
							</view>
							<!-- 工作经验 -->
							<view class="countries-travel-b" v-if="canEditTeachExp===false">
								<view class="countries-travel-item" v-for="(item,i) in teachExpList" :key="i">
									{{item.object_en}}
								</view>
							</view>
							<!-- 工作经验tags -->
							<view class="jobs-tags-container" v-if="canEditTeachExp">
								<view class="jobs-tags">
									<view class="jobs-tags-item" :class=" selectTeachExpList.findIndex((element)=>element.id===item.id) == -1 ? '' : 'tags-active' "
									 v-for="(item,index) in editTeachExpList" :key="item.id" @click="selectTeachExp(item,1)">
										{{item.object_en}}
									</view>
									<view class="jobs-tags-item" :class=" selectTeachExpList.findIndex((element)=>element===item) == -1 ? '' : 'tags-active' "
									 v-for="(item,index) in ownTeachExpList" :key="index" @click="selectTeachExp(item,2)">
										{{item.object_name}}
									</view>
								</view>
								<view class="jobs-tags-item" v-if="addTeachExpStatus==false" @click="addTeachExpStatus=true">Add+</view>
								<view class="jobs-tags-add">
									<view class="jobs-tags-item-add" v-if="addTeachExpStatus">
										<input type="text" v-model="ownTeachExpValue" placeholder="Add teaching experience">
										<view class="jobs-tags-item-add-button">
											<button type="default" v-if="ownTeachExpValue.length>0" @click="addOwnTeachExp">Confirm</button>
											<button type="default" v-if="ownTeachExpValue.length==0" @click="addTeachExpStatus=false">Cancel</button>
										</view>
									</view>
								</view>
							</view>
						</view>

						<!-- 展示界面 -->
						<view class="countries-travel">
							<view class="countries-travel-t">
								<view class="countries-travel-title countries-travel-fontsize">{{i18n.profilecountriestraveled}}</view>
								<view class="edit-icon" @click="turnIndexList(8)" v-if="canEditCountriesTraveled===false">
									<image src="../static/esl/edit.png" mode="aspectFill"></image>
								</view>
								<view class="edit-icon" @click="countriesTraveledConfirm" v-if="canEditCountriesTraveled">
									<image src="../static/esl/confirm-icon.png" mode="aspectFill"></image>
								</view>
							</view>
							<!-- 旅行过的国家展示tags -->
							<view class="countries-travel-b" v-if="canEditCountriesTraveled===false">
								<view class="countries-travel-item" v-for="(country,i) in countriesTraveledList" :key="i">
									{{country.object_en}}
								</view>
							</view>
							<!-- 旅行过的国家编辑tags -->
							<view class="jobs-tags-container" v-if="canEditCountriesTraveled">
								<view class="jobs-tags">
									<view class="jobs-tags-item" :class=" selectCountriesTraveledList.findIndex((element)=>element.id===item.id) == -1 ? '' : 'tags-active' "
									 v-for="(item,index) in editCountriesTraveledList" :key="item.id" @click="selectCountriesTraveled(item,1)">
										{{item.object_en}}
									</view>
									<view class="jobs-tags-item" :class=" selectCountriesTraveledList.findIndex((element)=>element===item) == -1 ? '' : 'tags-active' "
									 v-for="(item,index) in ownCountriesTraveledList" :key="index" @click="selectCountriesTraveled(item,2)">
										{{item.object_name}}
									</view>
								</view>
								<view class="jobs-tags-item" v-if="addCountriesTraveledStatus==false" @click="addCountriesTraveledStatus=true">Add+</view>
								<view class="jobs-tags-add">
									<view class="jobs-tags-item-add" v-if="addCountriesTraveledStatus">
										<input type="text" v-model="ownCountriesTraveledValue" placeholder="Add countries traveled">
										<view class="jobs-tags-item-add-button">
											<button type="default" v-if="ownCountriesTraveledValue.length>0" @click="addOwnCountriesTraveled">Confirm</button>
											<button type="default" v-if="ownCountriesTraveledValue.length==0" @click="addCountriesTraveledStatus=false">Cancel</button>
										</view>
									</view>
								</view>
							</view>
						</view>

						<view class="countries-travel">
							<view class="countries-travel-t">
								<view class="countries-travel-title countries-travel-fontsize">{{i18n.profilecountrieslived}}</view>
								<view class="edit-icon" @click="turnIndexList(9)" v-if="canEditCountriesLived===false">
									<image src="../static/esl/edit.png" mode="aspectFill"></image>
								</view>
								<view class="edit-icon" @click="countriesLivedConfirm" v-if="canEditCountriesLived">
									<image src="../static/esl/confirm-icon.png" mode="aspectFill"></image>
								</view>
							</view>
							<!-- countries lived tags展示 -->
							<view class="countries-travel-b" v-if="canEditCountriesLived===false">
								<view class="countries-travel-item" v-for="(country,i) in countriesLivedList" :key="i">
									{{country.object_en}}
								</view>
							</view>
							<!-- countries lived 编辑 -->
							<view class="jobs-tags-container" v-if="canEditCountriesLived">
								<view class="jobs-tags">
									<view class="jobs-tags-item" :class=" selectCountriesLivedList.findIndex((element)=>element.id===item.id) == -1 ? '' : 'tags-active' "
									 v-for="(item,index) in editCountriesLivedList" :key="item.id" @click="selectCountriesLived(item,1)">
										{{item.object_en}}
									</view>
									<view class="jobs-tags-item" :class=" selectCountriesLivedList.findIndex((element)=>element===item) == -1 ? '' : 'tags-active' "
									 v-for="(item,index) in ownCountriesLivedList" :key="index" @click="selectCountriesLived(item,2)">
										{{item.object_name}}
									</view>
								</view>
								<view class="jobs-tags-item" v-if="addCountriesLivedStatus==false" @click="addCountriesLivedStatus=true">Add+</view>
								<view class="jobs-tags-add">
									<view class="jobs-tags-item-add" v-if="addCountriesLivedStatus">
										<input type="text" v-model="ownCountriesLivedValue" placeholder="Add countries lived">
										<view class="jobs-tags-item-add-button">
											<button type="default" v-if="ownCountriesLivedValue.length>0" @click="addOwnCountriesLived">Confirm</button>
											<button type="default" v-if="ownCountriesLivedValue.length==0" @click="addCountriesLivedStatus=false">Cancel</button>
										</view>
									</view>
								</view>
							</view>
						</view>

						<view class="work-exp">
							<view class="work-exp-t">
								<view class="work-exp-title">{{i18n.profileworkexperience}}</view>
								<view class="add-icon" @click="turnWorkExperience">
									<image src="../static/esl/add.png" mode="aspectFill"></image>
								</view>
							</view>
							<view class="work-exp-b">
								<view v-for="(work,i) in workInfo" :key="i">
									<view class="work-exp-b-item" v-if="i<=workExpNum">
										<view class="work-exp-item-1">
											{{work.company_name}}
										</view>
										<view class="work-exp-item-2">
											<view class="work-exp-job-title">{{work.title}}</view>
											<view class="work-exp-date">{{work.work_time_from | date('mm/yyyy')}} - {{work.work_time_to | date('mm/yyyy')}}</view>
											<view class="edit-icon" @click="turnEditWorkExperience(work)">
												<image src="../static/esl/edit.png" mode="aspectFill"></image>
											</view>
										</view>
										<view class="work-exp-item-3">{{work.location}}</view>

										<view class="work-exp-item-4">
											<text>{{work.teaching_experience}}</text>
										</view>
										<view style="border: 1rpx solid #E1E1E1;"></view>
									</view>
								</view>
								<view class="show-more" v-if="showMoreWorkExpStatus" @click="showMoreWorkExp">Show more</view>
							</view>
						</view>
					</view>

					<!-- interest -->
					<view class="interest">
						<view class="interest-t">
							<view class="interest-title">{{i18n.profileinterest}}</view>
							<view class="edit-icon" @click="turnEditProfileBio">
								<image src="../static/esl/edit.png" mode="aspectFill"></image>
							</view>
						</view>
						<view class="bio" v-if="educatorInfo.bio">
							<view class="bio-title">{{i18n.profilebio}}</view>
							<view class="bio-content">
								{{educatorInfo.bio}}
							</view>
						</view>
						<view class="hobbies">
							<view class="hobbies-title">{{i18n.profilehobbies}}</view>
							<view class="hobbies-container">
								<view class="hobbies-item" v-for="(hobby,i) in hobbiesList" :key="i">
									<text>{{hobby}}</text>
								</view>
							</view>
						</view>
					</view>
				</view>

				<view class="profile-media" v-if="current === 1">
					<view class="profile-detail-relative ">
						<view class="profile-detail-item-title">{{i18n.profileprofilephoto}}</view>
						<view class="profile-detail-item-box" v-if="educatorInfo.profile_photo">
							<view class="profile-photo-1">
								<image @click="previewYourImage(educatorInfo.profile_photo)" :src="educatorInfo.profile_photo" mode="aspectFill"></image>
							</view>
						</view>

						<view class="profile-edit-button" @click="turnEditProfilePhoto(1,educatorInfo.profile_photo)">
							<!-- {{i18n.profileedit}} -->
							<image src="../static/esl/upload.png" mode="aspectFit"></image>
						</view>
					</view>
					<view class="profile-detail-relative ">
						<view class="profile-detail-item-title">{{i18n.profileheaderphoto}}</view>
						<view class="profile-detail-item-box profile-header-photo" v-if="educatorInfo.header_photo">
							<view class="profile-header-photo-1">
								<image @click="previewYourImage(educatorInfo.header_photo)" :src="educatorInfo.header_photo" mode="aspectFill"></image>
							</view>
						</view>
						<view class="profile-edit-button" @click="turnEditProfilePhoto(2,educatorInfo.header_photo)">
							<image src="../static/esl/upload.png" mode="aspectFit"></image>
						</view>
					</view>
					<view class="profile-detail-relative ">
						<view class="profile-detail-item-title">{{i18n.profilepics6max}}</view>
						<view class="profile-detail-item-box pics-flex-row" v-if="userImagesList.length>0">
							<view class="profile-profile-pics-item" v-for="(image,i) in userImagesList" :key="i">
								<image @click="previewYourImage(image.url)" :src="image.url" mode="aspectFit"></image>
							</view>
						</view>
						<view class="profile-edit-button" @click="turnEditProfilePhotoMulti(3,userImagesList)">
							<image src="../static/esl/upload.png" mode="aspectFit"></image>
						</view>
					</view>
					<view class="profile-detail-relative ">
						<view class="profile-detail-item-title">{{i18n.profileintrovideo}}</view>
						<view class="profile-detail-item-box" v-if="educatorInfo.video_url">
							<view class="profile-intro-video">
								<video id="myVideo" :muted="true" preload="metadata" @loadedmetadata="loadedMetaData" 
								 x5-video-player-type="h5-page" :src="educatorInfo.video_url" @error="videoErrorCallback"
								 controls></video>
							</view>
						</view>
						<view class="profile-edit-button" @click="turnEditProfileVideo(1,educatorInfo.video_url)">
							<image src="../static/esl/upload.png" mode="aspectFit"></image>
						</view>
					</view>
				</view>
				<view class="preferences" v-if="current===2">
					<!-- subject -->
					<view class="subject">
						<view class="subject-t">
							<view class="subject-title">{{i18n.profilesubject}}</view>
							<view class="edit-icon" @click="turnIndexList(1)" v-if="canEditSubject===false">
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
					<!-- location -->
					<view class="location">
						<view class="location-t">
							<view class="location-title">{{i18n.profilelocation}}</view>
							<view class="edit-icon" @click="turnIndexList(71)" v-if="canEditLocation===false">
								<image src="../static/esl/edit.png" mode="aspectFill"></image>
							</view>
							<view class="edit-icon" @click="locationConfirm" v-if="canEditLocation">
								<image src="../static/esl/confirm-icon.png" mode="aspectFill"></image>
							</view>
						</view>
						<!-- location tags展示 -->
						<view class="location-b" v-if="canEditLocation===false">
							<view class="location-item" v-for="(item,i) in locationList" :key="i">
								{{item.object_en}}
							</view>
						</view>
						<!-- location 编辑 -->
						<view class="jobs-tags-container" v-if="canEditLocation">
							<view class="jobs-tags">
								<view class="jobs-tags-item" :class=" selectLocationList.findIndex((element)=>element.id===item.id) == -1 ? '' : 'tags-active' "
								 v-for="(item,index) in editLocationList" :key="item.id" @click="selectLocation(item,1)">
									{{item.object_en}}
								</view>
								<view class="jobs-tags-item" :class=" selectLocationList.findIndex((element)=>element===item) == -1 ? '' : 'tags-active' "
								 v-for="(item,index) in ownLocationList" :key="index" @click="selectLocation(item,2)">
									{{item.object_name}}
								</view>
							</view>
							<view class="jobs-tags-item" v-if="addLocationStatus==false" @click="addLocationStatus=true">Add+</view>
							<view class="jobs-tags-add">
								<view class="jobs-tags-item-add" v-if="addLocationStatus">
									<input type="text" v-model="ownLocationValue" placeholder="Add location">
									<view class="jobs-tags-item-add-button">
										<button type="default" v-if="ownLocationValue.length>0" @click="addOwnLocation">Confirm</button>
										<button type="default" v-if="ownLocationValue.length==0" @click="addLocationStatus=false">Cancel</button>
									</view>
								</view>
							</view>
						</view>
					</view>
					<!-- job type -->
					<view class="job-type">
						<view class="job-type-t">
							<view class="job-type-title">{{i18n.profilejobtype}}</view>
							<view class="edit-icon" @click="turnIndexList(3)" v-if="canEditJobType===false">
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
							<!-- <view class="jobs-tags-item" v-if="addJobTypeStatus==false" @click="addJobTypeStatus=true">Add+</view> -->
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
					<!-- age to teach -->
					<view class="age-to-teach">
						<view class="age-to-teach-t">
							<view class="age-to-teach-title">{{i18n.profileagetoteach}}</view>
							<view class="edit-icon" @click="turnIndexList(4)" v-if="canEditAgeToTeach===false">
								<image src="../static/esl/edit.png" mode="aspectFill"></image>
							</view>
							<view class="edit-icon" @click="ageToTeachConfirm" v-if="canEditAgeToTeach">
								<image src="../static/esl/confirm-icon.png" mode="aspectFill"></image>
							</view>
						</view>
						<!-- age to teach tags展示 -->
						<view class="age-to-teach-b" v-if="canEditAgeToTeach===false">
							<view class="age-to-teach-item" v-for="(item,i) in ageToTeachList" :key="i">
								{{item.object_en}}
							</view>
						</view>
						<!-- age to teach 编辑 -->
						<view class="jobs-tags-container" v-if="canEditAgeToTeach">
							<view class="jobs-tags">
								<view class="jobs-tags-item" :class=" selectAgeToTeachList.findIndex((element)=>element.id===item.id) == -1 ? '' : 'tags-active' "
								 v-for="(item,index) in editAgeToTeachList" :key="item.id" @click="selectAgeToTeach(item,1)">
									{{item.object_en}}
								</view>
								<view class="jobs-tags-item" :class=" selectAgeToTeachList.findIndex((element)=>element===item) == -1 ? '' : 'tags-active' "
								 v-for="(item,index) in ownAgeToTeachList" :key="index" @click="selectAgeToTeach(item,2)">
									{{item.object_name}}
								</view>
							</view>
							<!-- <view class="jobs-tags-item" v-if="addAgeToTeachStatus==false" @click="addAgeToTeachStatus=true">Add+</view> -->
							<view class="jobs-tags-add">
								<view class="jobs-tags-item-add" v-if="addAgeToTeachStatus">
									<input type="text" v-model="ownAgeToTeachValue" placeholder="Add age to teach">
									<view class="jobs-tags-item-add-button">
										<button type="default" v-if="ownAgeToTeachValue.length>0" @click="addOwnAgeToTeach">Confirm</button>
										<button type="default" v-if="ownAgeToTeachValue.length==0" @click="addAgeToTeachStatus=false">Cancel</button>
									</view>
								</view>
							</view>
						</view>
					</view>
					<!-- region -->
					<!-- <view class="region">
						<view class="region-t">
							<view class="region-title">{{i18n.profileregion}}</view>
							<view class="edit-icon" @click="turnIndexList(5)" v-if="canEditRegion===false">
								<image src="../static/esl/edit.png" mode="aspectFill"></image>
							</view>
							<view class="edit-icon" @click="regionConfirm" v-if="canEditRegion">
								<image src="../static/esl/confirm-icon.png" mode="aspectFill"></image>
							</view>
						</view>
						
						<view class="region-b" v-if="canEditRegion===false">
							<view class="region-item" v-for="(item,i) in  regionList" :key="i">
								{{item.object_en}}
							</view>
						</view>
					
						<view class="jobs-tags-container" v-if="canEditRegion">
							<view class="jobs-tags">
								<view class="jobs-tags-item" :class=" selectRegionList.findIndex((element)=>element.id===item.id) == -1 ? '' : 'tags-active' "
								 v-for="(item,index) in editRegionList" :key="item.id" @click="selectRegion(item,1)">
									{{item.object_en}}
								</view>
								<view class="jobs-tags-item" :class=" selectRegionList.findIndex((element)=>element===item) == -1 ? '' : 'tags-active' "
								 v-for="(item,index) in ownRegionList" :key="index" @click="selectRegion(item,2)">
									{{item.object_name}}
								</view>
							</view>
							<view class="jobs-tags-item" v-if="addRegionStatus==false" @click="addRegionStatus=true">Add+</view>
							<view class="jobs-tags-add">
								<view class="jobs-tags-item-add" v-if="addRegionStatus">
									<input type="text" v-model="ownRegionValue" placeholder="Add region">
									<view class="jobs-tags-item-add-button">
										<button type="default" v-if="ownRegionValue.length>0" @click="addOwnRegion">Confirm</button>
										<button type="default" v-if="ownRegionValue.length==0" @click="addRegionStatus=false">Cancel</button>
									</view>
								</view>
							</view>
						</view>
					</view> -->
					<!-- benefits -->
					<view class="benefits">
						<view class="benefits-t">
							<view class="benefits-title">{{i18n.profilebenefits}}</view>
							<view class="edit-icon" @click="turnIndexList(6)" v-if="canEditBenefits===false">
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
				</view>
			</view>
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
			let correctRate = this.correctRate;
			return {

				scrollTop: 0,
				basicUserInfo: {},
				educatorInfo: {},
				anchorPoint: '', // 锚点
				avatarUrl: "",
				uerInfo: {},
				cWidth3: '', //圆弧进度图
				cHeight3: '', //圆弧进度图
				arcbarWidth: '', //圆弧进度图，进度条宽度,此设置可使各端宽度一致
				pixelRatio: 1,
				correctRate: 0,
				chartData: {},
				percent: '',
				items: ['Details', 'Media', 'Preferences'],
				current: 0,
				backgroundPictureSrc: 'https://i.loli.net/2021/02/01/wOgZUBjeEqmXf1H.png',
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
				teachExpList: [],

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

				educationNum: 0,
				workExpNum: 0,
				showMoreEducationStatus: true,
				showMoreWorkExpStatus: true,

				canEditTeachExp: false,
				editTeachExpList: [],
				addTeachExpStatus: false,
				ownTeachExpValue: '',
				ownTeachExpList: [],
				selectTeachExpList: [],
				selectTeachExpArr: [],

			}
		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		},
		onShow() {
			console.log('show')
			this.identity = uni.getStorageSync('identity');
			this.updateEduProfile();
			this.getBasicInfo()

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
			this.anchorPoint = option.anchor;
		},
		methods: {
			loadedMetaData(e) {
				console.log(e)
				var that = this;
				// #ifdef H5
				this.videoContext = uni.createVideoContext('myVideo')
				setTimeout(function() {
					that.videoContext.play()
				}, 1000)
				setTimeout(function() {
					that.videoContext.pause()
				}, 1500)
				// #endif
			},
			turnHomepage() {
				uni.reLaunch({
					url: '/pages/home/index'
				})
			},
			previewYourImage(image) {
				uni.previewImage({
					urls: [image]
				})
			},
			turnEditProfileBasic() {
				uni.navigateTo({
					url: 'edit/basic'
				})
			},
			turnEditProfileBio() {
				uni.navigateTo({
					url: 'edit/bio'
				})
			},
			turnRateSkillsList(type) {
				uni.navigateTo({
					url: '/pages/me/profile/rateSkillsList?type=' + type
				})
			},
			turnIndexList(type) {
				let data = {
					token: uni.getStorageSync('token'),
					pid: type
				}
				this.selectSubjectList = [];
				this.ownSubjectList = [];
				this.selectLocationList = [];
				this.ownLocationList = [];
				this.selectCertificationsList = [];
				this.ownCertificationsList = [];
				this.selectCountriesTraveledList = [];
				this.ownCountriesTraveledList = [];
				this.selectCountriesLivedList = [];
				this.ownCountriesLivedList = [];
				this.selectTeachExpList = [];
				this.ownTeachExpList = [];

				profile.getUserObjectList(data).then(res => {
					console.log(res)
					if (type == 120) {
						this.editTeachExpList = res.message;
						let len = this.teachExpList.length;
						let teachExpList = this.teachExpList;
						for (var i = 0; i < len; i++) {

							if (teachExpList[i].object_id == 0) {
								let obj = {
									id: teachExpList[i].object_id,
									object_pid: teachExpList[i].object_pid,
									object_name: teachExpList[i].object_en
								}
								this.ownTeachExpList.push(obj);
								this.selectTeachExpList.push(obj)
							} else {
								let obj = {
									id: teachExpList[i].object_id,
									pid: teachExpList[i].object_pid,
									object_en: teachExpList[i].object_en,
									object_cn: teachExpList[i].object_cn
								}
								this.selectTeachExpList.push(obj)
							}
						}

						this.canEditTeachExp = true;
					}
					if (type == 1) {
						this.editSubjectList = res.message;
						let len = this.subjectList.length;
						let subjectList = this.subjectList;
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
					// location
					if (type == 71) {
						this.editLocationList = res.message;
						console.log(this.locationList);
						let len = this.locationList.length;
						let locationList = this.locationList;
						console.log(len);
						for (var i = 0; i < len; i++) {
							console.log(locationList[i].object_id);
							if (locationList[i].object_id == 0) {
								let obj = {
									id: locationList[i].object_id,
									object_pid: locationList[i].object_pid,
									object_name: locationList[i].object_en
								}
								this.ownLocationList.push(obj);
								this.selectLocationList.push(obj)
							} else {
								let obj = {
									id: locationList[i].object_id,
									pid: locationList[i].object_pid,
									object_en: locationList[i].object_en,
									object_cn: locationList[i].object_cn
								}
								this.selectLocationList.push(obj)
							}
						}

						this.canEditLocation = true;
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
					// age to teach
					if (type == 4) {
						this.editAgeToTeachList = res.message;
						console.log(this.ageToTeachList);
						let len = this.ageToTeachList.length;
						let ageToTeachList = this.ageToTeachList;
						console.log(len);
						for (var i = 0; i < len; i++) {
							console.log(ageToTeachList[i].object_id);
							if (ageToTeachList[i].object_id == 0) {
								let obj = {
									id: ageToTeachList[i].object_id,
									object_pid: ageToTeachList[i].object_pid,
									object_name: ageToTeachList[i].object_en
								}
								this.ownAgeToTeachList.push(obj);
								this.selectAgeToTeachList.push(obj)
							} else {
								let obj = {
									id: ageToTeachList[i].object_id,
									pid: ageToTeachList[i].object_pid,
									object_en: ageToTeachList[i].object_en,
									object_cn: ageToTeachList[i].object_cn
								}
								this.selectAgeToTeachList.push(obj)
							}
						}

						this.canEditAgeToTeach = true;
					}
					// region
					if (type == 5) {
						this.editRegionList = res.message;
						console.log(this.regionList);
						let len = this.regionList.length;
						let regionList = this.regionList;
						console.log(len);
						for (var i = 0; i < len; i++) {
							console.log(regionList[i].object_id);
							if (regionList[i].object_id == 0) {
								let obj = {
									id: regionList[i].object_id,
									object_pid: regionList[i].object_pid,
									object_name: regionList[i].object_en
								}
								this.ownRegionList.push(obj);
								this.selectRegionList.push(obj)
							} else {
								let obj = {
									id: regionList[i].object_id,
									pid: regionList[i].object_pid,
									object_en: regionList[i].object_en,
									object_cn: regionList[i].object_cn
								}
								this.selectRegionList.push(obj)
							}
						}

						this.canEditRegion = true;
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

					if (type == 7) {
						this.editCertificationsList = res.message;
						let len = this.certificationsList.length;
						let certificationsList = this.certificationsList;

						for (var i = 0; i < len; i++) {
							console.log(certificationsList[i].object_id);
							if (certificationsList[i].object_id == 0) {
								let obj = {
									id: certificationsList[i].object_id,
									object_pid: certificationsList[i].object_pid,
									object_name: certificationsList[i].object_en
								}
								this.ownCertificationsList.push(obj);
								this.selectCertificationsList.push(obj)
							} else {
								let obj = {
									id: certificationsList[i].object_id,
									pid: certificationsList[i].object_pid,
									object_en: certificationsList[i].object_en,
									object_cn: certificationsList[i].object_cn
								}
								this.selectCertificationsList.push(obj)
							}
						}

						this.canEditCertifications = true;
					}
					if (type == 8) {
						this.editCountriesTraveledList = res.message;
						let len = this.countriesTraveledList.length;
						let countriesTraveledList = this.countriesTraveledList;
						console.log(len);
						for (var i = 0; i < len; i++) {
							console.log(countriesTraveledList[i].object_id);
							if (countriesTraveledList[i].object_id == 0) {
								let obj = {
									id: countriesTraveledList[i].object_id,
									object_pid: countriesTraveledList[i].object_pid,
									object_name: countriesTraveledList[i].object_en
								}
								this.ownCountriesTraveledList.push(obj);
								this.selectCountriesTraveledList.push(obj)
							} else {
								let obj = {
									id: countriesTraveledList[i].object_id,
									pid: countriesTraveledList[i].object_pid,
									object_en: countriesTraveledList[i].object_en,
									object_cn: countriesTraveledList[i].object_cn
								}
								this.selectCountriesTraveledList.push(obj)
							}
						}

						this.canEditCountriesTraveled = true;
					}
					if (type == 9) {
						this.editCountriesLivedList = res.message;
						let len = this.countriesLivedList.length;
						let countriesLivedList = this.countriesLivedList;

						for (var i = 0; i < len; i++) {
							console.log(countriesLivedList[i].object_id);
							if (countriesLivedList[i].object_id == 0) {
								let obj = {
									id: countriesLivedList[i].object_id,
									object_pid: countriesLivedList[i].object_pid,
									object_name: countriesLivedList[i].object_en
								}
								this.ownCountriesLivedList.push(obj);
								this.selectCountriesLivedList.push(obj)
							} else {
								let obj = {
									id: countriesLivedList[i].object_id,
									pid: countriesLivedList[i].object_pid,
									object_en: countriesLivedList[i].object_en,
									object_cn: countriesLivedList[i].object_cn
								}
								this.selectCountriesLivedList.push(obj)
							}
						}

						this.canEditCountriesLived = true;
					}

				}).catch(error => {
					console.log(error)
				})
			},
			turnSearchTags(type) {
				uni.navigateTo({
					url: '/pages/me/profile/searchTags?type=' + type
				})
			},
			turnWorkExperience() {
				uni.navigateTo({
					url: './edit/workExperience?type=1'
				})
			},
			turnEditWorkExperience(work) {
				var that = this;
				uni.navigateTo({
					url: './edit/workExperience?workId=' + work.id + '&type=2'
				})
			},
			turnEducation() {
				uni.navigateTo({
					url: './edit/education?type=1'
				})
			},
			turnEditEducation(education) {
				var that = this;
				uni.navigateTo({
					url: './edit/education?educationId=' + education.id + '&type=2'
				})
			},
			turnEditProfilePhoto(type, source) {
				let a = encodeURI(source);
				uni.navigateTo({
					url: '/pages/me/profile/photo?type=' + type + '&source=' + a
				})
			},
			turnEditProfilePhotoMulti(type, source) {
				// console.log(source);
				uni.navigateTo({
					url: '/pages/me/profile/photo?type=' + type,
					success() {
						uni.setStorageSync('userImageList', JSON.stringify(source));
					}
				})
			},
			turnEditProfileVideo(type, source) {
				uni.navigateTo({
					url: '/pages/me/profile/video?type=' + type + '&source=' + source
				})
			},
			updateEduProfile() {
				let data = {
					token: uni.getStorageSync('token')
				}
				profile.updateEduProfile(data).then(res => {
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
			showArcbar(canvasId, chartData) {

				canvaArcbar1 = new uCharts({
					$this: _self,
					canvasId: canvasId,
					type: 'arcbar',
					fontSize: 11,
					legend: {
						show: true
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
			onClickItem(e) {
				if (this.current !== e.currentIndex) {
					this.current = e.currentIndex;
				}
			},
			videoErrorCallback: function(e) {
				console.log(e)
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
						var img_url = res.message.educator_info.profile_photo;
						if (res.message.educator_info.profile_photo == '') {
							img_url = 'https://i.loli.net/2020/10/29/zgFvraCTjbd7fEs.png';
						}
						var url = window.location.href;
						var origin = window.location.origin;
						let user_id = uni.getStorageSync('uid');
						let turn_url = origin + '/esl_h5/pages/me/educator/share?id=' + user_id;
						// window.location.href = turn_url;
						let share_data = {
							title: res.message.educator_info.first_name + res.message.educator_info.last_name, // 分享标题
							desc: res.message.educator_info.bio, // 分享描述
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
						// that.percent = res.message.is_educator + '%';
						// that.correctRate = res.message.is_educator / 100;
						// let char_data = {
						// 	series: [{
						// 		name: '正确率',
						// 		data: that.correctRate,
						// 		color: '#00b3d2'
						// 	}]
						// }

						// this.showArcbar("canvasArcbar1", char_data);

						that.basicUserInfo = res.message;
						that.educatorInfo = res.message.educator_info;

						if (res.message.educator_info.places_lived != undefined) {
							that.countriesLivedList = res.message.educator_info.places_lived;
						}
						if (res.message.educator_info.places_traveled != undefined) {
							that.countriesTraveledList = res.message.educator_info.places_traveled;
						}
						if (res.message.educator_info.languages != undefined) {
							that.languagesList = res.message.educator_info.languages;
						}

						if (res.message.educator_info.Location != undefined) {
							that.locationList = res.message.educator_info.Location;
						}
						if (res.message.educator_info.job_type != undefined) {
							that.jobTypeList = res.message.educator_info.job_type;
						}
						if (res.message.educator_info.age_to_teach != undefined) {
							that.ageToTeachList = res.message.educator_info.age_to_teach;
						}
						if (res.message.educator_info.region != undefined) {
							that.regionList = res.message.educator_info.region;
						}
						if (res.message.educator_info.benefits != undefined) {
							that.benefitsList = res.message.educator_info.benefits;
						}
						if (res.message.educator_info.subject != undefined) {
							that.subjectList = res.message.educator_info.subject;
						}
						if (res.message.educator_info.Teaching_certificate != undefined) {
							that.certificationsList = res.message.educator_info.Teaching_certificate;
						}
						if (res.message.educator_info.Teaching_experience != undefined) {
							that.teachExpList = res.message.educator_info.Teaching_experience;
						}
						if (res.message.educator_info.education_info != undefined) {
							that.educationInfo = res.message.educator_info.education_info;
						}

						that.userImagesList = res.message.educator_info.user_images;
						if (res.message.educator_info.work_info != undefined) {
							that.workInfo = res.message.educator_info.work_info;
						}

						let hobbies = res.message.educator_info.hobbies;
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
			addOwnTeachExp() {
				this.addTeachExpStatus = false;
				let obj = {
					id: 0,
					object_name: this.ownTeachExpValue,
					object_pid: 120
				}
				let index = this.selectTeachExpList.findIndex((element) => element === obj);
				if (index == -1) {
					this.selectTeachExpList.push(obj);
					this.ownTeachExpList.push(obj);
					this.ownTeachExpValue = '';
				} else {
					this.selectTeachExpList.splice(index, 1);
				}

			},
			selectTeachExp(value, type) {

				if (type == 1) {
					var index = this.selectTeachExpList.findIndex((element) => element.id === value.id);
				}
				if (type == 2) {
					var index = this.selectTeachExpList.findIndex((element) => element === value);
				}

				if (index == -1) {
					this.selectTeachExpList.push(value);

				} else {
					this.selectTeachExpList.splice(index, 1);
				}
				console.log(this.selectTeachExpList)
			},
			teachExpConfirm() {

				let expand = [];
				let objectArr = [];
				this.selectTeachExpList.forEach(item => {
					if (item.id === 0) {
						expand.push(item.object_name);
					} else {
						objectArr.push(item.id);
					}
				})

				let data = {
					token: uni.getStorageSync('token'),
					object_pid: 120,
					object_id: objectArr,
					expand: expand
				}

				profile.addProfile(data).then(res => {
					if (res.code == 200) {
						this.canEditTeachExp = false;
						this.getBasicInfo();
					} else {
						console.log('exp--submit--' + res.msg);
					}

				}).catch(error => {
					console.log(error)
				})


			},
			addOwnCountriesTraveled() {
				this.addCountriesTraveledStatus = false;
				let obj = {
					id: 0,
					object_name: this.ownCountriesTraveledValue,
					object_pid: 8
				}
				let index = this.selectCountriesTraveledList.findIndex((element) => element === obj);
				if (index == -1) {
					// if (this.selectCountriesTraveledList.length > 4) {
					// 	return false;
					// }
					this.selectCountriesTraveledList.push(obj);
					this.ownCountriesTraveledList.push(obj);
					this.ownCountriesTraveledValue = '';
				} else {
					this.selectCountriesTraveledList.splice(index, 1);
				}

			},
			selectCountriesTraveled(value, type) {

				if (type == 1) {
					var index = this.selectCountriesTraveledList.findIndex((element) => element.id === value.id);
				}
				if (type == 2) {
					var index = this.selectCountriesTraveledList.findIndex((element) => element === value);
				}

				if (index == -1) {
					// if (this.selectCountriesTraveledList.length > 4) {
					// 	return false;
					// }
					this.selectCountriesTraveledList.push(value);

				} else {
					this.selectCountriesTraveledList.splice(index, 1);
				}
				console.log(this.selectCountriesTraveledList)
			},
			countriesTraveledConfirm() {

				let expand = [];
				let objectArr = [];
				this.selectCountriesTraveledList.forEach(item => {
					console.log(item);
					if (item.id === 0) {
						expand.push(item.object_name);
					} else {
						objectArr.push(item.id);
					}
				})

				let data = {
					token: uni.getStorageSync('token'),
					object_pid: 8,
					object_id: objectArr,
					expand: expand
				}

				profile.addProfile(data).then(res => {
					if (res.code == 200) {
						console.log('travel--submit--' + res.data);
						this.canEditCountriesTraveled = false;
						this.getBasicInfo();
					} else {
						console.log('travel--submit--' + res.msg);
					}

				}).catch(error => {
					console.log(error)
				})


			},
			addOwnCountriesLived() {
				this.addCountriesLivedStatus = false;
				let obj = {
					id: 0,
					object_name: this.ownCountriesLivedValue,
					object_pid: 9
				}
				let index = this.selectCountriesLivedList.findIndex((element) => element === obj);
				if (index == -1) {
					// if (this.selectCountriesLivedList.length > 4) {
					// 	return false;
					// }
					this.selectCountriesLivedList.push(obj);
					this.ownCountriesLivedList.push(obj);
					this.ownCountriesLivedValue = '';
				} else {
					this.selectCountriesLivedList.splice(index, 1);
				}

			},
			selectCountriesLived(value, type) {

				if (type == 1) {
					var index = this.selectCountriesLivedList.findIndex((element) => element.id === value.id);
				}
				if (type == 2) {
					var index = this.selectCountriesLivedList.findIndex((element) => element === value);
				}

				if (index == -1) {
					// if (this.selectCountriesLivedList.length > 4) {
					// 	return false;
					// }
					this.selectCountriesLivedList.push(value);

				} else {
					this.selectCountriesLivedList.splice(index, 1);
				}
				console.log(this.selectCountriesLivedList)
			},
			countriesLivedConfirm() {

				let expand = [];
				let objectArr = [];
				this.selectCountriesLivedList.forEach(item => {
					console.log(item);
					if (item.id === 0) {
						expand.push(item.object_name);
					} else {
						objectArr.push(item.id);
					}
				})

				let data = {
					token: uni.getStorageSync('token'),
					object_pid: 9,
					object_id: objectArr,
					expand: expand
				}

				profile.addProfile(data).then(res => {
					if (res.code == 200) {
						console.log('lived--submit--' + res.data);
						this.canEditCountriesLived = false;
						this.getBasicInfo();
					} else {
						console.log('lived--submit--' + res.msg);
					}

				}).catch(error => {
					console.log(error)
				})

			},
			addOwnCertifications() {
				this.addCertificationsStatus = false;
				let obj = {
					id: 0,
					object_name: this.ownCertificationsValue,
					object_pid: 7
				}
				// this.ownCertificationsList.push(obj);
				// this.ownCertificationsValue = '';
				let index = this.selectCertificationsList.findIndex((element) => element === obj);
				if (index == -1) {
					// if (this.selectCertificationsList.length > 4) {
					// 	return false;
					// }
					this.ownCertificationsList.push(obj);
					this.selectCertificationsList.push(obj);
					this.ownCertificationsValue = '';
				} else {
					this.selectCertificationsList.splice(index, 1);
				}
				console.log(this.selectCertificationsList);
			},
			selectCertifications(value, type) {

				if (type == 1) {
					var index = this.selectCertificationsList.findIndex((element) => element.id === value.id);
				}
				if (type == 2) {
					var index = this.selectCertificationsList.findIndex((element) => element === value);
				}
				// console.log(index);
				if (index == -1) {
					// if (this.selectCertificationsList.length > 4) {
					// 	return false;
					// }
					this.selectCertificationsList.push(value);

				} else {
					this.selectCertificationsList.splice(index, 1);
				}
				console.log(this.selectCertificationsList)
			},
			certificationsConfirm() {

				let expand = [];
				let objectArr = [];
				this.selectCertificationsList.forEach(item => {
					console.log(item);
					if (item.id === 0) {
						expand.push(item.object_name);
					} else {
						objectArr.push(item.id);
					}
				})

				let data = {
					token: uni.getStorageSync('token'),
					object_pid: 7,
					object_id: objectArr,
					expand: expand
				}

				profile.addProfile(data).then(res => {
					if (res.code == 200) {
						console.log('certifications--submit--' + res.data);
						this.canEditCertifications = false;
						this.getBasicInfo();
					} else {
						console.log('certifications--submit--' + res.msg);
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
			addOwnLocation() {
				this.addLocationStatus = false;
				let obj = {
					id: 0,
					object_name: this.ownLocationValue,
					object_pid: 71
				}
				let index = this.selectLocationList.findIndex((element) => element === obj)
				if (index == -1) {
					// if (this.selectLocationList.length > 4) {
					// 	return false;
					// }
					this.selectLocationList.push(obj);
					this.ownLocationList.push(obj);
					this.ownLocationValue = '';

				} else {
					this.selectLocationList.splice(index, 1);
				}

			},
			selectLocation(value, type) {

				if (type == 1) {
					var index = this.selectLocationList.findIndex((element) => element.id === value.id);
				}
				if (type == 2) {
					var index = this.selectLocationList.findIndex((element) => element === value);
				}

				if (index == -1) {
					// if (this.selectLocationList.length > 4) {
					// 	return false;
					// }
					this.selectLocationList.push(value);

				} else {
					this.selectLocationList.splice(index, 1);
				}
				console.log(this.selectLocationList)
			},
			locationConfirm() {

				let expand = [];
				let objectArr = [];
				this.selectLocationList.forEach(item => {
					console.log(item);
					if (item.id === 0) {
						expand.push(item.object_name);
					} else {
						objectArr.push(item.id);
					}
				})

				let data = {
					token: uni.getStorageSync('token'),
					object_pid: 71,
					object_id: objectArr,
					expand: expand
				}

				profile.addProfile(data).then(res => {
					if (res.code == 200) {
						console.log('location--submit--' + res.data);
						this.canEditLocation = false;
						this.getBasicInfo();
					} else {
						console.log('location--submit--' + res.msg);
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
			addOwnAgeToTeach() {
				this.addAgeToTeachStatus = false;
				let obj = {
					id: 0,
					object_name: this.ownAgeToTeachValue,
					object_pid: 4
				}
				let index = this.selectAgeToTeachList.findIndex((element) => element === obj);
				if (index == -1) {
					// if (this.selectAgeToTeachList.length > 4) {
					// 	return false;
					// }
					this.selectAgeToTeachList.push(obj);
					this.ownAgeToTeachList.push(obj);
					this.ownAgeToTeachValue = '';
				} else {
					this.selectAgeToTeachList.splice(index, 1);
				}

			},
			selectAgeToTeach(value, type) {

				if (type == 1) {
					var index = this.selectAgeToTeachList.findIndex((element) => element.id === value.id);
				}
				if (type == 2) {
					var index = this.selectAgeToTeachList.findIndex((element) => element === value);
				}

				if (index == -1) {
					// if (this.selectAgeToTeachList.length > 4) {
					// 	return false;
					// }
					this.selectAgeToTeachList.push(value);

				} else {
					this.selectAgeToTeachList.splice(index, 1);
				}
				console.log(this.selectAgeToTeachList)
			},
			ageToTeachConfirm() {

				let expand = [];
				let objectArr = [];
				this.selectAgeToTeachList.forEach(item => {
					console.log(item);
					if (item.id === 0) {
						expand.push(item.object_name);
					} else {
						objectArr.push(item.id);
					}
				})

				let data = {
					token: uni.getStorageSync('token'),
					object_pid: 4,
					object_id: objectArr,
					expand: expand
				}

				profile.addProfile(data).then(res => {
					if (res.code == 200) {
						console.log('agetoteach--submit--' + res.data);
						this.canEditAgeToTeach = false;
						this.getBasicInfo();
					} else {
						console.log('agetoteach--submit--' + res.msg);
					}

				}).catch(error => {
					console.log(error)
				})
			},
			addOwnRegion() {
				this.addRegionStatus = false;
				let obj = {
					id: 0,
					object_name: this.ownRegionValue,
					object_pid: 5
				}
				let index = this.selectRegionList.findIndex((element) => element === obj);
				if (index == -1) {
					// if (this.selectRegionList.length > 4) {
					// 	return false;
					// }
					this.selectRegionList.push(obj);
					this.ownRegionList.push(obj);
					this.ownRegionValue = '';
				} else {
					this.selectRegionList.splice(index, 1);
				}

			},
			selectRegion(value, type) {

				if (type == 1) {
					var index = this.selectRegionList.findIndex((element) => element.id === value.id);
				}
				if (type == 2) {
					var index = this.selectRegionList.findIndex((element) => element === value);
				}

				if (index == -1) {
					// if (this.selectRegionList.length > 4) {
					// 	return false;
					// }
					this.selectRegionList.push(value);

				} else {
					this.selectRegionList.splice(index, 1);
				}
				console.log(this.selectRegionList)
			},
			regionConfirm() {

				let expand = [];
				let objectArr = [];
				this.selectRegionList.forEach(item => {
					console.log(item);
					if (item.id === 0) {
						expand.push(item.object_name);
					} else {
						objectArr.push(item.id);
					}
				})

				let data = {
					token: uni.getStorageSync('token'),
					object_pid: 5,
					object_id: objectArr,
					expand: expand
				}

				profile.addProfile(data).then(res => {
					if (res.code == 200) {
						console.log('region--submit--' + res.data);
						this.canEditRegion = false;
						this.getBasicInfo();
					} else {
						console.log('region--submit--' + res.msg);
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
			showMoreEducation() {
				this.educationNum = this.educationInfo.length;
				this.showMoreEducationStatus = false;
			},
			showMoreWorkExp() {
				this.workExpNum = this.workInfo.length;
				this.showMoreWorkExpStatus = false;
			}

		},
		onShareAppMessage:function(){
			
		},
		onShareTimeline:function(){
			
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
</style>
