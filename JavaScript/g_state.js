const user = require("../models/User");

const message_id = 1;
const user_id = 0;
const post_id = 1;
const admin = new user.User("Admin",0,"admin@admin.com","admin");
admin.token = 0;

const users = [];
const find_user_by_email = function(email) {
    return users.find(user => user.email_address === email);
}


function find_user_by_id(id) {

    return users.find(user => user.id === id);
}

const create_admin = function () {
    if(!users.find(user => user.name === 'admin'))
    {
        const admin = new users.User("Admin",0,"admin@admin.com","admin");
        admin.token = 0 ;
        admin.status = users.Status.active
        users.push(admin);
        console.log(users.User);
    }
    else
    {
        console.log("admin already exist");
    }
}



module.exports = { admin, find_user_by_email,  users, message_id, user_id, post_id, create_admin, find_user_by_id};





