<template>
	<view class="uni-flex uni-column">
		<view class="container" v-if="showProvince">
			<view class="back" @click="provinceBack()">
				<image src="@/static/esl/back-white.png" mode="aspectFill"></image>
				<view class="back-text">{{i18n.locationselectprovince}}</view>
			</view>
			<u-index-list class="list" :scrollTop="scrollTop">
				<view class="list-cell" v-for="(item, index) in provinceList" :key="index" >
					<view class="cell-1">
						<u-index-anchor :index="item.name" />
					</view>
					<view class="cell-2" v-for="(data,k) in item.data" :key="k" @click="turnCity(data)">
						<text v-if="languageValue == 'zh-CN'">{{data.Name}}</text>
						<text v-if="languageValue == 'en-US'">{{data.Pinyin}}</text>
					</view>
				</view>
			</u-index-list>
		</view>
		<view class="container-city" v-if="showCity">
			<view class="back" @click="cityBack()">
				<image src="@/static/esl/back-white.png" mode="aspectFill"></image>
				<view class="back-text">{{i18n.locationselectcity}}</view>
			</view>
			<u-index-list class="list" :scrollTop="scrollTop">
				<view class="list-cell" v-for="(item, index) in cityList" :key="index" >
					<view class="cell-1">
						<u-index-anchor :index="item.name" />
					</view>
					<view class="cell-2" v-for="(data,k) in item.data" :key="k"  @click="turnArea(data)">
						<text v-if="languageValue == 'zh-CN'">{{data.Name}}</text>
						<text v-if="languageValue == 'en-US'">{{data.Pinyin}}</text>
					</view>
				</view>
			</u-index-list>
		</view>
		<view class="container-area" v-if="showArea">
			<view class="back" @click="areaBack()">
				<image src="@/static/esl/back-white.png" mode="aspectFill"></image>
				<view class="back-text">{{i18n.locationselectdistrict}}</view>
			</view>
			<u-index-list class="list" :scrollTop="scrollTop">
				<view class="list-cell" v-for="(item, index) in areaList" :key="index" >
					<view class="cell-1">
						<u-index-anchor :index="item.name" />
					</view>
					<view class="cell-2"  v-for="(data,k) in item.data" :key="k"  @click="submit(data)">
						<text v-if="languageValue == 'zh-CN'">{{data.Name}}</text>
						<text v-if="languageValue == 'en-US'">{{data.Pinyin}}</text>
					</view>
				</view>
			</u-index-list>
		</view>
	</view>
</template>

<script>
	import location from '@/api/location.js';
	export default {
		data() {
			return {
				languageValue: 'en-US',
				provinceList: [],
				cityList: [],
				areaList: [],
				showProvince: true,
				showCity: false,
				showArea: false,
				provinceValue: '',
				cityValue: '',
				areaValue: '',
				source: '',
				scrollTop: 0,

			}
		},
		computed: {
			i18n() {
				return this.$t('index')
			}
		},
		onLoad(option) {
			if (uni.getStorageSync('language') != '') {
				this.languageValue = uni.getStorageSync('language')
			}
			this.source = option.s;
			this.getProvinceList(0); // province
		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		},
		methods: {
			getProvinceList(pid) {
				let data = {
					pid: pid
				}
				location.getAreasByChar(data).then(res => {
					console.log(res)
					if (res.code == 200) {
						this.provinceList = res.message;
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
					}
				})
			},
			turnCity(item) {
				var that = this;
				let data = {
					pid: item.id
				}
				location.getAreasByChar(data).then(res => {
					console.log(res)
					if (res.code == 200) {
						this.cityList = res.message;
						this.showCity = true;
						this.showProvince = false;
						if (that.languageValue == 'zh-CN') {
							this.provinceValue = item.Name;
						}
						if (that.languageValue == 'en-US') {
							this.provinceValue = item.Pinyin;
						}
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
					}
				})
			},
			turnArea(item) {
				var that = this;
				let data = {
					pid: item.id
				}
				location.getAreasByChar(data).then(res => {
					console.log(res)
					if (res.code == 200) {
						this.areaList = res.message;
						this.showArea = true;
						this.showCity = false;
						if (that.languageValue == 'zh-CN') {
							this.cityValue = item.Name;
						}
						if (that.languageValue == 'en-US') {
							this.cityValue = item.Pinyin;
						}
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
					}
				})
			},
			submit(item) {
				var that = this;
				if (that.languageValue == 'zh-CN') {
					this.areaValue = item.Name;
				}
				if (that.languageValue == 'en-US') {
					this.areaValue = item.Pinyin;
				}
				// console.log(this.provinceValue)
				// console.log(this.cityValue)
				// console.log(this.areaValue)
				let data = {
					province: this.provinceValue,
					city: this.cityValue,
					area: this.areaValue
				}
				uni.$emit('locationEvent', data)
				uni.navigateBack({
					delta: 1
				})
			},
			provinceBack() {
				uni.navigateBack({
					delta: 1
				})
			},
			cityBack() {
				this.showCity = false;
				this.showProvince = true;
			},
			areaBack() {
				this.showArea = false;
				this.showCity = true;
			}

		}
	}
</script>

<style>
	.container {}

	.back {
		/* position: fixed; */
		/* z-index: 1000; */
		/* top: 0; */
		background-color: #004956;
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;

	}

	.back-text {
		font-size: 34rpx;
		font-weight: 700;
		color: #FFFFFF;
		padding-left: 60rpx;

	}

	.back image {
		width: 100rpx;
		height: 100rpx;
	}

	.list {
		/* margin-top: 140rpx; */
		/* padding-bottom: 100rpx; */
	}

	.item {
		width: 90%;
		margin: 0 auto;
		/* border-radius: 20rpx; */
		/* height: 80rpx;
		line-height: 80rpx;
		padding: 10rpx 20rpx;
		background-color: #FFFFff;
		margin-top: 20rpx; */
	}

	.list-cell {
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		width: 100%;
		overflow: hidden;
		color: #000000;
		font-size: 30rpx;
		background-color: #FFFFFF;
	}

	.cell-1 {
		width: 100%;
		font-size: 20rpx;
		height: 60rpx;
		line-height: 60rpx;
		text-indent: 20rpx;
	}

	.cell-2 {
		height: 80rpx;
		line-height: 80rpx;
		text-indent: 40rpx;
		border-bottom: 1rpx solid #EEEEEE;
	}
	
</style>
