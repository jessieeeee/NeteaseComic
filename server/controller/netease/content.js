/**
 * @author : JessieK
 * @email : lyj1246505807@gmail.com
 * @description :获取网易漫画内容
 */
let Spider = require('../spider')
let page
let lastResult = {}
let curResult = {loadMore:true}
let lastNum = 0
let tryNum = 0
let data = []
//　获取漫画内容
exports.getComicContent = async function (url) {
    page = await Spider.init()
    await Spider.switchMobile(page)
    console.log('catch------>', url)
    lastResult = await getResponseMsg(page,url)
    lastNum = lastResult.data.length
    return lastResult
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


// 开始获取更多任务
exports.startGetMore = async function () {
    if (curResult.loadMore){
        tryNum = 0
        // 自动滚动，使懒加载图片加载
        for (let j = 0; j< 10; j++){
            console.log('正在获取漫画内容')
            // 每次滚动一个张图片的高度
            await page.keyboard.down('ArrowDown')
            // 为确保懒加载触发，需要等待一下
            await page.waitFor(800)
            await page.keyboard.up('ArrowDown');
            if (curResult.data.length === lastResult.data.length){
                tryNum ++
                if (tryNum > 10){
                    console.log('没有更多漫画了')
                    curResult.loadMore = false
                    break
                }
            }else{
                lastResult = curResult
            }
        }
        console.log('当前结果长度' + curResult.data.length)
    }
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
                            data.push(response.url().toString())
                            let imgHeight = 1320
                            let loadMore = true
                            curResult = {data, imgWidth, imgHeight,loadMore}
                            resolve(curResult)
                        }
                    }
                }
            }
        )
        // 跳转到目标网站
        page.goto(url)
    });
}

