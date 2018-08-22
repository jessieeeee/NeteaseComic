/**
 * @author : JessieK
 * @email : lyj1246505807@gmail.com
 * @description : 获取腾讯漫画详情
 */
let Spider = require('../spider')
exports.getComicDetailMore = async function (url) {
    let page = await Spider.init()
    let targetUrl = Spider.tencentUrl
    await Spider.switchMobile(page)
    // 跳转到目标网站
    await page.goto(url)
    // 等待
    await page.waitFor(100)
    let result = await page.evaluate((targetUrl) => {
        let data = []
        let elements = document.querySelector('ul.chapter-list.normal').querySelectorAll('.chapter-item')
        for (let element of elements) { // 循环
            let orderNode = element.querySelector('a')
            let order = orderNode.innerText // 获取序号
            let link = orderNode.getAttribute('href') //　获取链接
            link = targetUrl + link
            data.push({order, link}); // 存入数组
        }
        return data
    }, targetUrl)
    return result.splice(9, result.length)
}

// 获取漫画详情(章节)
exports.getComicDetail = async function (url) {
    let targetUrl = Spider.tencentUrl
    let page =await Spider.init()
    await Spider.switchMobile(page)
    // 跳转到目标网站
    await page.goto(url)
    // 等待
    await page.waitFor(100)
    return await page.evaluate((targetUrl) => {
        let data = []
        let cover = document.querySelector('div.head-info-cover').querySelector('img').src // 获取封面
        let titleNode = document.querySelector('li.head-info-title')
        let title = titleNode.querySelector('h1').innerText
        let score = titleNode.querySelector('span').innerText
        let tags = document.querySelector('.head-info-tags').innerText
        let author = document.querySelector('.head-info-author').innerText
        let hot = document.querySelector('.head-info-hot').innerText.split('：')
        hot = hot[1]
        let summary = document.querySelector('.detail-summary').innerText.replace(/[\r\n]/g,'')
        document.querySelector('.tab-list-item').click() // 点击章节按钮
        let elements = document.querySelectorAll('.chapter-item') // 获取所有章节元素
        for (let element of elements) { // 循环
            let orderNode = element.querySelector('a')
            let order = orderNode.innerText // 获取序号
            let link = orderNode.getAttribute('href') //　获取链接
            link = targetUrl + link
            data.push({order, link}); // 存入数组
        }
        let loadMore = false
        if (document.querySelector('.btn-expand-chapter-list')){
            loadMore = true
        }
        return {cover, title, score, tags, author, hot, summary, data ,loadMore}
    }, targetUrl)

}
