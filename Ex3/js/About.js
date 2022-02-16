class AboutPage extends React.Component {
    constructor(props) {
        super(props);
    }

    async componentDidMount() {
        let user = await this.fetch_user();
        if (user == null) {
            window.location.href = '../Login/Login.html';
        } else if (user.status == 1 || user.status == 3) {
            window.location.href = '../Login/Login.html';
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

    render() {
        return React.createElement(
            'div',
            null,
            React.createElement(Navbar, null),
            React.createElement(
                'div',
                { className: 'aboutContent' },
                React.createElement(
                    'h1',
                    null,
                    'Exercise 3 in JavaScript Course'
                ),
                React.createElement(
                    'p',
                    null,
                    'Full name : Eden Sofir'
                ),
                React.createElement(
                    'p',
                    null,
                    'Number ID : 315900019'
                ),
                React.createElement(
                    'p',
                    null,
                    'Email : edenso@mta.ac.il'
                )
            )
        );
    }
}