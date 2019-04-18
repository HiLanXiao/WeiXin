// pages/biaoti/biaoti.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    post_id: "",
    article: "",
    title: "",
    fasong: "../../images/icons/feiji.png",
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var post_id = options.currentId;
    var that = this;
    this.setData({
      post_id: post_id,
    })
    if (post_id) {
      wx.request({
        url: 'http://127.0.0.1:5000/modifyPost/',
        method: "POST",
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: {
          post_id: post_id
        },
        success(res) {
          that.setData({
            article: res.data.article,
            title: res.data.title
          })
        }
      })
    }
  },

  textInput: function (event) {
    this.setData({
      article: event.detail.value,
    })

    if (this.data.article) {
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
    let post_id = this.data.post_id;
    let article = this.data.article;
    wx.request({
      url: 'http://127.0.0.1:5000/savePostModification/',
      method: "POST",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        post_id: post_id,
        article: article,
      },
      success(res) {
        wx.showToast({
          title: '修改贴子成功',
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