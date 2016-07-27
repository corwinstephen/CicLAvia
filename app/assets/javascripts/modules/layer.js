(function(_){

  var colors = {
    blue: '#008CBE', 
    yellow: '#F9CB3A',
    red: '#CA4121',
    green: '#55AE4C',
    orange: '#EB8B2D',
    purple: '#A869AA',
    turquoise: '#1EB0A9',
    pink: '#D757B1'
  };

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
          'marker-color': colors[layerData.color || 'blue'],
          'marker-symbol': iconForType(place.type),
          name: place.name,
          description: place.description,
          address: place.address,
          imageSource: place.photo_url.large,
          type: place.type,
          events: place.events
        }
      };
    });

    var geoJSON = {
      type: 'FeatureCollection',
      features: features
    };

    return geoJSON;
  };

  function iconForType(type){
    switch(type){
      case('Hub'):
        return 'star-stroked';
        break;
      case('Crossing'):
        return 'car';
        break;
      case('HistoricalSite'):
        return 'place-of-worship';
        break;
      default:
        return 'marker-stroked';
    }
  }

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
