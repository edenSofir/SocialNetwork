
class Message {

    constructor(text, id,user) {
        this.text = text;
        this.id = id;
        const today = new Date();
        const date = today.getDate()+'-'+(today.getMonth()+1) + '-' + today.getFullYear();
	    const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
	    this.date_time = date+' '+ time;
        this.user_id = user.id ;
    }

}

module.exports = {Message};