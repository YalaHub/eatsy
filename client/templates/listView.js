Template.listView.helpers( {
	eatsery: function() {
		if(Distances.find().count() > 0) {
			return Eatsery.find().map(function(eatsery) {
				var distance = Distances.findOne({eatseryId: eatsery._id});
				if(distance.distanceValue) {
					_.extend(eatsery, {
						distanceValue: distance.distanceValue,
						distanceText: distance.distanceText,
					});
					return eatsery;
				} else {
					_.extend(eatsery, { noDist: true});
					return eatsery;
				}
			}).filter( function(eatsery) {
				return ! eatsery.noDist;
			}).sort( function(a, b) {
				return a.distanceValue - b.distanceValue;
			});
		} 
	},
});

