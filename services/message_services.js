send_a_message = function (sender_id, recipient, message)
{
    g_state.users.forEach((user) => {
       if(user.id === sender_id) {
           return user.send_message(recipient, message);
       }
    });

    return false;
}

module.exports = { send_a_message,  }

