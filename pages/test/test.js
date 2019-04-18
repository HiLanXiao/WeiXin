Page({
  data: {
    modalShowStyle: '',
    currentId: ''
  },
  more: function () {
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
      url: 'http://127.0.0.1:5000/writePose/',
      method: "POST",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        currentId: currentId,
      },
      success(res) {
        wx.showToast({
          title: '删除贴子成功',
          icon: 'succes',
          duration: 1500,
          mask: true
        })
      }
    })
  },
  change: function () {
    wx.navigateTo({
      url: "../changeArticle/changeArticle" + this.data.currentId,
    });
  },

})