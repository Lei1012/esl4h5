<template>
	<view class="uni-flex uni-column add-container">
		<view class="flex-item xll-single">
			<view class="xll-single-title">
				{{i18n.dealsdealordiscount}} <text class="error-star">*</text>
			</view>
			<u-radio-group v-model="valueOne" @change="radioGroupChangeOne">
				<u-radio active-color="#0aa0a8" label-size="30" v-for="(item, index) in listOne" :key="index" :name="item.name"
				 :disabled="item.disabled" @change="radioChangeOne(item.id)">
					{{item.name}}
				</u-radio>
			</u-radio-group>
		</view>
		<view class="flex-item xll-textarea">
			<view class="xll-textarea-title">
				{{i18n.dealsdealordisinfo}} <text class="error-star">*</text>
			</view>
			<view class="xll-textarea-con">
				<fuck-textarea :maxlength="30" v-model="dealTitle" :placeholder="i18n.dealsdealordisinfoph"></fuck-textarea>
			</view>
		</view>
		<view class="flex-item xll-textarea">
			<view class="xll-textarea-title">
				{{i18n.dealsadddealdescription}} <text class="error-star">*</text>
			</view>
			<view class="xll-textarea-con">
				<fuck-textarea :maxlength="100" v-model="infoValue" :placeholder="i18n.dealsadddealdescriptionph"></fuck-textarea>
			</view>
		</view>
		<!-- All Locations or Limited?  -->
		<view class="flex-item xll-single">
			<view class="xll-single-title">
				{{i18n.dealsalllocationorlimited}} <text class="error-star">*</text>
			</view>
			<u-radio-group v-model="valueTwo" @change="radioGroupChangeTwo">
				<u-radio active-color="#0aa0a8" label-size="30" v-for="(item, index) in listTwo" :key="index" :name="item.name"
				 :disabled="item.disabled" @change="radioChangeTwo(item.id)">
					{{item.name}}
				</u-radio>
			</u-radio-group>
		</view>
		<view class="flex-item xll-file" v-if="isAll==1">
			<!-- <view>(csv, excel, .numbers, xls)</view> -->
			<view class="xll-file-file">
				<uImg ref="upimg" :isXllType="true" :cropperWidth="cropperWidth" :cropperHeight="cropperHeight" :canUploadFile="true"
				 :limit="limitNum" :uploadFileUrl="uploadFileUrl" :heaer="header" :formData="formData" :fileKeyName="name"
				 :uImgList.sync="uImgList" @uploadSuccess="uploadSuccess"></uImg>
			</view>
			<view class="xll-file-tips">If have more locations , please upload file !</view>
		</view>
		
		<!-- popular-city -->
		<view class="flex-item xll-single">
			<view class="xll-single-title">{{i18n.dealspopularcity}} </view>
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
			<view class="xll-input-title">{{i18n.dealsaddaddress}} <text class="error-star">*</text></view>
			<view class="xll-input-input"><input type="text" v-model="dealLocationValue" :placeholder="i18n.dealsaddaddressph" /></view>
		</view>
		<!-- <view class="flex-item xll-dog-friendly">
			<view class="xll-single-title">
				{{i18n.dealsdogfriendly}} 
			</view>
			<switch style="margin-left: 20rpx;" :checked="allowedDogValue==1" color="#0AA0A8" @change="dogChange" />
		</view> -->
		<!-- <view class="flex-item xll-single">
			<view class="xll-single-title">
				{{i18n.dealscontractdur}} <text class="error-star">*</text>
			</view>
			<u-radio-group v-model="valueThree" @change="radioGroupChangeThree">
				<u-radio active-color="#0aa0a8" label-size="30" v-for="(item, index) in listThree" :key="index" :name="item.name"
				 :disabled="item.disabled" @change="radioChangeThree(item.id)">
					{{item.name}}
				</u-radio>
			</u-radio-group>
		</view> -->

		<!-- <view class="flex-item xll-checkout">
			<view class="xll-checkout-title">{{i18n.dealsdealcheckout}} </view>
			<view>
				<input type="number" v-model="checkoutValue"  :placeholder="i18n.dealsdealcheckoutph" />
				
			</view>
		</view> -->

		<view class="flex-item xll-agreement">
			<view class="xll-agreement-title">{{i18n.dealsagreement}} <text class="error-star">*</text></view>
			<!-- <view>
				{{i18n.dealsunderstandtxt}} 
			</view> -->
			<view class="xll-agreement-content">
				<u-checkbox-group @change="checkboxGroupChange">
					<u-checkbox active-color="#0aa0a8" :label-disabled="true" @change="checkboxChange" v-model="item.checked" v-for="(item, index) in list"
					 :key="index" :name="item.name">
						<text class="xll-agreement-text" @click="turnAgreement(index)">{{item.name}}</text>
					</u-checkbox>
				</u-checkbox-group>
			</view>
		</view>

		<view class="flex-item submit">
			<button type="default" @click="submit">Submit</button>
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
	import deals from '@/api/deals.js';
	import axios from 'axios';
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
				popupStatus: false,
				allowedDogValue: 0,
				type: 1,
				isAll: 1,
				dueContract: 1,
				dealTitle:'',
				infoValue: '',
				checkoutValue: '',
				dealLocationValue: '',
				selectAgreementList: [],
				detailValue: '',
				fileUrl: '',
				listOne: [{
						id: 1,
						name: this.$t('index').dealsadddeal,
						disabled: false
					},
					{
						id: 2,
						name: this.$t('index').dealsadddiscount,
						disabled: false
					}
				],
				// u-radio-group的v-model绑定的值如果设置为某个radio的name，就会被默认选中
				valueOne: this.$t('index').dealsadddeal,
				listTwo: [{
						id: 1,
						name: this.$t('index').dealsaddmorethanonelocation,
						disabled: false
					},
					{
						id: 0,
						name: this.$t('index').dealsaddonelocation,
						disabled: false
					}
				],
				valueTwo: this.$t('index').dealsaddmorethanonelocation,
				listThree: [{
						id: 1,
						name: this.$t('index').dealsaddoneyear,
						disabled: false
					},
					{
						id: 2,
						name: this.$t('index').dealsaddtwoyear,
						disabled: false
					}
				],
				valueThree: this.$t('index').dealsaddoneyear,
				list: [{
					name: this.$t('index').dealsunderstandtxt,
					checked: false,
					disabled: false
				}],
				
				isEditStatus: false,
				dealId: 0,
				popularLocationList: [], //热门地点
				selectPopularLocationList: [],
				fileName: '',
				
				
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
		components: {
			uImg
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
				this.dealId = option.id;
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
			dogChange(e) {
				console.log(e)
				if (e.detail.value) {
					this.allowedDogValue = 1
				} else {
					this.allowedDogValue = 0
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
			radioGroupChangeTwo(e) {
				console.log(e);
			},
			radioChangeTwo(id) {
				console.log(id)
				this.isAll = id;
			},
			radioGroupChangeThree(e) {
				console.log(e);
			},
			radioChangeThree(id) {
				this.dueContract = id;
			},
			// 选中某个复选框时，由checkbox时触发
			checkboxChange(e) {
				console.log(e);
			},
			dealCheckoutChange(e) {
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
			submitPopup() {
				uni.navigateBack({
					delta: 1
				})
			},
			submit() {
				var that = this;
				
				if(that.dealTitle == ''){
					return uni.showToast({
						title:this.i18n.dealsdealordisinfoph,
						icon:'none'
					})
				}
				
				if(that.infoValue == ''){
					return uni.showToast({
						title:this.i18n.dealsadddealdescriptionph,
						icon:'none'
					})
				}
				
				
				var city_id = 0;
				if (that.selectPopularLocationList.length > 0) {
					city_id = that.selectPopularLocationList[0].id;
				}else{
					// return uni.showToast({
					// 	title:this.i18n.dealsaddlocationcategoryph,
					// 	icon:'none'
					// })
				}
				
				if(that.dealLocationValue == ''){
					return uni.showToast({
						title:this.i18n.dealsaddaddressph,
						icon:'none'
					})
				}
				if (that.selectAgreementList.length < 1) {
					return uni.showToast({
						title: this.i18n.dealscheckedagreement,
						icon: 'none'
					})
				}
				var data = {};
				if (that.isEditStatus) {
					data = {
						token: uni.getStorageSync('token'),
						user_id: Number(uni.getStorageSync('uid')),
						deal_id: Number(that.dealId),
						type: that.type,
						is_all: that.isAll,
						due_contract: that.dueContract,
						pay_money: Number(that.checkoutValue),
						file: that.fileUrl,
						file_name: that.fileName,
						title:that.dealTitle,
						desc: that.infoValue,
						location: that.dealLocationValue,
						city: city_id,
						allowed_dog: that.allowedDogValue
					}
				} else {
					data = {
						token: uni.getStorageSync('token'),
						user_id: Number(uni.getStorageSync('uid')),
						type: that.type,
						is_all: that.isAll,
						due_contract: that.dueContract,
						pay_money: Number(that.checkoutValue),
						file: that.fileUrl,
						file_name: that.fileName,
						title:that.dealTitle,
						desc: that.infoValue,
						location: that.dealLocationValue,
						city: city_id,
						allowed_dog: that.allowedDogValue
					}
				}

				// console.log(data);
				deals.addDeals(data).then(res => {
					console.log(res);
					if (res.code == 200) {
						this.popupStatus = true;
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
					deal_id: id
				}
				deals.detail(data).then(res => {
					console.log(res);
					if (res.code == 200) {
						that.detailValue = res.message;
						that.type = res.message.type;
						if (res.message.type == 1) {
							this.valueOne = "Deal";
						}
						if (res.message.type == 2) {
							this.valueOne = 'Discount';
						}
						that.infoValue = res.message.desc;
						that.dealTitle = res.message.title;
						that.isAll = res.message.is_all;
						if (that.isAll == 1) {
							this.valueTwo = "All Locations";
						}
						if (that.isAll == 0) {
							this.valueTwo = 'Limited'
						};

						that.filename = res.message.file_name;
						that.showfile = true;
						that.fileUrl = res.message.file;
						that.dueContract = res.message.due_contract;
						if (that.dueContract == 1) {
							this.valueThree = '1 years'
						}
						if (that.dueContract == 2) {
							this.valueThree = '2 years'
						}
						that.checkoutValue = res.message.pay_money;
						that.dealLocationValue = res.message.location;
						if (res.message.city != "") {
							// console.log(this.popularLocationList);
							let b = this.popularLocationList.filter(item => item.id == res.message.city)
							this.selectPopularLocationList = b;
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
			getSubObject(pid) {
				let data = {
					token: uni.getStorageSync('token'),
					pid: pid
				}
				profile.getUserObjectList(data).then(res => {
					console.log(res)
					if (res.code == 200) {
						let result = res.message;
						this.popularLocationList = result.filter(item => item.object_en === 'Shanghai')
						console.log(this.popularLocationList)
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
	@import url("@/common/me/deals/add.css");

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

	.popup {
		position: fixed;
		z-index: 1000;
		top: 0;
		right: 0;
		left: 0;
		bottom: 0;
		margin: auto;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.4);
	}

	.popup-container {
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

	.popup-container-text {
		font-size: 34rpx;
		height: 380rpx;
		text-align: center;
	}

	.popup-container-text text {
		font-weight: 700;
	}

	.popup-container button {
		background-color: #004956;
		color: #FFFFFF;
		border-radius: 40rpx;
		font-size: 34rpx;
		line-height: 80rpx;
	}

	.xll-file-file {
		width: 100%;
		/* height: 120rpx; */
	}

	.xll-file-tips {
		width: 100%;
		font-size: 30rpx;
		color: #00B3D2;
		/* text-decoration: underline; */
	}
	.xll-file-btn{
		width: 100%;
		height: 70rpx;
	}
	.error-star {
		font-size: 40rpx;
		font-weight: 700;
		color: #FF3333;
		margin-left: 10rpx;
	}
</style>
