const express = require("express")


const apiRouter = () => {
    const router = express.Router()

    router.get("/item", itemRouter)
    
    return router
}


module.exports = apiRouter