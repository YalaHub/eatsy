Meteor.startup(function() {
	Uploader.uploadUrl = Meteor.absoluteUrl("upload"); 
	GoogleMaps.load({
  		key: 'AIzaSyCc7dxUtKyvEVFk3o-nqvJptwvNxE5WDJo',
    	libraries: 'places'
	});
});


