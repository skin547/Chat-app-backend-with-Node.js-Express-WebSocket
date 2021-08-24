const { Sequelize, DataTypes } = require("sequelize")
const config = require("../../../config").database

module.exports = class Database{
    constructor(){
        this.instance = new Sequelize( config.database, config.user, config.password, config.options )
        this.userModel = require("./user")( this.instance, DataTypes )
        this.roomModel = require("./room")( this.instance, DataTypes )
        this.roomUserModel = require("./room_user")( this.instance, DataTypes )
        this.messageModel = require("./message")( this.instance, DataTypes )

        this.userModel.belongsToMany( this.roomModel, {
            through: this.roomUserModel
        });

        this.roomModel.belongsToMany( this.userModel, {
            through: this.roomUserModel
        });

        this.roomModel.hasMany( this.messageModel, {
            foreignKey: "roomId"
        })

        this.messageModel.belongsTo( this.roomModel )

        this.userModel.hasMany( this.messageModel, {
            foreignKey: "userId"
        } )

        this.messageModel.belongsTo( this.userModel )
    }
}