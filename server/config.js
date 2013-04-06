module.exports = {
	server: {
		protocol: 'http',
		host: 'localhost',
		port: 3031
	},
	google: {
		key: 'GOOGLE_API_KEY',
		secret: 'GOOGLE_API_SECRET',
		callback: 'http://localhost:3031'
	},
	postgres : {
		dev: 'tcp://USERNAME:PASSWORD@HOST:PORT/DATABASE',
	}
};