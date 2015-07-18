(function(_){
  Ciclavia.Modules.Event = {
    layerIdsForEvent: function(eventId){
      var event = _.findWhere(Ciclavia.PageData.events, { id: eventId });
      var layerIds = event.layers.map(function(layer){
        return layer.id;
      });

      return layerIds;
    }
  }
})(_);
