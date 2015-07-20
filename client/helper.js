getImagePath = function(id) {
	var eatsery = Eatsery.findOne(id);
	if(eatsery && eatsery.photoUrl) {
		return eatsery.photoUrl;
	} else {
		return 'http://i.imgur.com/03yOCNQ.png?1';
	}
};



//May not set distance text if location isnt set.
augmentWithDistance= function(eatsery) {
	var origin = convertToLatLong(Session.get('location'));
	if(origin) {
		//Converting from GeoJSON format to use geoLib
		var dest = convertToLatLong(eatsery.geometry);
		var accuracy = 1; //Set distances to in 10's of meters


		var distance = geolib.getDistance(origin, dest, accuracy);
		_.extend(eatsery, {
			distanceText : getDistanceText(distance),
			distanceValue: distance
		});
		return eatsery;
	}
};

//Do some stuff between switching to ft, to miles, etc
var getDistanceText = function( distance ) {
	var MILE_BREAK_POINT = 160;


	if(distance < MILE_BREAK_POINT) {
		return metersToFeet(distance).toPrecision(2) + " ft";
	} else {
		return metersToMile(distance).toPrecision(3) + " mi";
	}
	return distance;
};

var convertToLatLong = function(geoJson) {
	if(geoJson && geoJson.coordinates) {
		//Converting from GeoJSON format to use geoLib
		var coords = {
			latitude: geoJson.coordinates[1], 
			longitude: geoJson.coordinates[0]
		}
		return coords;
	} 
};

var metersToFeet= function (meters) {
	var feetInMeter = 3.28084;
	return convertDist(meters, feetInMeter);
}

var metersToMile = function (meters) {
	var milesInMeter = 0.000621371;
	return convertDist(meters, milesInMeter);
}

var convertDist = function(meters, scale) {
	return meters * scale;
}







