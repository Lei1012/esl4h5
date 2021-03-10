import request from './request.js'

function getSubCateList(data) {
	return request({
		method: "GET",
		url: 'weixin/subCateList',
		data: data
	})
}

function getSubCateLists(data) {
	return request({
		method: "GET",
		url: 'weixin/subCateLists',
		data: data
	})
}


function addEduBasic(data){
	return request({
		method: "POST",
		url: 'user/addEduBasic',
		data: data
	})
}

function addBusinessBasic(data){
	return request({
		method: "POST",
		url: 'user/addBusinessBasic',
		data: data
	})
}
function addVendorBasic(data){
	return request({
		method: "POST",
		url: 'user/addVendorBasic',
		data: data
	})
}
function getBasicInfo(data){
	return request({
		method: "GET",
		url: 'user/info',
		data: data
	})
}

function getUserObjectList(data){
	return request({
		method: "GET",
		url: 'user/userObjectList',
		data: data
	})
}

function addProfile(data){
	return request({
		method: "POST",
		url: 'user/addProfile',
		data: data
	})
}

function addUserInfo(data){
	return request({
		method: "POST",
		url: 'user/addUserInfo',
		data: data
	})
}

function addUserImg(data){
	return request({
		method: "POST",
		url: 'user/addUserImg',
		data: data
	})
}
function addUserWork(data){
	return request({
		method: "POST",
		url: 'user/addUserWork',
		data: data
	})
}
function addUserEducation(data){
	return request({
		method: "POST",
		url: 'user/addUserEducation',
		data: data
	})
}

function addLanguageScore(data){
	return request({
		method: "POST",
		url: 'user/addLanguageScore',
		data: data
	})
}
function visitorUserInfo(data){
	return request({
		method: "get",
		url: 'visitor/userInfo',
		data: data
	})
}

// 更新教育者信息完整度
function updateEduProfile(data){
	return request({
		method: "post",
		url: 'user/updateEduProfile',
		data: data
	})
}

// user/updateBusProfile 更新企业信息完整度
function updateBusProfile(data){
	return request({
		method: "post",
		url: 'user/updateBusProfile',
		data: data
	})
}
// 更新vendor 信息完整度
function updateVendorProfile(data){
	return request({
		method: "post",
		url: 'user/updateVendorProfile',
		data: data
	})
}
// esl.com/api/getUserIntegrity?user_id=3
function  getUserIntegrity(data){
	return request({
		method: "GET",
		url: 'getUserIntegrity',
		data: data
	})
}

function  getApplicationContact(data){
	return request({
		method: "GET",
		url: 'educator/contact',
		data: data
	})
}


export default {
	getSubCateList,
	addEduBasic,
	addBusinessBasic,
	addVendorBasic,
	getBasicInfo,
	getUserObjectList,
	addProfile,
	addUserInfo,
	addUserImg,
	addUserWork,
	addUserEducation,
	addLanguageScore,
	visitorUserInfo,
	updateEduProfile,
	updateBusProfile,
	updateVendorProfile,
	getUserIntegrity,
	getApplicationContact,
	getSubCateLists
}