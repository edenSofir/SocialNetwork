const {send_a_message} = require('../controllers/message_controller');
const express = require('express');
const {get_user} = require("../controllers/admin_controller");

const message_router = express.Router();

message_router.route('/user')
    .put(send_a_message)

module.exports = message_router;