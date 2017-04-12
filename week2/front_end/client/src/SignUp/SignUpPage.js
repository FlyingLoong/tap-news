import React, { PropTypes } from 'react';
import SignUpForm from './SignUpForm';

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
            if (response.status === 200) {
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

        if (this.state.user.password !== this.state.user.confirm_password) {
            const errors = this.state.errors;
            errors.password = "Password and Confirm Password don't match!";
            this.setState({errors});
        } else {
            const errors = this.state.errors;
            errors.password = "";
            this.setState({errors});
        }
    }

    render() {
        return (
            <SignUpForm
            onSubmit={this.processForm}
            onChange={this.changeUser}
            errors={this.state.errors}
            user={this.state.user}/>
        )
    }

}

SignUpPage.contextTypes = {
    router: PropTypes.object.isRequired
}

export default SignUpPage;