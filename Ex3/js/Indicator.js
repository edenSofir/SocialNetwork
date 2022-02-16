class MsgIndicator extends React.Component {
    constructor(props) {
        super(props);
        this.state = { text: "", amout_of_messages: 0, interval_id: "", new_messages: false, amout_mesages_diffrent: 0 };
        this.indicator_message = this.indicator_message.bind(this);
    }

    async componentDidMount() {
        let res = await this.fetch_messages();
        let res_length = res.length;
        this.state.amout_of_messages = res_length;
        this.state.interval_id = setInterval(() => {
            this.check_for_new_messages();
        }, 3000);
    }

    async check_for_new_messages() {
        let messages_to_compare = await this.fetch_messages();
        console.log(messages_to_compare.length)
        if (messages_to_compare.length > this.state.amout_of_messages) {
            this.state.new_messages = true;
            this.setState({ amout_mesages_diffrent: messages_to_compare.length - this.state.amout_of_messages});
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

    ComponentWillUnMount() {
        clearInterval(this.state.interval_id);
    }

    indicator_message() {
        this.setState({ amout_posts_diffrent: 0, new_posts: false });
        window.location.href = '../MsgPage/MsgPage.html';
    }

    render() {
        return React.createElement(
            "div",
            { className: "amount_new_posts" },
            React.createElement(
                "button",
                { type: "button", value: "message", onClick: this.indicator_message },
                "amount of new messages:",
                this.state.amout_mesages_diffrent,
                " "
            )
        );
    }
}

class PostIndicator extends React.Component {
    constructor(props) {
        super(props);
        this.state = { text: "", amout_of_posts: 0, interval_id: "", new_posts: false, amout_posts_diffrent: 0 };
        this.indicator_post = this.indicator_post.bind(this);
    }

    async componentDidMount() {
        let res = await this.fetch_posts();
        let res_length = res.length;
        this.state.amout_of_posts = res_length;
        this.state.interval_id = setInterval(() => {
            this.check_for_new_posts();
        }, 3000);
    }

    async check_for_new_posts() {
        let posts_to_compare = await this.fetch_posts();
        if (posts_to_compare.length > this.state.amout_of_posts) {
            this.state.new_posts = true;
            this.setState({ amout_posts_diffrent: posts_to_compare.length - this.state.amout_of_posts });
        }
    }

    ComponentWillUnMount() {
        clearInterval(this.state.interval_id);
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

    indicator_post() {
        this.setState({ amout_posts_diffrent: 0, new_posts: false });
        window.location.reload();
    }

    render() {
        return React.createElement(
            "div",
            { className: "amount_new_posts" },
            React.createElement(
                "button",
                { type: "button", value: "post", onClick: this.indicator_post },
                " amount of new posts: ",
                this.state.amout_posts_diffrent,
                " "
            )
        );
    }
}