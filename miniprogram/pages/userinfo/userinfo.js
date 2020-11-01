// miniprogram/pages/userinfo/userinfo.js
const app=getApp()
const pageName='userinfo.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    integral:"-1",
    toptip:'',
    toptiptype:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    
    
  },

  toCollectTList(event){
    wx.navigateTo({
      url: '/pages/collectTempList/collectTempList?mode='+event.currentTarget.dataset.mode
    })
  },
  toCollectState(){
    wx.showLoading({
      title: '加载中',
      mask:true
    })
    wx.cloud.callFunction({
      name: 'getCurrentCollect',
      success:(res) => {
        console.log(pageName,"get CurrentCollect成功:",res)
        if(res.result.data.length>0){
          let str=JSON.stringify(res.result.data.reverse()[0])
          wx.navigateTo({
            url: '/pages/collectState/collectState'
            +'?collectList='+str
          })
        }else{
          // wx.showToast({
          //   title: '当前暂无订单',
          //   icon: 'loading',
          //   duration: 1000
          // })
          this.setData({
            toptip:'当前暂无订单',
            toptiptype:'error'
          })
        }
      },
      fail:(err) => {
        console.log(pageName,"get CurrentCollect失败:",err)
        
      },
      complete(){
          wx.hideLoading()
      }
    })//end of callFunction 
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})