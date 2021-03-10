<template>
	<view class="uni-flex uni-column countries-bg">
		<uni-indexed-list :options="list" :showSelect="true" @click="bindClick"></uni-indexed-list>
		<view class="flex-item countries-bottom">
			<view class="bottom-cancel" @click="cancel">
				Cancel
			</view>
			<view class="bottom-confirm" @click="confirm">
				Confirm ( {{selectList.length}} )
			</view>
		</view>

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
				selectList: [],
				selectListLength: 0,
				list: [],
				type: 1,
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
			this.type = option.type;
			if(uni.getStorageSync('language') != ''){
				this.languageValue = uni.getStorageSync('language')
			}
			this.getUserObjectList(option.type)
			
		},
		methods: {
			
			getUserObjectList(type) {
				let data = {
					token: uni.getStorageSync('token'),
					pid: type
				}
				profile.getUserObjectList(data).then(res => {
					// console.log(res)
					let data = res.message;
					let arr = util.azList(data, true)
					// console.log(arr)
					this.list = arr
				}).catch(error => {
					console.log(error)
				})
			},
			bindClick(e) {
				console.log(e)
				this.selectList = e.select;
			},
			confirm() {
				
				let selectList = this.selectList;
				let object_id_arr= []
				selectList.forEach(item=>{
					object_id_arr.push(item.name.id)
				})
				// console.log(object_id_arr)
				let data = {
					object_id:object_id_arr,
					token:uni.getStorageSync('token')
				}
				profile.addProfile(data).then(res=>{
					console.log(res)
					if(res.code == 200){
						uni.navigateBack({
							delta: 1
						})
					}else{
						uni.showToast({
							title:res.msg,
							icon:'none'
						})
					}
				})
				.catch(err=>{
					console.log(err)
				})
			
				

			},
			cancel() {
				uni.navigateBack({
					delta: 1
				})
			}

		}
	}
</script>

<style>
	.countries-bg {
		width: 100%;
		height: 100%;

	}


	.uni-indexed-list {
		bottom: 110rpx;
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
