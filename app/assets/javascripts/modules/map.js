// 
// TODO: Make a separate module for the buttons at the top of the screen
// 

(function(Ciclavia, _){
  "use strict";

  var map = null;

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
      this.mapnav.on('layertoggle', this.onLayerToggle);

      // The map itself
      map = this.createMap();
      this.setMapWidth();

      // Add data to map
      this.buildEventsFromData();
      this.render();
    },

    setMapWidth: function(){
      this.fitMapToWindow();
      $(window).resize(this.fitMapToWindow.bind(this));
    },

    fitMapToWindow: function(){
      var $map = $(this.CSS.map);
      $map.css({
        width: $(window).width(),
        height: $(window).height()
      });
    },

    onLayerToggle: function(data){
      // 
      // TODO
      // 
      console.log("Layer " + data.layerId + " turned ");
      if(data.isOn === true){
        console.log("on");
      } else {
        console.log("off");
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
      })
      .setView(Ciclavia.PageData.midpoint, 14);

      new L.Control.Zoom({ position: 'topright' }).addTo(newMap);

      newMap.on('click', this._mapClicked.bind(this));

      return newMap;
    },

    buildEventsFromData: function(){
      if(!_.isArray(Ciclavia.PageData.events)){
        throw "Event data not defined";
      }

      _.each(Ciclavia.PageData.events, function(eventData, index){
        var options = {
          active: (index === 0 ? true : false)
        };
        
        var event = this.newEventWithBindings(_.extend($.parseJSON(eventData), options));
        this.get("events").push(event);
      }.bind(this));
    },

    newEventWithBindings: function(eventOptions){
      var event = new Ciclavia.Models.Event(eventOptions);
      event.on("change:active", this.render.bind(this));
      event.on("change:routes", this.render.bind(this));

      // Bind to route clicks
      _.each(event.routes, this._listenForRouteClicks.bind(this));
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
