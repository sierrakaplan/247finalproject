var mongoose = require("mongoose");

var StorySchema = new mongoose.Schema({
	username: String,
	age: String,
	location: String,
	storyname: String, 
	comments: String,
	perpetrator: String,
	victimGender: String,
	perpetratorGender: String,
	tag: String
});

StorySchema.statics.save = function(username, age, location, storyname, comments, perpetrator, victimGender, perpetratorGender, tag, done) {
	var Story = this;
	Story.create({
		username : username,
		age : age,
		location : location,
		storyname : storyname,
		comments : comments,
		perpetrator : perpetrator,
		victimGender : victimGender,
		perpetratorGender : perpetratorGender,
		tag : tag
	}, function(err){
		done(err);
	});
};


var Story = mongoose.model('story', StorySchema);

module.exports = Story;