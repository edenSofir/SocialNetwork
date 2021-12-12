g_state.fs = require('fs').promises;
g_state.file_name = 'SocialNetworkData.txt';

async function save_data_to_file() {

    const json = JSON.stringify(g_state.users);
    await fs.writeFile(g_state.file_name, json);
    //TODO: update the data that is being stored.
}

async function read_data_from_file() {

    const json = g_state.fs.readFile(g_state.file_name, 'utf8');
    g_state.users = JSON.parse(await json);
    //TODO: update the placement acording to the data that was saved.
}
