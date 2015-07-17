getImagePath = function(id) {
	var eatsery = Eatsery.findOne(id);
	if(eatsery && eatsery.hasPhoto) {
		return '/' + id + '.jpg';
	} else {
		return '/default.jpg';
	}
};

getDistanceText= function(id) {
	check(id, String);
	var distance = Distances.findOne({eatseryId: id});
	if(distance) {
		return distance.distanceText;
	}
};
