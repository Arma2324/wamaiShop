import ajax from './ajax'

// 获取地址
export const getAddress = (latitude, longitude) => ajax({
    url: `/position/${latitude},${longitude}`
})

// 获取轮播图目录
export const getCategory = () => ajax({
    url: '/index_category'
})

// 获取商家列表
export const getShopsList = (latitude, longitude) => ajax({
    url: '/shops',
    params: {
        latitude,
        longitude
    }
})

// 发送验证码
export const sendCode = (phone) => ajax({
    url: '/sendcode',
    params: {
        phone
    }
})

// 用户名登陆
export const loginWithPassword = (name, pwd, captcha) => ajax({
    url: '/login_pwd',
    method: 'POST',
    data: {
        name,
        pwd,
        captcha
    }
})

// 手机号登陆
export const loginWithPhoneNumber = (phone, code) => ajax({
    url: '/login_sms',
    method: 'POST',
    data: {
        phone,
        code
    }
})

// 获取用户信息
export const autoLogin = () => ajax({
    url: '/userinfo'
})

// 测试mock
export const test = () => ajax({
    url: '/test'
})

// 获取商家信息
export const getShopDatas = () => ajax({
    url: '/shopdatas'
})