import { removeConnectedUser } from "../serverStore"

const disconnectedHandler = (socket) => {
    removeConnectedUser(socket.id)
}

export default disconnectedHandler
