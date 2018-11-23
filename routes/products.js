const express = require('express');
const router = express.Router([]);
const mongoose = require('mongoose');
const Product = require('../models/product');
const cors = require('cors');
const jwt = require('jsonwebtoken');

router.options('*', cors());

/* list */
router.get('/', cors(), (req, res, next) => {
    jwt.verify(req.token, 'secretkey', (err, { user }) => {
        if (err) res.sendStatus(403);
        Product.find( (errP, products) => {
            if (!products) {
                res.json([]);
            } else {
                if (errP) return next(errP);
                res.json(products);
            }
        });
    });
});

/* list by a property*/
router.get('/:prop/:valueprop', cors(), (req, res, next) => {
    jwt.verify(req.token, 'secretkey', (err, { user }) => {
        if (err) res.sendStatus(403);
        const { prop, valueprop} = req.params;
        const props = {};
        props[prop] = valueprop;
        Product.find(props, (errP, products) => {
            if (!products) {
                res.json([]);
            } else {
                if (errP) return next(errP);
                return res.json(products);
            }
        });
    });
});

/* list by id */
router.get('/:id', cors(), (req, res, next) =>{
    jwt.verify(req.token, 'secretkey', (err, { user }) => {
        if (err) res.sendStatus(403);
        Product.findById(req.params.id,  (errP, post) => {
            if (errP) return next(errP);
            res.json(post);
        });
    });
});

/* create new */
router.post('/', cors(), (req, res, next) => {
    jwt.verify(req.token, 'secretkey', (err, { user }) => {
        if (err || user.type !== 'admin') res.sendStatus(403);
        Product.create(req.body,  (errP, post) => {
            if (errP) return next(errP);
            res.json(post);
        });
    });
});

/* update */
router.put('/:id', cors(),(req, res, next) => {
    jwt.verify(req.token, 'secretkey', (err, { user }) => {
        if (err || user.type !== 'admin') res.sendStatus(403);
        Product.findByIdAndUpdate(req.params.id, req.body,  (errP, post) => {
            if (errP) return next(errP);
            res.json(post);
        });
    });
});

/* delete */
router.delete('/:id', cors(), (req, res, next) => {
    jwt.verify(req.token, 'secretkey', (err, { user }) => {
        if (err || user.type !== 'admin') res.sendStatus(403);
        Product.findByIdAndRemove(req.params.id, req.body,  (errP, post) => {
            if (errP) return next(errP);
            res.json(post);
        });
    });
});

module.exports = router;
