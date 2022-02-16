class AboutPage extends React.Component {
    constructor(props) {
        super(props);
    }

    async componentDidMount() {
        let user = await this.fetch_user();
        if (user == null) {
            window.location.href = '../Login/Login.html';
        }
        else if (user.status == 1 || user.status == 3) {
            window.location.href = '../Login/Login.html';
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

    render() {
        return <div>
            <Navbar></Navbar>
            <div className='aboutContent'>
                <h1>
                    Exercise 3 in JavaScript Course
                </h1>
                <p>
                    Full name : Eden Sofir
                </p>
                <p>
                    Number ID : 315900019
                </p>
                <p>
                    Email : edenso@mta.ac.il
                </p>
            </div>
        </div>
    }
}