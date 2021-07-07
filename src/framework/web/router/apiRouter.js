const express = require("express")
const itemRouter = require("./itemRouter")
const userRouter = require("./userRouter")
const roomRouter = require("./roomRouter")
const Logger = require("../middleware/logger")
const ErrorHandler = require("../middleware/errorHandler")


const apiRouter = () => {
    const router = express.Router()

    router.use( Logger )
    router.use("/users", userRouter)
    router.use("/items", itemRouter)
    router.use("/rooms", roomRouter)
    router.use( ErrorHandler )
    
    return router
}


module.exports = apiRouter()