'use strict'
let mongoose = require('mongoose')

let FollowComicSchema = new mongoose.Schema({
    follower: String,
    title: String,
    author: String,
    category: String,
    cover: String,
    createdAt:{
        type:Date,
        default:Date.now()
    },
    updateAt:{
        type:Date,
        default:Date.now()
    }
})
FollowComicSchema.pre('save', function(next) {
    if(this.isNew){ // 如果这是个新的数据
        this.createAt = this.updateAt = Date.now() // 设置当前时间
    } else {
        this.updateAt = Date.now() // 否则刷新更新时间
    }
    next()
})

let FollowComicModel = mongoose.model('messages', FollowComicSchema)
module.export = FollowComicModel