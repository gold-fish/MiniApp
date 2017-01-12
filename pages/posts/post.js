var postData = require('../../data/post-data.js')

Page({
  data: {
  },

  toDetail: function (event) {
    var newsid = event.currentTarget.dataset.newsid;

    wx.navigateTo({
      url: '../post-detail/post-detail?id=' + newsid
    })
  },

  swiperToDetail: function (event) {
    var newsid = event.target.dataset.newsid;

    wx.navigateTo({
      url: '../post-detail/post-detail?id=' + newsid
    })
  },

  onLoad: function (options) {
    // 生命周期函数--监听页面加载
    this.setData({
      myKey: postData.newsList
    })
  },
  onReady: function () {
    // 生命周期函数--监听页面初次渲染完成
    console.log("onReady");
  },
  onShow: function () {
    // 生命周期函数--监听页面显示
    console.log("onShow");
  },
  onHide: function () {
    // 生命周期函数--监听页面隐藏
    console.log("onHide");
  },
  onUnload: function () {
    // 生命周期函数--监听页面卸载
    console.log("onUnload");
  },
  onPullDownRefresh: function () {
    // 页面相关事件处理函数--监听用户下拉动作
    console.log("onPullDownRefresh");
  },
  onReachBottom: function () {
    // 页面上拉触底事件的处理函数
    console.log("onReachBottom");
  },
  onShareAppMessage: function () {
    // 用户点击右上角分享
    return {
      title: 'title', // 分享标题
      desc: 'desc', // 分享描述
      path: 'path' // 分享路径
    }
  }
})