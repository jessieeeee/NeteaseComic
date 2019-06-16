'use strict'
let mongoose = require('mongoose')
let UsersSchema = new mongoose.Schema({
    phoneNumber: String,  //手机号
    password:String, //密码
    gender:String, //性别
    birthday:Date, //生日
    accessToken: String,
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updateAt: {
        type: Date,
        default: Date.now()
    }
})
UsersSchema.pre('save', function (next) {
    if (this.isNew) { // 如果这是个新的数据
        this.createdAt = this.updateAt = Date.now() // 设置当前时间
    } else {
        this.updateAt = Date.now() // 否则刷新更新时间
    }
    next()
})

module.export = mongoose.model('users', UsersSchema)