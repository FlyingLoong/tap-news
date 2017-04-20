import Auth from '../Auth/Auth';
import LoginForm from './LoginForm';
import React, { PropTypes } from 'react';

class LoginPage extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            errors: {},
            user: {
                email: '',
                password: ''
            }
        }

        this.processForm = this.processForm.bind(this);
        this.changeUser = this.changeUser.bind(this);
    }

    processForm(event) {
        event.preventDefault();

        const email = this.state.user.email;
        const password = this.state.user.password;

        fetch('http://localhost:3000/auth/login', {
            method: 'POST',
            cache: false,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
        .then (response => {
            if (response.status === 200) {
                this.setState({errors: {}});

                response.json().then(function(json) {
                    Auth.authenticateUser(json.token, email);
                    this.context.router.replace('/');
                }.bind(this));
            } else {
                console.log("Log in failed!");
                response.json().then(function(json) {
                    const errors = json.errors ? json.errors : {};
                    errors.summary = json.message;
                    this.setState({errors});
                }.bind(this));
            }
        })
    }

    changeUser(event) {
        const field = event.target.name;
        const user = this.state.user;
        user[field] = event.target.value;

        this.setState({
            user
        });
    }

    render () {
        return (
            <LoginForm
            onSubmit={this.processForm}
            onChange={this.changeUser}
            errors={this.state.errors}
            user={this.state.user}/>
        )
    }

}

LoginPage.contextTypes = {
    router: PropTypes.object.isRequired
}

export default LoginPage;