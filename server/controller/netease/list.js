/**
 * @author : JessieK
 * @email : lyj1246505807@gmail.com
 * @description : 获取网易漫画列表
 */
let Spider = require('../spider')
let page = null
let curResult = []
let sumResult = []
let lastNum = 0
let tryNum = 0
let index = 0
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
    let url = Spider.neteaseUrl + 'm/classify?status=-1&areas=-1&styles=-1&orders=0&prices=1'
    // 跳转到目标网站
    await page.goto(url)
    console.log('catch------>',url)
    // 等待
    await page.waitFor(800)
    lastNum = 0
    let result = await this.getListResult(page)
    lastNum = result.length
    return result
}

exports.reset = function () {
    tryNum = 0
    sumResult = []
    index = 0
}

// 开始获取更多任务
exports.startGetMore = async function () {
    let step = 2000
    // 自动滚动，使懒加载图片加载
    for (let j = index; j < index + 10; j++){
        // 每次滚动一个张图片的高度
        await page.evaluate(`window.scrollTo(0, ${j * step})`)
        console.log('滚动步长' + j * step)
        // 为确保懒加载触发，需要等待一下
        await page.waitFor(800)
        let result = await this.getListResult(page)
        console.log('当前结果长度' + result.length)
        if (result.length === sumResult.length) {
            if (tryNum <= 3) {
                tryNum++;
                console.log('尝试次数'+tryNum)
                sumResult = result
            } else {
                break
            }
        } else {
            sumResult = result
        }
    }
    index += 10
}

async function getCurComics() {
    curResult = sumResult.concat()
    curResult.splice(0, lastNum)
    lastNum += curResult.length
    let loadMore = true
    if (tryNum > 3) {
        loadMore = false
    }
    if (curResult.length === 0 && loadMore){
        await page.waitFor(800)
        await getCurComics()
    }
    return loadMore
}

/**
 * 获取下一页
 * @returns {Promise<void>}
 */
exports.getComicMore = async function () {
    let loadMore = await getCurComics()
    let data = curResult
    return {data,loadMore}
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
        temp.id = i
        temp.cover = Spider.HTTP + images[i].toString()
        temp.title = texts[i]
        temp.chapter = supportTexts[i]
        temp.link = links[i]
        data.push(temp)
    }
    return data
}