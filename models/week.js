var mongoose = require('mongoose');

var weekSchema = mongoose.Schema({
    title: String,
    startDate: Date,
    endDate: Date,
    quote: String, 
    author: String,
    stories: [{ type: mongoose.Schema.ObjectId, ref: 'Story' }]
});

module.exports = mongoose.model('Week', weekSchema);