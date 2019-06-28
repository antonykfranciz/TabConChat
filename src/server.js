require('dotenv').config()
const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const mongo = require('./db/mongo');
const { addUser, removeUser } = require('./modules/user/controller');
const messagesModule = require('./modules/message/controller');
const chatListModule = require('./modules/chatList/controller');

server.listen(process.env.PORT || 3000, () => {
    console.log(`server started on port ${process.env.PORT}`);
});

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.use((socket, next) => {
    let userId = socket.handshake.query.userId;
    if (!userId) {
        next(new Error('authentication error'));
        socket.disconnect();
    }
    socket.userId = userId;
    return next();
});

io.on('connection', function (socket) {
    addUser(socket);
    messagesModule(socket, io);
    chatListModule(socket, io);
});

io.on('disconnect', function () {
    removeUser(socket);
});

process.on("uncaughtException", function (err) {
    console.log(err);
});


