<template>
  <section class="loginContainer">
      <div class="loginInner">
        <div class="login_header">
          <h2 class="login_logo">wamai外卖</h2>
          <div class="login_header_title">
            <a href="javascript:;" @click="isPwdLogin = false" :class="{on: !isPwdLogin}">短信登录</a>
            <a href="javascript:;" @click="isPwdLogin = true" :class="{on: isPwdLogin}">密码登录</a>
          </div>
        </div>
        <div>
          <ValidationObserver class="login_content" v-slot="{ handleSubmit }">
            <form @submit.prevent="handleSubmit(login)">
              <ValidationObserver class="test" v-if="!isPwdLogin">
                <section class="login_message">
                  <ValidationProvider rules="required|phone" v-slot="{ errors }">
                    <input name="phone" v-model="phoneNumber" type="tel" maxlength="11" placeholder="手机号">
                    <span style="color: red">{{ errors[0] }}</span>
                  </ValidationProvider>
                  <button @click.prevent="getCode" 
                  :disabled="!rightPhoneNumber || !!countDown" 
                  class="get_verification" 
                  :class="{highlight: rightPhoneNumber && !!!countDown}"
                  >
                  {{ countDown ? countDown + 's' : '获取验证码' }}
                  </button>
                </section>
                <section class="login_verification">
                  <ValidationProvider rules="required|digits:6" v-slot="{ errors }">
                    <input name="code" v-model="code" type="tel" maxlength="6" placeholder="验证码">
                    <span style="color: red">{{ errors[0] }}</span>
                  </ValidationProvider>
                </section>
                <section class="login_hint">
                  温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
                  <a href="javascript:;">《用户服务协议》</a>
                </section>
              </ValidationObserver>
              <ValidationObserver class="test" v-if="isPwdLogin">
                <section>
                  <section class="login_message">
                    <ValidationProvider rules="required" v-slot="{ errors }">
                      <input name="uname" v-model="userName" type="tel" maxlength="11" placeholder="手机/邮箱/用户名">
                      <span style="color: red">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </section>
                  <section class="login_verification">
                    <ValidationProvider rules="required" v-slot="{ errors }">
                      <input name="psw" v-model="password" :type="isShow?'tel':'password'" maxlength="8" placeholder="密码">
                      <span style="color: red">{{ errors[0] }}</span>
                    </ValidationProvider>
                    <div class="switch_button" :class="isShow?'on':'off'">
                      <div class="switch_circle" :class="{show: isShow}" @click="isShow = !isShow"></div>
                      <span class="switch_text">{{ isShow ? 'abc' : '...'}}</span>
                    </div>
                  </section>
                  <section class="login_message">
                    <ValidationProvider rules="required" v-slot="{ errors }">
                      <input name="captcha" v-model="captcha" type="text" maxlength="4" placeholder="验证码">
                      <span style="color: red">{{ errors[0] }}</span>
                    </ValidationProvider>
                    <img class="get_verification" :src="captchaSrc" alt="captcha" @click="changeCaptcha">
                  </section>
                </section>
              </ValidationObserver>
              <button class="login_submit">登录</button>
              <a href="javascript:;" class="about_us">关于我们</a>
            </form>
          </ValidationObserver>
        </div>
        <a href="javascript:" class="go_back">
          <i class="iconfont icon-jiantou2"></i>
        </a>
      </div>
    </section>
</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import '../../veeValidate/index.js'
export default {
  components: {
    ValidationProvider,
    ValidationObserver
  },
  name: 'Login',
  data () {
    return {
      isPwdLogin: true,
      isShow: false,
      captchaSrc: 'http://localhost:4000/captcha',
      phoneNumber: '',
      countDown: 0,
      code: '',
      userName: '',
      password: '',
      captcha: ''
    }
  },
  computed: {
    rightPhoneNumber() {
      return /^1(3|4|5|6|7|8|9)\d{9}/.test(this.phoneNumber)
    }
  },
  methods: {
    changeCaptcha() {
      this.captchaSrc = this.captchaSrc + '?time=' + Date.now()
    },
    async getCode() {
      // 开始倒计时
      this.countDown = 5
      let intervalId = setInterval(() => {
        this.countDown--
        !this.countDown && clearInterval(intervalId)
      }, 1000);
      // 发送验证码
      let result = await this.$API.sendCode(this.phoneNumber)
      if (result.code) {
        alert(result.msg)
      } else {
        alert('验证码发送成功！')
      }
    },
    async login() {
      let {isPwdLogin, userName, password, captcha, phoneNumber, code} = this
      let result = null
      if (isPwdLogin) {   // 密码登陆
        result = await this.$API.loginWithPassword(userName, password, captcha)
        if (result.code) {
          alert(result.msg)
          // 更换验证码
          this.changeCaptcha()
          // 清空之前的验证码
          this.captcha = ''
        }
      } else {    // 手机号登陆
        result = await this.$API.loginWithPhoneNumber(phoneNumber, code)
        if (result.code) {
          alert(result.msg)
        }
      }
      // 统一处理登陆成功的情况
      if (!result.code) {
        this.$router.replace('/profile')
        //保存用户信息
        this.$store.dispatch("saveUserInfoAction", result.data)
      }                      
    }
  }
}
</script>

<style scoped lang=stylus>
  .loginContainer
      width 100%
      height 100%
      background #fff
      .loginInner
        padding-top 60px
        width 80%
        margin 0 auto
        .login_header
          .login_logo
            font-size 40px
            font-weight bold
            color #02a774
            text-align center
          .login_header_title
            padding-top 40px
            text-align center
            >a
              color #333
              font-size 14px
              padding-bottom 4px
              &:first-child
                margin-right 40px
              &.on
                color #02a774
                font-weight 700
                border-bottom 2px solid #02a774
        .login_content
          >form
            .test
              /* display none
              &.on
                display block */
              input
                width 100%
                height 100%
                padding-left 10px
                box-sizing border-box
                border 1px solid #ddd
                border-radius 4px
                outline 0
                font 400 14px Arial
                &:focus
                  border 1px solid #02a774
              .login_message
                position relative
                margin-top 16px
                height 48px
                font-size 14px
                background #fff
                .get_verification
                  position absolute
                  top 50%
                  right 10px
                  transform translateY(-50%)
                  border 0
                  color #ccc
                  font-size 14px
                  background transparent
                  &.highlight
                    color #333
              .login_verification
                position relative
                margin-top 16px
                height 48px
                font-size 14px
                background #fff
                .switch_button
                  font-size 12px
                  border 1px solid #ddd
                  border-radius 8px
                  transition background-color .3s,border-color .3s
                  padding 0 6px
                  width 30px
                  height 16px
                  line-height 16px
                  color #fff
                  position absolute
                  top 50%
                  right 10px
                  transform translateY(-50%)
                  &.off
                    background #fff
                    .switch_text
                      float right
                      color #ddd
                  &.on
                    background #02a774
                  >.switch_circle
                    position absolute
                    top -1px
                    left -1px
                    width 16px
                    height 16px
                    border 1px solid #ddd
                    border-radius 50%
                    background #fff
                    box-shadow 0 2px 4px 0 rgba(0,0,0,.1)
                    transition transform .3s
                    &.show
                      transform translateX(27px)
              .login_hint
                margin-top 12px
                color #999
                font-size 14px
                line-height 20px
                >a
                  color #02a774
            .login_submit
              display block
              width 100%
              height 42px
              margin-top 30px
              border-radius 4px
              background #4cd96f
              color #fff
              text-align center
              font-size 16px
              line-height 42px
              border 0
          .about_us
            display block
            font-size 12px
            margin-top 20px
            text-align center
            color #999
        .go_back
          position absolute
          top 5px
          left 5px
          width 30px
          height 30px
          >.iconfont
            font-size 20px
            color #999
</style>