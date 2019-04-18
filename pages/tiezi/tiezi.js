const app = getApp();

Page({

  data: {
    feed: [],
    feed_length: 0,
    post_id:null
  },

  onLoad: function (options) {
    console.log("hhh",options)
    var id = options.id
    this.setData({
      post_id: id
    })
    var that = this
    var session_id = wx.getStorageSync('session_id')

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
                'content-type': 'application/json'
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
      url: 'http://127.0.0.1:5000/readPost/',
      method: "POST",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        id: id,
        session_id: session_id
      },
      success(res) {
        console.log(res)
        that.setData({
          feed: res.data,
        })
      }
    })
  },
  //点赞事件
  thumbsUp: function () {
    var session_id = wx.getStorageSync('session_id')
    this.setData({
      'feed.sign': 0,
      'feed.zan_count': this.data.feed.zan_count+1
    })
    if (session_id != null && this.data.post_id != null) {
      wx.request({
        url: 'http://127.0.0.1:5000/praise/',
        method: 'POST',
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: {
          post_id: this.data.post_id,
          session_id: session_id
        },
        success: res => {
          console.log("tiezi点赞成功")
        }
      })
    }
    else {
      console.log("点赞失败,post_id,session_id", this.data.post_id, session_id)
    }
  }




})
