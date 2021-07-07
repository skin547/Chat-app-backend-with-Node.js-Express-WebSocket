const express = require("express")

const RoomController = require("../../../controller/roomController")
const MockRoomRepo = require("../../repository/room/mockRoomRepository")

roomRouter = () => {
    const router = express.Router()

    // const roomRepo = new MockRoomRepo()
    const roomController = RoomController( MockRoomRepo )

    // router.get("/", itemController.getAllItems )
    // router.post("/", itemController.addNewItem )
    
    // router.get("/:roomId", itemController.getItemById )

    router.get("/", roomController.getAll )
    router.get("/:roomId", roomController.getById )
    router.post("/", roomController.createRoom )
    return router
}

module.exports = roomRouter()