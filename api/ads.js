import request from './request.js'

function list(data){
	return request({
		method:"GET",
		url:'ad/list',
		data:data
	})
}



export default{
	list
}