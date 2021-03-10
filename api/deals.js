import request from './request.js'

function addDeals(data){
	return request({
		method:"POST",
		url:'deals/addDeals',
		data:data
	})
}

function dealsList(data){
	return request({
		method:"GET",
		url:'deals/dealsList',
		data:data
	})
}


function detail(data){
	return request({
		method:"GET",
		url:'deals/detail',
		data:data
	})
}
// /visitor/dealInfo
function visitorDealInfo(data){
	return request({
		method:"GET",
		url:'visitor/dealInfo',
		data:data
	})
}

function myDeals(data){
	return request({
		method:"GET",
		url:'myDeals',
		data:data
	})
}
export default{
	addDeals,
	dealsList,
	detail,
	visitorDealInfo,
	myDeals
}