const app = getApp();

Page({
  data: {
    title: "",
    picker: ['招聘信息', '经验分享', '竞赛信息', '活动信息', '技术分享', '大一专栏', '心得分享', '面试经验'],
    index: "",
  },
  onShow: function () {
    this.setData({
      modalShowStyle: "opacity:1;pointer-events:auto;"
    })
  },
  PickerChange(e) {
    this.setData({
      index: e.detail.value
    })
  },
  titleInput: function (event) {
    this.setData({
      title: event.detail.value,
    })
  },
  touchAddNew: function (event) {
    wx.navigateTo({
      url: "../fatie/fatie?title=" + JSON.stringify(this.data),
    });
  },

  touchCancel: function () {
    wx.switchTab({
      url: '../shouye/shouye',
    })
  },
});