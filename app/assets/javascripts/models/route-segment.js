(function(Ciclavia, _){
  "use strict";

  Ciclavia.Models.RouteSegment = Stapes.subclass({
    constructor: function(options){
      if(_.isString(options)){
        options = $.parseJSON(options);
      }
      this.options = options;
      this.coordinates = null;

      this._parseOptions();
    },

    _parseOptions: function(){
      if(this.options.coordinates){
        this.coordinates = this.options.coordinates;
      }
    },

    // Returns a (cached) Leaflet polyline element for this RouteSegment
    lineElementForMap: function(options){
      options = options || {};
      
      if(!this._lineElement){
        this._lineElement = Ciclavia.Helpers.MapBoxHelper.polyLineFromCoordSet(this.coordinates, {
          color: options.color
        });

        this._bindEventsToLineElement(this._lineElement);
      }
      return this._lineElement;
    },

    _bindEventsToLineElement: function(lineElement){
      lineElement.on("click", this._emitClickEvent.bind(this));
    },

    _emitClickEvent: function(e){
      this.emit("click", this);
    },

    asParams: function(){
      return {
        coordinate_array: this.coordinates
      };
    }
  });

})(Ciclavia, _);
