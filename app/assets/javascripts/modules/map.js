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

  var _polyLineFromCoordSet = function(coordSet){
    var pointSet = [];
    _.each(coordSet, function(coord){
      pointSet.push(new L.LatLng(coord[0], coord[1]));
    });

    var colors = ['#00a5e4', '#4db541', '#ffd500'];

    return new L.Polyline(pointSet, {
      color: colors[Math.round(Math.random()*10)%3],
      weight: 8,
      opacity: 1,
      smoothFactor: 1
    });
  };

  var plotRoutes = function(map){
    var routeLines = [];
    _.each(Ciclavia.PageData.routes, function(routeSet){
      _.each(routeSet, function(coordSet){
        var line = _polyLineFromCoordSet(coordSet);
        routeLines.push(line);
        line.addTo(map);
      });
    });
  };

  var createMap = function(){
    map = L.mapbox.map('map', 'corwinstephen.i6aocpam', {
      infoControl: false,
      zoomControl: false
    })
    .setView(Ciclavia.PageData.midpoint, 13);

    new L.Control.Zoom({ position: 'topright' }).addTo(map);

    map.on('click', function(e) {
      mapClicked(e);
    });

    plotRoutes(map);
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
    // console.log(mapClickEvent.latlng);
    // var popup = openPointDialog(mapClickEvent.latlng);

    // var lat = mapClickEvent.latlng.lat;
    // var lng = mapClickEvent.latlng.lng;
    // Ciclavia.Modules.Foursquare.getPlacesForPoint(lat, lng, function(foursquareJSON, status){
    //   if(status !== "success"){ /* Handle this error better */ }

    //   plotPlacesInPopup(foursquareJSON, popup);
    // });
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
