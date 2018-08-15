'use strict'
let list = require('./list')
let detail = require('./detail')
let content = require('./content')
let comment = require('./comment')
// 抓取免费漫画列表
exports.getComic = (async (ctx, next) => {
    let result = await list.getComic();
    ctx.body = {
        success: true,
        msg: result
    }
})

// 抓取漫画详情
exports.getComicDetail = (async (ctx, next) => {
    let result = await detail.getComicDetail('https://m.ac.qq.com/comic/index/id/542724');
    ctx.body = {
        success: true,
        msg: result
    }
})

// 获取漫画详情所有章节
exports.getComicDetailMore = (async (ctx, next) => {
    let result = await detail.getComicDetailMore('https://m.ac.qq.com/comic/chapterList/id/542724')
    ctx.body = {
        success: true,
        msg: result
    }
})

// 抓取漫画内容
exports.getComicContent = (async (ctx, next) => {
    let result = await content.getComicContent('http://ac.qq.com/ComicView/index/id/542724/cid/263');
    ctx.body = {
        success: true,
        msg: result
    }
})

// 抓取漫画弹幕
exports.getComicComment = (async (ctx, next) => {
    let result = await comment.getComicComment('http://ac.qq.com/ComicView/index/id/542724/cid/263', 1)
    ctx.body = {
        success: true,
        msg: result
    }
})





