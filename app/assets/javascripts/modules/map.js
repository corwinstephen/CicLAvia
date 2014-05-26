(function(Ciclavia){
  "use strict";

  var init = function(){
    // Set map width
    var $map = $("#map");
    $map.css({
      width: $(window).width(),
      height: $(window).height()
    });

    var map = L.mapbox.map('map', 'corwinstephen.i6aocpam', {
      infoControl: false,
    })
    .setView([34.048776, -118.251522], 11);

    map.on('click', function(e) {
      mapClicked(e);
    });
  };
  
  var mapClicked = function(mapClickEvent){
    var lat = mapClickEvent.latlng.lat;
    var lng = mapClickEvent.latlng.lng;
    Ciclavia.Modules.Foursquare.getPlacesForPoint(lat, lng, handleFoursquareResponse);
  };

  var handleFoursquareResponse = function(result, status){
    if(status !== "success"){ /* Handle this error better */ }
    displayResults(result);
  };

  var displayResults = function(){
    // TODO
  };

  Ciclavia.Modules.Map = {
    init: init,
    mapClicked: mapClicked
  };
})(Ciclavia);