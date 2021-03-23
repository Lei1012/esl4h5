<template>
	<view class="uni-flex uni-column">
		<view class="flex-item business-info">
			<view class="business-info-title">
				{{i18n.jobsbusinessinfo}}
			</view>
			<view class="job-location">
				<view class="job-location-1"> {{i18n.jobsjoblocation}} <text class="error-star">*</text> </view>
				<view class="job-location-2" v-if="locationStatus" @click="chooseLocation">{{pickerText}}
					<!-- <u-field v-model="jobLocationValue"  required	:placeholder="i18n.jobsjoblocationph" /> -->
					<!-- <input type="text" v-model="jobLocationValue" :placeholder="i18n.jobsjoblocationph" @blur="inputBlur(1,$event)" /> -->
				</view>
				<view class="job-location-3" v-if="locationStatus===false" @click="chooseLocation">
					{{i18n.basicbusinesstwochooselocation}}
				</view>
				<!-- <view class="error-tips" v-if="jobLocationErrorMsg!=''">{{jobLocationErrorMsg}}</view> -->
			</view>

			<view class="number-vacancies">
				<text>{{i18n.jobsnumberofvacancies}}</text>
				<uni-number-box class="number-vacancies-1" :min="1" :max="99999999" @change="vacanciesChange">
				</uni-number-box>
			</view>

			<view class="employment-type">
				<view class="employment-type-1">{{i18n.jobsemploymenttype}} <text class="error-star">*</text> </view>
				<view class="jobs-tags-container">
					<view class="jobs-tags">
						<view class="jobs-tags-item" v-for="(employment,index) in employmentTypeList" :key="index"
							:class=" selectEmploymentTypeList.findIndex((element)=>element===employment) == -1 ? '' : 'tags-active' "
							@click="selectEmploymentType(employment)">
							<!-- {{employment.object_en}} -->
							<text v-if="languageValue=='en-US'">{{employment.object_en}}</text>
							<text v-if="languageValue=='zh-CN'">{{employment.object_cn}}</text>
						</view>
					</view>
				</view>
			</view>

			<view class="online-job">
				{{i18n.jobsonlinejob}}
				<switch :checked="isOnlineJob===1" class="online-job-switch" color="#0AA0A8"
					@change="onlineJobChange" />
			</view>

		</view>

		<view class="flex-item general-position-info">
			<view class="general-position-info-title">
				{{i18n.jobsgeneralpositioninfo}}
			</view>
			<view class="job-title ">
				<view class="job-title-1">{{i18n.jobsjobtitle}} <text class="error-star">*</text></view>
				<view class="jobs-tags-container">
					<view class="jobs-tags">
						<view class="jobs-tags-item"
							:class=" selectJobTitleList.findIndex((element)=>element===item) == -1 ? '' : 'tags-active' "
							v-for="(item,index) in jobTitleList" :key="item.id" @click="selectJobTitle(item)">
							<!-- {{item.object_en}} -->
							<text v-if="languageValue=='en-US'">{{item.object_en}}</text>
							<text v-if="languageValue=='zh-CN'">{{item.object_cn}}</text>
						</view>
						<view class="jobs-tags-item"
							:class=" selectJobTitleList.findIndex((element)=>element===item) == -1 ? '' : 'tags-active' "
							v-for="(item,index) in ownJobTitleList" :key="index" @click="selectJobTitle(item)">
							{{item.object_en}}
						</view>
					</view>
					<view class="jobs-tags-item" v-if="addJobTitleStatus==false" @click="addJobTitleStatus=true">add+
					</view>
					<view class=" jobs-tags-add" v-if="addJobTitleStatus">
						<view class="jobs-tags-item-add">
							<input type="text" v-model="ownJobTitleValue" placeholder="Add job title">
							<view class="jobs-tags-item-add-button">
								<button type="default" v-if="ownJobTitleValue.length>0"
									@click="addOwnJobTitle">Confirm</button>
								<button type="default" v-if="ownJobTitleValue.length==0"
									@click="addJobTitleStatus=false">Cancel</button>
							</view>
						</view>
					</view>
				</view>
			</view>
			<!--  -->
			<view class="application-due-date">
				<view class="application-due-date-1">{{i18n.jobsapplicationduedate}} </view>
				<view class="application-due-date-2" v-if="applicationDueDateStatus==false"
					@click="showApplicationDueDate">
					{{i18n.jobschooseduedate}}
				</view>
				<view class="application-due-date-3" v-if="applicationDueDateStatus" @click="showApplicationDueDate">
					{{applicationDueDateStr}}
				</view>
				<!-- <view v-if="applicationDueDateStr==''" class="error-tips">{{appDueDateErrorMsg}}</view> -->
				<u-calendar max-date="4200-01-01" :safe-area-inset-bottom="true" toolTip="choose due date"
					v-model="applicationDueDateshow" :mode="dueDateMode" @change="applicationDueDateChange">
				</u-calendar>
			</view>

			<view class="start-date ">
				<view class="start-date-1">{{i18n.jobsstartdate}} </view>
				<view class="jobs-tags-container">
					<view class="jobs-tags">
						<view class="jobs-tags-item"
							:class=" selectStartDateList.findIndex((element)=>element===item) == -1 ? '' : 'tags-active' "
							v-for="(item,index) in startDateList" :key="item.id" @click="selectStartDate(item)">
							<!-- {{item.object_en}} -->
							<text v-if="languageValue=='en-US'">{{item.object_en}}</text>
							<text v-if="languageValue=='zh-CN'">{{item.object_cn}}</text>
						</view>
						<view class="jobs-tags-item"
							:class=" selectStartDateList.findIndex((element)=>element===item) == -1 ? '' : 'tags-active' "
							v-for="(item,index) in ownStartDateList" :key="index" @click="selectStartDate(item)">
							{{item.object_en}}
						</view>
					</view>
					<view class="jobs-tags-item" v-if="addStartDateStatus==false" @click="addStartDateStatus=true">add+
					</view>
					<view class=" jobs-tags-add" v-if="addStartDateStatus">
						<view class="jobs-tags-item-add">
							<input type="text" v-model="ownStartDateValue" placeholder="Add start date">
							<view class="jobs-tags-item-add-button">
								<button type="default" v-if="ownStartDateValue.length>0"
									@click="addOwnStartDate">Confirm</button>
								<button type="default" v-if="ownStartDateValue.length==0"
									@click="addStartDateStatus=false">Cancel</button>
							</view>
						</view>
					</view>
				</view>
			</view>

			<view class="age-to-teach">
				<view class="age-to-teach-1">{{i18n.jobsagetoteach}} </view>
				<view class="jobs-tags-container">
					<view class="jobs-tags-container">
						<view class="jobs-tags">
							<view class="jobs-tags-item"
								:class=" selectAgeToTeachList.findIndex((element)=>element===ageToTeach) == -1 ? '' : 'tags-active' "
								v-for="(ageToTeach,index) in ageToTeachList" :key="ageToTeach.id"
								@click="selectAgeToTeach(ageToTeach,1)">
								<!-- {{ageToTeach.object_en}} -->
								<text v-if="languageValue=='en-US'">{{ageToTeach.object_en}}</text>
								<text v-if="languageValue=='zh-CN'">{{ageToTeach.object_cn}}</text>
							</view>
							<view class="jobs-tags-item"
								:class=" selectAgeToTeachList.findIndex((element)=>element===ageToTeach)  == -1 ? '' : 'tags-active' "
								v-for="(ageToTeach,index) in ownAgeToTeachList" :key="index"
								@click="selectAgeToTeach(ageToTeach,2)">
								{{ageToTeach.object_name}}
							</view>
						</view>
						<!-- <view class="jobs-tags-item" v-if="addAgeToTeachStatus==false" @click="addAgeToTeachStatus=true">add+</view> -->
						<view class="jobs-tags-add" v-if="addAgeToTeachStatus">
							<view class="jobs-tags-item-add">
								<input type="text" v-model="ownAgeToTeachValue" placeholder="Add your age to teach">
								<view class="jobs-tags-item-add-button">
									<button type="default" v-if="ownAgeToTeachValue.length>0"
										@click="addOwnAgeToTeach">Confirm</button>
									<button type="default" v-if="ownAgeToTeachValue.length==0"
										@click="addAgeToTeachStatus=false">Cancel</button>
								</view>
							</view>

						</view>
					</view>
				</view>
			</view>

			<view class="subject">
				<view class="subject-1">{{i18n.jobssubject}} </view>
				<view class="jobs-tags-container">
					<view class="jobs-tags">
						<view class="jobs-tags-item"
							:class=" selectSubjectList.findIndex((element)=>element===item) == -1 ? '' : 'tags-active' "
							v-for="(item,index) in subjectList" :key="item.id" @click="selectSubject(item)">
							<!-- {{item.object_en}} -->
							<text v-if="languageValue=='en-US'">{{item.object_en}}</text>
							<text v-if="languageValue=='zh-CN'">{{item.object_cn}}</text>
						</view>
						<view class="jobs-tags-item"
							:class=" selectSubjectList.findIndex((element)=>element===item) == -1 ? '' : 'tags-active' "
							v-for="(item,index) in ownSubjectList" :key="index" @click="selectSubject(item)">
							{{item.object_name}}
						</view>
					</view>
					<view class="jobs-tags-item" v-if="addSubjectStatus==false" @click="addSubjectStatus=true">add+
					</view>
					<view class=" jobs-tags-add" v-if="addSubjectStatus">
						<view class="jobs-tags-item-add">
							<input type="text" v-model="ownSubjectValue" placeholder="Add your subject">
							<view class="jobs-tags-item-add-button">
								<button type="default" v-if="ownSubjectValue.length>0"
									@click="addOwnSubject">Confirm</button>
								<button type="default" v-if="ownSubjectValue.length==0"
									@click="addSubjectStatus=false">Cancel</button>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="position-description">
				<view class="position-description-1">{{i18n.jobspositiondesc}} <text class="error-star">*</text> </view>
				<fuck-textarea class="position-description-2" :maxlength="300" v-model="positionDescriptionValue"
					:placeholder="i18n.jobspositiondescph"></fuck-textarea>
			</view>
			<!-- <view class="subject">
				<view class="subject-1">{{i18n.jobssubject}} <text class="error-star">*</text> </view>
				<view class="jobs-tags-container">
					<view class="jobs-tags">
						<view class="jobs-tags-item tags-active" v-for="(subject,index) in subjectList" :key="index">
							{{subject.object_en}}
						</view>
					</view>
					<view class="jobs-tags-item" @click="addBenefits(1,1)">add+</view>
				</view>
			</view> -->
		</view>

		<view class="compensation">
			<view class="compensation-title">{{i18n.jobsaddcompensation}}</view>
			<view class="salary">
				<view class="salary-1">{{i18n.jobssalary}} <text class="error-star">*</text> </view>
				<view class="salary-content">
					<view class="salary-2">
						<input :class="minSalaryInputError ? 'salary-input-error' : ''" type="number" :maxlength="8"
							v-model="minSalaryValue" @input="minSalaryInput" @blur="minSalaryBlur"
							@confirm="minSalaryConfirm" :placeholder="i18n.jobsminsalaryph" />
					</view>
					<view class="salary-2-3">——</view>
					<view class="salary-3">
						<input type="number" :class="maxSalaryInputError ? 'salary-input-error' : ''" :maxlength="8"
							v-model="maxSalaryValue" @input="maxSalaryInput" @blur="maxSalaryBlur"
							@confirm="maxSalaryConfirm" :placeholder="i18n.jobsmaxsalaryph" />
					</view>
				</view>
			</view>
			<view class="payment-period">
				<view class="payment-period-1">{{i18n.jobspaymentperiod}} <text class="error-star">*</text> </view>
				<view class="payment-period-2" v-if="paymentPeriodStatus==false" @click="showPaymentPeriod">
					{{i18n.jobschoosepaymentperiod}}
				</view>
				<view class="payment-period-3" v-if="paymentPeriodStatus" @click="showPaymentPeriod">
					{{paymentPeriodStr}}
				</view>
			</view>
			<view class="currency">
				<view class="currency-1">{{i18n.jobscurrency}} <text class="error-star">*</text> </view>
				<view class="jobs-tags-container">
					<view class="jobs-tags">
						<view class="jobs-tags-item"
							:class=" selectCurrencyList.findIndex((element)=>element===currency) == -1 ? '' : 'tags-active' "
							v-for="(currency,index) in currencyList" :key="currency.id"
							@click="selectCurrency(currency,1)">
							<!-- {{currency.object_en}} -->
							<text v-if="languageValue=='en-US'">{{currency.object_en}}</text>
							<text v-if="languageValue=='zh-CN'">{{currency.object_cn}}</text>
						</view>
						<view class="jobs-tags-item"
							:class=" selectCurrencyList.findIndex((element)=>element===currency)  == -1 ? '' : 'tags-active' "
							v-for="(currency,index) in ownCurrencyList" :key="index"
							@click="selectCurrency(currency,2)">
							{{currency.object_en}}
						</view>
					</view>
					<view class="jobs-tags-item" v-if="addCurrencyStatus==false" @click="addCurrencyStatus=true">add+
					</view>
					<view class="jobs-tags-add" v-if="addCurrencyStatus">
						<view class="jobs-tags-item-add">
							<input type="text" v-model="ownCurrencyValue" placeholder="Add your currency">
							<view class="jobs-tags-item-add-button">
								<button type="default" v-if="ownCurrencyValue.length>0"
									@click="addOwnCurrency">Confirm</button>
								<button type="default" v-if="ownCurrencyValue.length==0"
									@click="addCurrencyStatus=false">Cancel</button>
							</view>
						</view>
					</view>
				</view>
			</view>

			<view class="benefits ">
				<view class="benefits-1">{{i18n.jobsbenefits}}</view>
				<view class="jobs-tags-container">
					<view class="jobs-tags">
						<view class="jobs-tags-item"
							:class=" selectBenefitsList.findIndex((element)=>element===benefit) == -1 ? '' : 'tags-active' "
							v-for="(benefit,index) in benefitsList" :key="benefit.id"
							@click="selectBenefits(benefit,1)">
							<text v-if="languageValue=='zh-CN'">{{benefit.object_cn}}</text>
							<text v-if="languageValue=='en-US'">{{benefit.object_en}}</text>
						</view>
						<view class="jobs-tags-item"
							:class=" selectBenefitsList.findIndex((element)=>element===benefit) == -1 ? '' : 'tags-active' "
							v-for="(benefit,index) in ownBenefitsList" :key="index" @click="selectBenefits(benefit,2)">
							{{benefit.object_name}}
						</view>
					</view>
					<view class="jobs-tags-item" v-if="addBenefitsStatus==false" @click="addBenefitsStatus=true">add+
					</view>
					<view class=" jobs-tags-add" v-if="addBenefitsStatus">
						<view class="jobs-tags-item-add">
							<input type="text" v-model="ownBenefitsValue" placeholder="Add your benefits">
							<view class="jobs-tags-item-add-button">
								<button type="default" v-if="ownBenefitsValue.length>0"
									@click="addOwnBenefits">Confirm</button>
								<button type="default" v-if="ownBenefitsValue.length==0"
									@click="addBenefitsStatus=false">Cancel</button>
							</view>
						</view>
					</view>
				</view>
			</view>

		</view>

		<view class="flex-item applicant-requirements">
			<view class="applicant-requirements-title">
				{{i18n.jobsapplicantrequirements}}
			</view>
			<view class="teaching-license">
				<text>{{i18n.jobsnativespeaker}}</text>
				<switch :checked="isNativeSpeaker==1" class="teaching-license-1" color="#0AA0A8"
					@change="nativeSpeakerChange" />
			</view>
			<view class="teaching-license">
				<text>{{i18n.jobsteachinglicense}}</text>
				<switch :checked="isTeachingLicense==1" class="teaching-license-1" color="#0AA0A8"
					@change="teachingLicenseChange" />
			</view>
			<view class="gender">
				<view class="gender-1">
					{{i18n.jobsgender}}
				</view>
				<view class="gender-2" v-if="genderStatus==false" @click="genderShow=true">{{i18n.jobschoosegender}}
				</view>
				<view class="gender-3" v-if="genderStatus" @click="genderShow=true">{{genderStr}}</view>
			</view>

			<view class="teaching-certificate">
				<view class="teaching-certificate-1">
					{{i18n.jobsteachingcertificate}}
				</view>
				<view class="jobs-tags-container">
					<view class="jobs-tags">
						<view class="jobs-tags-item"
							:class=" selectTeachingCertificateList.findIndex((element)=>element===teachingCertificate) == -1 ? '' : 'tags-active' "
							v-for="(teachingCertificate,index) in teachingCertificateList" :key="teachingCertificate.id"
							@click="selectTeachingCertificate(teachingCertificate,1)">
							<!-- {{teachingCertificate.object_en}} -->
							<text v-if="languageValue=='en-US'">{{teachingCertificate.object_en}}</text>
							<text v-if="languageValue=='zh-CN'">{{teachingCertificate.object_cn}}</text>
						</view>
						<view class="jobs-tags-item"
							:class=" selectTeachingCertificateList.findIndex((element)=>element===teachingCertificate)  == -1 ? '' : 'tags-active' "
							v-for="(teachingCertificate,index) in ownTeachingCertificateList" :key="index"
							@click="selectTeachingCertificate(teachingCertificate,2)">
							{{teachingCertificate.object_name}}
						</view>
					</view>
					<view class="jobs-tags-item" v-if="addTeachingCertificateStatus==false"
						@click="addTeachingCertificateStatus=true">add+</view>
					<view class="jobs-tags-add">
						<view class="jobs-tags-item-add" v-if="addTeachingCertificateStatus">
							<input type="text" v-model="ownTeachingCertificateValue"
								placeholder="Add your teaching certificate">
							<view class="jobs-tags-item-add-button">
								<button type="default" v-if="ownTeachingCertificateValue.length>0"
									@click="addOwnTeachingCertificate">Confirm</button>
								<button type="default" v-if="ownTeachingCertificateValue.length==0"
									@click="addTeachingCertificateStatus=false">Cancel</button>
							</view>
						</view>
					</view>
				</view>
			</view>

			<view class="cpr-certified">
				<text>{{i18n.jobscprcertified}}</text>
				<switch :checked="isCprCertified==1" class="cpr-certified-1" color="#0AA0A8"
					@change="certifiedChange" />
			</view>

			<view class="first-aside-certified">
				<text>{{i18n.jobsfirstasidecertified}}</text>
				<switch :checked="isFirstAsideCertified==1" class="first-aside-certified-1" color="#0AA0A8"
					@change="firstAsideChange" />
			</view>

			<view class="teaching-experience">
				<text>{{i18n.jobsteachingexperience}} </text>
				<switch :checked="isTeachingExperience==1" class="teaching-experience-1" color="#0AA0A8"
					@change="teachingExperienceChange" />
			</view>

			<view class="teaching-container">
				<view class="teaching-exp" v-if="isTeachingExperience==1">
					<!-- <view class="teaching-exp-1">Teaching Experience</view> -->
					<view class="teaching-exp-2" v-if="teachingExpStatus==false" @click="teachingExpShow=true">
						{{i18n.jobschooseteachingexperience}}
					</view>
					<view class="teaching-exp-3" v-if="teachingExpStatus" @click="teachingExpShow=true">
						{{teachingExpStr}}
					</view>
				</view>

				<view class="education">
					<view class="education-1">{{i18n.jobseducation}} </view>
					<view class="education-2" v-if="educationStatus==false" @click="educationShow=true">
						{{i18n.jobschooseeducation}}
					</view>
					<view class="education-3" v-if="educationStatus" @click="educationShow=true">{{educationStr}}</view>
				</view>

				<view class="languages">
					<view class="languages-1">{{i18n.jobslanguages}}</view>
					<view class="jobs-tags-container">
						<view class="jobs-tags">
							<view class="jobs-tags-item"
								:class=" selectLanguagesList.findIndex((element)=>element===language) == -1 ? '' : 'tags-active' "
								v-for="(language,index) in languagesList" :key="language.id"
								@click="selectLanguages(language,1)">
								<!-- {{language.object_en}} -->
								<text v-if="languageValue=='en-US'">{{language.object_en}}</text>
								<text v-if="languageValue=='zh-CN'">{{language.object_cn}}</text>
							</view>
							<view class="jobs-tags-item"
								:class=" selectLanguagesList.findIndex((element)=>element===language)  == -1 ? '' : 'tags-active' "
								v-for="(language,index) in ownLanguagesList" :key="index"
								@click="selectLanguages(language,2)">
								{{language.object_name}}
							</view>
						</view>
						<view class="jobs-tags-item" v-if="addLanguagesStatus==false" @click="addLanguagesStatus=true">
							add+</view>
						<view class="jobs-tags-add">
							<view class="jobs-tags-item-add" v-if="addLanguagesStatus">
								<input type="text" v-model="ownLanguagesValue" placeholder="Add your language">
								<view class="jobs-tags-item-add-button">
									<button type="default" v-if="ownLanguagesValue.length>0"
										@click="addOwnLanguages">Confirm</button>
									<button type="default" v-if="ownLanguagesValue.length==0"
										@click="addLanguagesStatus=false">Cancel</button>
								</view>
							</view>
						</view>
					</view>
				</view>

				<!-- age -->
				<view class="employment-type">
					<view class="employment-type-1">{{i18n.jobsage}} </view>
					<view class="age-slider">
						<SliderRange :value="ageSlider.rangeValue" :min="ageSlider.min" :max="ageSlider.max"
							:step="ageSlider.step" :bar-height="barHeight" :block-size="blockSize"
							:background-color="backgroundColor" :active-color="ageSlider.activeColor"
							:format="ageSliderformat" :decorationVisible="ageSlider.decorationVisible"
							@change="handleAgeRangeChange"></SliderRange>
					</view>
				</view>

				<view class="equal-opportunity">
					<text>{{i18n.jobsequalopportunity}}</text>
					<switch :checked="isEqualOpportunity===1" class="equal-opportunity-1" color="#0AA0A8"
						@change="equalOpportunityChange" />
				</view>
			</view>
		</view>

		<view class="flex-item contact-person-info">
			<view class="contact-person-info-title">{{i18n.jobscontactpersoninfo}}</view>
			<view class="doing-interview">
				<text>{{i18n.jobswillyouinterview}} </text>
				<switch :checked="isYouTheInterview==1" class="doing-interview-1" color="#0AA0A8"
					@change="doingInterviewChange" />
			</view>
			<!-- 如果是 显示用户信息名片 -->
			<view class="contact" v-if="isYouTheInterview==1">
				<view class="contact-l">
					<view class="upload-icon" v-if="theInterviewPhoto=='' " @click="chooseAvatar">
						+
					</view>
					<view v-if="theInterviewPhoto!=''" @click="chooseAvatar">
						<image :src="theInterviewPhoto" mode="aspectFill"></image>
					</view>
				</view>
				<view class="contact-r">
					<view class="contact-nationality"> <b>{{i18n.jobsposthione}} {{businessUserInfo.first_name}}
							{{businessUserInfo.last_name}}!</b></view>
					<view class="contact-nationality">{{businessUserInfo.nationality}}</view>
					<view class="contact-phone">{{businessUserInfo.contact_phone}}</view>
					<view class="contact-work-email">{{businessUserInfo.work_email}}</view>
				</view>
			</view>
			<view v-if="isYouTheInterview==0">
				<view class="person-name">
					<view class="person-name-1">{{i18n.jobsname}}</view>
					<view class="person-name-2">
						<input type="text" v-model="theInterviewName" :placeholder="i18n.jobsnameph" />
					</view>
				</view>

				<view class="person-nationality">
					<view class="person-nationality-1">{{i18n.jobsnationality}}</view>
					<view class="jobs-tags-container">
						<view class="jobs-tags" v-if="nationalityValueTwo">
							<view class="jobs-tags-item tags-active"> {{nationalityValueTwo.name}}</view>
						</view>
						<view class="jobs-tags-item" @click="turnNationality(2)">add+</view>
					</view>
				</view>
				<view class="person-photo">
					<view class="person-photo-1">{{i18n.jobsphoto}}</view>
					<view class="contact-l">
						<view class="upload-icon" v-if="theInterviewPhoto=='' " @click="chooseAvatar">
							+
						</view>
						<view v-if="theInterviewPhoto!=''" @click="chooseAvatar">
							<image :src="theInterviewPhoto" mode="aspectFill"></image>
						</view>
					</view>
				</view>

			</view>
		</view>

		<view class="flex-item checkout">
			<view class="checkout-t">
				Featured Job Charges
			</view>
			<!-- 3D轮播 -->
			<swiper class="imageContainer"  previous-margin="20px" :style="'height:'+swiperHeight + 'rpx;' "
				next-margin="20px" @change="checkoutChange" circular :autoplay="false">
				<swiper-item class="swiperitem" v-if="businessLevel==1">
					<view class="swiperitem-container" >
						<view class="checkout-title">{{i18n.jobspriceforfreemembers}}</view>
						<view class="checkout-feature">Get featured on: </view>
						<view class="checkout-item" v-for="(item,index) in basicServiceList" :key="index">
							<view class="checkout-item-1">
								<view class="checkout-item-1-1" v-if="languageValue == 'en-US'">{{item.services_en}}
								</view>
								<view class="checkout-item-1-1" v-if="languageValue == 'zh-CN'">{{item.services_cn}}
								</view>
								<view class="checkout-item-1-2">{{item.services_desc}}</view>
							</view>
							<view class="checkout-item-2">
								<view class="checkout-item-2-1">¥ {{ item.money_y }}.00</view>
								<view class="checkout-item-2-2">¥ {{item.sale_money_y}}.00</view>
							</view>
							<view class="checkout-item-3">
								<switch style="transform:scale(0.6)" type="switch" color="#0AA0A8"
									:checked="freeCheckedCheckoutList.indexOf(item.id) != -1 "
									@change="checkoutItemChecked($event,item.id,item.sale_money_y,item.money_y)" />
							</view>
						</view>
						<view class="checkout-item checkout-total">
							<view class="checkout-total-1">
								<image src="./static/total-today.png" mode="aspectFill"></image>
								<view class="checkout-total-1-c">
									<view class="checkout-total-1-1">Total</view>
									<view class="checkout-total-1-2">Including Tax</view>
								</view>
							</view>
							<view class="checkout-total-3">
								<view class="checkout-total-3-1">¥ {{freeCheckoutNowTotalValue}}.00</view>
								<view class="checkout-total-3-2">¥ {{freeCheckoutOldTotalValue}}.00</view>
							</view>
						</view>
						<view class="checkout-btn">
							<button type="default" @click="submitCheckout">Checkout</button>
						</view>
					</view>
				</swiper-item>
				<swiper-item class="swiperitem" v-if="businessLevel <= 2">
					<view class="swiperitem-container">
						<view class="checkout-title">{{i18n.jobspriceforpromembers}}</view>
						<view class="checkout-feature">Get featured on: </view>
						<view class="checkout-item" v-for="(item,index) in proServiceList" :key="index">
							<view class="checkout-item-1">
								<view class="checkout-item-1-1" v-if="languageValue == 'en-US'">{{item.services_en}}
								</view>
								<view class="checkout-item-1-1" v-if="languageValue == 'zh-CN'">{{item.services_cn}}
								</view>
								<view class="checkout-item-1-2">{{item.services_desc}}</view>
							</view>
							<view class="checkout-item-2">
								<view class="checkout-item-2-1">¥ {{ item.money_y }}.00</view>
								<view class="checkout-item-2-2">¥ {{item.sale_money_y}}.00</view>
							</view>
							<view class="checkout-item-3">
								<switch style="transform:scale(0.6)" type="switch" color="#0AA0A8"
									:checked="freeCheckedCheckoutList.indexOf(item.id) != -1 "
									@change="checkoutItemChecked($event,item.id,item.sale_money_y,item.money_y)" />
							</view>
						</view>
						<view class="checkout-item checkout-total">
							<view class="checkout-total-1">
								<image src="./static/total-today.png" mode="aspectFill"></image>
								<view class="checkout-total-1-c">
									<view class="checkout-total-1-1">Total</view>
									<view class="checkout-total-1-2">Including Tax</view>
								</view>
							</view>
							<view class="checkout-total-3">
								<view class="checkout-total-3-1">¥ {{freeCheckoutNowTotalValue}}.00</view>
								<view class="checkout-total-3-2">¥ {{freeCheckoutOldTotalValue}}.00</view>
							</view>
						</view>
						<view class="checkout-btn">
							<button type="default" v-if="businessLevel==2" @click="submitCheckout">Checkout</button>
							<button type="default" v-if="businessLevel==1" @click="submitJob(1)">Save & Upgrade</button>
						</view>
					</view>
				</swiper-item>
				<swiper-item class="swiperitem" v-if="businessLevel <= 3">
					<view class="swiperitem-container">
						<view class="checkout-title">{{i18n.jobspriceforplusmembers}}</view>
						<view class="checkout-feature">Get featured on: </view>
						<view class="checkout-item" v-for="(item,index) in plusServiceList" :key="index">
							<view class="checkout-item-1">
								<view class="checkout-item-1-1" v-if="languageValue == 'en-US'">{{item.services_en}}
								</view>
								<view class="checkout-item-1-1" v-if="languageValue == 'zh-CN'">{{item.services_cn}}
								</view>
								<view class="checkout-item-1-2">{{item.services_desc}}</view>
							</view>
							<view class="checkout-item-2">
								<view class="checkout-item-2-1">¥ {{ item.money_y }}.00</view>
								<view class="checkout-item-2-2">¥ {{item.sale_money_y}}.00</view>
							</view>
							<view class="checkout-item-3">
								<switch style="transform:scale(0.6)" type="switch" color="#0AA0A8"
									:checked="freeCheckedCheckoutList.indexOf(item.id) != -1 "
									@change="checkoutItemChecked($event,item.id,item.sale_money_y,item.money_y)" />
							</view>
						</view>
						<view class="checkout-item checkout-total">
							<view class="checkout-total-1">
								<image src="./static/total-today.png" mode="aspectFill"></image>
								<view class="checkout-total-1-c">
									<view class="checkout-total-1-1">Total</view>
									<view class="checkout-total-1-2">Including Tax</view>
								</view>
							</view>
							<view class="checkout-total-3">
								<view class="checkout-total-3-1">¥ {{freeCheckoutNowTotalValue}}.00</view>
								<view class="checkout-total-3-2">¥ {{freeCheckoutOldTotalValue}}.00</view>
							</view>
						</view>
						<view class="checkout-btn">
							<button type="default" v-if="businessLevel==3" @click="submitCheckout">Checkout</button>
							<button type="default" v-if="businessLevel<3" @click="submitJob(1)">Save & Upgrade</button>
						</view>
					</view>
				</swiper-item>

			</swiper>
		</view>
		<view class="flex-item post-this-job">
			<button type="default" @click="submitJob(0)">{{i18n.jobspostjob}}</button>
		</view>

		<u-select v-model="paymentPeriodShow" mode="single-column" cancelText="cancel" confirmText="confirm"
			:list="paymentPeriodList" @confirm="paymentPeriodConfirm" value-name="id" label-name="object_en"></u-select>

		<u-select v-model="genderShow" mode="single-column" cancelText="cancel" confirmText="confirm" :list="genderList"
			@confirm="genderConfirm"></u-select>

		<u-select v-model="teachingExpShow" mode="single-column" cancelText="cancel" confirmText="confirm"
			:list="teachingExpList" @confirm="teachingExpConfirm" value-name="id" label-name="object_en"></u-select>

		<u-select v-model="educationShow" mode="single-column" cancelText="cancel" confirmText="confirm"
			:list="educationList" @confirm="educationConfirm" value-name="id" label-name="object_en"></u-select>
	</view>
</template>

<script>
	import profile from '@/api/profile.js';
	import jobs from '@/api/jobs.js';
	import axios from 'axios';
	import SliderRange from '@/components/xll-range-slider/index.vue'

	var sourceType = [
		['camera'],
		['album'],
		['camera', 'album']
	]
	let toast = msg => {
		uni.showToast({
			title: msg,
			icon: 'none'
		});
	}
	export default {
		components: {
			SliderRange
		},
		data() {
			var _this = this;
			return {
				languageValue: 'en-US',
				imageList: [], //图片
				uploadFileUrl: _this.$uploadFileUrl,
				VideoOfImagesShow: true,

				hiringCompanyValue: '',
				jobLocationValue: '',
				jobTitleValue: '',
				jobTitleId: 0,
				startDateValue: '',
				startDateId: 0,
				applicationDueDateshow: false,
				dueDateMode: 'date',
				applicationDueDateStr: '',
				applicationDueDateStatus: false,
				paymentPeriodShow: false,
				paymentPeriodStatus: false,
				paymentPeriodValue: '',
				paymentPeriodStr: '',
				paymentPeriodList: [],
				positionDescriptionValue: '',
				genderShow: false,
				genderStatus: false,
				genderValue: '',
				genderStr: '',
				genderList: [{
						value: 1,
						label: 'Male Required'
					},
					{
						value: 2,
						label: 'Female Required'
					},
					{
						value: 3,
						label: 'No Gender Requirements'
					}
				],
				teachingExpShow: false,
				teachingExpStatus: false,
				teachingExpValue: '',
				teachingExpStr: '',
				teachingExpList: [],

				educationShow: false,
				educationStatus: false,
				educationValue: '',
				educationStr: '',
				educationList: [],

				ageValue: '',
				freeCheckedCheckoutList: [],
				freeCheckoutNowTotalValue: 0,
				freeCheckoutOldTotalValue: 0,
				paidCheckedCheckoutList: [],
				paidCheckoutNowTotalValue: 0,
				paidCheckoutOldTotalValue: 0,
				benefitsList: [],
				addBenefitsStatus: false,
				ownBenefitsValue: '',
				ownBenefitsList: [],
				selectBenefitsList: [],
				selectBenefitsArr: [],

				jobTitleList: [],
				addJobTitleStatus: false,
				ownJobTitleValue: '',
				ownJobTitleList: [],
				selectJobTitleList: [],
				selectJobTitleArr: [],

				startDateList: [],
				addStartDateStatus: false,
				ownStartDateValue: '',
				ownStartDateList: [],
				selectStartDateList: [],
				selectStartDateArr: [],

				ageToTeachList: [],
				addAgeToTeachStatus: false,
				ownAgeToTeachValue: '',
				ownAgeToTeachList: [],
				selectAgeToTeachList: [],
				selectAgeToTeachArr: [],

				subjectList: [],
				addSubjectStatus: false,
				ownSubjectValue: '',
				ownSubjectList: [],
				selectSubjectList: [],
				selectSubjectArr: [],

				employmentTypeList: [{
					id: 1,
					object_cn: "全职",
					object_en: "Full-time"
				}, {
					id: 2,
					object_cn: "兼职",
					object_en: "Part-time"
				}, {
					id: 3,
					object_cn: "季节性",
					object_en: "Seasonal"
				}],
				selectEmploymentTypeList: [],

				ageList: [],
				selectAgeList: [],

				currencyList: [],
				addCurrencyStatus: false,
				ownCurrencyValue: '',
				ownCurrencyList: [],
				selectCurrencyList: [],
				selectCurrencyArr: [],

				vacanciesValue: 0,
				isEqualOpportunity: 0,

				teachingCertificateList: [],
				addTeachingCertificateStatus: false,
				ownTeachingCertificateValue: '',
				ownTeachingCertificateList: [],
				selectTeachingCertificateList: [],
				selectTeachingCertificateArr: [],

				isCprCertified: 0,
				isFirstAsideCertified: 0,
				isTeachingExperience: 0,
				isTeachingLicense: 0,
				isNativeSpeaker: 0,
				isOnlineJob: 0,

				nationalityValueOne: '',
				nationalityValueTwo: '',

				languagesList: [],
				addLanguagesStatus: false,
				ownLanguagesValue: '',
				ownLanguagesList: [],
				selectLanguagesList: [],
				selectLanguagesArr: [],

				isYouTheInterview: 1,
				yourname: '',
				photoUrl: '',
				salaryValue: '',
				minSalaryValue: '',
				maxSalaryValue: '',
				businessId: 0,
				businessName: '',

				serviceList: [],
				theInterviewName: '',
				theInterviewNationality: '',
				theInterviewPhoto: '',
				isEdit: false,
				jobId: 0,

				// error message
				jobLocationErrorMsg: '',
				jobTitleErrorMsg: '',
				appDueDateErrorMsg: '',
				startDateErrorMsg: '',
				ageToTeachErrorMsg: '',
				subjectErrorMsg: '',
				employmentTypeErrorMsg: '',
				salaryErrorMsg: '',
				paymentPeriodErrorMsg: '',
				currencyErrorMsg: '',
				positionDescErrorMsg: '',
				teachingExpErrorMsg: '',
				nativeSpeakerErrorMsg: "",
				minSalaryInputError: false,
				maxSalaryInputError: false,

				jobmd5: '',
				businessUserInfo: '',

				barHeight: 3,
				blockSize: 26,
				backgroundColor: '#EEEEF6',
				ageSlider: {
					min: 0,
					max: 100,
					rangeValue: [18, 60],
					step: 1,
					activeColor: '#0aa0a8',
					decorationVisible: true,
				},

				province: '',
				city: '',
				area: '',
				locationStatus: false,
				pickerText: '',

				swiperHeight: 300,
				businessLevel: 1,
				basicServiceList: [],
				proServiceList: [],
				plusServiceList: [],

			}
		},
		computed: {
			i18n() {
				return this.$t('index')
			}
		},
		watch: {},
		onShow() {

		},
		created() {
			var that = this;
			// 监听从裁剪页发布的事件，获得裁剪结果
			uni.$on('uAvatarCropper', path => {
				this.avatar = path;
				// 可以在此上传到服务端
				uni.uploadFile({
					url: this.$uploadFileUrl,
					filePath: path,
					name: 'file[]',
					formData: {
						token: uni.getStorageSync('token')
					},
					complete: (res) => {
						// console.log(res);
						if (res.statusCode == 200) {
							let result = JSON.parse(res.data)
							// console.log(result)
							if (result.code == 200) {
								that.theInterviewPhoto = result.data[0].file_url;
							} else {
								console.log(result.msg)
							}
						}
					}
				});
			})

		},
		onUnload() {
			uni.$off('jobTitleEvent');
			uni.$off('startDateEvent');
			uni.$off('subjectEvent');
			uni.$off('nationalityOne');
			uni.$off('nationalityTwo');
			uni.$off('uAvatarCropper');
		},
		onLoad(option) {
			var that = this;

			this.jobmd5 = option.jobmd5;
			this.getSubCateList();
			// this.getJobServiceList();
			this.getBasicUserInfo();

			if (option.id != '' && option.id != undefined) {
				this.getJobDetail(option.id);
				this.isEdit = true;
				this.jobId = option.id;
			}

			if (uni.getStorageSync('language') != '') {
				this.languageValue = uni.getStorageSync('language')
			}

			uni.$on('jobTitleEvent', function(data) {
				that.jobTitleValue = data.object_en;
				that.jobTitleId = data.id;
			})
			uni.$on('startDateEvent', function(data) {
				that.startDateValue = data.object_en;
				that.startDateId = data.id;
			})
			uni.$on('subjectEvent', function(data) {
				that.subjectList = data;
			})
			uni.$on('nationalityOne', function(data) {
				that.nationalityValueOne = data;
			})
			uni.$on('nationalityTwo', function(data) {
				that.nationalityValueTwo = data;
			})

			uni.$on('locationEvent', function(data) {
				console.log(data)
				that.province = data.province;
				that.city = data.city;
				that.area = data.area;
				that.locationStatus = true;
				that.pickerText = that.area + ', ' + that.city + ', ' + that.province;
			})

		},
		methods: {
			chooseLocation() {
				uni.navigateTo({
					url: '/pages/location/location'
				})
			},
			ageSliderformat(val) {
				return val
				// return `${val}%`
			},
			handleAgeRangeChange(e) {
				this.rangeValue = e
				console.log(this.rangeValue)
			},
			chooseAvatar() {
				// 此为uView的跳转方法，详见"文档-JS"部分，也可以用uni的uni.navigateTo
				this.$u.route({
					// 关于此路径，请见下方"注意事项"
					url: '/uview-ui/components/u-avatar-cropper/u-avatar-cropper',
					// 内部已设置以下默认参数值，可不传这些参数
					params: {
						// 输出图片宽度，高等于宽，单位px
						destWidth: 200,
						destHeight: 200,
						// 裁剪框宽度，高等于宽，单位px
						rectWidth: 200,
						rectHeight: 200,
					}
				})
			},
			minSalaryInput(e) {
				let value = e.detail.value
				if (value != '') {
					this.minSalaryValue = e.detail.value
					if (this.maxSalaryValue != '') {
						if (parseInt(value) >= parseInt(this.maxSalaryValue)) {
							this.minSalaryInputError = true
						} else {
							this.minSalaryInputError = false
						}
					}
				} else {
					this.minSalaryInputError = true;
				}
			},
			minSalaryBlur(e) {
				let value = e.detail.value
				if (value != '') {
					this.minSalaryValue = e.detail.value
					if (this.maxSalaryValue != '') {
						if (parseInt(value) >= parseInt(this.maxSalaryValue)) {
							this.minSalaryInputError = true
						} else {
							this.minSalaryInputError = false
						}
					}
				} else {
					this.minSalaryInputError = true;
				}
			},
			minSalaryConfirm(e) {
				let value = e.detail.value
				if (value != '') {
					this.minSalaryValue = e.detail.value
					if (this.maxSalaryValue != '') {
						if (parseInt(value) >= parseInt(this.maxSalaryValue)) {
							this.minSalaryInputError = true
						} else {
							this.minSalaryInputError = false
						}
					}
				} else {
					this.minSalaryInputError = true;
				}
			},
			maxSalaryInput(e) {
				let value = e.detail.value
				this.maxSalaryValue = e.detail.value
				if (value != '') {
					if (parseInt(value) <= parseInt(this.minSalaryValue)) {
						this.maxSalaryInputError = true
					} else {
						this.maxSalaryInputError = false
					}
				} else {
					this.maxSalaryInputError = true
				}
			},
			maxSalaryBlur(e) {
				let value = e.detail.value
				this.maxSalaryValue = e.detail.value
				if (value != '') {
					if (parseInt(value) <= parseInt(this.minSalaryValue)) {
						this.maxSalaryInputError = true
					} else {
						this.maxSalaryInputError = false
					}
				} else {
					this.maxSalaryInputError = true
				}
			},
			maxSalaryConfirm(e) {
				let value = e.detail.value
				this.maxSalaryValue = e.detail.value
				if (value != '') {
					if (parseInt(value) <= parseInt(this.minSalaryValue)) {
						this.maxSalaryInputError = true
					} else {
						this.maxSalaryInputError = false
					}
				} else {
					this.maxSalaryInputError = true
				}
			},
			getJobServiceList() {
				let token = uni.getStorageSync('token');

				let data = {
					token: token,
					identity: 2,
					page: 1,
					limit: 200
				}

				jobs.serviceList(data).then(res => {
					console.log(res)
					if (res.code == 200) {
						let level = this.businessLevel;
						let result = res.message.data;

						let basicServiceList = result.filter(item => item.level == 1);
						this.basicServiceList = basicServiceList;
						let basicLen = basicServiceList.length;

						let proServiceList = result.filter(item => item.level == 2);
						this.proServiceList = proServiceList;
						let proLen = proServiceList.length;

						let plusServiceList = result.filter(item => item.level == 3);
						this.plusServiceList = plusServiceList;
						let plusLen = plusServiceList.length;
						
						let len = Math.max(basicLen,proLen,plusLen);
						this.swiperHeight = 460 + (len * 140);

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
			getBasicUserInfo() {
				var that = this;
				let uid = uni.getStorageSync('uid');
				let token = uni.getStorageSync('token');

				let data = {
					id: uid,
					token: token
				}

				profile.getBasicInfo(data).then(res => {
					console.log(res)
					if (res.code == 200) {
						let businessInfo = res.message.business_info;

						that.businessUserInfo = businessInfo;
						that.businessId = businessInfo.id;
						that.businessName = businessInfo.business_name;
						if (this.isYouTheInterview == 1) {
							that.theInterviewName = businessInfo.first_name + ' ' + businessInfo.last_name;
							that.theInterviewNationality = businessInfo.nationality;
							that.theInterviewPhoto = businessInfo.profile_photo;
						}
						that.businessLevel = businessInfo.level;
						that.getJobServiceList();
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
			turnNationality(type) {
				uni.navigateTo({
					url: 'base/countriesList?type=' + type
				})
			},
			selectAge(value) {

				let index = this.selectAgeList.findIndex(function(element, index, array) {
					return element === value;
				})

				if (index == -1) {
					let len = this.selectAgeList.length;

					if (len > 0) {
						this.selectAgeList.splice(len - 1, 1);
					}
					this.selectAgeList.push(value);
				} else {
					this.selectAgeList.splice(index, 1);
				}
			},
			selectEmploymentType(value) {

				let index = this.selectEmploymentTypeList.findIndex(function(element, index, array) {
					return element === value;
				})

				if (index == -1) {
					let len = this.selectEmploymentTypeList.length;

					if (len > 0) {
						this.selectEmploymentTypeList.splice(len - 1, 1);
					}
					this.selectEmploymentTypeList.push(value);
				} else {
					this.selectEmploymentTypeList.splice(index, 1);
				}
			},
			getSubCateList(type) {

				let data = {
					token: uni.getStorageSync('token')
				}
				profile.getUserObjectList(data).then(res => {
					// console.log(res);
					if (res.code == 200) {
						this.benefitsList = res.message.filter(item => item.pid === 6); //benefits
						this.ageToTeachList = res.message.filter(item => item.pid === 4); //age to teach
						// this.employmentTypeList = res.message.filter(item => item.pid === 3); //employment type
						this.paymentPeriodList = res.message.filter(item => item.pid === 111); // payment period
						this.currencyList = res.message.filter(item => item.pid === 117); // currency 
						this.teachingCertificateList = res.message.filter(item => item.pid ===
							7); //teaching certificate ...
						this.teachingExpList = res.message.filter(item => item.pid === 120); //teaching exp
						this.educationList = res.message.filter(item => item.pid === 125); // education
						this.languagesList = res.message.filter(item => item.pid === 2); // language ..
						this.jobTitleList = res.message.filter(item => item.pid === 103); //job title
						this.startDateList = res.message.filter(item => item.pid === 108); // start date
						this.subjectList = res.message.filter(item => item.pid === 1); //subject 
						this.ageList = res.message.filter(item => item.pid === 131); //age list
						// console.log('sub category')
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
			addOwnBenefits() {
				this.addBenefitsStatus = false;
				let obj = {
					id: 0,
					object_name: this.ownBenefitsValue,
					object_pid: 6
				}
				this.ownBenefitsList.push(obj);
				this.ownBenefitsValue = '';
				let index = this.selectBenefitsList.findIndex((element) => element === obj);

				if (index == -1) {
					if (this.selectBenefitsList.length >= 5) {
						return uni.showToast({
							title: this.i18n.jobschooseupto5,
							icon: 'none'
						})
					}
					this.selectBenefitsList.push(obj);
				} else {
					this.selectBenefitsList.splice(index, 1);
				}
			},
			selectBenefits(value, type) {
				let index = this.selectBenefitsList.findIndex((element) => element === value);

				if (index == -1) {
					if (this.selectBenefitsList.length >= 5) {
						return uni.showToast({
							title: this.i18n.jobschooseupto5,
							icon: 'none'
						})
					}
					this.selectBenefitsList.push(value);
				} else {
					this.selectBenefitsList.splice(index, 1);
				}
				// console.log(this.selectBenefitsList)
			},
			addOwnJobTitle() {
				this.addJobTitleStatus = false;
				let obj = {
					id: 0,
					object_en: this.ownJobTitleValue,
					object_pid: 6
				}
				this.ownJobTitleList.push(obj);
				this.ownJobTitleValue = '';
				let index = this.selectJobTitleList.findIndex((element) => element === obj);

				if (index == -1) {
					this.selectJobTitleList.splice(index, 1, obj);

				} else {
					this.selectJobTitleList.splice(index, 1);
				}
				// console.log(this.selectJobTitleList)
			},
			selectJobTitle(value) {
				let index = this.selectJobTitleList.findIndex((element) => element === value);

				if (index == -1) {
					this.selectJobTitleList.splice(index, 1, value);
				} else {
					this.selectJobTitleList.splice(index, 1);
				}
				// console.log(this.selectJobTitleList)
			},
			addOwnStartDate() {
				this.addStartDateStatus = false;
				let obj = {
					id: 0,
					object_en: this.ownStartDateValue,
					object_pid: 6
				}
				this.ownStartDateList.push(obj);
				this.ownStartDateValue = '';
				let index = this.selectStartDateList.findIndex((element) => element === obj);

				if (index == -1) {
					this.selectStartDateList.splice(index, 1, obj);

				} else {
					this.selectStartDateList.splice(index, 1);
				}
				// console.log(this.selectStartDateList)
			},
			selectStartDate(value) {
				let index = this.selectStartDateList.findIndex((element) => element === value);

				if (index == -1) {
					this.selectStartDateList.splice(index, 1, value);
				} else {
					this.selectStartDateList.splice(index, 1);
				}
				// console.log(this.selectStartDateList)
			},
			addOwnAgeToTeach() {
				this.addAgeToTeachStatus = false;
				let obj = {
					id: 0,
					object_name: this.ownAgeToTeachValue,
					object_pid: 4
				}
				this.ownAgeToTeachList.push(obj);
				this.ownAgeToTeachValue = '';
				let index = this.selectAgeToTeachList.findIndex((element) => element === obj);
				if (index == -1) {
					if (this.selectAgeToTeachList.length > 3) {
						return uni.showToast({
							title: this.i18n.jobschooseupto4,
							icon: 'none'
						})
					}
					this.selectAgeToTeachList.push(obj);
				} else {
					this.selectAgeToTeachList.splice(index, 1);
				}
			},
			selectAgeToTeach(value, type) {
				let index = this.selectAgeToTeachList.findIndex((element) => element === value);
				if (index == -1) {
					if (this.selectAgeToTeachList.length > 3) {
						return uni.showToast({
							title: this.i18n.jobschooseupto4,
							icon: 'none'
						})
					}
					this.selectAgeToTeachList.push(value);
				} else {
					this.selectAgeToTeachList.splice(index, 1);
				}
			},
			addOwnSubject() {
				this.addSubjectStatus = false;
				let obj = {
					id: 0,
					object_name: this.ownSubjectValue,
					object_pid: 6
				}
				this.ownSubjectList.push(obj);
				this.ownSubjectValue = '';
				let index = this.selectSubjectList.findIndex((element) => element === obj);

				if (index == -1) {
					if (this.selectSubjectList.length > 4) {
						return uni.showToast({
							title: this.i18n.jobschooseupto5,
							icon: 'none'
						})
					}
					this.selectSubjectList.push(obj);
				} else {
					this.selectSubjectList.splice(index, 1);
				}
			},
			selectSubject(value, type) {
				let index = this.selectSubjectList.findIndex((element) => element === value);

				if (index == -1) {
					if (this.selectSubjectList.length > 4) {
						return uni.showToast({
							title: this.i18n.jobschooseupto5,
							icon: 'none'
						})
					}
					this.selectSubjectList.push(value);
				} else {
					this.selectSubjectList.splice(index, 1);
				}
				// console.log(this.selectSubjectList)
			},
			addOwnCurrency() {
				this.addCurrencyStatus = false;
				let obj = {
					id: 0,
					object_en: this.ownCurrencyValue,
					object_pid: 117,
				}
				this.ownCurrencyList.push(obj);
				this.ownCurrencyValue = '';
				let index = this.selectCurrencyList.findIndex((element) => element === obj);
				if (index == -1) {
					this.selectCurrencyList.splice(index, 1, obj)
				} else {
					this.selectCurrencyList.splice(index, 1);
				}
			},
			selectCurrency(value, type) {
				let index = this.selectCurrencyList.findIndex((element) => element === value);
				if (index == -1) {
					this.selectCurrencyList.splice(index, 1, value)
				} else {
					this.selectCurrencyList.splice(index, 1);
				}
				// console.log(this.selectCurrencyList);
			},
			addOwnTeachingCertificate() {
				this.addTeachingCertificateStatus = false;
				let obj = {
					id: 0,
					object_name: this.ownTeachingCertificateValue,
					object_pid: 7,

				}
				this.ownTeachingCertificateList.push(obj);
				this.ownTeachingCertificateValue = '';
				let index = this.selectTeachingCertificateList.findIndex((element) => element === obj);
				if (index == -1) {
					if (this.selectTeachingCertificateList.length > 3) {
						return uni.showToast({
							title: this.i18n.jobschooseupto4,
							icon: 'none'
						})
					}
					this.selectTeachingCertificateList.push(obj);
				} else {
					this.selectTeachingCertificateList.splice(index, 1);
				}
			},
			selectTeachingCertificate(value, type) {
				let index = this.selectTeachingCertificateList.findIndex((element) => element === value);
				if (index == -1) {
					if (this.selectTeachingCertificateList.length > 3) {
						return uni.showToast({
							title: this.i18n.jobschooseupto4,
							icon: 'none'
						})
					}
					this.selectTeachingCertificateList.push(value);
				} else {
					this.selectTeachingCertificateList.splice(index, 1);
				}
			},
			addOwnLanguages() {
				this.addLanguagesStatus = false;
				let obj = {
					id: 0,
					object_name: this.ownLanguagesValue,
					object_pid: 2
				}
				this.ownLanguagesList.push(obj);
				this.ownLanguagesValue = '';
				let index = this.selectLanguagesList.findIndex((element) => element === obj);
				if (index == -1) {
					if (this.selectLanguagesList.length > 3) {
						return uni.showToast({
							title: this.i18n.jobschooseupto4,
							icon: 'none'
						})
					}
					this.selectLanguagesList.push(obj);

				} else {
					this.selectLanguagesList.splice(index, 1);
				}
			},
			selectLanguages(value, type) {
				let index = this.selectLanguagesList.findIndex((element) => element === value);
				if (index == -1) {
					if (this.selectLanguagesList.length > 3) {
						return uni.showToast({
							title: this.i18n.jobschooseupto4,
							icon: 'none'
						})
					}
					this.selectLanguagesList.push(value);

				} else {
					this.selectLanguagesList.splice(index, 1);
				}
			},
			myBusinessJobChange(e) {
				console.log(e)
			},
			onlineJobChange(e) {
				// console.log(e)
				if (e.detail.value) {
					this.isOnlineJob = 1;
				} else {
					this.isOnlineJob = 0;
				}
			},
			certifiedChange(e) {
				// console.log(e);
				if (e.detail.value) {
					this.isCprCertified = 1;
				} else {
					this.isCprCertified = 0;
				}
			},
			firstAsideChange(e) {
				// console.log(e);
				if (e.detail.value) {
					this.isFirstAsideCertified = 1;
				} else {
					this.isFirstAsideCertified = 0;
				}
			},
			teachingExperienceChange(e) {
				// console.log(e);
				if (e.detail.value) {
					this.isTeachingExperience = 1;
				} else {
					this.isTeachingExperience = 0;
				}
			},
			teachingLicenseChange(e) {
				// console.log(e)
				if (e.detail.value) {
					this.isTeachingLicense = 1;
				} else {
					this.isTeachingLicense = 0;
				}
			},
			nativeSpeakerChange(e) {
				if (e.detail.value) {
					this.isNativeSpeaker = 1;
				} else {
					this.isNativeSpeaker = 0;
				}
			},
			doingInterviewChange(e) {
				// console.log(e);
				if (e.detail.value) {
					this.isYouTheInterview = 1;
					this.theInterviewName = this.businessUserInfo.first_name + ' ' + this.businessUserInfo.last_name;
					this.nationalityValueTwo = {
						name: this.businessUserInfo.nationality
					}
					this.theInterviewPhoto = this.businessUserInfo.profile_photo

				} else {
					this.isYouTheInterview = 0;
					this.theInterviewName = '';
					this.nationalityValueTwo = '';
					this.theInterviewPhoto = ''

				}
			},
			saveTemplateChange(e) {
				console.log(e);
			},
			addBenefits(type, is_multi) {
				uni.navigateTo({
					url: 'base/searchTags?type=' + type + '&is_multi=' + is_multi
				})
			},
			applicationDueDateChange(e) {
				// console.log(e)
				this.applicationDueDateStr = e.result;
				this.applicationDueDateStatus = true;

			},
			showApplicationDueDate() {
				this.applicationDueDateshow = true;

			},
			showPaymentPeriod() {
				this.paymentPeriodShow = true;
			},
			paymentPeriodConfirm(e) {
				// console.log(e)
				var that = this;
				this.paymentPeriodStatus = true;
				e.forEach(item => {
					that.paymentPeriodValue = item.value;
					that.paymentPeriodStr = item.label;
				})
			},
			vacanciesChange(e) {
				// console.log(e)
				this.vacanciesValue = e;

			},
			equalOpportunityChange(e) {
				// console.log(e)
				if (e.detail.value) {
					this.isEqualOpportunity = 1;
				} else {
					this.isEqualOpportunity = 0;
				}
			},
			genderConfirm(e) {
				var that = this;
				this.genderStatus = true;
				e.forEach(item => {
					that.genderValue = item.value;
					that.genderStr = item.label;
				})

			},
			teachingExpConfirm(e) {
				var that = this;
				this.teachingExpStatus = true;
				e.forEach(item => {
					that.teachingExpValue = item.value;
					that.teachingExpStr = item.label;
				})
			},
			educationConfirm(e) {
				var that = this;
				this.educationStatus = true;
				e.forEach(item => {
					that.educationValue = item.value;
					that.educationStr = item.label;
				})
			},
			ageEnd(e) {
				console.log(e)
			},
			checkoutChange(e) {
				console.log(e)
				this.freeCheckedCheckoutList = [];
				this.freeCheckoutNowTotalValue = 0;
				this.freeCheckoutOldTotalValue = 0;
			},
			checkoutItemChecked(e, index, oldValue, nowValue) {
				let freeCheckedCheckoutList = this.freeCheckedCheckoutList;
				if (freeCheckedCheckoutList.indexOf(index) == -1) {
					this.freeCheckedCheckoutList.push(index);
					this.freeCheckoutNowTotalValue = this.freeCheckoutNowTotalValue + nowValue;
					this.freeCheckoutOldTotalValue = this.freeCheckoutOldTotalValue + oldValue;
				} else {
					this.freeCheckedCheckoutList.splice(this.freeCheckedCheckoutList.indexOf(index), 1);
					this.freeCheckoutNowTotalValue = this.freeCheckoutNowTotalValue - nowValue;
					this.freeCheckoutOldTotalValue = this.freeCheckoutOldTotalValue - oldValue;
				}

			},
			checkedCheckoutItem(index, oldValue, nowValue) {
				let freeCheckedCheckoutList = this.freeCheckedCheckoutList;
				if (freeCheckedCheckoutList.indexOf(index) == -1) {
					this.freeCheckedCheckoutList.push(index);
					this.freeCheckoutNowTotalValue = this.freeCheckoutNowTotalValue + nowValue;
					this.freeCheckoutOldTotalValue = this.freeCheckoutOldTotalValue + oldValue;
				} else {
					this.freeCheckedCheckoutList.splice(this.freeCheckedCheckoutList.indexOf(index), 1);
					this.freeCheckoutNowTotalValue = this.freeCheckoutNowTotalValue - nowValue;
					this.freeCheckoutOldTotalValue = this.freeCheckoutOldTotalValue - oldValue;
				}
				// console.log(this.freeCheckedCheckoutList)
			},
			checkedPaidCheckoutItem(index, oldValue, nowValue) {
				let paidCheckedCheckoutList = this.paidCheckedCheckoutList;
				if (paidCheckedCheckoutList.indexOf(index) == -1) {
					this.paidCheckedCheckoutList.push(index);
					this.paidCheckoutNowTotalValue = this.paidCheckoutNowTotalValue + nowValue;
					this.paidCheckoutOldTotalValue = this.paidCheckoutOldTotalValue + oldValue;
				} else {
					this.paidCheckedCheckoutList.splice(this.paidCheckedCheckoutList.indexOf(index), 1);
					this.paidCheckoutNowTotalValue = this.paidCheckoutNowTotalValue - nowValue;
					this.paidCheckoutOldTotalValue = this.paidCheckoutOldTotalValue - oldValue;
				}
				// console.log(this.paidCheckedCheckoutList)
			},
			getJobDetail(id) {
				var that = this;
				let data = {
					job_id: id,
					token: uni.getStorageSync('token')
				}
				jobs.detail(data).then(res => {
					console.log(res);
					if (res.code == 200) {

						let subcate_data = {
							token: uni.getStorageSync('token')
						}
						profile.getUserObjectList(subcate_data).then(subcateRes => {
							// console.log(subcateRes);
							if (subcateRes.code == 200) {
								this.benefitsList = subcateRes.message.filter(item => item.pid ===
									6); //benefits
								this.ageToTeachList = subcateRes.message.filter(item => item.pid ===
									4); //age to teach
								// this.employmentTypeList = subcateRes.message.filter(item => item.pid === 3); //employment type
								this.paymentPeriodList = subcateRes.message.filter(item => item.pid ===
									111); // payment period
								this.currencyList = subcateRes.message.filter(item => item.pid ===
									117); // currency 
								this.teachingCertificateList = subcateRes.message.filter(item => item
									.pid === 7); //teaching certificate ...
								this.teachingExpList = subcateRes.message.filter(item => item.pid ===
									120); //teaching exp
								this.educationList = subcateRes.message.filter(item => item.pid ===
									125); // education
								this.languagesList = subcateRes.message.filter(item => item.pid ===
									2); // language ..
								this.jobTitleList = subcateRes.message.filter(item => item.pid ===
									103); //job title
								this.startDateList = subcateRes.message.filter(item => item.pid ===
									108); // start date
								this.subjectList = subcateRes.message.filter(item => item.pid ===
									1); //subject 
								this.ageList = subcateRes.message.filter(item => item.pid ===
									131); //age list

								// job title
								if (res.message.job_title != '') {
									let arr = this.jobTitleList.filter(item => item.object_en == res
										.message.job_title);
									let arrcn = this.jobTitleList.filter(item => item.object_cn == res
										.message.job_title);
									if (arr.length > 0 || arrcn.length > 0) {
										this.selectJobTitleList = arr;
									} else {
										let obj = {
											id: 0,
											object_en: res.message.job_title,
											object_pid: 6
										};
										this.ownJobTitleList.push(obj);
										this.selectJobTitleList.push(obj);
									}
								}


								// start date
								if (res.message.entry_date) {
									let arr = this.startDateList.filter(item => item.object_en == res
										.message.entry_date);
									let arrcn = this.startDateList.filter(item => item.object_cn == res
										.message.entry_date);
									if (arr.length > 0 || arrcn.length > 0) {
										this.selectStartDateList = arr;
									} else {
										let obj = {
											id: 0,
											object_en: res.message.entry_date,
											object_pid: 108
										};
										this.ownStartDateList.push(obj);
										this.selectStartDateList.push(obj);
									}
								}
								// currency
								if (res.message.currency) {
									let arr = this.currencyList.filter(item => item.object_en == res
										.message.currency);
									let arrcn = this.currencyList.filter(item => item.object_cn == res
										.message.currency);
									// console.log(arr)
									if (arr.length > 0 || arrcn.length > 0) {
										this.selectCurrencyList = arr;
									} else {
										let obj = {
											id: 0,
											object_en: res.message.currency,
											object_pid: 117
										};
										this.ownCurrencyList.push(obj);
										this.selectCurrencyList.push(obj);
									}

								}

								if (res.message.benefits) {
									let c = [];
									let a = res.message.benefits;
									a.forEach(benefit => {
										if (benefit.object_id !== 0) {
											let b = this.benefitsList.filter(item => item.id ===
												benefit.object_id)
											c.push(b[0])
										} else {
											let obj = {
												id: 0,
												object_name: benefit.object_en,
												object_pid: benefit.object_pid
											}
											this.ownBenefitsList.push(obj);
											c.push(obj);
										}

									})

									this.selectBenefitsList = c;
								}
								if (res.message.age_to_teach) {
									let c = [];
									let a = res.message.age_to_teach;
									console.log(a)
									a.forEach(ageToTeach => {
										if (ageToTeach.object_id !== 0) {
											console.log(that.ageToTeachList)
											let b = that.ageToTeachList.filter(item => item.id ===
												ageToTeach.object_id)
											console.log(b)
											c.push(b[0])
										} else {
											let obj = {
												id: 0,
												object_name: ageToTeach.object_en,
												object_pid: ageToTeach.object_pid
											}
											that.ownAgeToTeachList.push(obj);
											c.push(obj);
										}

									})
									that.selectAgeToTeachList = c;
									console.log(that.selectAgeToTeachList)
								}
								if (res.message.subject) {
									let c = [];
									let a = res.message.subject;
									a.forEach(subject => {
										if (subject.object_id !== 0) {
											let b = this.subjectList.filter(item => item.id ===
												subject.object_id)
											c.push(b[0])
										} else {
											let obj = {
												id: 0,
												object_name: subject.object_en,
												object_pid: subject.object_pid
											}
											this.ownSubjectList.push(obj);
											c.push(obj);
										}

									})
									this.selectSubjectList = c;

								}
								if (res.message.Teaching_certificate) {
									let c = [];
									let a = res.message.Teaching_certificate;
									a.forEach(teachCer => {
										if (teachCer.object_id !== 0) {
											let b = this.teachingCertificateList.filter(item =>
												item.id === teachCer.object_id)
											c.push(b[0])
										} else {
											let obj = {
												id: 0,
												object_name: teachCer.object_en,
												object_pid: teachCer.object_pid
											}
											this.ownTeachingCertificateList.push(obj);
											c.push(obj);
										}

									})
									this.selectTeachingCertificateList = c;
								}
								if (res.message.languages) {
									let c = [];
									let a = res.message.languages;
									a.forEach(language => {
										if (language.object_id !== 0) {
											let b = this.languagesList.filter(item => item.id ===
												language.object_id)
											c.push(b[0])
										} else {
											let obj = {
												id: 0,
												object_name: language.object_en,
												object_pid: language.object_pid
											}
											this.ownLanguagesList.push(obj);
											c.push(obj);
										}

									})
									this.selectLanguagesList = c;
								}

								if (res.message.employment_type != '') {
									this.selectEmploymentTypeList = this.employmentTypeList.filter(item =>
										item.id == res.message.employment_type)
								}

								if (res.message.age != '') {
									let b = this.ageList.filter(item => this.$u.trim(item.object_en) == res
										.message.age);
									this.selectAgeList = b;
								}


							} else {
								uni.showToast({
									title: res.msg,
									icon: 'none'
								})
							}
						}).catch(error => {
							console.log(error);
						})


						// this.jobLocationValue = res.message.job_location;
						this.pickerText = res.message.job_location;
						if (this.pickerText != '') {
							this.locationStatus = true;
						}

						if (res.message.apply_due_date != '' && res.message.apply_due_date != '0000-00-00') {
							this.applicationDueDateStatus = true;
							this.applicationDueDateStr = res.message.apply_due_date;
						}

						this.isOnlineJob = res.message.is_online;
						this.minSalaryValue = res.message.salary_min;
						this.maxSalaryValue = res.message.salary_max;

						if (res.message.payment_period != '') {
							this.paymentPeriodValue = res.message.payment_period;
							this.paymentPeriodStr = res.message.payment_period_en;
							this.paymentPeriodStatus = true;
						}
						let ageMin = res.message.age_min
						let ageMax = res.message.age_max
						this.ageSlider.rangeValue = [ageMin, ageMax]

						this.positionDescriptionValue = res.message.desc;
						this.vacanciesValue = res.message.numbers;
						this.isEqualOpportunity = res.message.is_equal;
						this.isCprCertified = res.message.is_cpr;
						this.isFirstAsideCertified = res.message.is_first_aide;
						this.isTeachingExperience = res.message.is_teaching_exp;
						this.isYouTheInterview = res.message.is_interview;
						this.yourname = res.message.interview_name;

						if (res.message.nationality != '') {
							this.nationalityValueOne = {
								name: res.message.nationality
							};
						}
						if (res.message.interview_nationlity != '') {
							this.nationalityValueTwo = {
								name: res.message.interview_nationlity
							};
						}

						this.photoUrl = res.message.interview_imgurl;
						this.startDateValue = res.message.entry_date;
						this.businessId = res.message.business_id;
						this.businessName = res.message.business_name;
						this.isTeachingLicense = res.message.is_teaching_license;

						if (res.message.sex != '') {
							this.genderValue = res.message.sex
							this.genderStatus = true;
							if (res.message.sex == 1) {
								this.genderStr = 'Male'
							}
							if (res.message.sex == 2) {
								this.genderStr = 'Female'
							}
							if (res.message.sex == 3) {
								this.genderStr = 'Both'
							}
						}

						if (res.message.teaching_times != 0) {
							this.teachingExpStatus = true;
							this.teachingExpValue = res.message.teaching_times;
							this.teachingExpStr = res.message.teaching_times_en;
						}

						if (res.message.education != '') {
							this.educationValue = res.message.education;
							this.educationStatus = true;
							this.educationStr = res.message.education_en;
						}


						if (res.message.interview_imgurl !== '') {
							this.VideoOfImagesShow = false;
							this.imageList.push({
								path: res.message.interview_imgurl
							});
							this.photoUrl = res.message.interview_imgurl;
						}

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
			submitCheckout(){
				var currency;
				var currencyValue;
				var that = this;
				
				// if (this.jobLocationValue == '') {
				// 	return uni.showToast({
				// 		title: this.i18n.jobLocationErrorMsg,
				// 		icon: "none"
				// 	})
				// }
				if (this.pickerText == '') {
					return uni.showToast({
						title: this.i18n.jobLocationErrorMsg,
						icon: "none"
					})
				}
				if (this.selectEmploymentTypeList.length <= 0) {
					return uni.showToast({
						title: this.i18n.employmentTypeErrorMsg,
						icon: "none"
					})
				}
				
				if (this.selectJobTitleList.length <= 0) {
					return uni.showToast({
						title: this.i18n.jobTitleErrorMsg,
						icon: "none"
					})
				}
				
				if (this.positionDescriptionValue == '') {
					return uni.showToast({
						title: this.i18n.positionDescErrorMsg,
						icon: "none"
					})
				}
				
				if (this.minSalaryValue == '') {
					return uni.showToast({
						title: this.i18n.jobsminsalaryph,
						icon: "none"
					})
				}
				if (this.maxSalaryValue == '') {
					return uni.showToast({
						title: this.i18n.jobsmaxsalaryph,
						icon: "none"
					})
				}
				
				if (parseInt(this.maxSalaryValue) <= parseInt(this.minSalaryValue)) {
					return uni.showToast({
						title: this.i18n.jobsmaxsalaryph,
						icon: "none"
					})
				}
				
				if (this.paymentPeriodValue == '') {
					return uni.showToast({
						title: this.i18n.paymentPeriodErrorMsg,
						icon: "none"
					})
				}
				
				if (this.selectCurrencyList.length <= 0) {
					return uni.showToast({
						title: this.i18n.currencyErrorMsg,
						icon: "none"
					})
				}
				
				if (this.selectCurrencyList.length > 0) {
					currency = this.selectCurrencyList;
					currencyValue = currency[0].object_en;
				} else {
					currencyValue = '';
				}
				if (this.selectJobTitleList.length > 0) {
					let a = this.selectJobTitleList;
					this.jobTitleValue = a[0].object_en;
				}
				
				if (this.selectStartDateList.length > 0) {
					let a = this.selectStartDateList;
					this.startDateValue = a[0].object_en;
				}
				if (this.selectAgeList.length > 0) {
					this.ageValue = this.selectAgeList[0].object_en;
				}
				
				if (this.isYouTheInterview == 1) {
					this.theInterviewName = this.businessUserInfo.first_name + ' ' + this.businessUserInfo.last_name;
					this.nationalityValueTwo = {
						name: this.businessUserInfo.nationality
					}
					this.theInterviewPhoto = this.businessUserInfo.profile_photo
				}
				
				if (that.isEdit) {
					var data = {
						job_id: this.jobId,
						token: uni.getStorageSync('token'),
						job_title: this.jobTitleValue,
						job_location: this.pickerText,
						apply_due_date: this.applicationDueDateStr,
						is_online: this.isOnlineJob,
				
						salary_min: parseInt(this.minSalaryValue),
						salary_max: parseInt(this.maxSalaryValue),
						payment_period: this.paymentPeriodValue,
						desc: this.positionDescriptionValue,
						numbers: parseInt(this.vacanciesValue),
						is_equal: this.isEqualOpportunity,
						sex: parseInt(this.genderValue),
						is_cpr: this.isCprCertified,
						is_first_aside: this.isFirstAsideCertified,
						is_teaching_exp: this.isTeachingExperience,
						teaching_times: this.teachingExpValue,
						is_teaching_license: this.isTeachingLicense,
						education: this.educationValue,
						nationality: this.nationalityValueOne.name,
						age: this.ageValue,
						age_min: this.rangeValue[0],
						age_max: this.rangeValue[1],
						is_interview: this.isYouTheInterview,
						interview_name: this.theInterviewName,
						interview_nationlity: this.nationalityValueTwo.name,
						interview_imgurl: this.theInterviewPhoto,
						entry_date: this.startDateValue,
						business_id: this.businessId,
						business_name: this.businessName,
						currency: currencyValue,
						is_mom_language: this.isNativeSpeaker,
						employment_type: this.selectEmploymentTypeList[0].id,
						version_time: this.jobmd5
					}
				} else {
					var data = {
						token: uni.getStorageSync('token'),
						job_title: this.jobTitleValue,
						job_location: this.pickerText,
						apply_due_date: this.applicationDueDateStr,
						is_online: this.isOnlineJob,
						salary_min: parseInt(this.minSalaryValue),
						salary_max: parseInt(this.maxSalaryValue),
						payment_period: this.paymentPeriodValue,
						desc: this.positionDescriptionValue,
						numbers: parseInt(this.vacanciesValue),
						is_equal: this.isEqualOpportunity,
						sex: parseInt(this.genderValue),
						is_cpr: this.isCprCertified,
						is_first_aside: this.isFirstAsideCertified,
						is_teaching_exp: this.isTeachingExperience,
						teaching_times: this.teachingExpValue,
						is_teaching_license: this.isTeachingLicense,
						education: this.educationValue,
						nationality: this.nationalityValueOne.name,
						age: this.ageValue,
						age_min: this.rangeValue[0],
						age_max: this.rangeValue[1],
						is_interview: this.isYouTheInterview,
						interview_name: this.theInterviewName,
						interview_nationlity: this.nationalityValueTwo.name,
						interview_imgurl: this.theInterviewPhoto,
						entry_date: this.startDateValue,
						business_id: this.businessId,
						business_name: this.businessName,
						currency: currencyValue,
						is_mom_language: this.isNativeSpeaker,
						employment_type: this.selectEmploymentTypeList[0].id,
						version_time: this.jobmd5
					}
				}
				// console.log(data);
				uni.showLoading({
					title: 'loading'
				})
				jobs.add(data).then(res => {
					// console.log(res);
					if (res.code == 200) {
						let jobId = res.data.job_id;
						if (this.selectBenefitsList.length > 0) {
							that.submitBenefits(jobId);
						}
				
						if (this.selectAgeToTeachList.length > 0) {
							that.submitAgeToTeach(jobId);
						}
						if (this.subjectList.length > 0) {
							that.submitSubject(jobId);
						}
						// if (this.selectEmploymentTypeList.length > 0) {
						// 	that.submitEmploymentType(jobId);
						// }
						if (this.selectTeachingCertificateList.length > 0) {
							that.submitTeachingCertificate(jobId);
						}
						if (this.selectLanguagesList.length > 0) {
							that.submitLanguages(jobId);
						}
				
						if (this.freeCheckedCheckoutList.length === 0 && this.paidCheckedCheckoutList.length ===
							0) {
							uni.hideLoading();
							uni.reLaunch({
								url: '/pages/jobs/index?current=1'
							})
						}
				
						if (this.freeCheckedCheckoutList.length > 0) {
							let service_data = {
								job_id: jobId,
								services: that.freeCheckedCheckoutList,
								token: uni.getStorageSync('token')
							}
							jobs.addJobServices(service_data).then(res => {
								console.log(res)
								if (res.code == 200) {
				
									let pre_data = {
										token: uni.getStorageSync('token'),
										// total_fee: 1,
										total_fee: res.data.money,
										order_id: res.data.order_id,
										body: that.jobTitleValue
									}
									// #ifdef H5
									jobs.getPrepayId(pre_data).then(res => {
										console.log(res)
										uni.hideLoading();
										let wxpayData = res.message;
										this.$jwx.wxpay(wxpayData, function(result) {
											console.log(result)
											if (result.code == 1) {
												uni.reLaunch({
													url: '/pages/jobs/index?current=1'
												})
											}
											if (result.code == -1) {
												uni.navigateTo({
													url: '/pages/public/payment/payment'
												})
											}
										})
									}).catch(error => {
										console.log(error)
									})
									// #endif
				
									// #ifdef MP-WEIXIN
									jobs.miniAppPay(pre_data).then(res => {
										console.log(res)
										uni.hideLoading();
										let wxpayData = res.message;
										uni.requestPayment({
											provider: 'wxpay',
											timeStamp: wxpayData.timeStamp,
											nonceStr: wxpayData.nonceStr,
											package: wxpayData.package,
											signType: wxpayData.signType,
											paySign: wxpayData.paySign,
											success: function(res) {
												uni.reLaunch({
													url: '/pages/jobs/index?current=1'
												})
											},
											fail: function(err) {
												console.log(err)
												uni.navigateTo({
													url: '/pages/public/payment/payment'
												})
											}
										});
									}).catch(error => {
										console.log(error)
									})
				
									// #endif
				
								}
							}).catch(error => {
								console.log(error)
							})
						}
				
				
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
			submitJob(isUpgrade) {

				var currency;
				var currencyValue;
				var that = this;
				
				if (this.pickerText == '') {
					return uni.showToast({
						title: this.i18n.jobLocationErrorMsg,
						icon: "none"
					})
				}
				if (this.selectEmploymentTypeList.length <= 0) {
					return uni.showToast({
						title: this.i18n.employmentTypeErrorMsg,
						icon: "none"
					})
				}

				if (this.selectJobTitleList.length <= 0) {
					return uni.showToast({
						title: this.i18n.jobTitleErrorMsg,
						icon: "none"
					})
				}

				if (this.positionDescriptionValue == '') {
					return uni.showToast({
						title: this.i18n.positionDescErrorMsg,
						icon: "none"
					})
				}

				if (this.minSalaryValue == '') {
					return uni.showToast({
						title: this.i18n.jobsminsalaryph,
						icon: "none"
					})
				}
				if (this.maxSalaryValue == '') {
					return uni.showToast({
						title: this.i18n.jobsmaxsalaryph,
						icon: "none"
					})
				}

				if (parseInt(this.maxSalaryValue) <= parseInt(this.minSalaryValue)) {
					return uni.showToast({
						title: this.i18n.jobsmaxsalaryph,
						icon: "none"
					})
				}

				if (this.paymentPeriodValue == '') {
					return uni.showToast({
						title: this.i18n.paymentPeriodErrorMsg,
						icon: "none"
					})
				}

				if (this.selectCurrencyList.length <= 0) {
					return uni.showToast({
						title: this.i18n.currencyErrorMsg,
						icon: "none"
					})
				}

				if (this.selectCurrencyList.length > 0) {
					currency = this.selectCurrencyList;
					currencyValue = currency[0].object_en;
				} else {
					currencyValue = '';
				}
				if (this.selectJobTitleList.length > 0) {
					let a = this.selectJobTitleList;
					this.jobTitleValue = a[0].object_en;
				}

				if (this.selectStartDateList.length > 0) {
					let a = this.selectStartDateList;
					this.startDateValue = a[0].object_en;
				}
				if (this.selectAgeList.length > 0) {
					this.ageValue = this.selectAgeList[0].object_en;
				}

				if (this.isYouTheInterview == 1) {
					this.theInterviewName = this.businessUserInfo.first_name + ' ' + this.businessUserInfo.last_name;
					this.nationalityValueTwo = {
						name: this.businessUserInfo.nationality
					}
					this.theInterviewPhoto = this.businessUserInfo.profile_photo
				}

				if (that.isEdit) {
					var data = {
						job_id: this.jobId,
						token: uni.getStorageSync('token'),
						job_title: this.jobTitleValue,
						job_location: this.pickerText,
						apply_due_date: this.applicationDueDateStr,
						is_online: this.isOnlineJob,

						salary_min: parseInt(this.minSalaryValue),
						salary_max: parseInt(this.maxSalaryValue),
						payment_period: this.paymentPeriodValue,
						desc: this.positionDescriptionValue,
						numbers: parseInt(this.vacanciesValue),
						is_equal: this.isEqualOpportunity,
						sex: parseInt(this.genderValue),
						is_cpr: this.isCprCertified,
						is_first_aside: this.isFirstAsideCertified,
						is_teaching_exp: this.isTeachingExperience,
						teaching_times: this.teachingExpValue,
						is_teaching_license: this.isTeachingLicense,
						education: this.educationValue,
						nationality: this.nationalityValueOne.name,
						age: this.ageValue,
						age_min: this.rangeValue[0],
						age_max: this.rangeValue[1],
						is_interview: this.isYouTheInterview,
						interview_name: this.theInterviewName,
						interview_nationlity: this.nationalityValueTwo.name,
						interview_imgurl: this.theInterviewPhoto,
						entry_date: this.startDateValue,
						business_id: this.businessId,
						business_name: this.businessName,
						currency: currencyValue,
						is_mom_language: this.isNativeSpeaker,
						employment_type: this.selectEmploymentTypeList[0].id,
						version_time: this.jobmd5
					}
				} else {
					var data = {
						token: uni.getStorageSync('token'),
						job_title: this.jobTitleValue,
						job_location: this.pickerText,
						apply_due_date: this.applicationDueDateStr,
						is_online: this.isOnlineJob,
						salary_min: parseInt(this.minSalaryValue),
						salary_max: parseInt(this.maxSalaryValue),
						payment_period: this.paymentPeriodValue,
						desc: this.positionDescriptionValue,
						numbers: parseInt(this.vacanciesValue),
						is_equal: this.isEqualOpportunity,
						sex: parseInt(this.genderValue),
						is_cpr: this.isCprCertified,
						is_first_aside: this.isFirstAsideCertified,
						is_teaching_exp: this.isTeachingExperience,
						teaching_times: this.teachingExpValue,
						is_teaching_license: this.isTeachingLicense,
						education: this.educationValue,
						nationality: this.nationalityValueOne.name,
						age: this.ageValue,
						age_min: this.rangeValue[0],
						age_max: this.rangeValue[1],
						is_interview: this.isYouTheInterview,
						interview_name: this.theInterviewName,
						interview_nationlity: this.nationalityValueTwo.name,
						interview_imgurl: this.theInterviewPhoto,
						entry_date: this.startDateValue,
						business_id: this.businessId,
						business_name: this.businessName,
						currency: currencyValue,
						is_mom_language: this.isNativeSpeaker,
						employment_type: this.selectEmploymentTypeList[0].id,
						version_time: this.jobmd5
					}
				}
				// console.log(data);
				uni.showLoading({
					title: 'loading'
				})
				jobs.add(data).then(res => {
					// console.log(res);
					if (res.code == 200) {
						let jobId = res.data.job_id;
						if (this.selectBenefitsList.length > 0) {
							that.submitBenefits(jobId);
						}

						if (this.selectAgeToTeachList.length > 0) {
							that.submitAgeToTeach(jobId);
						}
						if (this.subjectList.length > 0) {
							that.submitSubject(jobId);
						}
						// if (this.selectEmploymentTypeList.length > 0) {
						// 	that.submitEmploymentType(jobId);
						// }
						if (this.selectTeachingCertificateList.length > 0) {
							that.submitTeachingCertificate(jobId);
						}
						if (this.selectLanguagesList.length > 0) {
							that.submitLanguages(jobId);
						}
						setTimeout(function(){
							uni.hideLoading();
							if(isUpgrade==1){
								uni.navigateTo({
									url:'/pages/me/upgrade'
								})
							}else{
								uni.reLaunch({
									url: '/pages/jobs/index?current=1'
								})
							}
						
						},1200)

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
			submitBenefits(jobId) {
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
					expand: expand,
					job_id: jobId
				}

				jobs.addProfile(data).then(res => {
					if (res.code == 200) {
						console.log('benefits--submit--' + res.data);
					} else {
						console.log('benefits--submit--error');
						console.log(res.msg)
					}

				}).catch(error => {
					console.log(error)
				})
			},
			submitAgeToTeach(jobId) {
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
					expand: expand,
					job_id: jobId
				}

				jobs.addProfile(data).then(res => {
					if (res.code == 200) {
						console.log('agetoteach--submit--' + res.data);
					} else {
						console.log('agetoTeach--submit--error');
						console.log(res.msg);
					}

				}).catch(error => {
					console.log(error)
				})
			},
			submitSubject(jobId) {
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
					expand: expand,
					job_id: jobId
				}

				jobs.addProfile(data).then(res => {
					if (res.code == 200) {
						console.log('subject--submit--' + res.data);
					} else {
						console.log('subject--submit-error');
						console.log(res.msg);
					}

				}).catch(error => {
					console.log(error)
				})
			},
			submitEmploymentType(jobId) {
				let expand = [];
				let objectArr = [];
				this.selectEmploymentTypeList.forEach(item => {
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
					expand: expand,
					job_id: jobId
				}

				jobs.addProfile(data).then(res => {
					if (res.code == 200) {
						console.log('employment--submit--' + res.data);
					} else {
						console.log('employment--submit--error');
						console.log(res.msg)
					}

				}).catch(error => {
					console.log(error)
				})
			},
			submitTeachingCertificate(jobId) {
				let expand = [];
				let objectArr = [];
				this.selectTeachingCertificateList.forEach(item => {
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
					expand: expand,
					job_id: jobId
				}

				jobs.addProfile(data).then(res => {
					if (res.code == 200) {
						console.log('teachingcertificate--submit--' + res.data);
					} else {
						console.log('teachingcertificate--submit--error');
						console.log(res.msg);
					}

				}).catch(error => {
					console.log(error)
				})
			},
			submitLanguages(jobId) {
				let expand = [];
				let objectArr = [];
				this.selectLanguagesList.forEach(item => {
					console.log(item);
					if (item.id === 0) {
						expand.push(item.object_name);
					} else {
						objectArr.push(item.id);
					}
				})

				let data = {
					token: uni.getStorageSync('token'),
					object_pid: 2,
					object_id: objectArr,
					expand: expand,
					job_id: jobId
				}

				jobs.addProfile(data).then(res => {
					if (res.code == 200) {
						console.log('languages--submit--' + res.data);
					} else {
						console.log('languages--submit--error');
						console.log(res.msg);
					}

				}).catch(error => {
					console.log(error)
				})
			},
			inputBlur(type, e) {
				// console.log(type)
				// console.log(e)
				if (e.detail.value == '') {
					console.log('please input ')
					if (type == 1) {
						this.jobLocationErrorMsg = this.i18n.jobsjoblocationph
					}
					if (type == 2) {
						this.salaryErrorMsg = this.i18n.jobssalaryph
					}
					if (type == 3 || type == 4) {
						this.salaryErrorMsg = this.i18n.jobssalaryph
					}
				} else {
					if (type == 1) {
						this.jobLocationErrorMsg = ''
					}
					if (type == 2) {
						this.salaryErrorMsg = ''
					}
					if (type == 3 || type == 4) {
						this.salaryErrorMsg = ''
					}
				}
			}

		},
		onReachBottom: function() {

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
	@import url("@/common/jobs/jobs.css");

	.salary-input-error {
		border: 1rpx solid red !important;
	}

	.contact {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		padding: 20rpx;
		background-image: linear-gradient(135deg, #1D6FA3 10%, #65FDF0 100%);
		border-radius: 20rpx;
		margin-top: 20rpx;
	}

	.contact-l {}

	.contact-l image {
		width: 140rpx;
		height: 140rpx;
		border-radius: 140rpx;
		border: 1rpx solid #EEEEEE;
	}

	.contact-r {
		padding-left: 20rpx;
	}

	.contact-nationality {
		font-size: 30rpx;
		color: #FFFFFF;
	}

	.contact-phone {
		font-size: 30rpx;
		color: #FFFFFF;
	}

	.contact-work-email {
		font-size: 30rpx;
		color: #FFFFFF;
	}
</style>
