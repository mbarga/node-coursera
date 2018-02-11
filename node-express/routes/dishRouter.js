const express = require('express');
const bodyParser = require('body-parser');

const dishRouter = express.Router();

dishRouter.use(bodyParser.json());

dishRouter.route('/:dishId?')
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req,res,next) => {
		var dish = req.params.dishId;
		if (!dish) {
			res.end('Will send all the dishes to you!');
		} else {
			res.end('Will send you dish: ' + dish);
		}
})
.post((req, res, next) => {
    res.end('Will add the dish: ' + req.body.name + ' with details: ' + req.body.description);
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /dishes');
})
.delete((req, res, next) => {
		var dish = req.params.dishId;
		if (!dish) {
			res.end('Deleting all dishes!');
		} else {
			res.end('Deleting dish: ' + dish);
		}
});

module.exports = dishRouter;
