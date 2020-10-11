// 云函数入口文件
const cloud = require('wx-server-sdk')
const crypto = require('crypto')
var rp = require('request-promise')
cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  var expCode=event.expCode
  const EBusinessID="1673892"
  const AppKey="7d3b0bf5-184e-40fa-af66-5e78a0c2c13c"
  const requestype = "2002"
  const requestData = "{'LogisticCode':'"+expCode+"'}"
  console.log(requestData+AppKey)
  const md5 = crypto.createHash("md5")

  md5.update(new Buffer(requestData + AppKey))
  var md5buffer=md5.digest("hex").toLocaleLowerCase();
  console.log(md5buffer)
  var datasign = new Buffer(md5buffer).toString('base64')
  
  console.log("datasign2: "+datasign)
  const fdatasign =encodeURIComponent(datasign, "utf-8")
  console.log(fdatasign)
  console.log(requestData)
  console.log(encodeURIComponent(requestData, "utf-8").replace(/'/g, "%27"))

  const options = {
    uri: 'http://api.kdniao.com/Ebusiness/EbusinessOrderHandle.aspx',
    qs: {
      RequestData: encodeURIComponent(requestData, "utf-8").replace(/'/g, "%27"),
      EBusinessID: EBusinessID,
      RequestType: requestype, 
      DataSign: fdatasign,
      DataType:"2"
    },
    headers: {
        // 'User-Agent': 'Request-Promise',
        "user-agent": "Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1;SV1)",
        "connection": "Keep-Alive",
        "accept": "*/*",
        "Content-Type": "application/x-www-form-urlencoded"
    }, 
    json: true // Automatically parses the JSON string in the response
  };
  console.log(options)
  let result = await rp(options)
    .then(function (parsedBody) {
      return parsedBody
        // POST succeeded...
    })
    .catch(function (err) {
      console.error(err)
        // POST failed...
    });

  return result
}