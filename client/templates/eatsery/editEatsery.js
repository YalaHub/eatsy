Template.editEatsery.onCreated(function() {
  console.log(this);
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
  eatseryData: function() {
    return {
      id: this._id
    };
  },
  imagePath: function() {
    return getImagePath(this._id);
  },
});
