//index.js

Page({

   data: {
        inputShowed: false,
        inputVal: "",
        inputCode: "",
        ShipperName:'',
        history:'',
    },
    isearch() {
        //模拟查公司代码函数
        /**
         * result:
            LogisticCode: "3967950525457"
            Shippers: Array(1)
            nv_length: (...)
            0:
            ShipperName: "韵达快递"
            ShipperCode: "YD"
         */
        //请求云函数
        // console.log(event.currentTarget.dataset.inputval)
        wx.showLoading({
            title: '加载中',
            mask:true
        })
        wx.cloud.callFunction({
            name: 'OrderDistinguish',
            data: {
                expCode:this.data.inputVal,
                //TT7700490180779
            },
            success:(res) => {
                // console.log("成功:",res)
                this.setData({
                    inputCode:res.result.Shippers[0].ShipperCode,
                    ShipperName:res.result.Shippers[0].ShipperName
                })
                wx.navigateTo({
                    url: '/pages/result/result?expCode='+this.data.inputCode+'&expNo='+this.data.inputVal+'&ShipperName='+this.data.ShipperName
                })
                console.log(this.data.inputVal)
                console.log("成功:",res)
                console.log(this.data.inputCode)
            },
            fail:(err) => {
                console.log("失败:",err)
            },
            complete(){
                wx.hideLoading()
            }
        })//end of callFunction  
    },
    inputClean(){
        this.setData({
            inputVal: ''
        })
    },
    onLoad:function(){
        var that=this
        wx.login({
            success (res) {
              if (res.code) {
                //发起网络请求
                wx.request({
                  url: 'https://api.weixin.qq.com/sns/jscode2session',
                  data: {
                    appid:'wxa3cbd894178f17bb',
                    secret:'6eed0162dbb6507b79ce8ce0df925782',
                    js_code:res.code,
                    grant_type:'authorization_code'

                  },
                  header: {
                    'content-type': 'application/json' // 默认值
                  },
                  success (res) {
                    console.log(res.data)
                    console.log('用户登录:'+res.data.openid)
                    that.setData({
                        //模拟数据库返回信息
                        history:{
                            0:{
                                expNo:'TT7700490180779',
                                expCode:'HHTT',
                                ShipperName:'天天快递'
                            },
                            1:{
                                expNo:'TT7700490180779',
                                expCode:'HHTT',
                                ShipperName:'天天快递'
                            }
                            
                        }
                    })
                  }
                })
              } else {
                console.log('登录失败！' + res.errMsg)
              }
            }
          })
    },
    listSearch(event){
        console.log(event)
        console.log(event.currentTarget.dataset.expNo)
        console.log(event.currentTarget.dataset.expCode)
        wx.navigateTo({
            url: '/pages/result/result?expCode='+event.currentTarget.dataset.expCode+'&expNo='+event.currentTarget.dataset.expNo+'&ShipperName='+event.currentTarget.dataset.shipperName
        })

    },
    toCollect(){
        wx.navigateTo({
            url: '/pages/collect/collect?expNo='+this.data.inputVal
        })
    },
    
});
