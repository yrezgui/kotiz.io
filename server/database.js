var Q		= require('q');
var pg		= require('pg');
var config	= require('./config.js');

var database = function database() {
	var _self = this;
	this.client = null;

	this.connect = function connect() {
		var deferred = Q.defer();

		if(_self.client !== null) {
			deferred.resolve(_self.client);
		}

		else {
			var client = new pg.Client(config.postgres.dev);
			client.connect(function(err) {
				if(err) {
					console.log('ERROR : Database connection', err);
					deferred.reject(new Error(err));
					process.exit(1);
				}

				_self.client = client;
				deferred.resolve(client);
			});
		}

		return deferred.promise;
	};

	this.getClient = function getClient() {
		return _self.client;
	}
};

module.exports = new database();