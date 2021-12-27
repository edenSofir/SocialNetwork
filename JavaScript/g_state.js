const {StatusCodes: status_codes} = require("http-status-codes");

let message_id = 1;
let user_id = 0;
let post_id = 1;
const users = [];

const find_user_by_email = function(email) {
    console.log(users)
    const user = users.find(user => user.email_address === email);
    console.log(user)
    return user;
}

function find_user_by_id(id) {

    return users.find(user => user.id === id);
}

function find_user_by_token(token) {

    return users.find(user => user.token === token);
}

module.exports = {
    find_user_by_email,
    users,
    message_id,
    user_id,
    post_id,
    find_user_by_id,
    find_user_by_token
}




