const express = require('express');
const passport = require('passport');
const validator = require('validator');
const router = express.Router();

router.post('/signup', (req, res, next) => {
    const validateResult = validateSignupForm(req.body);

    if (!validateResult.success) {
        return res.status(400).json({
            success: false,
            message: validateResult.message,
            errors: validateResult.errors
        });
    }

    return passport.authenticate('local-signup', (err) => {
        if (err) {
            if (err.name == "MongoError" && err.code == 11000) {
                // the 11000 Mongo code is for a duplication email error
                // the 409 HTTP status code is for conflict error
                return res.status(409).json(
                    {
                        success:false,
                        message: "Check the form for error!",
                        errors: {
                            email: "This email is already taken"
                        }
                    }
                );
            }

            return res.status(400).json(
                {
                    success: false,
                    message: "Could not process the form!"
                }
            );
        }

        return res.status(200).json(
            {
                success: true,
                message: 'You have successfully signed up! Now you should be able to log in.'
            }
        );
    })(req, res, next);
})

router.post('/login', (req, res, next) => {
    let validateResult = validateLoginForm(req.body);

    if (!validateResult.success) {
        return {
            success: false,
            message: "Check the form for error!"
        }
    }

    passport.authenticate('local-login', (err, token, userData) => {
        if (err) {
            if (err.name = "IncorrectCredentialsError") {
                return res.status(400).json({
                    success: false,
                    message: err.message
                })
            }

            return res.status(400).json({
                success: false,
                message: "Can't process the login form with " + err.message
            });
        }

        return res.status(200).json(
            {
                success: true,
                message: "You have successfully logged in!",
                token,
                userData
            }
        );
    })(req, res, next);
})

function validateSignupForm(payload) {
    let isFormValid = true;
    let message = "";
    let errors = {};

    if(!payload || typeof(payload.email) !== "string" || !validator.isEmail(payload.email)) {
        isFormValid = false;
        errors.email = "Please provide a correct email address!";
    }

    if (!payload || typeof(payload.password) !== "string" || payload.password.trim().length < 8) {
        isFormValid = false;
        errors.email = "Password must at least 8 characters!";
    }

    if (!isFormValid) {
        message = "Check the form for error!";
    }

    return {
        success: isFormValid,
        message,
        errors
    }
}

function validateLoginForm(payload) {
    let isFormValid = true;
    let message = "";
    let errors = {};

    if (!payload || typeof(payload.email) !== "string" || payload.email.trim().length == 0) {
        isFormValid = false;
        errors.email = "Please provide your email!";
    }

    if (!payload || typeof(payload.password) !== "string" || payload.password.trim().length == 0 ) {
        isFormValid = false;
        errors.password = "Please provide your password!";
    }

    if (!isFormValid) {
        message = "Check the form for error!";
    }

    return {
        success: isFormValid,
        message,
        errors
    }
}

module.exports = router;