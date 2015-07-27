(function(_){

  Ciclavia.Modules.Route = {
    generate: function(routeId){
      var route = _.findWhere(Ciclavia.PageData.routes, { id: routeId });
      var newFeatureLayer = L.geoJson(route.geojson, {
        style: function (feature) {
          return {color: '#333'};
        },
      });
      return newFeatureLayer;
    }
  }
})(_);
