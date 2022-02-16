class Post {

    constructor(text, post_id,user_id) {
        this.text = text;
        this.id = post_id;
        const today = new Date();
        const date = today.getDate()+'-'+(today.getMonth()+1) + '-' + today.getFullYear();
	    const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
	    this.date_time = date+' '+ time;
        this.user_id = user_id;
    }

}

module.exports = {Post};