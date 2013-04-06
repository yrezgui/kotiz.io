//Dev requires
var open	= require('open');

//Common requires
var config	= require('./server/config.js');
var db		= require('./server/database.js');

db.connect().then(function apiServer_Start(result){

	console.log('SUCESS : Database connection OK');

	var apiServer	= require('./server/server.js');
	var users		= require('./server/routes/users.js');

	apiServer.get('/users', users.all);

	apiServer.listen(config.server.port);
	
	console.log('Listening on port ' + config.server.port);
	open(config.server.protocol + '://' + config.server.host + ':' + config.server.port + '/users');
});

