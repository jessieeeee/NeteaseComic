/**
 * @author : JessieK
 * @email : lyj1246505807@gmail.com
 * @description :获取网易漫画评论
 */
let Spider = require('../spider')
let commentData = []//当前评论数据
// 直接取对应图片的评论
exports.getComment = async function (page,index) {
    // 取数据
    let comments = await page.evaluate((index) => {
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
    // 过滤集合中不存在的图片
    let result = comments.filter(function(v){ return commentData.indexOf(v) === -1 })
    // 添加到当前获取到的图片集合
    Array.prototype.push.apply(commentData, result);
    console.log('放入新的链接:' + result)

}

// 获取漫画评论
exports.getComicComment = async function (url, index) {
    let page =await Spider.init()
    await Spider.switchPc(page)
    let urlStr = url + '#imgIndex=' + index
    // 跳转到目标网站
    await page.goto(urlStr)
    this.setInterval(async function () {
        // 开始获取评论，每秒获取一次
        await this.getComment(page,index)
    },1000)
}