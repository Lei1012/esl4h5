<template>
	<view class="uni-flex uni-column countries-bg">
		<uni-indexed-list :options="list" :showSelect="false" @click="bindClick"></uni-indexed-list>
	</view>
</template>

<script>
	import countries from '@/common/countries.js'
	import uniIndexedList from "@/components/uni-indexed-list/uni-indexed-list.vue"
	import profile from '@/api/profile.js'
	import util from '@/common/util.js'
	
	export default {
		data() {
			return {
				list: [],
				type:1,
				
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
			this.list = countries.list;
			this.type = option.type;
		},
		methods: {
			
			bindClick(e) {
				
				if(this.type == 1){
					uni.$emit('nationalityOne',e.item.name)
				}
				if(this.type == 2){
					uni.$emit('nationalityTwo',e.item.name)
				}
				
				// console.log(e)
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
