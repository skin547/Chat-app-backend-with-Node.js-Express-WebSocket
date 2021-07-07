const express = require("express")

const ItemController = require("../../../controller/itemController")
const MockItemRepository = require("../../repository/item/mockItemRepository")

itemRouter = () => {
    const router = express.Router()

    let itemRepo = MockItemRepository
    let itemController = ItemController( itemRepo )

    router.get("/", itemController.getAllItems )
    router.post("/", itemController.addNewItem )
    
    router.get("/:itemId", itemController.getItemById )

    return router
}

module.exports = itemRouter()