var _	= require('underscore');
var Q	= require('q');

var config	= require('../config.js');
var User	= require('../models/User.js');

exports.all = function all(req, res) {
	User
		.find(null, req.limit, req.offset)

		.then(function(result) {
			res.send(result.rows);
		});
};

exports.get = function all(req, res) {
	User
		.findById(req.params.id)

		.then(function(result) {
			if(!result)
				res.send(null);

			res.send(result.rows[0]);
		});
};

exports.login = function all(req, res) {
	User
		.findById(req.params.id)

		.then(function(result) {
			if(!result)
				res.send(null);

			res.send(result.rows[0]);
		});
};



exports.login = function all(req, res) {
	
};
