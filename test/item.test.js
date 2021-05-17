const assert = require('assert').strict

const Item = require("../src/entites/item")
const constant = require("../src/constant/constant")

describe( "Test item", () => {
    id = 1
    content = "test"
    status = constant.TODO
    item = new Item( id, content, status )

    it( "should change status from 'In progress' to 'Completed' ", () => {
        item.changeStatus( constant.INPROGRESS )
        assert.equal( item.status, "In progress")

        item.changeStatus( constant.COMPLETED )
        assert.equal( item.status, "Completed")
    })

    it( "should change content to 'modified' and change 'updatedAt' attribute ", () => {
        item.changeContent( "modified" )
        assert.equal( item.content, "modified")
        assert.equal( item.updatedAt.getSeconds() , new Date().getSeconds() )
        assert.notEqual( item.createdAt, item.updatedAt )
    })

    it( "should change owner from 'frank' to 'josh' ", () => {
        item.changeOwner( "josh" )
        assert.equal( item.owner, "josh")
        assert.notEqual( item.createdAt, item.updatedAt )
    })
})