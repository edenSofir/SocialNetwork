const messages = require('../models/Messages');
const posts = require('../models/Posts');
const id_data = require('../JavaScript/id_data');

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

    publish_post(text) {
        console.log("publish_post");
        const post = new posts.Post(text, id_data.post_id);
        id_data.post_id += 1;
        this.posts.push(post);
        return post;
    }

    delete_post(post_id) {

        if ((this.status === Status.active) && (this.is_logon === true)) {

            const post = this.posts.find( post => post.id === post_id);
            if(!post) return false;
            const index = this.posts.indexOf(post);
            this.posts.splice(index, 1);
            return true;
        }
    }

    send_message(recipient, text) {

        if (this.status === Status.active && this.is_logon === true) {
            const message = new messages.Message(text, id_data.message_id);
            id_data.message_id += 1;
            recipient.messages.push(message);
            return true;
        }
        return false;
    }
    
    delete() {
        if(this.status === Status.active && this.is_logon === true) {
            //TODO: code duplication
            id_data.users.forEach((user, index) => {
                if (user.id === this.id) {
                    id_data.users.splice(index, 1);
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

