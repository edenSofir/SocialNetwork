const message_services = require('../services/message_services');
const g_state = require("../JavaScript/g_state");


function send_a_message(req, res) {
    const {current, recipient, text} = req.params;
    const current_id = parseInt(current);
    const recipient_id = parseInt(recipient);

    if (current_id < 0 || recipient_id < 0) {
        res.status(g_state.g_state.status_codes.BAD_REQUEST);
        res.send("the current id is out of range");
        return;
    }
    if (current_id === recipient_id) {
        res.status(g_state.g_state.status_codes.BAD_REQUEST);
        res.send("Two identical id");
        return;
    }
    if (text === null || text === undefined) {
        res.status(g_state.g_state.status_codes.BAD_REQUEST);
        res.send("No text to send");
        return;
    }
    const user = g_state.g_state.find_user_by_id(recipient_id)
    if (user === null) {
        res.status(g_state.g_state.status_codes.NOT_FOUND);
        res.send("there is no such user in our users array");
        return;
    }

    if (!message_services.send_a_message(current_id, user, text)) {
        res.status(g_state.g_state.status_codes.FORBIDDEN);
    }
    res.send(JSON.stringify(g_state.g_state.users)); //new array
}

module.exports = {
    send_a_message
}

