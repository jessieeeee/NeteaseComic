/**
 * @author : JessieK
 * @email : lyj1246505807@gmail.com
 * @description : 获取腾讯漫画评论
 */
let Spider = require('../spider')
let commentData = [] //当前评论数据
let commentLastData = [] //上一次获取的评论数据
// 直接取对应图片的评论
exports.getComment = async function (page, index) {
    // 等待
    await page.waitFor(1000)
    // 取数据
    commentData = await page.$$eval('div.for-roast', divs => {
        const comments = [];
        divs.forEach(div => {
            comments.push(div.innerText)
        })
        return comments
    })

    if (commentData.toString() !== commentLastData.toString()) {
        commentLastData = commentData
        await this.getComment(page, index)
    }
}

// 获取漫画评论
exports.getComicComment = async function (url, index) {
    let page =await Spider.init()
    await Spider.switchPc(page)
    // 跳转到目标网站
    await page.goto(url)
    // 获取图片高度
    const imgHeight = await page.$eval('#comicContain img[data-h]', img => img.getAttribute('data-h'));
    // 定位到对应图片
    await page.evaluate(`window.scrollTo(0, ${index * imgHeight })`);
    // 等待
    await page.waitFor(8000)
    // 开始获取评论，每秒获取一次
    await this.getComment(page, index)
    return commentData
}