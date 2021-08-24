const express = require("express")
const itemRouter = require("./itemRouter")
const userRouter = require("./userRouter")
const roomRouter = require("./roomRouter")
const messageRouter = require("./messageRouter")
const logMiddleWare = require("../middleware/logMiddleWare")
const ErrorHandler = require("../middleware/errorHandler")


const apiRouter = () => {
    const router = express.Router()

    router.use( logMiddleWare )
    router.use("/users", userRouter)
    router.use("/items", itemRouter)
    router.use("/rooms", roomRouter)
    router.use("/messages", messageRouter)
    router.use( ErrorHandler )
    router.get("/*", ( request, response, next ) => {
        response.status( 404 ).json( { error : "resource not found" } )
    })
    
    return router
}


module.exports = apiRouter()