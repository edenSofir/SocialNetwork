
class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = { msg: '' };
        this.logout_click = this.logout_click.bind(this);
    }

    async logout_click() {
        const response = await fetch('/user/logoff',
            {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', 'authorization': get_cookie('token') }
            });
        if (response.status === 200) {
            const res = (await response.json());
            this.setState({ msg: 'Logout preformed, BYE!' });
            window.location.href = '../Login/Login.html';
        }
        else {
            const err = (await response.text());
            this.setState({ msg: err });
        }
    }
    myFunction() {
        var x = document.getElementById("myTopnav");
        if (x.className === "navbar") {
            x.className += " responsive";
        } else {
            x.className = "navbar";
        }
    }

    render() {
        let is_admin = get_cookie('admin') === "true";
        return <nav>
            <h1 className='welcomeHeader'>WELCOME TO SOCIAL NETWORK!</h1>
            <div className='navbar' id='myTopnav'>
                <a className='nav-links' href='../HomePage/HomePage.html'>Home Page </a>
                <a className='nav-links' href='../MsgPage/MsgPage.html'>Message Page</a>
                <a className='nav-links' href='../About/About.html'>About Page</a>
                <a className='nav-links' onClick={this.logout_click}>Log out</a>
                {is_admin && <a className='nav-links' href='../AdminPage/AdminPage.html'>Admin page</a>}
                
                    <a className="icon" onClick={this.myFunction}>
                        <i class="fa fa-bars"></i>
                    </a>
            </div>
        </nav >
    }
}




