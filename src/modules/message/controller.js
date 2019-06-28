const { Messages } = require('../../db/mongo');
const { getOneChat } = require('../chatList/service');
const { getUserSocket } = require('../user/controller');
const { response } = require('../util/util');
const io = require('socket.io');

module.exports = (socket, io) => {
    socket.on('new_message', createMessage.bind(this, socket, io));
    socket.on('get_messages', getAllMessages.bind(this));
};


const createMessage = async (socket, io, data, callback) => {
    try {
        let chatId = data.chatId;
        let chat = await getOneChat(chatId);
        let message = await Messages.create({ chatId: chatId, message: data.message, owner:socket.userId });
        let socketIds = getSocketToSend(chat);
        socketIds.map(socketId => {
            io.to(socketId).emit('new_message', response(true, 'New message', message));
        })
        if (callback) {
            return callback(null, response(true, 'Message create success', message));
        }
    } catch (error) {
        if (callback) {
            return callback(response(false, 'Message create failed', {}), null);
        }
    }
};

const getAllMessages = async (data, callback) => {
    try {
        let chatId = data.chatId;
        let messages = await Messages.find({ chatId: chatId }).sort('-createdAt');
        callback(null, response(false, 'Messages get Success', messages));
    } catch (error) {
        callback(response(false, 'Messages get failed', {}), null);
    }
};

const getSocketToSend = (chat) => {
    let userIds = [];
    if (getUserSocket(chat.receiver)) {
        userIds.push(getUserSocket(chat.receiver));
    }
    if (getUserSocket(chat.sender)) {
        userIds.push(getUserSocket(chat.sender));
    }
    return userIds;
}