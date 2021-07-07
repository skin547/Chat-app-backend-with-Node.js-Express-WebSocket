module.exports = class MockClientRepository {

    constructor(){
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