Router.configure( {
	layoutTemplate: 'layout',
	waitOn: function() {return Meteor.subscribe('eatsery');},
	loadingTemplate: 'loading',
	notFoundTemplate: 'notFound'
});

var requireAdmin = function() {
	if(!Meteor.user().admin ) {
		this.render('accessDenied');
	} else {
		this.next();
	}
};

Router.onBeforeAction(requireAdmin, {only: ['addEatsery', 'editEatsery', 'addAdmin']});



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

Router.route('/addAdmin', {
	name: 'addAdmin'
});


