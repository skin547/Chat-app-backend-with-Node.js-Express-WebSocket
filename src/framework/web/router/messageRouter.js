const express = require("express")

const MessageController = require("../../../controller/messageController")
const MockClientRepository = require("../../repository/client/mockClientRepository")
const Authentication = require("../middleware/authentication.js")

messageRouter = () => {
    const router = express.Router()
    let messageRepo
    let roomRepo
    let clientRepo = MockClientRepository

    if( process.env.NODE_ENV === 'production'){
        messageRepo = require("../../repository/message/mysqlMessageRepository")
        roomRepo = require("../../repository/room/mysqlRoomRepository")
    } else {
        messageRepo = require("../../repository/message/mockMessageRepository")
        roomRepo = require("../../repository/room/mockRoomRepository")
    }
    
    router.use( Authentication )

    let messageController = MessageController( messageRepo, roomRepo, clientRepo )
    router.get("/", messageController.getAll )
    router.post("/", messageController.createMessage )

    return router
}

module.exports = messageRouter()