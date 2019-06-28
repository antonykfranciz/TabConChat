const { createChatList, getChatList } = require('./service');
const { response } = require('../util/util');

module.exports = (socket) => {
    socket.on('chat_list', getChatLists.bind(this, socket));
    socket.on('create_chat', createAChatList.bind(this));
};


const getChatLists = async (socket, callback) => {
    try {
        let userId = socket.userId;
        let chatList = await getChatList(userId);
        return callback(null, response(true, 'Chat list fecthed success', chatList));
    } catch (error) {
        return callback(response(false, 'Chat list fetch Failed', {}), null);
    }
};

const createAChatList = async (socket, data, callback) => {
    try {
        let chatList = await createChatList(data.sender, data.receiver);
        return callback(response(true, 'Chat create success', chatList));
    } catch (error) {
        return callback(response(false, 'Chat create create Failed', {}));
    }
}

