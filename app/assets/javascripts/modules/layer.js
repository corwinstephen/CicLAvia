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
          name: place.name,
          description: place.description,
          imageSource: place.imageSource
        }
      };
    });

    var geoJSON = {
      type: 'FeatureCollection',
      features: features
    };

    return geoJSON;
  };

  function placeClicked(e){
    var properties = e.target.feature.properties;
    new Ciclavia.Modules.PlaceModal(properties);
  };

  Ciclavia.Modules.Layer = {
    generate: function(layerId){
      var layerData = findLayerDataById(layerId);
      var geoJSON = buildGeoJSONFromLayerData(layerData);
      var newFeatureLayer = L.mapbox.featureLayer(geoJSON);

      // Add click handlers to markers
      newFeatureLayer.eachLayer(function(place){
        place.on('click', placeClicked);
      });
      return newFeatureLayer;
    }
  }
})(_);
