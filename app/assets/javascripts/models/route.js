(function(Ciclavia, _){
  "use strict";

  Ciclavia.Models.Route = Stapes.subclass({
    constructor: function(options){
      if(_.isString(options)){
        options = $.parseJSON(options);
      }
      this.options = options;
      this.name = null;
      this.color = null;
      this.routeSegments = [];
      this.active = true;

      this._parseOptions();
    },

    _parseOptions: function(){
      this.id = this.options.id;
      this.name = this.options.name;
      this.description = this.options.description;
      this.meetingPoint = this.options.meetingPoint;
      this.departsAt = this.options.departsAt;
      this.color = this.options.color;
      this.active = this.options.active || this.active;

      if(this.options.routeSegments){
        _.each(this.options.routeSegments, function(routeSegmentData){
          var newSegment = new Ciclavia.Models.RouteSegment(routeSegmentData);
          newSegment.on("click", this._emitClickEvent.bind(this));
          this.routeSegments.push(newSegment);
        }.bind(this));
      }
    },

    lineElementsForMap: function(){
      return _.map(this.routeSegments, function(segment){
        return segment.lineElementForMap({
          color: this.color
        });
      }.bind(this));
    },

    _emitClickEvent: function(){
      this.emit("click", this);
    }
  });

})(Ciclavia, _);
