const user = require("../models/User");

const admin = new user.User("Admin",0,"admin@admin.com","admin");
admin.token = 0;

const users = [];
const find_user_by_email = function(email) {
    return users.find(user => user.email_address === email);
}

const message_id = 1;
const user_id = 0;
const post_id = 1;


module.exports = { admin, find_user_by_email,  users, message_id, user_id, post_id};


