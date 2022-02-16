
class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = { msg: '' };
        this.logout_click = this.logout_click.bind(this);
    }

    async logout_click() {
        const response = await fetch('/user/logoff', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', 'authorization': get_cookie('token') }
        });
        if (response.status === 200) {
            const res = await response.json();
            this.setState({ msg: 'Logout preformed, BYE!' });
            window.location.href = '../Login/Login.html';
        } else {
            const err = await response.text();
            this.setState({ msg: err });
        }
    }

    render() {
        let is_admin = get_cookie('admin') === "true";
        return React.createElement(
            'nav',
            null,
            React.createElement(
                'h1',
                { className: 'welcomeHeader' },
                'WELCOME TO SOCIAL NETWORK!'
            ),
            React.createElement(
                'div',
                { className: 'navbar' },
                React.createElement(
                    'a',
                    { className: 'nav-links', href: '../HomePage/HomePage.html' },
                    'Home Page '
                ),
                React.createElement(
                    'a',
                    { className: 'nav-links', href: '../MsgPage/MsgPage.html' },
                    'Message Page'
                ),
                React.createElement(
                    'a',
                    { className: 'nav-links', href: '../About/About.html' },
                    'About Page'
                ),
                React.createElement(
                    'a',
                    { className: 'nav-links', onClick: this.logout_click },
                    'Log out'
                ),
                is_admin && React.createElement(
                    'a',
                    { className: 'nav-links', href: '../AdminPage/AdminPage.html' },
                    'Admin page'
                )
            )
        );
    }
}