Meteor.startup(function() {
	Tracker.autorun(function() {
		var location = Session.get('location')
		if(location) {
			Meteor.subscribe('eatsery', location);
		}
	});
});





