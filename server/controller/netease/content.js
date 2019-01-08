/**
 * @author : JessieK
 * @email : lyj1246505807@gmail.com
 * @description :获取网易漫画内容
 */
let websocket = require('../websocketutil')
let Spider = require('../spider')
let page
//　获取漫画内容
exports.getComicContent = async function (url) {
    page = await Spider.init()
    await Spider.switchPc(page)
    // 跳转到目标网站
    await page.goto(url)
    console.log('catch------>', url)
    return this.getImgs()
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
    return this.getImgs()
}

// 抓取图片
exports.getImgs = async function () {
    // 等待
    await page.waitFor(700)
    let imgHeight,imgWidth
    try{
         imgHeight = await page.$eval('div.portrait-player .img-box', img => img.style.height.replace('px',''))
         imgWidth = await page.$eval('div.portrait-player .img-box', img => img.style.width.replace('px',''))
    }catch (error){
        return {loadMore:false}
    }
    const imagesLen = await page.$$eval('div.portrait-player .img-box', imgs => imgs.length)
    console.log('图片数量为' + imagesLen)
    console.log('图片高度为' + imgHeight)
    // 自动滚动，使懒加载图片加载
    const step = 1;
    for (let i = 1; i <= imagesLen / step; i++) {
        // 每次滚动一个张图片的高度
        await page.evaluate(`window.scrollTo(0, ${i * imgHeight * step})`)
        websocket.curSocket.emit('catch',{index:i,length:imagesLen})
        console.log('滚动步长'+ i * imgHeight * step)
        // 为确保懒加载触发，需要等待一下
        await page.waitFor(1300)
    }
    // 获取图片url
    let data = await page.$$eval('div.portrait-player .img-box img', (imgs) => {
        const images = []
        imgs.forEach(async img => {
            if (img.src.substring(0,4) !== 'data') {
                images.push(img.src)
            }
        })
        return images
    })

    let loadMore = true
    imgHeight = parseInt(imgHeight)
    imgWidth = parseInt(imgWidth)
    console.log({data, loadMore,imgWidth, imgHeight})
    return {data, loadMore,imgWidth, imgHeight}

}