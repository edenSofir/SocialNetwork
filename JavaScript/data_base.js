const g_state = require("../JavaScript/g_state");
g_state.g_state.fs = require('fs').promises;
g_state.g_state.file_name = 'SocialNetworkData.txt';


const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, '/pictures');



async function save_data_to_file() {

    const users_json = JSON.stringify(g_state.g_state.users);
    const users_id_json = JSON.stringify(g_state.g_state.user_id);
    const posts_id_json = JSON.stringify(g_state.g_state.post_id);

    await g_state.g_state.fs.writeFile(g_state.g_state.file_name, users_json);
    await g_state.g_state.fs.writeFile(g_state.g_state.file_name, users_id_json);
    await g_state.g_state.fs.writeFile(g_state.g_state.file_name, posts_id_json);

    //TODO: update the data that is being stored.
}

async function read_data_from_file() {

    const json = g_state.g_state.fs.readFile(g_state.g_state.file_name, 'utf8');
    g_state.users = JSON.parse(await json);
    //TODO: update the placement according to the data that was saved.
}

save_data_to_file().then(r => console.log("finished"));
