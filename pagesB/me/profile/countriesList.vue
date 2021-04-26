<template>
	<view class="uni-flex uni-column countries-bg">
		<u-index-list :scrollTop="scrollTop"  activeColor="#0aa0a8">
			<view v-for="(item, index) in list" :key="index">
				<u-index-anchor :index="item.letter" />
				<view class="list-cell" v-for="(dataItem,i) in item.data" :key="i" @click="bindClick(dataItem.name)">
					{{dataItem.name}}
				</view>
			</view>
		</u-index-list>
	</view>
</template>

<script>
	
	import nationality from '@/common/nationality.js'
	import nationalityEn from '@/common/nationalityEn.js'
	import profile from '@/api/profile.js'
	import util from '@/common/util.js'
	
	export default {
		data() {
			return {
				list: [],
				languageValue:'en-US',
				scrollTop:0
				
			}
		},
		computed: {
			i18n() {
				return this.$t('index')
			}
		},
		onLoad(option) {
			if(uni.getStorageSync('language') != ''){
				this.languageValue = uni.getStorageSync('language')
			}
			// this.list = countries.list;
			if(this.languageValue == 'en-US'){
				this.list = nationalityEn.list;
			}
			if(this.languageValue == 'zh-CN'){
				this.list = nationality.list;
			}
		},
		methods: {
			
			bindClick(e) {
				uni.$emit('nationalityObj',e)
				console.log(e)
				uni.navigateBack({
					delta:1
				})
			},
		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		}
	}
</script>

<style>
	.countries-bg {
		width: 100%;
		height: 100%;

	}
	.list-cell {
		display: flex;
		box-sizing: border-box;
		width: 100%;
		padding: 20rpx 24rpx;
		overflow: hidden;
		color: #323233;
		font-size: 30rpx;
		background-color: #FFFFFF;
		border-bottom: 1rpx solid #EEEEEE;
	}
</style>
