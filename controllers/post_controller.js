const post_services = require('../services/post_services');
const data_base = require('../JavaScript/data_base')
const g_state = require("../JavaScript/g_state");
const {save_data_to_file} = require("../JavaScript/data_base");
const status_codes = require("http-status-codes").StatusCodes;

async function post_post(req, res) {
    const {user_id, post_id} = req.params; //should be post id?
    const current_user_id = parseInt(user_id);
    const current_post_id = parseInt(post_id);

    if (current_post_id < 1) {
        res.status(status_codes.BAD_REQUEST);
        res.send("the current post is invalid - out of range");
        return;
    }

    if (current_user_id < 0) {
        res.status(status_codes.BAD_REQUEST);
        res.send("the current user is invalid - out of range");
        return;
    }

    post_services.publish_current_post(current_user_id, current_post_id)
    await data_base.save_data_to_file()
    res.send(JSON.stringify(current_post_id));
}

function get_all_posts(req, res) {
    const current_user_id = parseInt(req.params.id);

    if (current_user_id < 0) {
        res.status(status_codes.BAD_REQUEST);
        res.send("the current user is invalid - out of range");
        return;
    }

    post_services.get_all_posts_from_users();
    res.send(JSON.stringify(current_user_id));
}

async function delete_current_post(req, res) {
    const current_user_id = parseInt(req.params.user_id);
    const current_post_id = parseInt(req.params.post_id);

    if (current_post_id < 1) {
        res.status(status_codes.BAD_REQUEST);
        res.send("the current post is invalid - out of range");
        return;
    }

    if (current_user_id < 0) {
        res.status(status_codes.BAD_REQUEST);
        res.send("the current user is invalid - out of range");
        return;
    }
    post_services.delete_current_post(current_user_id, current_post_id);
    await data_base.save_data_to_file()
    res.send(JSON.stringify(current_post_id));
}

module.exports = {
    post_post,
    get_all_posts,
    delete_current_post
}
