import Vue from "vue";
import Vuex from "vuex";
import state from "./state"
import mutations from "./mutations"
import actions from "./actions"
import getters from "./getters"
import shop from "./modules/shop.js"

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    shop
  },
  state,
  getters,
  mutations,
  actions
});
