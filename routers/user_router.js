const express = require('express');
const{
    delete_user_account,
    login_user,
    logoff_user
} = require('../controllers/user_controller');

const user_router = express.Router();

user_router.route('/delete').delete(delete_user_account);
user_router.route('/login').post(login_user)
user_router.route('/logoff').put(logoff_user)

module.exports = user_router;