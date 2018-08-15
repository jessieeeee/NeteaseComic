/**
 * @author : JessieK
 * @email : lyj1246505807@gmail.com
 * @description : 获取腾讯漫画内容
 */
let Spider = require('../spider')
//　获取漫画内容
exports.getComicContent = async function (url) {
    let page = Spider.init()
    await Spider.switchPc(page)
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
    return await page.$$eval('#comicContain img[data-h]', imgs => {
        const images = [];
        imgs.forEach(img => {
            if (img.src.lastIndexOf('.gif') !== img.src.length - 4) {
                images.push(img.src);
            }
        });
        return images;
    });
}

