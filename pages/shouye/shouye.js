const app = getApp();
Page({

  data: {
  
  },


  bindItemTap: function () {
    wx.navigateTo({
      url: '../tiezi/tiezi'
    })
  },

  tz: function () {
    wx.navigateTo({
      url: '../dayi/dayi'
    })
  }
  
})