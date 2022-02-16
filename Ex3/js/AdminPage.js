class AdminPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { text_approve: "", text_message: "", text_delete: "", text_suspend: "", text_restore: "", msg_approve: "", msg_message: "", msg_delete: "", msg_restore: "", msg_suspend: "" };
        this.approve_click = this.approve_click.bind(this);
        this.submit_message = this.submit_message.bind(this);
        this.submit_delete = this.submit_delete.bind(this);
        this.submit_suspend = this.submit_suspend.bind(this);
        this.submit_restore = this.submit_restore.bind(this);
        this.update_text_approve = this.update_text_approve.bind(this);
        this.update_text_message = this.update_text_message.bind(this);
        this.update_text_delete = this.update_text_delete.bind(this);
        this.update_text_suspend = this.update_text_suspend.bind(this);
        this.update_text_restore = this.update_text_restore.bind(this);
    }

    async approve_click() {
        const approve_id = { text: this.state.text_approve };
        const response = await fetch('/admin/approve', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', 'authorization': get_cookie('token') },
            body: JSON.stringify(approve_id)
        });
        if (response.status === 202) {
            const res = await response.json();
            this.setState({ msg_approve: 'the user by the id: ' + approve_id.text + ' has been aprooved!' });
            this.setState({ text_approve: "" });
            setTimeout(() => {
                this.setState({ msg_approve : ""});
            }, 5000);
        } else {
            const err = await response.text();
            this.setState({ msg_approve: err });
            this.setState({ text_approve: "" });
            setTimeout(() => {
                this.setState({ msg_approve : ""});
            }, 5000);

        }
    }

    async submit_message() {
        const message = { text: this.state.text_message };
        const response = await fetch('/admin/user/message', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'authorization': get_cookie('token') },
            body: JSON.stringify(message)
        });
        if (response.status === 202) {
            const res = await response.json();
            this.setState({ msg_message: 'the message has sent to evreybody!' });
            this.setState({ text_message: "" });
            setTimeout(() => {
                this.setState({ msg_message : ""});
            }, 5000);
        } else {
            const err = await response.text();
            this.setState({ msg_message: err });
            this.setState({ text_message: "" });
            setTimeout(() => {
                this.setState({ msg_message : ""});
            }, 5000);
        }
    }

    async submit_delete() {
        const delete_id = { text: this.state.text_delete };
        const response = await fetch('/admin/get_user', {
            method: 'delete',
            headers: { 'Content-Type': 'application/json', 'authorization': get_cookie('token') },
            body: JSON.stringify(delete_id)
        });
        if (response.status != 200) {
            const err = await response.text();
            this.setState({ msg_delete: err });
            this.setState({ text_delete: "" });
            setTimeout(() => {
                this.setState({ msg_delete : ""});
            }, 5000);

        } else {
            const res = await response.json();
            this.setState({ msg_delete: 'the user by the id: ' + delete_id.text + ' has been deleted!' });
            this.setState({ text_delete: "" });
            setTimeout(() => {
                this.setState({ msg_delete : ""});
            }, 5000);

        }
    }

    async submit_suspend() {
        const suspend_id = { text: this.state.text_suspend };
        const response = await fetch('/admin/user/suspend', {
            method: 'put',
            headers: { 'Content-Type': 'application/json', 'authorization': get_cookie('token') },
            body: JSON.stringify(suspend_id)
        });
        if (response.status != 200) {
            const err = await response.text();
            this.setState({ msg_suspend: err });
            this.setState({ text_suspend: "" });
            setTimeout(() => {
                this.setState({ msg_suspend : ""});
            }, 5000);
        } else {
            const res = await response.json();
            this.setState({ msg_suspend: 'the user by the id: ' + suspend_id.text + ' has been suspended!' });
            this.setState({ text_suspend: "" });
            setTimeout(() => {
                this.setState({ msg_suspend : ""});
            }, 5000);
        }
    }

    async submit_restore() {
        const restore_id = { text: this.state.text_restore };
        const response = await fetch('/admin/get_user', {
            method: 'put',
            headers: { 'Content-Type': 'application/json', 'authorization': get_cookie('token') },
            body: JSON.stringify(restore_id)
        });
        if (response.status != 200) {
            const err = await response.text();
            this.setState({ msg_restore: err });
            this.setState({ text_restore: "" });
            setTimeout(() => {
                this.setState({ msg_restore : ""});
            }, 5000);
        } else {
            const res = await response.json();
            this.setState({ msg_restore: 'the user by the id: ' + restore_id.text + ' has been restored!' });
            this.setState({ text_restore: "" });
            setTimeout(() => {
                this.setState({ msg_restore : ""});
            }, 5000);
        }
    }

    update_text_restore(event) {
        const val = event.target.value;
        this.setState({ text_restore: val });
    }

    update_text_suspend(event) {
        const val = event.target.value;
        this.setState({ text_suspend: val });
    }

    update_text_approve(event) {
        const val = event.target.value;
        this.setState({ text_approve: val });
    }

    update_text_message(event) {
        const val = event.target.value;
        this.setState({ text_message: val });
    }

    update_text_delete(event) {
        const val = event.target.value;
        this.setState({ text_delete: val });
    }

    render() {
        return React.createElement(
            "div",
            { className: "adminContent" },
            React.createElement(Navbar, null),
            React.createElement(
                "div",
                null,
                React.createElement(
                    "div",
                    null,
                    "Approve join request by id :"
                ),
                React.createElement("input", { type: "approve", value: this.state.text_approve, onChange: this.update_text_approve }),
                React.createElement("br", null),
                React.createElement("input", { type: "button", value: "Approve user", onClick: this.approve_click }),
                React.createElement(
                    "div",
                    null,
                    this.state.msg_approve,
                    " "
                )
            ),
            React.createElement(
                "div",
                null,
                React.createElement(
                    "div",
                    null,
                    "Send message to all users:"
                ),
                React.createElement("input", { type: "message", value: this.state.text_message, onChange: this.update_text_message }),
                React.createElement("br", null),
                React.createElement("input", { type: "button", value: "Send message", onClick: this.submit_message }),
                React.createElement(
                    "div",
                    null,
                    this.state.msg_message,
                    " "
                ),
                React.createElement(
                    "div",
                    null,
                    React.createElement(
                        "div",
                        null,
                        "Delete user by id :"
                    ),
                    React.createElement("input", { type: "delete", value: this.state.text_delete, onChange: this.update_text_delete }),
                    React.createElement("br", null),
                    React.createElement("input", { type: "button", value: "Delete user", onClick: this.submit_delete }),
                    React.createElement(
                        "div",
                        null,
                        this.state.msg_delete,
                        " "
                    )
                ),
                React.createElement(
                    "div",
                    null,
                    React.createElement(
                        "div",
                        null,
                        "Suspend user by id :"
                    ),
                    React.createElement("input", { type: "suspend", value: this.state.text_suspend, onChange: this.update_text_suspend }),
                    React.createElement("br", null),
                    React.createElement("input", { type: "button", value: "Suspend user", onClick: this.submit_suspend }),
                    React.createElement(
                        "div",
                        null,
                        this.state.msg_suspend,
                        " "
                    )
                ),
                React.createElement(
                    "div",
                    null,
                    React.createElement(
                        "div",
                        null,
                        "Restore user by id:"
                    ),
                    React.createElement("input", { type: "restore", value: this.state.text_restore, onChange: this.update_text_restore }),
                    React.createElement("br", null),
                    React.createElement("input", { type: "button", value: "Restore user", onClick: this.submit_restore }),
                    React.createElement(
                        "div",
                        null,
                        this.state.msg_restore,
                        " "
                    )
                )
            )
        );
    }
}