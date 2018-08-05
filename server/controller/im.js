'use strict'
var mongoose = require('mongoose')
var Users = mongoose.model('users')
var Messages = mongoose.model('messages')
var Socketio = require('socket.io')
// 客户端socket和用户列表
var clients = {};
var users = {};

// 聊天室id
var chatId = 1;
module.exports = function(server){
    var websocket = Socketio(server)
    websocket.on('connection',(socket) => {
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
        var userData = new Users({})
        try{
            let user = await userData.save()
            socket.emit('userJoined', user._id);
            users[socket.id] = user._id;
            // 发送之前的消息
            _sendExistingMessages(socket);
        }catch(error){
            console.log(error)
        }
    } else { //否则刷新用户id
        users[socket.id] = userId;
        // 发送之前的消息
        _sendExistingMessages(socket);
    }
}

// 用户接收到消息
function onMessageReceived(message, senderSocket) {
    console.log(message.text)
    var userId = users[senderSocket.id];
    // 用户id为空返回
    if (!userId) {
        console.log('没有这个用户啦')
        return;
    }
　　 // 保存消息并发送
    _sendAndSaveMessage(message, senderSocket);
}

// 发送之前的消息
async function _sendExistingMessages(socket) {
    // 查数据
    await Messages.find({
        chatId: chatId
    }).sort({createdAt:1}).exec((err, messages) => {
        //　如果没有任何消息，直接返回
        if (!messages.length){
            return;
        }
        socket.emit('message', messages.reverse());
    })
    
}

// 保存消息到数据，发送消息给除了当前用户的所有的用户
async function _sendAndSaveMessage(message, socket, fromServer) {
    //　创建消息数据
    var messageData = new Messages({
        text: message.text,
        user: message.user,
        createdAt: new Date(message.createdAt),
        chatId: chatId
    });
    var message = await messageData.save()
    // 发送消息给除了当前用户的所有的用户
    socket.broadcast.emit('message', message);
}