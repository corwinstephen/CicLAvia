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

    lineElementForMap: function(){
      if(!this._lineElement){
        this._lineElement = Ciclavia.Helpers.MapBoxHelper.polyLineFromCoordSet(this.coordinates);
      }
      return this._lineElement;
    }
  };

})(Ciclavia, _);
