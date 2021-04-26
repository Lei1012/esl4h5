import request from './request.js'

function add(data) {
	return request({
		method: "POST",
		url: 'job/add',
		data: data
	})
}

function addProfile(data){
	return request({
		method:"POST",
		url:'job/addProfile',
		data:data
	})
}
function jobList(data){
	return request({
		method:"GET",
		url:'job/jobList',
		data:data
	})
}

function detail(data){
	return request({
		method:"GET",
		url:'job/detail',
		data:data
	})
}

function serviceList(data){
	return request({
		method:"GET",
		url:'job/serviceList',
		data:data
	})
}
function getPrepayId(data){
	return request({
		method:"POST",
		url:'getPrepayId',
		data:data
	})
}
function addJobServices(data){
	return request({
		method:"POST",
		url:'job/addJobServices',
		data:data
	})
}


function visitorJobInfo(data){
	return request({
		method:"GET",
		url:'visitor/jobInfo',
		data:data
	})
}


function applyJobs(data){
	return request({
		method:"POST",
		url:'job/applyJobs',
		data:data
	})
}

function myJobs(data){
	return request({
		method:"GET",
		url:'job/myJobs',
		data:data
	})
}

function myApplyJobs(data){
	return request({
		method:"GET",
		url:'job/myApplyJobs',
		data:data
	})
}
// job/getJobResume
function getJobResume(data){
	return request({
		method:"GET",
		url:'job/getJobResume',
		data:data
	})
}

// 首页广告职位列表
function featureList(data){
	return request({
		method:"GET",
		url:'featureList',
		data:data
	})
}

function changeJobs(data){
	return request({
		method:"POST",
		url:'job/changeJobs',
		data:data
	})
}

function jobViews(data){
	return request({
		method:"POST",
		url:'job/jobViews',
		data:data
	})
}
function miniAppPay(data){
	return request({
		method:"POST",
		url:'miniAppPay',
		data:data
	})
}

function wapPay(data){
	return request({
		method:"POST",
		url:'wapPay',
		data:data
	})
}

function refreshJobs(data){
	return request({
		method:"POST",
		url:'job/refreshJobs',
		data:data
	})
}

export default {
	add,
	addProfile,
	jobList,
	detail,
	serviceList,
	getPrepayId,
	addJobServices,
	visitorJobInfo,
	applyJobs,
	myJobs,
	myApplyJobs,
	getJobResume,
	featureList,
	changeJobs,
	jobViews,
	miniAppPay,
	wapPay,
	refreshJobs
}