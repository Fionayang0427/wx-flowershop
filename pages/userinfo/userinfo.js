// pages/userinfo/userinfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sub:false,
    ifhidden:false,
    email:"",
    passw:""
  },
  getemail:function(ev){
    this.setData({
      email:ev.detail.value
    })
  },
  getpassw:function(ev){
    this.setData({
      passw:ev.detail.value
    })
  },
  handleSub:function(){
      
    wx.request({
      url: 'http://localhost:8090/login', //仅为示例，并非真实的接口地址
      method:"POST",
      data: {
        email:this.data.email,
        passw:this.data.passw
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: (res) =>{
        console.log(res.data)
        if(res.data.code==2000){//登陆成功
          // alert(res.data.info)
          // 将用户名设置为全局变量
          getApp().globalData.email = this.data.email;
          wx.showToast({
            title: res.data.info,
            icon: 'success',
            duration: 2000
          })
          this.setData({
            sub:!this.data.sub,
            ifhidden:!this.data.ifhidden
          })
          // 跳到index
        }else if(res.data.code==4001){//登陆失败
          wx.showToast({
            title: res.data.info,
            icon: 'loading',
            duration: 2000
          })
        }
      }
    })
  },
  leavelogin:function(){
    this.setData({
      sub:!this.data.sub,
      ifhidden:!this.data.ifhidden
    })
  },
  toregister:function(){
    // console.log("去注册")
    wx.redirectTo({
      url: '/pages/register/register'
    })

  },
  handleChange:function(){
   
    wx.switchTab({
      // 路径后不能带参数
      url: '/pages/index/index'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      // console.log(options.email,options.passw)
      

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