const user = require("../models/User");
const data_base = require("../JavaScript/data_base");
const g_state = require('../JavaScript/g_state');

const create_admin =async function () {
    if(!g_state.users.find(user => user.name === 'admin')) {
        const admin = new user.User("Admin",0,"admin@admin.com","admin");
        admin.token = 0 ;
        admin.status = user.Status.active
        g_state.users.push(admin);
        console.log(g_state.users);
        await data_base.save_data_to_file()
    } else {
        console.log("admin already exist");
    }
}

module.exports = {create_admin}