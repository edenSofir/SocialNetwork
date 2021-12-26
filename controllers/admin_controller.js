const admin_services = require('../services/admin_services');
const data_base = require('./JavaScript/data_base');
const {g_state} = require("../JavaScript/g_state");

function find_user_by_token(token) {

    g_state.users.forEach((user => {
        if(user.token === token)
            return user;
    }));

    return null;
}

function get_user(req, res) {
    const token = parseInt(req.headers.token);
    const user = find_user_by_token(token);
    if (!user) {
        res.status(g_state.status_codes.BAD_REQUEST);
        res.send("the current token isn't valid");
        return;
    }
    res.send(JSON.stringify(user));
}

/*function create_new_user(req, res) {

    const full_name = req.body.full_name;
    if (!full_name) {
        res.status(g_state.status_codes.BAD_REQUEST);
        res.send("No name specified in the current request");
        return;
    }
    const id = g_state.user_id += 1;
    const email = req.body.email_address;
    if (!email) {
        res.status(g_state.status_codes.BAD_REQUEST);
        res.send("No email specified in the current request");
        return;
    }
    const password = req.body.password;
    if (!password) {
        res.status(g_state.status_codes.BAD_REQUEST);
        res.send("No password specified in the current request");
        return;
    }

    const new_user = new g_state.User(full_name, id, email, password);
    g_state.users.push(new_user);
    res.send(JSON.stringify(new_user));
}*/

function delete_current_user(req, res) {
    const token = parseInt(req.headers.token);
    const user = find_user_by_token(token);
    if (!user) {
        res.status(g_state.status_codes.NOT_FOUND);
        res.send("there is no such user in our users array");
        return;
    }
    if (user.id === 1) {
        res.status(g_state.status_codes.FORBIDDEN);
        res.send("the current id is the admin user - he can not be deleted");
        return;
    }
    admin_services.delete_user(user);//admin deletes the user
    data_base.save_data_to_file().then(r => console.log("saved data updated"));
    res.send(JSON.stringify(g_state.users)); //new array
}

function restore_user(req, res) {
    const token = parseInt(req.headers.token);
    const user = find_user_by_token(token);
    if (!user) {
        res.status(g_state.status_codes.NOT_FOUND);
        res.send("there is no such user in our users array");
        return;
    }
    if (user.id === 1) {
        res.status(g_state.status_codes.FORBIDDEN);
        res.send("the current id is the admin user - allways active");
        return;
    }

    admin_services.restore_suspend_user(user);
    data_base.save_data_to_file().then(r => console.log("saved data updated"));
    res.send(JSON.stringify(g_state.users)); //new array
}

function suspend_user(req, res) {
    const token = parseInt(req.headers.token);
    const user = find_user_by_token(token);
    if (!user) {
        res.status(g_state.status_codes.NOT_FOUND);
        res.send("there is no such user in our users array");
        return;
    }
    if (user.id === 1) {
        res.status(g_state.status_codes.FORBIDDEN);
        res.send("the current id is the admin user - already active");
        return;
    }
    admin_services.suspend_user(user);
    data_base.save_data_to_file().then(r => "saved data updated");
    res.send(JSON.stringify(g_state.users)); //new array
}

function approve_user(req, res) {
    const current_id = parseInt(req.params.id);
    if (current_id < 0) {
        res.status(g_state.status_codes.BAD_REQUEST);
        res.send("the current id is out of range");
        return;
    }
    if (current_id === 1) {
        res.status(g_state.status_codes.FORBIDDEN);
        res.send("the current id is the admin user - already active");
        return;
    }
    const idx_in_arr = g_state.users.findIndex(user => user.id === current_id);
    if (idx_in_arr < 0) {
        res.status(g_state.status_codes.NOT_FOUND);
        res.send("there is no such user in our users array");
        return;
    }
    admin_services.approve_join_request(g_state.users[idx_in_arr]);
    data_base.save_data_to_file().then(r => console.log("saved data updated"));
    res.send(JSON.stringify(g_state.users)); //new array
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


