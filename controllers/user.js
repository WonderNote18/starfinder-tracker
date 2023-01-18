require('dotenv').config();
const User = require('../models/User');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');


exports.register = (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            error: errors.array()[0].msg
        });
    }

    const user = new User(req.body);

    user.save((err, user) => {
        if (err) {
            return res.status(400).json({
                error: "Unable to register user"
            });
        }
    });

    res.json({
        message: "Success",
        user
    });
}

exports.login = (req, res) => {
    const {emailAddress, password} = req.body;

    User.findOne({emailAddress}, (err, user) => {
        if(err || !user) {
            return res.status(400).json({
                error: "Email was not found",
            });
        }

        // Authenticate user
        if(!user.authenticate(password)) {
            return res.status(400).json({
                error: "Email and password do not match"
            });
        }

        // Create JWT token
        const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET);

        // Insert token into cookie
        res.cookie('token', token, {expire: new Date() + 1});

        // Send response to front-end
        const {_id, firstName, lastName, emailAddress} = user;

        res.redirect('/overview');
        res.end();
    })
}

exports.logout = (req, res) => {
    res.clearCookie('token');
    // res.json({
    //     message: "User logout successful"
    // })
    res.redirect('/');
    res.end();
}

exports.isAuthenticated = (req, res, next) => {
    const accessToken = req.cookies.token;

    if (!accessToken) {
        res.redirect('/login');
    }
    try {
        jwt.verify(accessToken, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(400).json({
                    message: 'Invalid token',
                    error: err
                });
            } else {
                res.decoded = decoded;
                next();
            }
        });
    } catch (err) {
        console.log(err);
        return res.status(400).json({
            error: err.message
        });
    }
}