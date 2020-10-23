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
  toCollectState(){
    wx.cloud.callFunction({
      name: 'getCurrentCollect',
      success:(res) => {
        console.log("成功:",res)
        if(res.result.data.length>0){
          let str=JSON.stringify(res.result.data.reverse()[0])
          wx.navigateTo({
            url: '/pages/collectState/collectState'
            +'?collectList='+str
          })
        }
      },
      fail:(err) => {
        console.log("失败:",err)
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
    var that=this
    this.setData({
      collectList:'',
      currentCollect:''
    })
    wx.showLoading({
      title: '加载当前接受的订单中',
      mask:true
    })
    wx.cloud.callFunction({
      name: 'getCurrentCollect',
      success:(res) => {
        console.log("成功:",res)
        if(res.result.data.length>0){
          this.setData({
            currentCollect:res.result.data.reverse()[0]
          })
        }
      },
      fail:(err) => {
        console.log("失败:",err)
      },
      complete(){

          wx.showLoading({
            title: '加载代拿列表中',
            mask:true
          })
          db.collection('collect').where({
            c_state:1,
            c_is_deleted:false
          })
          .get()
          .then(res => {
              console.log("getsuccess",res.data)
              that.setData({
                collectList:res.data.reverse()
              })
              wx.hideLoading()
          })
          .catch(console.error)
          
      }
    })

    



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