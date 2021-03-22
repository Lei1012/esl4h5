import request from './request.js'

function vipList(data){
	return request({
		method:"GET",
		url:'home/vipList',
		data:data
	})
}
function changeVipLevel(data){
	return request({
		method:"POST",
		url:'home/changeVipLevel',
		data:data
	})
}

function preBuyVip(data){
	return request({
		method:"POST",
		url:'vendor/preBuyVip',
		data:data
	})
}

export default{
	vipList,
	changeVipLevel,
	preBuyVip
}