getImagePath = function(id) {
	var eatsery = Eatsery.findOne(id);
	if(eatsery.hasPhoto) {
		return '/' + id + '.jpg';
	} else {
		return '/default.jpg';
	}
};