const jwt = require ('jsonwebtoken');
const User = require('mongoose').model('User');
const passportLocalStrategy = require('passport-local').Strategy;
const config = require('../config/config');

module.exports = new PassportLocalStrategy();