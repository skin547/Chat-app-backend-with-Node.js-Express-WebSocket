const express = require("express")

const MessageController = require("../../../controller/messageController")
const MockMessageRepository = require("../../repository/message/mockMessageRepository")
const MockRoomRepository = require("../../repository/room/mockRoomRepository")
const MockClientRepository = require("../../repository/client/mockClientRepository")
const Authentication = require("../middleware/authentication.js")

messageRouter = () => {
    const router = express.Router()
    router.use( Authentication )

    let messageRepo = MockMessageRepository
    let roomRepo = MockRoomRepository
    let clientRepo = MockClientRepository
    let messageController = MessageController( messageRepo, roomRepo, clientRepo )
    router.get("/", messageController.getAll )
    router.post("/", messageController.createMessage )
    // router.post("/", messageController )

    return router
}

module.exports = messageRouter()