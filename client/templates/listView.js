Template.listView.helpers( {
	eatsery: function() {
		return Eatsery.find().map(function(eatsery, index, arr) {
			return augmentWithDistance(eatsery);
		}).sort( function(a,b) {
			return a.distanceValue - b.distanceValue;
		}); 
	},
});

