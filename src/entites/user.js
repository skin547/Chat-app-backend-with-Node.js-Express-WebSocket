module.exports = class User {
    constructor(id, name, email, password) {
        this.id = id
        this.name = name
        this.email = email
        this.password = password
        this.createdAt = new Date()
    }

    login( password ) {
        return this.password === password
    }

};