/**
 * @author : JessieK
 * @email : lyj1246505807@gmail.com
 * @description :　服务器url定义
 */

// 服务器主机ip
const server_host = 'http://192.168.0.248:1234'
const server_api = server_host + '/api'
const netease = '/163'
const tencent = '/tencent'
const user = '/u'
const object = {
    server: server_host,
    // 网易漫画
    netease:{
        getComic:server_api + netease + '/getComic',
        getComicMore:server_api + netease + '/getComicMore',
        getDetail:server_api + netease + '/getComicDetail',
        getDetailMore:server_api + netease + '/getComicDetailMore',
        getComicContent: server_api + netease + '/getComicContent',
        getComicContentMore: server_api + netease + '/getComicContentMore',
    },
    //　腾讯漫画
    tencent:{
        getComic:server_api + tencent + '/getComic',
        getDetail:server_api + tencent + '/getComicDetail',
        getDetailMore:server_api + tencent + '/getComicDetailMore',
        getComicContent: server_api + tencent + '/getComicContent',
        getComicContentMore: server_api + tencent + '/getComicContentMore',

    },
    // 用户管理
    mine:{
        login: server_api + user + '/login',
        regist: server_api + user + '/signup',
        update: server_api + user + '/update',
        followComic: server_api + user + '/followComic',
        isFollow: server_api + user + '/isFollow',
        updatePassword: server_api + user + '/updatePassword',
        getAllFollow: server_api + user + '/getAllFollow'
    }
}
export default object
