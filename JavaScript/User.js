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

}

const Status = {
    created : 1,
    active : 2,
    suspended : 3,
    deleted : 4
};