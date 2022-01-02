const post_services = require('../services/post_services');
const data_base = require('../JavaScript/data_base')
const g_state = require("../JavaScript/g_state");
const jwt = require("jsonwebtoken");
const status_codes = require("http-status-codes").StatusCodes;
const id_data = require('../JavaScript/id_data');

async function post_post(req, res) {
    const post_text = req.body.text; //should be post id?
    if (!post_text) {
        res.status(status_codes.BAD_REQUEST);
        res.send("No text to post");
        return;
    }

    const auth_header = req.headers["authorization"];
    const current_token = auth_header && auth_header.split(" ")[1];
    if (!current_token) {
        res.status(400).send("the token is invalid");
    }
    jwt.verify(current_token, data_base.secret_jwt, async (err, user_payload) => {
        if (err) {
            res.status(400).send("token is invalid, please try again later");
        } else {//token is OK!
            const user = g_state.find_user_by_id(user_payload.user_id);
            if (user.is_logon) {
                const post = post_services.publish_current_post(user, post_text)
                await data_base.save_data_to_file()
                res.status(status_codes.ACCEPTED).send(JSON.stringify(post));
            }
            else {
                res.status(status_codes.FORBIDDEN);
                res.send("You need to login first :)");
            }
        }
    });
}

function get_all_posts(req, res) {

    const auth_header = req.headers["authorization"];
    const current_token = auth_header && auth_header.split(" ")[1];
    if (!current_token) {
        res.status(400).send("the token is invalid");
    }
    jwt.verify(current_token, data_base.secret_jwt, async (err, user_payload) => {
        if (err) {
            res.status(400).send("token is invalid, please try again later");
        } else {//token is OK!
            const user = g_state.find_user_by_id(user_payload.user_id);
            if (user.is_logon) {
                const all_posts = post_services.get_all_posts_from_users();
                res.send(JSON.stringify(all_posts));
            }
            else {
                res.status(status_codes.FORBIDDEN);
                res.send("You need to login first :)");
            }
        }
    });
}

async function delete_current_post(req, res) {
    const post_id = parseInt(req.body.id);

    if (post_id < 1 || post_id > id_data.post_id) {
        res.status(status_codes.BAD_REQUEST);
        res.send("the current post is invalid - out of range");
        return;
    }

    const auth_header = req.headers["authorization"];
    const current_token = auth_header && auth_header.split(" ")[1];
    if (!current_token) {
        res.status(400).send("the token is invalid");
    }
    jwt.verify(current_token, data_base.secret_jwt, async (err, user_payload) => {
        if (err) {
            res.status(400).send("token is invalid, please try again later");
        } else {//token is OK!
            const user = g_state.find_user_by_id(user_payload.user_id);
            if (user.is_logon) {
                const post = post_services.delete_current_post(user, post_id);
                if (!post) {
                    res.status(status_codes.BAD_REQUEST);
                    res.send("You don't have post with this id");
                    return;
                }
                await data_base.save_data_to_file()
                res.status(status_codes.ACCEPTED).send(JSON.stringify(id_data.users));
            } else {
                res.status(status_codes.FORBIDDEN);
                res.send("You need to login first :)");
            }
        }
    });

}

module.exports = {
    post_post,
    get_all_posts,
    delete_current_post
}
