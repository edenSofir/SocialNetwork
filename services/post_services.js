
const id_data = require('../JavaScript/id_data');

publish_current_post = function (current_user, txt) {
    return current_user.publish_post(txt);
}

get_all_posts_from_users = function () {
    const all_posts =[]
    id_data.users.forEach((user,index )=>
        user.posts.forEach((post,index) => all_posts.push(post) ));

    return all_posts;
}

delete_current_post = function (current_user, post_id) {
    return current_user.delete_post(post_id);
}

module.exports = {publish_current_post, get_all_posts_from_users, delete_current_post}