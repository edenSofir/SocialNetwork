
class Post {

    constructor(creator, text, id) {
        this.creator = creator; //user
        this.text = text;
        this.id = id;
        this.date = Date.now();
    }

}