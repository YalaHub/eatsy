Meteor.startup(function() {
	Uploader.uploadUrl = Meteor.absoluteUrl("upload"); 
	GoogleMaps.load({
		v: '3',
  		key: 'AIzaSyCc7dxUtKyvEVFk3o-nqvJptwvNxE5WDJo',
    	libraries: 'places'
	});
});


