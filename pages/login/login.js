const app = getApp()
Page({

  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    wx.navigateBack({
      url: '../shouye/shouye'
    })
  },

  /**
   * 页面的初始数据
   */
  data: {

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
  onShow: function() {
    const session_id = wx.getStorageSync('session_id');
    if (!session_id) {
      wx.showToast({
        title: '正在登录',
        icon: 'succes',
        duration: 2000,
        mask: true
      })

      wx.login({
        success(res) {
          if (res.code) {
            wx.request({
              url: 'https://test.com/onLogin',
              data: {
                code: res.code
              },
              success(res) {
                wx.setStorageSync('session_id', res.session_id)
              }
            })
          } else {
            console.log('登录失败！' + res.errMsg)
          }
        }
      })

    }
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