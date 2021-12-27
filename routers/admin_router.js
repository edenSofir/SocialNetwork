const express = require('express');
const {
    get_user,
    create_new_user,
    delete_current_user,
    restore_user,
    suspend_user,
    approve_user,
    get_all_users
} = require('../controllers/admin_controller');

const router = express.Router();

router.route('/get_user')
    .get(get_user)
    .delete(delete_current_user)
    .put(restore_user);

router.route('/user/approve')
    .post(approve_user);

router.route('/user')
    .post(create_new_user)
    .get(get_all_users);

router.route('/user/suspend')
    .put(suspend_user);

router.route('/user/message')
    .post(create_new_user)


module.exports = router;