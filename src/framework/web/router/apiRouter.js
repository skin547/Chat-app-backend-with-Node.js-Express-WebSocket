const express = require("express")
const itemRouter = require("./itemRouter")


const apiRouter = () => {
    const router = express.Router()

    router.use("/items", itemRouter)
    
    return router
}


module.exports = apiRouter()