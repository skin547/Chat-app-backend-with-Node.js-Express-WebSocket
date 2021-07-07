const AddUserUseCase = require("../useCases/user/addUser")
const GetUserUseCase = require("../useCases/user/getUser")
const AuthenticationUseCase = require("../useCases/user/authentication")
const AddRoomUseCase = require("../useCases/room/addRoom")
const GetRoomUseCase = require("../useCases/room/getRoom")
const ChangeRoomUseCase = require("../useCases/room/changeRoom")


module.exports = (roomRepo) => {

    // const getUser = new GetUserUseCase( userRepo )
    // const addUser = new AddUserUseCase( userRepo )
    // const authentication = new AuthenticationUseCase( userRepo )
    const getRoom = new GetRoomUseCase( roomRepo )
    const addRoom = new AddRoomUseCase( roomRepo )

    const getAll = ( request, response, next ) => {
        const token = request.header('Authorization').replace('Bearer ', '')
        getRoom.getAllByUserId( token.id )
        .then( res => response.json( res ) )
        .catch( error => next( error ) )
    }

    const createRoom = ( request, response, next ) => {
        const body = request.body
        const token = request.header('Authorization').replace('Bearer ', '')
        addRoom.execute( body.users, token.name )
        .then( res => response.status(201).json( res ) )
        .catch( error => next( error ) )
    }

    const getById = ( request, response, next ) => {
        const roomId = request.params.roomId
        getRoom.byId( roomId )
        .then( res => response.json( res ) )
        .catch( error => next( error ) )
    }

    return {
        getAll,
        createRoom,
        getById
    }
}