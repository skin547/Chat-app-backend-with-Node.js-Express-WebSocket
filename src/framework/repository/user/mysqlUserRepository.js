const { v4: uuidv4 } = require("uuid")
const User = require("../../../entites/user")
const UserRepository = require("./userRepository")
const sequelize = require("../../orm/sequelize.js")

class MySqlUserRepository extends UserRepository {

    constructor(){
        super()
        this.database = sequelize.database
        this.userModel = sequelize.userModel
    }

    insert( name, email, password ){
        return new Promise( async ( resolve ) => {
            let newUser = new User( uuidv4(), name, email, password )
            await this.userModel.create(newUser)
            resolve( newUser )
        })
    }

    getAll(){
        return new Promise( async ( resolve ) => {
            let result = await this.userModel.findAll({})
            let users = result.map( item => item.dataValues )
            resolve( users )
        })
    }

    getUserByEmail( email ){
        return new Promise( async ( resolve, reject ) => {
            let result = await this.userModel.findOne( {
                where:{ email: email }
            })
            if( !result ) return reject( { error : "user not found" } )
            let user = result.dataValues
            let userInstance = new User( user.id, user.name, user.email, user.password )
            resolve( userInstance )
        })
    }

    getUserById( id ){
        return new Promise( async ( resolve, reject ) => {
            let result = await this.userModel.findOne( { where:{ id: id } })
            if( result === null ) return resolve( {} )
            let user = result.dataValues
            let userInstance = new User( user.id, user.name, user.email, user.password )
            resolve( userInstance )
        })
    }

    removeUserById( id ){
        return new Promise( ( resolve, reject ) => {
            this.userModel.destroy( {
                where:{ id: id }
            })
            .then( res => resolve( { result:"remove success" } ) )
            .catch( error => reject(error) )
        })
    }

    removeUserByName( name ){
        return new Promise( ( resolve, reject ) => {
            this.userModel.destroy( {
                where:{ name: name }
            })
            .then( res => resolve( { result:"remove success" } ) )
            .catch( error => reject(error) )
        })
    }
}

module.exports = new MySqlUserRepository()