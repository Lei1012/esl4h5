import {isWechat} from '../common/util.js'
const request = (config) => {
	// 处理 apiUrl
	let api_url = config.url;
	// #ifdef H5 
	config.url = 'https://api.esl-passport.cn/api/' + api_url;
	// #endif
	// #ifdef H5-DEV
	config.url = 'https://api.test.esl-passport.cn/api/' + api_url;
	// #endif

	// #ifdef MP-WEIXIN
	config.url = 'https://api.esl-passport.cn/api/' + api_url;
	// #endif
	// #ifdef MP-WEIXIN-DEV
	config.url = 'https://api.test.esl-passport.cn/api/' + api_url;
	// #endif
	console.log(config)
	
	if (!config.data) {
		config.data = {};
	}
		
	// #ifdef H5
	if(isWechat()){
		config.header = {
			platform:2
		}
	}else{
		config.header = {
			platform:1
		}
	}
	// #endif
	// #ifdef MP-WEIXIN
	config.header = {
		platform:3
	}
	// #endif
	
	let promise = new Promise(function(resolve, reject) {

		uni.request(config).then(responses => {
			// 异常
			// console.log(responses)
			if (responses[0]) {
				reject({
					message: "网络超时"
				});
			} else {
				let response = responses[1].data; // 如果返回的结果是data.data的，嫌麻烦可以用这个，return res,这样只返回一个data
				// console.log(response)
				let statusCode = responses[1].statusCode;
				// console.log(statusCode)
				//token 失效 返回登录页面
				if (statusCode === 401) {
					uni.removeStorageSync('token')
					// #ifdef H5
					// uni.showModal({
					// 	title: 'Login Status Is Invalid',
					// 	content: 'Please login again',
					// 	showCancel: false,
					// 	cancelText: 'Cancel',
					// 	confirmText: 'Login',
					// 	confirmColor: '#00B3D2',
					// 	success: function(res) {
					// 		if (res.confirm) {
					// 			uni.reLaunch({
					// 				url: '/'
					// 			})
					// 		} else if (res.cancel) {
					// 			console.log('用户点击取消');
					// 		}
					// 	}
					// })
					return uni.navigateTo({
						url:'/pages/login/index'
					})
					// #endif
					
					// #ifdef MP-WEIXIN
					var pages = getCurrentPages(); // 当前页面
					var currentPagePath = pages[pages.length - 1]; // 前一个页面
					
					if(currentPagePath.route == 'pages/login/index'){
						return;
					}
					return uni.navigateTo({
						url: '/pages/login/index?redirect='+ encodeURIComponent(currentPagePath.route) 
					})
					// #endif
					
				} else {
					resolve(response);
				}
			}
		}).catch(error => {
			reject(error);
		})


	})
	return promise;
};

export default request;
