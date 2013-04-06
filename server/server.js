//Common requires
var express	= require('express');
var app		= express();

//Config requires
var config = require('./config.js');



function error(status, msg) {
	var err = new Error(msg);
	err.status = status;
	return err;
}

app.use(app.router);

// middleware with an arity of 4 are considered
// error handling middleware. When you next(err)
// it will be passed through the defined middleware
// in order, but ONLY those with an arity of 4, ignoring
// regular middleware.
app.use(function(err, req, res, next){
	// whatever you want here, feel free to populate
	// properties on `err` to treat it differently in here.
	res.send(err.status || 500, { error: err.message });
});

// our custom JSON 404 middleware. Since it's placed last
// it will be the last middleware called, if all others
// invoke next() and do not respond.
app.use(function(req, res){
	res.send(404, { error: "Lame, can't find that" });
});

module.exports = app;