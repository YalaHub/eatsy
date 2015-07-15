function hasClass(element, className) {
    return (' ' + element.className + ' ').indexOf(' ' + className + ' ') > -1;
}
function init() {
    window.addEventListener('scroll', function(e){
        var distanceY = window.pageYOffset || document.documentElement.scrollTop,
            shrinkOn = 150,
            header = document.getElementById("header");
            content = document.getElementById("content");
        if (distanceY > shrinkOn) {
            header.classList.add("smaller");
            content.classList.add("content-smaller");
        } if (distanceY < 130) {
            if (hasClass(header,"smaller")) {
            	header.classList.remove("smaller");
            	content.classList.remove("content-smaller");
            }
        }
    });
}
window.onload = init();


Template.header.onRendered(function() {
  this.autorun(function () {
    if (GoogleMaps.loaded()) {
      $("#location").geocomplete();
    }
  });
});