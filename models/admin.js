const user = require("../models/User");
const data_base = require("../JavaScript/data_base");
const admin = new user.User("Admin",0,"admin@admin.com","admin");

const create_admin = async function () {
    if(!data_base.users.find(user => user.full_name === 'Admin')) {
        admin.token = 0 ;
        admin.status = user.Status.active
        data_base.users.push(admin);
        await data_base.save_data_to_file()
    } else {
        console.log("admin already exist");
    }
}

module.exports = {create_admin, admin}