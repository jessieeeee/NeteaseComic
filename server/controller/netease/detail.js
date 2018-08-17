/**
 * @author : JessieK
 * @email : lyj1246505807@gmail.com
 * @description : 获取网易漫画详情
 */
let Spider = require('../spider')
// 获取漫画详情(章节)
exports.getComicDetail = async function (url) {
    let targetUrl = Spider.neteaseUrl
    let page = await Spider.init()
    await Spider.switchMobile(page)
    // 跳转到目标网站
    await page.goto(url)
    // 等待
    await page.waitFor(100)
    return await page.evaluate((targetUrl) => {
        let data = []
        let cover = document.querySelector('#cover-info').src //获取封面
        let infoNode = document.querySelector('#info')
        let title = infoNode.querySelector('h1').innerText // 标题
        let author = infoNode.querySelector('h2').innerText // 作者名称
        let category = infoNode.querySelector('h3').innerText // 分类
        let elements = document.querySelectorAll('a.m-chapter-item') // 获取所有章节元素
        let intro = document.querySelector('#intro').innerHTML //获取介绍
        let stateNode = document.querySelector('.source-state-wrap')
        let state = stateNode.querySelector('div.source-state').innerText //状态
        let updateTime = stateNode.querySelector('div.source-updateTime').innerText　//更新时间
        for (let element of elements) { // 循环
            let order = element.querySelector('div.f-toe').innerText // 获取序号
            let link = element.getAttribute('href') //　获取链接
            link = targetUrl + link
            data.push({ order, link }); // 存入数组
        }
        return {cover,title,author,category,intro,state,updateTime,data}
    }, targetUrl)
}

// 获取漫画详情所有章节
exports.getComicDetailMore = async function (url){
    let targetUrl = Spider.neteaseUrl
    let page = await Spider.init()
    await Spider.switchMobile(page)
    // 跳转到目标网站
    await page.goto(url)
    // 等待
    await page.waitFor(100)
    await page.evaluate(() => {
        document.querySelector('.js-flag.load-more').click()
    })
    await page.waitFor(200)
    return await page.evaluate((targetUrl) => {
        let data = []
        let elements = document.querySelectorAll('a.m-chapter-item')
        for (let element of elements) { // 循环
            let order = element.querySelector('div.f-toe').innerText // 获取序号
            let link = element.getAttribute('href') //　获取链接
            link = targetUrl + link
            data.push({ order, link }); // 存入数组
        }
        return data
    },targetUrl)

}