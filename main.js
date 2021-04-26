import Vue from 'vue'
import App from './App'
import VueI18n from 'vue-i18n'
import language from './common/language.js'
import vueJsonp from 'vue-jsonp'

import uView from "uview-ui";
Vue.use(uView);

// #ifdef H5
import jwx from '@/common/jwx'
Vue.prototype.$jwx = jwx
Vue.prototype.$isWechat = function() {
	return String(navigator.userAgent.toLowerCase().match(/MicroMessenger/i)) === "micromessenger";
}
// #endif

Vue.use(VueI18n)
Vue.use(vueJsonp)
Vue.config.productionTip = false

const i18n = new VueI18n({
	locale: uni.getStorageSync('language') || 'en-US',
	messages: {
		'en-US': {
			index: language.English
		},
		'zh-CN': {
			index: language.Chinese
		}
	}
})

Vue.prototype._i18n = i18n

Vue.prototype.$adpid = "1111111111"

// #ifdef MP-WEIXIN
Vue.prototype.$uploadFileUrl = "https://api.esl-passport.cn/api/user/uploadImg"
Vue.prototype.$multiImportJobUrl = "https://api.esl-passport.cn/api/job/import"
// #endif
// #ifdef MP-WEIXIN-DEV
Vue.prototype.$uploadFileUrl = "https://api.test.esl-passport.cn/api/user/uploadImg"
Vue.prototype.$multiImportJobUrl = "https://api.test.esl-passport.cn/api/job/import"
// #endif

// #ifdef H5
Vue.prototype.$appid = 'wxa6f9ca55564f5efd'
Vue.prototype.$redirect_uri = 'https://esl-passport.cn'
Vue.prototype.$response_type = 'code'
Vue.prototype.$scope = 'snsapi_userinfo'
Vue.prototype.$state = 'esl001'

Vue.prototype.$qqmapkey = "FHDBZ-3SUWK-3SVJW-AXD3Q-ZH4TJ-RMFBU"
Vue.prototype.$qqmapReferer = 'test'
Vue.prototype.$apiUrl = 'https://api.esl-passport.cn/api/'
Vue.prototype.$uploadFileUrl = "https://api.esl-passport.cn/api/user/uploadImg"
Vue.prototype.$multiImportJobUrl = "https://api.esl-passport.cn/api/job/import"
// #endif


// #ifdef H5-DEV
console.log('h5-dev')
Vue.prototype.$appid = 'wx5e5b70000c31e992'
Vue.prototype.$redirect_uri = 'https://test.esl-passport.cn/esl_h5/pagesC/login/index'
Vue.prototype.$response_type = 'code'
Vue.prototype.$scope = 'snsapi_userinfo'
Vue.prototype.$state = 'esl001'

Vue.prototype.$qqmapkey = "FHDBZ-3SUWK-3SVJW-AXD3Q-ZH4TJ-RMFBU"
Vue.prototype.$qqmapReferer = 'test'

Vue.prototype.$uploadFileUrl = "https://api.test.esl-passport.cn/api/user/uploadImg"
Vue.prototype.$multiImportJobUrl = "https://api.test.esl-passport.cn/api/job/import"
// #endif

if (process.env.NODE_ENV === 'development') {
	console.log('dev')
}

if (process.env.NODE_ENV === 'production') {
	console.log('producation')
}

App.mpType = 'app'

const app = new Vue({
	i18n,
	...App
})

app.$mount()
