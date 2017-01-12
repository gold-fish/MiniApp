var postData = require('../../data/post-data.js')
var globalData = getApp()

Page({
    onLoad: function (options) {
        var myGlobalData = globalData.myGlobalData
        var globalIsPlaying = myGlobalData.globalISPlaying
        var globalPlayingID = myGlobalData.globalPlyaingID

        var newsID = options.id - 1
        this.data.newsID = newsID

        this.setData({
            myData: postData.newsList[newsID]
        });

        var myStorege = wx.getStorageSync('movie');

        if (myStorege) {
            var collectioned = myStorege[newsID];

            this.setData({
                colletioned: collectioned
            });
        } else {
            var myCollect = {};
            myCollect[newsID] = false;
            wx.setStorageSync('movie', myCollect);
        }

        if(globalIsPlaying&&globalPlayingID===newsID){
            this.setData({
                isPlayingImage: true
            })
        }

        var that = this

        wx.onBackgroundAudioPlay(function () {
            that.setData({
                isPlayingImage: true
            })

            globalData.myGlobalData.globalISPlaying = true
            globalData.myGlobalData.globalPlyaingID = that.data.newsID           
        })

        wx.onBackgroundAudioPause(function(){
            that.setData({
                isPlayingImage: false
            })

            globalData.myGlobalData.globalISPlaying = false
            globalData.myGlobalData.globalPlyaingID = null
        })
    },

    onCollection: function (event) {
        var myStorage = wx.getStorageSync('movie')
        var collectioned = myStorage[this.data.newsID]
        collectioned = !collectioned
        myStorage[this.data.newsID] = collectioned

        wx.setStorageSync('movie', myStorage)

        this.setData({
            colletioned: collectioned
        })

        wx.showToast({
            title: collectioned ? '收藏成功' : '取消成功',
            duration: 1000
        })
    },

    onShare: function (event) {
        var arr = ['分享到QQ', '分享到好友']

        wx.showActionSheet({
            itemList: arr,
            success: function (res) {
                wx.showToast({
                    title: arr[res.tapIndex],
                    duration: 1000
                })
            }
        })
    },

    onMusic: function (event) {
        var isPlaying = this.data.isPlaying

        if (isPlaying) {
            wx.pauseBackgroundAudio()
            this.data.isPlaying = false

            this.setData({
                isPlayingImage: false
            })
        } else {
            wx.playBackgroundAudio({
                dataUrl: 'http://ws.stream.qqmusic.qq.com/C100002I8eGJ28BI17.m4a?fromtag=38',
                title: '许巍-故乡',
                coverImgUrl: ''
            })

            this.data.isPlaying = true

            this.setData({
                isPlayingImage: true
            })
        }
    }
})