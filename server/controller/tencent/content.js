/**
 * @author : JessieK
 * @email : lyj1246505807@gmail.com
 * @description : 获取腾讯漫画内容
 */
let Spider = require('../spider')
let page
//　获取漫画内容
exports.getComicContent = async function (url) {
    page = await Spider.init()
    await Spider.switchPc(page)
    // 跳转到目标网站
    await page.goto(url)
    console.log('catch------>', url)
    await this.imgsTask()
}

// 针对腾讯漫画屏蔽了window.scroll一系列方法，用puppeteer模拟用户拖拽
exports.scrollPage = async function (distance) {
    await page.mouse.move(Spider.viewPort.width/2, Spider.viewPort.height * 0.9, {steps: 10})
    await page.mouse.down(Spider.viewPort.width/2, Spider.viewPort.height * 0.9)
    if (Spider.viewPort.height * 0.9 - distance > Spider.viewPort.height * 0.05){
        await page.mouse.move(Spider.viewPort.width/2, Spider.viewPort.height * 0.9 - distance, {steps: 10})
    }else{
        await page.mouse.move(Spider.viewPort.width/2, Spider.viewPort.height * 0.05, {steps: 10})
    }
    await page.mouse.up()
}

exports.imgsTask = async function () {
    // 等待
    await page.waitFor(1000)
    // 获取图片数目和高度
    const imagesLen = await page.$$eval('#comicContain img[data-h]', imgs => imgs.length);
    const imgHeight = await page.$eval('#comicContain img[data-h]', img => img.getAttribute('data-h'));

    // 自动滚动，使懒加载图片加载
    const step = 1;
    // 当前获取到的图片集合
    let images = [];
    for (let i = 1; i <= imagesLen / step; i++) {
        // 每次滚动一个张图片的高度
        // await page.evaluate(`window.scrollTo(0, ${i * imgHeight * step})`);
        await this.scrollPage(i * imgHeight * step)
        // 为确保懒加载触发，需要等待一下
        await page.waitFor(500)
        // 获取当前可见图片
        let imgs = await this.getImgs()
        // 过滤集合中不存在的图片
        let result = imgs.filter(function (v) {
            return images.indexOf(v) === -1
        })
        // 添加到当前获取到的图片集合
        Array.prototype.push.apply(images, result);
        console.log('放入新的链接:' + result)
        // webSocketUtil.curSocket.emit('imgUrl', img.src)
    }
}

exports.getImgs = async function () {
    // 获取图片url
    let data = await page.$$eval('#comicContain img[data-h]', imgs => {
        const images = []
        imgs.forEach(async img => {
            if (img.src.lastIndexOf('.gif') !== img.src.length - 4) {
                images.push(img.src)
            }
        })
        return images
    })
    let nextBtnText = await page.$eval('#mainControlNext', node => node.innerText)

    if (nextBtnText === '点击进入书末页') {
        // webSocketUtil.curSocket.emit('loadMore', false)
    } else if (nextBtnText === '点击进入下一话') {
        // webSocketUtil.curSocket.emit('loadMore', true)
    }
    return data

}

exports.getComicContentLastOrNext = async function (nextChapter) {
    let result = await page.evaluate((nextChapter) => {
        if (nextChapter === 'false') {
            console.log('点击了上一话')
            let prevChapterNode = document.querySelector('#prevChapter')
            prevChapterNode.click()
            return '点击了上一话' + nextChapter
        } else {
            console.log('点击了下一话')
            let nextChapterNode = document.querySelector('#nextChapter')
            nextChapterNode.click()
            return '点击了下一话' + nextChapter
        }
    }, nextChapter)
    console.log(result)
    await this.getImgs()
}
