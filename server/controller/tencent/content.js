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
    return this.getImgs()
}

exports.getImgs = async function () {
    // 等待
    await page.waitFor(500)

    // 获取图片数目和高度
    const imagesLen = await page.$$eval('#comicContain img[data-h]', imgs => imgs.length);
    const imgHeight = await page.$eval('#comicContain img[data-h]', img => img.getAttribute('data-h'));

    // 自动滚动，使懒加载图片加载
    const step = 1;
    for (let i = 1; i <= imagesLen / step; i++) {
        // 每次滚动一个张图片的高度
        await page.evaluate(`window.scrollTo(0, ${i * imgHeight * step})`);
        // 为确保懒加载触发，需要等待一下
        await page.waitFor(100)
    }
    // 获取图片url
    let data = await page.$$eval('#comicContain img[data-h]', imgs => {
        const images = [];
        imgs.forEach(img => {
            if (img.src.lastIndexOf('.gif') !== img.src.length - 4) {
                images.push(img.src);
            }
        });
        return images;
    });
    let node = await page.$eval('#mainControlNext', node => node)
    let loadMore = false
    if (node !== null) {
        loadMore = true
    }
    return {data, loadMore}

}

exports.getComicContentLastOrNext = async function (nextChapter) {
    let result = await page.evaluate((nextChapter) => {
        if (nextChapter === 'false'){
            console.log('点击了上一话')
            let prevChapterNode = document.querySelector('#prevChapter')
            prevChapterNode.click()
            return '点击了上一话'+nextChapter
        }else{
            console.log('点击了下一话')
            let nextChapterNode = document.querySelector('#nextChapter')
            nextChapterNode.click()
            return '点击了下一话'+nextChapter
        }
    }, nextChapter)
    console.log(result)
    return this.getImgs()
}
