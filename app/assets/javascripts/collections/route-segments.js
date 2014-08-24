(function(Stapes){
  Ciclavia.Collections.RouteSegments = Stapes.subclass({
    asParams: function(){
      var allSegments = this.map(function(routeSegment){
        return routeSegment.asParams();
      }, this);

      return JSON.stringify(allSegments);
    }
  });
})(Stapes);