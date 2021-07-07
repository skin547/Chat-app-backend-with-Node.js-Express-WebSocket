const User = require("../../../entites/user");
const UserRepository = require("./userRepository");

class MockUserRepository extends UserRepository {

    constructor(){
        super()
        this.currentId = 1
        this.users = {}
    }

    insert( name, email, password ){
        return new Promise( ( resolve ) => {
            let newUser = new User( this.currentId, name, email, password )
            this.users[ this.currentId ] = newUser
            this.currentId = this.currentId + 1
            resolve( newUser )
        })
    }

    getUserByEmail( email ){
        return new Promise( ( resolve, reject ) => {
            for (let id in this.users) {
                let user = this.users[id]
                if( user.email === email ){
                    resolve( user )
                }
            }
            reject( new Error( "user not found"))
        })
    }

    getUserById( id ){
        return new Promise( ( resolve ) => {
            if( this.users[id] ){
                resolve( this.users[id] )
            }else{
                reject(new Error( "user not found"))
            }
        })
    }
}

module.exports = new MockUserRepository()