Page({
  data: {
    feed: [],
    feed_length: 0
  },

  onShow: function () {
    var that = this
    var session_id = wx.getStorageSync('session_id');
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
              url: 'http://127.0.0.1:5000/login/',
              method: "POST",
              header: {
                "Content-Type": "application/x-www-form-urlencoded"
              },
              data: {
                code: res.code
              },
              success(res) {
                wx.setStorageSync('session_id', res.data.session_id)
              }
            })
          } else {
            console.log('登录失败！' + res.errMsg)
          }
        }
      })
    }
    wx.request({
      url: 'http://127.0.0.1:5000/getIntoPlate/',
      method: "POST",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        theme: '经验分享'
      },
      success(res) {
        console.log(res.data)
        that.setData({
          feed: res.data,
          feed_length: res.data.length
        })

      }
    })
  },



})
