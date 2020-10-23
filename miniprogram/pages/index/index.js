//index.js
const app=getApp()
const db = wx.cloud.database()
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
                    url: '/pages/result/result'
                    +'?expCode='+this.data.inputCode
                    +'&expNo='+this.data.inputVal
                    +'&ShipperName='+this.data.ShipperName
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

    },
    onShow:function(){
        wx.showLoading({
            title: '加载历史中',
            mask:true
        })
        db.collection('srecord')
        .where({
            uid: app.openid, // 填入当前用户 openid
        })
        .get()
        .then(res => {
            console.log("getsuccess",res.data)
            this.setData({
                history: res.data.reverse()
            })
            wx.hideLoading()
        })
        .catch(console.error)

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
    deleteHistory(event){
        var that=this
        console.log("删除",event.currentTarget.dataset._id)
        db.collection('srecord')
        .doc(event.currentTarget.dataset._id)
        .remove({
            success: function(res) {
              console.log(res)
              that.onShow()
            },
            fail:function(err){
                console.log(err)
            }
        })
    }
    
});
