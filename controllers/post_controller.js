const post_services = require('../services/post_services');
const g_state = require("../JavaScript/g_state");

function post_post(req, res) {
    const {user_id, post_id} = req.params; //should be post id?
    const current_user_id = parseInt(user_id);
    const current_post_id = parseInt(post_id);

    if (current_post_id < 1) {
        res.status(g_state.g_state.status_codes.BAD_REQUEST);
        res.send("the current post is invalid - out of range");
        return;
    }

    if (current_user_id < 0) {
        res.status(g_state.g_state.status_codes.BAD_REQUEST);
        res.send("the current user is invalid - out of range");
        return;
    }

    post_services.publish_current_post(current_user_id, current_post_id)
    res.send(JSON.stringify(current_post_id));
}

function get_all_posts(req, res) {
    const current_user_id = parseInt(req.params.id);

    if (current_user_id < 0) {
        res.status(g_state.g_state.status_codes.BAD_REQUEST);
        res.send("the current user is invalid - out of range");
        return;
    }

    post_services.get_all_posts_from_users();
    res.send(JSON.stringify(current_user_id));
}

function delete_current_post(req, res) {
    const current_user_id = parseInt(req.params.user_id);
    const current_post_id = parseInt(req.params.post_id);

    if (current_post_id < 1) {
        res.status(g_state.g_state.status_codes.BAD_REQUEST);
        res.send("the current post is invalid - out of range");
        return;
    }

    if (current_user_id < 0) {
        res.status(g_state.g_state.status_codes.BAD_REQUEST);
        res.send("the current user is invalid - out of range");
        return;
    }

    post_services.delete_current_post(current_user_id, current_post_id);
    res.send(JSON.stringify(current_post_id));
}
module.exports = {
    post_post,
    get_all_posts,
    delete_current_post
}
