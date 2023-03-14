import { Server } from 'socket.io';
import http from 'http';
import express from 'express';

const app = express();

const httpServer = http.createServer(app);
const io = new Server(httpServer);

interface Socket {
    socketId: string;
    userId: string;
}

let users: Socket[] = [];

const addUser = (userId: string, socketId: string) => {
    !users.some(user => user.userId === userId) &&
        users.push({ userId, socketId });
};

const removeUser = (socketId: string) => {
    users = users.filter(user => user.socketId !== socketId);
};

const getUser = (userId: string) => {
    return users.find(user => user.userId === userId);
};

io.on('connection', socket => {
    // onde conecta um usuário
    socket.on('addUser', userId => {
        addUser(userId, socket.id);
        io.emit('getUsers', users);
    });

    // enviar e receber mensagem
    socket.on('sendMessage', ({ senderId, receiverId, text }) => {
        const user = getUser(receiverId);

        if (!user) {
            io.to(socket.id).emit('error', 'User not found');
            return;
        }

        io.to(user.socketId).emit('getMessage', {
            senderId,
            text,
        });
    });

    //onde disconecta um usuário
    socket.on('disconnect', () => {
        console.log('a user disconnected!');
        removeUser(socket.id);
    });
});

export { httpServer, io };
