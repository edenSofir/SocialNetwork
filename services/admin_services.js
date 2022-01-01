const users = require("../models/User");
const {admin: admin} = require("../models/admin").admin;
const messages = require('../models/Messages');
const id_data = require('../JavaScript/id_data');

approve_join_request = function (current_user) {
    current_user.status = users.Status.active;
}

suspend_user = function (current_user) {

    current_user.status = users.Status.suspended;
    current_user.is_logon = false;
}

delete_user = function (current_user) {
    const index = id_data.users.indexOf(current_user);
    id_data.users.splice(index, 1);

}

restore_suspend_user = function (current_user) {

    current_user.status = users.Status.active;
}

delete_a_post_from_user = function (current_user, post_id) {

    current_user.posts.forEach((post, index) => {
        if (post.id === post_id) {
            current_user.posts.slice(index, 1);
        }
    });
}

send_message_to_all_users = function (message_to_send) {

    const message = new messages.Message(message_to_send, id_data.message_id, Date.now());
    id_data.message_id += 1;
    id_data.users.forEach((user) => {
        if(user.id !== 0) {
            user.messages.push(message);
        }
    });
}

get_all_users = function () {
    return id_data.users;
}

module.exports = {
    approve_join_request,
    delete_user ,
    suspend_user,
    restore_suspend_user ,
    delete_a_post_from_user ,
    send_message_to_all_users ,
    get_all_users }

