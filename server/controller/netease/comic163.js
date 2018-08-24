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
    let result = await list.getComic()
    ctx.body = {
        success: true,
        msg: result
    }
})

// 抓取免费漫画列表下一页
exports.getComicMore = (async (ctx, next) => {
    //请求的参数
    const body = ctx.request.body
    for (let key in body) {
        console.log("body 参数 key is: ", key, " , value is: ", body[key])
    }
    let result = await list.getComicMore()
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
    let link = body.link
    let result = await detail.getComicDetail(link)
    ctx.body = {
        success: true,
        msg: result
    }
})

// 抓取漫画详情所有章节
exports.getComicDetailMore = (async(ctx, next) => {
    //请求的参数
    const body = ctx.request.body
    for (let key in body) {
        console.log("body 参数 key is: ", key, " , value is: ", body[key])
    }
    let link = body.link
    let result = await detail.getComicDetailMore(link)
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
    let link = body.link
    let result = await content.getComicContent(link)
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
    let link = body.link
    let index = body.index
    let result = await comment.getComicComment(link, index)
    ctx.body = {
        success: true,
        msg: result
    }
})






