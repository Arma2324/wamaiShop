<template>
  <div class="star" :class="sizeClass">
    <span v-for="status in starsClass" :class="`star-item ${status}`"></span>
  </div>
</template>

<script>
export default {
  name: '',
  props: {
    rating: {
      type: Number,
      default: 5
    },
    size: {
      type: Number,
      default: 24
    }
  },
  data () {
    return {
    }
  },
  computed: {
    starsClass() {
      let result = new Array(5).fill('off')
      let rating = this.rating 
      let full = Math.floor(rating)
      for (let i = 0; i < full; i++)
          result[i] = 'on'
      ;(rating - full > 0) && (result[full] = 'half')

      return result
    },
    sizeClass() {
      if (this.size === 24) return 'star-24'
      if (this.size === 36) return 'star-36'
      if (this.size === 48) return 'star-48'
    }
  },
  methods: {}
}
</script>

<style scoped lang=stylus>
  @import "../common/stylus/mixins.styl";

  .star //2x图 3x图
    float left
    font-size 0
    .star-item
      display inline-block
      background-repeat no-repeat
    &.star-48
      .star-item
        width 20px
        height 20px
        margin-right 22px
        background-size 20px 20px
        &:last-child
          margin-right: 0
        &.on
          bg-image('../common/images/stars/star48_on')
        &.half
          bg-image('../common/images/stars/star48_half')
        &.off
          bg-image('../common/images/stars/star48_off')
    &.star-36
      .star-item
        width 15px
        height 15px
        margin-right 6px
        background-size 15px 15px
        &:last-child
          margin-right 0
        &.on
          bg-image('../common/images/stars/star36_on')
        &.half
          bg-image('../common/images/stars/star36_half')
        &.off
          bg-image('../common/images/stars/star36_off')
    &.star-24
      .star-item
        width 10px
        height 10px
        margin-right 3px
        background-size 10px 10px
        &:last-child
          margin-right 0
        &.on
          bg-image('../common/images/stars/star24_on')
        &.half
          bg-image('../common/images/stars/star24_half')
        &.off
          bg-image('../common/images/stars/star24_off')
</style>