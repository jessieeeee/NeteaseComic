/**
 * @author : JessieK
 * @email : lyj1246505807@gmail.com
 * @description : 获取腾讯漫画列表
 */
let Spider = require('../spider')
/*
/hot/vip/1/page/1 热门
/Comic/all/finish/1/search/hot/vip/1/page/1 /finish/1/ 连载
/finish/2/ 完结
http://ac.qq.com/Comic/all/theme/13/search/hot/vip/1/page/1
/theme/13/ 1爆笑　2热血　3冒险　4恐怖　5科幻　6魔幻　7玄幻　8校园　9悬疑　10推理　11萌系 12穿越 13后宫
/Comic/all/audience/1/search/hot/vip/1/page/1
/audience/1/ 1少年　2少女　3青年　4少儿
http://ac.qq.com/Comic/all/state/right/search/hot/vip/1/page/1
/state/right/　right签约　pink精品　pop热门　rookie新手
http://ac.qq.com/Comic/all/type/3/search/hot/vip/1/page/1
/type/3/ 3故事漫画 8轻小说 2四格 4绘本 1单幅 5同人
http://ac.qq.com/Comic/all/nation/1/search/hot/vip/1/page/1
/nation/1/　1内地 2港台 3韩国 4日本
http://ac.qq.com/Comic/all/search/hot/vip/1/copyright/first/page/1
/copyright/first/　first首发　sole独家
 */
//　获取可看免费漫画
exports.getComic = async function (pageNo) {
    let targetUrl = Spider.tencentUrl
    let page =await Spider.init()
    await Spider.switchPc(page)
    let url = targetUrl + '/Comic/all/search/time/vip/1/page/'+ pageNo
    // 跳转到目标网站
    await page.goto(url)
    console.log('catch------>',url)
    // 滚到底部
    await page.evaluate(() => {
        window.scrollTo(0, document.body.scrollHeight)
    })
    // 等待
    await page.waitFor(200)
    return await page.evaluate((targetUrl) => {
        let data = []
        let elements = document.querySelectorAll('.ret-search-item') // 获取所有漫画元素
        for (let element of elements) { // 循环
            let titleNode = element.querySelector('.ret-works-title')
            let title = titleNode.querySelector('a').innerText // 获取标题
            let labelsNode = titleNode.querySelectorAll('i') // 获取标签
            let labels = []
            for (let labelNode of labelsNode) {
                labels.push(labelNode.innerText)
            }
            let author = element.querySelector('.ret-works-author').getAttribute("title")　// 获取作者
            let tagsNode = element.querySelector('.ret-works-tags')
            let clickNum = '' //　获取点击量
            if(tagsNode.querySelector('span')){
                clickNum = tagsNode.querySelector('span').innerText
            }
            let categorysNode = tagsNode.querySelectorAll('a') //获取分类标签
            let categorys = []
            for (let categoryNode of categorysNode) {
                categorys.push(categoryNode.innerText)
            }
            let link = element.querySelector('.ret-works-title').querySelector('a').getAttribute('href')//获取链接
            link = targetUrl + link
            let cover = element.querySelector('.mod-cover-list-thumb').querySelector('img').getAttribute('src')
            let intro = element.querySelector('.ret-works-decs').innerText
            let id = link.substring(link.lastIndexOf('/')+1,link.length)
            data.push({id, title, author,  categorys, labels, intro, clickNum, link, cover}); // 存入数组
        }
        return data
    }, targetUrl)

}
