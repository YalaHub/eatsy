Template.listView.helpers( {
	eatsery: function() {
		if(Distances.find().count() > 0) {
			return Eatsery.find().map(function(eatsery) {
				var distance = Distances.findOne({eatseryId: eatsery._id});
				var eatseryWithDist = _.extend(eatsery, {
					distanceValue: distance.distanceValue,
					distanceText: distance.distanceText,
				});
				return eatseryWithDist;
			}).sort( function(a, b) {
				return a.distanceValue > b.distanceValue;
			});
		} 
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
	});
});

var setDistances = function(response, status){
	if (status == google.maps.DistanceMatrixStatus.OK) {
    	var destinations = response.destinationAddresses;
    	var results = response.rows[0].elements;

		for (var i = 0; i < results.length; i++) {
		    var distanceText = results[i].distance.text;
		    var distanceValue = results[i].distance.value;
	    	var destination  = destinations[i];
	    	var address = response.destinationAddresses[i];
	    	Distances.update({index: i}, {$set: {
	    		distanceText: distanceText,
	    		distanceValue: distanceValue
	    	} });
		}
    } else {
    	console.log("error in set dist function. Google maps Distance matrix did not return okay");
    	//throwError
    }
};

