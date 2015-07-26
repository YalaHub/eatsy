Meteor.publish('eatsery', function(currentLocation) {
	check(currentLocation, Object);
	return Eatsery.find({geometry: {$near: {$geometry: currentLocation}}});
});
Meteor.publish('singleEatsery', function(id) {
  check(id, String)
  return Eatsery.find(id);
});