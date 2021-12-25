const express = require("express");
const message_services = require('../services/message_services');
const g_state = require("../JavaScript/g_state");
const status_codes = require('http-status-codes').StatusCodes;



const router = express.Router();
const app = express();
const port = 2718 ;

function send_a_message(req, res) {
    const {current, recipient, text} =  req.params;
    const current_id = parseInt(current);
    const recipient_id = parseInt(recipient);

    if(current_id < 0 || recipient_id < 0)
    {
        res.status( status_codes.BAD_REQUEST );
        res.send( "the current id is out of range");
        return;
    }
    if(text === null || text === undefined)
    {
        res.status( status_codes.BAD_REQUEST );
        res.send( "No text to send");
        return;
    }
//TODO: Can the admin send a message this way?

    const idx_in_arr =  g_state.g_state.users.findIndex( user =>  user.id === recipient_id );
    if(idx_in_arr < 0)
    {
        res.status(status_codes.NOT_FOUND);
        res.send("there is no such user in our users array");
        return;
    }

    message_services.send_a_message(current_id, g_state.g_state.users[idx_in_arr], text);
    res.send(JSON.stringify( g_state.g_state.users) ); //new array
}
