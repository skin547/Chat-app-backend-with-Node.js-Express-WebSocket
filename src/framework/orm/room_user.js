module.exports = ( sequelizeInstance, DataTypes ) => {
    const RoomUserModel = sequelizeInstance.define('room_user', {
        userId: {
          type: DataTypes.UUIDV4,
          allowNull: false,
        },
        roomId: {
          type: DataTypes.UUIDV4,
          allowNull: false,
        },
    }, { freezeTableName: true, timestamps: false } )

    return RoomUserModel
}