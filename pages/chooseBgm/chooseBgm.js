//index.js
//获取应用实例
const app = getApp()

Page({
  onReady(e) {
    // 使用 wx.createAudioContext 获取 audio 上下文 context
    this.audioCtx = wx.createAudioContext('myAudio')
  },
  data: {
    bgmList: [],
    serverUrl: app.data.serverUrl,
    tempFilePath: "",
    duration: "",
    height: "",
    width: ""
  },
  //事件处理函数
  audioPlay() {
    this.audioCtx.play()
  },
  audioPause() {
    this.audioCtx.pause()
  },
  onLoad: function(e) {
    var me = this;
    me.setData({
      tempFilePath: e.tempFilePath,
      duration: e.duration,
      height: e.height,
      width: e.width,
    })
    var serverUrl = app.data.serverUrl;
    wx.showLoading({
      title: '请等待...',
    })
    wx.request({
      url: serverUrl + "/bgm/list",
      method: "POST",
      header: {
        "content-type": "application/json"
      },
      success: function(res) {
        me.setData({
          bgmList: res.data.data
        })
        // console.log(me.data.bgmList);
        wx.hideLoading();
      }
    })
  },
  uploadVideo: function(e) {
    var me = this;
    wx.showLoading({
      title: '请等待...',
    })
    var serverUrl = app.data.serverUrl;
    wx.uploadFile({
      url: serverUrl + "/video/uploadVideo",
      filePath: me.data.tempFilePath,
      name: 'file',
      formData: {
        duration: me.data.duration,
        height: me.data.height,
        width: me.data.width,
        bgmId: e.detail.value.bgmId,
        desc: e.detail.value.desc,
        userId: app.userInfo.id
      },
      success(res) {
        //上传成功todo
        wx.hideLoading();
        var data = res.data;
        data = JSON.parse(data);
        if (data.status == 200) {
          wx.showToast({
            title: '上传成功',
            icon: "success"
          })
        } else {
          wx.showToast({
            title: '上传失败',
            icon: "none"
          })
        }
      }
    })
  }



})