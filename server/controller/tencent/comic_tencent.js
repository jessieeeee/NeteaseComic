'use strict'
let list = require('./list')
let detail = require('./detail')
let content = require('./content')

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
    if (result.length === 0){
        ctx.body = {
            success: false
        }
    } else{
        ctx.body = {
            success: true,
            msg: result
        }
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
    if (!result.data ||result.data.length === 0 ){
        ctx.body = {
            success: false,
        }
    } else {
        ctx.body = {
            success: true,
            msg: result
        }
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
    if (result.length === 0 ){
        ctx.body = {
            success: false,
        }
    } else {
        ctx.body = {
            success: true,
            msg: result
        }
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
    let result = await content.getComicContent(link);
    if (!result.data ||result.data.length === 0 ){
        ctx.body = {
            success: false,
        }
    } else {
        ctx.body = {
            success: true,
            msg: result
        }
        content.startGetMore()
    }
})


// 抓取漫画内容上一话和下一话
exports.getComicContentMore = (async (ctx, next) => {
    //请求的参数
    const body = ctx.request.body
    for (let key in body) {
        console.log("body 参数 key is: ", key, " , value is: ", body[key])
    }
    let result = await content.getComicContentMore()
    if (!result.data ||result.data.length === 0 ){
        ctx.body = {
            success: false,
        }
    } else {
        ctx.body = {
            success: true,
            msg: result
        }
        content.startGetMore()
    }

})





