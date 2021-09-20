<template>
  <div>
    <ShopHeader />
    <div class="tab">
      <div class="tab-item">
        <router-link to="/shop/menu" replace>点餐</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/shop/comment" replace>评价</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/shop/shopinfo" replace>商家</router-link>
      </div>
    </div>
    <keep-alive>
      <router-view />
    </keep-alive>
    <shop-cart v-show="$route.path !== '/shop/shopinfo'"></shop-cart>
  </div>
</template>

<script>
import ShopHeader from "../../components/ShopHeader.vue";
import ShopCart from "../../components/ShopCart.vue";
import { mapState } from "vuex";
export default {
  components: {
    ShopHeader,
    ShopCart,
  },
  name: "",
  data() {
    return {};
  },
  computed: {
    ...mapState({
      shopdatas: (state) => state.shop.shopdatas,
    }),
  },
  methods: {},
  mounted() {
    //获取sessionStorage中的shopdatas数据;
    const shopdatas = JSON.parse(sessionStorage.getItem("shopdatas"));
    if (shopdatas) {
      // sessionStorage中有shopdatas数据，将其存至vuex中
      this.$store.commit("SAVE_SHOPDATAS", shopdatas);
      const cart = shopdatas.goods.reduce((pre, good) => {
        pre.push(...good.foods.filter((food) => food.count));
        return pre;
      }, []);
      this.$store.commit("SAVE_CART", cart);
    } else {
      console.log("1111111");
      //sessionStorage中没有数据，请求初始数据
      this.$store.dispatch("saveShopDatasAction");
    }
    //刷新之前保存shopdatas数据到sessionStorage中;
    window.addEventListener("unload", () => {
      console.log("savet0session");
      sessionStorage.setItem("shopdatas", JSON.stringify(this.shopdatas));
    });
  },
};
</script>

<style scoped lang="stylus">
@import "../../common/stylus/mixins.styl"

.tab
  display flex
  //width 100%
  //bottom-border-1px(#eee)
  .tab-item
    flex 1
    height 40px
    text-align center
    font-size 16px
    line-height 40px
    a
      display inline-block
      &.router-link-active
        color $green
        bottom-border-1px($green)
</style>
