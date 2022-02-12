class Register extends React.Component{
    constructor(props)
    {
        super(props);
        this.state = {full_name:"", email:"", password:"", msg:""};
        this.update_email = this.update_email.bind(this);
        this.update_password = this.update_password.bind(this);
        this.update_full_name = this.update_full_name.bind(this);
        this.register_click = this.register_click.bind(this);
    }

    update_full_name(event){
        const val = event.target.value;
        this.setState({full_name:val});
    }

    update_email(event){
        const val = event.target.value;
        this.setState({email:val});
    }

    update_password(event){
        const val = event.target.value;
        this.setState({password:val});
    }

    async register_click(){
        const values = {full_name:this.state.full_name, email:this.state.email, password:this.state.password};
        const response = await fetch('/admin/user',
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(values)
        });
        if(response.status === 201)
        {
         const res = (await response.json());
         this.setState({msg : 'Register approved, the registrion has sent to admin!'})
        window.location.href = '../Login/Login.html'
        }
        else
        {
            const err = (await response.text());
            this.setState({msg: err});
        }
    }

    render(){
        return <div>
                    <div>
                    full name :<input value={this.state.full_name} onChange={this.update_full_name}></input>
                    </div>
                    <div>
                    email :<input value={this.state.email} onChange={this.update_email}></input>
                    </div>
                    <div>
                    password :<input value={this.state.password} onChange={this.update_password}></input>
                    </div>
                    <button onClick={this.register_click}>Submit Register</button>
                    <div>{this.state.msg}</div>
                </div>
    }
}
