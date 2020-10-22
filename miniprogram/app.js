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
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        // env: 'my-env-id',
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
        console.log("成功:",res.result.openid)
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
