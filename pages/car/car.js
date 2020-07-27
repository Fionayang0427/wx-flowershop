// pages/car/car.js
var util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
      goods:[],
      count:[],
      allprice:0,
      // hidden:true
  },
  add:function(ev){
    console.log(ev)
    wx.request({
      url: 'http://localhost:8090/setcar', //仅为示例，并非真实的接口地址
      method:"GET",
      data:{
        gid: ev.target.dataset.id+1,
        flag:1,
        user: getApp().globalData.email||''
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: (res)=> {
        console.log(res.data)
        this.onShow()
       
      }
    })
  },
  jian:function(ev){
    var index=ev.target.dataset.id
    console.log(this.data.count[index].gcount)
    if(this.data.count[index].gcount==0){
      wx.showToast({
        title: "不能再少啦",
        icon:'success',
        duration: 1000
      })
      return false
    }
    wx.request({
      url: 'http://localhost:8090/setcar', //仅为示例，并非真实的接口地址
      method:"GET",
      data:{
        gid: ev.target.dataset.id+1,
        flag:2,
     
        user: getApp().globalData.email||''
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: (res)=> {
        console.log(res.data)
        
        
        this.onShow()
      }
    })
    
  },
  check:function(){
    var length=this.data.goods.length;
    var order=[];
    var dayTime = util.formatTime(new Date());
    // console.log(dayTime)
    for(var i=0;i<length;i++){
      // this.data.goods[i].price*this.data.count[i].gcount;
      var obj={}
      obj.src=this.data.goods[i].img;
      obj.title=this.data.goods[i].title;
      obj.price=this.data.goods[i].price;
      obj.gcount=this.data.count[i].gcount;
      obj.email= getApp().globalData.email ;
      obj.otime=dayTime;
      order.push(obj)
    }
    console.log(order)
    // wx.setStorageSync('orderinfo', order)
    wx.request({
      url: 'http://localhost:8090/setorder', //仅为示例，并非真实的接口地址
      method:"POST",
      data: {
        obj:order
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success (res) {
        console.log(res.data)
        　wx.showModal({
          title: '提示',
          content: '支付成功，是否跳转到订单页面',
          success(res) {
            if (res.confirm) {
              wx.switchTab({
                url: '/pages/order/order'
              })

                // 
  wx.request({
    url: 'http://localhost:8090/setcar', //仅为示例，并非真实的接口地址
    method:"GET",
    data:{
      
      flag:3,
      user: getApp().globalData.email||''
    },
    header: {
      'content-type': 'application/json' // 默认值
    },
    success: (res)=> {
      console.log(res.data)
    
     
    }
  })

            } 
       }    
      })
    }
   
    
   
   
 
    

  })






},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
    console.log("ok")
    wx.request({
      url: 'http://localhost:8090/getcar', //仅为示例，并非真实的接口地址
      method:"GET",
      data:{
        user: getApp().globalData.email||''
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: (res)=> {
        console.log(res.data.info)
        var length=this.data.goods.length;
        var all=0;
        for(var i=0;i<length;i++){
          all+=this.data.goods[i].price*this.data.count[i].gcount;
        }
        this.setData({
          goods:res.data.info.result,
          count:res.data.info.carr,
          allprice:all
        })
       
      }
    })

    // 
 
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})