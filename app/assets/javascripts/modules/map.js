// 
// TODO: Make a separate module for the buttons at the top of the screen
// 

(function(Ciclavia, _){
  "use strict";

  var map = null;
  var colors = ["#00a5e4", "#4db541", "#ffd500"];

  // var openPointDialog = function(latlng){
  //   var uniqueId = _.uniqueId();

  //   var popup = L.popup()
  //   .setLatLng(latlng)
  //   .setContent('<div class="map-popup-wrap" data-id="' + uniqueId + '"><input type="text" class="form-control" placeholder="Name this spot" /><p>Or select an existing location</p><div class="row"><ul class="map-popup-existinglocations"></ul></div>')
  //   .openOn(map);

  //   // Store the popup's uniqueId so we can find 
  //   popup.uniqueId = uniqueId;

  //   return popup;
  // };

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

  Ciclavia.Modules.Map = Stapes.subclass({
    CSS: {
      map: "#map"
    },

    constructor: function(){
      // Make this instance available to the core
      Ciclavia.Core.map = this;

      // Attributes
      this.set({
        mode: "view",
        events: []
      });

      // Nav
      this.routeSubmitGuide = new Ciclavia.Modules.RouteSubmitGuide(this);
      this.mapnav = new Ciclavia.Modules.Mapnav();

      // Map width
      this.fitMapToWindow();
      $(window).resize(this.fitMapToWindow.bind(this));

      map = this.createMap();

      this.initEvents();
      this.setEventHandlers();
      this.render();
    },

    fitMapToWindow: function(){
      var $map = $(this.CSS.map);
      $map.css({
        width: $(window).width(),
        height: $(window).height()
      });
    },

    createMap: function(){
      var newMap = L.mapbox.map('map', 'corwinstephen.i6aocpam', {
        infoControl: false,
        zoomControl: false
      })
      .setView(Ciclavia.PageData.midpoint, 13);

      new L.Control.Zoom({ position: 'topright' }).addTo(newMap);

      newMap.on('click', this._mapClicked.bind(this));

      return newMap;
    },

    initEvents: function(){
      if(!_.isArray(Ciclavia.PageData.events)){
        throw "Event data not defined";
      }

      _.each(Ciclavia.PageData.events, function(eventData, index){
        var options = {
          color: colors[index % 3],
          active: (index === 0 ? true : false)
        };
        
        var event = this.newEventWithBindings(_.extend($.parseJSON(eventData), options));
        this.get("events").push(event);
      }.bind(this));
    },

    newEventWithBindings: function(eventOptions){
      var event = new Ciclavia.Models.Event(eventOptions);
      event.on("change:active", this.render.bind(this));

      // Bind to route clicks
      _.each(event.routes, this._listenForRouteClicks.bind(this));
      return event;
    },

    setEventHandlers: function(){
      this._bindToSubmitButtonClicks();
    },

    _bindToSubmitButtonClicks: function(){
      this.routeSubmitGuide.on("submitModeButtonClicked", function(){
        this.set("mode", "submit");
      }.bind(this));

      this.routeSubmitGuide.on("submitModeCancelButtonClicked", function(){
        this.set("mode", "view");
      }.bind(this));
    },

    render: function(){
      if(this.get("events").length === 0){
        console.log("No events to render");
        return;
      }

      _.each(this.get("events"), function(event){
        _.each(event.routes, function(route){
          _.each(route.lineElementsForMap(), function(element){
            if(event.get("active") && route.get("active")){
              element.addTo(map);
            } else {
              map.removeLayer(element);
            }
          });
        });
      });
    },

    addElement: function(element){
      element.addTo(map);
      return this;
    },

    removeElement: function(element){
      map.removeLayer(element);
      return this;
    },

    _listenForRouteClicks: function(route){
      route.on("click", this._showRouteDialogForRoute);
    },

    _showRouteDialogForRoute: function(route){
      var dialog = new Ciclavia.Modules.RouteDialogue(route);
      dialog.show();
    },

    _mapClicked: function(clickEvent){
      this.emit("mapClick", clickEvent);
    }

  });
})(Ciclavia, _);
