Template.submitEatsery.onCreated(function() {
  Session.set('submitEatseryErrors', {});
  console.log("pre setupFoursquareSearch");
  setupFoursquareSearch(47.22, -122.2);
  console.log("post setupFoursquareSearch");
});

    var foursquareOptions = {
        'client_id'     : 'P4XVVYLP4AEUKISH3PMQ3IVDST00J0SZHDIHOA2Y5V3TCIIY',
        'client_secret' : 'TOVQWYEOEQ0EORP1ZPULWZEFTCPQ3KBOI1ESCEMVQNIWXS3Z',
        'minLength': 3,
        'useVenueSearch': true
    };


// onSearch= function(event, ui) {

//         };

// checkValue= function(e) {
            
//         };

// setupFoursquareSearch = function(lat, lng) {
//             foursquareOptions = _.extend(foursquareOptions, {
//                 latitude: lat,
//                 longitude: lng,
//                 search: _.bind(this.onSearch, this),
//                 appendTo: '.create-event-form'
//             });

//             console.log("setupFoursquareSearch");

//             var clearVenue = _.bind(function() {
//                 this.selectedVenue = null;
//             }, this);

//             // Clear venue after changing text.
//             this.$el.find('#name')
//                 .foursquareAutocomplete(foursquareOptions)
//                 .on('keyup', clearVenue);
//         };

Template.submitEatsery.events({
	'submit form': function(e) {
		e.preventDefault();

		var eatsery = {
			name: $(e.target).find('[name=name]').val(),
			location: $(e.target).find('[name=address]').val(),
			distance: 2
		};

		var resultId = Eatsery.insert(eatsery);
		Router.go('editEatsery', {_id: resultId});

	},

	'input #name': function (e){
		$()
	}
});

console.log("Clan");

Template.submitEatsery.helpers({
  errorMessage: function(field) {
    return Session.get('submitEatseryErrors')[field];
  },
  errorClass: function (field) {
    return !!Session.get('submitEatseryErrors')[field] ? 'has-error' : '';
  },
});