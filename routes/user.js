const express = require('express');
const router = express.Router([]);
const mongoose = require('mongoose');
const User = require('../models/user.js');
const cors = require('cors');
const jwt = require('jsonwebtoken');

router.options('*', cors());

router.get('/:username', cors(), (req, res, next) => {
    jwt.verify(req.token, 'secretkey', (err, auth) => {
        if (err || auth.type !== 'admin') res.sendStatus(403);
        User.findOne({ username: req.params.username }, (err, user) => {
            if (!user) {
                // res.sendStatus(404);
                res.json(false);
            } else {
                if (err) return next(err);
                return res.json(user);
            }
        });
    });
});

router.get('/', cors(), (req, res, next) => {
    jwt.verify(req.token, 'secretkey', (err, auth) => {
        if (err || auth.type !== 'admin') res.sendStatus(403);
        User.find( (err, products) => {
            if (err) return next(err);
            res.json(products);
        });
    });
});

router.post('/', cors(),(req, res, next)=> {
    jwt.verify(req.token, 'secretkey', (err, auth) => {
        if (err || auth.type !== 'admin') res.sendStatus(403);
        User.create(req.body,  (err, post) => {
            if (err) return next(err);
            res.json(post);
        });
    });
});

router.post('/login', cors(), (req, res, next) => {
    const userData = req.body;
    User.findOne({ username: userData.username }, (err, user) => {
        if (!user) {
            res.sendStatus(403);
        } else {
            if (err) return next(err);
            if (userData.password === user.password) {
                delete user.password;
                jwt.sign({user}, 'secretkey', { expiresIn: '30s' }, (err, token) => {
                    res.json({token});
                });
            } else {
                res.json({
                    error: "worng password"
                });
            }
        }
    });
});

router.put('/:id', cors(),(req, res, next) => {
    jwt.verify(req.token, 'secretkey', (err, auth) => {
        if (err || auth.type !== 'admin') res.sendStatus(403);
        User.findByIdAndUpdate(req.params.id, req.body, (err, post) => {
            if (err) return next(err);
            res.json(post);
        });
    });
});

module.exports = router;
