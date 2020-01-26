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
    await Spider.switchMobile(page)
    let url = Spider.neteaseUrl + '/classify#/?from=manga_homepage&styles=-1&areas=-1&status=-1&prices=1&orders=0'
    // 跳转到目标网站
    await page.goto(url)
    console.log('catch------>',url)
    // 等待
    await page.waitFor(800)
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
    // 封面
    let images = await page.$$eval('div.manga-cover',imgs => {
        const temp = []
        imgs.forEach(async img => {
            temp.push(img.getAttribute('style')
                .replace('background-image: url(','')
                .replace(/\"/g, "")
                .replace(');','')
                .substring(2))
        })
        return temp
    })
    // 标题
    let texts = await page.$$eval('div.manga-title',txts => {
        const temp = []
        txts.forEach(async text => {
            temp.push(text.innerText)
        })
        return temp
    })
    // 连接
    let links = await page.$$eval('a.manga-card', ls => {
        const temp = []
        ls.forEach(async a => {
            temp.push(a.getAttribute('href'))
        })
        return temp
    })
    // 子标题
    let supportTexts = await page.$$eval('div.manga-info',supportTxts => {
        const temp = []
        supportTxts.forEach(async text => {
            temp.push(text.innerText)
        })
        return temp
    })
    // 封装后返回
    let data = []
    for(let i = 0; i< images.length; i++) {
        let temp = {}
        temp.image = images[i]
        temp.text = texts[i]
        temp.supportText = supportTexts[i]
        temp.link = links[i]
        data.push(temp)
    }
    return data
}