<template>
	<view class="uni-flex uni-column add-container">
		<view class="flex-item xll-single">
			<view class="xll-single-title">
				{{i18n.eventseventtype}}
			</view>
			<u-radio-group v-model="valueOne" @change="radioGroupChangeOne">
				<u-radio active-color="#0aa0a8" label-size="30" v-for="(item, index) in listOne" :key="index" :name="item.name"
				 :disabled="item.disabled" @change="radioChangeOne(item.id)">
					{{item.name}}
				</u-radio>
			</u-radio-group>
		</view>
		<view class="flex-item xll-input">
			<view class="xll-input-title">{{i18n.eventseventname}}</view>
			<view class="xll-input-input"><input type="text" v-model="eventNameValue" placeholder="Please enter your event name" /></view>
		</view>
		<view class="flex-item xll-textarea">
			<view class="xll-textarea-title">
				{{i18n.eventsdealordfem}}
			</view>
			<view class="xll-textarea-con">
				<fuck-textarea :maxlength="200" v-model="infoValue" :placeholder="i18n.eventsdealordfemph"></fuck-textarea>
			</view>
		</view>
		<view class="flex-item xll-date" >
			<view class="xll-date-title">{{i18n.eventseventdate}}  <text class="error-star">*</text> </view>
			<view class="xll-date-date" @click="showDate=true" v-if="dateValueStatus===false">{{i18n.eventschoosedate}}</view>
			<view class="xll-date-date" @click="showDate=true" v-if="dateValueStatus">{{eventDateValue}}</view>
			<u-calendar :safe-area-inset-bottom="true" toolTip="Choose Date" max-date="2200-01-01" v-model="showDate" mode="date"
			 @change="dateChange"></u-calendar>
		</view>
		<view class="flex-item xll-date" v-if="dateValueStatus">
			<view class="xll-date-title">{{i18n.eventseventtime}}</view>
			<view class="xll-date-time">
				<view class="xll-start-time" @click="showStartTime=true" v-if="startTimeValueStatus===false">{{i18n.eventsstartime}}</view>
				<view class="xll-start-time" @click="showStartTime=true" v-if="startTimeValueStatus">{{startTimeValue}}</view>
				<view class="xll-end-time" @click="showEndTime=true" v-if="endTimeValueStatus===false">{{i18n.eventsendtime}}</view>
				<view class="xll-end-time" @click="showEndTime=true" v-if="endTimeValueStatus">{{endTimeValue}}</view>
				<u-picker v-model="showStartTime" mode="time" :params="params" :show-time-tag="false" confirm-text="confirm"
				 cancel-text="cancel" @confirm="startTimeConfrim"></u-picker>
				<u-picker v-model="showEndTime" mode="time" :params="params" :show-time-tag="false" confirm-text="confirm"
				 cancel-text="cancel" @confirm="endTimeConfrim"></u-picker>
			</view>
		</view>
		<view class="flex-item xll-textarea">
			<view class="xll-textarea-title">
				{{i18n.eventsdescription}}
			</view>
			<view class="xll-textarea-con">
				<fuck-textarea :maxlength="200" v-model="eventDescValue" :placeholder="i18n.eventsdescriptionph"></fuck-textarea>
			</view>
		</view>
		<!-- popular-city -->
		<view class="flex-item xll-single">
			<view class="xll-single-title">{{i18n.eventspopularcity}}</view>
			<view class="jobs-tags-container">
				<view class="jobs-tags">
					<view class="jobs-tags-item" v-for="(item,index) in popularLocationList" :key="index" :class="selectPopularLocationList.findIndex((city)=>city===item) == -1 ? '' : 'tags-active' "
					 @click="selectPopularLocation(item)">
						{{item.object_en}}
					</view>
				</view>
			</view>
		</view>
		<view class="flex-item xll-input">
			<view class="xll-input-title">{{i18n.eventplace}}</view>
			<view class="xll-input-input"><input type="text" v-model="eventPlace" :placeholder="i18n.eventplaceph" /></view>
		</view>
		<view class="flex-item xll-input">
			<view class="xll-input-title">{{i18n.eventdetailaddress}}</view>
			<view class="xll-input-input"><input type="text" v-model="eventLocationValue" :placeholder="i18n.eventdetailaddressph" /></view>
		</view>

		<view class="flex-item xll-file">
			<view class="xll-file-title">{{i18n.eventseventflyer}}</view>
			<view>(jpg, png)</view>
			<uImg ref="upimg" :isXllType="true" :cropperWidth="cropperWidth" :cropperHeight="cropperHeight" :canUploadFile="true"
			 :limit="limitNum" :uploadFileUrl="uploadFileUrl" :heaer="header" :formData="formData" :fileKeyName="name"
			 :uImgList.sync="uImgList" @uploadSuccess="uploadSuccess"></uImg>
		</view>

		<view class="flex-item xll-checkout">
			<view class="xll-checkout-title">{{i18n.eventseventprice}}</view>
			<view>
				<input type="number" v-model="checkoutValue"  :placeholder="i18n.eventseventpriceph"/>
			</view>
		</view>

		<!-- <view class="flex-item xll-agreement">
			<view class="xll-agreement-title">{{i18n.eventsagreement}}</view>
			<view>
				{{i18n.eventsagreementtxt}}
			</view>
			<view>
				<u-checkbox-group @change="checkboxGroupChange">
					<u-checkbox active-color="#0aa0a8" :label-disabled="true" @change="checkboxChange" v-model="item.checked" v-for="(item, index) in list"
					 :key="index" :name="item.name">
						<text @click="turnAgreement(index)" style="color: #004956;text-decoration: underline;">{{item.name}}</text>
					</u-checkbox>
				</u-checkbox-group>
			</view>
		</view> -->

		<view class="flex-item submit">
			<button type="default" @click="submit">{{i18n.eventssubmit}}</button>
		</view>
		
		<view class="popup" v-if="popupStatus"></view>
		<view class="popup-container" v-if="popupStatus">
			<view class="popup-container-text"> <text>Awesome!</text> <br>
				Your deals & events are subject to approval and cannot be edited once submitted. Please contact
				ESL Passport for support. </view>
			<button type="default" @click="submitPopup">Confirm</button>
		</view>

	</view>
</template>

<script>
	import uImg from '@/components/zhtx-uploadImg/zhtx-uploadImg.vue';
	import profile from '@/api/profile.js';
	import events from '@/api/events.js';
	import axios from 'axios';
	
	let toast = msg => {
		uni.showToast({
			title: msg,
			icon: 'none'
		});
	}
	export default {
		components: {
			uImg
		},
		data() {
			var _this = this;
			return {
				popupStatus: false,
				type: 1,
				showDate: false,
				showStartTime: false,
				showEndTime: false,
				params: {
					year: false,
					month: false,
					day: false,
					hour: true,
					minute: true,
					second: false,
					timestamp: true,
				},
				eventNameValue: '',
				infoValue: '',
				eventDescValue: '',
				eventLocationValue: '',
				eventDateValue: '',
				dateValueStatus: false,
				startTimeValue: '',
				startTimeValueStatus: false,
				endTimeValue: '',
				endTimeValueStatus: false,

				checkoutValue: '',
				selectAgreementList: [],
				detailValue: '',
				fileUrl: '',
				listOne: [{
						id: 1,
						name: 'Social',
						disabled: false
					},
					{
						id: 2,
						name: 'Professional',
						disabled: false
					}
				],
				// u-radio-group的v-model绑定的值如果设置为某个radio的name，就会被默认选中
				valueOne: 'Social',
				list: [{
						name: 'Contract',
						checked: false,
						disabled: false
					},
					{
						name: 'package payment',
						checked: false,
						disabled: false
					},
					{
						name: 'etc',
						checked: false,
						disabled: false
					}
				],
				
				isEditStatus: false,
				eventId: 0,
				popularLocationList: [], //热门地点
				selectPopularLocationList: [],
				fileName:"",
				eventPlace:'',
				
				type: 1,
				msg: '',
				limitNum: 1,
				uploadFileUrl: _this.$uploadFileUrl, //替换成你的后端接收文件地址
				name: 'file[]', //上传的名字
				header: { // 如果需要header，请上传
				},
				formData: {},
				uImgList: [],
				uploadFileList: [], //上传之后的图片链接
				source: '',
				userImageList: [],
				cropperHeight: 400,
				cropperWidth: 300

			}
		},
		computed: {
			i18n() {
				return this.$t('index')
			}

		},
		onLoad(option) {
			if (option.id != '' && option.id != undefined) {
				this.getDetail(option.id);
				this.isEditStatus = true;
				this.eventId = option.id;

			}
			this.getSubObject(71)
		},
		methods: {
			uploadSuccess(result) {
				console.log(result)
				if (result === 1) {
					uni.navigateBack({
						delta: 1
					})
				} else {
					this.fileUrl = result.file_url;
					this.fileName = result.file_name;
				}
			
			},
			selectPopularLocation(value) {

				let index = this.selectPopularLocationList.findIndex(function(element, index, array) {
					return element === value;
				})

				if (index == -1) {
					let len = this.selectPopularLocationList.length;

					if (len > 0) {
						this.selectPopularLocationList.splice(len - 1, 1);
					}
					this.selectPopularLocationList.push(value);
				} else {
					this.selectPopularLocationList.splice(index, 1);
				}
				

			},
			// 选中任一radio时，由radio-group触发
			radioGroupChangeOne(e) {
				console.log(e);
			},
			radioChangeOne(id) {
				console.log(id);
				this.type = id;
			},
			// 选中某个复选框时，由checkbox时触发
			checkboxChange(e) {
				console.log(e);
			},
			eventCheckoutChange(e) {
				console.log(e);
				this.checkoutValue = e;
			},
			// 选中任一checkbox时，由checkbox-group触发
			checkboxGroupChange(e) {
				console.log(e);
				this.selectAgreementList = e;
			},
			turnAgreement(index) {
				console.log(index);
			},
			openPopup() {
				this.$refs.popup.open()
			},
			closePopup() {
				this.$refs.popup.close()
			},
			// 上传附件按钮 绑定file的点击事件
			uploadBtn() {
				return document.getElementById("file").click();
			},
			submitPopup(){
				uni.navigateBack({
					delta: 1
				})
			},
			submit() {
				var that = this;
				if(that.startTimeValue == '' || that.eventDateValue == '' || that.endTimeValue == ''){
					return uni.showToast({
						title:that.i18n.eventsaddchooseeventdate,
						icon:'none'
					})
				}
					
				if(that.startTimeValue != ''){
					var start = that.eventDateValue + ' ' + that.startTimeValue + ':00';
				}else{
					var start = that.eventDateValue + ' ' + '00:00:00';
				}
				if(that.endTimeValue != ''){
					var end = that.eventDateValue + ' ' + that.endTimeValue + ':00';
				}else{
					var end = that.eventDateValue + ' ' + '00:00:00';
				}
				
				if(that.startTimeValue != '' && that.endTimeValue != '' &&  that.endTimeValue <= that.startTimeValue){
					return uni.showToast({
						title:this.i18n.eventsstarttimeorendtimeph,
						icon:'none'
					})
				}
								
				var data = {};
				var city_id = 0;
				if (that.selectPopularLocationList.length > 0) {
					city_id = that.selectPopularLocationList[0].id;
				}
				if (that.isEditStatus) {
					data = {
						token: uni.getStorageSync('token'),
						user_id: Number(uni.getStorageSync('uid')),
						name: that.eventNameValue,
						desc: that.eventDescValue,
						type_desc: that.infoValue,
						pay_money: Number(that.checkoutValue),
						date: that.eventDateValue,
						file: that.fileUrl,
						file_name:that.fileName,
						is_all: that.type,
						location: that.eventLocationValue,
						event_id: Number(that.eventId),
						city:city_id,
						event_place:that.eventPlace,
						start_time: start,
						end_time: end,
					}
				} else {
					data = {
						token: uni.getStorageSync('token'),
						user_id: Number(uni.getStorageSync('uid')),
						name: that.eventNameValue,
						desc: that.eventDescValue,
						type_desc: that.infoValue,
						pay_money: Number(that.checkoutValue),
						date: that.eventDateValue,
						file: that.fileUrl,
						file_name:that.fileName,
						is_all: that.type,
						location: that.eventLocationValue,
						city:city_id,
						event_place:that.eventPlace,
						start_time: start,
						end_time: end,
					}
				}

				// console.log(data);
				events.addEvent(data).then(res => {
					console.log(res);
					if (res.code == 200) {
						this.popupStatus=true;
					} else {
						toast(res.msg);
					}

				}).catch(error => {
					console.log(error);
				})
			},
			getDetail(id) {
				var that = this;
				let data = {
					token: uni.getStorageSync('token'),
					event_id: id
				}
				events.detail(data).then(res => {
					console.log(res);
					if (res.code == 200) {
						that.detailValue = res.message;
						that.type = res.message.is_all;
						that.eventNameValue = res.message.name;
						that.eventDescValue = res.message.type_desc;
						that.eventLocationValue = res.message.location;
						that.eventPlace = res.message.event_place
						if (res.message.type == 1) {
							this.valueOne = "Social";
						}
						if (res.message.type == 2) {
							this.valueOne = 'Professional';
						}
						that.infoValue = res.message.desc;

						that.filename = res.message.file_name;
						that.showfile = true;
						that.fileUrl = res.message.file;

						that.checkoutValue = res.message.pay_money;

						that.eventDateValue = res.message.date;
						that.dateValueStatus = true;
						if (res.message.city !="" ) {
							// console.log(this.popularLocationList);
							let b = this.popularLocationList.filter(item => item.id == res.message.city)
							this.selectPopularLocationList=b;
						}


					} else {
						uni.showToast({
							title: res.msg,
							icon: "none"
						})
					}
				}).catch(error => {
					console.log(error);
				})
			},
			dateChange(e) {
				console.log(e)
				this.eventDateValue = e.result;
				this.dateValueStatus = true;
			},
			startTimeConfrim(e) {
				console.log(e);
				this.startTimeValue = e.hour + ':' + e.minute;
				this.startTimeValueStatus = true;
			},
			endTimeConfrim(e) {
				console.log(e);
				this.endTimeValue = e.hour + ':' + e.minute;
				this.endTimeValueStatus = true;
			},
			getSubObject(pid) {
				let data = {
					token: uni.getStorageSync('token'),
					pid: pid
				}
				profile.getUserObjectList(data).then(res => {
					// console.log(res)
					if (res.code == 200) {
						let result = res.message;
						this.popularLocationList = result.filter(item => item.object_en === 'Shanghai')
						// console.log(this.popularLocationList)
					} else {
						toast(res.msg);
					}
				}).catch(error => {
					console.log(error)
				})

			}

		}
	}
</script>

<style>
	@import url("@/common/me/events/add.css");
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
	}
	
	.tags-active {
		background-color: #00CE47;
		color: #FFFFFF;
	}
	
	.popup{
		position: fixed;
		z-index: 1000;
		top: 0;
		right: 0;
		left: 0;
		bottom: 0;
		margin: auto;
		width: 100%;
		height: 100%;
		background-color: rgba(0,0,0,0.4);
	}
	.popup-container{
		position: fixed;
		z-index: 1100;
		top: 0;
		right: 0;
		left: 0;
		bottom: 0;
		margin: auto;
		width: 80%;
		height: 520rpx;
		background-color: #FFFFFF;
		color: #000000;
		border-radius: 40rpx;
		padding: 20rpx;
	}
	.popup-container-text{
		font-size: 34rpx;
		height: 380rpx;
		text-align: center;
	}
	.popup-container-text text{
		font-weight: 700;
	}
	.popup-container button{
		background-color: #004956;
		color: #FFFFFF;
		border-radius: 40rpx;
		font-size: 34rpx;
		line-height: 80rpx;
	}
	
	.error-star{
		font-size: 40rpx;
		font-weight: 700;
		color: #FF3333;
		margin-left: 10rpx;
	}
	.xll-file-btn{
		width: 100%;
		height: 70rpx;
	}
</style>
