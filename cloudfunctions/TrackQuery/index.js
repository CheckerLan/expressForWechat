// 云函数入口文件
const cloud = require('wx-server-sdk')
const crypto = require('crypto')
const rp = require("request-promise")


cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  var expCode=event.expCode
  var expNo=event.expNo
  const EBusinessID="1673892"
  const AppKey="7d3b0bf5-184e-40fa-af66-5e78a0c2c13c"
  const requestype = "1002"
  const requestData = "{'OrderCode':'','ShipperCode':'" + expCode + "','LogisticCode':'" + expNo + "'}"
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

//   let options = {
//     method: "POST",
//     uri: "http://api.kdniao.com/Ebusiness/EbusinessOrderHandle.aspx",
//     body: {
//       "RequestData":requestData,
//       "EBusinessID": EBusinessID,
//       "RequestType": requestype,
//       "DataSign": datasign,
//       "DataType":"2"
//     },
//     json: true // Automatically stringifies the body to JSON
// };


  // const options={
  //   // uri:'http://api.kdniao.com/Ebusiness/EbusinessOrderHandle.aspx?RequestType=1002&EBusinessID=1673892&RequestData=%7b%27OrderCode%27%3a%27%27%2c%27ShipperCode%27%3a%27SF%27%2c%27LogisticCode%27%3a%27118954907573%27%7d&DataSign=OWFhM2I5N2ViM2U2MGRkMjc4YzU2NmVlZWI3ZDk0MmE%3d&DataType=2'
  //   uri:'http://api.kdniao.com/Ebusiness/EbusinessOrderHandle.aspx?RequestData=%7B%27OrderCode%27%3A%27%27%2C%27ShipperCode%27%3A%27ANE%27%2C%27LogisticCode%27%3A%27210001633605%27%7D&EBusinessID=1673892&DataType=2&DataSign=OTU5NWE2ZjA0NjY1M2E0MGZhMDFhYzRjMDhlYTJjNjM%3D&RequestType=1002',
  //   headers:{
  //     charset:"utf-8"
  //   }
  // }
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