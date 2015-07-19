Template.eatseryPage.events( {
	'click .delete-eatsery ': function() {
		if(confirm("Are you sure you want to remove this Eatsery?")) {
			Eatsery.remove({_id: this._id});
			Router.go('listView');
		}
	}
});

Template.eatseryPage.helpers( {
	isAdmin: function() {
		return Meteor.user();// && Meteor.user().admin;
	}
})