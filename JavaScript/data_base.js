const g_state = require("../JavaScript/g_state");
g_state.g_state.fs = require('fs').promises;
g_state.g_state.path = require('path');
g_state.g_state.filePath = g_state.g_state.path.join(__dirname, '/SocialNetworkData.txt');



async function save_data_to_file() {

    const data_to_save = { users: g_state.g_state.users,
        user_id: g_state.g_state.user_id,
        post_id: g_state.g_state.post_id,
        message_id : g_state.g_state.message_id
    }
    const json = JSON.stringify(data_to_save);

    await g_state.g_state.fs.writeFile(g_state.g_state.filePath, json);


}

async function read_data_from_file() {
    if(await g_state.g_state.fs.readFile(g_state.g_state.filePath))
    {
        const json = g_state.g_state.fs.readFile(g_state.g_state.filePath, 'utf8');
        const data_to_save = JSON.parse(await json);
        g_state.users = data_to_save.users;
        g_state.user_id = data_to_save.user_id;
        g_state.post_id = data_to_save.post_id;
        g_state.message_id = data_to_save.message_id;
    }
    else
    {
        console.log("the file is empty");
    }
}

module.exports = {save_data_to_file, read_data_from_file};
