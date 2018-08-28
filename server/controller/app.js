'use strict'
/**
 * 中间件配置
 */

var mongoose = require('mongoose')
var User = mongoose.model('Usersss')
var sha1 = require('sha1')
var config = require('../config/config')
/**
 * 图片签名
 */
exports.signature = (async (ctx, next) =>{
    var body = ctx.request.body
    var type = body.type // 获取type
    var timestamp = body.timestamp //时间戳
    var folder
    var tags
    // 根据type 设置folder和tags
    if (type === 'avatar'){
        folder = 'avatar'
        tags = 'app,avatar'
    }
    else if (type === 'video'){
        folder = 'video'
        tags = 'app,video'
    }
    else if (type === 'audio') {
        folder = 'audio'
        tags = 'app,video'
    } 
    // 设置签名字符串
    var signature = 'folder=' + folder + '&tags=' + tags + '&timestamp=' + timestamp + config.cloudinary.api_secret
    // 设置加密
    signature = sha1(signature)

    ctx.body = {
        success: true
    }
    await next()
})

/**
 * 有body参数检查
 */
exports.hasBody = (async (ctx,next) => {
    // 如果body参数为空,初始化一下
    var body = ctx.request.body || {}
    if (Object.keys(body).length === 0){
       ctx.body = {
           success: false,
           msg: 'post参数没有传' 
       }

       return
    }

    await next()
})
/**
 * token检查
 */
exports.hasToken = (async (ctx,next) => {
    // 获取get请求中的token
    var accessToken = ctx.query.accessToken
    // 如果没有token,获取post请求中的token
    if(!accessToken){
       accessToken = ctx.request.body.accessToken
    }
    // 如果还是没有token
    if(!accessToken){
       ctx.body = {
           success: false,
           msg:'token丢了'
       }
       return 
    }
    
    // 通过token找到这个用户
    var user = await User.findOne({
        accessToken: accessToken
    })
    .exec()
    // 如果没有这个用户,返回
    if(!user){
      ctx.body = {
          success: false,
          msg: '用户没登录'
      }
      return
    }
    // 如果session为空初始化一下
    ctx.session = ctx.session || {}
    // 设置用户数据到session节点上
    ctx.session.user = user

    await next()
})