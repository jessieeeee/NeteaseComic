'use strict'
var mongoose = require('mongoose')
var User = mongoose.model('Usersss')
var uuid = require('uuid')
var xss = require('xss')
var sms = require('../service/sms')
/**
 * 注册
 */
exports.signup = (async (ctx, next) =>{
    var phoneNumber = xss(ctx.request.body.phoneNumber.trim())
    // 查数据
    var user = await User.findOne({
        phoneNumber: phoneNumber
    }).exec()
    // 获取验证码
    var verifyCode = sms.getCode()
    // 没有这个用户, 创建新的用户
    if(!user){
        var accessToken = uuid.v4() // 生成一个token
        user = new User({
            nickname: '默认昵称',
            phoneNumber: xss(phoneNumber),
            verifyCode: verifyCode,
            accessToken: accessToken,
            avator: 'http://res.cloudinary.com/gougou/image/upload/mooc1.png'
        })
    }
    // 有这个用户,设置验证码
    else{
        user.verifyCode = verifyCode
    }

    // 保存用户数据,返回新的用户
    try {
       user = await user.save()
    } catch (error){
        console.log(error)
        // 出错返回
        ctx.body = {
            success: false,
            msg: '数据库存储异常'
        }
        return 
    }

    // 注册成功,发送短信
    var msg = '您的注册验证码是:' + verifyCode
    try {
        sms.send(user.phoneNumber, msg)
    } catch (e) {
        console.log(e)
        ctx.body = {
            success: false,
            msg: '短信服务异常'
        }
        return
    }

    // 返回成功
    ctx.body = {
        success: true
    }
    await next()
})

/**
 * 验证手机号
 */
exports.verify = (async (ctx, next) =>{
    var verifyCode = xss(ctx.request.body.verifyCode.trim())
    var phoneNumber =  xss(ctx.request.body.phoneNumber.trim())

    // 验证码和手机号不为空
    if(!verifyCode || !phoneNumber) {
        ctx.body = {
            success: false,
            msg: '验证没通过'
        }
        return
    }
    
    // 通过手机号和验证码查找用户
    var user = await User.findOne({
        phoneNumber:phoneNumber,
        verifyCode: verifyCode
    }).exec()
    // 找到了这个用户,设置通过标识
    if(user){
        user.verified = true
        user = await user.save()
        // 验证通过
        ctx.body = {
            success: true,
            data: {
                nickname: user.nickname,
                accessToken: user.accessToken,
                avator: user.avator,
                _id: user._id,
            }
        }
    }
    else {
        ctx.body = {
            success: false,
            msg: '验证未通过'
        }
        return 
    }
 
    await next()
})

/**
 * 更新用户信息
 */
exports.update = (async (ctx, next) =>{
    var body = ctx.request.body
    // 直接获取session上的用户
    var user = ctx.session.user

    // 这个用户不存在
    if(!user){
       ctx.body = {
           success: false,
           msg: '用户不见了'
       }

       return
    }
    // 把属性字符串切割成数组
    var fields = 'avatar,gender,age,nickname,breed'.split(',')
    // 遍历这个数组
    fields.forEach(function(field){
        if(body[field]){             // 取出传参中对应的属性值
            user[field] = xss(body[field],trim()) // 刷新用户对应的属性值
        }
    })
    // 保存修改后的用户数据
    user = await user.save()
    // 返回修改成功后的用户信息
    ctx.body = {
        success: true,
        data: {
            nickname: user.nickname,
            accessToken: user.accessToken,
            avator: user.avator,
            age: user.age,
            gender: user.gender,
            _id: user._id,
        }
    }
    await next()
})



