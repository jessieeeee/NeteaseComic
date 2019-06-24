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
            birthday: new Date(1990,5,1),
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
 * 更新用户信息
 */
exports.update = (async (ctx, next) =>{
    let phoneNumber = xss(ctx.request.body.phoneNumber.trim())
    let oldPassword = xss(ctx.request.body.oldPassword.trim())
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
    let body = ctx.request.body.updateInfo
    // 把属性字符串切割成数组
    let fields = 'avatar,gender,birthday,nickname'.split(',')
    // 遍历这个数组
    fields.forEach(function(field){
        if(body[field]){             // 取出传参中对应的属性值
            user[field] = xss(body[field], trim()) // 刷新用户对应的属性值
        }
    })
    // 保存修改后的用户数据
    user = await user.save()
    // 返回修改成功后的用户信息
    ctx.body = {
        success: true,
        data: user
    }
    await next()
})



