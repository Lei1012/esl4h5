<template>
	<view>
		<web-view :src="srcValue"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				srcValue:''
			}
		},
		onLoad(option) {
			let token = uni.getStorageSync('token');
			this.srcValue = decodeURIComponent(option.url)  //解码网址
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
