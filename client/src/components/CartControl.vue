<template>
  <div class="cartcontrol">
    <transition name="rotate">
      <div
        class="iconfont icon-jian"
        v-show="food.count"
        @click="changCount(false)"
      ></div>
    </transition>
    <div class="cart-count" v-show="food.count">{{ food.count }}</div>
    <div class="iconfont icon-jia" @click="changCount(true)"></div>
  </div>
</template>

<script>
export default {
  name: "",
  props: ["food"],
  data() {
    return {};
  },
  methods: {
    changCount(isAdd) {
      if (isAdd) {
        !this.food.count && this.$set(this.food, "count", 0);
        this.$store.commit("ADD_COUNT", this.food);
      } else {
        this.food.count && this.$store.commit("MINUS_COUNT", this.food);
      }
    },
  },
};
</script>

<style scoped lang="stylus">
@import "../common/stylus/mixins.styl"
.cartcontrol
  display flex
  font-size 16px
  .rotate-enter-active
    transition all .3s
  .rotate-enter
    transform translateX(28px) rotate(180deg)
  .iconfont
    padding 2px
    color $green
    font-size 22px
  .cart-count
    width 28px
    text-align center
    line-height 26px
</style>
