(function(Ciclavia, _){
  "use strict";

  Ciclavia.Helpers.MapBoxHelper = {
    polyLineFromCoordSet: function(coordSet, options){
      options = options || {};

      var pointSet = [];
      _.each(coordSet, function(coord){
        pointSet.push(new L.LatLng(coord[0], coord[1]));
      });

      return new L.Polyline(pointSet, {
        color: options.color || '#333',
        weight: 5,
        opacity: 1,
        smoothFactor: 1
      });
    }
  };

})(Ciclavia, _);
