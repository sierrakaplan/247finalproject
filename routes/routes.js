var mongoose = require('mongoose');
var WeekModel = mongoose.model('Week', mongoose.Schema.Week); 

module.exports = function(app) {
	app.get('/', function(req, res) {
		return WeekModel.find(function (err, weeks) {
    		if (!err) {
    			console.log(weeks);
      			return res.send(weeks);
    		} else {
      			return console.log(err);
    		}
  		});
	});
};