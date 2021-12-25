const express = require("express");
const admin_services = require('../services/AdminServices');
const status_codes = require('http-status-codes').StatusCodes;



const router = express.Router();
const app = express();
const port = 2718 ;

function get_user(req, res) {
    //TODO: what is it for?
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
    if(!full_name){
        res.status(status_codes.BAD_REQUEST);
        res.send("No name specified in the current request");
        return;
    }
    const id = g_state.user_id += 1 ;
    const email = req.body.email_address;
    if(!email){
        res.status(status_codes.BAD_REQUEST);
        res.send("No email specified in the current request");
        return;
    }
    const password = req.body.password;
    if(!password){
        res.status(status_codes.BAD_REQUEST);
        res.send("No password specified in the current request");
        return;
    }

    const new_user = new User(full_name,id,email,password);
    g_state.users.push(new_user);
    res.send(JSON.stringify(new_user));
}

function delete_current_user(req, res) {
    const current_id =  parseInt(req.params.id);
    if(current_id < 0)
    {
        res.status( status_codes.BAD_REQUEST );
        res.send( "the current id is out of range")
        return;
    }
    if(current_id === 1)
    {
        res.status( status_codes.FORBIDDEN );
        res.send( "the current id is the admin user - he can not be deleted");
        return;
    }
    const idx_in_arr =  g_state.users.findIndex( user =>  user.id === current_id )
    if(idx_in_arr < 0)
    {
        res.status(status_codes.NOT_FOUND);
        res.send("there is no such user in our users array");
        return;
    }
    //--//(g_state.users[idx_in_arr]);//admin deletes the user
    //g_state.users.splice(idx_in_arr, 1);
    ///Nikol: moved to the delete function in Admin.js
    res.send(JSON.stringify( g_state.users) ); //new array
}

function restore_user(req, res) {
    ///Nikol: I hope that this is correct. I did it according to the previous methods
    const current_id =  parseInt(req.params.id);
    if(current_id < 0)
    {
        res.status( status_codes.BAD_REQUEST );
        res.send( "the current id is out of range");
        return;
    }
    if(current_id === 1)
    {
        res.status( status_codes.FORBIDDEN );
        res.send( "the current id is the admin user - he is always active");
        return;
    }
    const idx_in_arr =  g_state.users.findIndex( user =>  user.id === current_id );
    if(idx_in_arr < 0)
    {
        res.status(status_codes.NOT_FOUND);
        res.send("there is no such user in our users array");
        return;
    }
    g_state.admin.restore_suspend_user(g_state.users[idx_in_arr]);
    res.send(JSON.stringify( g_state.users) ); //new array
}

function suspend_user(req, res) {
    ///Nikol: I hope that this is correct. I did it according to the previous methods
    const current_id =  parseInt(req.params.id);
    if(current_id < 0)
    {
        res.status( status_codes.BAD_REQUEST );
        res.send( "the current id is out of range");
        return;
    }
    if(current_id === 1)
    {
        res.status( status_codes.FORBIDDEN );
        res.send( "the current id is the admin user - he is always active");
        return;
    }
    const idx_in_arr =  g_state.users.findIndex( user =>  user.id === current_id );
    if(idx_in_arr < 0)
    {
        res.status(status_codes.NOT_FOUND);
        res.send("there is no such user in our users array");
        return;
    }
    g_state.admin.suspend_user(g_state.users[idx_in_arr]);
    res.send(JSON.stringify( g_state.users) ); //new array
}

function approve_user(req, res) {
    ///Nikol: I hope that this is correct. I did it according to the previous methods
    const current_id =  parseInt(req.params.id);
    if(current_id < 0)
    {
        res.status( status_codes.BAD_REQUEST );
        res.send( "the current id is out of range");
        return;
    }
    if(current_id === 1)
    {
        res.status( status_codes.FORBIDDEN );
        res.send( "the current id is the admin user - he is always active");
        return;
    }
    const idx_in_arr =  g_state.users.findIndex( user =>  user.id === current_id );
    if(idx_in_arr < 0)
    {
        res.status(status_codes.NOT_FOUND);
        res.send("there is no such user in our users array");
        return;
    }
    g_state.admin.approve_join_request(g_state.users[idx_in_arr]);
    res.send(JSON.stringify( g_state.users) ); //new array
}

function get_all_users(req, res) {
    //TODO: check if correct
    res.send(JSON.stringify( g_state.users) );
}


