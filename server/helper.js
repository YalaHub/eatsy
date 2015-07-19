isAdmin = function(userId) {
	check(userId, String);
	return userId; //&& Meteor.users.findOne({_id: userId}).admin;
};