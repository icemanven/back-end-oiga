const express = require('express');
const router = express.Router([]);
const mongoose = require('mongoose');
const Order = require('../models/order');
const cors = require('cors');
const jwt = require('jsonwebtoken');

router.options('*', cors());

/* list */
router.get('/', cors(), (req, res, next) => {
    jwt.verify(req.token, 'secretkey', (err, auth) => {
        if (err) res.sendStatus(403);
        const search = (auth.type === 'company') ? {'company._id': auth._id }: {};
        Order.find(search, (err, orders) => {
            if (!orders) {
                res.json([]);
            } else {
                if (err) return next(err);
                res.json(orders);
            }
        }).populate({ path: 'company', select: 'username' });
    });
});

/* list by a property*/
router.get('/:prop/:valueprop', cors(), (req, res, next) => {
    jwt.verify(req.token, 'secretkey', (err, auth) => {
        if (err) res.sendStatus(403);
        const search = (auth.type === 'company') ? {'company._id': auth._id }: {};
        const { prop, valueprop} = req.params;
        search[prop] = valueprop;
        Order.find(search, (err, orders) => {
            if (!orders) {
                res.json([]);
            } else {
                if (err) return next(err);
                return res.json(orders);
            }
        }).populate({ path: 'company', select: 'username' });
    });
});

/* list by id */
router.get('/:id', cors(), (req, res, next) =>{
    jwt.verify(req.token, 'secretkey', (err, auth) => {
        if (err) res.sendStatus(403);
        Order.findById(req.params.id,  (err, post) => {
            if (err) return next(err);
            if (post.company._id !== auth._id) res.sendStatus(403);
            res.json(post);
        }).populate('products').populate({ path: 'company', select: 'username' });
    });
});

/* create new */
router.post('/', cors(), (req, res, next) => {
    jwt.verify(req.token, 'secretkey', (err, auth) => {
        if (err || auth.type !== 'company') res.sendStatus(403);
        Order.create(req.body,  (err, post) => {
            if (err) return next(err);
            res.json(post);
        });
    });
});

/* update */
router.put('/:id', cors(),(req, res, next) => {
    jwt.verify(req.token, 'secretkey', (err, auth) => {
        if (err || auth.type !== 'admin') res.sendStatus(403);
        Order.findByIdAndUpdate(req.params.id, req.body,  (err, post) => {
            if (err) return next(err);
            res.json(post);
        });
    });
});

/* delete */
router.delete('/:id', cors(), (req, res, next) => {
    jwt.verify(req.token, 'secretkey', (err, auth) => {
        if (err || auth.type !== 'admin') res.sendStatus(403);
        Order.findByIdAndRemove(req.params.id, req.body,  (err, post) => {
            if (err) return next(err);
            res.json(post);
        });
    });
});

module.exports = router;
