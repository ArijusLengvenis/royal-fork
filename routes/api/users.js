'use strict';

const express = require('express');
const router = express.Router();
const users = require('../../client/json/Users');

//create user
router.post('/', function(req, res) {
    let error = {
        msg: "empty error",
        url: "/register"
    };
    const newUser = {
        id: users.length+1,
        username: req.body.username,
        password: req.body.password
    };
    if (!newUser.username || !newUser.password || !req.body.password2 || newUser.username === "anonymous") {
        error.msg = "Please include a valid username and password!";
        return res.status(400).render('error', { error: error });
    }
    if (newUser.password !== req.body.password2) {
        error.msg = "Passwords do not match!";
        return res.status(400).render('error', { error: error });
    }
    users.forEach(function(user) {
        if (user.username === newUser.username) {
            error.msg = "This username already exists!";
            return res.status(400).render('error', { error: error });
        }
    })

    users.push(newUser);
    res.redirect('/login');
});

module.exports = router;