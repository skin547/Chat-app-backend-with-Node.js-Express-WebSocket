const { Sequelize, DataTypes } = require("sequelize")
const config = require("../../../config").database

const sequelize = new Sequelize( config.database, config.user, config.password, config.options )

const userModel = require("./user.js")( sequelize, DataTypes )
const roomModel = require("./room")( sequelize, DataTypes )
const roomUserModel = require("./room_user")( sequelize, DataTypes )

userModel.belongsToMany(roomModel, {
    through: roomUserModel
});

roomModel.belongsToMany(userModel, {
    through: roomUserModel
});

module.exports = {
    database: sequelize,
    userModel : userModel,
    roomModel : roomModel,
}