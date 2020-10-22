// miniprogram/pages/collectlist/collectlist.js
const app=getApp()
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    collectList:'',
    currentCollect:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  toCollectinfo(event){
    let index=event.currentTarget.dataset.index  
    let str=JSON.stringify(this.data.collectList[index])
    wx.navigateTo({
      url: '/pages/collectInfo/collectInfo'
      +'?collectList='+str
    }) 
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
    wx.cloud.callFunction({
      name: 'getCurrentCollect',
      success:(res) => {
        console.log("成功:",res)
        if(res.result.data.length==1){
          this.setData({
            currentCollect:res.result.data[0]
          })
        }
      },
      fail:(err) => {
        console.log("失败:",err)
      },
      complete(){
          wx.hideLoading()
      }
    })

    db.collection('collect').where({
      c_state:1
    })
    .get()
    .then(res => {
        console.log("getsuccess",res.data)
        this.setData({
          collectList:res.data
        })

    })
    .catch(console.error)



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