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
		Router.go('eatseryPage', {_id: resultId});

	}
});

Template.submitEatsery.helpers({
  errorMessage: function(field) {
    return Session.get('submitEatseryErrors')[field];
  },
  errorClass: function (field) {
    return !!Session.get('submitEatseryErrors')[field] ? 'has-error' : '';
  },
  eatseryData: function() {
  	return {
  		id: this._id
  	};
  }
});
