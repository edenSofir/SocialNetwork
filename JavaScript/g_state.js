const {StatusCodes: status_codes} = require("http-status-codes");
const users = require("../models/User");

const g_state = {
    file_name: "",
    message_id: 1,
    user_id: 0,
    post_id: 1,
    admin : new users.User("Admin",0,"admin@admin.com","admin"),
    users : [this.admin],
    port : 2718,
    express : require("express"),
    status_codes : require('http-status-codes').StatusCodes,
    app : this.express(),
    router : this.express.Router(),
    find_user_by_id : function(id) {
        this.users.forEach((user) => {
           if(user.id === id)
               return user;
        });

        return null;
    }
}

g_state.admin.status = users.Status.active;

module.exports = { g_state  }


