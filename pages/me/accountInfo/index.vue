<template>
	<view class="uni-flex uni-column ">
		<view class="index-container">
			<view class="flex-item  nickname" >
				<text v-if="identity==1">{{i18n.accountinfoname}}: {{educatorInfo.first_name}} {{educatorInfo.last_name}}</text>
				<text v-if="identity==2">{{i18n.accountinfoname}}: {{businessInfo.first_name}} {{businessInfo.last_name}}</text>
				<text v-if="identity==3">{{i18n.accountinfoname}}: {{vendorInfo.first_name}} {{vendorInfo.last_name}}</text>
				<text v-if="identity==4">{{i18n.accountinfoname}}: {{nickname}}</text>
			</view>
			<view class="flex-item level" v-if="identity==1">
				<view v-if="educatorInfo.level==1"><text>{{i18n.accountinfolevelofmembership}}: {{i18n.accountinfobasicmember}}</text></view>
				<view v-if="educatorInfo.level==2"><text>{{i18n.accountinfolevelofmembership}}: {{i18n.accountinfopromember}}</text></view>
				<view v-if="educatorInfo.level==3"><text>{{i18n.accountinfolevelofmembership}}: {{i18n.accountinfoplusmember}}</text></view>
			</view>
			<view class="flex-item level" v-if="identity==2">
				<view v-if="businessInfo.level==1"><text>{{i18n.accountinfolevelofmembership}}: {{i18n.accountinfobasicmember}}</text></view>
				<view v-if="businessInfo.level==2"><text>{{i18n.accountinfolevelofmembership}}: {{i18n.accountinfopromember}}</text></view>
				<view v-if="businessInfo.level==3"><text>{{i18n.accountinfolevelofmembership}}: {{i18n.accountinfoplusmember}}</text></view>
			</view>
			<view class="flex-item level" v-if="identity==3">
				<view v-if="vendorInfo.level==1"><text>{{i18n.accountinfolevelofmembership}}: {{i18n.accountinfobasicmember}}</text></view>
				<view v-if="vendorInfo.level==2"><text>{{i18n.accountinfolevelofmembership}}: {{i18n.accountinfopromember}}</text></view>
				<view v-if="vendorInfo.level==3"><text>{{i18n.accountinfolevelofmembership}}: {{i18n.accountinfoplusmember}}</text></view>
				
			</view>
			<view class="flex-item email" v-if="email!=''">
				<text>{{i18n.accountinfoemail}}: {{email}}</text>
			</view>
			<view class="flex-item phone" v-if="phone!=''">
				<text>{{i18n.accountinfophone}}: {{phone}}</text>
			</view>
			<view class="flex-item phone" v-if="businessInfo.business_type_name !='' && identity==2" >
				<text > Category: {{businessInfo.business_type_name}}</text>
			</view>
			<view class="flex-item phone" v-if="vendorInfo.vendor_type_name !='' && identity==3" >
				<text > Category: {{vendorInfo.vendor_type_name}}</text>
			</view>
			
		</view>
		<view class="flex-item home-button">
			<button type="default" @click="turnBack" >Go Back</button>
		</view>
		<view class="flex-item help-button">
			<button type="default" @click="showContactStatus=true" >{{i18n.accountinfoneedhelp}}</button>
		</view>
		<view class="flex-item back-button">
			<button type="default" v-if="(identity==2 && businessInfo.level!=3) || (identity==3 && vendorInfo.level !=3)" @click="upgradeLevel" >
				{{i18n.accountinfoupgrade}}
			</button>
		</view>
		<contactus @close="closeContact" :showContact="showContactStatus" ></contactus>
	</view>
</template>


<script>
	import contactus from "@/components/xll-contact-us/xll-contact-us.vue";
	import profile from '@/api/profile.js';
	import login from '@/api/login.js';
	export default {
		data() {
			return {
				nickname: '',
				email: "",
				phone: "",
				educatorName: '',
				businessName: '',
				vendorName: '',
				educatorInfo: '',
				businessInfo: "",
				vendorInfo: "",
				showContactStatus:false,
				identity:0

			}
		},
		computed: {
			i18n() {
				return this.$t('index')
			}
		},
		components:{
			contactus
		},
		onLoad() {
			var that = this;
			that.identity = uni.getStorageSync('identity');
			that.getBasicInfo()

		},
		methods: {
			upgradeLevel() {
				uni.navigateTo({
					url: '/pages/me/upgrade'
				})
			
			},
			closeContact(e){
				// console.log(e)
				this.showContactStatus=false;
			},
			getBasicInfo() {
				var that = this;
				let data = {
					id: uni.getStorageSync('uid'),
					token: uni.getStorageSync('token'),
					identity: that.identity
				}
				profile.getBasicInfo(data).then(res => {
					console.log(res)
					if (res.code == 200) {
						this.nickname = res.message.nickname;
						this.email = res.message.email;
						this.phone = res.message.phone;
						if (res.message.educator_info) {
							this.educatorInfo = res.message.educator_info;
						}
						if (res.message.business_info) {
							this.businessInfo = res.message.business_info;
							this.businessName = res.message.business_info.business_name;
						}
						if (res.message.vendor_info) {
							this.vendorInfo = res.message.vendor_info;
							this.vendorName = res.message.vendor_info.vendor_name;
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
			turnBack() {
				uni.navigateBack({
					delta: 1
				})
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
	page {
		background-image: linear-gradient( 135deg, #79F1A4 10%, #0E5CAD 100%);
	}

	.index-container {
		width: 96%;
		margin: 0 auto;
		margin-top: 20%;
		border-radius: 20rpx;
		/* border: 1rpx solid red; */
		background-color: rgba(0, 0,0, 0.4);
		box-shadow: 0 0 30rpx 0 rgba(43, 86, 112, .1);
	}

	.nickname,
	.email,
	.phone,
	.level {
		width: 90%;
		margin: 0 auto;
		padding-left: 20rpx;
		margin-top: 10rpx;
		color: #FFFFFF;
		border-radius: 20rpx;
		line-height: 80rpx;

	}

	text {
		font-size: 34rpx;
	}
	.help-button{
		position: fixed;
		z-index: 100;
		bottom: 200rpx;
		left: 0;
		right: 0;
		margin: auto;
	}
	.help-button button{
		width: 80%;
		height: 80rpx;
		line-height: 80rpx;
		background-color: #B1C452;
		color: #FFFFFF;
		border-radius: 20rpx;
		font-size: 34rpx;
	}
	.back-button {
		position: fixed;
		z-index: 100;
		bottom: 100rpx;
		left: 0;
		right: 0;
		margin: auto;
	}

	.back-button button {
		width: 80%;
		height: 80rpx;
		line-height: 80rpx;
		background-color: #0AA0A8;
		color: #FFFFFF;
		border-radius: 20rpx;
		font-size: 34rpx;
	}
	
	.home-button {
		position: fixed;
		z-index: 100;
		bottom: 300rpx;
		left: 0;
		right: 0;
		margin: auto;
	}
	
	.home-button button {
		width: 80%;
		height: 80rpx;
		line-height: 80rpx;
		background-color: #0AA0A8;
		color: #FFFFFF;
		border-radius: 20rpx;
		font-size: 34rpx;
	}
</style>
