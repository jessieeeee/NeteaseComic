/**
 * @author : JessieK
 * @email : lyj1246505807@gmail.com
 * @description :获取网易漫画内容
 */
let Spider = require('../spider')
let page
let lastResult = []
let curResult = []
let tryNum = 0
//　获取漫画内容
exports.getComicContent = async function (url) {
    page = await Spider.init()
    await Spider.switchMobile(page)
    console.log('catch------>', url)
    return await getResponseMsg(page,url)
}

exports.getComicContentMore = async function () {
    return curResult
}


// 开始获取更多任务
exports.startGetMore = async function () {
    curResult = []
    tryNum = 0
    let loadMore = true
    getMore()
    // 自动滚动，使懒加载图片加载
    for (let j = 0; j< 10; j++){
        console.log('正在获取漫画内容')
        // 每次滚动一个张图片的高度
        await page.keyboard.down('ArrowDown')
        // 为确保懒加载触发，需要等待一下
        await page.waitFor(800)
        await page.keyboard.up('ArrowDown');
        if (curResult.length === lastResult.length){
            tryNum ++
            if (tryNum > 10){
                console.log('没有更多漫画了')
                loadMore = false
                break
            }
        }else{
            lastResult = curResult
        }
    }
    console.log('当前结果长度' + curResult.length)

}

function getMore(){
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
                    let imgWidth = parseInt(imgParam.substring(1, imgWidthEnd))
                    let imgFormatStart = imgParam.indexOf('.')
                    // 请求图片的格式
                    let imgFormat = imgParam.substring(imgFormatStart + 1,tokenStart)
                    // 过滤图片信息
                    if (suffix === imgFormat){
                        console.log(response.url())
                        let data = []
                        data.push(response.url().toString())
                        let imgHeight = 1320
                        curResult = {data, imgWidth, imgHeight}
                    }
                }
            }
        }
    )
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
                        let imgWidth = parseInt(imgParam.substring(1, imgWidthEnd))
                        let imgFormatStart = imgParam.indexOf('.')
                        // 请求图片的格式
                        let imgFormat = imgParam.substring(imgFormatStart + 1,tokenStart)
                        // 过滤图片信息
                        if (suffix === imgFormat){
                            console.log(response.url())
                            let data = []
                            data.push(response.url().toString())
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

