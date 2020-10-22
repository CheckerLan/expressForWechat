// miniprogram/pages/collectTempList/collectTempList.js
const app=getApp()
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    collectList:'',
    mode:'',

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      mode:options.mode
    }) 
    if(options.mode=='acceptCollect'){
      wx.cloud.callFunction({
        name: 'getTakenCollect',
        success:(res) => {
          console.log("成功:",res)
          this.setData({
            collectList:res.result.data
          })
        },
        fail:(err) => {
          console.log("失败:",err)
        },
        complete(){
            wx.hideLoading()
        }
      })//end of callFunction 
    }else if(options.mode=='publishCollect'){
      wx.cloud.callFunction({
        name: 'getPublishCollect',
        success:(res) => {
          console.log("成功:",res)
          this.setData({
            collectList:res.result.data
          })
        },
        fail:(err) => {
          console.log("失败:",err)
        },
        complete(){
            wx.hideLoading()
        }
      })//end of callFunction 

    }
  },
  toCollectinfo(event){
    let index=event.currentTarget.dataset.index
    let str=JSON.stringify(this.data.collectList[index])
    if(this.data.mode=='acceptCollect'){
      
      wx.navigateTo({
        url: '/pages/collectState/collectState'
        +'?collectList='+str
      })
    }else if(this.data.mode=='publishCollect'){
      wx.navigateTo({
        url: '/pages/collectInfo/collectInfo'
        +'?collectList='+str
      }) 
    }

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