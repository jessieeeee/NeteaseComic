/**
 * @author : JessieK
 * @email : lyj1246505807@gmail.com
 * @description :获取网易漫画评论
 */
let websocket = require('../websocketutil')
let Spider = require('../spider')
let commentData //当前评论数据
let commentLastData = [] //上一次获取的评论数据
// 直接取对应图片的评论
exports.getComment = async function (page,index) {
    // 等待
    await page.waitFor(1000)
    // 取数据
    commentData = await page.evaluate((index) => {
        let elements = document.querySelectorAll('.img-box-wrapper') // 获取评论和图片
        // 获取评论
        let comments = []
        let commentsDom = elements[index].querySelectorAll('p') // 获取评论
        for (let commentDom of commentsDom) {
            let comment = commentDom.textContent
            comments.push(comment)
        }
        return comments
    },index)
    let result = commentData.filter(function(v){ return commentLastData.indexOf(v) === -1 })
    websocket.curSocket.emit('comment',result)
    console.log('评论数量' + result.length)
    if (result.length === 0) {
        commentLastData = commentData
        await this.getComment(page,index)
    }
}

// 获取漫画评论
exports.getComicComment = async function (url, index) {
    let page =await Spider.init()
    await Spider.switchPc(page)
    let urlStr = url + '#imgIndex=' + index
    // 跳转到目标网站
    await page.goto(urlStr)
    // 等待
    await page.waitFor(8000)
    // 开始获取评论，每秒获取一次
    await this.getComment(page,index)
    return commentData
}