var baseApi = getApp()
var myUtil = require('../../utils/util.js')

Page({
  data: {
    in_theaters: {},
    coming_soon: {},
    top250: {}
  },

  onLoad: function (options) {
    var baseApiUrl = baseApi.myGlobalData.baseApi

    var in_theatersUrl = baseApiUrl + "/v2/movie/in_theaters?start=0&count=3"
    var coming_soonUrl = baseApiUrl + "/v2/movie/coming_soon?start=0&count=3"
    var top250Url = baseApiUrl + "/v2/movie/top250?start=0&count=3"

    this.getData(in_theatersUrl, "in_theaters", "正在上映")
    this.getData(coming_soonUrl, "coming_soon", "即将上映")
    this.getData(top250Url, "top250", "豆辩Top250")
  },

  getData: function (url, m_type, typeTitle) {
    var that = this

    wx.request({
      url: url,
      data: {},
      method: 'GET',
      header: {
        "Content-Type": "Application/json"
      },
      success: function (res) {
        that.processData(res.data.subjects, m_type, typeTitle)
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },

  onDetailTap: function (event) {
    var movieID = event.currentTarget.dataset.movieid

    wx.navigateTo({
      url: 'movie-detail/movie-detail?id=' + movieID
    })
  },

  processData: function (dobanData, m_type, typeTitle) {
    var movieArr = []

    for (var i = 0; i < dobanData.length; i++) {
      var item = dobanData[i]

      var title = item.title
      if (title.length > 6) {
        title = title.substring(0, 6) + "..."
      }

      var tempMovie = {
        id: item.id,
        title: title,
        large: item.images.large,
        stars: myUtil.convertStars(item.rating.stars),
        average: item.rating.average
      }

      movieArr.push(tempMovie)
    }

    var tempObject = {}
    tempObject[m_type] = {
      movieArr: movieArr,
      movieType: typeTitle
    }

    this.setData(tempObject)
  },

  onMore: function (event) {
    var typeStr = event.currentTarget.dataset.typestr

    wx.navigateTo({
      url: 'more-movie/more-movie?typeStr=' + typeStr
    })
  },

  onFocus: function (e) {
    console.log(e.detail.value)
  }
})