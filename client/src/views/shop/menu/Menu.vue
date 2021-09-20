<template>
  <div class="menu">
    <div class="menu_nav">
      <ul ref="navList">
        <li
          v-for="(good, index) in goods"
          @click="changNav(index)"
          :class="{ active: navIndex === index }"
          :key="index"
        >
          {{ good.name }}
        </li>
      </ul>
    </div>
    <div class="menu_main">
      <!-- <div class="foods-wrapper" ref="foodsWrapper"> -->
      <ul ref="foodList">
        <li class="food-list-hook" v-for="(good, index) in goods" :key="index">
          <h1 class="title">{{ good.name }}</h1>
          <ul>
            <li
              class="food-item bottom-border-1px"
              v-for="food in good.foods"
              :key="food.name"
            >
              <div class="icon">
                <img width="57" height="57" :src="food.image" />
              </div>
              <div class="content">
                <h2 class="name">{{ food.name }}</h2>
                <p class="desc">{{ food.description }}</p>
                <div class="extra">
                  <span class="count">月售 {{ food.sellCount }} 份</span>
                  <span>好评率 {{ food.rating }}%</span>
                </div>
                <div class="price">
                  <span class="now">￥{{ food.price }}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <cart-control :food="food"></cart-control>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
      <!-- </div> -->
    </div>
  </div>
</template>

<script>
import CartControl from "../../../components/CartControl.vue";
import BScroll from "@better-scroll/core";
import { mapState } from "vuex";
export default {
  components: {
    CartControl,
  },
  name: "",
  data() {
    return {
      tops: [],
      navIndex: 0,
    };
  },
  computed: {
    ...mapState({
      goods: (state) => state.shop.shopdatas.goods,
    }),
  },
  methods: {
    initScroll() {
      this.leftBS = new BScroll(".menu_nav", {
        scrollY: true,
        click: true,
      });
      this.rightBS = new BScroll(".menu_main", {
        scrollY: true,
        click: true,
        probeType: 2, // 1为非实时 2为实时(惯性滑动不计算) 3为实时(惯性滑动也算)
      });
      this.rightBS.on("scroll", (position) => {
        let y = Math.abs(position.y);
        this.navIndex = this.tops.findIndex((item) => item > y) - 1;
      });
      this.rightBS.on("scrollEnd", (position) => {
        let y = Math.abs(position.y);
        this.navIndex = this.tops.findIndex((item) => item > y) - 1;
      });
    },
    calcTops() {
      const tops = []; // 暂时存储，避免频繁更新视图（优化)
      tops.push(0);
      let lis = Array.from(this.$refs.foodList.children);
      lis.reduce((pre, cur) => {
        pre += cur.clientHeight;
        tops.push(pre);
        return pre;
      }, 0);
      this.tops = tops;
    },
    changNav(index) {
      this.navIndex = index;
      this.rightBS.scrollTo(0, -this.tops[index], 1000);
    },
  },
  watch: {
    goods() {
      this.$nextTick(() => {
        this.calcTops();
        if (!this.leftBS) this.initScroll();
      });
    },
    navIndex() {
      this.leftBS.scrollToElement(
        this.$refs.navList.children[this.navIndex],
        1000
      );
    },
  },
  mounted() {
    if (!this.goods) return
    this.calcTops()
    if (!this.leftBS) this.initScroll()
  },
};
</script>

<style scoped lang="stylus">
@import "../../../common/stylus/mixins.styl"

.menu
  display flex
  height calc(100vh - 242px)
  overflow hidden
  .menu_nav
    width 80px
    background-color #f3f5f7
    ul
      li
        position relative
        height 50px
        font-size 14px
        text-align center
        line-height 50px
        &.active
          color $green
          background-color #fff
        &::after
          content ''
          width 80%
          height 1px
          position absolute
          bottom 0
          left 10%
          background-color rgba(7, 17, 27, 0.1)
  .menu_main
    flex: 1
    // overflow hidden
    // height calc(100vh - 194px)
    .title
      padding-left: 14px
      height: 26px
      line-height: 26px
      border-left: 2px solid #d9dde1
      font-size: 12px
      color: rgb(147, 153, 159)
      background: #f3f5f7
    .food-item
      display: flex
      margin: 18px
      padding-bottom: 18px
      bottom-border-1px(rgba(7, 17, 27, 0.1))
      &:last-child
        border-none()
        margin-bottom: 0
      .icon
        flex: 0 0 57px
        margin-right: 10px
      .content
        flex: 1
        .name
          margin: 2px 0 8px 0
          height: 14px
          line-height: 14px
          font-size: 14px
          color: rgb(7, 17, 27)
        .desc, .extra
          line-height: 10px
          font-size: 10px
          color: rgb(147, 153, 159)
        .desc
          line-height: 12px
          margin-bottom: 8px
        .extra
          .count
            margin-right: 12px
        .price
          font-weight: 700
          line-height: 24px
          .now
            margin-right: 8px
            font-size: 14px
            color: rgb(240, 20, 20)
          .old
            text-decoration: line-through
            font-size: 10px
            color: rgb(147, 153, 159)
        .cartcontrol-wrapper
          position: absolute
          right: 0
          bottom: 12px
</style>
