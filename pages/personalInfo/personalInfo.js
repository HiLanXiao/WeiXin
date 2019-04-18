const app = getApp();
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    modalName: null,
    pickerGender: ['男','女'],
    personalInfo:{
      name: "",
      PersonalWeb: "",
      genderIndex: "",
      introduction: "",
    },
    webPersonalInfo: null,
    dataChange: false
  },
  onLoad: function(){
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
              method: 'POST',
              header:{
                'content-type': 'application/x-www-form-urlencoded'
              },
              data: {
                code: res.code
              },
              success(res) {
                wx.setStorageSync('session_id', res.data.session_id)
                session_id = res.data.session_id
                console.log("PersonalInfo",res.data.session_id)
              }
            })
          } else {
            console.log('登录失败！' + res.errMsg)
          }
        }
      })

    }
    else{
      console.log("已经存在see")
    }
    if (session_id != null){
      console.log("PersonalInfo,session_id获取成功",session_id)
      wx.request({
        url: 'http://127.0.0.1:5000/getPersonalInfo/',
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        data:{
          session_id: session_id
        },
        success: res=>{
          this.setData({
            personalInfo: res.data
          })
          wx.setStorageSync("personalInfo",this.data.personalInfo)
          console.log("personalInfo,获取成功",res.data)
        }

      })
    }
  },
  //更改性别gender
  GenderPickerChange(e) {
    console.log(e);
    this.setData({
      'personalInfo.genderIndex': parseInt(e.detail.value) + 1,
    })
  },
  blurName: function(e){
    this.setData({
      'personalInfo.name': e.detail.value
    })
  },
  blurWeb: function(e) {
    this.setData({
      'personalInfo.PersonalWeb': e.detail.value
    })
  },
  blurIntroduction: function(e){
    this.setData({
      'personalInfo.introduction': e.detail.value
    })
  },
  confirmInfo: function(){
    const session_id = wx.getStorageSync('session_id');
    if (session_id != null){
      var before = wx.getStorageSync('personalInfo')
      var after = this.data.personalInfo;
      if (before.name != after.name ||
          before.PersonalWeb != after.PersonalWeb ||
          before.genderIndex != after.genderIndex ||
          before.introduction != after.introduction
          ){
            this.setData({
              dataChange: true
            })
          }
      if (this.data.dataChange) {
        console.log("personalInfo,用户修改过个人信息")
        wx.request({
          url: 'http://127.0.0.1:5000/setUserInformation1/',
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          method: "POST",
          data: {
            session_id: session_id,
            name: this.data.personalInfo.name,
            PersonalWeb: this.data.personalInfo.PersonalWeb,
            genderIndex: this.data.personalInfo.genderIndex,
            introduction: this.data.personalInfo.introduction
          },
          success: function () {
            console.log("personalInfo,Post success")
         },
          fail: function () {
            console.log("personalInfo,Post fail")
          }
        })
        wx.setStorageSync("personalInfo", this.data.personalInfo)
      }
      else {
        console.log("perosnalInfo，未修改个人信息")
      }
    }
  }
})