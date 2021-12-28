const data_base = require('../JavaScript/data_base');

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

        if(this.status === Status.active) {
            const post = new Post(this, text, data_base.post_id);
            data_base.post_id += 1;
            this.posts.push(post);
            return true;
        }
        return false;
    }

    delete_post(post) {

        if (this.status === Status.active) {
            const index = get_post_index(this, post);
            this.posts.slice(index, 1);
            return true;
        }

        return false;
    }

    send_message(recipient, text) {

        if (this.status === Status.active) {
            const message = new Message(text, data_base.message_id, this);
            data_base.message_id += 1;
            recipient.messages.push(message);
            return true;
        }
        return false;
    }
    
    delete() {
        if(this.status === Status.active) {
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

function get_post_index(user, post_to_find){
    user.posts.forEach((post, index) => {
       if(post === post_to_find)
           return index;
    });

    return -1;
}

const Status = {
    created : 1,
    active : 2,
    suspended : 3,
    deleted : 4
};

module.exports = { User, Status  }

