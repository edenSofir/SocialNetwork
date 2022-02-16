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
        const response = await fetch('/admin/approve',
            {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', 'authorization': get_cookie('token') },
                body: JSON.stringify(approve_id)
            });
        if (response.status === 202) {
            const res = (await response.json());
            this.setState({ msg_approve: 'the user by the id:' + approve_id.text + 'has been aprooved!' });
            this.setState({ text_approve: "" });
        }
        else {
            const err = (await response.text());
            this.setState({ msg_approve: err });
            this.setState({ text_approve: "" });
        }
    }

    async submit_message() {
        const message = { text: this.state.text_message };
        const response = await fetch('/admin/user/message',
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'authorization': get_cookie('token') },
                body: JSON.stringify(message)
            });
        if (response.status === 202) {
            const res = (await response.json());
            this.setState({ msg_message: 'the message has sent to evreybody!' });
            this.setState({ text_message: "" });
        }
        else {
            const err = (await response.text());
            this.setState({ msg_message: err });
            this.setState({ text_message: "" });
        }
    }

    async submit_delete() {
        const delete_id = { text: this.state.text_delete };
        const response = await fetch('/admin/get_user',
            {
                method: 'delete',
                headers: { 'Content-Type': 'application/json', 'authorization': get_cookie('token') },
                body: JSON.stringify(delete_id)
            });
        if (response.status != 200) {
            const err = (await response.text());
            this.setState({ msg_delete: err });
            this.setState({ text_delete: "" });
        }
        else {
            const res = (await response.json());
            this.setState({ msg_delete: 'the user by the id: ' + delete_id.text + ' has been deleted!' });
            this.setState({ text_delete: "" });
        }

    }

    async submit_suspend() {
        const suspend_id = { text: this.state.text_suspend };
        const response = await fetch('/admin/user/suspend',
            {
                method: 'put',
                headers: { 'Content-Type': 'application/json', 'authorization': get_cookie('token') },
                body: JSON.stringify(suspend_id)
            });
        if (response.status != 200) {
            const err = (await response.text());
            this.setState({ msg_suspend: err });
            this.setState({ text_suspend: "" });
        }
        else {
            const res = (await response.json());
            this.setState({ msg_suspend: 'the user by the id: ' + suspend_id.text + ' has been suspended!' });
            this.setState({ text_suspend: "" });
        }
    }

    async submit_restore() {
        const restore_id = { text: this.state.text_restore };
        const response = await fetch('/admin/get_user',
            {
                method: 'put',
                headers: { 'Content-Type': 'application/json', 'authorization': get_cookie('token') },
                body: JSON.stringify(restore_id)
            });
        if (response.status != 200) {
            const err = (await response.text());
            this.setState({ msg_restore: err });
            this.setState({ text_restore: "" });
        }
        else {
            const res = (await response.json());
            this.setState({ msg_restore: 'the user by the id: ' + restore_id.text + ' has been restored!' });
            this.setState({ text_restore: "" });
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
        return <div className='adminContent'>
            <Navbar></Navbar>
            <div >
                <div>
                    Approve join request by id :
                </div>
                <input type="approve" value={this.state.text_approve} onChange={this.update_text_approve}></input>
                <br></br>
                <input type="button" value='Approve user' onClick={this.approve_click}></input>
                <div>{this.state.msg_approve} </div>
            </div>
            <div>
                <div>
                    Send message to all users:
                </div>
                <input type="message" value={this.state.text_message} onChange={this.update_text_message}></input>
                <br></br>
                <input type="button" value='Send message' onClick={this.submit_message}></input>
                <div>{this.state.msg_message} </div>
                <div>
                    <div>
                        Delete user by id :
                    </div>
                    <input type="delete" value={this.state.text_delete} onChange={this.update_text_delete}></input>
                    <br></br>
                    <input type="button" value='Delete user' onClick={this.submit_delete}></input>
                    <div>{this.state.msg_delete} </div>
                </div>
                <div>
                    <div>
                        Suspend user by id :
                    </div>
                    <input type="suspend" value={this.state.text_suspend} onChange={this.update_text_suspend}></input>
                    <br></br>
                    <input type="button" value='Suspend user' onClick={this.submit_suspend}></input>
                    <div>{this.state.msg_suspend} </div>
                </div>
                <div>
                    <div>
                        Restore user by id:
                    </div>
                    <input type="restore" value={this.state.text_restore} onChange={this.update_text_restore}></input>
                    <br></br>
                    <input type="button" value='Restore user' onClick={this.submit_restore}></input>
                    <div>{this.state.msg_restore} </div>
                </div>
            </div>
        </div>


    }
}


