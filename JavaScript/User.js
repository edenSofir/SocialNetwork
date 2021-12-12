class User{
    constructor(fullName ,id , emailAddress, password, creationDate, status) {
        this.fullName = fullName;
        this.id = id;
        this.emailAddress = emailAddress;
        this.password = password;
        this.creationDate = creationDate;
        this.status = Status.created ;
    };

}

const Status = {
    created : 1,
    active : 2,
    suspended : 3,
    deleted : 4
};