/**
 * @author : JessieK
 * @email : lyj1246505807@gmail.com
 * @description :获取网易漫画内容
 */
let webSocketUtil = require('../websocketutil')
let Spider = require('../spider')
let page
//　获取漫画内容
exports.getComicContent = async function (url) {
    page = await Spider.init()
    await Spider.switchPc(page)
    // 跳转到目标网站
    await page.goto(url)
    console.log('catch------>', url)
    // 开启获取图片任务
    await this.imgsTask()
}

//　获取上一话和下一话的内容
exports.getComicContentLastOrNext = async function (nextChapter) {
    let result = await page.evaluate((nextChapter) => {
        let nodes = document.querySelectorAll('.panel-btn-1')
        for(let node of nodes ){
            if (node.innerText === '上一话' && nextChapter === 'false') {
                console.log('点击了上一话')
                node.click()
                return '点击了上一话'
            }
            else if (node.innerText === '下一话' && nextChapter === 'true') {
                console.log('点击了下一话')
                node.click()
                return '点击了下一话'
            }
        }
    }, nextChapter)
    console.log(result)
    // 开启获取图片任务
    await this.imgsTask()
}
exports.imgsTask = async function () {
    // 等待
    await page.waitFor(700)
    let imgHeight
    try{
        imgHeight = await page.$eval('div.portrait-player .img-box', img => img.style.height.replace('px',''))
    }catch (error){
        return {loadMore : false}
    }
    const imagesLen = await page.$$eval('div.portrait-player .img-box', imgs => imgs.length)

    console.log('图片数量为' + imagesLen)
    console.log('图片高度为' + imgHeight)
    // 自动滚动，使懒加载图片加载
    const step = 1;
    // 当前获取到的图片集合
    let images = [];

    for (let i = 1; i <= imagesLen / step; i++) {
        // 每次滚动一个张图片的高度
        await page.evaluate(`window.scrollTo(0, ${i * imgHeight * step})`)
        console.log('滚动步长'+ i * imgHeight * step)
        // 为确保懒加载触发，需要等待一下
        await page.waitFor(1300)
        // 获取当前可见图片
        let imgs = await this.getImgs()
        // 过滤集合中不存在的图片
        let result = imgs.filter(function(v){ return images.indexOf(v) === -1 })
        // 添加到当前获取到的图片集合
        Array.prototype.push.apply(images, result);
        console.log('放入新的链接:' + result)
        if(result.length !== 0){
            webSocketUtil.curSocket.emit('imgUrl', result)
        }
    }
}
// 抓取图片
exports.getImgs = async function () {
    // 获取图片url
    let data = await page.$$eval('div.portrait-player .img-box img', imgs => {
        const images = []
        imgs.forEach(async img =>  {
            if (img.src.substring(0,4) !== 'data'){
                images.push(img.src)
            }
        })
        return images
    })

   return data

}