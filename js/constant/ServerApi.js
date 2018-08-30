/**
 * @author : JessieK
 * @email : lyj1246505807@gmail.com
 * @description :　服务器url定义
 */

// 服务器主机ip
const server_host = 'http://192.168.0.114:1234/api'
const netease = '/163'
const tencent = '/tencent'
const object = {
    // 网易漫画
    netease:{
        getComic:server_host + netease + '/getComic',
        getComicMore:server_host + netease + '/getComicMore',
        getDetail:server_host + netease + '/getComicDetail',
        getDetailMore:server_host + netease + '/getComicDetailMore',
        getComicContent: server_host + netease + '/getComicContent',
        getComicContentLastOrNext: server_host + netease + '/getComicContentLastOrNext'
    },
    //　腾讯漫画
    tencent:{
        getComic:server_host + tencent + '/getComic',
        getDetail:server_host + tencent + '/getComicDetail',
        getDetailMore:server_host + tencent + '/getComicDetailMore',
        getComicContent: server_host + tencent + '/getComicContent',
        getComicContentLastOrNext: server_host + tencent + '/getComicContentLastOrNext'
    }
}
export default object
