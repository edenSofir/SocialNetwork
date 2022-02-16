const message_services = require('../services/message_services');
const data_base = require('../JavaScript/data_base');
const g_state = require("../JavaScript/g_state");
const jwt = require("jsonwebtoken");
const id_data = require("../JavaScript/id_data");
const status_codes = require("http-status-codes").StatusCodes;

async function send_a_message(req, res) {

    const { recipient, text } = req.body;
    const recipient_id = parseInt(recipient);

    if (!text) {
        res.status(status_codes.BAD_REQUEST);
        res.send("No text to send");
        return;
    }

    const current_token = req.headers["authorization"];
    if (!current_token) {
        res.status(400).send("the token is invalid");
        return;
    }
    jwt.verify(current_token, data_base.secret_jwt, async (err, user_payload) => {
        if (err) {
            res.status(400).send("token is invalid, please try again later");
            return;
        } else {
            const sender = g_state.find_user_by_id(user_payload.user_id);
            /*if (sender.is_logon) {*/
            const recipient_user = g_state.find_user_by_id(recipient_id)
            if (!recipient_user) {
                res.status(status_codes.NOT_FOUND);
                res.send("There is no such user in our users array");
                return;
            }
            if (sender.id === recipient_id) {
                res.status(status_codes.BAD_REQUEST);
                res.send("It is the same user");
                return;
            }
            if (!message_services.send_a_message(sender, recipient_user, text)) {
                res.status(status_codes.FORBIDDEN).send("couldn't send the massage");
                return;
            }
            await data_base.save_data_to_file();
            res.send(JSON.stringify(id_data.users));
            return;
            /*}
            else {
                res.status(status_codes.FORBIDDEN);
                res.send("You need to login first :)");
                return;
            }*/
        }
    });
}

async function get_all_messages(req, res) {

    const current_token = req.headers["authorization"];
    if (!current_token) {
        res.status(400).send("the token is invalid");
        return;
    }
    jwt.verify(current_token, data_base.secret_jwt, async (err, user_payload) => {
        if (err) {
            res.status(400).send("token is invalid, please try again later");
            return;
        } else {
            const user = g_state.find_user_by_id(user_payload.user_id);
            /*if (user.is_logon) {*/
            const all_messages = message_services.get_all_messages_from_user(user);
            res.send(JSON.stringify(all_messages));
        /*else {
            res.status(status_codes.FORBIDDEN);
            res.send("You need to login first :)");
            return;
        }*/
    }
    });
}

module.exports = {
    send_a_message,
    get_all_messages
}

