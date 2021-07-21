const express = require("express")

const RoomController = require("../../../controller/roomController")
const MockRoomRepo = require("../../repository/room/mockRoomRepository")
const MockMessageRepo = require("../../repository/message/mockMessageRepository")
const Authentication = require("../middleware/authentication.js")

roomRouter = () => {
    const router = express.Router()

    router.use( Authentication )
    const roomController = RoomController( MockRoomRepo, MockMessageRepo )
    router.get("/", roomController.getAll )
    router.get("/:roomId", roomController.getById )
    router.get("/:roomId/messages", roomController.getRoomMessages )
    router.post("/", roomController.createRoom )
    return router
}

module.exports = roomRouter()