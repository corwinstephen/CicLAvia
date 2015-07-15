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

    save: function(){
      if(this.get("id")){
        return this._save();
      } else {
        return this._create();
      }
    },

    _save: function(){
      var url = "/routes/" + this.get("id");

      return $.ajax(url, {
        type: "PUT",
        data: {
          route: this.attrs()
        }
      });
    },

    _create: function(){
      var url = "/routes";

      return $.ajax(url, {
        type: "POST",
        data: {
          route: this.attrs()
        }
      });
    },

    // Returns an array with the changed attrs
    // 
    _dirtyAttrs: function(){
      // Needs implementation
    },

    // Returns an object with all the attrs
    // 
    attrs: function(){
      return {
        name: this.get("name"),
        description: this.get("description"),
        route_segments: this.get("routeSegments").asParams()
      };
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
        routeSegments: new Ciclavia.Collections.RouteSegments()
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
      return this.get("routeSegments").map(function(segment){
        return segment.lineElementForMap({
          color: '#00a5e4'
        });
      }, this);
    },

    _emitClickEvent: function(){
      this.emit("click", this);
    }
  });

})(Ciclavia, _);
