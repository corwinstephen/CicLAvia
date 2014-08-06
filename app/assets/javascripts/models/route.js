(function(Ciclavia, _){
  "use strict";

  Ciclavia.Models.Route = Stapes.subclass({
    constructor: function(options){
      if(_.isString(options)){
        options = $.parseJSON(options);
      }
      this.options = options;
      this._parseOptions();
    },

    _parseOptions: function(){
      this.set({
        id: this.options.id,
        name: this.options.name,
        description: this.options.description,
        meetingPoint: this.options.meetingPoint,
        departsAt: this.options.departsAt,
        color: this.options.color,
        active: this.options.active || true,
        routeSegments: []
      });

      if(this.options.routeSegments){
        _.each(this.options.routeSegments, function(routeSegmentData){
          var newSegment = new Ciclavia.Models.RouteSegment(routeSegmentData);
          newSegment.on("click", this._emitClickEvent.bind(this));
          this.get("routeSegments").push(newSegment);
        }.bind(this));
      }
    },

    lineElementsForMap: function(){
      return _.map(this.get("routeSegments"), function(segment){
        return segment.lineElementForMap({
          color: this.get("color")
        });
      }.bind(this));
    },

    _emitClickEvent: function(){
      this.emit("click", this);
    }
  });

})(Ciclavia, _);
