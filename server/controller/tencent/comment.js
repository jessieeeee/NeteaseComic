/**
 * @author : JessieK
 * @email : lyj1246505807@gmail.com
 * @description : 获取腾讯漫画评论
 */
let Spider = require('../spider')
let commentData = [] //当前评论数据
// 直接取对应图片的评论
exports.getComment = async function (page, index) {
    // 取数据
    let comments = await page.$$eval('div.for-roast', divs => {
        const comments = [];
        divs.forEach(div => {
            comments.push(div.innerText)
        })
        return comments
    })

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
    // 跳转到目标网站
    await page.goto(url)
    // 获取图片高度
    const imgHeight = await page.$eval('#comicContain img[data-h]', img => img.getAttribute('data-h'));
    // 定位到对应图片
    await page.evaluate(`window.scrollTo(0, ${index * imgHeight })`);
    // 等待
    await page.waitFor(8000)
    this.setInterval(async function () {
        // 开始获取评论，每秒获取一次
        await this.getComment(page,index)
    },1000)
}