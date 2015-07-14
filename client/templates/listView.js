Template.listView.helpers( {
	eatsery: function() {
		return Eatsery.find({}, {sort: {distance: -1}});
	}
});