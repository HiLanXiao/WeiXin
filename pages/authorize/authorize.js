const app = getApp()

Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    motto: 'Hello Smallapp',
    //检查微信版本
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  getUserInfo: function (e) {
    console.log("尝试得到用户授权信息", e)
    if (e.detail.userInfo) {
      app.globalData.userInfo = e.detail.userInfo
      console.log("authorize授权成功",e.detail.userInfo)
      var session_id = wx.getStorageSync('session_id');
      if (!session_id) {
        wx.showToast({
          title: '正在登录',
          icon: 'loading',
          duration: 1500,
          mask: true
        })
        wx.login({
          success(res) {
            if (res.code) {
              wx.request({
                url: 'http://127.0.0.1:5000/login/',
                header: {
                  "Content-Type": "application/x-www-form-urlencoded"
                },
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
      wx.navigateBack({

      })
    }
    else {
      console.log("授权失败")
      wx.showModal({
        title: '错误操作',
        content: '授权失败，请重新授权'
      })
    }
  }
})
