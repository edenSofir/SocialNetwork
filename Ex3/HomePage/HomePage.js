class PostItem extends React.Component{
    constructor(props)
    {
        super(props);
    }

    render(){
        return <div>
             <span>
                user id : {this.props.post.user_id}
                <br></br>
                text : {this.props.post.text}
                <br></br>
                time : {this.props.post.date_time}
            </span>
        </div>
    }
}

class HomePage extends React.Component{
    constructor(props)
    {
        super(props);
        this.state = {text:"" , msg:"", posts:[]};
        this.submit_post = this.submit_post.bind(this);
        this.update_text = this.update_text.bind(this);
        this.update_posts = this.update_posts.bind(this);
    }

    update_text(event)
    {
        const val = event.target.value;
        this.setState({text:val});
    }

    update_posts(event)
    {
        const val = event;
        this.setState({posts:val});
    }

    async submit_post()
    {
        const val = {text: this.state.text};
        const response = await fetch('/post/user',
        {
            method: 'POST',
            headers: { 'Content-Type':'application/json', 'authorization' : get_cookie('token')},
            body: JSON.stringify(val)
        });
        if(response.status === 200)
        {
            const res = (await response.json());
            this.setState({msg : 'the post has posted!'});
        }
        else
        {
            const err = (await response.text());
            this.setState({msg: err});
        }//need to add an indicator that says that a new post has been post to evreyone
        //After you write a post, the list of posts gets refreshed - by the indicator
    }

    async componentDidMount()
    {
        try
        {
            let flag = false;
            let posts_res = await this.fetch_posts();
            const id = get_cookie("id");
           for(let i = posts_res.length -1 ; i >=0 ; i--)
           {
               if(posts_res[i].user_id === id)
               {
                   let post = posts_res[i];
                   posts_res.splice(i,1);
                   flag = true;
                   break;
               }//לבדוק אם כאשר יש הרבה פוסטים מיוזרים שונים הפוסט של היוזר הנוכחי ראשון
           }
           if(flag)
           {
               posts_res.push(post);
           }
            posts_res = posts_res.slice(-10).reverse();
            this.update_posts(posts_res);
        }
        catch(err)
        {
            console.log(err);
        }
    }
 
    async fetch_posts()
    {
        const response = await fetch('/post/user',
        {
            method: 'GET',
            headers: {'Content-Type': 'application/json', 'authorization': get_cookie("token")}
        });
        if(response.status!==200)
        {
            const err = (await response.text());
            throw new Error(err);
        }
            const res = (await response.json());
            return res;

    }

    render(){
        return <div>
                    <h1>WELCOME TO SOCIAL NETWORK!</h1>
                    <Nvbar></Nvbar>
                    <div>
                        create new post: <input type="post" value={this.state.text} onChange={this.update_text}></input>
                        <button onClick={this.submit_post}>Post</button>
                        <div>{this.state.msg} </div>  
                        {this.state.posts.map((item, index)=> {return <PostItem
                        post= {item} key={index}/>})}
                         </div>
                    </div>
    }
}
