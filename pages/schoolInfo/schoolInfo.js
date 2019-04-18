const app = getApp();
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    pickerDegree: ['本科', '硕士', '博士'],
    dataChange: false,
    schoolInfo:{
      university: "",
      college: "",
      major: "",
      grade: "",
      degreeIndex: ""
    },
    webSchoolInfo: null
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
              header: {
                'content-type': 'application/x-www-form-urlencoded'
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
    var session_id = wx.getStorageSync('session_id')
    if (session_id != null){
      console.log("SchoolInfo,获得session_id获得成功");
      wx.request({
        url: 'http://127.0.0.1:5000/getSchoolInfo/',
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        data: {
          session_id: session_id
        },
        success: res =>{
          this.setData({
            schoolInfo: res.data
          })
          wx.setStorageSync("schoolInfo",res.data)
          console.log("SchoolInfo",res.data);
        }
      })
    }
  },
  DegreePickerChange(e) {
    console.log(e);
    this.setData({
      'schoolInfo.degreeIndex': parseInt(e.detail.value) + 1
    })
  },
  blurGrade: function (e) {
    this.setData({
      'schoolInfo.grade': e.detail.value
    })
  },
  blurSchool: function(e){
    this.setData({
     'schoolInfo.university':e.detail.value
    })
  },
  blurCollege: function(e){
    this.setData({
      'schoolInfo.college': e.detail.value
    })
  },
  blurMajor: function(e){
    this.setData({
      'schoolInfo.major': e.detail.value
    })
  },
  confirmInfo: function() {
    const session_id = wx.getStorageSync('session_id');
    if (session_id != null){
      var before = wx.getStorageSync('schoolInfo')
      var after = this.data.schoolInfo
      if (  before.university != after.university ||
        before.college != after.college ||
        before.major != after.major ||
        before.grade != after.grade ||
        before.degreeIndex != after.degreeIndex
      ){
        this.setData({
          dataChange: true //若数据发生改变，则分别在服务端和客户端更改信息
        })
      }
      if (this.data.dataChange) {
        console.log("schoolInfo,用户修改过学校信息")
        wx.request({
          url: 'http://127.0.0.1:5000/setUserInformation2/',
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          method: "POST",
          data: {
            session_id: session_id,
            university: this.data.schoolInfo.university,
            college: this.data.schoolInfo.college,
            major: this.data.schoolInfo.major,
            grade: this.data.schoolInfo.grade,
            degreeIndex: this.data.schoolInfo.degreeIndex
          },
          success: function () {
            console.log("schoolInfo,Post success")
          },
          fail: function () {
            console.log("schoolInfo,Post fail")
          }
        })
      }
      else {
        console.log("schoolInfo,未修改学校信息")
      }
    }
  }
})