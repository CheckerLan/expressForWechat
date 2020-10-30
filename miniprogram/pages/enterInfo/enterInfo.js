// miniprogram/pages/enterInfo/enterInfo.js
const app=getApp()
const db = wx.cloud.database()
const pageName='enterInfo.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userinfo:'',
    c_tkPhone:''

  },

  back(){
    let that = this
    console.log(pageName,"back:",that.data)
    const eventChannel = this.getOpenerEventChannel()
    db.collection('userinfo')
    .where({
      _openid:app.globalData.openid
    })
    .get({
      success: function(res) {
        if(res.data.length<=0){
          db.collection('userinfo')
          .add({
            data:{
              _id:app.globalData.openid,
              ui_idName:that.data.ui_idName,
              ui_idCode:that.data.ui_idCode
            },
            success:(res)=>{
              wx.navigateBack({
                success:()=>{
                  eventChannel.emit('tkInfo', {
                    ui_idName:that.data.ui_idName,
                    ui_idCode:that.data.ui_idCode,
                    c_tkPhone:that.data.c_tkPhone
                  });
                }
              })
              //end of navigateBack
              console.log("add")
            },
            fail:()=>{
    
            }
          })
          //end of add
        }else{
          db.collection('userinfo')
          .doc(res.data[0]._id)
          .update({
            data: {
              ui_idName:that.data.ui_idName,
              ui_idCode:that.data.ui_idCode
            },
            success: (res)=>{
              wx.navigateBack()
              //end of navigateBack
              console.log(pageName,'update成功',res)
            }, 
            fail: (err)=> {
    
            }
          })
          //end of update
        }
        //end of if
      }
      //end of success in get()
    })
    //end of get()
  },
  cancel(){
    wx.navigateBack()
 
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    db.collection('userinfo')
    .where({
      _id:app.globalData.openid
    })
    .get({
      success:(res)=>{
        console.log(pageName,'get userInfo成功',res)
        if(res.data.length>0){
        this.setData({
          ui_idName:res.data[0].ui_idName,
          ui_idCode:res.data[0].ui_idCode
        })
      }
      }
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
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.emit('tkInfo', {
      ui_idName:this.data.ui_idName,
      ui_idCode:this.data.ui_idCode,
      c_tkPhone:this.data.c_tkPhone
    });

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