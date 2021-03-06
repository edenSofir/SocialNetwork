const admin_services = require('../services/admin_services');
const data_base = require('../JavaScript/data_base');
const g_state = require("../JavaScript/g_state");
const bcrypt = require("bcryptjs");
const user = require("../models/User");
const jwt = require("jsonwebtoken");
const status_codes = require("http-status-codes").StatusCodes;
const id_data = require('../JavaScript/id_data');

function get_user(req, res) {

    const current_token = req.headers["authorization"];
    if (!current_token) {
        res.status(400).send("the token is invalid");
    }
    jwt.verify(current_token, data_base.secret_jwt, async (err, user_payload) => {
        if (err) {
            res.status(400).send("token is invalid, please try again later");
            return;
        } else {//token is OK!
            const user = g_state.find_user_by_id(user_payload.user_id);
            /*if (user.is_logon) {*/
                const id = req.body.text;
                const current_user_id = parseInt(id); //should we check if not an int?
                const current_user = g_state.find_user_by_id(current_user_id);
                if(!current_user)
                {
                    res.status(status_codes.NOT_FOUND);
                    res.send("there is no such user in our users array");
                    return;
                }
                res.status(200).send(JSON.stringify(current_user));
                return;
            }
    });
}

function get_current_user(req, res) {

    const current_token = req.headers["authorization"];
    const current_id = req.headers["id"];
    if (!current_token) {
        res.status(400).send("the token is invalid");
    }
    jwt.verify(current_token, data_base.secret_jwt, async (err) => {
        if (err) {
            res.status(400).send("token is invalid, please try again later");
            return;
        } else {
            const final_id = parseInt(current_id);
            const user = g_state.find_user_by_id(final_id);
            if(!user)
            {
                res.status(status_codes.NOT_FOUND);
                res.send("there is no such user in our users array");
                return;
            }
            else
            {
                res.status(200).send(JSON.stringify(user));
                return;
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
        const id = id_data.user_id += 1;
        const new_user = await new user.User(full_name, id, email.toLowerCase(), encrypted_password);
        id_data.users.push(new_user);
        await data_base.save_data_to_file();
        res.status(201).send(JSON.stringify(new_user));
    }
    catch (err)
    {
        console.log(err);
    }
}

async function delete_current_user(req, res) {

    const current_token = req.headers["authorization"];
    if (!current_token) {
        res.status(400).send("the token is invalid");
        return;
    }
    jwt.verify(current_token, data_base.secret_jwt, async (err, user_payload) => {
        if (err) {
            res.status(400).send("token is invalid, please try again later");
            return;
        } else {//token is OK!
            const admin = g_state.find_user_by_id(user_payload.user_id);
            if (admin === id_data.users[0] /*&& admin.is_logon*/) {
                const id = req.body.text;
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
                res.status(200).send(JSON.stringify(id_data.users)); //new array
                return;
            }
        }
    });
}

async function restore_user(req, res) {

    const current_token = req.headers["authorization"];
    if (!current_token) {
        res.status(400).send("the token is invalid");
        return;
    }
    jwt.verify(current_token, data_base.secret_jwt, async (err, user_payload) => {
        if (err) {
            res.status(400).send("token is invalid, please try again later");
            return;
        } else {//token is OK!
            const admin = g_state.find_user_by_id(user_payload.user_id);
            if (admin === id_data.users[0]/* && admin.is_logon*/) {
                const id = req.body.text;
                const current_user_id = parseInt(id); //should we check if not an int?
                const user = g_state.find_user_by_id(current_user_id);
                if (!user) {
                    res.status(status_codes.NOT_FOUND);
                    res.send("there is no such user in our users array");
                    return;
                } else if (user.id === 0) {
                    res.status(status_codes.FORBIDDEN);
                    res.send("the current id is the admin user - always active");
                    return;
                } else {
                    admin_services.restore_suspend_user(user);
                    await data_base.save_data_to_file().then(r => console.log("saved data updated"));
                    res.send(JSON.stringify(id_data.users));
                    return;
                }
            }
        }
    });
}

async function suspend_user(req, res) {

    const current_token = req.headers["authorization"];
    if (!current_token) {
        res.status(400).send("the token is invalid");
        return;
    }
    jwt.verify(current_token, data_base.secret_jwt, async (err, user_payload) => {
        if (err) {
            res.status(400).send("token is invalid, please try again later");
            return;
        } else {//token is OK!
            const admin = g_state.find_user_by_id(user_payload.user_id);
            if (admin === id_data.users[0]/* && admin.is_logon*/) {
                const id = req.body.text;
                const current_user_id = parseInt(id); //should we check if not an int?
                const user = g_state.find_user_by_id(current_user_id);
                if (!user) {
                    res.status(status_codes.NOT_FOUND);
                    res.send("there is no such user in our users array");
                    return;
                } else if (user.id === 0) {
                    res.status(status_codes.FORBIDDEN);
                    res.send("the current id is the admin user - already active");
                    return;
                } else {
                    admin_services.suspend_user(user);
                    await data_base.save_data_to_file().then(r => "saved data updated");
                    res.send(JSON.stringify(id_data.users)); //new array
                    return;
                }
            }
        }
    });
}

async function approve_user(req, res) {

    const current_token = req.headers["authorization"];
    if (!current_token) {
        res.status(400).send("the token is invalid");
        return;
    }
    else {
        jwt.verify(current_token, data_base.secret_jwt, async (err, user_payload) => {
            if (err) {
                res.status(400).send("token is invalid, please try again later");
                return;
            } else {
                const admin = g_state.find_user_by_id(user_payload.user_id);
                if (admin === id_data.users[0] /*&& admin.is_logon*/) {
                    const id = req.body.text;
                    let current_user_id = parseInt(id);
                    const user = g_state.find_user_by_id(current_user_id);
                    if (!user) {
                        res.status(status_codes.NOT_FOUND);
                        res.send("there is no such user in our users array");
                        return;
                    } else if (user.id === 0) {
                        res.status(status_codes.FORBIDDEN);
                        res.send("the current id is the admin user - already active");
                        return;
                    } else {
                        admin_services.approve_join_request(user) //should we check if he is already approved
                        await data_base.save_data_to_file();
                        res.status(status_codes.ACCEPTED);
                        res.send(JSON.stringify(id_data.users)); //new array
                        return;
                    }

                }
            }
        });
    }
}

function get_all_users(req, res) {

    const current_token = req.headers["authorization"];
    if (!current_token) {
        res.status(400).send("the token is invalid");
    }
    jwt.verify(current_token, data_base.secret_jwt, async (err, user_payload) => {
        if (err) {
            res.status(400).send("token is invalid, please try again later");
        } else {
            const user = g_state.find_user_by_id(user_payload.user_id);
            /*if(user.is_logon) {*/
                res.status(status_codes.ACCEPTED);
                res.send(JSON.stringify(admin_services.get_all_users()));
            /*}
            else{
                res.status(status_codes.FORBIDDEN).send("You are not logg on ");
            }*/
        }
    });
}

function send_message_to_all(req, res) {

    const current_token = req.headers["authorization"];
    if (!current_token) {
        res.status(400).send("the token is invalid");
        return;
    }
    else {
        jwt.verify(current_token, data_base.secret_jwt, async (err, user_payload) => {
            if (err) {
                res.status(400).send("token is invalid, please try again later");
                return;
            } else {
                const admin = g_state.find_user_by_id(user_payload.user_id);
                if (admin === id_data.users[0]/* && admin.is_logon*/) {
                    const message = req.body.text;
                    if (!message) {
                        res.status(status_codes.BAD_REQUEST);
                        res.send("Invalid message");
                        return;
                    }
                    else {
                        admin_services.send_message_to_all_users(message);
                        await data_base.save_data_to_file();
                        res.status(status_codes.ACCEPTED);
                        res.send(JSON.stringify(id_data.users));
                        return;
                    }
                }
            }
        });
    }
}

module.exports = {
    get_user,
    create_new_user,
    delete_current_user,
    restore_user,
    suspend_user,
    approve_user,
    get_all_users,
    send_message_to_all,
    get_current_user,
    
}


