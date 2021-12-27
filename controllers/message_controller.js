const message_services = require('../services/message_services');
const data_base = require('../JavaScript/data_base');
const g_state = require("../JavaScript/g_state");
const status_codes = require("http-status-codes").StatusCodes;

async function send_a_message(req, res) {
    const {recipient, text} = req.body;
    const recipient_id = parseInt(recipient);
    const sender_token = req.headers.token;
    const sender = g_state.find_user_by_token(sender_token);
    if (!sender) {
        res.status(status_codes.NOT_FOUND);
        res.send("There is no such user in our users array");
        return;
    }

    const recipient_user = g_state.find_user_by_id(recipient_id)
    if(!recipient_user) {
        res.status(status_codes.NOT_FOUND);
        res.send("There is no such user in our users array");
        return;
    }

    if (sender.id === recipient_id) {
        res.status(status_codes.BAD_REQUEST);
        res.send("It is the same user");
        return;
    }
    if (!text) {
        res.status(status_codes.BAD_REQUEST);
        res.send("No text to send");
        return;
    }

    if (!message_services.send_a_message(sender, recipient_user, text)) {
        res.status(status_codes.FORBIDDEN);
    }
    await data_base.save_data_to_file();
    res.send(JSON.stringify(g_state.users)); //new array
}

module.exports = {
    send_a_message
}

