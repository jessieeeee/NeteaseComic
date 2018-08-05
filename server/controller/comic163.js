'use strict'
const puppeteer = require('puppeteer-cn')
var tagetUrl = 'https://manhua.163.com'

exports.test3 = (async (ctx, next) => {
    let result = await getComic();
    ctx.body = {
        success: true,
        msg: result
    }
})

exports.test4 = (async (ctx, next) => {
    let result = await getComicDetail('https://manhua.163.com/source/4317076104890059052');
    ctx.body = {
        success: true,
        msg: result
    }
})

exports.test5 = (async (ctx, next) => {
    let result = await getComicContent('https://manhua.163.com/reader/4317076104890059052/4317076104890059053');
    ctx.body = {
        success: true,
        msg: result
    }
})

exports.test6 = (async (ctx, next) => {
    let result = await getComicComment('https://manhua.163.com/reader/4317076104890059052/4317076104890059053', 15)
    ctx.body = {
        success: true,
        msg: result
    }
})

var num = 0
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
    // 如果上一次获取的数量与当前数量一致，就不用获取了
    if (commentNum == commentData) {
        return
    } else {
        await getComment(page,index)
    }
    // 记录获取的数量
    commentNum = commentData.length
}

// 获取漫画评论
var getComicComment = async function (url, index) {
    num = 0
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
        let elements = document.querySelectorAll('.img-box-wrapper') // 获取评论和图片
        for (var element of elements) { // 循环
            let src = element.querySelector('div.img-box').querySelector('img').src // 获取图片地址
            data.push({ src }); // 存入数组
        }

        return {
            elements: data
        }
    }, tagetUrl)

    await browser.close()
    return result
}

// 获取漫画详情(章节)
var getComicDetail = async function (url) {
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
        let elements = document.querySelectorAll('div.m-chapter-item') // 获取所有章节元素
        for (var element of elements) { // 循环
            let order = element.querySelector('.sr-torder').innerText // 获取序号
            let title = element.querySelector('.sr-ttext').innerText　// 获取章节标题
            let link = element.querySelector('a').getAttribute('href') //　获取链接
            link = tagetUrl + link
            data.push({ order, title, link }); // 存入数组
        }
        return {
            elements: data
        }
    }, tagetUrl)
    await browser.close()
    return result
}

//　获取可看免费漫画
var getComic = async function () {
    // 启动了一个Chrome实例
    var browser = await puppeteer.launch({ headless: false })
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
            data.push({ title, chapter, clickNum, link, cover }); // 存入数组
        }
        return {
            elements: data
        }
    }, tagetUrl)

    await browser.close()
    return result
}
