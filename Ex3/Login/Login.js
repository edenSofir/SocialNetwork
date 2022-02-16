class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = { email: "", password: "", msg: "" };
        this.update_email = this.update_email.bind(this);
        this.update_password = this.update_password.bind(this);
        this.login_click = this.login_click.bind(this);
    }

    update_email(event) {
        const val = event.target.value;
        this.setState({ email: val });
    }

    update_password(event) {
        const val = event.target.value;
        this.setState({ password: val });
    }

    async login_click() {
        const values = { email: this.state.email, password: this.state.password };
        const response = await fetch('/user/login',
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(values)
            });
        if (response.status === 200) {
            const res = (await response.json());
            set_cookie("token", res.token);
            set_cookie("id", res.id);
            if (res.id === 0) {
                set_cookie("admin", true);
            }
            else {
                set_cookie("admin", false);
            }
            this.setState({ msg: 'login approved' })
            window.location.href = '../HomePage/HomePage.html';
        }
        else {
            const err = (await response.text());
            this.setState({ msg: err });
        }
    }

    register_click() {
        window.location.href = '../Register/register.html';
    }

    render() {
        return <div className='loginContent'>
            <h1>
                Login / Register
            </h1>
            <div>
                Email :
            </div>
            <input value={this.state.email} onChange={this.update_email}></input>
            <div>
                Password :
            </div>
            <input type={"password"} value={this.state.password} onChange={this.update_password}></input>
            <br></br>
            <br></br>
            <button onClick={this.login_click}>Login</button>
            <br></br>
            <button onClick={this.register_click}>Register</button>
            <div>{this.state.msg}</div>
        </div>
    }
}
