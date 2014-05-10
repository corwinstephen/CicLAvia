(function(){
  Ciclavia.Controllers.Maps = {
    show: function(){
      // Set map width
      var $map = $("#map");
      $map.css({
        width: $(window).width(),
        height: $(window).height()
      });

      var map = L.mapbox.map('map', 'examples.map-9ijuk24y')
        .setView([34.048776, -118.251522], 11);

      map.on('click', function(e) {
          console.log(e.containerPoint.toString() + ', ' + e.latlng.toString());
      });
    }
  };
})();