let Socketio = require('socket.io')
let mongoose = require('mongoose')
let Users = mongoose.model('users')
let IMUtil = require('./im')
// 客户端用户id和socket id映射表
let users = {}
// 聊天室id
let curChatId = 1
exports.curSocket = {}
function init(server) {
    let websocket = Socketio(server)
    websocket.on('connection', (socket) =>
    {
        console.log('连上了')
        this.curSocket = socket
        let userId = users[socket.id]
        // 用户id为空返回
        if (!userId) {
            console.log('没有这个用户啦')
            return
        }
        socket.on('userJoined', (userId, chatId) => onUserJoined(userId, chatId, socket))
        socket.on('message', (message, chatId) => IMUtil.onMessageReceived(message, chatId, socket))
    })
}

async function onUserJoined(userId, chatId, socket) {
    console.log('有用户进来了' + userId)
    curChatId = chatId
    // 新用户userId为空，向数据库users表插入id
    if (!userId) {
        let userData = new Users({})
        let user = await userData.save()
        socket.emit('userJoined', user._id);
        users[socket.id] = user._id;
    } else { //否则刷新用户id
        users[socket.id] = userId;
    }
    // 发送之前的消息
    await IMUtil.sendExistingMessages(socket, chatId)
}

module.exports = {init}