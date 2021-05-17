const constant = require("../constant/constant");

module.exports = class Item {
    constructor(id, content, owner, status = constant.TODO ) {
        this.id = id
        this.content = content
        this.owner = owner
        this.status = status
        this.createdAt = new Date()
    }

    changeStatus( status ) {
        this.status = status
        this.updatedAt = new Date()
    }

    changeContent( content ) {
        this.content = content
        this.updatedAt = new Date()
    }

    changeOwner( owner ) {
        this.owner = owner
        this.updatedAt = new Date()
    }

};