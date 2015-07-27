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

  function buildGeoJSONFromLayerData(layerData, color){
    var features = layerData.places.map(function(place){
      return {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [place.lng, place.lat]
        },
        properties: {
          'marker-color': color,
          'marker-symbol': 'star',
          name: place.name,
          description: place.description,
          address: place.address,
          imageSource: place.photo_url.large,
          type: place.type
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

    // 
    // Hack to stop the default popup from
    // showing up so that we can use our own
    // custom one.
    // 
    e.target.closePopup();
  };

  Ciclavia.Modules.Layer = {
    generate: function(layerId, opts){
      opts = _.extend({
        color: '#4db541'
      }, opts);

      var layerData = findLayerDataById(layerId);
      var geoJSON = buildGeoJSONFromLayerData(layerData, opts.color);
      var newFeatureLayer = L.mapbox.featureLayer(geoJSON);

      // Add click handlers to markers
      newFeatureLayer.eachLayer(function(place){
        place.on('click', placeClicked);
      });
      return newFeatureLayer;
    }
  }
})(_);
