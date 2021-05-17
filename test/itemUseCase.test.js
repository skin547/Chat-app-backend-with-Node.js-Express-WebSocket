const expect = require('chai').expect

const AddItemUseCase = require("../src/useCases/item/addItem")
const MockItemRepo = require("../src/framework/repository/mockItemRepository")

describe( "Test item usecase", () => {

    before( () => {
        itemRepo = new MockItemRepo()
        addItem = new AddItemUseCase( itemRepo )
    })

    describe( "Add item usecase ", () => {
        it( "should create item instance and insert it into repository", async () => {
            const content = "test item"
            const owner = "frank"
            const actual = await addItem.execute( content, owner )
            expect( actual.status ).to.be.equal( "Todo" )
        })
    })
})