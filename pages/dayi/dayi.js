Page({

  onShow: function () {
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



})