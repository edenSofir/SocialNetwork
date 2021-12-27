const message_services = require('../services/message_services');
const g_state = require("../JavaScript/g_state");
const status_codes = require("http-status-codes").StatusCodes;


function send_a_message(req, res) {
    const {recipient, text} = req.body;
    const recipient_id = parseInt(recipient);
    const sender_token = req.headers.token;

    const sender = g_state.find_user_by_token(sender_token);
    if (!sender) {
        res.status(status_codes.NOT_FOUND);
        res.send("there is no such user in our users array");
        return;
    }

    const recipient_user = g_state.find_user_by_id(recipient_id)
    if(!recipient_user) {
        res.status(status_codes.NOT_FOUND);
        res.send("there is no such user in our users array");
        return;
    }

    if (sender.id === recipient_id) {
        res.status(status_codes.BAD_REQUEST);
        res.send("It is the same user");
        return;
    }
    if (text === null || text === undefined) {
        res.status(status_codes.BAD_REQUEST);
        res.send("No text to send");
        return;
    }
    if (!recipient_user) {
        res.status(status_codes.NOT_FOUND);
        res.send("there is no such user in our users array");
        return;
    }

    if (!message_services.send_a_message(sender, recipient_user, text)) {
        res.status(status_codes.FORBIDDEN);
    }
    res.send(JSON.stringify(g_state.users)); //new array
}

module.exports = {
    send_a_message
}

