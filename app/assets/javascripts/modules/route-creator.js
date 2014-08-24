(function(Ciclavia, Stapes, _){
  "use strict";

  var LatLngCollection = Stapes.subclass();
  var LatLng = Stapes.subclass();

  Ciclavia.Modules.RouteCreator = Stapes.subclass({
    EVENTS: {
      pointAdded: "pointAdded"
    },

    points: null,
    _currentRoute: null,
    _lastLineElementForMap: null,
    _currentLineElementForMap: null,

    constructor: function(){
      this.reset();
    },

    // Add a point to this instance of RouteCreator
    // 
    addPoint: function(latlng){
      if(!(_.isArray(latlng) && latlng.length === 2)){
        throw "Received invalid latlng as point";
      }

      this._lastLineElementForMap = this.currentLineElementForMap();
      this.points.push([latlng]);
      this._currentLineElementForMap = null;
      this.emit(this.EVENTS.pointAdded);
    },

    // Returns a Mapbox PolyLine representing the points added
    // 
    currentLineElementForMap: function(){
      if(this._currentLineElementForMap){
        return this._currentLineElementForMap;
      } else {
        this._currentLineElementForMap = Ciclavia.Helpers.MapBoxHelper.polyLineFromCoordSet(this.points.getAllAsArray());
        return this._currentLineElementForMap;
      }
    },

    lastLineElementForMap: function(){
      return this._lastLineElementForMap;
    },

    // The route currently being created
    // 
    currentRoute: function(){
      return this._currentRoute || this._createRoute();
    },

    // Generate a new Route using the inputted data
    // 
    _createRoute: function(){
      var route = new Ciclavia.Models.Route({
        routeSegments: [new Ciclavia.Models.RouteSegment({coordinates: this.points.getAllAsArray()})]
      });

      return route;
    },

    // Empty this instance of all data and return it to a fresh state
    // 
    reset: function(){
      this._lastLineElementForMap = null;
      this._currentLineElementForMap = null;
      this.points = new LatLngCollection();
    }
  });

})(Ciclavia, Stapes, _);