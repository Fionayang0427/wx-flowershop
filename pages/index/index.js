//index.js
//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsarr:[],
    user:"",
    login:false,
    gcount:0
  },
  tologin:function(){
    wx.switchTab({
      url: '/pages/userinfo/userinfo'
    })
  },
 
  intocar:function(ev){
   
    wx.request({
      url: 'http://localhost:8090/setcar', //仅为示例，并非真实的接口地址
      method:"GET",
      data:{
        gid: ev.target.dataset.id+1,

     
        user: getApp().globalData.email||''
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: (res)=> {
        console.log(res.data)
        wx.showToast({
          title: res.data.info,
          icon:'success',
          duration: 1000
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:function(options) {
    // var that=this
    // var email = getApp().globalData.email||''
    // console.log(email)
    // if(email!=''){
    //   that.setData({
    //     user:email,
    //     login:!that.data.login
    //   })
    // }
   
  
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
    var that=this
    var email = getApp().globalData.email||''
    console.log(email)
    if(email!=''){
      that.setData({
        user:email,
        login:!that.data.login
      })
    }
    wx.request({
      url: 'http://localhost:8090/home_goods', //仅为示例，并非真实的接口地址
      method:"GET",
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: (res)=> {
        console.log(res.data)
        this.setData({
          goodsarr:res.data
        })
      }
    })
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
