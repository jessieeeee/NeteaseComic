/**
 * @author : JessieK
 * @email : lyj1246505807@gmail.com
 * @description :获取网易漫画内容
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

    return await page.evaluate(() => {
        let data = []
        let elements = document.querySelectorAll('.img-box-wrapper') // 获取图片
        for (let element of elements) { // 循环
            let src = element.querySelector('div.img-box').querySelector('img').src // 获取图片地址
            data.push({ src }); // 存入数组
        }

        return {
            data: data
        }
    })
}