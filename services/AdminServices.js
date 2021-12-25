admin.approve_join_request = function(current_user) {

    current_user.status = Status.active;
    g_state.users.push(current_user);
}

g_state.admin.suspend_user = function(current_user) {

    current_user.status = Status.suspended;
}

admin.delete_user = function(current_user) {

    current_user.status = Status.deleted;
    //TODO: does it needs to be deleted from g_state.users? if stays need to add if in all the methods
}

admin.restore_suspend_user = function(current_user) {

    current_user.status = Status.active;
}

admin.delete_a_post_from_user = function(current_user, post_id) {

    current_user.posts.forEach((post, index) => {
        if(post.id === post_id)
        {
            current_user.posts.slice(index, 1);
            return;
        }
    });
}

admin.send_message_to_all_users = function(message_to_send) {

    const message = new Message(message_to_send, g_state.message_id, Date.now(), admin);
    g_state.message_id += 1;

    g_state.users.forEach((user) => {
        user.messages.push(message);
    });
}