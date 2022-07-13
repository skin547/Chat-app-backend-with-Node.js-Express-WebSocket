const express = require("express")

const UserController = require("../../../controller/userController")

userRouter = () => {
    const router = express.Router()
    let userRepo
    let roomRepo
    if( process.env.NODE_ENV === 'production'){
        userRepo = require("../../repository/user/mysqlUserRepository")
        roomRepo = require("../../repository/room/mysqlRoomRepository")
    } else {
        userRepo = require("../../repository/user/mockUserRepository")
        roomRepo = require("../../repository/room/mockRoomRepository")
    }
     
    let userController = UserController( userRepo, roomRepo )

    router.post("/signup", userController.signUp )
    router.post("/login", userController.login )
    router.post("/verify", userController.verify )

    router.get("/:userId/rooms", userController.getRooms )

    return router
}

module.exports = userRouter()