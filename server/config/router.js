'use strict'
var Router = require('koa-router')
var User = require('../controller/user')
var App = require('../controller/app')
var bodyParser = require('koa-bodyparser')
var Comic = require('../controller/comic163')
module.exports = function(){
    var router = new Router({
        prefix:'/api/1'
    })

    router.post('/u/signup', bodyParser(), App.hasBody, User.signup)
    router.post('/u/verify', bodyParser(), App.hasBody, User.verify)
    router.post('/u/update', bodyParser(), App.hasBody, App.hasToken, User.update)
    router.post('/u/signature', bodyParser(), App.hasBody, App.hasToken, App.signature)
    router.get('/u/test3',Comic.test3)
    router.get('/u/test4',Comic.test4)
    router.get('/u/test5',Comic.test5)
    router.get('/u/test6',Comic.test6)
    return router 
}