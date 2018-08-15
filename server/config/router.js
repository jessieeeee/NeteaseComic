'use strict'
let Router = require('koa-router')
let User = require('../controller/user')
let App = require('../controller/app')
let bodyParser = require('koa-bodyparser')
let Comic163 = require('../controller/netease/comic163')
let ComicTencent = require('../controller/tencent/comic_tencent')
module.exports = function(){
    let router = new Router({
        prefix:'/api'
    })

    router.post('/u/signup', bodyParser(), App.hasBody, User.signup)
    router.post('/u/verify', bodyParser(), App.hasBody, User.verify)
    router.post('/u/update', bodyParser(), App.hasBody, App.hasToken, User.update)
    router.post('/u/signature', bodyParser(), App.hasBody, App.hasToken, App.signature)
    // 抓取网易漫画接口
    router.post('/163/getComic', bodyParser(), Comic163.getComic)
    // 抓取网易漫画接口
    router.post('/163/getComicMore', bodyParser(), Comic163.getComicMore)
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