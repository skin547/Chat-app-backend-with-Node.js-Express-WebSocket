module.exports = ( sequelizeInstance, DataTypes ) => {
    const Room = sequelizeInstance.define('room', {
        id: {
          type: DataTypes.UUIDV4,
          allowNull: false,
          primaryKey: true
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    }, { } )

    return Room
}