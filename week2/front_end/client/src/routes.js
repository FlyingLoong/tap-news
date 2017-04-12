import Auth from './Auth/Auth';
import App from './App/App';
import Base from './Base/Base';
import LoginPage from './Login/LoginPage';
import SignUpPage from './SignUp/SignUpPage';

const routes = {
    component: Base,
    childRoutes: [
        {
            path: '/',
            getComponent: (location, callback) => {
                if (Auth.isAuthenticated()) {
                    callback(null, App);
                } else {
                    callback(null, LoginPage)
                }
            }
        },

        {
            path: '/login',
            component: LoginPage
        },

        {
            path: '/signup',
            component: SignUpPage
        },

        {
            path: '/logout',
            onEnter: (nextStage, replace) => {
                Auth.deAuthenticateUser();

                replace('/');
            }
        }
    ]
}

export default routes;