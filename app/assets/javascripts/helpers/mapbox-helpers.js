(function(Ciclavia, _){
  "use strict";

  Ciclavia.Helpers.MapBoxHelper = {
    polyLineFromCoordSet: function(coordSet){
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
    }
  };

})(Ciclavia, _);
