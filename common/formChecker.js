function checkEmail(param){
	var myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
	return myreg.test(param)
}
function checkPhone(param){
	var myreg= /^1[3456789]\d{9}$/;
	return myreg.test(param)
}

function checkUrl(param){
	var myreg = /^((([a-zA-Z0-9]+-?)+[a-zA-Z0-9]+\.)+[a-zA-Z]+)(:\d+)?(\/.*)?(\?.*)?(#.*)?$/;
	return myreg.test(param)
}

export default {
	checkEmail,
	checkPhone,
	checkUrl,
}