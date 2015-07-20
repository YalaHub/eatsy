Template.header.onRendered(function() {
    init();
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
                });
            
            } catch(Error) {
                //todo throwError
            }
            if(Geolocation) {
                var currLocation = Geolocation.currentLocation();
                if(currLocation) {
                    var geometry = {
                        "type": "Point",
                        "coordinates": [currLocation.coords.longitude,
                         currLocation.coords.latitude]
                    };
                    Session.set('location', geometry);
                    $("#location").attr("placeholder", "Using current location..");
                }
            }
        } 
    });
});

Template.header.helpers( {
    isAdmin: function() {
        return Meteor.user() && Meteor.user().admin;
    }
});


//Stuff for header collapse
function hasClass(element, className) {
    return (' ' + element.className + ' ').indexOf(' ' + className + ' ') > -1;
}
function init() {
    window.addEventListener('scroll', function(e){
        var distanceY = window.pageYOffset || document.documentElement.scrollTop,
            shrinkOn = 200,
            header = document.getElementById("header");
            content = document.getElementById("content");
        if (distanceY > shrinkOn) {
            header.classList.add("smaller");
            content.classList.add("content-smaller");
        } if (distanceY < 150) {
            if (hasClass(header,"smaller")) {
                header.classList.remove("smaller");
                content.classList.remove("content-smaller");
            }
        }
    });
}
