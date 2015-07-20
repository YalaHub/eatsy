Meteor.startup(function() {
	
	Eatsery._ensureIndex({'geometry':'2dsphere'}); 

	geo = new GeoCoder({
	  geocoderProvider: "google",
	  httpAdapter: "https",
	  apiKey: 'AIzaSyAPT4FrJ0xS1Fs4HNKYbD86zXTz5niCw3c'
	});
	
});