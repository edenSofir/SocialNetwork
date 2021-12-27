const g_state = require("../JavaScript/g_state");
const users = require("../models/User");
const {admin: admin} = require("../models/admin").admin;
const messages = require('../models/Messages');

approve_join_request = function (current_user) {

    g_state.users.forEach((user, index) => {
        if (user.email_address === current_user.email_address)
            return false;
    });
    current_user.status = users.Status.active;
    return true;
}

suspend_user = function (current_user) {

    current_user.status = users.Status.suspended;
}

delete_user = function (current_user) {

    g_state.users.forEach((user, index) => {
        if (user.id === current_user.id) {
            g_state.users.splice(index, 1);
        }
    });
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

    const message = new messages.Message(message_to_send, g_state.message_id, Date.now(), admin);
    g_state.message_id += 1;

    g_state.users.forEach((user) => {
        user.messages.push(message);
    });
}

get_all_users = function () {
    console.log("sowed: ", g_state.users);
    return g_state.users;
}

module.exports = {
    approve_join_request,
    delete_user ,
    suspend_user,
    restore_suspend_user ,
    delete_a_post_from_user ,
    send_message_to_all_users ,
    get_all_users }

