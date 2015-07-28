(function(_){
  Ciclavia.Modules.Event = {
    layerIdsForEvent: function(eventId){
      var event = _.findWhere(Ciclavia.PageData.events, { id: eventId });
      var layerIds = event.layers.map(function(layer){
        return layer.id;
      });

      return layerIds;
    },

    getDefault: function(){
      return _.findWhere(Ciclavia.PageData.events, { default: true });
    }
  }
})(_);
