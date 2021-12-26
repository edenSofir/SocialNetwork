const {g_state} = require("../JavaScript/g_state");

const {
    post_post,
    get_all_posts,
    delete_current_post
} = require('../controllers/post_controller');

const post_router = g_state.express.Router();

post_router.post('/user/(:id)', post_post);
post_router.get('/users', get_all_posts);
post_router.put('/user/(:id)', delete_current_post);

module.exports = post_router;