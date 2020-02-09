/**
 * @author : JessieK
 * @email : lyj1246505807@gmail.com
 * @description : 获取网易漫画详情
 */
let Spider = require('../spider')

/**
 * 获取漫画章节
 * @param page
 * @returns {Promise<[]>}
 */
async function getComicItems(page) {
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
    for (let i = 0; i < links.length; i++) {
        let temp = {}
        temp.link = links[i]
        temp.order = items[i]
        data.push(temp)
    }
    return data
}

/**
 * 获取漫画评论
 * @param page
 * @returns {Promise<[]>}
 */
async function getCommentItems(page) {
    let commUserAvatars = await page.$$eval('div.user-info span.user-avatar', avatars => {
        const temp = []
        avatars.forEach(async avatar => {
            temp.push(avatar.getAttribute('style')
                .replace('background-image: url(', '')
                .replace(/\"/g, "")
                .replace(');', '')
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
    for (let i = 0; i < commUserAvatars.length; i++) {
        let temp = {}
        temp.avatar = commUserAvatars[i]
        temp.name = commUserNames[i]
        temp.time = commTimes[i]
        temp.commentText = commInfos[i]
        commentItem.push(temp)
    }
    return commentItem
}

/**
 * 获取漫画详情
 * @param url
 * @returns {Promise<{cover: *, timeInfo: *, data: *, author: *, style: *, id: *, title: *, evaluate: *, commentItem: *}>}
 */
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
            .substring(2).toString()
    })
    cover = Spider.HTTP + cover
    let title = await page.$eval('div.comic-title', text => {
        return text.innerText
    })

    let author = await page.$eval('span.comic-author-name', text => {
        return text.innerText
    })
    let category = await page.$eval('span.comic-style', text => {
        return text.innerText
    })
    let id = await page.$eval('span.comic-id', text => {
        return text.innerText
    })
    let updateTime = await page.$eval('p.time-info', text => {
        return text.innerText
    })

    let introMore = await page.$('div.evaluate span.folder-icon')
    if (introMore){
        introMore.click()
    }
    // 等待
    await page.waitFor(200)
    let intro = await page.$eval('div.evaluate span', text => {
        return text.innerText
    })
    let data = await getComicItems(page)
    let commentItem = await getCommentItems(page)
    let moreBtn = await page.$('div.episode-item')
    let loadMore = false
    if (moreBtn){
        loadMore = true
    }
    return {cover,title,author,category,id,updateTime,intro,data,commentItem,loadMore}
}

/**
 * 获取漫画详情所有章节
 * @returns {Promise<*[]>}
 */
exports.getComicDetailMore = async function (){
    let page = Spider.lastPage()

    let moreBtn = await page.$('div.episode-item')
    if (moreBtn){
        moreBtn.click()
    }
    // 等待
    await page.waitFor(200)
    let data = await getComicItems(page)
    return data.splice(7, data.length)
}