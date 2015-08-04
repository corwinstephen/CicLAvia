// 
// TODO: Make a separate module for the buttons at the top of the screen
// 

(function(Ciclavia, _){
  "use strict";

  var map = null;
  var layers = [];
  var routes = [];

  // For toggling different map layers
  // 
  function storeMapboxLayer(mapboxLayer, layerId){
    layers.push({
      layerId: layerId,
      layer: mapboxLayer
    });
  }

  function disableLayer(layerId){
    var layerToRemove = findLayerOnMap(layerId);
    map.removeLayer(layerToRemove.layer);
    layers = _.without(layers, layerToRemove);
  }

  function findLayerOnMap(layerId){
    return _.findWhere(layers, { layerId: layerId });
  }

  function renderRoutesForEvent(eventId){
    var event = _.findWhere(Ciclavia.PageData.events, { id: eventId });
    var routeIds = event.routes.map(function(route){
      return route.id;
    });
    _.each(routeIds, function(routeId){
      var newRoute = Ciclavia.Modules.Route.generate(routeId);
      map.addLayer(newRoute);
      routes.push(newRoute);
    });
  }

  function removeAllRoutes(){
    _.each(routes, function(route){
      map.removeLayer(route);
      routes = _.without(routes, route);
    });
  }

  function centerMap(){
    var offset = (isMobile() ? 0 : 350)
    if(routes.length > 0){
      map.fitBounds(routes[0].getBounds(), {
        paddingTopLeft: [offset, 0]
      });
    }
  }

  function isMobile(){
    return $(window).width() < Ciclavia.Config.Constants.mobileBreakpoint;
  }

  function enableAllLayersForEvent(eventId){
    _.each(Ciclavia.Modules.Event.layerIdsForEvent(eventId), enableLayer);
  }

  function disableAllLayers(){
    _.each(layers, function(layer){
      disableLayer(layer.layerId);
    });
  }

  function enableLayer(layerId){
    
    // 
    // Return if layer already exists
    // 

    if(!!findLayerOnMap(layerId)){
      return;
    }

    var newLayer = Ciclavia.Modules.Layer.generate(layerId);
    storeMapboxLayer(newLayer, layerId);
    map.addLayer(newLayer);
  }

  Ciclavia.Modules.Map = Stapes.subclass({
    CSS: {
      map: "#map"
    },

    constructor: function(){
      Ciclavia.Core.map = this;

      // Initialize map attributes
      this.set({
        mode: "view",
        events: []
      });

      // Init the nav
      this.mapnav = new Ciclavia.Modules.Mapnav();
      this.mapnav.on('eventopened', this.onEventOpened);
      this.mapnav.on('layertoggle', this.onLayerToggle);

      // The map itself
      map = this.createMap();

      // Add data to map
      this.buildEventsFromData();
      this.render();
      this.emit('ready');
    },

    onEventOpened: function(data){
      removeAllRoutes();
      renderRoutesForEvent(data.eventId);
      disableAllLayers();
      enableAllLayersForEvent(data.eventId);
      centerMap();
    },

    onLayerToggle: function(data){
      var layerId = data.layerId;
      if(data.isOn === true){
        enableLayer(layerId);
      } else {
        disableLayer(layerId);
      }
    },

    getDefaultEvent: function(){
      if(_.isEmpty(this.get("events"))){ return null; }

      var defaultEvent = _.find(this.get("events"), function(event){
        return event.default === true;
      });

      if(defaultEvent){ return defaultEvent; }

      return _.first(this.get("events"));
    },

    createMap: function(){
      var newMap = L.mapbox.map('map', 'corwinstephen.71cdd4a8', {
        infoControl: false,
        zoomControl: false
      });

      var controlPosition = (isMobile() ? 'bottomleft' : 'topright');

      new L.Control.Zoom({ position: controlPosition }).addTo(newMap);
      L.control.locate({
        position: controlPosition,
        keepCurrentZoomLevel: true
      }).addTo(newMap);

      return newMap;
    },

    buildEventsFromData: function(){
      if(!_.isArray(Ciclavia.PageData.events)){
        throw "Event data not defined";
      }
      _.each(Ciclavia.PageData.events, function(eventData, index){
        var event = this.newEventWithBindings(eventData);
        this.get("events").push(event);
      }.bind(this));
    },

    newEventWithBindings: function(eventOptions){
      var event = new Ciclavia.Models.Event(eventOptions);
      event.on("change:active", this.render.bind(this));
      event.on("change:routes", this.render.bind(this));

      return event;
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
    }
  });
})(Ciclavia, _);
