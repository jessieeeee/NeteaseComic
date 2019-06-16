'use strict'
/**
 * 中间件配置
 */

let mongoose = require('mongoose')
let User = mongoose.model('users')

/**
 * 有body参数检查
 */
exports.hasBody = (async (ctx,next) => {
    // 如果body参数为空,初始化一下
    let body = ctx.request.body || {}
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
    let accessToken = ctx.query.accessToken
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