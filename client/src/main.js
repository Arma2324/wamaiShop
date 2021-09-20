import "lib-flexible/flexible"
import "./mock/mock.js"
import VueCookies from 'vue-cookies'
import { Button } from 'mint-ui'

import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import CommonHeader from "./components/CommonHeader.vue"
import * as API from "./api"

Vue.config.productionTip = false;

Vue.use(VueCookies)
Vue.prototype.$API = API
Vue.component(Button.name, Button)
Vue.component("CommonHeader", CommonHeader)
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app")
