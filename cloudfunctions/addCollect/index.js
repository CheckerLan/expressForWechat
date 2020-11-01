// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
}
)
const db = cloud.database()


// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()//目的：获取_openid
  let datetime=new Date()
 
  try {
    return await db.collection('collect').add({
      data: {
        /**
         * -1:不存在
         * 0：无状态
         * 1：已发布
         * 2：已被接受
         * 3：已送达
         * 4：确认送达=》订单完成
         */
        c_state:event.c_state,
        c_pupoint:event.c_pupoint,
        c_wight:event.c_wight,
        c_address:event.c_address,
       
        c_info:event.c_info,
        c_code:event.c_code,

        c_puUiid: wxContext.OPENID,
        c_puPhone:event.c_puPhone,
        c_tkUiid:'',
        c_tkPhone:'',

        
        c_gmt_create:datetime,
        c_gmt_modified:datetime,
        c_version:0,
        c_is_deleted:false

      }, success: res => {
        return res
      }, fail: err => {
        return err
      }
    })
  } catch (e) {
    console.log(e)
  }

}