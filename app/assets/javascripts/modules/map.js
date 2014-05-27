(function(Ciclavia, _){
  "use strict";

  var map = null;

  var init = function(){
    // Map width
    fitMapToWindow();
    $(window).resize(function(){
      fitMapToWindow();
    });

    createMap();
  };

  var createMap = function(){
    map = L.mapbox.map('map', 'corwinstephen.i6aocpam', {
      infoControl: false,
    })
    .setView([34.048776, -118.251522], 11);

    map.on('click', function(e) {
      mapClicked(e);
    });
  };

  var fitMapToWindow = function(){
    var $map = $("#map");
    $map.css({
      width: $(window).width(),
      height: $(window).height()
    });
  };

  var openPointDialog = function(latlng){
    var uniqueId = _.uniqueId();

    var popup = L.popup()
    .setLatLng(latlng)
    .setContent('<div class="map-popup-wrap" data-id="' + uniqueId + '"><input type="text" class="form-control" placeholder="Name this spot" /><p>Or select an existing location</p><div class="row"><ul class="map-popup-existinglocations"></ul></div>')
    .openOn(map);

    // Store the popup's uniqueId so we can find 
    popup.uniqueId = uniqueId;

    return popup;
  };
  
  var mapClicked = function(mapClickEvent){
    var popup = openPointDialog(mapClickEvent.latlng);

    var lat = mapClickEvent.latlng.lat;
    var lng = mapClickEvent.latlng.lng;
    Ciclavia.Modules.Foursquare.getPlacesForPoint(lat, lng, function(foursquareJSON, status){
      if(status !== "success"){ /* Handle this error better */ }

      plotPlacesInPopup(foursquareJSON, popup);
    });
  };

  var plotPlacesInPopup = function(foursquareJSON, popup){
    var arrayOfPlaces = [];
    _.each(foursquareJSON.response.venues, function(venueJSON){
      var place = Ciclavia.Models.Place.fromFoursquare(venueJSON);
      arrayOfPlaces.push(place);

      var $popup = $(".map-popup-wrap[data-id="+ popup.uniqueId +"]");
      var $locationsWrap = $popup.find(".map-popup-existinglocations");
      $locationsWrap.append("<li>" + place.name + "</li>");
    });

  };

  Ciclavia.Modules.Map = {
    init: init,
    mapClicked: mapClicked
  };
})(Ciclavia, _);
