// miniprogram/pages/result/result.js
const app=getApp()
const db = wx.cloud.database()
const pageName='result.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    condition:1,
    expCode:'',
    expNo:'',
    ShipperName:'',
    //物流运单号
    LogisticCode:'',
    //物流状态
    State:'',
    //轨迹信息
    Traces:'',

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.setData({
      expCode: options.expCode,
      expNo: options.expNo,
      ShipperName:options.ShipperName
    })
    console.log(pageName,'当前订单:',this.data.expCode,this.data.expNo)
    //请求云函数
    wx.showLoading({
      title: '查询中',
      mask:true
    })
    wx.cloud.callFunction({
        name: 'TrackQuery',
        data: {
            expCode: this.data.expCode,
            //TT7700490180779
            expNo: this.data.expNo
        },
        success:(res) => {
            this.setData({
              condition:1,
              //订单编号	
              expNo:res.result.OrderCode,
              //快递公司编码
              expCode:res.result.ShipperCode,
              //物流运单号
              LogisticCode:res.result.LogisticCode,
              //物流状态
              /**
                0-暂无轨迹信息
                1-已揽收
                2-在途中
                3-签收
                4-问题件
               */
              State:res.result.State,
              //轨迹信息
              Traces:res.result.Traces.reverse()
            })

            db.collection('srecord')
            .where({
              _openid: app.openid, // 填入当前用户 openid
              expNo: this.data.expNo
            })
            .get({
              success:(res) => {
                console.log(pageName,'get form srecord成功',res.data)
                if(res.data.length<=0){
                  console.log(pageName,"数据库为空")
                  db.collection('srecord').add({
                    // data 字段表示需新增的 JSON 数据
                    data: {
                      _openid: app.openid, // 填入当前用户 openid
                      expNo: this.data.expNo,
                      expCode:this.data.expCode,
                      expName:this.data.ShipperName
                    },
                    success:(res)=>{
                      console.log(pageName,"add成功",res)
                    }
                  })
                  //end of add
  
                }else{
                  console.log(pageName,"记录已存在")
                }//end if
              }
              //end of success in get
            })
            //end of get

        },
        fail:(err) => {
            this.setData({
              condition:-1
            })
            console.log(pageName,"get失败:",err)
        },
        complete(){
          wx.hideLoading()
        }
    })//end of callFunction
  },
  copyCode(){
    wx.setClipboardData({
      data: this.data.LogisticCode,
      success (res) {
        wx.getClipboardData({
          success (res) {
            console.log(pageName,'复制数据:',res.data) // data
          }
        })
      }
    })
  },
  toIndex(){
    wx.navigateBack()
  },
  toCollect(){
    wx.navigateTo({
      url: '/pages/collect/collect?expNo='+this.data.expNo
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