'use strict'
let mongoose = require('mongoose')
let Users = mongoose.model('users')
let Messages = mongoose.model('messages')
let Socketio = require('socket.io')
// 客户端socket和用户列表
let clients = {};
let users = {};

// 聊天室id
let chatId = 1;
module.exports = function (server) {
    let websocket = Socketio(server)
    websocket.on('connection', (socket) => {
        clients[socket.id] = socket;//保存客户端对象到列表
        console.log('连上了')
        socket.on('userJoined', (userId) => onUserJoined(userId, socket));
        socket.on('message', (message) => onMessageReceived(message, socket));
    });
}


async function onUserJoined(userId, socket) {
    console.log('有用户进来了' + userId)
    // 新用户userId为空，向数据库users表插入id
    if (!userId) {
        let userData = new Users({})
        let user = await userData.save()
        socket.emit('userJoined', user._id);
        users[socket.id] = user._id;
        // 发送之前的消息
        await sendExistingMessages(socket);
    } else { //否则刷新用户id
        users[socket.id] = userId;
        // 发送之前的消息
        await sendExistingMessages(socket);
    }
}

// 用户接收到消息
async function onMessageReceived(message, socket) {
    console.log(message.text)
    let userId = users[socket.id];
    // 用户id为空返回
    if (!userId) {
        console.log('没有这个用户啦')
        return;
    }
    // 保存消息并发送
    await sendAndSaveMessage(message, socket);
}

// 发送之前的消息
async function sendExistingMessages(socket) {
    // 查数据
    await Messages.find({
        chatId: chatId
    }).sort({createdAt: 1}).exec((err, messages) => {
        //　如果没有任何消息，直接返回
        if (!messages.length) {
            return;
        }
        socket.emit('message', messages.reverse());
    })

}

// 保存消息到数据，发送消息给除了当前用户的所有的用户
async function sendAndSaveMessage(msg, socket) {
    //　创建消息数据
    let messageData = new Messages({
        text: msg.text,
        user: msg.user,
        createdAt: new Date(msg.createdAt),
        chatId: chatId
    });
    let message = await messageData.save()
    // 发送消息给除了当前用户的所有的用户
    socket.broadcast.emit('message', message)
}