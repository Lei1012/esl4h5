<template>
	<view class="uni-flex uni-column countries-bg">
		<uni-indexed-list :options="list" :showSelect="false" @click="bindClick"></uni-indexed-list>
	</view>
</template>

<script>
	// import countries from '@/common/countries.js';
	import nationality from '@/common/nationality.js'
	import nationalityEn from '@/common/nationalityEn.js'
	import uniIndexedList from "@/components/uni-indexed-list/uni-indexed-list.vue"
	import profile from '@/api/profile.js'
	import util from '@/common/util.js'
	
	export default {
		data() {
			return {
				list: [],
				languageValue:'en-US'
				
			}
		},
		components: {
			uniIndexedList
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
				uni.$emit('nationalityObj',e.item.name)
				console.log(e)
				uni.navigateBack({
					delta:1
				})
			},
		}
	}
</script>

<style>
	.countries-bg {
		width: 100%;
		height: 100%;

	}
</style>
