import {
  SAVE_SHOPDATAS,
  ADD_COUNT,
  MINUS_COUNT,
  DELETE_ALL,
  SAVE_CART,
} from "../mutations-type.js";
import { getShopDatas } from "../../api/index.js";

const state = () => ({
  testdata: "arma",
  shopdatas: {},
  cart: [],
});

const getters = {
  foodNum(state) {
    // 需要传入state参数
    return state.cart.reduce((sum, food) => {
      return (sum += food.count);
    }, 0);
  },
  totalPrice(state) {
    return state.cart.reduce((total, food) => {
      return (total += food.count * food.price);
    }, 0);
  },
  positiveSize (state) {
    return state.shopdatas.ratings.reduce((preTotal, rating) => preTotal + (rating.rateType===0?1:0) , 0)
  }
};

const mutations = {
  [SAVE_SHOPDATAS](state, shopdatas) {
    state.shopdatas = shopdatas;
  },
  [ADD_COUNT](state, food) {
    !food.count && state.cart.push(food);
    food.count++;
  },
  [MINUS_COUNT](state, food) {
    food.count--;
    !food.count && state.cart.splice(state.cart.indexOf(food), 1);
  },
  [DELETE_ALL](state) {
    state.cart.forEach((food) => {
      food.count = 0;
    });
    state.cart = [];
  },
  [SAVE_CART](state, cart) {
    state.cart = cart;
  },
};

const actions = {
  async saveShopDatasAction({ commit }) {
    let result = await getShopDatas();
    commit(SAVE_SHOPDATAS, result.data);
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
