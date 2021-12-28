const data_base = require('../JavaScript/data_base')

function find_user_by_email(email) {
    console.log(data_base.users)
    const user = data_base.users.find(user => user.email_address === email);
    console.log("current user: ",user)
    return user;
}

function find_user_by_id(id) {

    return data_base.users.find(user => user.id === id);
}

function find_user_by_token(token) {
    console.log("input:",token)
    console.log("all users for now to search in by token",data_base.users)
    return data_base.users.find(user => user.token === token);
}

module.exports = {
    find_user_by_email,
    find_user_by_id,
    find_user_by_token
}




