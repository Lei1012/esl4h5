<template>
	<view class="uni-flex uni-column">
		<view class="flex-item top-container" :style="{backgroundImage: 'url('+companyBg+')'}">
			<view class="top-container-mask">
				<view class="top-t">
					<view class="top-left" @click="turnJobDetail(jobValue.user_id)">
						<image :src="companyLogo " mode="aspectFill"></image>
					</view>
					<view class="top-right">
						<text>{{jobValue.business_name}}</text> <br>
						<text>{{jobValue.nationality}}</text>
					</view>
				</view>

				<view class="top-b">
					<view class="top-b-l">
						<view class="top-b-contact">
							<button type="default" @click="contactUs()">{{i18n.jobscontactus}}</button>
						</view>
						<view class="top-b-apply">
							<button type="default" @click="applyJobs(jobValue.id)">{{i18n.jobsapply}}</button>
						</view>
					</view>
					<view class="top-b-r">
						<view class="top-b-r-collect" @click="shareFc()">
							<u-icon name="share" color="#ffffff" size="48rpx"></u-icon>
						</view>
						<!-- #ifdef H5 -->
						<view class="top-b-r-share" @click="shareYourJob">
							<image src="/pagesA/static/share-w.png" mode="scaleToFill"></image>
						</view>
						<!-- #endif -->
					</view>
				</view>
			</view>
		</view>

		<view class="flex-item jobs-desc-container">
			<view class="flex-item jobs-title">
				{{jobValue.job_title}}
			</view>
			<view class="flex-item jobs-location"
				v-if="jobValue.province && jobValue.city && jobValue.district && languageValue=='en-US' ">
				{{jobValue.districts.Pinyin}}, {{jobValue.citys.Pinyin}}, {{i18n.China}}
			</view>
			<view class="flex-item jobs-location"
				v-if="jobValue.province && jobValue.city && jobValue.district && languageValue=='zh-CN' ">
				{{jobValue.districts.ShortName}}, {{jobValue.citys.ShortName}}, {{i18n.China}}
			</view>
			<view class="flex-item job-xll-tags">
				<view class="xll-tag" v-if="jobValue.employment_type==1">{{i18n.jobslistjobtypefulltime}}</view>
				<view class="xll-tag" v-if="jobValue.employment_type==2">{{i18n.jobslistjobtypeparttime}}</view>
				<view class="xll-tag" v-if="jobValue.employment_type==3">{{i18n.jobslistjobtypeseasonal}}</view>
				<view class="xll-tag" v-if="jobValue.is_online==1">{{i18n.jobsdetailonline}}</view>
				<view class="xll-tag" v-if="jobValue.is_equal==1">{{i18n.jobspostequalopportunity}}</view>
				<view class="xll-tag">
					<uni-icons type="eye" size="14"></uni-icons>
					<text>{{jobValue.views}}</text>
				</view>
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
			<view class="flex-item application-due-date"
				v-if="jobValue.apply_due_date != '' && jobValue.apply_due_date != '0000-00-00'">
				<view class="application-due-date-1">{{i18n.jobsapplicationduedate}}</view>
				<view class="application-due-date-2" v-if="jobValue.apply_due_date">
					{{jobValue.apply_due_date}}
				</view>
			</view>

			<view class="flex-item start-date" v-if="jobValue.entry_date !='' ">
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
					<view class="jobs-tags">
						<view class="jobs-tags-item" v-for="(ageToTeach,index) in jobValue.age_to_teach" :key="index">
							<block v-if="languageValue=='en-US'">{{ageToTeach.object_en}}</block>
							<block v-if="languageValue=='zh-CN'">{{ageToTeach.object_cn}}</block>
						</view>
					</view>
				</view>
			</view>

			<view class="flex-item subject" v-if="jobValue.subject">
				<view class="subject-1">{{i18n.jobssubject}}</view>
				<view class="jobs-tags-container">
					<view class="jobs-tags">
						<view class="jobs-tags-item" v-for="(subject,index) in jobValue.subject" :key="index">
							<block v-if="languageValue=='en-US'">{{subject.object_en}}</block>
							<block v-if="languageValue=='zh-CN'">{{subject.object_cn}}</block>
						</view>
					</view>
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
				<view class="jobs-tags-container">
					<view class="jobs-tags">
						<view class="jobs-tags-item" v-for="(benefit,index) in jobValue.benefits" :key="index">
							<block v-if="languageValue=='en-US'">{{benefit.object_en}}</block>
							<block v-if="languageValue=='zh-CN'">{{benefit.object_cn}}</block>
						</view>
					</view>
				</view>
			</view>
		</view>

		<view class="flex-item applicant-requirements">
			<view class="applicant-requirements-title">{{i18n.jobsapplicantrequirements}}</view>
			<view class="gender" v-if="jobValue.sex != 3 && jobValue.sex">
				<view class="gender-1">{{i18n.jobsgender}}</view>
				<view class="gender-2">
					<text v-if="jobValue.sex==1">Male</text>
					<text v-if="jobValue.sex==2">Female</text>
				</view>
			</view>
			<view class="teaching-certificate" v-if="jobValue.Teaching_certificate">
				<view class="teaching-certificate-1">{{i18n.jobsteachingcertificate}}</view>
				<view class="jobs-tags-container">
					<view class="jobs-tags">
						<view class="jobs-tags-item" v-for="(item,index) in jobValue.Teaching_certificate" :key="index">
							<block v-if="languageValue=='en-US'">{{item.object_en}}</block>
							<block v-if="languageValue=='zh-CN'">{{item.object_cn}}</block>
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
				<view class="jobs-tags-container">
					<view class="jobs-tags">
						<view class="jobs-tags-item" v-for="(item,index) in jobValue.languages" :key="index">
							<block v-if="languageValue=='en-US'">{{item.object_en}}</block>
							<block v-if="languageValue=='zh-CN'">{{item.object_cn}}</block>
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
			<view class="contact" v-if="canSeeContact">
				<view class="contact-l">
					<image
						:src="businessUserInfo.profile_photo ? businessUserInfo.profile_photo : 'https://oss.esl-passport.cn/educator.png' "
						mode="aspectFill"></image>
				</view>
				<view class="contact-r">
					<view class="contact-name"> <b>{{i18n.jobsposthione}} {{businessUserInfo.first_name}}
							{{businessUserInfo.last_name}}!</b></view>
					<view class="contact-nationality">{{businessUserInfo.nationality}}</view>
					<view class="contact-phone" v-if="businessUserInfo.contact_phone !='' ">
						<view class="contact-copy-container-l">
							{{businessUserInfo.contact_phone}}
						</view>
						<view class="contact-copy-container-r">
							<image @click="phoneCall(businessUserInfo.contact_phone)" src="@/static/phonecall.png"
								mode="aspectFit"></image>
						</view>
					</view>
					<view class="contact-work-email" v-if="businessUserInfo.work_email !='' ">
						<view class="contact-copy-container-l">
							{{businessUserInfo.work_email}}
						</view>
						<view class="contact-copy-container-r">
							<image @click="copyEmail(businessUserInfo.work_email)" src="@/static/copy.png"
								mode="aspectFit"></image>
						</view>
					</view>
				</view>
			</view>
		</view>


		<view class="job-apply-button">
			<button type="default" @click="applyJobs(jobValue.id)">{{i18n.jobsapply}}</button>
		</view>
		<view class="wx-share" v-if="showWxShareStatus" @click="showWxShareStatus=false">
			<view class="wx-share-arrow"></view>
			<view class="wx-share-main">
				<p>Click share in the upper right corner</p>
			</view>
		</view>

		<!-- contact us -->
		<contactus @close="closeContact" :showContact="showContactStatus"></contactus>
		<!-- 角色选择弹框 -->
		<selectRolePopup :rolePopupStatus="rolePopupStatus" :selectRoleIdentity="selectRoleIdentity"
			@close="rolePopupStatus=false"></selectRolePopup>
		<!-- 角色选择弹框 end -->
		<!-- 图片展示由自己实现 -->
		<QSPopup ref="popup">
			<view class="flex_column">
				<view class="backgroundColor-white padding1vh border_radius_10px">
					<image :src="posterImage || ''" mode="widthFix" class="posterImage"></image>
				</view>
				<view class="flex_row marginTop2vh">
					<!-- #ifdef H5 -->
					<button type="primary" size="mini">{{i18n.sharefcchanganbaocun}}</button>
					<!-- #endif -->
					<!-- #ifndef H5 -->
					<button type="primary" size="mini"
						@tap.prevent.stop="saveImage()">{{i18n.sharefcsaveimage}}</button>
					<!-- #endif -->
					<!-- <button type="primary" size="mini" @tap.prevent.stop="share()">{{i18n.sharefcshareimage}}</button> -->
				</view>
			</view>
		</QSPopup>
		<!-- 画布 -->
		<view class="hideCanvasView">
			<canvas class="hideCanvas" id="default_PosterCanvasId" canvas-id="default_PosterCanvasId"
				:style="{width: (poster.width||10) + 'px', height: (poster.height||10) + 'px'}"></canvas>
		</view>
	</view>
</template>

<script>
	import QSPopup from '@/components/QS-popup/QS-popup.vue';
	import _app from '@/js_sdk/QuShe-SharerPoster/QS-SharePoster/app.js';
	import {
		getSharePoster
	} from '@/js_sdk/QuShe-SharerPoster/QS-SharePoster/QS-SharePoster.js';

	import selectRolePopup from '@/components/select-role-popup/select-role-popup.vue'
	import profile from '@/api/profile.js';
	import jobs from '@/api/jobs.js';
	import contactus from "@/components/xll-contact-us/xll-contact-us.vue";
	import uniCopy from '@/js_sdk/xb-copy/uni-copy.js'

	export default {
		components: {
			contactus,
			selectRolePopup,
			QSPopup
		},
		data() {
			return {
				jobId: 0,
				jobValue: '',
				identity: 0,
				showWxShareStatus: false,
				showContactStatus: false,
				businessLogo: '',
				businessUserInfo: '',

				rolePopupStatus: false, // 角色选择弹框
				selectRoleValue: 0, //选择的角色值
				selectRoleIdentity: 0,

				canSeeContact: true,

				companyBg: '',
				companyLogo: '',
				language: 'en-US',

				poster: {},
				posterImage: '',
				canvasId: 'default_PosterCanvasId'

			}
		},
		computed: {
			i18n() {
				return this.$t('index')
			},
			languageValue() {
				let language = uni.getStorageSync('language');
				return language ? language : 'en-US';
			}
		},
		onShow() {

		},
		onLoad(option) {
			var that = this;

			this.identity = uni.getStorageSync('identity');
			this.language = uni.getStorageSync('language');
			if (option.id) {
				this.jobId = option.id;
				this.getDetail(option.id);
			}

			let token = uni.getStorageSync('token')
			// #ifdef MP-WEIXIN
			if (token == '') {
				var pages = getCurrentPages(); // 当前页面
				var currentPagePath = pages[pages.length - 1]; // 前一个页面
				that.canSeeContact = false;
				if (currentPagePath.route == 'pagesC/login/index') {
					return;
				}
				return uni.navigateTo({
					url: '/pagesC/login/index?redirect=' + encodeURIComponent(currentPagePath.route)
				})
			}
			// #endif

		},
		methods: {
			async shareFc() {
				let _this = this;
				let qrcodeUrl = '';
				// #ifdef H5
				var url = window.location.href;
				var origin = window.location.origin;
				qrcodeUrl = origin + '/esl_h5/pagesA/jobs/details?id=' + _this.jobValue.id;
				// #endif

				// #ifdef MP-WEIXIN
				qrcodeUrl = 'https://esl-passport.cn/esl_h5/pagesA/jobs/details?id=' + _this.jobValue.id;
				// #endif
				// #ifdef MP-WEIXIN-DEV
				qrcodeUrl = 'https://test.esl-passport.cn/esl_h5/pagesA/jobs/details?id=' + _this.jobValue.id;
				// #endif

				let salary = _this.jobValue.currency + ' ' + _this.jobValue.salary_min + '-' + _this.jobValue
					.salary_max
				let employmentType = '';
				if (_this.jobValue.employment_type == 1) {
					employmentType = this.i18n.jobslistemploymentfulltime
				}
				if (_this.jobValue.employment_type == 2) {
					employmentType = this.i18n.jobslistemploymentparttime
				}
				if (_this.jobValue.employment_type == 3) {
					employmentType = this.i18n.jobslistemploymentseasonal
				}

				let shareTitle = _this.jobValue.job_title + '-' + employmentType;
				let shareName = _this.businessUserInfo.first_name + ' ' + _this.businessUserInfo.last_name;
				let sharePhone = _this.businessUserInfo.contact_phone;
				let shareEmail = _this.businessUserInfo.work_email;

				try {
					this.count++;
					_app.log('准备生成:' + new Date())
					const d = await getSharePoster({
						_this: _this, //若在组件中使用 必传
						canvasType: '2d',
						type: 'testShareType',
						formData: {
							//访问接口获取背景图携带自定义数据

						},
						posterCanvasId: _this.canvasId, //canvasId
						delayTimeScale: 20, //延时系数
						background: {
							height: 10,
							width: 10,
							color:"#ffffff"
						},
						setCanvasWH({
							bgObj
						}) {
							_this.poster = bgObj
						},
						drawArray({
							bgObj,
							type,
							bgScale,
							setBgObj,
							getBgObj
						}) {
							return [{
									type: 'image',
									id: 'productImage',
									url: _this.companyBg,
									dx: 0,
									dy: 0,
									serialNum: 0,
									infoCallBack(imageInfo) {
										let width;
										let height;
										if (imageInfo.width > imageInfo.height) {
											width = imageInfo.width > 700 ? 700 : imageInfo.width;
											height = width / imageInfo.width * imageInfo.height;
										} else {
											height = imageInfo.height > 700 ? 700 : imageInfo.height;
											width = height / imageInfo.height * imageInfo.width;
										}
										if (width < 500) {
											width = 500;
											height = width / imageInfo.width * imageInfo.height;
										}
										let addHeight;
										// #ifdef H5
										addHeight = 440;
										// #endif
										// #ifdef MP-WEIXIN
										addHeight = 500;
										// #endif
										setBgObj({
											width,
											height: height + addHeight
										});
										return {
											dWidth: width,
											dHeight: height
										}
									}
								},
								{
									type: 'text',
									id: 'jobDesc',
									text: _this.jobValue.desc,
									color: '#000000',
									serialNum: 1,
									allInfoCallback({
										drawArray
									}) {
										const productImage = drawArray.find(item => item.id ===
											'productImage')
										const addHeight = getBgObj().height - productImage.dHeight;
										return {
											size: getBgObj().width * 0.05,
											lineFeed: {
												maxWidth: getBgObj().width,
												lineNum: 3
											},
											dx: getBgObj().width * .05,
											dy: productImage.dHeight + addHeight * .15,
										}
									}
								},
								{
									type: 'text',
									text: shareTitle,
									color: '#000000',
									serialNum: 2,
									allInfoCallback({
										drawArray
									}) {
										const productImage = drawArray.find(item => item.id ===
											'productImage')
										const addHeight = getBgObj().height - productImage.dHeight;
										return {
											size: getBgObj().width * 0.06,
											lineFeed: {
												maxWidth: getBgObj().width * 0.9,
												lineNum: 1
											},
											dx: getBgObj().width * .05,
											dy: productImage.dHeight + addHeight * .4,
										}
									}
								},
								{
									type: 'text',
									text: salary,
									serialNum: 3,
									color: "#00b3d2",
									id: 'salary',
									allInfoCallback({
										drawArray
									}) {
										const productImage = drawArray.find(item => item.id ===
											'productImage')
										const addHeight = getBgObj().height - productImage.dHeight;
										return {
											size: getBgObj().width * 0.05,
											lineFeed: {
												maxWidth: getBgObj().width * 0.5,
												lineNum: 1
											},
											dx: getBgObj().width * .05,
											dy: productImage.dHeight + addHeight * .65,
										}
									}
								},
								{
									type: 'text',
									text: shareName,
									serialNum: 4,
									allInfoCallback({
										drawArray
									}) {
										const productImage = drawArray.find(item => item.id ===
											'productImage')
										const addHeight = getBgObj().height - productImage.dHeight;
										return {
											size: getBgObj().width * 0.05,
											lineFeed: {
												maxWidth: getBgObj().width * 0.5,
												lineNum: 1
											},
											dx: getBgObj().width * .05,
											dy: productImage.dHeight + addHeight * .75,
										}
									}
								},
								{
									type: 'text',
									text: shareEmail,
									id: 'shareEmail',
									serialNum: 5,
									allInfoCallback({
										drawArray
									}) {
										const productImage = drawArray.find(item => item.id ===
											'productImage')
										const addHeight = getBgObj().height - productImage.dHeight;
										return {
											size: getBgObj().width * 0.05,
											lineFeed: {
												maxWidth: getBgObj().width * 0.5,
												lineNum: 1
											},
											dx: getBgObj().width * .05,
											dy: productImage.dHeight + addHeight * .85,
										}
									}
								},
								{
									type: 'text',
									text: sharePhone,
									serialNum: 6,
									allInfoCallback({
										drawArray
									}) {
										const productImage = drawArray.find(item => item.id ===
											'productImage')
										const text1 = drawArray.find(item => item.id === 'shareEmail')
										const addHeight = getBgObj().height - productImage.dHeight;
										return {
											size: getBgObj().width * 0.05,
											lineFeed: {
												maxWidth: getBgObj().width * 0.5,
												lineNum: 1
											},
											dx: getBgObj().width * .05,
											dy: productImage.dHeight + addHeight * .95,
										}
									}
								},
								{
									type: 'qrcode',
									text: qrcodeUrl,
									serialNum: 7,
									allInfoCallback({
										drawArray
									}) {
										const productImage = drawArray.find(item => item.id ===
											'productImage')
										const addHeight = getBgObj().height - productImage.dHeight;
										const widthSize = getBgObj().width * .4;
										const heightSize = addHeight;
										const countSize = widthSize > heightSize ? heightSize : widthSize;
										const size = countSize * .9;
										return {
											size: size,
											dx: getBgObj().width - countSize * .95,
											dy: getBgObj().height - countSize * .95
										}
									}
								}
							]
						}
					})
					_app.log('海报生成成功, 时间:' + new Date() + '， 临时路径: ' + d.poster.tempFilePath)
					this.posterImage = d.poster.tempFilePath;
					this.$refs.popup.show()
				} catch (e) {
					_app.hideLoading();
					_app.showToast(JSON.stringify(e));
					console.log(JSON.stringify(e));
				}
			},
			saveImage() {
				// #ifndef H5
				uni.saveImageToPhotosAlbum({
					filePath: this.posterImage,
					success(res) {
						_app.showToast('保存成功');
					}
				})
				// #endif
				// #ifdef H5
				uni.downloadFile({
					url: this.posterImage, //仅为示例，并非真实的资源
					success: (res) => {
						console.log(res)
						if (res.statusCode === 200) {
							_app.showToast('保存成功');
						}
					}
				});
				// #endif
			},
			share() {
				// #ifdef APP-PLUS
				_app.getShare(false, false, 2, '', '', '', this.poster.finalPath, false, false);
				// #endif

				// #ifndef APP-PLUS
				this.showWxShareStatus = true;
				// #endif
			},
			hideQr() {
				this.$refs.popup.hide()
			},
			copyEmail(email) {
				uniCopy({
					content: email,
					success: (res) => {
						uni.showToast({
							title: res,
							icon: 'none'
						})
					},
					error: (e) => {
						uni.showToast({
							title: e,
							icon: 'none',
							duration: 3000,
						})
					}
				})
			},
			phoneCall(phone) {
				uni.makePhoneCall({
					phoneNumber: phone

				})
			},
			copyPhone(phone) {

				uniCopy({
					content: phone,
					success: (res) => {
						uni.showToast({
							title: res,
							icon: 'none'
						})
					},
					error: (e) => {
						uni.showToast({
							title: e,
							icon: 'none',
							duration: 3000,
						})
					}
				})
			},
			turnBackHomepage() {
				uni.reLaunch({
					url: '/pages/home/index'
				})
			},
			closeContact(e) {
				// console.log(e)
				this.showContactStatus = false;
			},
			getDetail(id) {
				var _this = this;
				let data = {
					token: uni.getStorageSync('token'),
					job_id: id
				}
				jobs.detail(data).then(res => {
					console.log(res);
					if (res.code == 200) {

						let jobValue = res.message;
						let businessInfo = res.message.business;
						this.jobValue = res.message;
						this.businessUserInfo = res.message.business;

						uni.setNavigationBarTitle({
							title: res.message.job_title
						})

						this.companyBg = businessInfo.header_photo ? businessInfo.header_photo :
							'https://oss.esl-passport.cn/esl_passport_25.png';
						this.companyLogo = businessInfo.logo ? businessInfo.logo :
							'https://oss.esl-passport.cn/business.png';

						// #ifdef H5
						var img_url = businessInfo.profile_photo ? businessInfo.profile_photo :
							'https://oss.esl-passport.cn/business.png';
						var url = window.location.href;
						var origin = window.location.origin;

						let turn_url = origin + '/esl_h5/pagesA/jobs/share?id=' + id;

						var currency = res.message.currency
						if (currency == 'CNY') {
							currency = '¥'
						}
						if (currency == 'USD') {
							currency = '$'
						}

						let salary = currency + ' ' + res.message.salary_min + '-' + res.message.salary_max

						let share_desc = salary + ' ' + res.message.job_location + '' + res.message.desc
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
			turnJobDetail(id) {
				// #ifdef H5
				var url = window.location.href;
				var origin = window.location.origin;
				let turn_url = origin + '/esl_h5/pagesB/me/business/share?id=' + id + '&type=job';
				window.location.href = turn_url;
				// #endif
				// #ifndef H5
				uni.navigateTo({
					url: '../me/business/share?id=' + id + '&type=job'
				})
				// #endif

			},
			applyJobs(id) {

				let identity = uni.getStorageSync('identity')
				if (identity == 1) {
					uni.showModal({
						title: this.i18n.applyjobmodaltips,
						content: this.i18n.applyjobmodalcontent,
						confirmText: this.i18n.applyjobmodalconfirmtext,
						cancelText: this.i18n.applyjobmodalcanceltext,
						success: function(res) {
							if (res.confirm) {
								console.log('用户点击确定');
								let data = {
									job_id: id,
									token: uni.getStorageSync('token')
								}
								jobs.applyJobs(data).then(res => {
									console.log(res)
									if (res.code == 200) {
										uni.showToast({
											title: '',
											icon: 'success'
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
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					});

				} else {
					this.rolePopupStatus = true;
					this.selectRoleIdentity = 1;
					return;
				}


			},
			contactUs() {
				uni.pageScrollTo({
					scrollTop: 1000000,
					duration: 3
				})
			}

		},
		onShareAppMessage: function() {
			let jobValue = this.jobValue;
			return {
				title: jobValue.job_title
			}
		},
		onShareTimeline: function() {
			let jobValue = this.jobValue;
			return {
				title: jobValue.job_title,
				imageUrl: this.businessLogo
			}

		},
		onAddToFavorites: function() {

		},
		onReady: function() {
			var that = this;
			let data = {
				job_id: that.jobId,
				token: uni.getStorageSync('token')
			}
			jobs.jobViews(data).then(res => {
				console.log(res)
			}).catch(err => {
				console.log(err)
			})
		}
	}
</script>

<style>
	@import url("@/common/jobs/details.css");
	@import url("@/common/nav/nav.css");
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
		background-image: url("/pagesA/static/arrow-right.png");
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

	.hideCanvasView {
		position: relative;
	}

	.hideCanvas {
		position: fixed;
		top: -99999upx;
		left: -99999upx;
		z-index: -99999;
	}

	.flex_row_c_c {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}

	.modalView {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		opacity: 0;
		outline: 0;
		transform: scale(1.2);
		perspective: 2500upx;
		background: rgba(0, 0, 0, 0.6);
		transition: all .3s ease-in-out;
		pointer-events: none;
		backface-visibility: hidden;
		z-index: 999;
	}

	.modalView.show {
		opacity: 1;
		transform: scale(1);
		pointer-events: auto;
	}

	.flex_column {
		display: flex;
		flex-direction: column;
	}

	.backgroundColor-white {
		background-color: white;
	}

	.border_radius_10px {
		border-radius: 10px;
	}

	.padding1vh {
		padding: 1vh;
	}

	.posterImage {
		width: 60vw;
	}

	.flex_row {
		display: flex;
		flex-direction: row;
	}

	.marginTop2vh {
		margin-top: 2vh;
	}
</style>
