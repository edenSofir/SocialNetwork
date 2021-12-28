const fs = require('fs').promises;
const path = require('path');
const filePath = path.join(__dirname, '/SocialNetworkData.txt');
const secret_jwt = "kjnkjnhkjnljn35213541dgvrf351" ;
let message_id = 1;
let user_id = 0;
let post_id = 1;
let users = [];


async function save_data_to_file() {

    const data_to_save = { users: users,
        user_id: user_id,
        post_id: post_id,
        message_id : message_id
    }
    console.log("current users to save:", data_to_save.users)
    const json = JSON.stringify(data_to_save);
    await fs.truncate(filePath,0);
    await fs.writeFile(filePath, json);
}

async function read_data_from_file() {
    try {
        const json = await fs.readFile(filePath, 'utf8');
        const data_to_save = JSON.parse(json);
        users = data_to_save.users;
        user_id = data_to_save.user_id;
        post_id = data_to_save.post_id;
        message_id = data_to_save.message_id;
    }
    catch (err)
    {
        console.log('json is empty');
    }
}

module.exports = {save_data_to_file, read_data_from_file, users, user_id, post_id, message_id , secret_jwt};
