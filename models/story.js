var mongoose = require('mongoose');

var storySchema = mongoose.Schema({
    date: Date,
    duration: Number,
    src: String
});

module.exports = mongoose.model('Story', storySchema);