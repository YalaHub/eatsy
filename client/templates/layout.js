Template.layout.onRendered(function() {
	Tracker.autorun(function() {
		if(GoogleMaps.loaded()) {
			var service = new google.maps.DistanceMatrixService();
			var coords = Session.get('location');
			if(coords) {
				var origin = new google.maps.LatLng(Number(coords.lat), Number(coords.lng));
				if(origin) {
					service.getDistanceMatrix({
					    origins: [origin],
					    destinations: Eatsery.find().map(function(eatsery, index) {
					    	if(Distances.findOne({index: index})) {
								Distances.update({index: index}, {$set: {
		    						eatseryId: eatsery._id,
		    					} });
							} else {
								Distances.insert({
									index: index,
									eatseryId: eatsery._id,
								});
							}
					    	return String(eatsery.address);
					    }),
					    travelMode: google.maps.DirectionsTravelMode.DRIVING,
					    unitSystem: google.maps.UnitSystem.IMPERIAL,
				 	}, setDistances);
				}
			}
		}
	});
});

var setDistances = function(response, status){
	try{
		if (status == google.maps.DistanceMatrixStatus.OK) {
	    	var destinations = response.destinationAddresses;
	    	var results = response.rows[0].elements;

			for (var i = 0; i < results.length; i++) {
				if(results[i] && results[i].distance &&
				   results[i].distance.text && results[i].distance.value ) {
				    var distanceText = results[i].distance.text;
				    var distanceValue = results[i].distance.value;
			    	var destination  = destinations[i];
			    	var address = response.destinationAddresses[i];
			    	Distances.update({index: i}, {$set: {
			    		distanceText: distanceText,
			    		distanceValue: distanceValue
			    	} });
		    	}
			}
	    } 
	} catch(error) {
    	console.log("Something wrong with distance calculations!");
    };
};