const express = require('express');
const bodyParser = require('body-parser');
const authenticate = require('../authenticate')

const Promotions = require('../models/promotions');

const promotionRouter = express.Router();

promotionRouter.use(bodyParser.json());

promotionRouter.route('/')
.get((req,res,next) => {
    Promotions.find((promo) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promo);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(authenticate.verifyuser, (req,res,next) => {
    Promotions.create(req.body)
    .then((promo) => {
        console.log('Promo created', promo);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promo);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put(authenticate.verifyuser, (req,res,next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /promotions');
})
.delete(authenticate.verifyuser, (req,res,next) => {
    Promotions.remove({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Contremt-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});

promotionRouter.route('/:promoId')
.get((req,res,next) => {
    Promotions.fingdById(req.params.promoId)
    .then((promo) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promo);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(authenticate.verifyuser, (req, res, next) => {
  res.statusCode = 403;
  res.end('POST operation not supported on /promotions/'+ req.params.promoId);
})
.put(authenticate.verifyuser, (req, res, next) => {
  Promotions.findByIdAndUpdate(req.params.promoId, {
      $set: req.body
  }, {new: true})
  .then((promo) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(promo);
  }, (err) => next(err))
  .catch((err) => next(err));
})
.delete(authenticate.verifyuser, (req, res, next) => {
    Promotions.findByIdAndRemove(req.params.promoId)
    .then((promo) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promo);
    }, (err) => next(err))
    .catch((err) => next(err));
});


module.exports = promotionRouter;