const g_state = require("../JavaScript/g_state");
const data_base = require("../JavaScript/data_base");

const delete_user_account = function (sender_id) {
    const index = data_base.users.indexOf(g_state.find_user_by_id(sender_id));
    data_base.users.splice(index, 1);
}

module.exports = { delete_user_account }