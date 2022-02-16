
class PostItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div className='singlePost'>
            <span>
                <span className='singlePostSpan'>
                    user id :
                </span>
                {this.props.post.user_id}
                <br></br>
                <span className='singlePostSpan' >
                    text :
                </span>
                <span>
                    {this.props.post.text}
                </span>
                <br></br>
                <span className='singlePostSpan'>
                    time :
                </span>
                {this.props.post.date_time}
            </span>
        </div>
    }
}

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { text: "", msg: "", posts: []};
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
        const response = await fetch('/post/user',
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'authorization': get_cookie('token') },
                body: JSON.stringify(val)
            });
        if (response.status === 202) {
            const res = (await response.json());
            this.setState({ msg: 'the post has been posted!' });
            this.setState({ text: "" });
            window.location.reload();
        }
        else {
            const err = (await response.text());
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
            }
            else if (user.status == 1 || user.status == 3) {
                window.location.href = '../Login/Login.html';
            }
            else {
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
                    posts_res = [post, ...posts_res];
                }
                posts_res = posts_res.slice(-10).reverse();
                this.update_posts(posts_res);
            }
        }
        catch (err) {
            console.log(err);
        }
    }


    async fetch_user() {
        const response = await fetch('/admin/get_current_user',
            {
                method: 'GET',
                headers: { 'Content-Type': 'application/json', 'authorization': get_cookie("token"), 'id': get_cookie("id") },
            });
        if (response.status !== 200) {
            window.location.href = '../Login/Login.html';
        }
        else {
            const res = (await response.json());
            return res;
        }
    }

    async fetch_posts() {
        const response = await fetch('/post/user',
            {
                method: 'GET',
                headers: { 'Content-Type': 'application/json', 'authorization': get_cookie("token") }
            });
        if (response.status !== 200) {
            const err = (await response.text());
            throw new Error(err);
        }
        const res = (await response.json());
        return res;

    }

    render() {
        return <div>
            <Navbar></Navbar>
            <PostIndicator></PostIndicator>
            <MsgIndicator></MsgIndicator>
            <div className='createPostForm'>
                <h1>Create new post:</h1>
                <input type="post" value={this.state.text} onChange={this.update_text}></input>
                <br></br>
                <button onClick={this.submit_post}>Post</button>
                <div>{this.state.msg} </div>
            </div>
            <div className='postsResulets'>
                {this.state.posts.map((item, index) => {
                    return <PostItem post={item} key={index} />
                })}
            </div>
        </div>
    }
}
