const user_services = require('../services/user_service');
const g_state = require("../JavaScript/g_state");
const status_codes = require("http-status-codes").StatusCodes;

function delete_user_account(req, res) {
    const current_id = parseInt(req.params.id);
    if (current_id < 0) {
        res.status(status_codes.BAD_REQUEST);
        res.send("the current id is out of range")
        return;
    }
    if (current_id === 0) {
        res.status(status_codes.FORBIDDEN);
        res.send("the current id is the admin user - he can not be deleted");
        return;
    }
    const user = g_state.find_user_by_id(current_id);
    if (user) {
        res.status(status_codes.NOT_FOUND);
        res.send("there is no such user in our users array");
        return;
    }
    user_services.delete_user_account(user);

    res.send(JSON.stringify(g_state.users));
}


module.exports = {
    delete_user_account
}