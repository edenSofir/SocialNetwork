const user_services = require('../services/user_service');
const g_state = require("../JavaScript/g_state");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const data_base = require("../JavaScript/data_base");
const {Status} = require("../models/User");
const status_codes = require("http-status-codes").StatusCodes;

async function delete_user_account(req, res) {
    const auth_header = req.headers["authorization"];
    const current_token = auth_header && auth_header.split(" ")[1];
    if(current_token == null)
    {
        res.status(400).send("the token is invalid");
    }
    jwt.verify(current_token,data_base.secret_jwt, async (err, user_payload) => {
        if(err)
        {
            console.log(err);
        }
        else
        {
            if(user_payload.user_id === 0)
            {
                res.status(status_codes.FORBIDDEN);
                res.send("the current id is the admin user - he can not be deleted");
            }
            else
            {
                const user = g_state.find_user_by_id(user_payload.user_id);
                if(user.is_logon === true)
                {
                    user_services.delete_user_account(user);
                    await data_base.save_data_to_file()
                    res.send(JSON.stringify(data_base.users));
                }
                else
                {
                    res.status(status_codes.FORBIDDEN);
                    res.send("you are logoff - please preform login first!");
                }
            }
        }
    })
}

async function login_user(req, res) {
        const { email, password } = req.body;
        if (!(email && password)) {
            res.status(400).send("All input is required");
        }
        const user = await g_state.find_user_by_email(email) ;
        if(user.is_logon)
        {
            res.status(400).send("you are already login!")
        }
        if(user.status !== Status.active)
        {
            res.status(400).send("you need to be activated first!")
        }
        if (user && (bcrypt.compareSync(password, user.password))) {
           const token  = jwt.sign(
                { user_id: user.id, email },
                        data_base.secret_jwt,
                { expiresIn: "10min"}
           );
            await data_base.save_data_to_file();
            user.is_logon = true;
            console.log("user after login: ", user);
            console.log("the data has saved properly")
            res.status(200).json(token);
        }
        else {
            res.status(400).send("Invalid Credentials");
        }
}

async function logoff_user(req, res) {
        const auth_header = req.headers["authorization"];
        const current_token = auth_header && auth_header.split(" ")[1];

        if(current_token == null)
        {
            res.status(400).send("the token is invalid");
        }
        jwt.verify(current_token,data_base.secret_jwt, async (err, user_payload) => {
            if (err) {
                res.status(400).send("token is invalid, please try again later");
            } else {
                const user = g_state.find_user_by_id(user_payload.user_id);
                if(user.is_logon === true)
                {
                    user.is_logon = false;
                    console.log("logoff preformed");
                    await data_base.save_data_to_file();
                    res.status(200).json(user);
                }
                else
                {
                    res.status(400).send("you are already logout!");
                }
            }
        });
}

module.exports = {
    delete_user_account,
    login_user,
    logoff_user
}