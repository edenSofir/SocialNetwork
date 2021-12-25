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

const admin_router = express.Router();

admin_router.get('/user/(:id)', get_user);
admin_router.post('/users', create_new_user);
admin_router.put('/user/(:id)',delete_current_user);
admin_router.put('/user/(:id)', restore_user);
admin_router.put('/user/(:id)', suspend_user);
admin_router.put('/user/(:id)', approve_user);
admin_router.get('/users', get_all_users);

module.exports = admin_router;