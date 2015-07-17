getImagePath = function(id) {
	var eatsery = Eatsery.findOne(id);
	if(eatsery && eatsery.photoUrl) {
		return eatsery.photoUrl;
	} else {
		return 'http://i.imgur.com/03yOCNQ.png?1';
	}
};

getDistanceText= function(id) {
	check(id, String);
	var distance = Distances.findOne({eatseryId: id});
	if(distance) {
		return distance.distanceText;
	}
};
