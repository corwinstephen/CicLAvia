(function(_){

  function layers(){
    var layerData = Ciclavia.PageData.layers;
    if(!layerData){
      throw "Bad data in Ciclavia.PageData.layers";
    }
    return layerData;
  }

  function findLayerDataById(layerId){
    return _.findWhere(layers(), { id: layerId });
  }

  function buildGeoJSONFromLayerData(layerData){
    var features = layerData.places.map(function(place){
      return {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [place.lng, place.lat]
        },
        properties: {
            'marker-color': '#4db541',
            'marker-symbol': 'star',
            title: [place.lng, place.lat].join(',')
        }
      };
    });

    var geoJSON = {
      type: 'FeatureCollection',
      features: features
    };

    return geoJSON;
  };

  Ciclavia.Modules.Layer = {
    generate: function(layerId){
      var layerData = findLayerDataById(layerId);
      var geoJSON = buildGeoJSONFromLayerData(layerData);
      var newFeatureLayer = L.mapbox.featureLayer(geoJSON);
      return newFeatureLayer;
    }
  }
})(_);
