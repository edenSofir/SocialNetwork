class MsgItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return React.createElement(
            'div',
            { className: 'singleMessage' },
            React.createElement(
                'span',
                null,
                React.createElement(
                    'span',
                    { className: 'singleMessageSpan' },
                    'sender :'
                ),
                this.props.Message.user_id,
                React.createElement('br', null),
                React.createElement(
                    'span',
                    { className: 'singleMessageSpan' },
                    'message :'
                ),
                this.props.Message.text,
                React.createElement('br', null),
                React.createElement(
                    'span',
                    { className: 'singleMessageSpan' },
                    'time :'
                ),
                this.props.Message.date_time
            )
        );
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
        const response = await fetch('/message/user', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', 'authorization': get_cookie('token') },
            body: JSON.stringify(values)
        });
        if (response.status === 200) {
            const res = await response.json();
            this.setState({ msg: 'the message has sent to the recipient!' });
            this.setState({ text: "" });
            this.setState({ recipient: "" });
        } else {
            const err = await response.text();
            this.setState({ msg: err });
            this.setState({ text: "" });
            this.setState({ recipient: "" });
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
                let messages_res = await this.fetch_messages();
                let diffrent_res = messages_res.reverse().slice(0,5);
                this.update_messages(diffrent_res);
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

    async fetch_messages() {
        const response = await fetch('/message/user', {
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

    update_messages(event) {
        const val = event;
        this.setState({ messages: val });
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
                { className: 'createMessageForm' },
                React.createElement(
                    'h1',
                    null,
                    'Create new message:'
                ),
                React.createElement(
                    'div',
                    null,
                    'Recipient id :'
                ),
                React.createElement('input', { type: 'recipient', value: this.state.recipient, onChange: this.update_text_recipient }),
                React.createElement(
                    'div',
                    null,
                    'Body message:'
                ),
                React.createElement('input', { type: 'message', value: this.state.text, onChange: this.update_text }),
                React.createElement('br', null),
                React.createElement('br', null),
                React.createElement(
                    'button',
                    { onClick: this.submit_msg },
                    'Send Message'
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
                { className: 'messagesResulets' },
                this.state.messages.map((item, index) => {
                    return React.createElement(MsgItem, {
                        Message: item, key: index });
                })
            )
        );
    }
}