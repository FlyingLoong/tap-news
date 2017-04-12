import Auth from '../Auth/Auth';
import './Base.css';
import React, { PropTypes } from 'react';

const Base = ({ children }) => (
    <div>
        <nav className='nav-bar indigo lighten-1'>
            <div className='nav-wrapper'>
                <a href='/' className='brand-logo'>&nbsp;&nbsp; Tap News</a>
                <ul id='nav-mobile' className='right'>
                    {Auth.isAuthenticated() ?
                    (<div>
                        <li>{Auth.getEmail()}</li>
                        <li><a href='/logout'>Log out</a></li>
                    </div>)
                    :
                    (<div>
                        <li><a href='/login'>Log in</a></li>
                        <li><a href='/signup'>Sign Up</a></li>
                    </div>)}
                </ul>
            </div>
        </nav>
        {children}
    </div>
)

Base.propTypes = {
    children: PropTypes.object.isRequired
}

export default Base;