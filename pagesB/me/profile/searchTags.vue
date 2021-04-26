<template>
	<view class="uni-flex uni-column search-tags-bg">
		<view class="flex-item search-tags-search">
			<uni-search-bar v-model="searchValue" :radius="100" cancelText="Cancel" placeholder="Enter search content" @input="subjectInput"
			 @confirm="subjectSearch" @cancel="subjectCancel"></uni-search-bar>
		</view>
		<view class="flex-item search-tags-box">
			<view v-if="filterStatus==false" class="search-tags-box-item" :class="{'cur': rSelect.indexOf(index)!=-1}" v-for="(value,index) in infoList"
			 :key="index" @tap="tapInfo(index,value)">{{value.object_en}}</view>
			<view v-if="filterStatus" class="search-tags-box-item" :class="{'cur': rSelect.indexOf(index)!=-1}" v-for="(value,index) in filterList"
			 :key="index" @tap="tapInfo(index,value)">{{value.item.object_en}}</view>
		</view>
		<!-- <view class="flex-item search-tags-submit">
			<button type="default" @click="subjectSubmit">submit</button>
		</view> -->
		<view class="flex-item countries-bottom">
			<view class="bottom-cancel" @click="cancel">
				Cancel
			</view>
			<view class="bottom-confirm" @click="subjectSubmit">
				Confirm
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
				objectIdArr: []
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
		},
		methods: {
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
				// console.log(result)
			},
			subjectInput(e) {
				console.log(e)
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

			},
			subjectCancel() {
				// console.log(this.infoList)
				this.filterStatus = false;
			},
			tapInfo(e, value) {

				let id = value.id;
				// console.log(e)
				// console.log(this.rSelect.indexOf(e))
				if (this.rSelect.indexOf(e) == -1) {
					// console.log(e) //打印下标
					if (this.rSelect.length > 3) {
						uni.showToast({
							title: 'Choose up to 4 tags',
							icon: 'none'
						})
					} else {
						this.rSelect.push(e); //选中添加到数组里
						this.objectIdArr.push(id)
					}
				} else {
					this.rSelect.splice(this.rSelect.indexOf(e), 1); //取消
					this.objectIdArr.splice(this.objectIdArr.indexOf(id), 1)
				}
				// console.log(this.objectIdArr)
			},
			subjectSubmit() {
				// console.log(this.rSelect)
				let pro_data = {
					object_id: this.objectIdArr,
					token: uni.getStorageSync('token')
				}
				profile.addProfile(pro_data).then(res => {
					console.log(res)
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
					console.log(res)
					this.infoList = res.message;

				}).catch(error => {
					console.log(error)
				})
			},
			cancel() {
				uni.navigateBack({
					delta: 1
				})
			},

		}
	}
</script>

<style>
	.search-tags-bg {
		width: 100%;
		height: 100%;
		background-color: #F4F5F6;
	}

	.search-tags-box {
		width: 90%;
		margin: 0 auto;
		/* background-color: #FFFFFF; */
		margin-top: 5%;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		flex-wrap: wrap;

	}

	.search-tags-box-item {
		/* width: 23%; */
		padding-left: 20rpx;
		padding-right: 20rpx;
		height: 80rpx;
		line-height: 80rpx;
		margin-top: 20rpx;
		margin-left: 10rpx;
		background-color: #FFFFFF;
		color: #333333;
		border-radius: 20rpx;
		text-align: center;
	}

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

		display: flex;
		flex-direction: row;
		justify-content: space-between;

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
		width: 300rpx;
		height: 100rpx;
		line-height: 100rpx;
		font-size: 32rpx;
		text-align: center;
		background-color: #0AA0A8;
		color: #FFFFFF;
	}
</style>
