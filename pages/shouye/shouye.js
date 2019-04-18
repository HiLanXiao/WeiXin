const app = getApp();
Page({

  data: {
    feed: [],
    feed_length: 0,
    key_word: '',
  },

  onShow: function () {
    var that = this
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
              method: "POST",
              header: {
                "Content-Type": "application/x-www-form-urlencoded"
              },
              data: {
                code: res.code
              },
              success(res) {
                wx.setStorageSync('session_id', res.data.session_id)
                session_id = res.data.session_id
              }
            })
          } else {
            console.log('登录失败！' + res.errMsg)
          }
        }
      })

    }
    wx.request({
      url: 'http://127.0.0.1:5000/homepageRecommend/',
      method: "POST",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        session_id: session_id,
      },
      success(res) {
        console.log(res)
        that.setData({
          feed: res.data,
        })

      }
    })
  },


  bindItemTap: function (e) {
    var id = e.currentTarget.id;
    wx.navigateTo({
      url: '../tiezi/tiezi?id=' + id
    })
  },
  blurKey: function (e) {
    this.setData({
      key_word: e.detail.value
    })
  },
  Search: function () {
    var key = this.data.key_word
    if (key) {
      console.log("shouye,搜索", key)
      wx.request({
        url: 'http://127.0.0.1:5000/search/',
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        data: {
          key_word: key
        },
        success: res => {
          wx.navigateTo({
            url: '../searchRes/searchRes?data=' + JSON.stringify(res.data)
          })
          
        }
      })
    }
  },

  jrbk: function (e) {
    var id = e.currentTarget.id;
    wx.navigateTo({
      url: '../bankuai/bankuai?id=' + id
    })
  },
  ft: function () {
    if (app.globalData.userInfo) {
      wx.navigateTo({
        url: '../biaoti/biaoti'
      })
    } else {
      wx.showModal({
        title: '请求失败',
        content: '很抱歉，您未授权登录，暂时无法发帖'
      })
      wx.navigateTo({
        url: '../authorize/authorize',
      })
    }

  }



})
