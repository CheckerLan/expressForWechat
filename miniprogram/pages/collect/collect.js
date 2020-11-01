// miniprogram/pages/collect/collect.js
const app=getApp()
const db = wx.cloud.database()
const pageName='collect.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    weightarray: [1,2,3,4,5],
    index:0,

    pupointlist:'',
    pupointindex:0,

    expNo:'',
    c_address:'',
    c_phonenubmer:'',
    c_info:'',
    c_code:'',


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      expNo:options.expNo,
    })
  },
  publishcollect(){
      wx.showLoading({
        title: '发布中',
        mask:true
      })
      wx.cloud.callFunction({
        name: 'addCollect',
        data: {
          c_state:1,
          c_pupoint:this.data.pupointlist[this.data.pupointindex].p_name,
          c_wight:this.data.weightarray[this.data.index],
          c_address:this.data.c_address,
          
          c_info:this.data.c_info,
          c_code:this.data.c_code,

          c_puUiid:app.openid,
          c_puPhone:this.data.c_phonenubmer,
          c_tkUiid:'',
          c_tkPhone:''
        },
        success:(res) => {
          console.log(pageName,"add Collect成功:",res)

          db.collection('collect')
          .where({
              _id:res.result._id, // 填入当前用户 openid
          })
          .get({
            success:(res)=>{
              wx.showToast({
                title: '发布成功',
                duration: 2000
              })

              console.log(pageName,"get成功",res.data)

              let str=JSON.stringify(res.data[0])
              wx.redirectTo({
                url: '/pages/collectInfo/collectInfo'
                +'?collectList='+str
              }) 
            }
          })
          //end of get
          
        },
        fail:(err) => {
          console.log(pageName,"失败:",err)
        },
        complete(){
            wx.hideLoading()
        }
        //end of get
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
    db.collection('pupoint').where({
      p_area:"广东财经大学"
    })
    .get({
      success:(res)=>{
        console.log(pageName,"get area成功",res.data)

        this.setData({
          pupointlist: res.data,
        })
      }
    })
    //end of get

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