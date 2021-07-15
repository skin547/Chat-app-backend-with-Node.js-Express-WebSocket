const ClientRepository = require("./clientRepository")

class MockClientRepository extends ClientRepository{

    constructor(){
        super()
        this.clients = {}
    }

    insert( userId, connection ){
        return new Promise( (resolve) => {
            this.clients[userId] = connection
            resolve( connection )
        })
    }

    getConnection( userId ){
        return new Promise( ( resolve, reject ) => {
            if( this.clients[userId] ){
                resolve( this.clients[ userId ] )
            }else{
                reject( new Error( "user not connecting") )
            }
        })
    }
}

module.exports = new MockClientRepository()