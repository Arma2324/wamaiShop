import { extend } from 'vee-validate';
import { required, email, digits } from 'vee-validate/dist/rules';
import { localize } from 'vee-validate';
import zh_CN from 'vee-validate/dist/locale/zh_CN.json';

localize('zh_CN', zh_CN);

localize({
  zh_CN: {
    messages: {
      phone: '{_field_}必须为11位数字',
      digits: '{_field_}为6位数字'
    }
  }
});

localize({
  zh_CN: {
    names: {
      phone: '手机号',
      code: '验证码',
      uname: '用户名',
      psw: '密码',
      captcha: '验证码'
    }
  },
});

// No message specified.
extend('email', email);

extend('digits', digits)

// Override the default message.
extend('required', {
  ...required,
});

extend('phone', phoneNumber => {
  if (/^1(3|4|5|6|7|8|9)\d{9}/.test(phoneNumber))
    return true
})


