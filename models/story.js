var mongoose = require("mongoose");

var StorySchema = new mongoose.Schema({
	username: String,
	age: String,
	location: String,
	name: String, 
	comments: String,
	perpetrator: String,
	victimGender: String,
	perpetratorGender: String,
	tag: String,
    src: String,
    type: String,
    image: String
});

StorySchema.statics.save = function(username, age, location, storyname, comments, perpetrator, victimGender, perpetratorGender, tag, src, type, image, done) {
	var Story = this;
	Story.create({
		username : username,
		age : age,
		location : location,
		name : storyname,
		comments : comments,
		perpetrator : perpetrator,
		victimGender : victimGender,
		perpetratorGender : perpetratorGender,
		tag : tag,
		src: src,
		type: type,
		image: image
	}, function(err){
		done(err);
	});
};


var Story = mongoose.model('Story', StorySchema);

module.exports = Story;