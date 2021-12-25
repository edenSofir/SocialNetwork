const post_services = require('../services/admin_services');
const g_state = require("../JavaScript/g_state");

function post_post(req, res)
{
    const {user_id, post_id} =  req.params; //should be post id?
    const current_user_id = parseInt(user_id);
    const current_post_id = parseInt(post_id);

    if(current_post_id < 1)
    {
        res.status( g_state.g_state.status_codes.BAD_REQUEST );
        res.send( "the current post is invalid - out of range");
        return;
    }

    if(current_user_id
}
