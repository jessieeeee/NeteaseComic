/**
 * @author : JessieK
 * @email : lyj1246505807@gmail.com
 * @description :获取网易漫画评论
 */
let Spider = require('../spider')
let commentData //当前评论数据
let commentNum = 0//评论数量
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
    console.log(commentData.pop())
    if (commentNum !== commentData.length) {
        // 记录获取的数量
        commentNum = commentData.length
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
    // 开始获取评论，每秒获取一次
    await this.getComment(page,index)
    return commentData
}