import axios from 'axios'
import qs from 'qs'
import Vue from 'vue'
import store from '@/store'
import {
	config
} from "./config"
	import { getSession } from '../util/tools.js';
import md5 from '../util/md5.js'
import {univerifyLogin} from "./univerifyLogin";
let baseURL = config.baseUrl;
// axios实例
axios.defaults.timeout = 30000;

/**
 * 请求加密参数设置
 */
function setPlaint() {
	let hexUnid = uni.getStorageSync('userdata') ? JSON.parse(uni.getStorageSync('userdata')).hexUnid : '';
	// let token = getSession('accessToken')
	// 	token = token ? token : ''
	// 	if(!token){
			// let userScoreInfo = getSession('userScoreInfo') ? getSession('userScoreInfo') : ''
			// if(userScoreInfo && userScoreInfo.customerId){
			// 	// delete userScoreInfo.customerId
			// 	localStorage.removeItem('userScoreInfo')
			// 	userScoreInfo.customerId = ''
			// 	uni.setStorageSync('userScoreInfo', JSON.stringify(userScoreInfo));
			// }

		// }

	// login接口和getCustomerById增加返回字段hexUnid，用于生成随机码，随机码=hexUnid+6位随机数
	var randomNum = ('000000' + Math.floor(Math.random() * 999999)).slice(-6);
	let nowVerifyNonce =(hexUnid||'')+''+randomNum;
	let timestamp =new Date().getTime();
	let plaintData = {
		verifyTimestamp: timestamp,
		verifyNonce:nowVerifyNonce,
		verifySign:md5.hexMD5(timestamp+'_'+nowVerifyNonce+'_'+config.verify)
	}
	return plaintData;
}

/**
 * get 请求数据进行修改  默认以对象形式传参
 */
function getDataConfig(data = {}) {
	if (typeof data !== 'object') return data
	const arr = []
	for (let key in data) {
		let res = `${key}=${data[key]}`
		arr.push(res)
	}
	const str = arr.join('&')
	return str
}


/**
 * 请求数据拦截
 */
axios.interceptors.request.use(config => {
	// if (config.method === 'post') config.data = qs.stringify(config.data)
	// 此处应该行不通
	// if (config.method === 'get') config.data = getDataConfig(config.data)
	return config
}, error => {
	return Promise.reject(error)
})
/**
 * 响应数据拦截
 */
axios.interceptors.response.use(response => {
	let isLogin = getSession('isLogin')
	if(response.data.resultCode === '45000' || response.data.resultCode === '44000'){
		   uni.showToast({title: response.data.message, icon: 'none'});
			store.commit('user/CLEAR_CUSTOM_DATA')
			if(isLogin){
			uni.setStorageSync('isLogin', false);
			setTimeout(()=>{
				univerifyLogin(1);

			},1000)
			setTimeout(()=>{
				location.reload()
			},1050)
		}
	}
	if(response.config){
		return response.data
	}else{
	    return response
	}

}, error => {
	// console.log('err='+error)
	return Promise.reject(error)
})
//真机获取
//  #ifndef H5
axios.defaults.adapter = function(config) {
	return new Promise((resolve, reject) => {
		var settle = require('axios/lib/core/settle');
		var buildURL = require('axios/lib/helpers/buildURL');
		uni.request({
			method: config.method.toUpperCase(),
			url: buildURL(config.url, config.params, config.paramsSerializer),
			header: config.headers,
			data: config.data,
			dataType: config.dataType,
			responseType: config.responseType,
			sslVerify: config.sslVerify,
			complete: function complete(response) {
				response = {
					data: response.data,
					status: response.statusCode,
					errMsg: response.errMsg,
					header: response.header,
					config: config
				};
				settle(resolve, reject, response);
			}
		})
	})
}
// #endif

const fetch = {
	post(url, item, status = '0000') {
		let token = getSession('accessToken')
			token = token ? token : ''
			if(token){
				item = Object.assign(item || {},{accessToken:token}, setPlaint())
			}else{
				item = Object.assign(item || {}, setPlaint())
			}

		let data = qs.stringify(item)

		return new Promise((resolve, reject) => {
			axios({
				method: 'post',
				url: baseURL + url,
				data: data,
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				}
			}).then(response => {
				// if(response)
				resolve(response)
				// if (response && response.resultCode === status) {

				// } else {
				//     reject(response )
				// }
			}).catch(error => {
				//错误
				reject(JSON.stringify(error))
			})
		})
	},
	get(url, request, status = '0000') {
		let token = getSession('accessToken')
			token = token ? token : ''
			if(token){
				request = Object.assign(request || {},{accessToken:encodeURIComponent(token)}, setPlaint())
			}else{
				request = Object.assign(request || {}, setPlaint())
			}
		const data = getDataConfig(request)
		console.log("接口",baseURL + url + '?' + data)
		return new Promise((resolve, reject) => {
			axios({
				method: 'get',
				url: baseURL + url + '?' + data,
				headers: {
					'Content-Type': 'application/json',
					'Accept': 'application/json'
				}
			}).then(response => {
				resolve(response)
				// if (response && response.resultCode === status) {

				// } else {
				//     reject(response)
				// }
			}).catch(error => {
				reject(JSON.stringify(error))
			})
		})
	},
	getUrl(url, request, status = '0000') {
		const data = getDataConfig(request);
		let URL = !!data ? url + '?' + data : url;
		return new Promise((resolve, reject) => {
			axios({
				method: 'get',
				url: URL,
				headers: {
					'Content-Type': 'application/json',
					'Accept': 'application/json'
				}
			}).then(response => {
				resolve(response)
			}).catch(error => {
				reject(JSON.stringify(error))
			})
		})
	},
	_post(url, item, status = '0000') {
		let token = getSession('accessToken')
			token = token ? token : ''
			if(token){
				item = Object.assign(item || {},{accessToken:token}, setPlaint())
			}else{
				item = Object.assign(item || {}, setPlaint())
			}
		// item = Object.assign(item || {}, setPlaint())
		// let data = qs.stringify(item)
		return new Promise((resolve, reject) => {
			axios({
				method: 'post',
				url: baseURL + url,
				data: item,
				headers: {
					'Content-Type': 'application/json'
				}
			}).then(response => {
				resolve(response)
				// if (response && response.resultCode === status) {

				// } else {
				//     reject(response )
				// }
			}).catch(error => {
				//错误
				reject(JSON.stringify(error))
			})
		})
	},
}
export default fetch
