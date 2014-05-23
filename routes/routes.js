var mongoose = require('mongoose');
var Week = require('../models/week.js');

module.exports = function(app) {
	app.get('/', function(req, res) {
		res.render( 'index.ejs');
	});
};