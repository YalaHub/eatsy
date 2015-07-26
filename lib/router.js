Router.configure( {
	layoutTemplate: 'layout',
	loadingTemplate: 'loading',
	notFoundTemplate: 'notFound',
});

var requireAdmin = function() {
	if(!(Meteor.user() && Meteor.user().admin) ) {
		this.render('accessDenied');
	} else {
		this.next();
	}
};

Router.onBeforeAction(requireAdmin, {only: ['addEatsery', 'editEatsery', 'addAdmin']});

Router.route('/', {
	name: 'listView',
});

Router.route('/eatsery/:_id',{
	name: 'eatseryPage',
	waitOn: function() {
		return Meteor.subscribe('singleEatsery', this.params._id);
	},
	data: function() {
		return Eatsery.findOne(this.params._id);
	}
});

Router.route('/eatsery/edit/:_id',{
	name: 'editEatsery',
	waitOn: function() {
		return Meteor.subscribe('singleEatsery', this.params._id);
	},
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



