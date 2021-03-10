import request from './request.js'

function getAreas(data) {
	return request({
		method: "GET",
		url: 'getAreas',
		data: data
	})
}

function getAreasByChar(data) {
	return request({
		method: "GET",
		url: 'getAreasByChar',
		data: data
	})
}


export default {
	getAreas,
	getAreasByChar
}