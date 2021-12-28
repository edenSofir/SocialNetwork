const  data_base = require('../JavaScript/data_base');
publish_current_post = function (current_user, txt)
{
    current_user.publish_post(txt);
}

get_all_posts_from_users = function ()
{
    const all_posts =[]
    data_base.users.forEach((user,index )=>
        user.posts.forEach((post,index) => all_posts.push(post) ));
}

delete_current_post = function (current_user, post_id)
{
    current_user.delete_post(post_id);
}

module.exports = {publish_current_post, get_all_posts_from_users, delete_current_post}