//app.js
App({
  
  onLaunch: function () {
    this.globalData = {
      openid:''

    }

    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        env: 'ygkd-1gxugmy7514d0ea1',
        traceUser: true,
      })
    }
    var that=this
        //重新登录
    wx.showLoading({
      title: '登录中',
    })
    wx.cloud.callFunction({
      name: 'Login',
      success:(res) => {
        console.log("app.js","longin成功:",res.result.openid)
        that.globalData.openid=res.result.openid
        
      },
      fail:(err) => {
        console.log("失败:",err)
      },
      complete(){
          wx.hideLoading()
      }
    })//end of callFunction 
    
  // wx.login({
  //   success (res) {
  //     if (res.code) {
  //       //发起网络请求
  //       wx.showLoading({
  //           title: '获取个人信息',
  //         })
  //       wx.request({
  //         url: 'https://api.weixin.qq.com/sns/jscode2session',
  //         data: {
  //           appid:'wxa3cbd894178f17bb',
  //           secret:'6eed0162dbb6507b79ce8ce0df925782',
  //           js_code:res.code,
  //           grant_type:'authorization_code'

  //         },
  //         header: {
  //           'content-type': 'application/json' // 默认值
  //         },
  //         success (res) {
  //           console.log(res.data)
  //           console.log('用户登录:'+res.data.openid)
  //           that.globalData.openid=res.data.openid
  //           console.log("app:",that.globalData.openid)
            
  //         },
  //         complete(){
  //             wx.hideLoading()
  //         }
  //       })
  //     } else {
  //       console.log('登录失败！' + res.errMsg)
  //     }
  //   },
  //   complete(){
  //       wx.hideLoading()
  //   }
  // })//end of login
  }
})
