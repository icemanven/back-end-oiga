const express = require('express');
const router = express.Router([]);
const mongoose = require('mongoose');
const Order = require('../models/order');
const cors = require('cors');

router.options('*', cors());

/* list */
router.get('/', cors(), (req, res, next) => {
  Order.find( (err, orders) => {
      if (!orders) {
          res.json([]);
      } else {
          if (err) return next(err);
          res.json(orders);
      }
  }).populate({ path: 'company', select: 'username' });
});

/* list by a property*/
router.get('/:prop/:valueprop', cors(), function(req, res, next) {
    const { prop, valueprop} = req.params;
    const props = {};
    props[prop] = valueprop;
    Order.find(props, (err, orders) => {
        if (!orders) {
            res.json([]);
        } else {
            if (err) return next(err);
            return res.json(orders);
        }
    }).populate({ path: 'company', select: 'username' });
});

/* list by id */
router.get('/:id', cors(), (req, res, next) =>{
  Order.findById(req.params.id,  (err, post) => {
    if (err) return next(err);
    res.json(post);
  }).populate('products').populate({ path: 'company', select: 'username' });
});

/* create new */
router.post('/', cors(), (req, res, next) => {
  Order.create(req.body,  (err, post) => {
    if (err) return next(err);
    res.json(post);
  });
});

/* update */
router.put('/:id', cors(),(req, res, next) => {
  Order.findByIdAndUpdate(req.params.id, req.body,  (err, post) => {
    if (err) return next(err);
    res.json(post);
  });
});

/* delete */
router.delete('/:id', cors(), (req, res, next) => {
  Order.findByIdAndRemove(req.params.id, req.body,  (err, post) => {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
