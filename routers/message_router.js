const express = require('express');
const {
    send_a_message,
    get_all_messages
} = require('../controllers/message_controller');


const message_router = express.Router();

message_router.route('/user')
    .put(send_a_message)
    .get(get_all_messages)

module.exports = message_router;