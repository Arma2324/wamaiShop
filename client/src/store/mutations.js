import {
    SAVE_ADDRESS,
    GET_CATEGORY,
    GET_SHOPSLIST,
    SAVE_USERINFO,
    LOGOUT,

} from './mutations-type'

export default {
    [SAVE_ADDRESS](state, address) {
        state.address = address
    },
    [GET_CATEGORY](state, category) {
        state.category = category
    },
    [GET_SHOPSLIST](state, shops) {
        state.shops = shops
    },
    [SAVE_USERINFO](state, userInfo) {
        state.userInfo = userInfo
    },
    [LOGOUT](state) {
        state.userInfo = {}
    },

}