const User = require("../../entites/user");
const UserRepository = require("./userRepository");

module.exports = class MockUserRepository extends UserRepository {

    constructor(){
        console.log( "Initializing MockUserRepository...")
        super()
        this.currentId = 1
        this.users = []
    }

    insert( name, email, password ){
        return new Promise( ( resolve ) => {
            let newUser = new User( this.currentId, name, email, password )
            this.currentId = this.currentId + 1
            this.users.push( newUser )
            resolve( newUser )
        })
    }

    getUserByEmail( email ){
        return new Promise( ( resolve ) => {
            this.users.forEach( user => {
                if( user.email === email ){
                    delete user.password
                    resolve( user )
                }
            })
        })
    }

    getUserById( id ){
        return new Promise( ( resolve ) => {
            this.users.forEach( user => {
                if( user.id === id ){
                    resolve( user )
                }
            })
        })
    }
}