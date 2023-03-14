const connectedUsers = new Map();

const addNewConnecedUser = ({ socketId, userId }) => {
    connectedUsers.set(socketId, { userId });
};

const removeConnectedUser = socketId => {
    if (connectedUsers.has(socketId)) {
        connectedUsers.delete(socketId);
    }
};

export default {
    addNewConnecedUser,
    removeConnectedUser
};
