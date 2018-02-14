const express = require('express');
const bodyParser = require('body-parser');

const leaderRouter = express.Router();

leaderRouter.use(bodyParser.json());

leaderRouter.route('/:leaderId?')
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req,res,next) => {
		var leader = req.params.leaderId;
		if (!leader) {
			res.end('Will send all the leaders to you!');
		} else {
			res.end('Will send you leader: ' + leader);
		}
})
.post((req, res, next) => {
    res.end('Will add the leader: ' + req.body.name + ' with details: ' + req.body.description);
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /leaders');
})
.delete((req, res, next) => {
		var leader = req.params.leaderId;
		if (!leader) {
			res.end('Deleting all leaders!');
		} else {
			res.end('Deleting leader: ' + leader);
		}
});

module.exports = leaderRouter;
