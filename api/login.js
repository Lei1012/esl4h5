import request from './request.js'

function sendCode(data){
	return request({
		method:"GET",
		url:'weixin/sendSms',
		data:data
	})
}
function bindIdentity(data){
	return request({
		method:"POST",
		url:'weixin/bindIdentity',
		data:data
	})
}

function getUserInfoByWxCode(data){
	return request({
		method:"GET",
		url:'weixin/callback',
		data:data
	})
}
function changeLanguageAndIdentity(data){
	return request({
		method:"POST",
		url:'weixin/change',
		data:data
	})
}

function miniWxDecode(data){
	return request({
		method:"POST",
		url:'mini/WxDecode',
		data:data
	})
}
function miniAddUser(data){
	return request({
		method:"POST",
		url:'mini/addUser',
		data:data
	})
}





export default{
	sendCode,
	bindIdentity,
	getUserInfoByWxCode,
	changeLanguageAndIdentity,
	miniWxDecode,
	miniAddUser
}