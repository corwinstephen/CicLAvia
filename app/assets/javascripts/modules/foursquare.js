(function(Ciclavia, _){
  "use strict";
  var getPlacesForPoint = function(lat, lng, callback, options){
    options = _.extend({
      query: ""
    }, options);

    var API_ENDPOINT = 'https://api.foursquare.com/v2/venues/search' +
      '?client_id=' + Ciclavia.Config.ApiKeys.Foursquare.id + 
      '&client_secret=' + Ciclavia.Config.ApiKeys.Foursquare.secret +
      '&v=20130815' +
      '&ll=' + lat + ',' + lng +
      '&query=' + options.query + 
      '&callback=?';

    $.getJSON(API_ENDPOINT)
      .done(callback); 
  };

  Ciclavia.Modules.Foursquare = {
    getPlacesForPoint: getPlacesForPoint
  };
})(Ciclavia, _);