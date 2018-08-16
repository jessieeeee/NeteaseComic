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
    router.post('/163/getComicMore', bodyParser(), Comic163.getComicMore)
    router.post('/163/getComicDetail', bodyParser(), Comic163.getComicDetail)
    router.post('/163/getComicContent', bodyParser(), Comic163.getComicContent)
    router.post('/163/getComicComment', bodyParser(), Comic163.getComicComment)
    router.post('/163/getComicDetailMore', bodyParser(), Comic163.getComicDetailMore)
    // 抓取腾讯漫画接口
    router.post('/tencent/getComic', bodyParser(), ComicTencent.getComic)
    router.post('/tencent/getComicDetail', bodyParser(), ComicTencent.getComicDetail)
    router.post('/tencent/getComicContent', bodyParser(), ComicTencent.getComicContent)
    router.post('/tencent/getComicComment',bodyParser(), ComicTencent.getComicComment)
    router.post('/tencent/getComicDetailMore', bodyParser(), ComicTencent.getComicDetailMore)

    return router 
}