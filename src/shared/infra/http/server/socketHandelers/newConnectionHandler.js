import { addNewConnectedUser } from "../serverStore";

const newConnectionHandeler = async (socket, io) => {
    const userDetails = socket.user;

    addNewConnectedUser({
        socketId: socket.id,
        userId: userDetails.userId
    });
};

export default newConnectionHandeler
