Meteor.startup(function() {
	Tracker.autorun(function() {
		var location = Session.get('location')
		if(location) {
			Meteor.subscribe('eatsery', location);
		}
	});

	GoogleMaps.load({
		v: '3',
  		key: 'AIzaSyCc7dxUtKyvEVFk3o-nqvJptwvNxE5WDJo',
    	libraries: 'places'
	});
});





