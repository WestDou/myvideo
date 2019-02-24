//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    serverUrl:app.data.serverUrl,
    videoPath:"/5/983d8823-4c0f-46fe-b16a-6f3485e88ec2.mp4",
    cover:"cover"
  },
  search:function(){
    wx.redirectTo({
      url: '../search/search',
    })
  }
  
})
