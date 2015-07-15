Meteor.publish('eatsery', function() {
	return Eatsery.find({}, {sort: {distance: 1}});
});