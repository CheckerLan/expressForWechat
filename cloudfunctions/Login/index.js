// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
   return {
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
  // wx.request({
  //   url: 'https://api.weixin.qq.com/sns/jscode2session',
  //   data: {
  //     appid:'wxa3cbd894178f17bb',
  //     secret:'6eed0162dbb6507b79ce8ce0df925782',
  //     js_code:res.code,
  //     grant_type:'authorization_code'

  //   },
  //   header: {
  //     'content-type': 'application/json' // 默认值
  //   },
  //   success (res) {
  //     console.log(res.data)
  //     console.log('用户登录:'+res.data.openid)
  //     that.globalData.openid=res.data.openid
  //     console.log("app:",that.globalData.openid)
      
  //   },
  //   complete(){
  //       wx.hideLoading()
  //   }
  // })
}