const g_state = require("../JavaScript/g_state");

delete_user_account = function (sender_id)
{
    const user = g_state.g_state.find_user_by_id(sender_id);
    return user.delete();
}


module.exports = { delete_user_account }