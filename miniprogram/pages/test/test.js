// miniprogram/pages/test/test.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.cloud.callFunction({
      name: 'TrackQuery',
      data: {
        expCode: "HHTT",
        expNo: "TT7700490180779",
      },
      success:(res) => {
        console.log("成功:",res)
      },
      fail:(err) => {
        console.log("失败:",err)
      }
    })
  }
})