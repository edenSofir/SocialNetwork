
class Message {

    constructor(text, id, sender) {
        this.text = text;
        this.id = id;
        this.date = Date.now();
        this.sender = sender; //user
    }

}