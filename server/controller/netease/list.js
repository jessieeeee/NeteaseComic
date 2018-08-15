/**
 * @author : JessieK
 * @email : lyj1246505807@gmail.com
 * @description : 获取网易漫画列表
 */
let Spider = require('../spider')
let page = null

//　获取可看免费漫画
/*
sort　排序方式　1更新时间 2全站热门 3新作人气 4新作上架 5读者打赏
jd　1连载中　2已完结
dq  0中国　1日本　2韩国　3欧美
tc　8热血　16恋爱　15后宫　2恐怖　24治愈　11玄幻　26唯美　4悬疑　7搞笑 36古风 13萌系 14穿越
3校园　1都市　10魔幻　9冒险　5科幻　17武侠　32战斗　3001儿童
 */
exports.getComic = async function () {
    page = await Spider.init()
    await Spider.switchPc(page)
    // 跳转到目标网站
    await page.goto(Spider.neteaseUrl + '/category?sort=2&sf=1')
    // 等待
    await page.waitFor(100)
    return await this.getListResult(page)
}

/**
 * 获取下一页
 * @returns {Promise<void>}
 */
exports.getComicMore = async function () {
    await page.evaluate(() => {
        document.querySelector('.f-ib.arrow-next.sprite-icon_2-page-next').click() // 点击章节按钮
    })
    // 等待
    await page.waitFor(500)
    return await this.getListResult(page)
}

exports.getListResult = async function (page) {
    let targetUrl = Spider.neteaseUrl
    return await page.evaluate((targetUrl) => {
        let data = []
        // document.querySelector('.f-ib.arrow-next.sprite-icon_2-page-next').click()
        let elements = document.querySelectorAll('.comic-item') // 获取所有漫画元素
        for (let element of elements) { // 循环
            let title = element.querySelector('.comic-info .title').innerText // 获取标题
            let chapter = element.querySelector('.comic-info span').innerText　// 获取章节
            let clickNum = element.querySelector('.comic-info div.muted').innerText //　获取点击量
            let link = element.querySelector('.comic-info a').getAttribute('href')
            link = targetUrl + link
            let cover = element.querySelector('.cover img').getAttribute('src')
            // let id = link.replace('https://manhua.163.com/source/','')
            let id = link.substring(link.lastIndexOf('/')+1,link.length)
            data.push({ id, title, chapter, clickNum, link, cover }) // 存入数组
        }
        return data
    }, targetUrl)
}