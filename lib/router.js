Router.configure( {
	layoutTemplate: 'layout',
	// loadingTemplate: 'loading',
	// notFoundTemplate: 'notFound'
});

var requireLogin = function() {
	if( !Meteor.user()) {
		this.render('accessDenied');
	} else {
		this.next();
	}
};

Router.onBeforeAction(requireLogin, {only: 'submitEatsery'});

Router.route('/', {
	name: 'listView'
});

Router.route('/eatsery/:_id',{
	name: 'eatseryPage',
	data: function() {
		return Eatsery.findOne(this.params._id);
	}
});

Router.route('/eatsery/edit/:_id',{
	name: 'editEatsery',
	data: function() {
		return Eatsery.findOne(this.params._id);
	}
});

Router.route('/submit',{
	name: 'submitEatsery',
});



