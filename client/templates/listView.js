Template.listView.helpers( {
	eatsery: function() {
		return Eatsery.find({}, {sort: {distance: 1}});
	},
});

Template.listView.onRendered(function() {
	Tracker.autorun(function() {
		if(GoogleMaps.loaded()) {
			var service = new google.maps.DistanceMatrixService();
			var coords = Session.get('location');
			var origin = new google.maps.LatLng(Number(coords.lat), Number(coords.lng));
			if(origin) {
				service.getDistanceMatrix({
				    origins: [origin],
				    destinations: Eatsery.find().map(function(eatsery) {
				    	return eatsery.address;
				    }),
				    travelMode: google.maps.DirectionsTravelMode.DRIVING,
				    unitSystem: google.maps.UnitSystem.IMPERIAL,
			 	}, setDistances);
			}
		}
	});
});

var setDistances = function(response, status){
	if (status == google.maps.DistanceMatrixStatus.OK) {
    	var destinations = response.destinationAddresses;
    	var results = response.rows[0].elements;
    	var distances = {};

		for (var i = 0; i < results.length; i++) {
		    var distanceText = results[i].distance.text;
		    var distanceVal = results[i].distance.value;
	    	var destination  = destinations[i];
	    	distances[destination]= {
	    		distText: distanceText,
	    		distVal: distanceVal
	    	};
	    	
		}
		console.log(distances);
    } else {
    	console.log("error");
    }
};

