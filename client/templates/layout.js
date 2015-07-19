Template.layout.onRendered(function() {
	Tracker.autorun(function() {
		if(GoogleMaps.loaded()) {
			var coords = Session.get('location');
			
		}
	});
});
