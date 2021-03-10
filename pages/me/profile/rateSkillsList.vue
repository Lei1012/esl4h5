<template>
	<view class="uni-flex uni-column search-tags-bg">
		<view class="flex-item search-tags-search">
			<uni-search-bar v-model="searchValue" :radius="100" cancelText="Cancel" placeholder="Enter search content" @input="subjectInput"
			 @confirm="subjectSearch" @cancel="subjectCancel"></uni-search-bar>
		</view>
		<!-- 自定义添加语言 -->
		<view class="flex-item add-language">
			<input type="text" v-model="ownLanguageValue" placeholder="Add your language" />
			<button type="default" @click="addOwnLanguage()">add</button>
		</view>

		<view class="flex-item search-tags-box">
			<view v-if="ownLanguagesStatus" class="search-tags-box-item" v-for="(value,index) in ownLanguagesList" :key="value.object_en">
				<view class="tags-box-item-name">{{value.object_en}}</view>
				<view class="tags-box-item-rate">
					<u-rate :count="3" v-model="value.score" :current="value.score" custom-prefix="custom-icon" active-icon="xll-yuan" inactive-icon="circleo"
					 active-color="#b1c452" inactive-color="#b2b2b2" size="40" gutter="20" @change="onOwnChange($event,index,value)"
					 :disabled="objArr.findIndex(item=>item.object_name == value.object_en) == -1 && objArr.length == 10">
					</u-rate>
				</view>
			</view>
			<view v-if="filterStatus==false" class="search-tags-box-item" v-for="(value,index) in infoList" :key="value.id">
				<view class="tags-box-item-name">{{value.object_en}}</view>
				<view class="tags-box-item-rate">
					<u-rate :count="3" v-model="value.score" :current="value.score" custom-prefix="custom-icon" active-icon="xll-yuan" inactive-icon="circleo"
					 active-color="#b1c452" inactive-color="#b2b2b2" size="40" gutter="20" @change="onChange($event,index,value)"
					 :disabled="objArr.findIndex(item=>item.object_id==value.id) == -1 && objArr.length == 10">
					</u-rate>
				</view>
			</view>

			<!-- 搜索获取的列表 -->
			<view v-if="filterStatus" class="search-tags-box-item" v-for="(value,index) in filterList" :key="index">
				<view class="tags-box-item-name">{{value.item.object_en}}</view>
				<view class="tags-box-item-rate">
					<u-rate :count="3" custom-prefix="custom-icon" active-icon="xll-yuan" inactive-icon="circleo" active-color="#b1c452"
					 inactive-color="#b2b2b2" size="40" gutter="20" @change="onChangeFilter($event,index,value.item)" :disabled="objArr.findIndex(item=>item.object_id==value.item.id) == -1 && objArr.length == 10">
					</u-rate>
				</view>
			</view>

		</view>
		<view class="flex-item countries-bottom">
			<view class="bottom-confirm" @click="subjectSubmit">
				Update ( {{objArr.length}} )
			</view>
		</view>

	</view>
</template>

<script>
	import Fuse from 'fuse.js'
	import profile from '@/api/profile.js'
	export default {
		data() {
			return {
				searchValue: "",
				subjectSearchValue: '',
				rSelect: [],
				infoList: [],
				filterList: [],
				filterStatus: false,
				type: 0,
				objectIdArr: [],
				rateValue: 0,
				showRatePopup: false,
				selectIndex: 0,
				selectValue: '',
				selectRateData: [],
				objArr: [],
				ownLanguageValue: '',
				ownLanguagesList: [],
				ownLanguagesStatus: false,
			}
		},
		computed: {
			i18n() {
				return this.$t('index')
			}
		},
		onLoad(option) {
			this.type = option.type
			this.getUserObjectList(this.type)
			this.getBasicInfo()
		},
		methods: {
			addOwnLanguage() {
				let ownLanguageValue = this.ownLanguageValue;
				if (ownLanguageValue == '') {
					return uni.showToast({
						title: 'Can not be empty',
						icon: 'none'
					})
				}

				let obj = {
					id: 0,
					object_cn: ownLanguageValue,
					object_en: ownLanguageValue,
					p_name_cn: '语言',
					p_name_en: 'languages',
					pid: 2
				}
				this.ownLanguagesStatus = true;
				this.ownLanguagesList.push(obj);
				this.ownLanguageValue = '';

			},
			onChange(event, index, value) {
				// console.log(event)
				let obj = {
					object_id: value.id,
					score: event,
					object_name: value.object_en,
					object_pid: value.pid
				}
				let indexKey = this.objArr.findIndex(item => item.object_id == value.id)

				if (event > 0) {
					if (this.objArr.length > 10) {
						uni.showToast({
							title: 'Choose up to 10 tags',
							icon: 'none'
						})
					} else {
						if (indexKey == -1) {
							this.objArr.push(obj)
						} else {
							this.objArr[indexKey]['score'] = event
						}
					}

				} else {
					// this.objArr.splice(indexKey,1)
					let arr = [];
					this.objArr.forEach(item => {
						if (item.object_id != value.id) {
							arr.push(item)
						}
					})
					this.objArr = arr;
				}
				console.log(this.objArr)
			},
			onChangeFilter(event, index, value) {

				// console.log(event)
				let obj = {
					object_id: value.id,
					score: event,
					object_name: value.object_en,
					object_pid: value.pid
				}
				let indexKey = this.objArr.findIndex(item => item.object_id == value.id)

				if (event > 0) {
					if (this.objArr.length > 10) {
						uni.showToast({
							title: 'Choose up to 10 tags',
							icon: 'none'
						})
					} else {
						if (indexKey == -1) {
							this.objArr.push(obj)
						} else {
							this.objArr[indexKey]['score'] = event
						}
					}

				} else {
					// this.objArr.splice(indexKey,1)
					let arr = [];
					this.objArr.forEach(item => {
						if (item.object_id != value.id) {
							arr.push(item)
						}
					})
					this.objArr = arr;
				}
				console.log(this.objArr)

			},
			onOwnChange(event, index, value) {

				let indexKey = this.objArr.findIndex(item => item.object_name == value.object_en)
				console.log(indexKey)
				let obj = {
					object_id: value.id,
					score: event,
					object_name: value.object_en,
					object_pid: value.pid
				}

				if (event > 0) {
					if (this.objArr.length > 10) {
						uni.showToast({
							title: 'Choose up to 10 tags',
							icon: 'none'
						})
					} else {
						if (indexKey == -1) {
							this.objArr.push(obj)
						} else {
							this.objArr[indexKey]['score'] = event
						}

					}

				} else {
					let arr = [];
					this.objArr.forEach(item => {
						if (item.object_name != value.object_en) {
							arr.push(item)
						}
					})
					this.objArr = arr;
				}
				console.log(this.objArr)
			},
			closeRate() {
				this.showRatePopup = false;
			},
			submitRate() {
				console.log('submit rate')
			},
			subjectSearch(e) {
				const options = {
					includeScore: true,
					// Search in `author` and in `tags` array
					keys: ['object_en', 'object_cn']
				}
				let list = this.infoList;
				let keyWord = e.value;
				const fuse = new Fuse(list, options)
				const result = fuse.search(keyWord)
				this.filterList = result;
				this.filterStatus = true;
				console.log(result)
			},
			subjectInput(e) {
				if (e.value == '') {
					this.filterStatus = false;
				} else {
					const options = {
						includeScore: true,
						// Search in `author` and in `tags` array
						keys: ['object_en', 'object_cn']
					}
					let list = this.infoList;
					let keyWord = e.value;
					const fuse = new Fuse(list, options)
					const result = fuse.search(keyWord)
					this.filterList = result;
					this.filterStatus = true;
				}
				console.log(this.filterList)

			},
			subjectCancel() {
				this.filterStatus = false;
			},
			cancel() {
				uni.navigateBack({
					delta: 1
				})
			},
			subjectSubmit() {

				let pro_data = {
					object_arr: this.objArr,
					token: uni.getStorageSync('token')
				}
				profile.addLanguageScore(pro_data).then(res => {
					if (res.code == 200) {
						uni.navigateBack({
							delta: 1
						})
					}
				}).catch(error => {
					console.log(error)
				})
			},
			getUserObjectList(type) {

				let data = {
					token: uni.getStorageSync('token'),
					pid: type
				}
				profile.getUserObjectList(data).then(res => {
					// console.log(res)
					this.infoList = res.message;

				}).catch(error => {
					console.log(error)
				})
			},
			getBasicInfo() {
				var that = this;

				let data = {
					id: uni.getStorageSync('uid'),
					token: uni.getStorageSync('token')
				}
				profile.getBasicInfo(data).then(res => {

					if (res.code == 200) {
						let identity = uni.getStorageSync('identity')
						var languageArr = [];
						if (identity == 1) {
							if (res.message.educator_info.languages) {
								languageArr = res.message.educator_info.languages;
							}
						}
						if (identity == 2) {
							if (res.message.business_info.languages) {
								languageArr = res.message.business_info.languages;
							}
						}
						if (identity == 3) {
							if (res.message.vendor_info.languages) {
								languageArr = res.message.vendor_info.languages;
							}
						}
						console.log(languageArr)
						languageArr.forEach(item => {
							if (item.object_id != 0) {
								let index = this.infoList.findIndex(info => info.id == item.object_id)
								if(index != -1){
									this.infoList[index]['score'] = item.object_score
									this.selectRateData.push(item.object_id)
									let obj = {
										object_id: item.object_id,
										object_name: item.object_en,
										object_pid: 2,
										score: item.object_score
									}
									this.objArr.push(obj)
								}
								
							} else {
								let ownObj = {
									id: 0,
									object_cn: item.object_en,
									object_en: item.object_en,
									p_name_cn: '语言',
									p_name_en: 'languages',
									pid: 2,
									score: item.object_score
								}
								let ownIndex = this.ownLanguagesList.findIndex(info => info.object_en == item.object_en)
								console.log(ownIndex)
								if (ownIndex == -1) {
									this.ownLanguagesList.push(ownObj)
									this.ownLanguagesStatus = true
								}

								let obj = {
									object_id: item.object_id,
									object_name: item.object_en,
									object_pid: 2,
									score: item.object_score
								}
								let i = this.objArr.findIndex(item => item.object_name == item.object_en)
								if (i == -1) {
									this.objArr.push(obj)
								}

							}

						})

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

	.search-tags-box {
		width: 100%;
		padding-bottom: 200rpx;
		margin: 0 auto;

	}

	.search-tags-box-item {

		width: 96%;
		height: 80rpx;
		line-height: 80rpx;
		margin: 20rpx auto;

		padding-left: 20rpx;
		padding-right: 20rpx;

		background-color: #FFFFFF;
		color: #333333;
		border-radius: 20rpx;
		font-size: 30rpx;

		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;

	}

	.tags-box-item-name {}

	.tags-box-item-rate {}

	.cur {

		color: white;
		border: 1px solid #e5e5e5;
		background-color: #00B3D2;

	}

	.search-tags-submit {
		width: 80%;
		position: fixed;
		z-index: 1000;
		bottom: 20rpx;
		left: 0;
		right: 0;
		margin: auto;

	}

	.search-tags-submit button {
		background-color: #004956;
		color: #FFFFFF;
		height: 80rpx;
		border-radius: 80rpx;
		line-height: 80rpx;
	}

	.countries-bottom {
		width: 100%;
		height: 100rpx;
		background-color: #FFFFFF;
		position: fixed;
		z-index: 1000;
		bottom: 0;
	}

	.bottom-cancel {
		width: 300rpx;
		height: 100rpx;
		line-height: 100rpx;
		font-size: 32rpx;
		text-align: center;
		background-color: #efe7eb;
		color: #FFFFFF;
	}

	.bottom-confirm {
		width: 100%;
		/* width: 300rpx;
		height: 100rpx; */
		line-height: 100rpx;
		font-size: 32rpx;
		text-align: center;
		background-color: #0AA0A8;
		color: #FFFFFF;
	}

	.add-language {
		width: 100%;
		margin: 0 auto;
		padding-left: 20rpx;
		padding-bottom: 20rpx;
		background-color: #FFFFFF;
		display: flex;
		flex-direction: row;
		justify-content: space-between;

	}

	.add-language input {
		width: 80%;
		height: 80rpx;
		line-height: 80rpx;
		border: 1rpx solid #EEEEEE;
		border-radius: 20rpx;
		font-size: 28rpx;
		text-indent: 20rpx;
	}

	.add-language button {
		width: 15%;
		height: 80rpx;
		background-color: #0AA0A8;
		line-height: 80rpx;
		text-align: center;
		font-size: 28rpx;
		border-radius: 20rpx;
		color: #FFFFFF;

	}
</style>
