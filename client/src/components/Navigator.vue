<template>
  <div id="navigator">
    <div class="nav-item" :class="{active: $route.path === '/home'}" @click="goto('/home')">
      <i class="iconfont icon-shouye"></i>
      <span>Home</span>
    </div>
    <div class="nav-item" :class="{active: $route.path === '/search'}" @click="goto('/search')">
      <i class="iconfont icon-sousuo"></i>
      <span>Search</span>
    </div>
    <div class="nav-item" :class="{active: $route.path === '/order'}" @click="goto('/order')">
      <i class="iconfont icon-dingdan"></i>
      <span>Order</span>
    </div>
    <div class="nav-item" :class="{active: $route.path === '/profile'}" @click="goto('/profile')">
      <i class="iconfont icon-gerenshezhi"></i>
      <span>Profile</span>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {

    }
  },
  methods: {
      goto(path) {
        this.$route.path !== path && this.$router.push(path)
      }
  }
}
</script>

<style scoped lang=stylus>
  @import "../common/stylus/mixins.styl";

  #navigator
    display flex
    top-border-1px(#eee)
    position fixed
    left 0
    bottom 0
    z-index 500
    width 100%
    background-color #fff
    .nav-item
      flex 1
      text-align center
      height 50px
      display flex
      flex-direction column
      .iconfont
        font-size 20px
        line-height 32px
    .active
      color $green
</style>