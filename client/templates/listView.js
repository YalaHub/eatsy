Template.listView.helpers( {
	eatsery: function() {
		if(Distances.find().count() > 0) {
			return Eatsery.find().map(function(eatsery) {
				var distance = Distances.findOne({eatseryId: eatsery._id});
				_.extend(eatsery, {
					distanceValue: distance.distanceValue,
					distanceText: distance.distanceText,
				});
				return eatsery;
			}).sort( function(a, b) {
				return a.distanceValue - b.distanceValue;
			});
		} 
	},
});

