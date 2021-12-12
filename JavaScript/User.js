
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
    };

    publish_post(text){

        if(this.status === Status.active) {
            const post = new Post(this, text, g_state.post_id);
            g_state.post_id += 1;
            this.posts.push(post);
        }
        //TODO: handle error
    }

    delete_post(post){
        const index = get_post_index(this, post);
        this.posts.slice(index, 1);
    }

    send_message(recipient, text){

        const message = new Message(text, g_state.message_id, this);
        g_state.message_id += 1;
        recipient.messages.push(message);
    }
    
    delete() {
        this.status = Status.deleted;
        //TODO: does it needs to be deleted from g_state.users? if stays need to add if in all the methods
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