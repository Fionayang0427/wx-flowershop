// pages/order/order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods:[],

    allprice:0
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
    // 获取商品
    wx.request({
      url: 'http://localhost:8090/getorder', //仅为示例，并非真实的接口地址
      method:"GET",
      data:{
        user: getApp().globalData.email||''
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: (res)=> {
        console.log(res.data);
        var totalprice=0;
        for (let i = 0; i < res.data.length; i++) {
           totalprice+=res.data[i].allprice
          
        }
       this.setData({
         goods:res.data,
         allprice:totalprice
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