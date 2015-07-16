Template.submitEatsery.events({
	'submit form': function(e) {
		e.preventDefault();

		var eatsery = Session.get('eatsery');
		//Todo: block trying to add same eatsery
		var previoslySubmittedEatsery = Eatsery.findOne({placeId: eatsery.placeId});
		if(previoslySubmittedEatsery) {
			console.log("place already inserted!");
			Session.set('eatsery', {});
			return Router.go('eatseryPage', {_id: previoslySubmittedEatsery._id});
		}
		var resultId = Eatsery.insert(eatsery);
		Session.set('eatsery', {});
		Router.go('editEatsery', {_id: resultId});
	}, 

});



Template.submitEatsery.helpers({
  errorMessage: function(field) {
    return Session.get('submitEatseryErrors')[field];
  },
  errorClass: function (field) {
    return !!Session.get('submitEatseryErrors')[field] ? 'has-error' : '';
  },
});


Template.submitEatsery.onRendered(function() {
    this.autorun(function () {
        if (GoogleMaps.loaded()) {
            try{
                var eatseryName = document.getElementById('name');
                var autocomplete = new google.maps.places.Autocomplete(eatseryName);;

                google.maps.event.addListener(autocomplete, 'place_changed', function() {
                	var place = autocomplete.getPlace();
                	var eatsery = {
                		address: place.formatted_address,
                		phone: place.formatted_phone_number,
                		placeId: place.place_id,
                		website: place.website,
                		priceLevel: place.priceLevel,
                		name: place.name,
                		location: place.geometry.location,
                		hasPhoto: false,
                	};
                	Session.set('eatsery', eatsery);
                });
            } catch(Error) {
                console.log('error');
                //todo throwError
            }
        }
    });
});