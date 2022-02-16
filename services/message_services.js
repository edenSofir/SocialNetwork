send_a_message = function (sender, recipient, message) {

    return sender.send_message(recipient, message, sender);
}

get_all_messages_from_user = function (user) {
    const all_messages = [];
    if (!user)
        return;
    else {
        user.messages.forEach((message) =>
            all_messages.push(message));
        return all_messages;
    }
}

module.exports = { send_a_message, get_all_messages_from_user }

