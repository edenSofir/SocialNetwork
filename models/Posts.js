
class Post {

    constructor(text, id) {
        this.text = text;
        this.id = id;
        this.date = Date.now();
    }

}

module.exports = {Post};