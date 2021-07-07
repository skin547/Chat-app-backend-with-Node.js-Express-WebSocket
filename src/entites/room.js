module.exports = class Room {
    constructor(id, users, name) {
        this.id = id
        this.users = users
        this.name = name
        this.messages = []
        this.createdAt = new Date()
    }

    getUsers( ){
        return this.users
    }

    getMessages(){
        return this.messages
    }

    addUser( user ){
        this.users.push( user )
    }

    addMessages( message ){
        this.messages.push( message )
    }

    changeName( name ){
        this.name = name
    }
};