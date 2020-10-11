//index.js

Page({

   data: {
        inputShowed: false,
        inputVal: "TT7700490180779",
        inputCode: ""
    },
    isearch() {
        //模拟查公司代码函数
        this.setData({
            inputCode: 'HHTT'
        })
        wx.navigateTo({
          url: '/pages/result/result?expCode='+this.data.inputCode+'&expNo='+this.data.inputVal,
        })
        console.log(this.data.inputVal)

  
    },
    inputClean(){
        this.setData({
            inputVal: ''
        })
    }
    
});
