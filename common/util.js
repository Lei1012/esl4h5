function formatTime(time) {
	if (typeof time !== 'number' || time < 0) {
		return time
	}

	var hour = parseInt(time / 3600)
	time = time % 3600
	var minute = parseInt(time / 60)
	time = time % 60
	var second = time

	return ([hour, minute, second]).map(function(n) {
		n = n.toString()
		return n[1] ? n : '0' + n
	}).join(':')
}

function formatLocation(longitude, latitude) {
	if (typeof longitude === 'string' && typeof latitude === 'string') {
		longitude = parseFloat(longitude)
		latitude = parseFloat(latitude)
	}

	longitude = longitude.toFixed(2)
	latitude = latitude.toFixed(2)

	return {
		longitude: longitude.toString().split('.'),
		latitude: latitude.toString().split('.')
	}
}
var dateUtils = {
	UNITS: {
		'年': 31557600000,
		'月': 2629800000,
		'天': 86400000,
		'小时': 3600000,
		'分钟': 60000,
		'秒': 1000
	},
	humanize: function(milliseconds) {
		var humanize = '';
		for (var key in this.UNITS) {
			if (milliseconds >= this.UNITS[key]) {
				humanize = Math.floor(milliseconds / this.UNITS[key]) + key + '前';
				break;
			}
		}
		return humanize || '刚刚';
	},
	format: function(dateStr) {
		var date = this.parse(dateStr)
		var diff = Date.now() - date.getTime();
		if (diff < this.UNITS['天']) {
			return this.humanize(diff);
		}
		var _format = function(number) {
			return (number < 10 ? ('0' + number) : number);
		};
		return date.getFullYear() + '/' + _format(date.getMonth() + 1) + '/' + _format(date.getDate()) + '-' +
			_format(date.getHours()) + ':' + _format(date.getMinutes());
	},
	parse: function(str) { //将"yyyy-mm-dd HH:MM:ss"格式的字符串，转化为一个Date对象
		var a = str.split(/[^0-9]/);
		return new Date(a[0], a[1] - 1, a[2], a[3], a[4], a[5]);
	}
};

function howLong(createtime,languageValue) {
	var now = Date.parse(new Date()) / 1000;
	var limit = now - createtime;
	var content = "";
	let isEnglish = languageValue == 'en-US' ? true : false;
	if (limit < 60) {
		if(isEnglish){
			content = " a moment ago";
		}else{
			content = "刚刚";
		}
	} else if (limit >= 60 && limit < 3600) {
		if(isEnglish){
			content = Math.floor(limit / 60) + " min ago";
		}else{
			content = Math.floor(limit / 60) + " 分钟前";
		}
		
	} else if (limit >= 3600 && limit < 86400) {
		if(isEnglish){
			content = Math.floor(limit / 3600) + " hours ago";
		}else{
			content = Math.floor(limit / 3600) + " 小时前";
		}
	} else if (limit >= 86400 && limit < 2592000) {
		if(isEnglish){
			content = Math.floor(limit / 86400) + " days ago";
		}else{
			content = Math.floor(limit / 86400) + " 天前";
		}
		
	} else if (limit >= 2592000 && limit < 31104000) {
		if(isEnglish){
			content = Math.floor(limit / 2592000) + " months ago";
		}else{
			content = Math.floor(limit / 2592000) + " 个月前";
		}
		
	} else {
		if(isEnglish){
			content = "";
		}else{
			content = "";
		}
		
	}
	return content;
}

function getUrlCode(name) {
	return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ''])[1]
		.replace(/\+/g, '%20')) || null
};

function isWechat() {
	return String(navigator.userAgent.toLowerCase().match(/MicroMessenger/i)) === "micromessenger";
}

module.exports = {
	formatTime: formatTime,
	formatLocation: formatLocation,
	dateUtils: dateUtils,
	getUrlCode: getUrlCode,
	isWechat: isWechat,
	howLong:howLong

}
