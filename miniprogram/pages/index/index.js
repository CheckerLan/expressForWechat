//index.js

Page({

   data: {
        inputShowed: false,
        inputVal: "",
        inputCode: "",
        ShipperName:''
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
        wx.cloud.callFunction({
            name: 'OrderDistinguish',
            data: {
                expCode: this.data.inputVal,
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
            }
        })//end of callFunction


       

  
    },
    inputClean(){
        this.setData({
            inputVal: ''
        })
    }
    
});
