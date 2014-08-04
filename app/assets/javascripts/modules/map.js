(function(Ciclavia, _){
  "use strict";

  var map = null;
  var events = [];
  var colors = ['#00a5e4', '#4db541', '#ffd500'];

  var init = function(){
    // Map width
    fitMapToWindow();
    $(window).resize(function(){
      fitMapToWindow();
    });

    map = createMap();

    initEvents();
    setEventHandlers();
    render();
  };

  var setEventHandlers = function(){
    $(".mapnav-event dl").click(function(){
      $(this).next(".mapnav-routes").slideToggle(150);
      var id = $(this).data("id");
      var clickedEvent = _.find(events, function(item){
        return (item.id === id);
      });

      clickedEvent.set("active", !clickedEvent.get("active"));
      $(this).toggleClass("selected");
    });


  };

  var render = function(){
    if(events.length === 0){
      console.log("No events to render");
    }

    _.each(events, function(event){
      _.each(event.routes, function(route){
        _.each(route.lineElementsForMap(), function(element){
          if(event.get("active") && route.active){
            element.addTo(map);
          } else {
            map.removeLayer(element);
          }
        });
      });
    });
  };

  var initEvents = function(){
    if(!_.isArray(Ciclavia.PageData.events)){
      throw "Event data not defined";
    }

    _.each(Ciclavia.PageData.events, function(eventData, index){
      var options = {
        color: colors[index % 3],
        active: (index === 0 ? true : false)
      };
      
      var event = newEventWithBindings(_.extend($.parseJSON(eventData), options));
      events.push(event);
    });
  };

  var newEventWithBindings = function(eventOptions){
    var event = new Ciclavia.Models.Event(eventOptions);
    event.on("change:active", render);
    return event;
  };

  var createMap = function(){
    var newMap = L.mapbox.map('map', 'corwinstephen.i6aocpam', {
      infoControl: false,
      zoomControl: false
    })
    .setView(Ciclavia.PageData.midpoint, 13);

    new L.Control.Zoom({ position: 'topright' }).addTo(newMap);

    newMap.on('click', function(e) {
      mapClicked(e);
    });

    return newMap;
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
