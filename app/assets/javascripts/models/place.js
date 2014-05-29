(function(Ciclavia, _){
  "use strict";

  Ciclavia.Models.Place = function(attrs){
    _.each(attrs, function(val, name){
      this[name] = val;
    }.bind(this));
  };

  Ciclavia.Models.Place.prototype = {
    name: null,
    lng: null,
    lat: null,
    lnglat: function(){
      if(_.isNull(this.lng) || _.isNull(this.lat)){
        return null;
      }
      
      return [this.lng, this.lat];
    }
  };

  Ciclavia.Models.Place.fromFoursquare = function(foursquareVenueJSON){
    return new Ciclavia.Models.Place({
      name: foursquareVenueJSON.name
    });
  };

})(Ciclavia, _);
