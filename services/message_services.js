const g_state = require("../JavaScript/g_state");

send_a_message = function (sender, recipient, message) {

    return sender.send_message(recipient, message);
}

module.exports = { send_a_message }

