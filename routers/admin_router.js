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

router.route('/user/(:id)')
    .get(get_user)
    .delete(delete_current_user)
    .put(restore_user);

router.route('/user/approve/(:id)')
    .post(approve_user);

router.route('/user')
    .post(create_new_user)
    .get(get_all_users);

router.route('/user/suspend/(:id)')
    .put(suspend_user);


module.exports = router;