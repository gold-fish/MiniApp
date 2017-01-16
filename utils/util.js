function convertStars(score) {
    var starArr = []

    var fullStar = score.substring(0, 1)
    var halfStar = score.substring(1, 1)
    var halfStarCount = 0;

    for (var i = 1; i < 6; i++) {
        if (i <= fullStar) {
            starArr.push(1)
        } else if (halfStar == 5 && halfStarCount == 0) {
            halfStarCount++
            starArr.push(2)
        } else {
            starArr.push(0)
        }
    }

    return starArr
}

function myHttp(url,callBack){
    var that = this

    wx.request({
      url: url,
      data: {},
      method: 'GET',
      header: {
        "Content-Type": "Application/json"
      },
      success: function (res) {
        callBack(res)
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
}

module.exports = {
    convertStars: convertStars,
    myHttp:myHttp
}