const express = require('express');
const router = express.Router([]);
const mongoose = require('mongoose');
const Product = require('../models/product');
const cors = require('cors');

router.options('*', cors());

/* list */
router.get('/', cors(), (req, res, next) => {
  Product.find( (err, products) => {
      if (!products) {
          res.json([]);
      } else {
          if (err) return next(err);
          res.json(products);
      }
  });
});

/* list by a property*/
router.get('/:prop/:valueprop', cors(), function(req, res, next) {
    const { prop, valueprop} = req.params;
    const props = {};
    props[prop] = valueprop;
    Product.find(props, (err, products) => {
        if (!products) {
            res.json([]);
        } else {
            if (err) return next(err);
            return res.json(products);
        }
    });
});

/* list by id */
router.get('/:id', cors(), (req, res, next) =>{
  Product.findById(req.params.id,  (err, post) => {
    if (err) return next(err);
    res.json(post);
  });
});

/* create new */
router.post('/', cors(), (req, res, next) => {
  Product.create(req.body,  (err, post) => {
    if (err) return next(err);
    res.json(post);
  });
});

/* update */
router.put('/:id', cors(),(req, res, next) => {
  Product.findByIdAndUpdate(req.params.id, req.body,  (err, post) => {
    if (err) return next(err);
    res.json(post);
  });
});

/* delete */
router.delete('/:id', cors(), (req, res, next) => {
  Product.findByIdAndRemove(req.params.id, req.body,  (err, post) => {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
