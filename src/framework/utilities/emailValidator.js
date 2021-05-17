
module.exports = function validate( email ){
    let email_expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{2,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/
    let regex = new RegExp(email_expression)
    console.log('validating url:' + email)
    return regex.test(email)
}