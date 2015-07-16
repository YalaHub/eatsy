isAdmin = function(userId) {
	// var user = Meteor.users.findOne({_id: userId});
	// return user.admin;
	console.log("is admin");
	return true;
	
};

augmentWithDistanceInfo= function(eatsery) {
	if(Distances.find().count() > 0) {	
		var distance = Distances.findOne({eatseryId: eatsery._id});
		_.extend(eatsery, {
			distanceValue: distance.distanceValue,
			distanceText: distance.distanceText,
		});
	}
}
