'use strict'
var Router = require('koa-router')
var User = require('../controller/user')
var App = require('../controller/app')
var bodyParser = require('koa-bodyparser')
var Comic163 = require('../controller/comic163')
var ComicTencent = require('../controller/comic_tencent')
module.exports = function(){
    var router = new Router({
        prefix:'/api'
    })

    router.post('/u/signup', bodyParser(), App.hasBody, User.signup)
    router.post('/u/verify', bodyParser(), App.hasBody, User.verify)
    router.post('/u/update', bodyParser(), App.hasBody, App.hasToken, User.update)
    router.post('/u/signature', bodyParser(), App.hasBody, App.hasToken, App.signature)
    // 抓取网易漫画接口
    router.get('/163/getComic',Comic163.getComic)
    router.get('/163/getComicDetail',Comic163.getComicDetail)
    router.get('/163/getComicContent',Comic163.getComicContent)
    router.get('/163/getComicComment',Comic163.getComicComment)
    router.get('/163/getComicDetailMore',Comic163.getComicDetailMore)
    // 抓取腾讯漫画接口
    router.get('/tencent/getComic',ComicTencent.getComic)
    router.get('/tencent/getComicDetail',ComicTencent.getComicDetail)
    router.get('/tencent/getComicContent',ComicTencent.getComicContent)
    router.get('/tencent/getComicComment',ComicTencent.getComicComment)
    router.get('/tencent/getComicDetailMore',ComicTencent.getComicDetailMore)

    return router 
}