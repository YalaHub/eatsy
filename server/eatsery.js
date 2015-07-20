Meteor.publish('eatsery', function(currentLocation) {
	check(currentLocation, Object);
	return Eatsery.find({geometry: {$near: {$geometry: currentLocation}}});
});

Meteor.methods({
	addEatsery: function(eatsery, userId) {
		check(eatsery, {
			name: String,
			address: String,
			placeId: String,
			geometry: Object,
			phone: Match.Optional(String),
			website: Match.Optional(String),
		});	
		check(userId, String);
		
		var existingEatsery = Eatsery.findOne({placeId: eatsery.placeId});
		if(existingEatsery) {
			return {
				eatseryExists: true,
				_id: existingEatsery._id
			};
		}

		if(isAdmin(userId)) {
			// for(var i = 0; i < 2; i ++) {
			// 	var eatseryId = Eatsery.insert(eatsery);
			// }
			var eatseryId = Eatsery.insert(eatsery);
			return {_id: eatseryId};
		} else {
			throw new Meteor.Error("Creating new eatseries is only available to admin!");
		}
	}
});

Eatsery.allow( {
	update: function(userId, eatsery, fieldNames, modifier) {
		return isAdmin(userId);
	},
	remove: function(userId, eatsery) {return isAdmin(userId)}
});

Eatsery.deny( {
	update: function(userId, eatsery, fieldNames, modifier) {
		check( modifier.$set, {
			photoUrl: String}
		);
		var result = _.without(fieldNames, 'photoUrl').length !== 0;
		return result;
	}
})