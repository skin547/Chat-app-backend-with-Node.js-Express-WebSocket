const express = require("express")

const UserController = require("../../../controller/userController")
const MockUserRepo = require("../../repository/mockUserRepository")

const ErrorHandler = require("../middleware/errorHandler")

userRouter = () => {
    const router = express.Router()

    let userRepo = new MockUserRepo()
    let userController = UserController( userRepo )

    router.post("/signup", userController.signUp )
    router.post("/login", userController.login )
    
    router.post("/verify", userController.verify )

    router.use( ErrorHandler )

    return router
}

module.exports = userRouter()