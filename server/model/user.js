// 'use strict'
// var mongoose = require('mongoose')
//
// var UserSchema = new mongoose.Schema({
//     phoneNumber: {
//         unique: true,
//         type: String
//     },
//     areaCode: String,
//     verifyCode: String,
//     verified: {
//         type: Boolean,
//         default: false
//     },
//     accessToken: String,
//     nickname: String,
//     gender: String,
//     breed: String,
//     age: String,
//     avater: String,
//     meta: {
//         createAt:{
//             type:Date,
//             default:Date.now()
//         },
//         updateAt:{
//             type:Date,
//             default:Date.now()
//         }
//     }
// })
// UserSchema.pre('save', function(next) {
//     if(this.isNew){ // 如果这是个新的数据
//         this.meta.createAt = this.meta.updateAt = Date.now() // 设置当前时间
//     } else {
//         this.meta.updateAt = Date.now() // 否则刷新更新时间
//     }
//     next()
// })
//
// module.export = mongoose.model('Usersss', UserSchema)