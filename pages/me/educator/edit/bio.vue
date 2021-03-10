<template>
	<view class="uni-flex uni-column bio-bg">
		<view class="flex-item bio-title">
			{{i18n.profilebio}}
		</view>
		<view class="flex-item bio-form">
			<view class="bio-form-bio">
				<view class="bio-form-label">{{i18n.profilebio}}</view>
				<fuck-textarea :maxlength="200" v-model="bioValue" placeholder="Please enter your bio"></fuck-textarea>
			</view>
			<view>
				<view class="bio-form-label">{{i18n.profilehobbies}}</view>
				<view class="jobs-tags-container">
					<view class="jobs-tags">
						<view class="jobs-tags-item" :class=" selectInfoListList.indexOf(item) == -1 ? '' : 'tags-active' "
						 v-for="(item,index) in infoList" :key="index" @click="selectInfoList(item)">
							{{item}}
						</view>
						<view class="jobs-tags-item" :class=" selectInfoListList.indexOf(item) == -1 ? '' : 'tags-active' "
						 v-for="(item,key) in ownInfoListList" :key="item" @click="selectInfoList(item)">
							{{item}}
						</view>
					</view>
					
					<view class="jobs-tags-item" v-if="addInfoListStatus==false" @click="addInfoListStatus=true">add+</view>
					<view class="jobs-tags-add">
						<view class="jobs-tags-item-add" v-if="addInfoListStatus">
							<input type="text" v-model="ownInfoListValue" placeholder="Add your hobbies">
							<view class="jobs-tags-item-add-button">
								<button type="default" v-if="ownInfoListValue.length>0" @click="addOwnInfoList">Confirm</button>
								<button type="default" v-if="ownInfoListValue.length==0" @click="addInfoListStatus=false">Cancel</button>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="flex-item bio-submit">
			<button type="default" @click="bioSubmit">{{i18n.profileeditsubmit}}</button>
		</view>
	</view>
</template>

<script>
	import fuckTextarea from '@/components/fuck-textarea/fuck-textarea.vue'
	import profile from '@/api/profile.js'

	export default {
		data() {
			return {
				bioValue: '',
				headlineValue: '',
				disabled: false, //不禁用
				// 默认的数组 不填默认的是空数组
				selectlist: [],
				infoList: ['Fitness', 'Photography', 'Travel'],
				// 默认提示
				placeholder: 'Please enter your hobbies',
				hobbiesStr: '',

				editInfoList: [],
				addInfoListStatus: false,
				ownInfoListValue: '',
				ownInfoListList: [],
				selectInfoListList: [],
				selectInfoListArr: [],
			}
		},
		components: {
			fuckTextarea
		},
		onShow() {

		},
		computed: {
			i18n() {
				return this.$t('index')
			}
		},
		onLoad(option) {
			var that = this;
			this.getBasicInfo();
		},
		onUnload() {

		},
		methods: {
			addOwnInfoList() {
				this.addInfoListStatus = false;
				var index = this.selectInfoListList.indexOf(this.ownInfoListValue);
				if (index == -1) {
					if (this.selectInfoListList.length > 4) {
						return false;
					}
					this.selectInfoListList.push(this.ownInfoListValue);
					this.ownInfoListList.push(this.ownInfoListValue);
					this.ownInfoListValue = '';
					
				} else {
					this.selectInfoListList.splice(index, 1);
				}
			},
			selectInfoList(value, type) {
				
				var index = this.selectInfoListList.indexOf(value);
				if (index == -1) {
					if (this.selectInfoListList.length > 4) {
						return false;
					}
					this.selectInfoListList.push(value);

				} else {
					this.selectInfoListList.splice(index, 1);
				}
				console.log(this.selectInfoListList)
			},
			bioSubmit() {
				var that = this;
				let hobbiesStr = this.selectInfoListList.join(',');
				let data = {
					bio: that.bioValue,
					hobbies: hobbiesStr,
					token: uni.getStorageSync('token')
				}
				profile.addEduBasic(data).then(res => {
					console.log(res)
					if (res.code == 200) {
						uni.navigateBack({
							delta: 1
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
						let educatorInfo = res.message.educator_info;
						console.log(educatorInfo)
						that.bioValue = educatorInfo.bio;
						let hobbies = educatorInfo.hobbies;
						if(hobbies != ''){
							that.infoList =hobbies.split(',');
							that.selectInfoListList = hobbies.split(',');
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

		}
	}
</script>

<style>

	page {
		background-color: #F4F5F6;
	}

	.bio-title {
		text-align: center;
		font-size: 36rpx;
		font-weight: 600;
		background-color: #004956;
		color: #FFFFFF;
		height: 200rpx;

		line-height: 200rpx;
	}

	.bio-form {
		width: 96%;
		margin: 0 auto;
		margin-top: 20rpx;
		padding: 20rpx;
		background-color: #FFFFFF;
		border-radius: 20rpx;
	}

	.bio-form-bio {}
		
	.bio-form-label{
		font-size: 34rpx;
		font-weight: 700;
	}

	.bio-submit {
		width: 80%;
		margin: 0 auto;
		margin-top: 10%;
		padding-bottom: 100rpx;

	}

	.bio-submit button {
		background-color: #004956;
		color: #FFFFFF;
		height: 80rpx;
		border-radius: 80rpx;
		line-height: 80rpx;
	}

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
	.jobs-tags-add{
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
		border-radius:20rpx;
	}
	
	.tags-active {
		background-color: #00CE47;
		color: #FFFFFF;
	}
</style>
