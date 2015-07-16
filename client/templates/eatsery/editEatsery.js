Template.editEatsery.onCreated(function() {
  Session.set('editEatseryErrors', {});
});

Template.editEatsery.events({
	'submit form': function(e) {
		e.preventDefault();

		var eatseryAttributes = {
      hasPhoto: true,
		};

		Eatsery.update( this._id, {$set: eatseryAttributes});
		Router.go('eatseryPage', {_id: this._id});

	}
});

Template.editEatsery.helpers({
  errorMessage: function(field) {
    return Session.get('editEatseryErrors')[field];
  },
  errorClass: function (field) {
    return !!Session.get('editEatseryErrors')[field] ? 'has-error' : '';
  },
  eatseryData: function() {
    return {
      id: this._id
    };
  },
  imagePath: function() {
    return getImagePath(this._id);
  }
});
