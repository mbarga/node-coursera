const express = require('express');
const bodyParser = require('body-parser');

const promoRouter = express.Router();

promoRouter.use(bodyParser.json());

promoRouter.route('/:promoId?')
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req,res,next) => {
		var promo = req.params.promoId;
		if (!promo) {
			res.end('Will send all the promotions to you!');
		} else {
			res.end('Will send you promotion: ' + promo);
		}
})
.post((req, res, next) => {
    res.end('Will add the promo: ' + req.body.name + ' with details: ' + req.body.description);
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /promotions');
})
.delete((req, res, next) => {
		var promo = req.params.promoId;
		if (!promo) {
			res.end('Deleting all promotions!');
		} else {
			res.end('Deleting promo: ' + promo);
		}
});

module.exports = promoRouter;
