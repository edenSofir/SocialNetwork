const express = require('express');
const {
    get_user,
    create_new_user,
    delete_current_user,
    restore_user,
    suspend_user,
    approve_user,
    get_all_users,
    send_message_to_all
} = require('../controllers/admin_controller');

const router = express.Router();

router.route('/get_user')
    .get(get_user)
    .delete(delete_current_user)
    .put(restore_user);

router.route('/approve')
    .put(approve_user);

router.route('/user')
    .post(create_new_user)
    .get(get_all_users);

router.route('/user/suspend')
    .put(suspend_user);

router.route('/user/message')
    .post(send_message_to_all)


module.exports = router;