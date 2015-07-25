Template.locationBar.onRendered(function() {
    GoogleMaps.load({
            v: '3',
            key: 'AIzaSyCc7dxUtKyvEVFk3o-nqvJptwvNxE5WDJo',
            libraries: 'places'
         });

    Tracker.autorun( function(computation) {
        useCurrentLocation(computation);
    });

    this.autorun(function () {
        if (GoogleMaps.loaded()) {
            try{
                var userLocation = document.getElementById('location');
                var autocomplete = new google.maps.places.Autocomplete(userLocation);
                google.maps.event.addListener(autocomplete, 'place_changed', function() {
                    var place = autocomplete.getPlace();

                    var geometry = {
                        "type": "Point",
                        "coordinates": [place.geometry.location.lng(),
                         place.geometry.location.lat()]
                    };

                    Session.set('location', geometry);
                    $('.use-current-location ').show()
                });
            
            } catch(Error) {
                //todo throwError
            }
        } 
    });
});

Template.locationBar.events( {
	'click .use-current-location' : function(e) {
		useCurrentLocation();	
	}
})

useCurrentLocation = function(computation) {
    if(Geolocation) {
        var ETSY_LAT = 40.702637;
        var ETSY_LNG = -73.989406;

        var currLocation = Geolocation.currentLocation();
        var geometry = {"type": "Point"};
        if(currLocation) {
            geometry.coordinates = [currLocation.coords.longitude, 
             currLocation.coords.latitude];
            if(computation) {
                computation.stop();
            }
            useCurrentLocationMessaging();
        } else {
            geometry.coordinates = [ETSY_LNG, 
             ETSY_LAT];

        }
        Session.set('location', geometry);
    }
}

var useCurrentLocationMessaging = function() {
    $('.use-current-location').hide()
    $("#location").attr("placeholder", "Using current location...");
    $("#location").val("");
}