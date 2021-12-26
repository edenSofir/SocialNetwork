const {g_state} = require("../JavaScript/g_state");
const {send_a_message} = require('../controllers/message_controller');

const message_router = g_state.express.Router();

message_router.get('/user/(:id)', send_a_message);

module.exports = message_router;