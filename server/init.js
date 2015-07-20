Meteor.startup(function() {
	
	Eatsery._ensureIndex({'geometry':'2dsphere'}); 

	geo = new GeoCoder({
	  geocoderProvider: "google",
	  httpAdapter: "https",
	  apiKey: 'AIzaSyAPT4FrJ0xS1Fs4HNKYbD86zXTz5niCw3c'
	});
	
	Eatsery.find().map( function(eatsery) {return geoCode(eatsery)} ).map(
		function(eatsery) {
			geoTest(eatsery);
		});
});

//TEMP SCRIPT
//This function is used to backfill geoJson information for older eatseries. 
var geoCode = function(eatsery, index, arr) {
	var latLong = geo.geocode(eatsery.address);

	Eatsery.update( {_id: eatsery._id}, {$set: {
		"geometry": {
    		"type": "Point",
    		"coordinates": [latLong[0].longitude, latLong[0].latitude]
  		},}
  	});

  	var result = Eatsery.findOne({_id: eatsery._id});
  	return result;
}

//This function is use to ensure backfill worked. 
var geoTest = function(eatsery, index, arr) {
	if( ! ( eatsery.geometry) ) {
		throw Meteor.Error("geo-code-fail", "There are still Eatseries with out LatLongs!", 
			"The following eatsery failed " + eatsery);
	}
}