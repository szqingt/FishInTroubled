play.imayu.com/app/captcha.jpg // 验证码

/app/login
// login data
"account": vm.account,
"password": vm.password,
"v_code": vm.captcha,
"version": 1,
"isWeb": 1

// result
data: null
errCode: -99
message: "请输入验证码"
success: false
