Template.eatseryInfo.helpers({
	imagePath: function() {
		return getImagePath(this._id);
	},
	distanceText: function() {
		return getDistanceText(this._id);
	}
}); 