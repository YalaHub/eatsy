Template.locationBar.onRendered(function() {
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
            useCurrentLocation();
        } 
    });
});

Template.locationBar.events( {
	'click .use-current-location' : function(e) {
		useCurrentLocation();	
	}
})

var useCurrentLocation = function() {
    if(Geolocation) {
        var currLocation = Geolocation.currentLocation();
        if(currLocation) {
            var geometry = {
                "type": "Point",
                "coordinates": [currLocation.coords.longitude,
                 currLocation.coords.latitude]
            };
            Session.set('location', geometry);
            $('.use-current-location').hide()
            $("#location").attr("placeholder", "Using current location...");
            $("#location").val("");

        }
    }
}