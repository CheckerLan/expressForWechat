// miniprogram/pages/collectState/collectState.js
const app=getApp()
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    collectList:'',
    belong:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let object=JSON.parse(options.collectList);
    this.setData({
      collectList:object,
    })
    console.log(this.data.collectList)
    if(this.data.collectList.c_puUiid==app.globalData.openid){
      this.setData({
        belong: true
      })
    }

  },
  arrival(){
    wx.showLoading({
      title: '确认送达',
      mask:true
    })

    db.collection('collect')
    .where({
      _id:this.data.collectList._id
    })
    .get()
    .then(res=>{
      console.log(res)
      console.log(res.data.length,res.data[0].c_version,this.data.collectList.c_version,this.data.collectList.c_version!=null)
      
      if(res.data.length==1 && res.data[0].c_version==this.data.collectList.c_version && this.data.collectList.c_version!=null){
        console.log("记录存在且仅仅有一条",res.data)
        wx.cloud.callFunction({
          name: 'updateCollect',
          data: {
            _id:this.data.collectList._id,
            c_state:3,
            c_version:this.data.collectList.c_version
          },
          success:(res) => {
            console.log("成功:",res)
            wx.showToast({
              title: '成功送达',
              duration: 2000
            })
            this.onShow()
          },
          fail:(err) => {
            console.log("失败:",err)
          },
          complete(){

          }
        })//end of callFunction 
      }
      wx.hideLoading()
    })
  },
  forgive(){
    wx.showLoading({
      title: '放弃订单中',
      mask:true
    })

    db.collection('collect')
    .where({
      _id:this.data.collectList._id
    })
    .get()
    .then(res=>{
      console.log(res)
      console.log(res.data.length,res.data[0].c_version,this.data.collectList.c_version,this.data.collectList.c_version!=null)
      
      if(res.data.length==1 && res.data[0].c_version==this.data.collectList.c_version && this.data.collectList.c_version!=null){
        console.log("记录存在且仅仅有一条",res.data)
        wx.cloud.callFunction({
          name: 'updateCollect',
          data: {
            _id:this.data.collectList._id,

            c_state:1,
            c_tkUiid:'',
            c_version:this.data.collectList.c_version
          },
          success:(res) => {
            console.log("放弃成功:",res)
            wx.showToast({
              title: '放弃成功',
              duration: 2000
            })
            wx.navigateBack()
          },
          fail:(err) => {
            console.log("失败:",err)
          },
          complete(){

          }
        })//end of callFunction 
      }
      wx.hideLoading()
    })
  },
  got(){
    wx.showLoading({
      title: '确认收到',
      mask:true
    })

    db.collection('collect')
    .where({
      _id:this.data.collectList._id
    })
    .get()
    .then(res=>{
      console.log(res)
      console.log(res.data.length,res.data[0].c_version,this.data.collectList.c_version,this.data.collectList.c_version!=null)
      
      if(res.data.length==1 && res.data[0].c_version==this.data.collectList.c_version && this.data.collectList.c_version!=null){
        console.log("记录存在且仅仅有一条",res.data)
        wx.cloud.callFunction({
          name: 'updateCollect',
          data: {
            _id:this.data.collectList._id,

            c_state:4,
            c_version:this.data.collectList.c_version
          },
          success:(res) => {
            console.log("确认成功:",res)
            wx.showToast({
              title: '确认成功',
              duration: 2000
            })
            // wx.navigateBack()
            this.onShow()
          },
          fail:(err) => {
            console.log("失败:",err)
          },
          complete(){

          }
        })//end of callFunction 
      }
      wx.hideLoading()
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