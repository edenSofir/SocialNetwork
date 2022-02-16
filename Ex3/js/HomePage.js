
class PostItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return React.createElement(
            'div',
            { className: 'singlePost' },
            React.createElement(
                'span',
                null,
                React.createElement(
                    'span',
                    { className: 'singlePostSpan' },
                    'user id :'
                ),
                this.props.post.user_id,
                React.createElement('br', null),
                React.createElement(
                    'span',
                    { className: 'singlePostSpan' },
                    'text :'
                ),
                React.createElement(
                    'span',
                    null,
                    this.props.post.text
                ),
                React.createElement('br', null),
                React.createElement(
                    'span',
                    { className: 'singlePostSpan' },
                    'time :'
                ),
                this.props.post.date_time
            )
        );
    }
}

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { text: "", msg: "", posts: [] };
        this.submit_post = this.submit_post.bind(this);
        this.update_text = this.update_text.bind(this);
        this.update_posts = this.update_posts.bind(this);
    }

    update_text(event) {
        const val = event.target.value;
        this.setState({ text: val });
    }

    update_posts(event) {
        const val = event;
        this.setState({ posts: val });
    }

    async submit_post() {
        const val = { text: this.state.text };
        const response = await fetch('/post/user', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'authorization': get_cookie('token') },
            body: JSON.stringify(val)
        });
        if (response.status === 202) {
            const res = await response.json();
            this.setState({ msg: 'the post has been posted!' });
            this.setState({ text: "" });
            window.location.reload();
        } else {
            const err = await response.text();
            this.setState({ msg: err });
            this.setState({ text: "" });
        }
    }

    async componentDidMount() {
        try {
            const id = get_cookie("id");
            let user = await this.fetch_user();
            if (user == null) {
                window.location.href = '../Login/Login.html';
            } else if (user.status == 1 || user.status == 3) {
                window.location.href = '../Login/Login.html';
            } else {
                let flag = false;
                let post;
                let posts_res = await this.fetch_posts();
                const id_to_compare = parseInt(id);
                for (let i = posts_res.length - 1; i >= 0; i--) {
                    if (posts_res[i].user_id === id_to_compare) {
                        post = posts_res[i];
                        posts_res.splice(i, 1);
                        flag = true;
                        break;
                    }
                }
                if (flag) {
                    let diffrent_res = posts_res.reverse().slice(0,5);
                    posts_res = [post, ...diffrent_res];
                }
                this.update_posts(posts_res);
            }
        } catch (err) {
            console.log(err);
        }
    }

    async fetch_user() {
        const response = await fetch('/admin/get_current_user', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'authorization': get_cookie("token"), 'id': get_cookie("id") }
        });
        if (response.status !== 200) {
            window.location.href = '../Login/Login.html';
        } else {
            const res = await response.json();
            return res;
        }
    }

    async fetch_posts() {
        const response = await fetch('/post/user', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'authorization': get_cookie("token") }
        });
        if (response.status !== 200) {
            const err = await response.text();
            throw new Error(err);
        }
        const res = await response.json();
        return res;
    }

    render() {
        return React.createElement(
            'div',
            null,
            React.createElement(Navbar, null),
            React.createElement(PostIndicator, null),
            React.createElement(MsgIndicator, null),
            React.createElement(
                'div',
                { className: 'createPostForm' },
                React.createElement(
                    'h1',
                    null,
                    'Create new post:'
                ),
                React.createElement('input', { type: 'post', value: this.state.text, onChange: this.update_text }),
                React.createElement('br', null),
                React.createElement(
                    'button',
                    { onClick: this.submit_post },
                    'Post'
                ),
                React.createElement(
                    'div',
                    null,
                    this.state.msg,
                    ' '
                )
            ),
            React.createElement(
                'div',
                { className: 'postsResulets' },
                this.state.posts.map((item, index) => {
                    return React.createElement(PostItem, { post: item, key: index });
                })
            )
        );
    }
}