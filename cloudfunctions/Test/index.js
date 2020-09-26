// 云函数入口文件
const cloud = require('wx-server-sdk')
var request = require('request')
cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {

  request({
    url: 'http://api.kdniao.com/Ebusiness/EbusinessOrderHandle.aspx',
    data: {
      'RequestType': '1002',
      'EBusinessID': '1237100',
      'RequestData': '%7b%27OrderCode%27%3a%27%27%2c%27ShipperCode%27%3a%27SF%27%2c%27LogisticCode%27%3a%27118954907573%27%7d',
      'DataSign' :'OWFhM2I5N2ViM2U2MGRkMjc4YzU2NmVlZWI3ZDk0MmE%3d',
      'DataType':'2'
    },
    header: {
      'content-type': 'application/json' // 默认值
    },
    success: (res) => {
      console.log("请求成功: "+ res.data)
    },
    fail: (res) => {
      console.log("请求错误"+res)
    }
    
  })

}