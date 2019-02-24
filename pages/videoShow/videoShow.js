//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    total:"",
    videoList:[],
    pages:"",
    pageNum:"",
    serverUrl:app.data.serverUrl,
    value:null
  },
  onLoad:function(req){
    var me = this;
    me.setData({
      pageNum:1,
    })
    if(req.value!=null){
      me.setData({
        value: req.value,
      })
    }
    wx.showLoading({
      title: '加载中...',
    })
    me.getVideo();
  },
  onPullDownRefresh:function(){
    wx.showNavigationBarLoading()
    var me = this;
    me.setData({
      pageNum: 1
    })
    me.getVideo();
  },
  onReachBottom:function(){
    var me = this;
    if (me.data.pageNum == me.data.pages) {
      wx.showToast({
        title: '已经到底啦',
        icon: "none"
      })
      return;
    }
    me.setData({
      pageNum:me.data.pageNum+1
    })
    me.getVideo();
  },
  getVideo:function(){
    var me = this;
    var serverUrl = app.data.serverUrl;
    
    wx.request({
      url: serverUrl + "/video/listAllVideo?pageNum=" + me.data.pageNum+"&value="+me.data.value,
      method: "POST",
      header: {
        "content-type": "application/json"
      },
      success: function (res) {
        wx.hideLoading();
        wx.stopPullDownRefresh();
        wx.hideNavigationBarLoading();
        if (res.data.status == 200) {
          if (res.data.data.pageNum == 1) {
            me.setData({
              videoList: []
            })
          }
          me.setData({
            total: res.data.data.total,
            videoList: me.data.videoList.concat(res.data.data.list),
            pages: res.data.data.pages
          })
        } else {
          wx.showToast({
            title: '加载出错',
            icon: "none"
          })
        }

      }
    })

  
  }

})
