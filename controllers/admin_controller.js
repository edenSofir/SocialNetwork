const admin_services = require('../services/admin_services');
const data_base = require('../JavaScript/data_base');
const g_state = require("../JavaScript/g_state");
const bcrypt = require("bcryptjs");
const user = require("../models/User");
const jwt = require("jsonwebtoken");
const status_codes = require("http-status-codes").StatusCodes;

function get_user(req, res) {
    const token = req.headers.token;
    const current_user = g_state.find_user_by_token(token);
    if (!current_user) {
        res.status(status_codes.BAD_REQUEST);
        res.send("the current token isn't valid");
        return;
    }
    res.send(JSON.stringify(current_user));
}

async function create_new_user(req, res) {
    try {
        console.log("at start of create_new_user",data_base.users, "end")
        const {full_name, email, password} = req.body;
        if (!(password && email && full_name)) {
            res.status(400).send("all input required. please try again");
            return;
        }
        const is_user_exist = g_state.find_user_by_email(email);
        if (is_user_exist) {
            res.status(409).send("user is already exist. please preform login");
            return;
        }

        const encrypted_password = await bcrypt.hash(password, 10);
        const id = data_base.user_id += 1;
        const new_user = await new user.User(full_name, id, email.toLowerCase(), encrypted_password);
        data_base.users.push(new_user);
        data_base.save_data_to_file().then(r => console.log("saved data updated"));
        res.status(201).send(JSON.stringify(new_user));
    }
    catch (err)
    {
        console.log(err);
    }
}

async function delete_current_user(req, res) {
    const token = req.headers.token;
    const user = g_state.find_user_by_token(token);
    if (!user) {
        res.status(status_codes.NOT_FOUND);
        res.send("there is no such user in our users array");
        return;
    }
    if (user.id === 0) {
        res.status(status_codes.FORBIDDEN);
        res.send("the current id is the admin user - he can not be deleted");
        return;
    }
    admin_services.delete_user(user);//admin deletes the user
    await data_base.save_data_to_file();
    res.send(JSON.stringify(data_base.users)); //new array
}

async function restore_user(req, res) {
    const token = req.headers.token;
    const user = g_state.find_user_by_token(token);
    console.log("before restore: ", user);
    if (!user) {
        res.status(status_codes.NOT_FOUND);
        res.send("there is no such user in our users array");
        return;
    }
    if (user.id === 0) {
        res.status(status_codes.FORBIDDEN);
        res.send("the current id is the admin user - always active");
        return;
    }

    admin_services.restore_suspend_user(user);
    console.log("after restore: ", user);
    await data_base.save_data_to_file().then(r => console.log("saved data updated"));
    res.send(JSON.stringify(data_base.users)); //new array
}

async function suspend_user(req, res) {
    const token = req.headers.token;
    const user = g_state.find_user_by_token(token);
    if (!user) {
        res.status(status_codes.NOT_FOUND);
        res.send("there is no such user in our users array");
        return;
    }
    if (user.id === 0) {
        res.status(status_codes.FORBIDDEN);
        res.send("the current id is the admin user - already active");
        return;
    }
    admin_services.suspend_user(user);
    await data_base.save_data_to_file().then(r => "saved data updated");
    res.send(JSON.stringify(data_base.users)); //new array
}

async function approve_user(req, res) {
    const id = parseInt(req.headers.id);
    const user = g_state.find_user_by_id(id);
    if (!user) {
        res.status(status_codes.NOT_FOUND);
        res.send("there is no such user in our users array");
        return;
    }
    if (user.id === 0) {
        res.status(status_codes.FORBIDDEN);
        res.send("the current id is the admin user - already active");
        return;
    }
    if(admin_services.approve_join_request(user)) {
        await data_base.save_data_to_file();
        res.status(status_codes.ACCEPTED);
        res.send(JSON.stringify(data_base.users)); //new array
    }
    else {
        res.send("invalid email - email already exists. please login");
        res.status(status_codes.FORBIDDEN);
    }

}

function get_all_users(req, res) {

    res.send(JSON.stringify(admin_services.get_all_users()));
    res.status(status_codes.ACCEPTED)
}

function send_message_to_all(req, res) {

    const message = req.body.message;
    if(!message){
        res.send("Invalid message");
        res.status(status_codes.BAD_REQUEST);
        return;
    }

    admin_services.send_message_to_all_users(message);
    res.send(JSON.stringify(data_base.users));
    res.status(status_codes.ACCEPTED);
}

module.exports = {
    get_user,
    create_new_user,
    delete_current_user,
    restore_user,
    suspend_user,
    approve_user,
    get_all_users,
    send_message_to_all
}


