'use strict'
const puppeteer = require('puppeteer-cn')　//web抓取工具类
var tagetUrl = 'https://manhua.163.com' //网易漫画地址
const devices = require('puppeteer/DeviceDescriptors')
const iphone = devices['iPhone 6 Plus']
// 抓取免费漫画列表
exports.getComic = (async (ctx, next) => {
    let result = await getComic();
    ctx.body = {
        success: true,
        msg: result
    }
})

// 抓取漫画详情
exports.getComicDetail = (async (ctx, next) => {
    let result = await getComicDetail('https://manhua.163.com/source/4317076104890059052');
    ctx.body = {
        success: true,
        msg: result
    }
})
exports.getComicDetailMore = (async(ctx, next) => {
    let result = await getComicDetailMore('https://manhua.163.com/source/4317076104890059052')
    ctx.body = {
        success: true,
        msg: result
    }
})
// 抓取漫画内容
exports.getComicContent = (async (ctx, next) => {
    let result = await getComicContent('https://manhua.163.com/reader/4317076104890059052/4317076104890059053');
    ctx.body = {
        success: true,
        msg: result
    }
})

// 抓取漫画弹幕
exports.getComicComment = (async (ctx, next) => {
    let result = await getComicComment('https://manhua.163.com/reader/4317076104890059052/4317076104890059053', 15)
    ctx.body = {
        success: true,
        msg: result
    }
})

var commentData //当前评论数据
var commentNum = 0//评论数量
// 直接取对应图片的评论
var getComment = async function (page,index) {
    // 等待
    await page.waitFor(1000)
    // 取数据
    commentData = await page.evaluate((index) => {
        let elements = document.querySelectorAll('.img-box-wrapper') // 获取评论和图片
        // 获取评论
        let comments = []
        let commentsDom = elements[index].querySelectorAll('p') // 获取评论
        for (var commentDom of commentsDom) {
            let comment = commentDom.textContent
            comments.push(comment)
        }
        return comments
    },index)
    console.log(commentData.pop())
    // 如果上一次获取的数量与当前数量一致，获取完了，停止
    if (commentNum === commentData.length) {
        return
    } else {
        // 记录获取的数量
        commentNum = commentData.length
        await getComment(page,index)
    }
}

// 获取漫画评论
var getComicComment = async function (url, index) {
    // 启动了一个Chrome实例
    var browser = await puppeteer.launch({ headless: false })
    // 浏览器中创建一个新的页面
    const page = await browser.newPage()
    let urlstr = url + '#imgIndex=' + index
    // 跳转到目标网站
    await page.goto(urlstr)
    // 开始获取评论，每秒获取一次
    await getComment(page,index)
    await browser.close()
    return commentData
}

//　获取漫画内容
var getComicContent = async function (url) {
    // 启动了一个Chrome实例
    var browser = await puppeteer.launch({ headless: false })
    // 浏览器中创建一个新的页面
    const page = await browser.newPage()
    // 跳转到目标网站
    await page.goto(url)
    // 等待
    await page.waitFor(100)

    const result = await page.evaluate((tagetUrl) => {
        let data = []
        let elements = document.querySelectorAll('.img-box-wrapper') // 获取图片
        for (var element of elements) { // 循环
            let src = element.querySelector('div.img-box').querySelector('img').src // 获取图片地址
            data.push({ src }); // 存入数组
        }

        return {
            data: data
        }
    }, tagetUrl)

    await browser.close()
    return result
}

// 获取漫画详情所有章节
var getComicDetailMore = async function (url){
    // 启动了一个Chrome实例
    var browser = await puppeteer.launch({ headless: false ,slowMo: 250})
    // 浏览器中创建一个新的页面
    const page = await browser.newPage()
    // 模拟iphone访问
    await page.emulate(iphone)
    // 跳转到目标网站
    await page.goto(url)
    // 等待
    await page.waitFor(100)
    await page.evaluate(() => {
        document.querySelector('.js-flag.load-more').click()
    })
    await page.waitFor(200)
    const result = await page.evaluate((tagetUrl) => {
        let data = []
        let elements = document.querySelectorAll('a.m-chapter-item')
        for (var element of elements) { // 循环
            let order = element.querySelector('div.f-toe').innerText // 获取序号
            let link = element.getAttribute('href') //　获取链接
            link = tagetUrl + link
            data.push({ order, link }); // 存入数组
        }
        return {
            data: data
        }
    },tagetUrl)
    await browser.close()
    return result
}
// 获取漫画详情(章节)
var getComicDetail = async function (url) {
    // 启动了一个Chrome实例
    var browser = await puppeteer.launch({ headless: false ,slowMo: 250})

    // 浏览器中创建一个新的页面
    const page = await browser.newPage()
    // 模拟iphone访问
    await page.emulate(iphone)
    // 跳转到目标网站
    await page.goto(url)
    // 等待
    await page.waitFor(100)
    const result = await page.evaluate((tagetUrl) => {
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
        for (var element of elements) { // 循环
            let order = element.querySelector('div.f-toe').innerText // 获取序号
            let link = element.getAttribute('href') //　获取链接
            link = tagetUrl + link
            data.push({ order, link }); // 存入数组
        }
        return {
            data: {cover,title,author,category,intro,state,updateTime,data}
        }
    }, tagetUrl)
    await browser.close()
    return result
}

//　获取可看免费漫画
/*
sort　排序方式　1更新时间 2全站热门 3新作人气 4新作上架 5读者打赏
jd　1连载中　2已完结
dq  0中国　1日本　2韩国　3欧美
tc　8热血　16恋爱　15后宫　2恐怖　24治愈　11玄幻　26唯美　4悬疑　7搞笑 36古风 13萌系 14穿越
3校园　1都市　10魔幻　9冒险　5科幻　17武侠　32战斗　3001儿童
 */
var getComic = async function () {
    // 启动了一个Chrome实例
    var browser = await puppeteer.launch({ headless: true })
    // 浏览器中创建一个新的页面
    const page = await browser.newPage()
    // 跳转到目标网站
    await page.goto(tagetUrl + '/category?sort=2&sf=1')
    // 等待
    await page.waitFor(100)

    const result = await page.evaluate((tagetUrl) => {
        let data = []

        let elements = document.querySelectorAll('.comic-item') // 获取所有漫画元素
        for (var element of elements) { // 循环
            let title = element.querySelector('.comic-info .title').innerText // 获取标题
            let chapter = element.querySelector('.comic-info span').innerText　// 获取章节
            let clickNum = element.querySelector('.comic-info div.muted').innerText //　获取点击量
            let link = element.querySelector('.comic-info a').getAttribute('href')
            link = tagetUrl + link
            let cover = element.querySelector('.cover img').getAttribute('src')
            // let id = link.replace('https://manhua.163.com/source/','')
            let id = link.substring(link.lastIndexOf('/')+1,link.length)
            data.push({ id, title, chapter, clickNum, link, cover }) // 存入数组
        }
        return data
    }, tagetUrl)

    await browser.close()
    return result
}
