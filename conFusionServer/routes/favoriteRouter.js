const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var authenticate = require('../authenticate');

const cors = require('./cors');
const Favoritess = require('../models/favorites');

const favoriteRouter = express.Router();

favoriteRouter.use(bodyParser.json());

favoriteRouter.route('/')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get(cors.cors, (req,res,next) => {
	Favorites.find({'poster': req.decoded._doc._id})
	.populate('poster')
	.populate('dishes')
	.then((favorites) => {
			res.statusCode = 200;
			res.setHeader('Content-Type', 'application/json');
			res.json(favorites);
	}, (err) => next(err))
  .catch((err) => next(err));
})
.post(cors.corsWithOptions, authenticate.verifyOrdinaryUser, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
	Favorites.findOne({'poster': req.decoded._doc._id})
	.then((favorite) => {
		if (!favorite) {
			Favorites.create(req.body)
			.then((favorite) => {
				console.log('Favorites created!', favorite);
				favorite.poster = req.decoded._doc._id;
				favorite.dishes.push(req.body._id);
				favorite.save()
				.then((favorite) => {
					res.statusCode = 200;
					res.setHeader('Content-Type', 'application/json');
					res.json(favorite);
				}, (err) => next(err));
			}
		} else {
			var dish = req.body._id;

			if (favorite.dishes.indexOf(dish) == -1) {
				favorite.dishes.push(dish);
			}
			favorite.save()
			.then((favorite) => {
					res.statusCode = 200;
					res.setHeader('Content-Type', 'application/json');
					res.json(favorite);
			}, (err) => next(err));
		}
	});
})
.delete(cors.corsWithOptions, authenticate.verifyOrdinaryUser, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
	Favorites.remove({'poster': req.decoded._doc._id})
	.then((resp) => {
		res.statusCode = 200;
		res.setHeader('Content-Type', 'application/json');
		res.json(resp);
	}, (err) => next(err))
	.catch(err) => next(err));
});

favoriteRouter.route('/:dishId')
.post(cors.corsWithOptions, authenticate.verifyOrdinaryUser, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
	Favorites.findOne({'poster': req.decoded._doc._id})
	.then((favorite) => {
		if (!favorite) {
			Favorites.create(req.body)
			.then((favorite) => {
				console.log('Favorites created!', favorite);
				favorite.poster = req.decoded._doc._id;
				favorite.dishes.push(req.params.dishId);
				favorite.save()
				.then((favorite) => {
					res.statusCode = 200;
					res.setHeader('Content-Type', 'application/json');
					res.json(favorite);
				}, (err) => next(err));
			}
		} else {
			var dish = req.body._id;

			if (favorite.dishes.indexOf(dish) == -1) {
				favorite.dishes.push(dish);
			}
			favorite.save()
			.then((favorite) => {
					res.statusCode = 200;
					res.setHeader('Content-Type', 'application/json');
					res.json(favorite);
			}, (err) => next(err));
		}
	});
})
.delete(cors.corsWithOptions, authenticate.verifyOrdinaryUser, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
	Favorites.findOneAndUpdate({'poster': req.decoded._doc._id}, {
		$pull: {
			dishes: req.params.dishId
		}
	}, function(err, favorite) {
		if (err) next(err);
		Favorites.findOne({
			'poster': req.decoded._doc._id
		}, function(err, favorite) {
			res.json(favorite);
		});
	});
});

module.exports = favoriteRouter;

