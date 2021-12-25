const {StatusCodes: status_codes} = require("http-status-codes");
const g_state = {
    message_id: 1,
    user_id: 0,
    post_id: 1,
    admin : new User("Admin",0,"admin@admin.com","admin"), //how to implement activate to admin
    users : [this.admin]
}

g_state.admin.status = Status.active;

module.exports = { g_state  }
