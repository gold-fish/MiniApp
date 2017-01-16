var baseApi = getApp()
var myUtil = require('../../../utils/util.js')

Page({
  data: {
    prevUrl: '',
    prevStart: 0,
    prevMovieEmpty: true
  },
  onLoad: function (options) {
    var typeStr = options.typeStr
    this.data.currentTitle = typeStr

    var url = baseApi.myGlobalData.baseApi

    switch (typeStr) {
      case "正在上映":
        url = url + "/v2/movie/in_theaters"
        break;
      case "即将上映":
        url = url + "/v2/movie/coming_soon"
        break;
      default:
        url = url + "/v2/movie/top250"
        break;
    }

    this.data.prevUrl = url
    myUtil.myHttp(url, this.processData)
  },

  onDetailTap: function (event) {
    var movieID = event.currentTarget.dataset.movieid

    wx.navigateTo({
      url: '../movie-detail/movie-detail?id=' + movieID
    })
  },

  processData: function (dobanData) {
    var movieArr = []
    var totalMovieArr = []

    for (var i = 0; i < dobanData.data.subjects.length; i++) {
      var item = dobanData.data.subjects[i]

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

    if (this.data.prevMovieEmpty) {
      totalMovieArr = movieArr
      this.data.prevMovieEmpty = false
    } else {
      totalMovieArr = this.data.movieArr.concat(movieArr)
    }

    this.setData({
      movieArr: totalMovieArr
    })

    this.data.prevStart = this.data.prevStart + 20
    wx.hideNavigationBarLoading()
  },

  onReady: function () {
    wx.setNavigationBarTitle({
      title: this.data.currentTitle
    })
  },

  onDownTap: function () {
    var url = this.data.prevUrl + "?start=" + this.data.prevStart + "&count=20"
    console.log(url)

    myUtil.myHttp(url, this.processData)
    wx.showNavigationBarLoading()
  }
})