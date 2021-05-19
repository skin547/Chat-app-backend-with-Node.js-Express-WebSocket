const express = require("express")

const ItemController = require("../../../controller/itemController")
const MockItemRepo = require("../../repository/mockItemRepository")

const Logger = require("../middleware/logger")
const ErrorHandler = require("../middleware/errorHandler")

itemRouter = () => {
    const router = express.Router()

    let itemRepo = new MockItemRepo()
    let itemController = ItemController( itemRepo )

    router.use( Logger )

    router.get("/", itemController.getAllItems )
    router.post("/", itemController.addNewItem )
    
    router.get("/:itemId", itemController.getItemById )

    router.use( ErrorHandler )

    return router
}

module.exports = itemRouter()