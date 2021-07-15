const express = require("express")

const MessageController = require("../../../controller/messageController")
const MockMessageRepository = require("../../repository/message/mockMessageRepository")

messageRouter = () => {
    const router = express.Router()

    let messageRepo = MockMessageRepository
    let messageController = MessageController( messageRepo )
    router.get("/", messageController.getAll )
    router.post("/", messageController.createMessage )
    // router.post("/", messageController )

    return router
}

module.exports = messageRouter()