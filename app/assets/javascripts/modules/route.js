(function(_){

  Ciclavia.Modules.Route = {
    generate: function(routeId){
      var route = _.findWhere(Ciclavia.PageData.routes, { id: routeId });
      var newFeatureLayer = L.geoJson(route.geojson, {
        style: function (feature) {
          return {
            color: '#008CBE',
            weight: 10,
            opacity: 0.9
          };
        },
      });
      return newFeatureLayer;
    }
  }
})(_);
