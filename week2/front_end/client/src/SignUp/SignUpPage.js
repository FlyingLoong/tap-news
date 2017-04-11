import React, { PropTypes } from 'react';
import './SignUpForm/SignUpForm';

class SignUpPage extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            errors: {},
            user: {
                email: '',
                password: '',
                confirm_password: ''
            }
        }

        this.processForm = this.processForm.bind(this);
        this.changeUser = this.changeUser.bind(this);
    }

    processForm(event) {
        event.preventDefault();

        if (this.state.user.pass !== this.state.user.confirm_password)
            return;

        fetch('http://localhost:3000/auth/signup', {
            method: 'POST',
            cache: false,
            headers: {
                'Accept' : 'application/json',
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                email: this.state.user.email,
                password: this.state.user.password
            })
        })
        .then(response => {
            if (response.status == 200) {
                console.log("Successfully signed up!");
                this.setState({errors: {}})

                this.context.router.replace('/login');
            } else {
                response.json().then(function(json){
                    const errors = json.errors ? json.errors : {}
                    errors.summary = json.errors.message;
                    this.setState({errors});
                }.bind(this))
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

    render() {}

}