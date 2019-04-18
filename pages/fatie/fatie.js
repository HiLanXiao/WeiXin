// pages/biaoti/biaoti.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: "",
    bankuai: "",
    text: "",
    fasong: "../../images/icons/feiji.png",
    session_id: "",
    avatarUrl: ""
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var options = JSON.parse(options.title);
    if (options) {
      this.setData({
        ['title']: options.title,
        ['bankuai']: options.picker[options.index],
      })
    }
  },

  textInput: function (event) {
    this.setData({
      text: event.detail.value,
    })

    if (this.data.text) {
      this.setData({
        fasong: "../../images/icons/feijicol.png"
      })
    } else {
      this.setData({
        fasong: "../../images/icons/feiji.png"
      })
    }
  },
  fasong: function () {
    const session_id = wx.getStorageSync('session_id');
    if (this.data.text) {
      this.setData({
        avatarUrl: app.globalData.userInfo.avatarUrl,
        session_id: session_id
      })
    }
    let title = this.data.title;
    let bankuai = this.data.bankuai;
    let text = this.data.text;
    let avatarUrl = this.data.avatarUrl;
    wx.request({
      url: 'http://127.0.0.1:5000/writePose/',
      method: "POST",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        title: title,
        theme: bankuai,
        article: text,
        session_id: session_id,
        headurl: avatarUrl
      },
      success(res) {
        wx.showToast({
          title: '发帖成功',
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
  }


})