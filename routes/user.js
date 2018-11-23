const express = require('express');
const router = express.Router([]);
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const User = require('../models/user.js');

router.options('*', cors());

router.get('/:username', cors(), (req, res, next) => {
  jwt.verify(req.token, 'secretkey', (err, { user }) => {
    if (err || user.type !== 'admin') res.sendStatus(403);
    User.findOne({ username: req.params.username }, (errU, usern) => {
      if (!usern) {
        res.json(false);
      } else {
        if (errU) return next(errU);
        return res.json(usern);
      }
    });
  });
});

router.get('/', cors(), (req, res, next) => {
  jwt.verify(req.token, 'secretkey', (err, { user }) => {
    if (err || user.type !== 'admin') res.sendStatus(403);
    User.find((errU, users) => {
      if (errU) return next(errU);
      res.json(users);
    });
  });
});

router.post('/', cors(), (req, res, next) => {
  jwt.verify(req.token, 'secretkey', (err, { user }) => {
    if (err || user.type !== 'admin') res.sendStatus(403);
    User.create(req.body, (errU, post) => {
      if (errU) return next(errU);
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
        jwt.sign({ user }, 'secretkey', { expiresIn: '30s' }, (errU, token) => {
          res.json({ token });
        });
      } else {
        res.json({
          error: 'worng password',
        });
      }
    }
  });
});

router.put('/:id', cors(), (req, res, next) => {
  jwt.verify(req.token, 'secretkey', (err, { user }) => {
    if (err || user.type !== 'admin') res.sendStatus(403);
    User.findByIdAndUpdate(req.params.id, req.body, (errU, post) => {
      if (errU) return next(errU);
      res.json(post);
    });
  });
});

module.exports = router;
