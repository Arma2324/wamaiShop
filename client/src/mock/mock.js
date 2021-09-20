import Mock from 'mockjs'
import shopDatas from './data.json'

// 测试
Mock.mock('/api/test', 'arma')
// 商家数据
Mock.mock('/api/shopdatas', {code: 0, data: shopDatas})