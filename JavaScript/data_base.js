const g_state = require("../JavaScript/g_state");
g_state.g_state.fs = require('fs').promises;
g_state.g_state.path = require('path');
g_state.g_state.filePath = this.path.join(__dirname, '/SocialNetworkData.txt');



async function save_data_to_file() {

    const users_json = JSON.stringify(g_state.g_state.users);
    const users_id_json = JSON.stringify(g_state.g_state.user_id);
    const posts_id_json = JSON.stringify(g_state.g_state.post_id);

    await g_state.g_state.fs.writeFile(g_state.g_state.filePath, users_json);
    await g_state.g_state.fs.writeFile(g_state.g_state.filePath, users_id_json);
    await g_state.g_state.fs.writeFile(g_state.g_state.filePath, posts_id_json);

}

async function read_data_from_file() {

    const users_json = g_state.g_state.fs.readFile(g_state.g_state.filePath, 'utf8');
    const users_id_json = g_state.g_state.fs.readFile(g_state.g_state.filePath, 'utf8');
    const posts_id_json = g_state.g_state.fs.readFile(g_state.g_state.filePath, 'utf8');
    g_state.users = JSON.parse(await users_json);
    g_state.user_id = JSON.parse(await users_id_json);
    g_state.post_id = JSON.parse(await posts_id_json);
    //TODO: update the placement according to the data that was saved.
}

save_data_to_file().then(r => console.log("finished"));
