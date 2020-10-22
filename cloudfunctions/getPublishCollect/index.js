// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
}
)
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  let datetime=new Date()

  try {
    return await 
    db.collection('collect').where({
      c_puUiid:wxContext.OPENID
    })
    .get()
    .then(res => {
      console.log("getsuccess",res.data)
      return res
    })
    .catch(console.error)
  } catch (e) {
    console.log(e)
  }
}