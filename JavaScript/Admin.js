g_state.admin = new User("Admin",0,"admin@admin.com","admin");
g_state.admin.status = Status.active;


g_state.admin.approve_join_request = function(current_user) {

    g_state.users.forEach((user, index) => {
       if(user.email_address === current_user.email_address)
           return false;
    });
    current_user.status = Status.active;
    g_state.users.push(current_user);
    return true;
}

g_state.admin.suspend_user = function(current_user) {

    current_user.status = Status.suspended;
}

g_state.admin.delete_user = function(current_user) {

    current_user.status = Status.deleted;
    g_state.users.forEach((user, index) => {
        if(user.id === current_user.id)
        {
            g_state.users.splice(index, 1);
            return;
        }
    });
}

g_state.admin.restore_suspend_user = function(current_user) {

    current_user.status = Status.active;
}

g_state.admin.delete_a_post_from_user = function(current_user, post_id) {

    current_user.posts.forEach((post, index) => {
            if(post.id === post_id)
            {
                current_user.posts.slice(index, 1);
                return;
            }
        });
}

g_state.admin.send_message_to_all_users = function(message_to_send) {

    const message = new Message(message_to_send, g_state.message_id, Date.now(), admin);
    g_state.message_id += 1;

    g_state.users.forEach((user) => {
        user.messages.push(message);
    });
}

g_state.admin.list_all_users = function() {

    return JSON.stringify( g_state.users);
}

