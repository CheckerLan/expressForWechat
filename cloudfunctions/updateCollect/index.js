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
        // 表示将 done 字段置为 true
        c_state: event.c_state,
        c_tkUiid:event.c_tkUiid,
        c_tkPhone:event.c_tkPhone,

        c_gmt_modified:datetime,
        c_version:event.c_version+1,
      },
      success: function(res) {
        return res
      }, fail: err => {
        //wx.showToast({
          //icon: 'none',
          //title: '订单发起失败',
        //})
      }
    })
  } catch (e) {
    console.log(e)
  }

 
}