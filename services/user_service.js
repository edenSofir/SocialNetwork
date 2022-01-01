const g_state = require("../JavaScript/g_state");
const id_data = require('../JavaScript/id_data');

const delete_user_account = function (sender_id) {
    const index = id_data.users.indexOf(g_state.find_user_by_id(sender_id));
    id_data.users.splice(index, 1);
}

module.exports = { delete_user_account }