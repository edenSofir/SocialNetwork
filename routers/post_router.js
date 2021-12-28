const g_state = require("../JavaScript/g_state");
const express = require('express');


const {
    post_post,
    get_all_posts,
    delete_current_post
} = require('../controllers/post_controller');

const post_router = express.Router();

post_router.route('/user')
    .post(post_post)
    .put(delete_current_post)
    .get(get_all_posts);


module.exports = post_router;