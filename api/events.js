import request from './request.js'

function addEvent(data){
	return request({
		method:"POST",
		url:'event/addEvent',
		data:data
	})
}

function eventList(data){
	return request({
		method:"GET",
		url:'event/eventList',
		data:data
	})
}


function detail(data){
	return request({
		method:"GET",
		url:'event/detail',
		data:data
	})
}

function visitorEventInfo(data){
	return request({
		method:"GET",
		url:'visitor/eventInfo',
		data:data
	})
}

function myEvent(data){
	return request({
		method:"GET",
		url:'myEvent',
		data:data
	})
}

export default{
	addEvent,
	eventList,
	detail,
	visitorEventInfo,
	myEvent
}