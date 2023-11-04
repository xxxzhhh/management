import axios from "axios";
// 超时时间是5秒
axios.defaults.timeout = 5000;
// 允许跨域
axios.defaults.withCredentials = true;
// Content-Type 响应头
axios.defaults.headers.post["Content-Type"] =
    "application/x-www-form-urlencoded;charset=UTF-8";
// 基础url
// axios.defaults.baseURL = 后台接口地址;
axios.defaults.baseURL = 'http://127.0.0.1:3000';
//设置拦截器
axios.interceptors.request.use(
    (config) => {
        if (localStorage.getItem('Authorization')) {
            config.headers.Authorization = localStorage.getItem('Authorization');
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
/**
 * 封装get方法
 */
export function get(url, params = {}) {
    return new Promise((resolve, reject) => {
        axios
            .get(url, { params: params })
            .then(response => {
                resolve(response.data);
            })
            .catch(err => {
                reject(err.response.data);
            });
    });
}
/**
 * 封装post方法
 */
export function post(url, data = {}) {
    return new Promise((resolve, reject) => {
        axios
            .post(url, data)
            .then(response => {
                //console.log(response)
                resolve(response.data);
            })
            .catch(err => {
                //console.log(err)
                reject(err.response.data);
            });
    });
}