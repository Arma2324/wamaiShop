import axios from 'axios'
import qs from 'qs'   // nodejs内置的, 将json格式转换为url-encoding格式

// 生成axios伪实例，不是new Axios的实例，但拥有真正实例的所有属性和方法
const instance = axios.create({
    baseURL: '/api'
})

// 设置请求拦截器
instance.interceptors.request.use(config => {
// config包含当前请求的所有信息：method、url、data

// 修改post请求的参数格式，默认参数格式为json格式，而当前服务器只能处理url-encoding格式
    config.data = qs.stringify(config.data)
    
    return config
})

// 设置响应拦截器
instance.interceptors.response.use(
    response => response.data,
    error => {
        alert('请求失败')
        console.log(error)
        return new Promise(() => {})   // ！！！不太理解
    }
)

export default instance