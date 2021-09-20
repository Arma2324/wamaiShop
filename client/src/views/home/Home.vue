<template>
  <section class="msite">
      <!--首页头部-->
      <common-header :title="address.name || '定位中...'">
        <template v-slot:left>
          <i class="iconfont icon-sousuo"></i>
        </template>
        <template v-slot:right>
          登录|注册
        </template>
      </common-header>
      <!--首页导航-->
      <nav class="msite_nav">
        <div class="swiper-container">  
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(subCategory, index) in newCategory" :key="index">
              <a href="javascript:" class="link_to_food" v-for="item in subCategory" :key="item.id">
                <div class="food_container">
                  <img :src="`https://fuss10.elemecdn.com/${item.image_url}`">
                </div>
                <span>{{ item.title }}</span>
              </a>
            </div>
          </div>
          <!-- Add Pagination -->
          <div class="swiper-pagination"></div>
        </div>
      </nav>
      <!--首页附近商家-->
      <shops-list></shops-list>
  </section>
</template>

<script>
import Swiper from 'swiper/swiper-bundle.min.js'
import 'swiper/swiper-bundle.min.css'
import _ from 'lodash'
import CommonHeader from '../../components/CommonHeader.vue'
import ShopsList from '../../components/ShopsList.vue'
import { mapState } from 'vuex'
// @ is an alias to /src

export default {
  components: { 
    CommonHeader,
    ShopsList
  },
  name: "Home",
  created() {
    this.$store.dispatch('getAddressAction')
    this.$store.dispatch('getCategoryAction', () => {
      this.$nextTick(() => {
        new Swiper('.swiper-container', {
	        pagination: {
            el: '.swiper-pagination',
          },
          loop: true
        })
      })
    })

    
  },
  computed: {
    ...mapState({
      address: state => state.address,
      category: state => state.category
    }),
    newCategory() {
      return _.chunk(this.category, 8)
    }
  }
};
</script>

<style scoped lang="stylus">
  @import "../../common/stylus/mixins.styl";
  
    &.msite  //首页
      width 100%
      
      .msite_nav
        bottom-border-1px(#e4e4e4)
        margin-top 45px
        height 200px
        background #fff
        .swiper-container
          width 100%
          height 100%
          overflow-x hidden
          //--swiper-pagination-color $green
          .swiper-wrapper
            width 100%
            height 100%
            
            .swiper-slide
              display flex
              justify-content center
              align-content center
              flex-wrap wrap
              height 100%
              .link_to_food
                width 25%
                .food_container
                  display block
                  width 100%
                  text-align center
                  padding-bottom 10px
                  font-size 0
                  img
                    display inline-block
                    width 50px
                    height 50px
                span
                  display block
                  width 100%
                  text-align center
                  font-size 13px
                  color #666
          /deep/.swiper-pagination
            >span.swiper-pagination-bullet-active
              background #02a774
      
</style>
