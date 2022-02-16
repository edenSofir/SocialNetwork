class MsgItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div className='singleMessage'>
            <span>
                <span className='singleMessageSpan'>
                    sender :
                </span>
                {this.props.Message.user_id}
                <br></br>
                <span className='singleMessageSpan' >
                    message :
                </span>
                {this.props.Message.text}
                <br></br>
                <span className='singleMessageSpan'>
                    time :
                </span>
               {this.props.Message.date_time}
            </span>
        </div>
    }
}

class MsgPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { text: "", recipient: "", msg: "", messages: [] };
        this.submit_msg = this.submit_msg.bind(this);
        this.update_text = this.update_text.bind(this);
        this.update_text_recipient = this.update_text_recipient.bind(this);
        this.update_messages = this.update_messages.bind(this);

    }

    update_text_recipient(event) {
        const val = event.target.value;
        this.setState({ recipient: val });
    }

    update_text(event) {
        const val = event.target.value;
        this.setState({ text: val });
    }


    async submit_msg() {
        const values = { recipient: this.state.recipient, text: this.state.text };
        const response = await fetch('/message/user',
            {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', 'authorization': get_cookie('token') },
                body: JSON.stringify(values)
            });
        if (response.status === 200) {
            const res = (await response.json());
            this.setState({ msg: 'the message has sent to the recipient!' });
            this.setState({text:""});
            this.setState({recipient:""});
        }
        else {
            const err = (await response.text());
            this.setState({ msg: err });
            this.setState({text:""});
            this.setState({recipient:""});
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
                let messages_res = await this.fetch_messages();
                this.update_messages(messages_res);
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

    async fetch_messages() {
        const response = await fetch('/message/user',
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

    update_messages(event) {
        const val = event;
        this.setState({ messages: val });
    }

    render() {
        return <div>
            <Navbar></Navbar>
            <PostIndicator></PostIndicator>
            <MsgIndicator></MsgIndicator>
            <div className='createMessageForm'>
                <h1>Create new message:</h1>

                <div>
                    Recipient id :
                </div>
                <input type="recipient" value={this.state.recipient} onChange={this.update_text_recipient}></input>
                <div>
                    Body message:
                </div>
                <input type="message" value={this.state.text} onChange={this.update_text}></input>
                <br></br>
                <br></br>
                <button onClick={this.submit_msg}>Send Message</button>
                <div>{this.state.msg} </div>
            </div>
            <div className='messagesResulets'>
                {this.state.messages.map((item, index) => {
                    return <MsgItem
                        Message={item} key={index} />
                })}
            </div>
        </div>
    }
}


