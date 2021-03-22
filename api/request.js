const request = (config) => {
	// 处理 apiUrl
	console.log(process.env.NODE_ENV)
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

	if (!config.data) {
		config.data = {};
	}

	// console.log(JSON.stringify(config.data));
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
					uni.showModal({
						title: 'Login Status Is Invalid',
						content: 'Please login again',
						showCancel: false,
						cancelText: 'Cancel',
						confirmText: 'Login',
						confirmColor: '#00B3D2',
						success: function(res) {
							if (res.confirm) {
								uni.reLaunch({
									url: '/?reLogin=1'
								})
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					})
					// #endif

					// #ifdef MP-WEIXIN
					let reloginStatus = uni.getStorageSync('relogin')
					if (reloginStatus != 1) {
						uni.setStorageSync('relogin', 1);
						uni.navigateTo({
							url: '/pages/login/index'
						})
					}
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
