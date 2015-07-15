Template.editEatsery.onCreated(function() {
  Session.set('editEatseryErrors', {});
});

Template.editEatsery.events({
	'submit form': function(e) {
		e.preventDefault();

		var eatseryAttributes = {
			name: $(e.target).find('[name=name]').val(),
			location: $(e.target).find('[name=address]').val(),
			distance: 2
		};

		Eatsery.update( this._id, {$set: eatseryAttributes});
		Router.go('eatseryPage', {_id: this._id});

	}
});

Template.editEatsery.helpers({
  errorMessage: function(field) {
    return Session.get('eatserySubmitErrors')[field];
  },
  errorClass: function (field) {
    return !!Session.get('eatserySubmitErrors')[field] ? 'has-error' : '';
  },
  eatseryData: function() {
  	return {
  		id: this._id
  	};
  }
});
