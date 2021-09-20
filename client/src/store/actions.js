import {
    SAVE_ADDRESS,
    GET_CATEGORY,
    GET_SHOPSLIST,
    SAVE_USERINFO
} from './mutations-type'
import { getAddress, getCategory, getShopsList } from '../api'

export default {
    async getAddressAction({ commit }) {
        let result = await getAddress(30.10038, 116.36867)
        result.code === 0 && commit(SAVE_ADDRESS, result.data)
    },
    async getCategoryAction({ commit }, fn) {
        let result = await getCategory()
        if (result.code === 0) {
            commit(GET_CATEGORY, result.data)
            typeof fn === 'function' && fn()
        }
    },
    async getShopsListAction({ commit }) {
        let result = await getShopsList(30.10038, 116.36867)
        if (result.code === 0) {
            commit(GET_SHOPSLIST, result.data)
        }
    },
    saveUserInfoAction({ commit }, userInfo) {
        commit(SAVE_USERINFO, userInfo)
    }
}