const jwt = require('jsonwebtoken');
const User = require('mongoose').model('User');
const config = require('../config/config');

module.exports = (req, res, next) => {
    if (!req.header.authentication) {
        return res.status(401).end();
    }

    const token = req.header.authentication.split(' ')[1];

    return jwt.verify(token, config.jwtSecret, (err, decoded) => {
        if (err) {
            return res.status(401).end();
        }

        const email = decoded.sub;

        User.findById(email, (err, user) =>{
            if (err || !user) { return res.status(401).end}

            return next();
        });
    });
}