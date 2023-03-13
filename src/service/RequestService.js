/**axios封装
 * 请求拦截、相应拦截、错误统一处理
 */
import axios from 'axios';
import QS from 'qs';
// import fileDownload from 'js-file-download'
// import store from '../store/index'
// import { getLocalToken,getDev,getTestDate } from '../utils/commFn'
// import JSONbig from "json-bigint";

// 请求超时时间
axios.defaults.timeout = 30 * 60 * 1000;

// post请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// 请求拦截器
axios.interceptors.request.use(
    config => {
        const isJsonContentType = config.headers['Content-Type'] && config.headers['Content-Type'].includes('application/json') ? true : false
        let url = config.url
        config.data = config.data || {}

        config.headers['App-Version'] = 'v1.1'

        if (config.method === 'get' && config.data) {//get的参数直接解析成url
            if(!url.includes('?')){
                url += '?'
            }
            config.data = decodeURIComponent(QS.stringify(config.data, {
                indices: false,
                arrayFormat: 'brackets'
            }))
            
            url += config.data
            config.url = url
            config.data = {}
        }
        
        if(config.method === 'post' && !isJsonContentType){
            config.data = QS.stringify(config.data, {//application/x-www-form-urlencoded 需要qs解析下
                indices: false,
                arrayFormat: config.arrayFormat || 'brackets'
            })
        }

        return config;
    },
    error => {
        return Promise.error(error);
    })

// 响应拦截器
axios.interceptors.response.use(
    response => {
        if (response.status === 200) {
            return Promise.resolve(response);
        } else {
            return Promise.reject(response);
        }
    },
    // 服务器状态码不是200的情况    
    error => {
        console.error(error)
    }
);
/** 
 * get方法，对应get请求 
 * @param {String} url [请求的url地址] 
 * @param {Object} params [请求时携带的参数] 
 */
export function get(url, params={}) {
    return new Promise((resolve, reject) => {
        axios({
            method:'get',
            url:url, 
            transformResponse: [function (data) {
                return JSON.parse(data)
            }],
            data:params
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
export function post(url, params,arrayFormat) {
    return new Promise((resolve, reject) => {
        axios.post(url, params,arrayFormat)
        .then(res => {
            resolve(res.data);
        })
        .catch(err => {
            reject(err.data)
        })
    });
}

/**
 * 下载文件
 * @param {*} url 
 * @param {*} params 
 * @returns 
 */
export function downFile(url,params){
    return new Promise((resolve, reject) => {
        axios({
            url,
            params,
            responseType:'blob'
        })
        .then(res => {
            let nameInfo = res.headers['content-disposition']
            if(nameInfo){
                let fileName = ''
                if(nameInfo && nameInfo.split('filename=').length > 1){
                    fileName = nameInfo.split('filename=')[1]
                }
                console.log(res)
                fileDownload(res.data,fileName)
            }else{
                vueObj.$message.error('导出数据不存在，请更换筛选条件重试')
            }
            
            resolve()
        })
        .catch(err => {
            reject(err)
        })
    });
}