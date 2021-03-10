<template>
	<view>
		<view class="fuck-textarea-edit-content" :class="{'hidden':EditMode}" @tap="TapView">
			{{Content}}
			<view class="fuck-textarea-edit-placeholder" v-if="Content===''">
				{{placeholder}}
			</view>
		</view>
		<textarea show-confirm-bar="false" class="fuck-textarea-edit-content" :class="{'hidden':!EditMode}" :value="value"
		 :maxlength="maxlength==''?-1:maxlength" :focus="EditMode" @blur="EditBlur" @input="handleInput" />
		<view class="inputlength" v-if="maxlength != '' && maxlength >= 0">
			<text class="current">{{CurrentLength}}</text><text style="margin: 0 6rpx;">/</text><text>{{maxlength}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'FuckTextarea',
		props: {
			value: {
				type:String,
				default: ""
			},
			placeholder:{
				type:String,
				default:""
			},
			maxlength:{
				type:Number,
				default:-1
			}
		},
		data() {
			return {
				Content:"",
				EditMode:false
			}
		},
		computed:{
			CurrentLength(){
				return this.Content.length;
			}
		},
		watch:{
			value(v){
				this.Content = v
			}
		},
		methods: {
			TapView(){
				this.EditMode = true;
			},
			EditBlur(){
				this.EditMode = false;
			},
			handleInput(e){
				var that = this;
				this.$emit('input',e.target.value);
			}
		},
		mounted(){
			this.Content = this.value
		}
	}
</script>

<style>
	.hidden{
		display: none;
	}
	
	.fuck-textarea-edit-content{
		border: 1rpx solid #EEEEEE;
		padding: 0rpx;
		color: #333333;
		width: 100%;
		height: 200rpx;
		/* font-size: 28rpx; */
		font-size: 30rpx;
		line-height: 1.6em;
		white-space: pre-wrap;
		word-break: break-all;
		/* overflow-y: hidden; */
		overflow: auto;
		border-radius: 20rpx;
		text-indent: 20rpx;
	}
	
	.fuck-textarea-edit-placeholder{
		color:#999999;
		font-size: 30rpx;
		text-indent: 20rpx;
	}
	
	.inputlength{
		font-size: 26rpx;
		padding-top: 10rpx;
		text-align: right;
		color: #000000;
	}
	.inputlength text{
		font-size: 28rpx;
	}
	
	.inputlength .current{
		color: #999999;
	}
</style>
