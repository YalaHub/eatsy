Template.listView.helpers( {
	eatsery: function() {
		console.log(Eatsery.find().count());
		return Eatsery.find();
	}
});