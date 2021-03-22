<template>
	<view class="uni-flex uni-column role-bg">
		<view class=" flex-item role-logo animate__animated  animate__rotateIn">
			<image class="" src="../../static/esl-logo.png" lazy-load="true"></image>
		</view>
		<view class="flex-item role-intro animate__animated  animate__lightSpeedInRight">
			<view class="role-intro-1">{{i18n.basicinfowindowheader}}  </view>
		</view>

		<view class="flex-item role-form">
			<view class="role-form-item">
				<view class="role-form-item-label">{{i18n.Basicinfofirstname}}:</view>
				<input type="text" name="firstname" v-model="firstname" :placeholder="i18n.Basicinfofirstname">
			</view>
			<!-- <view class="role-form-item">
				<input type="text" name="nickname" v-model="nickname" :placeholder="i18n.basicinfonickname">
			</view> -->
			<!-- 	<view class="role-form-item">
				<input type="text"  name="applyContact"  v-model="applicationContact" :placeholder="i18n.basiceduapplicationcontact"/>
			</view> -->
			<view class="role-form-item">
				<view class="role-form-item-label">{{i18n.eduwechatid}}:</view>
				<input type="text" name='wxid' v-model="wxId" :placeholder="i18n.eduwechatid" />
			</view>
			<!-- 	<view class="role-form-item">
				<input type="text" name='email' v-model="email" :placeholder="i18n.basiceduemail" />
			</view> -->
			<view class="role-form-item">
				<view class="role-form-item-label">{{i18n.nationality}}:</view>
				<view class="nationality-1" v-if="nationalitySelectStatus===false" @click="turnNationalityPage">
					{{i18n.nationality}}
				</view>
				<view class="nationality-2" v-if="nationalitySelectStatus" @click="turnNationalityPage">
					{{nationality}}
				</view>
			</view>
			<view class="categories">
				<view class="category-title">
					{{i18n.basicinfoeducategory}}:
				</view>
				<view class="categories-tags">
					<view class="categories-tags-item" :class="selectEducatorTypeList.indexOf(item.id) == -1 ? '' : 'tag-active' "
					 v-for="(item,k) in range" :key="k" @click="selectEducatorType(item)">
						{{item.identity_name}}
					</view>
				</view>
			</view>

		</view>

		<view class="role-form-done">
			<button class="btn-submit" @click="eduSubmit">
				{{i18n.basicinfobuton}}
			</button>
		</view>


	</view>
</template>

<script>
	import profile from '@/api/profile.js'
	import login from '@/api/login.js'

	export default {
		data() {
			return {
				range: [],
				firstname: "",
				nationality: "",
				nickname: '',
				email: '',
				wxId: '',
				applicationContact: '',
				educatorType: '',
				selectEducatorTypeList: [],
				nationalitySelectStatus: false,
			}
		},
		computed: {
			i18n() {
				return this.$t('index')
			}
		},
		onLoad(option) {
			var that = this;
			this.subCateList()
			uni.$on('nationalityObj', function(data) {
				that.nationality = data.name;
				that.nationalitySelectStatus = true;
			})
		},
		onUnload() {
			uni.$off('nationalityObj');
		},
		methods: {
			selectEducatorType(item) {
				if (this.selectEducatorTypeList.indexOf(item.id) == -1) {
					this.selectEducatorTypeList.push(item.id);
				} else {
					this.selectEducatorTypeList.splice(this.selectEducatorTypeList.indexOf(item.id), 1);
				}
				// console.log(this.selectEducatorTypeList);
			},
			turnNationalityPage() {
				uni.navigateTo({
					url: '/pages/me/profile/countriesList'
				})
			},
			subCateList: function() {
				let data = {
					pid: 1,
					tree: 1
				}
				let rangeData = [];

				profile.getSubCateLists(data).then(res => {
					// console.log(res)
					if (res.code == 200) {
						this.range = res.message;
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
					}
				}).catch(err => {
					console.log(err)
				})
			},
			eduSubmit: function(e) {

				var that = this;

				if (that.firstname.length < 1) {
					return uni.showToast({
						title: that.i18n.frstnameerror,
						icon: 'none'
					})
				}
				// if(that.applicationContact == ''){
				// 	return uni.showToast({
				// 		title: that.i18n.basiceduapplicationcontactph,
				// 		icon: "none"
				// 	})
				// }

				if (that.nationality == '') {
					return uni.showToast({
						title: that.i18n.nationalityerror,
						icon: "none"
					})
				}

				if (that.wxId == '') {
					return uni.showToast({
						title: that.i18n.eduwechatidph,
						icon: 'none'
					})
				}

				let educatorType = that.selectEducatorTypeList.join(',');

				if (that.selectEducatorTypeList.length <= 0) {
					return uni.showToast({
						title: that.i18n.categoryerror,
						icon: "none"
					})
				}

				var formData = {
					unionid: uni.getStorageSync('unionid'),
					sub_identity: educatorType,
					first_name: that.firstname,
					nationality: that.nationality,
					nickname: that.nickname,
					token: uni.getStorageSync('token'),
					country: that.country,
					province: that.province,
					city: that.city,
					lon: that.lon,
					lat: that.lat,
					apply_contact: that.applicationContact,
					email: that.email,
					wx_id: that.wxId
				}
				uni.showLoading({
					title: 'loading'
				})
				profile.addEduBasic(formData).then(res => {
					// console.log(res)
					if (res.code == 200) {
						//切换身份
						let identity_data = {
							identity: 1,
							unionid: uni.getStorageSync('unionid'),
							token: uni.getStorageSync('token')
						}
						uni.setStorageSync('identity',1)
						// console.log(identity_data)
						login.changeLanguageAndIdentity(identity_data).then(res => {
							// console.log(res)
							if (res.code == 200) {
								uni.reLaunch({
									url: '/pages/me/welcome?firstname=' + that.firstname
								})
							} else {
								uni.showToast({
									title: res.msg,
									icon: 'none'
								})
							}

						}).catch(err => {
							console.log(err)
						})
						//end

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
		onReady() {

		}
	}
</script>

<style>
	@import url("@/common/role/index.css");
</style>
