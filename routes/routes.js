var mongoose = require('mongoose');

module.exports = function(app) {
	app.get('/', function(req, res) {
		res.render( 'index.ejs');
	});
	app.get('/contract', function(req, res) {
		res.render( 'contract.ejs');
	});
	app.get('/connect', function(req, res) {
		res.render( 'connect.ejs');
	});
};