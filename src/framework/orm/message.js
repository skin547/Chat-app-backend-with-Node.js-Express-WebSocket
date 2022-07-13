module.exports = ( sequelizeInstance, DataTypes ) => {
    const Message = sequelizeInstance.define('message', {
        id: {
          type: DataTypes.UUIDV4,
          allowNull: false,
          primaryKey: true
        },
        content: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        userId: {
          type: DataTypes.UUIDV4,
          allowNull: false,
        },
        roomId: {
          type: DataTypes.UUIDV4,
          allowNull: false,
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    }, { } )

    return Message
}