const { Sequelize, DataTypes } = require("sequelize")
const config = require("../../../config").database

module.exports = class Database{
    constructor(){
        this.instance = new Sequelize( config.database, config.user, config.password, config.options )
        this.userModel = require("./user")( this.instance, DataTypes )
        this.roomModel = require("./room")( this.instance, DataTypes )
        this.roomUserModel = require("./room_user")( this.instance, DataTypes )

        this.userModel.belongsToMany( this.roomModel, {
            through: this.roomUserModel
        });

        this.roomModel.belongsToMany( this.userModel, {
            through: this.roomUserModel
        });
    }
}