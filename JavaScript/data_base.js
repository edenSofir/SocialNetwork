const g_state = require("../JavaScript/g_state");
const fs = require('fs').promises;
const path = require('path');
const filePath = path.join(__dirname, '/SocialNetworkData.txt');


async function save_data_to_file() {

    const data_to_save = { users: g_state.users,
        user_id: g_state.user_id,
        post_id: g_state.post_id,
        message_id : g_state.message_id
    }
    const json = JSON.stringify(data_to_save);
    await fs.truncate(filePath,0);
    await fs.writeFile(filePath, json);
}

async function read_data_from_file() {
    try {
        const json = fs.readFile(filePath, 'utf8');
        const data_to_save = JSON.parse(await json);
        g_state.users = data_to_save.users;
        g_state.user_id = data_to_save.user_id;
        g_state.post_id = data_to_save.post_id;
        g_state.message_id = data_to_save.message_id;
    }
    catch (err)
    {
        console.log('json is empty');
    }
}

module.exports = {save_data_to_file, read_data_from_file};
