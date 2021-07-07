module.exports = class Message {
    constructor(id, content, userId, roomId ) {
        this.id = id
        this.content = content
        this.userId = userId
        this.roomId = roomId
        this.createdAt = new Date()
    }
};