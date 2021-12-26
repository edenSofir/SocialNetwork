const {StatusCodes: status_codes} = require("http-status-codes");
const users = require("../models/User");

const g_state = {
    file_name: "",
    message_id: 1,
    user_id: 0,
    post_id: 1,
    admin : new users.User("Admin",0,"admin@admin.com","admin"),
    port : 2718,
    express : require("express"),
    status_codes : require('http-status-codes').StatusCodes,

}
g_state.app = g_state.express();
g_state.router = g_state.express.Router();
g_state.users = [g_state.admin];
g_state.admin.status = users.Status.active;


g_state.find_user_by_email = function(email){
    g_state.users.forEach((user) => {
        if(user.email_address === email)
            return user;
    });

    return null;
}
module.exports = { g_state  }


