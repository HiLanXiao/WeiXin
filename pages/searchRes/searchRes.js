Page({
  data: {
    feed: null,
    feed_length: 0,
    key_word: ''
  },

  onLoad: function (options) {
    var options1 = JSON.parse(options.data);
    console.log("hhh",options1);
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
              }
            })
          } else {
            console.log('登录失败！' + res.errMsg)
          }
        }
      })
    }
    this.setData({
      feed: options1,
      feed_length: options1.length
    }),
    console.log("searchRes", this.data.feed)
  },
  blurKey: function (e) {
    this.setData({
      key_word: e.detail.value
      
    })
  },
  bindItemTap: function (e) {
    var id = e.currentTarget.id;
    console.log(id)
    wx.navigateTo({
      url: '../tiezi/tiezi?id=' + id
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
          if (res.data) {
            var data1 = JSON.stringify(res.data);
            wx.navigateTo({
              url: '../searchRes/searchRes?data=' + data1,
            })
          }
          console.log("shouye,搜索成功", res.data);
        }
      })
    }
  },
  onUnload: function () {
    wx.reLaunch({
      url: '../shouye/shouye'
    })
  },


})