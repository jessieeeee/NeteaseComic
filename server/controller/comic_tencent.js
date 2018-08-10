'use strict'
const puppeteer = require('puppeteer-cn')　//web抓取工具类
var tagetUrl = 'http://ac.qq.com' //腾讯漫画地址
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
    let result = await getComicDetail('https://m.ac.qq.com/comic/index/id/542724');
    ctx.body = {
        success: true,
        msg: result
    }
})

// 获取漫画详情所有章节
exports.getComicDetailMore = (async (ctx, next) => {
    let result = await getComicDetailMore('https://m.ac.qq.com/comic/chapterList/id/542724')
    ctx.body = {
        success: true,
        msg: result
    }
})

// 抓取漫画内容
exports.getComicContent = (async (ctx, next) => {
    let result = await getComicContent(tagetUrl + '/ComicView/index/id/542724/cid/263');
    ctx.body = {
        success: true,
        msg: result
    }
})

// 抓取漫画弹幕
exports.getComicComment = (async (ctx, next) => {
    let result = await getComicComment(tagetUrl + '/ComicView/index/id/542724/cid/263', 1)
    ctx.body = {
        success: true,
        msg: result
    }
})

var commentData=[] //当前评论数据
var commentLastData=[] //上一次获取的评论数据
// 直接取对应图片的评论
var getComment = async function (page, index) {
    // 获取图片高度
    const imgHeight = await page.$eval('#comicContain img[data-h]', img => img.getAttribute('data-h'));
    await page.evaluate(`window.scrollTo(0, ${index * imgHeight })`);
    // 等待
    await page.waitFor(10000)
    // 取数据
    commentData = await page.$$eval('div.for-roast', divs => {
        const comments = [];
        divs.forEach(div => {
            comments.push(div.innerText)
        })
        return comments
    })
    // 如果评论数据没有变，获取完了，停止
    if (commentData.toString() === commentLastData.toString()) {
        // console.log('停止')
        return
    } else {
        // console.log('继续')
        commentLastData = commentData
        await getComment(page, index)
    }

}

// 获取漫画评论
var getComicComment = async function (url, index) {
    // 启动了一个Chrome实例
    var browser = await puppeteer.launch({headless: false})
    // 浏览器中创建一个新的页面
    const page = await browser.newPage()
    // 跳转到目标网站
    await page.goto(url)
    // 开始获取评论，每秒获取一次
    await getComment(page, index)
    // await browser.close()
    return commentData
}

//　获取漫画内容
var getComicContent = async function (url) {
    // 启动了一个Chrome实例
    var browser = await puppeteer.launch({headless: false})
    // 浏览器中创建一个新的页面
    const page = await browser.newPage()
    // 跳转到目标网站
    await page.goto(url)
    // 等待
    await page.waitFor(100)

    // 获取图片数目和高度
    const imagesLen = await page.$$eval('#comicContain img[data-h]', imgs => imgs.length);
    const imgHeight = await page.$eval('#comicContain img[data-h]', img => img.getAttribute('data-h'));

    // 自动滚动，使懒加载图片加载
    const step = 1;
    for (let i = 1; i < imagesLen / step; i++) {
        // 每次滚动一个张图片的高度
        await page.evaluate(`window.scrollTo(0, ${i * imgHeight * step})`);
        // 为确保懒加载触发，需要等待一下
        await page.waitFor(100)
    }
    // 获取图片url
    const images = await page.$$eval('#comicContain img[data-h]', imgs => {
        const images = [];
        imgs.forEach(img => {
            if (img.src.lastIndexOf('.gif') !== img.src.length - 4) {
                images.push(img.src);
            }
        });
        return images;
    });

    await browser.close()
    return images
}


var getComicDetailMore = async function (url) {
    // 启动了一个Chrome实例
    var browser = await puppeteer.launch({headless: false})
    // 浏览器中创建一个新的页面
    const page = await browser.newPage()
    // 跳转到目标网站
    await page.goto(url)
    // 等待
    await page.waitFor(100)
    // 模拟iphone访问
    await page.emulate(iphone)
    const result = await page.evaluate((tagetUrl) => {
        let data = []
        let elements = document.querySelector('ul.chapter-list.normal').querySelectorAll('.chapter-item')
        for (var element of elements) { // 循环
            let orderNode = element.querySelector('a')
            let order = orderNode.innerText // 获取序号
            let link = orderNode.getAttribute('href') //　获取链接
            link = tagetUrl + link
            data.push({order, link}); // 存入数组
        }
        return {
            data: data
        }
    }, tagetUrl)
    await browser.close()
    return result
}
// 获取漫画详情(章节)
var getComicDetail = async function (url) {
    // 启动了一个Chrome实例
    var browser = await puppeteer.launch({headless: false})
    // 浏览器中创建一个新的页面
    const page = await browser.newPage()
    // 跳转到目标网站
    await page.goto(url)
    // 等待
    await page.waitFor(100)
    // 模拟iphone访问
    await page.emulate(iphone)
    const result = await page.evaluate((tagetUrl) => {
        let data = []
        let cover = document.querySelector('div.head-info-cover').querySelector('img').src // 获取封面
        let titleNode = document.querySelector('li.head-info-title')
        let title = titleNode.querySelector('h1').innerText
        let score = titleNode.querySelector('span').innerText
        let tags = document.querySelector('.head-info-tags').innerText
        let author = document.querySelector('.head-info-author').innerText
        let hot = document.querySelector('.head-info-hot').innerText
        let summary = document.querySelector('.detail-summary').innerText
        document.querySelector('.tab-list-item').click() // 点击章节按钮
        let elements = document.querySelectorAll('.chapter-item') // 获取所有章节元素
        for (var element of elements) { // 循环
            let orderNode = element.querySelector('a')
            let order = orderNode.innerText // 获取序号
            let link = orderNode.getAttribute('href') //　获取链接
            link = tagetUrl + link
            data.push({order, link}); // 存入数组
        }
        return {
            elements: {cover, title, score, tags, author, hot, summary, data}
        }
    }, tagetUrl)
    await browser.close()
    return result
}

/*
/hot/vip/1/page/1 热门
/Comic/all/finish/1/search/hot/vip/1/page/1 /finish/1/ 连载
/finish/2/ 完结
http://ac.qq.com/Comic/all/theme/13/search/hot/vip/1/page/1
/theme/13/ 1爆笑　2热血　3冒险　4恐怖　5科幻　6魔幻　7玄幻　8校园　9悬疑　10推理　11萌系 12穿越 13后宫
/Comic/all/audience/1/search/hot/vip/1/page/1
/audience/1/ 1少年　2少女　3青年　4少儿
http://ac.qq.com/Comic/all/state/right/search/hot/vip/1/page/1
/state/right/　right签约　pink精品　pop热门　rookie新手
http://ac.qq.com/Comic/all/type/3/search/hot/vip/1/page/1
/type/3/ 3故事漫画 8轻小说 2四格 4绘本 1单幅 5同人
http://ac.qq.com/Comic/all/nation/1/search/hot/vip/1/page/1
/nation/1/　1内地 2港台 3韩国 4日本
http://ac.qq.com/Comic/all/search/hot/vip/1/copyright/first/page/1
/copyright/first/　first首发　sole独家
 */
//　获取可看免费漫画
var getComic = async function () {
    // 启动了一个Chrome实例
    var browser = await puppeteer.launch({headless: false})
    // 浏览器中创建一个新的页面
    const page = await browser.newPage()
    // 跳转到目标网站
    await page.goto(tagetUrl + '/Comic/all/search/time/vip/1/page/1')
    // 等待
    await page.waitFor(100)

    const result = await page.evaluate((tagetUrl) => {
        let data = []

        let elements = document.querySelectorAll('.ret-search-item') // 获取所有漫画元素
        for (var element of elements) { // 循环
            let title = element.querySelector('.ret-works-title').innerText // 获取标题
            let author = element.querySelector('.ret-works-author').getAttribute("title")　// 获取作者
            let tagsNode = element.querySelector('.ret-works-tags')
            let clickNum = tagsNode.querySelector('span').innerText//　获取点击量
            let categorysNode = tagsNode.querySelectorAll('a') //获取分类标签
            let categorys = []
            for (var categoryNode of categorysNode) {
                categorys.push(categoryNode.innerText)
            }
            let link = element.querySelector('.ret-works-title').querySelector('a').getAttribute('href')//获取链接
            link = tagetUrl + link
            let cover = element.querySelector('.mod-cover-list-thumb').querySelector('img').getAttribute('src')
            data.push({title, author, clickNum, categorys, link, cover}); // 存入数组
        }
        return {
            elements: data
        }
    }, tagetUrl)

    await browser.close()
    return result
}
