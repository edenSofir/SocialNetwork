const admin_services = require('../services/admin_services');
const data_base = require('../JavaScript/data_base');
const g_state = require("../JavaScript/g_state");
const bcrypt = require("bcryptjs");
const user = require("../models/User");
const jwt = require("jsonwebtoken");
const status_codes = require("http-status-codes").StatusCodes;

function get_user(req, res) {

    const auth_header = req.headers["authorization"];
    const current_token = auth_header && auth_header.split(" ")[1];
    if (!current_token) {
        res.status(400).send("the token is invalid");
    }
    jwt.verify(current_token, data_base.secret_jwt, async (err, user_payload) => {
        if (err) {
            res.status(400).send("token is invalid, please try again later");
        } else {//token is OK!
            const user = g_state.find_user_by_id(user_payload.user_id);
            if (user.is_logon) {
                const id = req.body.id;
                const current_user_id = parseInt(id); //should we check if not an int?
                res.send(JSON.stringify(g_state.find_user_by_id(current_user_id)));
            }
        }
    });
}

async function create_new_user(req, res) {
    try {
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
        await data_base.save_data_to_file();
        res.status(201).send(JSON.stringify(new_user));
    }
    catch (err)
    {
        console.log(err);
    }
}

async function delete_current_user(req, res) {

    const auth_header = req.headers["authorization"];
    const current_token = auth_header && auth_header.split(" ")[1];
    if (!current_token) {
        res.status(400).send("the token is invalid");
    }
    jwt.verify(current_token, data_base.secret_jwt, async (err, user_payload) => {
        if (err) {
            res.status(400).send("token is invalid, please try again later");
        } else {//token is OK!
            const admin = g_state.find_user_by_id(user_payload.user_id);
            if (admin === data_base.users[0] && admin.is_logon) {
                const id = req.body.id;
                const current_user_id = parseInt(id); //should we check if not an int?
                const user = g_state.find_user_by_id(current_user_id);
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
        }
    });
}

async function restore_user(req, res) {

    const auth_header = req.headers["authorization"];
    const current_token = auth_header && auth_header.split(" ")[1];
    if (!current_token) {
        res.status(400).send("the token is invalid");
    }
    jwt.verify(current_token, data_base.secret_jwt, async (err, user_payload) => {
        if (err) {
            res.status(400).send("token is invalid, please try again later");
        } else {//token is OK!
            const admin = g_state.find_user_by_id(user_payload.user_id);
            if (admin === data_base.users[0] && admin.is_logon) {
                const id = req.body.id;
                const current_user_id = parseInt(id); //should we check if not an int?
                const user = g_state.find_user_by_id(current_user_id);
                if (!user) {
                    res.status(status_codes.NOT_FOUND);
                    res.send("there is no such user in our users array");
                } else if (user.id === 0) {
                    res.status(status_codes.FORBIDDEN);
                    res.send("the current id is the admin user - always active");
                } else {
                    admin_services.restore_suspend_user(user);
                    await data_base.save_data_to_file().then(r => console.log("saved data updated"));
                    res.send(JSON.stringify(data_base.users));
                }
            }
        }
    });
}

async function suspend_user(req, res) {

    const auth_header = req.headers["authorization"];
    const current_token = auth_header && auth_header.split(" ")[1];
    if (!current_token) {
        res.status(400).send("the token is invalid");
    }
    jwt.verify(current_token, data_base.secret_jwt, async (err, user_payload) => {
        if (err) {
            res.status(400).send("token is invalid, please try again later");
        } else {//token is OK!
            const admin = g_state.find_user_by_id(user_payload.user_id);
            if (admin === data_base.users[0] && admin.is_logon) {
                const id = req.body.id;
                const current_user_id = parseInt(id); //should we check if not an int?
                const user = g_state.find_user_by_id(current_user_id);
                if (!user) {
                    res.status(status_codes.NOT_FOUND);
                    res.send("there is no such user in our users array");
                } else if (user.id === 0) {
                    res.status(status_codes.FORBIDDEN);
                    res.send("the current id is the admin user - already active");
                } else {
                    admin_services.suspend_user(user);
                    await data_base.save_data_to_file().then(r => "saved data updated");
                    res.send(JSON.stringify(data_base.users)); //new array
                }
            }
        }
    });
}

async function approve_user(req, res) {

    const auth_header = req.headers["authorization"];
    const current_token = auth_header && auth_header.split(" ")[1];
    console.log(current_token)
    if (!current_token) {
        res.status(400).send("the token is invalid");
    }
    else {
        jwt.verify(current_token, data_base.secret_jwt, async (err, user_payload) => {
            if (err) {
                res.status(400).send("token is invalid, please try again later");
            } else {
                const admin = g_state.find_user_by_id(user_payload.user_id);
                if (admin === data_base.users[0] && admin.is_logon) {
                    const id = req.body.id;
                    const current_user_id = parseInt(id);
                    const user = g_state.find_user_by_id(current_user_id);
                    if (!user) {
                        res.status(status_codes.NOT_FOUND);
                        res.send("there is no such user in our users array");
                    } else if (user.id === 0) {
                        res.status(status_codes.FORBIDDEN);
                        res.send("the current id is the admin user - already active");
                    } else {
                        admin_services.approve_join_request(user) //should we check if he is already approved
                        await data_base.save_data_to_file();
                        res.status(status_codes.ACCEPTED);
                        res.send(JSON.stringify(data_base.users)); //new array
                    }

                }
            }
        });
    }
}

function get_all_users(req, res) {

    res.send(JSON.stringify(admin_services.get_all_users()));
    res.status(status_codes.ACCEPTED)
}

function send_message_to_all(req, res) {

    const auth_header = req.headers["authorization"];
    const current_token = auth_header && auth_header.split(" ")[1];
    if (!current_token) {
        res.status(400).send("the token is invalid");
    }
    jwt.verify(current_token, data_base.secret_jwt, async (err, user_payload) => {
        if (err) {
            res.status(400).send("token is invalid, please try again later");
        } else {//token is OK!
            const admin = g_state.find_user_by_id(user_payload.user_id);
            if (admin === data_base.users[0] && admin.is_logon) {
                const message = req.body.message;
                if (!message) {
                    res.send("Invalid message");
                    res.status(status_codes.BAD_REQUEST);
                    return;
                }
                admin_services.send_message_to_all_users(message);
                await data_base.save_data_to_file();
                res.send(JSON.stringify(data_base.users));
                res.status(status_codes.ACCEPTED);
            }
        }
    });
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


