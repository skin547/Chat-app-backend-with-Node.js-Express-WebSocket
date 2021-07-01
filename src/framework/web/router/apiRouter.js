const express = require("express")
const itemRouter = require("./itemRouter")
const userRouter = require("./userRouter")
const Logger = require("../middleware/logger")


const apiRouter = () => {
    const router = express.Router()

    router.use( Logger )
    router.use("/users", userRouter)
    router.use("/items", itemRouter)
    
    return router
}


module.exports = apiRouter()