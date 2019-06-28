let { ChatList } = require('../../db/mongo');

const createChatList = async (sender, receiver) => {
    let chatList = await ChatList.create({ sender: sender, receiver: receiver });
    return chatList;
}

const getChatList = async (userId) => {
    let chatList = await ChatList.find({ $or: [{ sender: userId }, { receiver: userId }] });
    let chats = parseList(chatList);
    return chats;
}

const parseList = (chats, userId) => {
    let parsedChats = [];
    chats.map(chat => {
        let user = chat.sender === userId ? chat.receiver : chat.sender;
        parsedChats.push({
            _id: chat._id,
            user: user
        })
    });
    return parsedChats;
};

const getOneChat = async (chatId) => {
    let chat = await ChatList.findById(chatId);
    if (!chat) {
        throw new Error('Chat not Found');
    }
    return chat;
}


module.exports = {
    createChatList,
    getChatList,
    getOneChat
}