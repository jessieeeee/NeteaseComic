/**
 * @author : JessieK
 * @email : lyj1246505807@gmail.com
 * @description : 获取网易漫画详情
 */
let Spider = require('../spider')
// 获取漫画详情(章节)
exports.getComicDetail = async function (url) {
    let page = await Spider.init()
    await Spider.switchMobile(page)
    let detailUrl = Spider.neteaseUrl + url
    // 跳转到目标网站
    await page.goto(detailUrl)
    console.log('catch------>', detailUrl)
    // 等待
    await page.waitFor(800)
    // 封面
    let cover = await page.$eval('div.comic-cover',img => {
        return img.getAttribute('style')
            .replace('background-image: url(','')
            .replace(/\"/g, "")
            .replace(');','')
            .substring(2)
    })

    let title = await page.$eval('div.comic-title', text => {
        return text.innerText
    })

    let author = await page.$eval('span.comic-author-name', text => {
        return text.innerText
    })
    let style = await page.$eval('span.comic-style', text => {
        return text.innerText
    })
    let id = await page.$eval('span.comic-id', text => {
        return text.innerText
    })
    let timeInfo = await page.$eval('p.time-info', text => {
        return text.innerText
    })
    let evaluate = await page.$eval('div.evaluate span', text => {
        return text.innerText
    })
    let links = await page.$$eval('a.episode-item', ls => {
        const temp = []
        ls.forEach(async link => {
            temp.push(link.getAttribute('href'))
        })
        return temp
    })
    let items = await page.$$eval('a.episode-item div.item-body', texts => {
        const temp = []
        texts.forEach(async text => {
            temp.push(text.innerText)
        })
        return temp
    })
    let data = []
    for (let i = 0; i< links.length; i++){
        let temp = {}
        temp.link = links[i]
        temp.text = items[i]
        data.push(temp)
    }
    let commUserAvatars = await page.$$eval('div.user-info span.user-avatar', avatars => {
        const temp = []
        avatars.forEach(async avatar => {
            temp.push(avatar.getAttribute('style')
                .replace('background-image: url(','')
                .replace(/\"/g, "")
                .replace(');','')
                .substring(2))
        })
        return temp
    })

    let commUserNames = await page.$$eval('div.user-info p.user-name', userNames => {
        const temp = []
        userNames.forEach(async userName => {
            temp.push(userName.innerText)
        })
        return temp
    })

    let commTimes = await page.$$eval('div.user-info p.create-time', times => {
        const temp = []
        times.forEach(async time => {
            temp.push(time.innerText)
        })
        return temp
    })

    let commInfos = await page.$$eval('div.comment-info div', infos => {
        const temp = []
        infos.forEach(async info => {
            temp.push(info.getAttribute('title'))
        })
        return temp
    })

    // 封装后返回
    let commentItem = []
    for(let i = 0; i< commUserAvatars.length; i++) {
        let temp = {}
        temp.avatar = commUserAvatars[i]
        temp.name = commUserNames[i]
        temp.time = commTimes[i]
        temp.commentText = commInfos[i]
        commentItem.push(temp)
    }
    return {cover,title,author,style,id,timeInfo,evaluate,data,commentItem}
}

// 获取漫画详情所有章节
exports.getComicDetailMore = async function (url){
    let targetUrl = Spider.neteaseUrl
    let page = await Spider.init()
    await Spider.switchMobile(page)
    // 跳转到目标网站
    await page.goto(url)
    console.log('catch------>', url)
    // 等待
    await page.waitFor(200)
    await page.evaluate(() => {
        document.querySelector('.js-flag.load-more').click()
    })
    await page.waitFor(2000)
    let result = await page.evaluate((targetUrl) => {
        let data = []
        let elements = document.querySelectorAll('a.m-chapter-item')
        for (let element of elements) { // 循环
            let order = element.querySelector('div.f-toe').innerText // 获取序号
            let link = element.getAttribute('href') //　获取链接
            link = targetUrl + link
            data.push({ order, link }); // 存入数组
        }
        return data
    },targetUrl)
    return result.splice(12, result.length)
}