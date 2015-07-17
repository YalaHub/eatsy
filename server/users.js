Meteor.publish("userData", function () {
	if (this.userId) {
		return Meteor.users.find({_id: this.userId},
			{fields: {
				'admin': 1, 
				'services.google.email': 1,
				'services.google.picture':1,
			}});
	} else {
		this.ready();
	}
});

Meteor.methods({
	setAdmin: function(userId, email) {
		check(userId, String);
		check(email, String);
		if(isAdmin(userId) && Meteor.users.findOne( {services: {
					google: {
						email: email
					}}})) {
			Meteor.users.update({services: {
					google: {
						email: email
					}
				}
			}, {$set: {admin: true}});
		} else {
			throw new  Meteor.Error("add-admin-fail");
		}
	},
});