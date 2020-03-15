/**
 * @author : JessieK
 * @email : lyj1246505807@gmail.com
 * @description : 获取腾讯漫画内容
 */
let Spider = require('../spider')
let page
let imgHeight = 0
let imagesLen = 0
let i = 0
let curResult = {}
let lastNum = 0
//　获取漫画内容
exports.getComicContent = async function (url) {
    page = await Spider.init()
    await Spider.switchPc(page)
    // 跳转到目标网站
    await page.goto(url)
    console.log('catch------>', url)
    return this.getImgs()
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

// 获取更多
exports.startGetMore = async function(){
    if (curResult.loadMore){
        // 自动滚动，使懒加载图片加载
        const step = 1;
        for (i = 1; i <= imagesLen / step; i++) {
            // 每次滚动一个张图片的高度
            await this.scrollPage(i * imgHeight * step)
            console.log('滚动步长'+ i * imgHeight * step)
            // 为确保懒加载触发，需要等待一下
            await page.waitFor(500)
            curResult.data = await getImgUrls()
        }
        curResult.loadMore = false
    }
}

exports.getComicContentMore = async function () {
    let temp = curResult.data.concat()
    temp.splice(0, lastNum)
    lastNum += temp.length
    if (temp.length === 0 && curResult.loadMore){
        await page.waitFor(800)
        await this.getComicContentMore()
    }
    let data = temp
    let imgWidth = curResult.imgWidth
    let imgHeight = curResult.imgHeight
    let loadMore = curResult.loadMore
    return {data, imgWidth, imgHeight, loadMore}
}

async function getImgUrls() {
// 获取图片url
    return await page.$$eval('#comicContain img[data-h]', imgs => {
        const images = []
        imgs.forEach(async img => {
            if (img.src.lastIndexOf('.gif') !== img.src.length - 4) {
                images.push(img.src)
            }
        })
        return images
    })
}

exports.getImgs = async function () {
    // 等待
    await page.waitFor(500)

    // 获取图片数目和高度
    imagesLen = await page.$$eval('#comicContain img[data-h]', imgs => imgs.length);
    imgHeight = await page.$eval('#comicContain img[data-h]', img => img.getAttribute('data-h'));
    let imgWidth = await page.$eval('#comicContain img[data-w]', img => img.getAttribute('data-w'));
    console.log('图片数量为' + imagesLen)

    let data = await getImgUrls()

    let loadMore = true
    imgHeight = parseInt(imgHeight)
    imgWidth = parseInt(imgWidth)
    lastNum = data.length
    curResult = {data, loadMore,imgWidth,imgHeight}
    console.log(curResult)
    return curResult

}

