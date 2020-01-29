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
                // 捕获目标url
                if (url.indexOf('manga.hdslb.com/bfs/manga/') !== -1
                    && url.indexOf('?token=') !== -1){
                    let suffix = url.substring(url.indexOf('?token=') - 3,url.indexOf('?token='))
                    // 过滤图片信息
                    if (suffix === 'jpg'){
                        console.log(response.url())
                        let data = response.url().toString();
                        let imgWidth = 660
                        let imgHeight = 1320
                        resolve({data, imgWidth, imgHeight})
                    }
                }
            }
        )
        // 跳转到目标网站
        page.goto(url)
    });
}

