Router.configure( {
	layoutTemplate: 'layout',
	waitOn: function() {return Meteor.subscribe('eatsery');},
	loadingTemplate: 'loading',
	notFoundTemplate: 'notFound'
});

var requireLogin = function() {
	if( !Meteor.user()) {
		this.render('accessDenied');
	} else {
		this.next();
	}
};

Router.onBeforeAction(requireLogin, {only: 'addEatsery'});
Router.onBeforeAction(requireLogin, {only: 'editEatsery'});


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

Router.route('/addEatsery',{
	name: 'addEatsery',
});



