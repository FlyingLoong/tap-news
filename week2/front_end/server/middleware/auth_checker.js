const jwt = require('jsonwebtoken');
const User = require('mongoose').model('User');
const config = require('../config/config');

module.exports = (req, res, next) => {
    if (!req.headers.authentication) {
        console.log("Returned!");
        return res.status(401).end();
    }

    const token = req.headers.authentication.split(' ')[1];

    //console.log(token);

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