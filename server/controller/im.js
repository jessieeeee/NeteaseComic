'use strict'
let mongoose = require('mongoose')
let Messages = mongoose.model('messages')

// 用户接收到消息
async function onMessageReceived(message, socket, chatId) {
    console.log(message.text)
    // 保存消息并发送
    await sendAndSaveMessage(message, socket, chatId);
}

// 发送之前的消息
async function sendExistingMessages(socket, chatId) {
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
async function sendAndSaveMessage(msg, socket, chatId) {
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

module.exports ={onMessageReceived,sendExistingMessages}