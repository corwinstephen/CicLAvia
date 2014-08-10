(function(Ciclavia, Stapes, _){
  "use strict";

  var LatLngCollection = Stapes.subclass();
  var LatLng = Stapes.subclass();

  Ciclavia.Modules.RouteCreator = Stapes.subclass({
    EVENTS: {
      pointAdded: "pointAdded"
    },


    points: null,
    _lastLineElementForMap: null,
    _currentLineElementForMap: null,

    constructor: function(){
      this.reset();
    },

    addPoint: function(latlng){
      if(!(_.isArray(latlng) && latlng.length === 2)){
        throw "Received invalid latlng as point";
      }

      this._lastLineElementForMap = this.currentLineElementForMap();
      this.points.push([latlng]);
      this._currentLineElementForMap = null;
      this.emit(this.EVENTS.pointAdded);
    },

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

    reset: function(){
      this._lastLineElementForMap = null;
      this._currentLineElementForMap = null;
      this.points = new LatLngCollection();
    }
  });

})(Ciclavia, Stapes, _);