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
        .setView([40, -74.50], 9);


    }
  };
})();