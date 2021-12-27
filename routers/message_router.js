const {send_a_message} = require('../controllers/message_controller');
const express = require('express');

const message_router = express.Router();

message_router.get('/user/(:id)', send_a_message);

module.exports = message_router;