(function(Ciclavia, Stapes, _){
  "use strict";

  var LatLngCollection = Stapes.subclass();
  var LatLng = Stapes.subclass();

  Ciclavia.Modules.RouteCreator = Stapes.subclass({
    EVENTS: {
      pointAdded: "pointAdded"
    },

    points: new LatLngCollection(),

    constructor: function(){
    },

    addPoint: function(latlng){
      if(!(_.isArray(latlng) && latlng.length === 2)){
        throw "Received invalid latlng as point";
      }

      this.points.push([latlng]);
      this.emit(this.EVENTS.pointAdded);
    },

    lineElementForMap: function(){
      return Ciclavia.Helpers.MapBoxHelper.polyLineFromCoordSet(this.points.getAllAsArray());
    }
  });

})(Ciclavia, Stapes, _);