const admin_services = require('../services/admin_services');
const g_state = require("../JavaScript/g_state");


function get_user(req, res) {
    const current_id = parseInt(req.params.id);

    if (current_id < 0) {
        res.status(g_state.g_state.status_codes.BAD_REQUEST);
        res.send("the current id isn't valid");
        return;
    }

    const current_user = g_state.g_state.find_user_by_id(current_id);

    if (!current_user) {
        res.status(g_state.g_state.status_codes.NOT_FOUND);
        res.send("there is no such user in our users");
        return;
    }

    res.send(JSON.stringify(current_user));
}

function create_new_user(req, res) {

    const full_name = req.body.full_name;
    if (!full_name) {
        res.status(g_state.g_state.status_codes.BAD_REQUEST);
        res.send("No name specified in the current request");
        return;
    }
    const id = g_state.user_id += 1;
    const email = req.body.email_address;
    if (!email) {
        res.status(g_state.g_state.status_codes.BAD_REQUEST);
        res.send("No email specified in the current request");
        return;
    }
    const password = req.body.password;
    if (!password) {
        res.status(g_state.g_state.status_codes.BAD_REQUEST);
        res.send("No password specified in the current request");
        return;
    }

    const new_user = new g_state.g_state.User(full_name, id, email, password);
    g_state.g_state.users.push(new_user);
    res.send(JSON.stringify(new_user));
}

function delete_current_user(req, res) {
    const current_id = parseInt(req.params.id);
    if (current_id < 0) {
        res.status(g_state.g_state.status_codes.BAD_REQUEST);
        res.send("the current id is out of range")
        return;
    }
    if (current_id === 1) {
        res.status(g_state.g_state.status_codes.FORBIDDEN);
        res.send("the current id is the admin user - he can not be deleted");
        return;
    }
    const idx_in_arr = g_state.g_state.users.findIndex(user => user.id === current_id)
    if (idx_in_arr < 0) {
        res.status(g_state.g_state.status_codes.NOT_FOUND);
        res.send("there is no such user in our users array");
        return;
    }
    admin_services.delete_user(g_state.g_state.users[idx_in_arr]);//admin deletes the user

    res.send(JSON.stringify(g_state.g_state.users)); //new array
}

function restore_user(req, res) {
    const current_id = parseInt(req.params.id);
    if (current_id < 0) {
        res.status(g_state.g_state.status_codes.BAD_REQUEST);
        res.send("the current id is out of range");
        return;
    }
    if (current_id === 1) {
        res.status(g_state.g_state.status_codes.FORBIDDEN);
        res.send("the current id is the admin user - already active");
        return;
    }
    const idx_in_arr = g_state.g_state.users.findIndex(user => user.id === current_id);
    if (idx_in_arr < 0) {
        res.status(g_state.g_state.status_codes.NOT_FOUND);
        res.send("there is no such user in our users array");
        return;
    }
    admin_services.restore_suspend_user(g_state.g_state.users[idx_in_arr]);
    res.send(JSON.stringify(g_state.g_state.users)); //new array
}

function suspend_user(req, res) {
    const current_id = parseInt(req.params.id);
    if (current_id < 0) {
        res.status(g_state.g_state.status_codes.BAD_REQUEST);
        res.send("the current id is out of range");
        return;
    }
    if (current_id === 1) {
        res.status(g_state.g_state.status_codes.FORBIDDEN);
        res.send("the current id is the admin user - already active");
        return;
    }
    const idx_in_arr = g_state.g_state.users.findIndex(user => user.id === current_id);
    if (idx_in_arr < 0) {
        res.status(g_state.g_state.status_codes.NOT_FOUND);
        res.send("there is no such user in our users array");
        return;
    }
    admin_services.suspend_user(g_state.g_state.users[idx_in_arr]);
    res.send(JSON.stringify(g_state.g_state.users)); //new array
}

function approve_user(req, res) {
    const current_id = parseInt(req.params.id);
    if (current_id < 0) {
        res.status(g_state.g_state.status_codes.BAD_REQUEST);
        res.send("the current id is out of range");
        return;
    }
    if (current_id === 1) {
        res.status(g_state.g_state.status_codes.FORBIDDEN);
        res.send("the current id is the admin user - already active");
        return;
    }
    const idx_in_arr = g_state.g_state.users.findIndex(user => user.id === current_id);
    if (idx_in_arr < 0) {
        res.status(g_state.g_state.status_codes.NOT_FOUND);
        res.send("there is no such user in our users array");
        return;
    }
    admin_services.approve_join_request(g_state.g_state.users[idx_in_arr]);
    res.send(JSON.stringify(g_state.g_state.users)); //new array
}

function get_all_users(req, res) {

    res.send(JSON.stringify(admin_services.get_all_users()));
}

module.exports = {
    get_user,
    create_new_user,
    delete_current_user,
    restore_user,
    suspend_user,
    approve_user,
    get_all_users
}


