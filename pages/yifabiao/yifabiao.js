Page({
  data: {
    feed: [],
    feed_length: 0,
    modalShowStyle: '',
    currentId: ''
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
              }
            })
          } else {
            console.log('登录失败！' + res.errMsg)
          }
        }
      })
    }
    wx.request({
      url: 'http://127.0.0.1:5000/getOwnPost/',
      method: "POST",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        session_id: session_id
      },
      success(res) {
        that.setData({
          feed: res.data,
          feed_length: res.data.length
        })
        console.log(that.data)
      }
    })
  },
  bindItemTap: function (e) {
    console.log(e.currentTarget.id)
    var id = e.currentTarget.id;
    wx.navigateTo({
      url: '../tiezi/tiezi?id=' + id
    })
  },
  more: function (e) {
    var id = e.currentTarget.id;
    this.setData({
      currentId: id,
    })
    this.setData({
      modalShowStyle: "display: flex;pointer-events:auto;"
    })
  },
  cancel: function () {
    this.setData({
      modalShowStyle: "display: none;pointer-events:auto;"
    })
  },
  delete: function () {
    let currentId = this.data.currentId;
    wx.request({
      url: 'http://127.0.0.1:5000/deletePost/',
      method: "POST",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        post_id: currentId,
      },
      success(res) {
        wx.showToast({
          title: '删除贴子成功',
          icon: 'succes',
          duration: 1500,
          mask: true
        })
        setTimeout(function () {

          wx.switchTab({
            url: '../shouye/shouye'
          })
        }, 1500)
      }
    })
  },
  change: function () {
    wx.navigateTo({
      url: "../changeArticle/changeArticle?currentId=" + this.data.currentId,
    });
  }

})