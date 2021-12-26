const {g_state} = require("../JavaScript/g_state");

const {
    post_post,
    get_all_posts,
    delete_current_post
} = require('../controllers/post_controller');

const post_router = g_state.express.Router();

post_router.route('/user/(:id)')
    .post(post_post)
    .put(delete_current_post)

post_router.route('/users')
    .get(get_all_posts);

module.exports = post_router;