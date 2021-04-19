<template>
	<view class="uni-flex uni-column">
		<u-form :model="form" :rules="rules" ref="uForm" :error-type="errorType" label-position="top"
			:label-style="{'font-weight':700}">
			<!-- section 1 -->
			<view class="section-container">
				<view class="section-title">{{i18n.jobsbusinessinfo}}</view>
				<u-form-item :label="i18n.jobsjoblocation" prop="job_location" required>
					<u-input border v-model="form.job_location" :placeholder="i18n.basicbusinesstwochooselocation"
						@click="chooseLocation" type="select" />
				</u-form-item>

				<u-form-item :label="i18n.jobsnumberofvacancies" prop="numbers">
					<u-number-box v-model="form.numbers" :min="1" :max="99999999" input-width="200" input-height="60"
						@change="vacanciesChange"></u-number-box>
				</u-form-item>
				<u-form-item :label="i18n.jobsemploymenttype" prop="employment_type" required>
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
				</u-form-item>
				<u-form-item :label="i18n.jobsonlinejob" prop="is_online" label-position="left" label-width="80%">
					<switch :checked="form.is_online===1" class="online-job-switch" color="#0AA0A8"
						@change="onlineJobChange" />
				</u-form-item>
			</view>
			<!-- section 2 -->
			<view class="section-container">
				<view class="section-title">{{i18n.jobsgeneralpositioninfo}}</view>

				<u-form-item :label="i18n.jobsjobtitle" prop="job_title" required>
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
						<view class="jobs-tags-item" v-if="addJobTitleStatus==false" @click="addJobTitleStatus=true">
							add+
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
				</u-form-item>

				<u-form-item :label="i18n.jobsapplicationduedate" prop="apply_due_date">
					<u-input border v-model="form.apply_due_date" :placeholder="i18n.jobschooseduedate"
						@click="showApplicationDueDate" type="select" />
					<u-calendar max-date="4200-01-01" :safe-area-inset-bottom="true" :toolTip="i18n.jobschooseduedate"
						v-model="applicationDueDateshow" :mode="dueDateMode" @change="applicationDueDateChange">
					</u-calendar>
				</u-form-item>

				<u-form-item :label="i18n.jobsstartdate" prop="entry_date">
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
						<view class="jobs-tags-item" v-if="addStartDateStatus==false" @click="addStartDateStatus=true">
							add+
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
				</u-form-item>

				<u-form-item :label="i18n.jobsagetoteach" prop="age_to_teach">
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
				</u-form-item>

				<u-form-item :label="i18n.jobssubject" prop="subject">
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
				</u-form-item>

				<u-form-item :label="i18n.jobspositiondesc" prop="desc" required >
					<view class="xll-view" >
						<u-input border height="150" type="textarea" :maxlength="300" v-model="form.desc" style="width: 100%;" :placeholder="i18n.jobspositiondescph" />
					</view>
					<view class="textarea-number"> {{form.desc.length}}/300</view>
				</u-form-item>
			</view>

			<!-- section 3 -->
			<view class="section-container">
				<view class="section-title">{{i18n.jobsaddcompensation}}</view>

				<u-form-item :label="i18n.jobssalary" prop="salary" required>
					<view class="xll-two-container">
						<view class="xll-two-left">
							<u-form-item prop="salary_min" :border-bottom="false">
								<u-input border type="number" v-model="form.salary_min"
									:placeholder="i18n.jobsminsalaryph" />
							</u-form-item>
						</view>
						<view class="xll-two-mid">-</view>
						<view class="xll-two-right">
							<u-form-item prop="salary_max" :border-bottom="false">
								<u-input border type="number" v-model="form.salary_max"
									:placeholder="i18n.jobsmaxsalaryph" />
							</u-form-item>
						</view>
					</view>
				</u-form-item>

				<u-form-item :label="i18n.jobspaymentperiod" prop="payment_period_str" required>
					<u-input border v-model="form.payment_period_str" :placeholder="i18n.jobschoosepaymentperiod"
						type="select" @click="showPaymentPeriod" />
				</u-form-item>

				<u-form-item :label="i18n.jobscurrency" prop="currency" required>
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
						<view class="jobs-tags-item" v-if="addCurrencyStatus==false" @click="addCurrencyStatus=true">
							add+
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
				</u-form-item>

				<u-form-item :label="i18n.jobsbenefits" prop="benefits">
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
								v-for="(benefit,index) in ownBenefitsList" :key="index"
								@click="selectBenefits(benefit,2)">
								{{benefit.object_name}}
							</view>
						</view>
						<view class="jobs-tags-item" v-if="addBenefitsStatus==false" @click="addBenefitsStatus=true">
							add+
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
				</u-form-item>
			</view>
			<!-- section 4 -->
			<view class="flex-item section-container">
				<view class="section-title">{{i18n.jobsapplicantrequirements}}</view>

				<u-form-item :label="i18n.jobsnativespeaker" prop="is_mom_language" label-position="left"
					label-width="80%">
					<switch :checked="form.is_mom_language==1" class="teaching-license-1" color="#0AA0A8"
						@change="nativeSpeakerChange" />
				</u-form-item>
				<u-form-item :label="i18n.jobsteachinglicense" prop="is_teaching_license" label-position="left"
					label-width="80%">
					<switch :checked="form.is_teaching_license==1" class="teaching-license-1" color="#0AA0A8"
						@change="teachingLicenseChange" />
				</u-form-item>
				<u-form-item :label="i18n.jobsgender" prop="sex_name">
					<u-input border v-model="form.sex_name" :placeholder="i18n.jobschoosegender" type="select"
						@click="genderShow=true" />
				</u-form-item>
				<u-form-item :label="i18n.jobsteachingcertificate" prop="teaching_certificate">
					<view class="jobs-tags-container">
						<view class="jobs-tags">
							<view class="jobs-tags-item"
								:class=" selectTeachingCertificateList.findIndex((element)=>element===teachingCertificate) == -1 ? '' : 'tags-active' "
								v-for="(teachingCertificate,index) in teachingCertificateList"
								:key="teachingCertificate.id" @click="selectTeachingCertificate(teachingCertificate,1)">
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
				</u-form-item>

				<u-form-item :label="i18n.jobscprcertified" prop="is_cpr" label-position="left" label-width="80%">
					<switch :checked="form.is_cpr==1" class="cpr-certified-1" color="#0AA0A8"
						@change="certifiedChange" />
				</u-form-item>

				<u-form-item :label="i18n.jobsfirstasidecertified" prop="is_first_aide" label-position="left"
					label-width="80%">
					<switch :checked="form.is_first_aide==1" class="first-aside-certified-1" color="#0AA0A8"
						@change="firstAsideChange" />
				</u-form-item>
				<u-form-item :label="i18n.jobsteachingexperience" prop="is_teaching_exp" label-position="left"
					label-width="80%">
					<switch :checked="form.is_teaching_exp==1" class="teaching-experience-1" color="#0AA0A8"
						@change="teachingExperienceChange" />
				</u-form-item>
				<u-form-item prop="teaching_times_str" v-if="form.is_teaching_exp==1">
					<u-input border v-model="form.teaching_times_str" :placeholder="i18n.jobschooseteachingexperience"
						@click="teachingExpShow=true" type="select" />
				</u-form-item>
				<u-form-item :label="i18n.jobseducation" prop="education_str">
					<u-input border v-model="form.education_str" :placeholder="i18n.jobschooseeducation"
						@click="educationShow=true" type="select" />
				</u-form-item>
				<u-form-item :label="i18n.jobslanguages" prop="languages">
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
				</u-form-item>

				<u-form-item :label="i18n.jobsage" prop="age">
					<view class="age-slider">
						<SliderRange :value="ageSlider.rangeValue" :min="ageSlider.min" :max="ageSlider.max"
							:step="ageSlider.step" :bar-height="barHeight" :block-size="blockSize"
							:background-color="backgroundColor" :active-color="ageSlider.activeColor"
							:format="ageSliderformat" :decorationVisible="ageSlider.decorationVisible"
							@change="handleAgeRangeChange"></SliderRange>
					</view>
				</u-form-item>
				<u-form-item :label="i18n.jobsequalopportunity" prop="is_equal">
					<switch :checked="form.is_equal===1" class="equal-opportunity-1" color="#0AA0A8"
						@change="equalOpportunityChange" />
				</u-form-item>

			</view>

			<!-- section 5 -->
			<view class="flex-item section-container">
				<view class="section-title">{{i18n.jobscontactpersoninfo}}</view>
				<u-form-item :label="i18n.jobswillyouinterview" prop="is_interview">
					<switch :checked="form.is_interview==1" class="doing-interview-1" color="#0AA0A8"
						@change="doingInterviewChange" />
				</u-form-item>

				<view v-if="form.is_interview==0">
					<u-form-item :label="i18n.jobsname" prop="interview_name">
						<u-input border v-model="form.interview_name" :placeholder="i18n.jobsnameph" />
					</u-form-item>
					<u-form-item :label="i18n.jobsnationality" prop="interview_nationlity">
						<u-input border v-model="form.interview_nationlity" :placeholder="i18n.jobsnationality" type="select"
							@click="turnNationalityPage"></u-input>
					</u-form-item>
					<u-form-item :label="i18n.jobsphoto" prop="interveiw_imgurl">
						<view class="contact-l">
							<view class="upload-icon" v-if="form.interview_imgurl=='' " @click="chooseAvatar">
								+
							</view>
							<view v-if="form.interview_imgurl!=''" @click="chooseAvatar">
								<image :src="form.interview_imgurl" mode="aspectFill"></image>
							</view>
						</view>
					</u-form-item>
				</view>

				<!-- 如果是 显示用户信息名片 -->
				<view class="contact" v-if="form.is_interview==1">
					<view class="contact-l">
						<view class="upload-icon" v-if="form.interview_imgurl=='' " @click="chooseAvatar">
							+
						</view>
						<view v-if="form.interview_imgurl!=''" @click="chooseAvatar">
							<image :src="form.interview_imgurl" mode="aspectFill"></image>
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

			</view>
		</u-form>

		<view class="flex-item checkout">
			<view class="checkout-t">
				Featured Job Charges
			</view>
			<!-- 3D轮播 -->
			<swiper class="imageContainer" next-margin="100rpx" previous-margin="20rpx"
				:style="'height:'+swiperHeight + 'rpx;' " @change="checkoutChange" :autoplay="false">
				<swiper-item class="swiperitem" v-if="businessLevel==1">
					<view class="swiperitem-container">
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
								<view class="checkout-item-2-1">¥ {{ parseInt(item.originally_money/100) }}.00</view>
								<view class="checkout-item-2-2">¥ {{parseInt(item.money/100)}}.00</view>
							</view>
							<view class="checkout-item-3">
								<switch style="transform:scale(0.6)" type="switch" color="#0AA0A8"
									:checked="freeCheckedCheckoutList.indexOf(item.id) != -1 "
									@change="checkoutItemChecked($event,item.id,parseInt(item.money/100),parseInt(item.originally_money/100))" />
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
							<button type="default" @click="submitJob(2)">Checkout</button>
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
								<view class="checkout-item-2-1">¥ {{ parseInt(item.originally_money/100) }}.00</view>
								<view class="checkout-item-2-2">¥ {{parseInt(item.money/100)}}.00</view>
							</view>
							<view class="checkout-item-3">
								<switch style="transform:scale(0.6)" type="switch" color="#0AA0A8"
									:checked="freeCheckedCheckoutList.indexOf(item.id) != -1 "
									@change="checkoutItemChecked($event,item.id,parseInt(item.money/100),parseInt(item.originally_money/100))" />
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
							<button type="default" v-if="businessLevel==2" @click="submitJob(2)">Checkout</button>
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
								<view class="checkout-item-2-1">¥ {{ parseInt(item.originally_money/100) }}.00</view>
								<view class="checkout-item-2-2">¥ {{parseInt(item.money/100)}}.00</view>
							</view>
							<view class="checkout-item-3">
								<switch style="transform:scale(0.6)" type="switch" color="#0AA0A8"
									:checked="freeCheckedCheckoutList.indexOf(item.id) != -1 "
									@change="checkoutItemChecked($event,item.id,parseInt(item.money/100),parseInt(item.originally_money/100))" />
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
							<button type="default" v-if="businessLevel==3" @click="submitJob(2)">Checkout</button>
							<button type="default" v-if="businessLevel<3" @click="submitJob(1)">Save & Upgrade</button>
						</view>
					</view>
				</swiper-item>

			</swiper>
		</view>
		<view class="flex-item post-this-job">
			<button type="default" @click="submitJob(3)">{{i18n.jobspostjob}}</button>
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
	import SliderRange from '@/components/xll-range-slider/index.vue';

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
		
		data() {
			var _this = this;
			return {
				languageValue: 'en-US',
				imageList: [], //图片
				uploadFileUrl: _this.$uploadFileUrl,
				VideoOfImagesShow: true,

				applicationDueDateshow: false,
				dueDateMode: 'date',
				paymentPeriodShow: false,
				paymentPeriodList: [],
				genderShow: false,
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
				teachingExpList: [],

				educationShow: false,
				educationList: [],

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

				teachingCertificateList: [],
				addTeachingCertificateStatus: false,
				ownTeachingCertificateValue: '',
				ownTeachingCertificateList: [],
				selectTeachingCertificateList: [],
				selectTeachingCertificateArr: [],

				languagesList: [],
				addLanguagesStatus: false,
				ownLanguagesValue: '',
				ownLanguagesList: [],
				selectLanguagesList: [],
				selectLanguagesArr: [],

				serviceList: [],

				isEdit: false,
				jobId: 0,

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

				swiperHeight: 300,
				businessLevel: 1,
				basicServiceList: [],
				proServiceList: [],
				plusServiceList: [],

				errorType: ['message'],
				form: {
					token: uni.getStorageSync('token'),
					job_title: '',
					job_location: '',
					province: '',
					city: '',
					district: '',
					apply_due_date: '',
					is_online: '',
					salary_min: '',
					salary_max: '',
					payment_period: '',
					payment_period_str: '',
					desc: '',
					numbers: 1,
					is_equal: '',
					sex: '',
					sex_name: '',
					is_cpr: '',
					is_first_aide: '',
					is_teaching_exp: '',
					teaching_times: '',
					teaching_times_str: '',
					is_teaching_license: '',
					education: '',
					education_str: '',
					nationality: '',
					age: '',
					age_min: '',
					age_max: '',
					is_interview: 1,
					interview_name: '',
					interview_nationlity: '',
					interview_imgurl: '',
					entry_date: '',
					business_id: '',
					business_name: '',
					currency: '',
					is_mom_language: '',
					employment_type: '',
					version_time: ''
				},
				rules: {
					job_location: [{
						required: true,
						message: this.$t('index').jobLocationErrorMsg,
						trigger: ['change', 'blur'],
					}, ],
					desc: [{
						required: true,
						message: this.$t('index').positionDescErrorMsg,
						trigger: ['change', 'blur'],
					}, ],
					salary_min: [{
							required: true,
							message: this.$t('index').jobsminsalaryph,
							trigger: ['change', 'blur'],
						},
						{
							validator: (rule, value, callback) => {
								let salaryMax = this.form.salary_max;
								if(salaryMax.length>0){
									return parseInt(value) < parseInt(salaryMax);
								}else{
									return true;
								}
								
							},
							message: this.$t('index').jobsminsalaryerror,
							// 触发器可以同时用blur和change
							trigger: ['change', 'blur']
						}
					],
					salary_max: [{
							required: true,
							message: this.$t('index').jobsmaxsalaryph,
							trigger: ['change', 'blur'],
						},
						{
							validator: (rule, value, callback) => {
								let salaryMin = this.form.salary_min;
								if(salaryMin.length>0){
									return parseInt(value) > parseInt(salaryMin);
								}else{
									return true;
								}
								
							},
							message: this.$t('index').jobsmaxsalaryerror,
							// 触发器可以同时用blur和change
							trigger: ['change', 'blur']
						}
					],
					payment_period_str: [{
						required: true,
						message: this.$t('index').paymentPeriodErrorMsg,
						trigger: ['change', 'blur'],
					}, ],

				}
			}
		},
		components: {
			SliderRange
		},
		computed: {
			i18n() {
				return this.$t('index')
			},
			// #ifdef H5
			isWechat() {
				return this.$isWechat()
			}
			// #endif

		},
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
					// #ifdef H5
					header: {
						platform: that.isWechat ? 2 : 1
					},
					// #endif
					// #ifdef MP-WEIXIN
					header: {
						platform: 3
					},
					// #endif
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
								that.form.interview_imgurl = result.data[0].file_url;
							} else {
								console.log(result.msg)
							}
						}
					}
				});
			})

		},
		onUnload() {
			uni.$off('uAvatarCropper');
			uni.$off('locationEvent');
			uni.$off('nationalityObj');
		},
		async onLoad(option) {
			var that = this;

			this.jobmd5 = option.jobmd5;

			await this.getSubCateList();
			await this.getBasicUserInfo();
			await this.getJobServiceList();

			if (option.id) {
				this.isEdit = true;
				this.jobId = option.id;
				await this.getJobDetail(option.id);
			}

			if (uni.getStorageSync('language') != '') {
				this.languageValue = uni.getStorageSync('language')
			}

			uni.$on('locationEvent', function(data) {
				console.log(data)
				that.form.province = data.provinceId;
				that.form.city = data.cityId;
				that.form.district = data.areaId;
				that.form.job_location = data.area + ', ' + data.city + ', ' + data.province;
			})
			uni.$on('nationalityObj', function(data) {
				that.form.interview_nationlity = data;
			})
			

		},
		methods: {
			turnNationalityPage() {
				uni.navigateTo({
					url: '/pages/me/profile/countriesList'
				})
			},
			chooseLocation() {
				uni.navigateTo({
					url: '/pages/location/location'
				})
			},
			ageSliderformat(val) {
				return val;
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
			async getJobServiceList() {
				let token = uni.getStorageSync('token');

				let data = {
					token: token,
					identity: 2,
					page: 1,
					limit: 200
				}

				await jobs.serviceList(data).then(res => {
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

						let len = Math.max(basicLen, proLen, plusLen);
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
			async getBasicUserInfo() {
				var that = this;
				let uid = uni.getStorageSync('uid');
				let token = uni.getStorageSync('token');

				let data = {
					id: uid,
					token: token
				}

				await profile.getBasicInfo(data).then(res => {
					console.log(res)
					if (res.code == 200) {
						let businessInfo = res.message.business_info;

						that.businessUserInfo = businessInfo;
						that.form.business_id = businessInfo.id;
						that.form.business_name = businessInfo.business_name;

						if (that.form.is_interview == 1) {
							that.form.interview_name = businessInfo.first_name + ' ' + businessInfo.last_name;
							that.form.interview_nationlity = businessInfo.nationality;
							that.form.interview_imgurl = businessInfo.profile_photo;
						}
						that.businessLevel = businessInfo.level;
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
			async getSubCateList() {
				let data = {
					token: uni.getStorageSync('token')
				}
				await profile.getUserObjectList(data).then(res => {
					// console.log(res);
					if (res.code == 200) {
						this.benefitsList = res.message.filter(item => item.pid === 6); //benefits
						this.ageToTeachList = res.message.filter(item => item.pid === 4); //age to teach
						// this.employmentTypeList = res.message.filter(item => item.pid === 3); //employment type
						this.paymentPeriodList = res.message.filter(item => item.pid ===
							111); // payment period
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
					this.form.is_online = 1;
				} else {
					this.form.is_online = 0;
				}
			},
			certifiedChange(e) {
				// console.log(e);
				if (e.detail.value) {
					this.form.is_cpr = 1;
				} else {
					this.form.is_cpr = 0;
				}
			},
			firstAsideChange(e) {
				// console.log(e);
				if (e.detail.value) {
					this.form.is_first_aide = 1;
				} else {
					this.form.is_first_aide = 0;
				}
			},
			teachingExperienceChange(e) {
				// console.log(e);
				if (e.detail.value) {
					this.form.is_teaching_exp = 1;
				} else {
					this.form.is_teaching_exp = 0;
				}
			},
			teachingLicenseChange(e) {
				// console.log(e)
				if (e.detail.value) {
					this.form.is_teaching_license = 1;
				} else {
					this.form.is_teaching_license = 0;
				}
			},
			nativeSpeakerChange(e) {
				if (e.detail.value) {
					this.form.is_mom_language = 1;
				} else {
					this.form.is_mom_language = 0;
				}
			},
			doingInterviewChange(e) {
				// console.log(e);
				if (e.detail.value) {
					this.form.is_interview = 1;
					this.form.interview_name = this.businessUserInfo.first_name + ' ' + this.businessUserInfo.last_name;
					this.form.interview_imgurl = this.businessUserInfo.profile_photo;
					this.form.interview_nationlity = this.businessUserInfo.nationality;
				} else {
					this.form.is_interview = 0;
					this.form.interview_name = '';
					this.form.interview_imgurl = '';
					this.form.interview_nationlity = '';
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
				console.log(e)
				this.form.apply_due_date = e.result;
			},
			showApplicationDueDate() {
				this.applicationDueDateshow = true;
			},
			showPaymentPeriod() {
				this.paymentPeriodShow = true;
			},
			paymentPeriodConfirm(e) {
				console.log(e)
				var that = this;
				this.paymentPeriodStatus = true;
				e.forEach(item => {
					that.form.payment_period = item.value;
					that.form.payment_period_str = item.label;
				})
			},
			vacanciesChange(e) {
				// console.log(e)
				this.form.numbers = e.value;

			},
			equalOpportunityChange(e) {
				// console.log(e)
				if (e.detail.value) {
					this.form.is_equal = 1;
				} else {
					this.form.is_equal = 0;
				}
			},
			genderConfirm(e) {
				var that = this;
				this.genderStatus = true;
				e.forEach(item => {
					that.form.sex = item.value;
					that.form.sex_name = item.label;
				})

			},
			teachingExpConfirm(e) {
				var that = this;
				this.teachingExpStatus = true;
				e.forEach(item => {
					that.form.teaching_times = item.value;
					that.form.teaching_times_str = item.label;
				})
			},
			educationConfirm(e) {
				var that = this;
				this.educationStatus = true;
				e.forEach(item => {
					that.form.education = item.value;
					that.form.education_str = item.label;
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

			async getJobDetail(id) {
				var that = this;
				let token = uni.getStorageSync('token');
				let data = {
					job_id: id,
					token: token
				}
				await jobs.detail(data).then(res => {
					console.log(res);
					if (res.code == 200) {

						let jobMessage = res.message;
						that.form.job_title = jobMessage.job_title;
						that.form.job_location = jobMessage.job_location;
						that.form.age_min = jobMessage.age_min;
						that.form.age_max = jobMessage.age_max;
						that.form.is_online = jobMessage.is_online;
						that.form.salary_min = jobMessage.salary_min.toString();
						that.form.salary_max = jobMessage.salary_max.toString();
						that.form.currency = jobMessage.currency;
						that.form.business_id = jobMessage.business_id;
						that.form.business_name = jobMessage.business_name;
						that.form.employment_type = jobMessage.employment_type;
						that.form.interview_imgurl = jobMessage.interview_imgurl;
						that.form.desc = jobMessage.desc;
						that.form.numbers = jobMessage.numbers;
						that.form.is_equal = jobMessage.is_equal;
						that.form.is_cpr = jobMessage.is_cpr;
						that.form.is_first_aide = jobMessage.is_first_aide;
						that.form.is_mom_language = jobMessage.is_mom_language;
						that.form.is_teaching_exp = jobMessage.is_teaching_exp;
						that.form.is_interview = jobMessage.is_interview;
						that.form.interview_name = jobMessage.interview_name;
						that.form.nationality = jobMessage.nationality;
						that.form.interview_nationlity = jobMessage.interview_nationlity;
						that.form.entry_date = jobMessage.entry_date;
						that.form.is_teaching_license = jobMessage.is_teaching_license;
						that.form.version_time = jobMessage.version_time;

						that.form.province = jobMessage.province;
						that.form.city = jobMessage.city;
						that.form.district = jobMessage.district;

						let ageMin = jobMessage.age_min
						let ageMax = jobMessage.age_max
						this.ageSlider.rangeValue = [ageMin, ageMax]

						// job title
						if (jobMessage.job_title) {
							let arr = this.jobTitleList.filter(item => item.object_en == jobMessage
								.job_title);
							let arrcn = this.jobTitleList.filter(item => item.object_cn ==
								jobMessage.job_title);
							if (arr.length > 0 || arrcn.length > 0) {
								this.selectJobTitleList = arr;
							} else {
								let obj = {
									id: 0,
									object_en: jobMessage.job_title,
									object_pid: 6
								};
								this.ownJobTitleList.push(obj);
								this.selectJobTitleList.push(obj);
							}
						}

						// start date
						if (jobMessage.entry_date) {
							let arr = this.startDateList.filter(item => item.object_en ==
								jobMessage.entry_date);
							let arrcn = this.startDateList.filter(item => item.object_cn ==
								jobMessage.entry_date);
							if (arr.length > 0 || arrcn.length > 0) {
								this.selectStartDateList = arr;
							} else {
								let obj = {
									id: 0,
									object_en: jobMessage.entry_date,
									object_pid: 108
								};
								this.ownStartDateList.push(obj);
								this.selectStartDateList.push(obj);
							}
						}
						// currency
						if (jobMessage.currency) {
							let arr = this.currencyList.filter(item => item.object_en == jobMessage
								.currency);
							let arrcn = this.currencyList.filter(item => item.object_cn ==
								jobMessage.currency);
							// console.log(arr)
							if (arr.length > 0 || arrcn.length > 0) {
								this.selectCurrencyList = arr;
							} else {
								let obj = {
									id: 0,
									object_en: jobMessage.currency,
									object_pid: 117
								};
								this.ownCurrencyList.push(obj);
								this.selectCurrencyList.push(obj);
							}

						}

						if (jobMessage.benefits) {
							let c = [];
							let a = jobMessage.benefits;
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
						if (jobMessage.age_to_teach) {
							let c = [];
							let a = jobMessage.age_to_teach;
							// console.log(a)
							a.forEach(ageToTeach => {
								if (ageToTeach.object_id !== 0) {
									// console.log(that.ageToTeachList)
									let b = that.ageToTeachList.filter(item => item.id ===
										ageToTeach.object_id)
									// console.log(b)
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
							// console.log(that.selectAgeToTeachList)
						}
						if (jobMessage.subject) {
							let c = [];
							let a = jobMessage.subject;
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
						if (jobMessage.Teaching_certificate) {
							let c = [];
							let a = jobMessage.Teaching_certificate;
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
						if (jobMessage.languages) {
							let c = [];
							let a = jobMessage.languages;
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

						if (jobMessage.employment_type != '') {
							this.selectEmploymentTypeList = this.employmentTypeList.filter(item =>
								item.id == jobMessage.employment_type)
						}

						if (jobMessage.age != '') {
							let b = this.ageList.filter(item => this.$u.trim(item.object_en) ==
								jobMessage.age);
							this.selectAgeList = b;
						}

						if (jobMessage.apply_due_date != '' && jobMessage.apply_due_date != '0000-00-00') {
							that.form.apply_due_date = jobMessage.apply_due_date;
						}
						if (jobMessage.payment_period) {
							that.form.payment_period = jobMessage.payment_period;
							that.form.payment_period_str = jobMessage.payment_period_en;
						}
						if (jobMessage.sex) {
							that.form.sex = jobMessage.sex;
							if (jobMessage.sex == 1) {
								that.form.sex_name = 'Male'
							}
							if (jobMessage.sex == 2) {
								that.form.sex_name = 'Female'
							}
							if (jobMessage.sex == 3) {
								that.form.sex_name = 'Both'
							}
						}

						if (jobMessage.teaching_times) {
							that.form.teaching_times = jobMessage.teaching_times;
							that.form.teaching_times_str = jobMessage.teaching_times_en;
						}

						if (jobMessage.education) {
							that.form.education = jobMessage.education;
							that.form.education_str = jobMessage.education_en;
						}
						if (jobMessage.interview_imgurl) {
							this.VideoOfImagesShow = false;
							this.imageList.push({
								path: res.message.interview_imgurl
							});
							that.form.interview_imgurl = res.message.interview_imgurl;
						}
						console.log(that.form)
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
			submitJob(submitType) {

				var that = this;

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

				if (this.selectCurrencyList.length <= 0) {
					return uni.showToast({
						title: this.i18n.currencyErrorMsg,
						icon: "none"
					})
				}

				if (this.selectEmploymentTypeList.length > 0) {
					let employmentTypeList = this.selectEmploymentTypeList;
					that.form.employment_type = employmentTypeList[0].id;
				}
				if (this.selectCurrencyList.length > 0) {
					let currency = this.selectCurrencyList;
					that.form.currency = currency[0].object_en;
				} else {
					that.form.currency = '';
				}
				if (this.selectJobTitleList.length > 0) {
					let a = this.selectJobTitleList;
					that.form.job_title = a[0].object_en;
				} else {
					that.form.job_title = '';
				}

				if (this.selectStartDateList.length > 0) {
					let startDate = this.selectStartDateList;
					that.form.entry_date = startDate[0].object_en;
				} else {
					that.form.entry_date = '';
				}
				if (this.selectAgeList.length > 0) {
					let ageList = this.selectAgeList;
					that.form.age = ageList[0].object_en;
				}

				if (this.form.is_interview == 1) {
					that.form.interview_name = this.businessUserInfo.first_name + ' ' + this.businessUserInfo.last_name;
					that.form.interview_nationlity = this.businessUserInfo.nationality;
					that.form.interview_imgurl = this.businessUserInfo.profile_photo;
				}
				
				that.form.age_min = this.rangeValue[0];
				that.form.age_max = this.rangeValue[1];
				that.form.version_time = this.jobmd5;
				
				if (that.isEdit) {
					that.form.job_id = this.jobId;
				}
				console.log(that.form);
				
				this.$refs.uForm.validate(valid => {
					if (valid) {
						console.log('验证通过');
						let data = Object.assign({}, that.form);
						
						jobs.add(data).then(res => {
							// console.log(res);
							if (res.code == 200) {
								uni.showLoading({
									title: 'loading'
								})

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
								if (this.selectTeachingCertificateList.length > 0) {
									that.submitTeachingCertificate(jobId);
								}
								if (this.selectLanguagesList.length > 0) {
									that.submitLanguages(jobId);
								}
								if (submitType == 1) {
									setTimeout(function() {
										uni.hideLoading();
										uni.navigateTo({
											url: '/pages/me/upgrade'
										})

									}, 1200)
								}
								if (submitType == 3) {
									setTimeout(function() {
										uni.hideLoading();
										uni.reLaunch({
											url: '/pages/jobs/index?current=1'
										})
									}, 1200)
								}

								if (submitType == 2) {
									// #ifdef H5
									if(!this.isWechat){
										setTimeout(function() {
											uni.hideLoading();
											uni.reLaunch({
												url: '/pages/jobs/index?current=1'
											})
										}, 1200)
										return;
									}
									// #endif
									
									if (this.freeCheckedCheckoutList.length === 0 && this
										.paidCheckedCheckoutList.length ===0) {
										setTimeout(function() {
											uni.hideLoading();
											uni.reLaunch({
												url: '/pages/jobs/index?current=1'
											})
										}, 1200)
										return;
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

					} else {
						console.log('验证失败');
					}
				});

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

		},
		onReachBottom: function() {

		},
		onShareAppMessage: function() {

		},
		onShareTimeline: function() {

		},
		onAddToFavorites: function() {

		},
		onReady() {
			console.log('on ready')
			var _this = this;
			_this.$refs.uForm.setRules(_this.rules);

		}
	}
</script>

<style>
	@import url("@/common/jobs/jobs.css");
	@import url("@/common/home/uview-xll.css");

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
