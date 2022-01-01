const fs = require('fs').promises;
const path = require('path');
const file_path = path.join(__dirname, '/SocialNetworkData.txt');
const secret_jwt = "kjnkjnhkjnljn35213541dgvrf351" ;
const id_data = require('../JavaScript/id_data');
const user = require("../models/User");


async function save_data_to_file() {

    const data_to_save = { users: id_data.users,
        user_id: id_data.user_id,
        post_id: id_data.post_id,
        message_id : id_data.message_id
    }
    const json = JSON.stringify(data_to_save);
    await fs.truncate(file_path,0);
    await fs.writeFile(file_path, json);
}

async function read_data_from_file() {

    try {
        const json = await fs.readFile(file_path, 'utf8');
        const data_to_save = JSON.parse(json);
        data_to_save.users.forEach((curr_user, i) => {
            const temp = new user.User(curr_user.full_name, curr_user.id, curr_user.email_address, curr_user.password);
            id_data.users.push(temp);
            curr_user.messages.forEach(message => {
                id_data.users[i].messages.push(message);
            });
            curr_user.posts.forEach(post => {
                id_data.users[i].posts.push(post);
            });
            id_data.users[i].status = curr_user.status;
            id_data.users[i].creationDate = curr_user.creationDate;
        });

        id_data.user_id = data_to_save.user_id;
        id_data.post_id = data_to_save.post_id;
        id_data.message_id = data_to_save.message_id;
    }
    catch (err)
    {
        console.log('json is empty');
    }
}

module.exports = {save_data_to_file, read_data_from_file, secret_jwt};
