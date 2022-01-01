const id_data = require('../JavaScript/id_data');

function find_user_by_email(email) {
    const user = id_data.users.find(user => user.email_address === email);
    return user;
}

function find_user_by_id(id) {

    return id_data.users.find(user => user.id === id);
}

module.exports = {
    find_user_by_email,
    find_user_by_id,
}




