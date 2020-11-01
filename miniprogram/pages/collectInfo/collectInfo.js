// pages/collectInfo/collectInfo.js
const app=getApp()
const db = wx.cloud.database()
const pageName='collectInfo.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    collectList:'',
    belong:false,
    toptip:'',
    toptiptype:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    let object=JSON.parse(options.collectList);
    this.setData({
      collectList:object,
    })
    console.log(pageName,'colleList',this.data.collectList)
    if(this.data.collectList.c_puUiid==app.globalData.openid){
      this.setData({
        belong: true
      })
    }

  },
  acceptCollect(e){
    var that=this
    console.log(pageName,'opendid验证:',this.data.collectList.c_puUiid,app.globalData.openid)
    if(this.data.collectList.c_puUiid==app.globalData.openid){
      wx.showToast({
        title: '无法接受自己的订单',
        icon:'none',
        duration:2000
      })
      return
    }
    wx.showLoading({
      title: '加载中',
      mask:true
    })

    db.collection('collect')
    .where({
      _id:this.data.collectList._id
    })
    .get({
      success:(res)=>{
        console.log(res)
        
        if(res.data.length==1 
          && res.data[0].c_version==this.data.collectList.c_version 
          && this.data.collectList.c_version!=null
          ){
          console.log(pageName,"记录存在且仅仅有一条",res.data)

          wx.navigateTo({
            url: '/pages/enterInfo/enterInfo',
            events:{
              tkInfo: function(data) {
                console.log(pageName,'get form enterInfo成功',data)
                if(data.c_tkPhone&&data.ui_idName&&data.ui_idCode){
                  wx.cloud.callFunction({
                    name: 'updateCollect',
                    data: {
                      _id:that.data.collectList._id,
                      c_state:2,
                      c_version:that.data.collectList.c_version,
                      c_tkPhone:data.c_tkPhone,
                    },
                    success:(res) => {
                      console.log(pageName,"接受订单(update)成功:",res)
                      wx.showToast({
                        title: '接受订单成功',
                        duration: 2000
                      })
                      db.collection('collect')
                      .where({
                          _id:that.data.collectList._id, // 填入当前用户 openid
                      })
                      .get({
                        success:(res)=>{
                          console.log(pageName,"get collect成功",res.data)
                          let str=JSON.stringify(res.data[0])
                          wx.redirectTo({
                            url: '/pages/collectState/collectState'
                            +'?collectList='+str
                          }) 
                        }
                      })
                    },
                    fail:(err) => {
                      console.log(pageName,"接受订单(update)失败:",err)
                    },
                    complete(){
                      wx.hideLoading()
                    }
                  })//end of callFunction 
                }else{
                  // wx.showToast({
                  //   title: '信息不全,无法接单',
                  //   icon: 'loading',
                  //   duration: 1000
                  // })
                  that.setData({
                    toptip:'信息不全,无法接单',
                    toptiptype:'error'
                  })
                  wx.hideLoading()
                }
                
              }
              //end of tkInfo
              
            }
            //end of events
          })
          //end of navigatoTo

        }
        //end of if
      }
    })
    //end of get in collect

  },
  deleteCollect(){
    var that=this
    console.log(pageName,'opendid验证:',this.data.collectList.c_puUiid,app.globalData.openid)
    wx.showLoading({
      title: '删除订单中',
      mask:true
    })

    db.collection('collect')
    .where({
      _id:this.data.collectList._id
    })
    .get({
       success:(res)=>{
        console.log(pageName,'get Collect成功',res)
      
        if(res.data.length==1 
          && res.data[0].c_version==that.data.collectList.c_version 
          && that.data.collectList.c_version!=null
          ){
          console.log(pageName,"记录存在且仅仅有一条",res.data)
          wx.cloud.callFunction({
            name: 'deleteCollect',
            data: {
              _id:that.data.collectList._id,
              c_version:that.data.collectList.c_version
            },
            success:(res) => {
              console.log(pageName,"删除订单(update)成功:",res)
              wx.showToast({
                title: '删除订单成功',
                duration: 2000
              })
              wx.navigateBack()
              
            },
            fail:(err) => {
              console.log(pageName,"删除订单(update)失败:",err)
            },
            complete(){
                
            }
          })//end of callFunction 
        }
        wx.hideLoading()
       }//end of sucess
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