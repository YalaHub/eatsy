Template.submitEatsery.onCreated(function() {
  Session.set('submitEatseryErrors', {});
});

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
	'input #name': function(e) {
		$('#my_input').fs_suggest({
		    'client_id'     : 'P4XVVYLP4AEUKISH3PMQ3IVDST00J0SZHDIHOA2Y5V3TCIIY',
		    'client_secret' : 'TOVQWYEOEQ0EORP1ZPULWZEFTCPQ3KBOI1ESCEMVQNIWXS3Z',
		    'll' : '37.787920,-122.407458', 
		    'limit' : 10 
		});
	}
});

Template.submitEatsery.helpers({
  errorMessage: function(field) {
    return Session.get('submitEatseryErrors')[field];
  },
  errorClass: function (field) {
    return !!Session.get('submitEatseryErrors')[field] ? 'has-error' : '';
  },
});