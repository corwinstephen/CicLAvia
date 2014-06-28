(function(Ciclavia, _){
  "use strict";

  Ciclavia.Models.Route = function(options){
    if(_.isString(options)){
      options = $.parseJSON(options);
    }
    this.options = options;
    this.name = null;
    this.color = null;
    this.routeSegments = [];
    this.active = true;

    this._parseOptions();
  };

  Ciclavia.Models.Route.prototype = {
    _parseOptions: function(){
      this.id = this.options.id;
      this.name = this.options.name;
      this.color = this.options.color;

      if(this.options.route_segments){
        _.each(this.options.route_segments, function(routeSegmentData){
          this.routeSegments.push(new Ciclavia.Models.RouteSegment(routeSegmentData));
        }.bind(this));
      }
    },

    lineElementsForMap: function(){
      return _.map(this.routeSegments, function(segment){
        return segment.lineElementForMap({
          color: this.color
        });
      }.bind(this));
    }
  };

})(Ciclavia, _);
