'use strict';

const express = require('express');
const router = express.Router();
const users = require('../../client/json/Users');
const request = require('request');

//create user
router.post('/', function(req, res) {
    let error = {
        msg: "empty error",
        url: "/register"
    };
    const newUser = {
        id: users.length+1,
        username: req.body.username,
        password: req.body.password,
        elo: 600
    };
    if (!newUser.username || !newUser.password || !req.body.password2 || newUser.username === "anonymous") {
        error.msg = "Please include a valid username and password!";
        return res.status(400).render('error', { error: error });
    }
    for (let i = 0; i < newUser.username.length; i++) {
        if (newUser.username[i] === '#') {
            error.msg = "Please include a valid username and password!";
            return res.status(400).render('error', { error: error });
        }
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
    res.redirect('/login/');
});

//Update ELO rating after solving a puzzle
router.post('/elo/', function(req, res) {
    let error = {
        msg: "empty error",
        url: `/solver/?id=${req.body.id}`
    };

    if (!req.body.username) {
        error.msg = "Please log in!";
        return res.status(403).render('error', { error: error });
    }

    if (!req.body.elo) {
        error.msg = "Invalid puzzle solution!";
        return res.status(400).render('error', { error: error });
    }

    const found = users.some(user => user.username === req.body.username);

    if (found) {
        for (let i = 0; i < users.length; i++) {
            if (users[i].username === req.body.username) {
                users[i].elo += parseInt(req.body.elo);
                //Send a request to the puzzles API to save the solver username as well as increment the completed counter
                let clientServerOptions = {
                    uri: `http://localhost:5000/api/puzzles/solvers/?id=${req.body.puzzleid}&solver=${req.body.username}&counter=${req.body.elo}`,
                    body: '',
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
                request(clientServerOptions, () => {
                    res.redirect(`/solver/?id=${req.body.puzzleid}&done=true&counter=${req.body.elo}`);
                });
            }
        }
    }
    else {
        error.msg = `No user with the name ${req.body.username} found!`;
        return res.status(400).render('error', { error: error });
    }
});

module.exports = router;