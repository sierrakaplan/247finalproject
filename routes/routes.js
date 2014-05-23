var mongoose = require('mongoose');
var Week = require('../models/week.js');

module.exports = function(app) {
	app.get('/', function(req, res) {
		return Week.find(function (err, weeks) {
    		if (!err) {
    			console.log("No error!");
    			console.log(weeks);
      			return res.render('index.ejs', { weeks: weeks});
    		} else {
    			console.log("Error!");
      			return console.log(err);
    		}
  		});
	});
};