/**axios封装
 * 请求拦截、响应拦截、错误统一处理
 */
import axios from 'axios';


// 环境的切换
axios.defaults.baseURL = process.env.REACT_APP_BASE_API;

// 请求超时时间
axios.defaults.timeout = 10000;

// post请求头
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';

/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function get(url:string, params:object){
    return new Promise((resolve, reject) =>{
        axios.get(url, {
            params: params
        })
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                reject(err.data)
            })
    });
}
/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function post(url:string, params:object) {
    return new Promise((resolve, reject) => {
        axios.post(url, JSON.stringify(params))
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                reject(err.data)
            })
    });
}
export function upload(url:string, params:object) {
    return new Promise((resolve, reject) => {
        axios.post(url, params,{
            headers: {
                'content-type': 'multipart/form-data;'
            }
        })
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                reject(err.data)
            })
    });
}
