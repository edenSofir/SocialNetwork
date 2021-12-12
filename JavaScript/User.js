class User{
    constructor(fullName ,id , emailAddress, password,) {
        this.fullName = fullName;
        this.id = id;
        this.emailAddress = emailAddress;
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