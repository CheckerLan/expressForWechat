//index.js
const app=getApp()
const db = wx.cloud.database()
const pageName='index.js'
Page({

   data: {
        inputShowed: false,
        inputVal: "",
        inputCode: "",
        ShipperName:'',
        history:'',
    },
    isearch() {
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
                console.log(pageName,"OrderDistinguish成功:",res)
            },
            fail:(err) => {
                console.log(pageName,"OrderDistinguish失败:",err)
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
        .get({
            success:(res)=>{
                console.log(pageName,"get成功",res.data)
                this.setData({
                    history: res.data.reverse()
                })  
            },
            complete:()=>{
                wx.hideLoading()
            }
        })

    },
    listSearch(event){
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
        console.log(pageName,"删除历史:",event.currentTarget.dataset._id)
        db.collection('srecord')
        .doc(event.currentTarget.dataset._id)
        .remove({
            success: function(res) {
              console.log(pageName,'remove成功',res)
              that.onShow()
            },
            fail:function(err){
                console.log(pageName,'remove失败',err)
            }
        })
    }
    
});
