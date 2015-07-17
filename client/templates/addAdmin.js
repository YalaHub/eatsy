Template.addAdmin.events({
	'submit form': function(e) {
		e.preventDefault();
		
		var email = $('#email').val();
		check(email, String);
		Meteor.call('setAdmin', Meteor.userId(), email, function(error, result) {
			if(error) {
				Session.set('addAdminStatus', "Something went wrong! Either you are not an Admin or the email"+
				" you have entered is has not registered!");
			} else {
				Session.set('addAdminStatus', email + " is now an admin!");
			}
		});
	}
})

Template.addAdmin.helpers({
	status: function() {
		return Session.get('addAdminStatus');
	}
});

Template.addAdmin.onRendered( function() {
	Session.set('addAdminStatus', '');
});