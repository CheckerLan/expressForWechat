// miniprogram/pages/userinfo/userinfo.js
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nickName:'',
    avatarUrl:'',
    logined:false,
    integral:"-1",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    
    
  },
  bindGetUserInfo (e){
    console.log(e.detail.userInfo)
    this.setData({
      nickName:e.detail.userInfo.nickName,
      avatarUrl:e.detail.userInfo.avatarUrl,
    })
    this.onShow()
  },
  toCollectTList(event){
    wx.navigateTo({
      url: '/pages/collectTempList/collectTempList?mode='+event.currentTarget.dataset.mode
    })
  },
  toCollectState(){
    wx.cloud.callFunction({
      name: 'getCurrentCollect',
      success:(res) => {
        console.log("成功:",res)
        if(res.result.data.length==1){
          let str=JSON.stringify(res.result.data[0])
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
    console.log(app.openid)
    
    wx.getSetting({
      success (res){
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称

          wx.getUserInfo({
            success: function(res) {
              console.log('userinfo:'+res.userInfo.nickName)
              console.log(res.userInfo.avatarUrl)
              that.setData({
                nickName:res.userInfo.nickName,
                avatarUrl:res.userInfo.avatarUrl,
                logined:true
              })
            },
            fail(){
              this.setData({
                logined:false
              })
            }            
          })//end of getuserinfo
        }
      },
      fail(){
        this.setData({
          logined:false
        })
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