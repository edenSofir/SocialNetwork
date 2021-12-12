const status_codes = require('http-status-codes').StatusCodes;

function get_user(req, res) {
    const current_id = (req.params.id);

    if (current_id < 0) {
        res.status(status_codes.BAD_REQUEST);
        res.send("the current id isn't valid");
        return;
    }

    const current_user = g_state.users.find(user => user.id === current_id)

    if (!current_user){
        res.status(status_codes.NOT_FOUND);
        res.send("there is no such user in our users");
        return;
    }

    res.send(JSON.stringify(current_user));
}

function create_new_user(req, res){

    const full_name = req.body.full_name;

    if(!name){
        res.status(status_codes.BAD_REQUEST);
        res.send("No name specified in the current request");
        return;
    }
    const id = g_state.user_id += 1 ;
    const email = req.body.email_address



}