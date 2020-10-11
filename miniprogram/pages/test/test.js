// miniprogram/pages/test/test.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    val:"",
    message:""
  },
  talks:function(e){
    this.setData({
       talks:e.detail.value
    })           
},
  but(){  // 通过but点击事件触发后面的函数
   var that=this;
    console.log("你好")
    console.log(this.data.talks)
    wx.cloud.callFunction({
      name: 'TrackQuery',
      data: {
        expCode: "HHTT",
        expNo: this.data.talks,
      },
      success:(res) => {
        console.log("成功:",res)
        this.setData({
          message:res.result.LogisticCode+"\n"+res.result.ShipperCode,
          
        })
        res.result.Traces.forEach(element => {
          this.setData({
            message:this.data.message+"\n"+element.AcceptStation
          })
          
        })
      },
      fail:(err) => {
        console.log("失败:",err)
      }
  })

},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  }
})