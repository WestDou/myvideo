//index.js
//获取应用实例
var app = getApp()

Page({
  data: {
    faceImgPath: "../resource/face.png",
    fansCount:0,
    followCount:0,
    likeCount:0
  },
  //事件处理函数
  changeFace: function() {
    var me = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        var serverUrl = app.data.serverUrl;
        console.info(tempFilePaths)
        wx.showLoading({
          title: '请等待...',
        })
        wx.uploadFile({
          url: serverUrl + "/user/uploadFace?userId=" + app.userInfo.id,
          filePath: tempFilePaths[0],
          name: 'file',
          success(res) {
            wx.hideLoading();
            var data = res.data
            data = JSON.parse(data)
            if (data.status == 200) {
              wx.showToast({
                title: '上传成功!',
                icon: "success"
              })
              me.setData({
                faceImgPath: serverUrl + data.data.faceImage
              })
            } else {
              wx.showToast({
                title: data.msg,
                icon: "none"
              })
            }


          }
        })
      }
    })
  },
  logout:function(){
    var serverUrl = app.data.serverUrl;
    var userInfo = app.userInfo;
    wx.showLoading({
      title: '请等待...',
    })
    wx.request({
      url: serverUrl + "/logout?userId=" + userInfo.id,
      method: "POST",
      header: {
        "content-type": "application/json"
      },
      success: function (res) {
        wx.hideLoading();
        if (res.data.status == 200) {
          wx.showToast({
            title: '注销成功',
          })
          app.userInfo = null;
          console.info(app.userInfo)
          //完成页面跳转
          wx.redirectTo({
            url: '../userLogin/login',
          })

        }
  }

})
  },
  onLoad:function(){
    var userInfo = app.userInfo;
    var serverUrl = app.data.serverUrl;
    this.setData({
      faceImgPath:serverUrl + userInfo.faceImage,
      fansCount:userInfo.fansCounts,
      followCount:userInfo.followCounts,
      likeCount:userInfo.receiveLikeCounts
    })
  },
  uploadpro:function(){
    wx.chooseVideo({
      sourceType: ['album', 'camera'],
      maxDuration: 10,
      camera: 'back',
      success(res) {
        // console.log(res)
        // console.log(res.tempFilePath)f
        var tempFilePath = res.tempFilePath;
        var serverUrl = app.data.serverUrl;
        var duration = res.duration;
        var height = res.height;
        var width = res.width;
        if(duration>10){
          wx.showToast({
            title: '视频不能大于大于10秒',
            icon: 'none'
          })
        }else{
          wx.redirectTo({
            url: '../chooseBgm/chooseBgm?tempFilePath='+tempFilePath
              + "&duration=" + duration
              + "&height=" + height
              + "&width=" + width,
          })
        }
        
      }
    })
  }
})