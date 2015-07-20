Template.addEatsery.events({
	'submit form': function(e) {
		e.preventDefault();
		var eatsery = Session.get('eatsery');
        if(eatsery && eatsery.placeId) {
            Meteor.call('addEatsery', eatsery, Meteor.userId() , function(error, result) {
                Session.set('eatsery', {});
                if(error) {
                    //throw error.reason
                    console.log("Error " + error);
                }

                if(result && result.eatseryExists) {
                    //throw error eatsery exists
                    return Router.go('eatseryPage', {_id: result._id})
                }
                return Router.go('editEatsery', {_id: result._id});

            });
        }
	}, 

});



Template.addEatsery.helpers({
  errorMessage: function(field) {
    return Session.get('submitEatseryErrors')[field];
  },
  errorClass: function (field) {
    return !!Session.get('submitEatseryErrors')[field] ? 'has-error' : '';
  },
});


Template.addEatsery.onRendered(function() {
    this.autorun(function () {
        if (GoogleMaps.loaded()) {
            try{
                var eatseryName = document.getElementById('name');
                var autocomplete = new google.maps.places.Autocomplete(eatseryName);

                google.maps.event.addListener(autocomplete, 'place_changed', function() {
                	var place = autocomplete.getPlace();
                    var location = place.geometry.location;

                    var geometry = {
                        "type": "Point",
                        "coordinates": [location.lng(), location.lat()]
                    }
                	var eatsery = {
                		name: place.name,
                        address: place.formatted_address,
                        geometry: geometry,
                        placeId: place.place_id,
                	};

                    if(place.website) {
                        _.extend(eatsery, {
                            website: place.website
                        });
                    }
                    if(place.formatted_phone_number) {
                        _.extend(eatsery, {
                            phone: place.formatted_phone_number
                        });
                    }

                	Session.set('eatsery', eatsery);
                });
            } catch(Error) {
                console.log('error');
                //todo throwError
            }
        }
    });
});