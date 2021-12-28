const data_base = require('../JavaScript/data_base');
const messages = require('../models/Messages');
const posts = require('../models/Posts');

class User{

    constructor(full_name ,id , email_address, password,) {
        this.full_name = full_name;
        this.id = id;
        this.email_address = email_address;
        this.password = password;
        this.creationDate = Date.now();
        this.status = Status.created;
        this.posts = [];
        this.messages = [];
        this.is_logon = false ;
    };

    publish_post(text){

        if(this.status === Status.active && this.is_logon === true) {
            const post = new posts.Post(text, data_base.post_id);
            data_base.post_id += 1;
            this.posts.push(post);
            return true;
        }
        return false;
    }

    delete_post(post_id) {

        if ((this.status === Status.active) && (this.is_logon === true)) {

            const post = this.posts.find( post => post.id === post_id);
            if(!post) return false;
            const index = this.posts.indexOf(post);
            this.posts.splice(index, 1);
            console.log("posts: ", this.posts);
            return true;
        }
    }

    send_message(recipient, text) {

        if (this.status === Status.active && this.is_logon === true) {
            const message = new messages.Message(text, data_base.message_id, this);
            data_base.message_id += 1;
            recipient.messages.push(message);
            return true;
        }
        return false;
    }
    
    delete() {
        if(this.status === Status.active && this.is_logon === true) {
            //TODO: code duplication
            data_base.users.forEach((user, index) => {
                if (user.id === this.id) {
                    data_base.users.splice(index, 1);
                }
            });
            return true;
        }

        return false;
    }
}

function get_post_index(user, post_to_find) {
    if (user.is_logon === true) {
        user.posts.forEach((post, index) => {
            if (post === post_to_find)
                return index;
        });
    }
    return -1;
}

const Status = {
    created : 1,
    active : 2,
    suspended : 3,
    deleted : 4
};

module.exports = { User, Status  }

