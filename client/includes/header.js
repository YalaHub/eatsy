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
window.onload = init();

var chosenLocation = {};

Template.header.onRendered(function() {
    this.autorun(function () {
        if (GoogleMaps.loaded()) {
            try{
                var userLocation = document.getElementById('location');
                var autocomplete = new google.maps.places.Autocomplete(userLocation);
                google.maps.event.addListener(autocomplete, 'place_changed', function() {
                    var place = autocomplete.getPlace();
                    var coords = {
                        lat: place.geometry.location.lat(),
                        lng: place.geometry.location.lng()
                    };
                    Session.set('location', coords);
                });
            
            } catch(Error) {
                console.log('error');
                //todo throwError
            }
        }
        if(Geolocation) {
            var currLocation = Geolocation.currentLocation();
            if(currLocation) {
                var coords = {
                    lat: currLocation.coords.latitude,
                    lng: currLocation.coords.longitude
                };
                Session.set('location', coords);
                $("#location").attr("placeholder", "Using current location..");
            }
        }
    });
});
