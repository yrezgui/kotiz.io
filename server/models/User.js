var _		= require('underscore');
var Q		= require('q');
var squel	= require('squel');
var client	= require('../database.js').getClient();

var table	= 'users';

var User = function(infos) {
	this.table = 'users';
};

User.find = function find(query, limit, offset) {
	var deferred	= Q.defer();
	var limit		= limit || 10;
	var offset		= offset || 0;
	var q			= squel.select();

	q.from(table)
		.field('id')
		.field('name')
		.field('google_id')
		.field('photo')
		.where('deleted = false')

		.limit(limit)
		.offset(offset);

	console.log(q.toString());

	client.query(q.toString(), function(err, result) {
		if(err)
			deferred.reject(new Error(err));

		deferred.resolve(result);
	});

	return deferred.promise;
};

User.findByGoogleId = function findById(id) {
	var deferred	= Q.defer();
	var q			= squel.select();

	q.from(table)
		.field('id')
		.field('name')
		.field('google_id')
		.field('photo')
		.where('deleted = false')
		.where('id = "' + id + '"')
		.limit(1);

	console.log(q.toString());

	client.query(q.toString(), function(err, result) {
		if(err)
			deferred.reject(new Error(err));

		deferred.resolve(result);
	});

	return deferred.promise;
};

User.add = function add(infos) {
	var q			= squel.insert();
	var now			= new Date().getTime();
	var deferred	= Q.defer();

	q.into(table)
		.set('name', infos.name)
		.set('google_id', infos.google_id)
		.set('photo', infos.photo)
		.set('type', infos.type)
		.set('created', now)
		.set('updated', now)
		.set('deleted', false);

	console.log(q.toString());

	client.query(q.toString(), function(err, result) {
		if(err)
			deferred.reject(new Error(err));
		
		deferred.resolve(result);
	});

	return deferred.promise;
};

module.exports = User;