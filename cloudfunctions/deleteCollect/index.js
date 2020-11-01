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
    return await db.collection('collect')
    .doc(event._id)
    .update({
      // data 传入需要局部更新的数据
      data: {
        c_is_deleted:true,
        c_gmt_modified:datetime,
        c_version:event.c_version+1,
      },
      success: function(res) {
        return res
      }, fail: err => {

      }
    })
  } catch (e) {
    console.log(e)
  }
}