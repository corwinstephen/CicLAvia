(function(Ciclavia, _){
  "use strict";

  Ciclavia.Models.RouteSegment = function(options){
    if(_.isString(options)){
      options = $.parseJSON(options);
    }
    this.options = options;
    this.coordinates = null;

    this._parseOptions();
  };

  Ciclavia.Models.RouteSegment.prototype = {
    _parseOptions: function(){
      if(this.options.coordinates){
        this.coordinates = this.options.coordinates;
      }
    },

    lineElementForMap: function(options){
      options = options || {};
      
      if(!this._lineElement){
        this._lineElement = Ciclavia.Helpers.MapBoxHelper.polyLineFromCoordSet(this.coordinates, {
          color: options.color
        });
      }
      return this._lineElement;
    }
  };

})(Ciclavia, _);
