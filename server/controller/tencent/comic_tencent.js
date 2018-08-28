'use strict'
let list = require('./list')
let detail = require('./detail')
let content = require('./content')
let comment = require('./comment')

// 抓取免费漫画列表
exports.getComic = (async (ctx, next) => {
    //请求的参数
    const body = ctx.request.body
    for (let key in body) {
        console.log("body 参数 key is: ", key, " , value is: ", body[key])
    }
    let pageNo = 1
    if(body.pageNo){
        pageNo = body.pageNo
    }
    let result = await list.getComic(pageNo)
    ctx.body = {
        success: true,
        msg: result
    }
})

// 抓取漫画详情
exports.getComicDetail = (async (ctx, next) => {
    //请求的参数
    const body = ctx.request.body
    for (let key in body) {
        console.log("body 参数 key is: ", key, " , value is: ", body[key])
    }
    let id = body.id
    let result = await detail.getComicDetail('https://m.ac.qq.com/comic/index/id/'+ id);
    ctx.body = {
        success: true,
        msg: result
    }
})

// 获取漫画详情所有章节
exports.getComicDetailMore = (async (ctx, next) => {
    //请求的参数
    const body = ctx.request.body
    for (let key in body) {
        console.log("body 参数 key is: ", key, " , value is: ", body[key])
    }
    let id = body.id
    let result = await detail.getComicDetailMore('https://m.ac.qq.com/comic/chapterList/id/' + id)
    ctx.body = {
        success: true,
        msg: result
    }
})

// 抓取漫画内容
exports.getComicContent = (async (ctx, next) => {
    //请求的参数
    const body = ctx.request.body
    for (let key in body) {
        console.log("body 参数 key is: ", key, " , value is: ", body[key])
    }
    let tencentUrl = 'http://ac.qq.com/ComicView/'
    let link = tencentUrl + body.link
    // http://ac.qq.com/ComicView/index/id/522924/cid/287
    // http://ac.qq.com/chapter/index/id/627861/cid/57
    let result = await content.getComicContent(link);
    ctx.body = {
        success: true,
        msg: result
    }
})

// 抓取漫画内容上一话和下一话
exports.getComicContentLastOrNext = (async (ctx, next) => {
    //请求的参数
    const body = ctx.request.body
    for (let key in body) {
        console.log("body 参数 key is: ", key, " , value is: ", body[key])
    }
    let nextChapter = body.next
    let result = await content.getComicContentLastOrNext(nextChapter)
    ctx.body = {
        success: true,
        msg: result
    }
})
// 抓取漫画弹幕
exports.getComicComment = (async (ctx, next) => {
    //请求的参数
    const body = ctx.request.body
    for (let key in body) {
        console.log("body 参数 key is: ", key, " , value is: ", body[key])
    }
    let result = await comment.getComicComment('http://ac.qq.com/ComicView/index/id/542724/cid/263', 1)
    ctx.body = {
        success: true,
        msg: result
    }
})





