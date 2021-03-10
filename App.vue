<script>
	export default {
		onLaunch: function() {
			console.log('App Launch');
			// #ifdef APP-PLUS
			// App平台检测升级，服务端代码是通过uniCloud的云函数实现的，详情可参考：https://ext.dcloud.net.cn/plugin?id=2226
			// #endif
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		globalData: {
			test: ''
		}
	}
</script>

<style lang="scss">
	/* 此处为style标签内容的最前面 */
	@import "./static/iconfont.css";

	/* #ifndef APP-PLUS-NVUE */
	/* uni.css - 通用组件、模板样式库，可以当作一套ui库应用 */
	@import "uview-ui/index.scss";
	@import './common/uni.css';
	@import url("animate.css");

	* {
		-webkit-touch-callout: none; //主要，针对IOS的系统
	}

	/* 以下样式用于 hello uni-app 演示所需 */
	page {
		background-color: #F4F5F6;
		height: 100%;
		font-size: 28rpx;
		line-height: 1.8;
	}

	.uni-header-logo {
		padding: 30rpx;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin-top: 10rpx;
	}

	.uni-header-image {
		width: 100px;
		height: 100px;
	}

	.uni-hello-text {
		color: #7A7E83;
	}

	.uni-hello-addfile {
		text-align: center;
		line-height: 300rpx;
		background: #FFF;
		padding: 50rpx;
		margin-top: 10px;
		font-size: 38rpx;
		color: #808080;
	}

	/* #endif*/

	/* #ifdef H5 */
	@supports (bottom: constant(safe-area-inset-top)) or (bottom: env(safe-area-inset-top)) {
		body {
			padding-top: constant(safe-area-inset-top); //为导航栏+状态栏的高度 88px
			padding-top: env(safe-area-inset-top); //为导航栏+状态栏的高度 88px
			padding-left: constant(safe-area-inset-left); //如果未竖屏时为0
			padding-left: env(safe-area-inset-left); //如果未竖屏时为0
			padding-right: constant(safe-area-inset-right); //如果未竖屏时为0
			padding-right: env(safe-area-inset-right); //如果未竖屏时为0
			padding-bottom: constant(safe-area-inset-bottom); //为底下圆弧的高度 34px
			padding-bottom: env(safe-area-inset-bottom); //为底下圆弧的高度 34px
		}
	}

	/* #endif */
</style>
