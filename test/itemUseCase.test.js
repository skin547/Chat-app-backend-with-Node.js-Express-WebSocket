const expect = require('chai').expect

const constant = require("../src/constant/constant")
const AddItemUseCase = require("../src/useCases/item/addItem")
const GetItemUseCase = require("../src/useCases/item/getItem")
const MockItemRepo = require("../src/framework/repository/mockItemRepository")

describe( "Test item usecase", () => {

    before( () => {
        itemRepo = new MockItemRepo()
        addItem = new AddItemUseCase( itemRepo )
        getItem = new GetItemUseCase( itemRepo )
    })

    describe( "Get item usecase ", () => {

        before( async () => {
            let owner = "for test"
            await addItem.execute( "test1", owner )
            await addItem.execute( "test2", owner )
            await addItem.execute( "test3", owner )
            .then( res => res.changeStatus( constant.INPROGRESS ) )
            await addItem.execute( "test4", owner )
            .then( res => res.changeStatus( constant.COMPLETED ) )
        })

        it("should return all items", async () => {
            const items = await getItem.getAll()
            expect( items.length ).to.equal( 4 )
        })

        it("should return an item with specific id byId( )", async () => {
            const targetId = 3
            const item = await getItem.byId( targetId )
            expect( item.id ).to.equal( targetId )
            expect( item.status ).to.equal( "In progress" )
        })

        it( "should return an array of items with status byStatus( ) ", async () => {
            const status = constant.COMPLETED
            const items = await getItem.byStatus( status )
            items.forEach( item => expect( item.status ).to.equal( "Completed" ) )
        })

        it( "should return an array of items with specific owner byOwner( )", async () => {
            const owner = "for test"
            const items = await getItem.byOwner( owner )
            items.forEach( item => expect( item.owner ).to.equal( "for test" ) )
            expect( items.length ).to.equal( 4 )
        })
    })

    describe( "Add item usecase ", () => {

        it( "should generate an item and insert it into repository", async () => {
            const content = "test item"
            const owner = "frank"
            const actual = await addItem.execute( content, owner )
            expect( actual.status ).to.be.equal( "Todo" )
        })
    })
})