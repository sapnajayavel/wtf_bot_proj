var express = require('express');
var request = require('request');
var router = express.Router();

module.exports = function() {

	router.get('/', function(req, res) {
		res.send('Option Home');
	});

	

	router.get('/getQuestions', function(req, res) {
		console.log(req.user);
		var Questions = require(__base + 'models/tellmequestionlists');

		// get all the users
		Questions.find({}, function(err, questions) {
			if (err) next(err);

			// object of all the users
			console.log(questions);
			res.json(questions);
		});

	});


	return router;
}