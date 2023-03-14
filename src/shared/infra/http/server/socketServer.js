const socketIo = require('socket.io');
const authSocket = require('./authSocket');
const newConnectionHandeler = require('./socketHandelers/newConnectionHandler');
const disconnectedHandler = require("./socketHandelers/disconnectedHandler")

const registerSocketServer = server => {
    const io = socketIo(server, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST'],
        },
    });

    io.use((socket, next) => {
        authSocket(socket, next);
    });

    io.on('connection', socket => {
        newConnectionHandeler(socket, io);

        socket.on("disconnect", () => {
            disconnectedHandler(socket)
        })
    });
};

module.exports = {
    registerSocketServer,
};
