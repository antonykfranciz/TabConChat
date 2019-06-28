let users = {};

const addUser = (socket) => {
    let userId = socket.handshake.query.userId;
    users[userId] = socket.id;
};


const removeUser = (socket) => {
    let userId = socket.handshake.query.userId;
    delete users[userId];
}

const getUserSocket = (userId) => {
    return users[userId];
};

module.exports = {
    addUser,
    removeUser,
    getUserSocket
};