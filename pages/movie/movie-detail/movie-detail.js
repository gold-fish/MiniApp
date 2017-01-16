var baseApi = getApp()
var myUtil = require('../../../utils/util.js')

Page({
  data: {},
  onLoad: function (options) {
    var movieID = options.id

    var url = baseApi.myGlobalData.baseApi + '/v2/movie/subject/' + movieID
    myUtil.myHttp(url, this.processData)
  },

  processData: function (dobanData) {
    var casts = dobanData.data.casts
    var castList = []

    for (var i = 0; i < casts.length; i++) {
      var cast = {
        avatar: casts[i].avatars.large,
        name: casts[i].name
      }

      castList.push(cast)
    }

    var tempMovie = {
      image: dobanData.data.images.large,
      title: dobanData.data.title,
      summary: dobanData.data.summary,
      casts: castList,
      countrie:dobanData.data.countries[0],
      genres:dobanData.data.genres.join(","),
      year:dobanData.data.year
    }

    this.setData({
      movie: tempMovie
    })
  }
})