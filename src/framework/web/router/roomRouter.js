const express = require("express")

const RoomController = require("../../../controller/roomController")
const MockRoomRepo = require("../../repository/room/mockRoomRepository")
const MockMessageRepo = require("../../repository/message/mockMessageRepository")
const MysqlRoomRepository = require("../../repository/room/mysqlRoomRepository.js")
const Authentication = require("../middleware/authentication.js")
const mysqlMessageRepository = require("../../repository/message/mysqlMessageRepository")

roomRouter = () => {
    const router = express.Router()

    let roomRepo
    let messageRepo
    if( process.env.NODE_ENV === 'production'){
        roomRepo = MysqlRoomRepository
        messageRepo = mysqlMessageRepository
    } else {
        roomRepo = MockRoomRepo
        messageRepo = MockMessageRepo
    }
    
    router.use( Authentication )
    const roomController = RoomController( roomRepo, messageRepo )
    router.get("/", roomController.getAll )
    router.get("/:roomId", roomController.getById )
    router.get("/:roomId/messages", roomController.getRoomMessages )
    router.post("/", roomController.createRoom )
    return router
}

module.exports = roomRouter()