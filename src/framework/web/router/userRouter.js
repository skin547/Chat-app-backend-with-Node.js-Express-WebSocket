const express = require("express")

const UserController = require("../../../controller/userController")
const mockRoomRepository = require("../../repository/room/mockRoomRepository")
const mockUserRepository = require("../../repository/user/mockUserRepository")

userRouter = () => {
    const router = express.Router()

    const userRepo = mockUserRepository
    const roomRepo = mockRoomRepository
    let userController = UserController( userRepo, roomRepo )

    router.post("/signup", userController.signUp )
    router.post("/login", userController.login )
    router.post("/verify", userController.verify )

    router.get("/:userId/rooms", userController.getRooms )

    return router
}

module.exports = userRouter()