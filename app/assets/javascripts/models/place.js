(function(Ciclavia){
  "use strict";

  Ciclavia.Models.Place = function(attrs){
    _.each(attrs, function(val, name){
      this[name] = val;
    }.bind(this));
  };

  Ciclavia.Models.Place.prototype = {

  };

  Ciclavia.Models.Place.fromFoursquare = function(foursquareVenueJSON){
    return new Ciclavia.Models.Place({
      name: foursquareVenueJSON.name
    });
  };

})(Ciclavia);
