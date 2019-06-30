'use strict'

let uuid = require('uuid')
let xss = require('xss')
let sms = require('../service/sms')
let mongoose = require('mongoose')
let Users = mongoose.model("users")
mongoose.connect('mongodb://localhost/test',{ useNewUrlParser: true });
/**
 * 注册
 */
exports.signup = (async (ctx, next) =>{
    let phoneNumber = xss(ctx.request.body.phoneNumber.trim())
    let password = xss(ctx.request.body.password.trim())
    if(!phoneNumber || !password) {
        ctx.body = {
            success: false,
            msg: '账号或密码不为空'
        }
        return
    }
    // 查用户是否存在
    let user = await Users.findOne({
        phoneNumber: phoneNumber
    }).exec()
    // 没有这个用户, 创建新的用户
    if(!user){
        // 获取验证码
        let verifyCode = sms.getCode()
        // 生成一个token
        let accessToken = uuid.v4()
        // 生成一个新用户对象
        user = new Users({
            nickname: '默认昵称',
            phoneNumber: xss(phoneNumber),
            password: xss(password),
            accessToken: accessToken,
            gender: "未知",
            birthday: "1990-01-01",
            avatar: 'http://res.cloudinary.com/gougou/image/upload/mooc1.png'
        })
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
        // 注册成功后发送短信
        let msg = '您的注册验证码是:' + verifyCode
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
            success: true,
            msg: '注册成功'
        }
        await next()
    }
    // 有这个用户
    else{
        ctx.body = {
            success: false,
            msg: '用户已存在'
        }
    }
})


/**
 * 登录
 */
exports.login = (async (ctx, next) =>{
    let phoneNumber = xss(ctx.request.body.phoneNumber.trim())
    let password = xss(ctx.request.body.password.trim())

    if(!phoneNumber || !password) {
        ctx.body = {
            success: false,
            msg: '账号或密码错误'
        }
        return
    }
    // 查用户是否存在
    let user = await Users.findOne({
        phoneNumber: phoneNumber,
        password: password
    }).exec()
    // 没有这个用户, 创建新的用户
    if(!user){
        // 返回成功
        ctx.body = {
            success: false,
            msg: '账号或密码错误'
        }
    }
    // 有这个用户
    else{
        // 生成一个token
        let accessToken = uuid.v4()
        user.accessToken = accessToken
        // 保存修改后的用户数据
        user = await user.save()
        ctx.body = {
            success: true,
            msg: {data: user}
        }
        await next()
    }
})

exports.checkVertifyCode = (async (ctx, next) =>{
    let vertifyCode = xss(ctx.request.body.vertifyCode.trim())
    let phoneNumber =  xss(ctx.request.body.phoneNumber.trim())
    if(!vertifyCode || !phoneNumber) {
        ctx.body = {
            success: false,
            msg: '手机号或验证码不为空'
        }
        return
    }
    if (vertifyCode == '123'){
        // 通过手机号和验证码查找用户
        let user = await User.findOne({
            phoneNumber:phoneNumber,
        }).exec()
        // 找到了这个用户,设置通过标识
        if(user){
            ctx.body = {
                success: true,
                msg: '验证通过'
            }
            return
        }
    }
    ctx.body = {
        success: false,
        msg: '验证失败'
    }
})


/**
 * 更新用户密码
 */
exports.updatePassword = (async (ctx, next) =>{
    let phoneNumber = xss(ctx.request.body.phoneNumber.trim())
    let oldPassword = xss(ctx.request.body.oldPassword.trim())
    let newPassword = xss(ctx.request.body.newPassword)
    if(!phoneNumber || !oldPassword || !newPassword) {
        ctx.body = {
            success: false,
            msg: '账号或密码错误'
        }
        return
    }
    // 查用户是否存在
    let user = await Users.findOne({
        phoneNumber: phoneNumber,
        password: oldPassword
    }).exec()

    // 这个用户不存在
    if(!user){
        ctx.body = {
            success: false,
            msg: '用户不存在'
        }
        return
    }

    user.password = newPassword
    // 保存修改后的用户数据
    user = await user.save()
    // 返回修改成功后的用户信息
    ctx.body = {
        success: true,
        msg: {data: user}
    }
    await next()
})


/**
 * 更新用户信息
 */
exports.update = (async (ctx, next) =>{
    let accessToken = xss(ctx.request.body.accessToken.trim())
    if(!accessToken) {
        ctx.body = {
            success: false,
            msg: '当前登录已失效'
        }
        return
    }
    // 查用户是否存在
    let user = await Users.findOne({
        accessToken: accessToken,
    }).exec()

    // 这个用户不存在
    if(!user){
       ctx.body = {
           success: false,
           msg: '用户不存在'
       }
       return
    }
    let info = JSON.parse(ctx.request.body.updateInfo)
    // 把属性字符串切割成数组
    let fields = 'avatar,gender,birthday,nickname,password'.split(',')
    // 遍历这个数组
    fields.forEach(function(value){
        if(info[value]){             // 取出传参中对应的属性值
            user[value] = xss(info[value].trim()) // 刷新用户对应的属性值
        }
    },info)
    // 保存修改后的用户数据
    user = await user.save()
    // 返回修改成功后的用户信息
    ctx.body = {
        success: true,
        msg: {data: user}
    }
    await next()
})



