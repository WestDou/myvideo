//index.js
//获取应用实例
const app = getApp()

Page({
  data: {

  },
  //事件处理函数
  doRegist: function(e) {
    var username = e.detail.value.username;
    var password = e.detail.value.password;
    //判断是否为空
    if (username.length == 0 || password.length == 0) {
      wx.showToast({
        title: '账号或密码不能为空',
        icon: 'none'
      })
    } else {
      var serverUrl = app.data.serverUrl;
      wx.showLoading({
        title: '请等待...',
      })
      wx.request({
        url: serverUrl + '/regist',
        method: "POST",
        data: {
          username: username,
          password: password
        },
        header: {
          "content-type": "application/json"
        },
        success: function(res) {
          wx.hideLoading();
          if (res.data.status == 200) {
            wx.showToast({
              title: '注册成功',
            })
          } else {
            wx.showToast({
              title: res.data.msg,
              icon:'none'
            })
          }
        }
      })
    }


  },
  goLoginPage:function(){
    wx.redirectTo({
      url: '../userLogin/login',
    })
  }
})