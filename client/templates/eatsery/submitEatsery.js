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
		var params = {
			intent: 'global',
			query: $('#name').val(),
		}
		//do ajax here
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