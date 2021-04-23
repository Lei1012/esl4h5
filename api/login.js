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

function mpRegister(data){
	return request({
		method:"POST",
		url:'mp/register',
		data:data
	})
}

function h5Login(data){
	return request({
		method:"POST",
		url:"h5/login",
		data:data
	})
}

function miniRegister(data){
	return request({
		method:"POST",
		url:'mini/register',
		data:data
	})
}

function miniGetPhoneNumber(data){
	return request({
		method:"POST",
		url:'mini/getPhoneNumber',
		data:data
	})
}


function miniBindPhone(data){
	return request({
		method:"POST",
		url:'mini/bindPhone',
		data:data
	})
}

function findPassword(data){
	return request({
		method:"POST",
		url:'user/findPassword',
		data:data
	})
}

export default{
	sendCode,
	bindIdentity,
	getUserInfoByWxCode,
	changeLanguageAndIdentity,
	miniWxDecode,
	miniAddUser,
	mpRegister,
	h5Login,
	miniRegister,
	miniGetPhoneNumber,
	miniBindPhone,
	findPassword
}