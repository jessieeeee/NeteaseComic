'use strict'
let Router = require('koa-router')
let User = require('../controller/user')
let App = require('../controller/app')
let bodyParser = require('koa-bodyparser')
let Comic163 = require('../controller/netease/comic163')
let ComicTencent = require('../controller/tencent/comic_tencent')
const netease = '/163'
const tencent = '/tencent'
module.exports = function(){
    let router = new Router({
        prefix:'/api'
    })

    // 用户管理接口
    router.post('/u/signup', bodyParser(), App.hasBody, User.signup)
    router.post('/u/login', bodyParser(), App.hasBody, User.login)
    router.post('/u/update', bodyParser(), App.hasBody, App.hasToken, User.update)
    router.post('/u/updatePassword', bodyParser(), App.hasBody, User.update)
    router.post('/u/followComic', bodyParser(), App.hasBody, User.followComic)
    router.post('/u/isFollow', bodyParser(), App.hasBody, User.isFollow)
    router.post('/u/getAllFollow', bodyParser(), App.hasBody, User.getAllFollow)

    // 抓取网易漫画接口
    router.post(netease + '/getComic', bodyParser(), Comic163.getComic)
    router.post(netease + '/getComicMore', bodyParser(), Comic163.getComicMore)
    router.post(netease + '/getComicDetail', bodyParser(), Comic163.getComicDetail)
    router.post(netease + '/getComicDetailMore', bodyParser(), Comic163.getComicDetailMore)
    router.post(netease + '/getComicContent', bodyParser(), Comic163.getComicContent)
    router.post(netease + '/getComicContentMore', bodyParser(), Comic163.getComicContentMore)

    // 抓取腾讯漫画接口
    router.post(tencent + '/getComic', bodyParser(), ComicTencent.getComic)
    router.post(tencent + '/getComicDetail', bodyParser(), ComicTencent.getComicDetail)
    router.post(tencent + '/getComicContent', bodyParser(), ComicTencent.getComicContent)
    router.post(tencent + '/getComicDetailMore', bodyParser(), ComicTencent.getComicDetailMore)
    router.post(tencent + '/getComicContentMore', bodyParser(), ComicTencent.getComicContentMore)


    return router 
}