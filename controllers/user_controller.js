const user_services = require('../services/user_service');
const g_state = require("../JavaScript/g_state");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const data_base = require("../JavaScript/data_base");
const status_codes = require("http-status-codes").StatusCodes;

async function delete_user_account(req, res) {
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
    await data_base.save_data_to_file()
    res.send(JSON.stringify(g_state.users));
}

async function login_user(req, res)
{
        const { email, password } = req.body;
        if (!(email && password)) {
            res.status(400).send("All input is required");
        }
        const user = await g_state.find_user_by_email(email) ;
        console.log(user);
        if (user && (bcrypt.compareSync(password, user.password))) {
            const token = jwt.sign(
                { user_id: user.id, email },
                "kjnkjnhkjnljn35213541dgvrf351",
                {
                    expiresIn: "10min",
                }
            );
            user.token = token;
            await data_base.save_data_to_file();
            console.log("the data has saved properly")
            res.status(200).json(user);
        }
        else {
            res.status(400).send("Invalid Credentials");
        }
}

async function logoff_user(req, res)
{
    try {
        const current_token = req.header.token;
        console.log(current_token)
        const current_user_to_logoff = g_state.find_user_by_token(current_token);
        if(current_user_to_logoff == null)
        {
            res.status(400).send("the token is invalid , no user matches to this token");
        }
        else {
            current_user_to_logoff.token = null;
            console.log("logoff preformed");
            await data_base.save_data_to_file();
            res.status(200).json(current_user_to_logoff);
        }
    } catch (err) {
        console.log(err);
    }
}
module.exports = {
    delete_user_account,
    login_user,
    logoff_user
}