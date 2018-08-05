'use strict'
var mongoose = require('mongoose')

var MessagesSchema = new mongoose.Schema({
    text: String,
    user: Object,
    chatId: String,
    createdAt:{
        type:Date,
        default:Date.now()
    },
    updateAt:{
        type:Date,
        default:Date.now()
    }
})
MessagesSchema.pre('save', function(next) {
    if(this.isNew){ // 如果这是个新的数据
        this.createAt = this.updateAt = Date.now() // 设置当前时间
    } else {
        this.updateAt = Date.now() // 否则刷新更新时间
    }
    next()
})

var MessageModel = mongoose.model('messages', MessagesSchema)
module.export = MessageModel