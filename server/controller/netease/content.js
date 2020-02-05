/**
 * @author : JessieK
 * @email : lyj1246505807@gmail.com
 * @description :获取网易漫画内容
 */
let websocket = require('../websocketutil')
let Spider = require('../spider')
let page
let result2
//　获取漫画内容
exports.getComicContent = async function (url) {
    page = await Spider.init()
    await Spider.switchMobile(page)
    console.log('catch------>', url)
    return await getResponseMsg(page,url)

}
async function getResponseMsg(page,url){
    return new Promise(function(resolve, reject){
        page.on('response',
            function (response){
                let url = response.url().toString()
                let tokenStart = url.indexOf('?token=')
                let tsStart = url.indexOf('&ts=')
                // 捕获目标url
                if (url.indexOf('manga.hdslb.com/bfs/manga/') !== -1
                    && tokenStart !== -1
                    && tsStart !== -1){
                    // 尾部参数请求的格式
                    let imgParamStart = url.indexOf('@')
                    if (imgParamStart !== -1){
                        // 图片本身的格式
                        let suffix = url.substring(imgParamStart - 3, imgParamStart)
                        // 请求图片的参数
                        let imgParam = url.substring(imgParamStart, tokenStart)
                        let imgWidthEnd = imgParam.indexOf('w')
                        // 请求图片的宽度
                        let imgWidth = imgParam.substring(1, imgWidthEnd)
                        let imgFormatStart = imgParam.indexOf('.')
                        // 请求图片的格式
                        let imgFormat = imgParam.substring(imgFormatStart + 1,tokenStart)
                        // 过滤图片信息
                        if (suffix === imgFormat){
                            console.log(response.url())
                            let data = response.url().toString();
                            let imgHeight = 1320
                            resolve({data, imgWidth, imgHeight})
                        }
                    }
                }
            }
        )
        // 跳转到目标网站
        page.goto(url)
    });
}

