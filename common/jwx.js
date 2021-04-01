var jweixin = require('./jweixin-1.6.0.js')
export default{
	//判断是否在微信中    
	    isWechat: function() {  
	        var ua = window.navigator.userAgent.toLowerCase();  
	        if (ua.match(/micromessenger/i) == 'micromessenger') {  
	            console.log('是微信客户端')  
	            return true;  
	        } else {  
	            console.log('不是微信客户端')  
	            return false;  
	        }  
	    },  
	    initJssdk:function(callback){  
	        var uri = encodeURIComponent(window.location.href.split('#')[0]);//获取当前url然后传递给后台获取授权和签名信息  
			if(process.env.NODE_ENV === 'production'){
				var apiUrl = 'https://api.esl-passport.cn/api/getJsToken';
				// #ifdef H5-DEV
				var apiUrl = 'https://api.test.esl-passport.cn/api/getJsToken';
				// #endif
			}
			if(process.env.NODE_ENV === 'development'){
				// var apiUrl = 'http://api.test.esl-passport.cn/api/getJsToken';
				var apiUrl = 'https://api.esl-passport.cn/api/getJsToken';
				// #ifdef H5-DEV
				var apiUrl = 'https://api.test.esl-passport.cn/api/getJsToken';
				// #endif
			}
	        uni.request({  
	            url:apiUrl,//你的接口地址  
	            data:{  
	                url:uri,
					token:uni.getStorageSync('token')
	            },
				method:'POST',
	            success:(res)=>{  
					// console.log(res)
	                //返回需要的参数appId,timestamp,noncestr,signature等  
	                //注入config权限配置  
	                jweixin.config({  
	                    debug: false,  
	                    appId: res.data.message.appId,  
	                    timestamp: res.data.message.timestamp,  
	                    nonceStr: res.data.message.nonceStr,  
	                    signature: res.data.message.signature,  
	                    jsApiList: [//这里是需要用到的接口名称  
	                        'checkJsApi',//判断当前客户端版本是否支持指定JS接口  
	                        'onMenuShareAppMessage',//分享接口  
	                        'getLocation',//获取位置  
	                        'openLocation',//打开位置  
	                        'scanQRCode',//扫一扫接口  
	                        'chooseWXPay',//微信支付  
	                        'chooseImage',//拍照或从手机相册中选图接口  
	                        'previewImage',//预览图片接口  
	                        'uploadImage',//上传图片  
							'updateAppMessageShareData',
							'updateTimelineShareData',
							'onMenuShareTimeline',
							'onMenuShareAppMessage',
							'onMenuShareQQ',
							'onMenuShareWeibo',
							'onMenuShareQZone',
	                    ]  
	                });  
	                if (callback) {  
	                    callback(res.data);  
	                }  
	
	            }  
	        })  
	    },  
	    //在需要定位页面调用  
	    getlocation: function(callback) {  
	        if (!this.isWechat()) {  
	            console.log('不是微信客户端')  
	            return;  
	        }  
	        this.initJssdk(function(res) {  
	            jweixin.ready(function() {  
	                jweixin.getLocation({  
	                    type: 'gcj02', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'  
	                    success: function (res) {  
	                        // console.log(res);  
	                        callback(res)  
	                    },  
	                    fail:function(res){  
	                        console.log(res)  
	                    },  
	                    // complete:function(res){  
	                    //     console.log(res)  
	                    // }  
	                });  
	            });  
	        });  
	    },  
	    openlocation:function(data,callback){//打开位置  
	        if (!this.isWechat()) {  
	            //console.log('不是微信客户端')  
	            return;  
	        }  
	        this.initJssdk(function(res) {  
	            jweixin.ready(function() {  
	                jweixin.openLocation({//根据传入的坐标打开地图  
	                    latitude:data.latitude,  
	                    longitude:data.longitude  
	                });  
	            });  
	        });  
	    },  
	    chooseImage:function(callback){//选择图片  
	        if (!this.isWechat()) {  
	            //console.log('不是微信客户端')  
	            return;  
	        }  
	        //console.log(data);  
	        this.initJssdk(function(res) {  
	            jweixin.ready(function() {  
	                jweixin.chooseImage({  
	                    count:1,  
	                    sizeType:['compressed'],  
	                    sourceType:['album'],  
	                    success:function(rs){  
	                        callback(rs)  
	                    }  
	                })  
	            });  
	        });  
	    },  
	    //微信支付  
	    wxpay: function(data,callback) {  
	        if (!this.isWechat()) {  
	            console.log('不是微信客户端')  
	            return;  
	        }  
	        this.initJssdk(function(res) {  

	            jweixin.ready(function() {  
					
	                jweixin.chooseWXPay({  
	                    timestamp: data.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符  
	                    nonceStr: data.nonceStr, // 支付签名随机串，不长于 32 位  
	                    package: data.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）  
	                    signType: data.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'  
	                    paySign: data.paySign, // 支付签名  
	                    success: function (res) { 
	                        callback({code:1,message:res})  
	                    },  
	                    fail:function(res){
	                        callback({code:-1,message:res})  
	                    },
					
	                });  
	            });  
	        });  
	    },
		// 自定义“分享给朋友”及“分享到QQ”按钮的分享内容
		updateAppMessageShareData:function(data,callback){
			if (!this.isWechat()) {
			    console.log('不是微信客户端')  
			    return;  
			}  
			this.initJssdk(function(res) {
				
			    jweixin.ready(function() {  
					jweixin.updateAppMessageShareData({ 
					    title: data.title, // 分享标题
					    desc: data.desc, // 分享描述
					    link: data.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
					    imgUrl: data.imgUrl, // 分享图标
					    success: function (res) {
					      // 设置成功
						  callback({code:1,message:res})  
					    },
						fail:function(res){
						    callback({code:-1,message:res})  
						},
					  })
			       
			    });  
			});  
		},
		// 自定义“分享到朋友圈”及“分享到QQ空间”按钮的分享内容（1.4.0）
		updateTimelineShareData:function(data,callback){
			if (!this.isWechat()) {
			    console.log('不是微信客户端')  
			    return;  
			}  
			this.initJssdk(function(res) {
				
			    jweixin.ready(function() {  
					jweixin.updateTimelineShareData({ 
					    title: data.title, // 分享标题
					    link: data.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
					    imgUrl: data.imgUrl, // 分享图标
					    success: function (res) {
					      // 设置成功
						  callback({code:1,message:res})  
					    },
						fail:function(res){
						    callback({code:-1,message:res})  
						},
					  })
			       
			    });  
			});  
		},
		// 获取“分享给朋友”按钮点击状态及自定义分享内容接口（即将废弃）
		onMenuShareAppMessage:function(data,callback){
			if (!this.isWechat()) {
			    console.log('不是微信客户端')  
			    return;  
			}  
			this.initJssdk(function(res) {
				
			    jweixin.ready(function() {  
					jweixin.onMenuShareAppMessage({
					  title: data.title, // 分享标题
					  desc: data.desc, // 分享描述
					  link: data.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
					  imgUrl: data.imgUrl, // 分享图标
					  type: 'link', // 分享类型,music、video或link，不填默认为link
					  dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
					  success: function () {
					   // 设置成功
					   callback({code:1,message:res})  
					  }
					});
			       
			    });  
			});  
		},
		
}