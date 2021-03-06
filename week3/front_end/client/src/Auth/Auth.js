class Auth {

    static authenticateUser(token, email) {
        localStorage.setItem('token', token);
        localStorage.setItem('email', email);
    }

    static isAuthenticated() {
        return (localStorage.getItem('token') !== null);
    }

    static deAuthenticateUser() {
        localStorage.removeItem('token');
    }

    static getToken() {
        return localStorage.getItem('token');
    }

    static getEmail() {
        return localStorage.getItem('email');
    }

}

export default Auth