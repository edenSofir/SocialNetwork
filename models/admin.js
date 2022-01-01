const user = require("../models/User");
const data_base = require("../JavaScript/data_base");
const bcrypt = require("bcryptjs");
const id_data = require("../JavaScript/id_data");
const admin = new user.User("Admin",0,"admin@admin.com","admin");

const create_admin = async function () {
    if(!id_data.users.find(user => user.full_name === 'Admin')) {
        admin.status = user.Status.active
        const encrypted_password = await bcrypt.hash("admin", 10);
        admin.password = encrypted_password;
        id_data.users.push(admin);
        await data_base.save_data_to_file()
    } else {
        console.log("admin already exist");
    }
}

module.exports = {create_admin, admin}