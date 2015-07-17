Template.editEatsery.events({
	'submit form': function(e) {
		e.preventDefault();
    photoUrl=$('#photoUrl').val();

		var eatseryAttributes = {
      photoUrl: photoUrl,
		};

		Eatsery.update( this._id, {$set: eatseryAttributes});
		Router.go('eatseryPage', {_id: this._id});

	}
});

Template.editEatsery.helpers({
  eatseryData: function() {
    return {
      id: this._id
    };
  },
  imagePath: function() {
    return getImagePath(this._id);
  },
});
