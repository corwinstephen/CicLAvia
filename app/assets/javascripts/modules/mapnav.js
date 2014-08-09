(function(){
  Ciclavia.Modules.Mapnav = Stapes.subclass({
    constructor: function(){
      this._bindToEventClick();
    },

    _bindToEventClick: function(){
      $(".mapnav-event dl").click(function(){
        var id = $(this).data("id");
        var clickedEvent = _.find(Ciclavia.Core.map.get("events"), function(item){
          return (item.id === id);
        });
        
        clickedEvent.set("active", !clickedEvent.get("active"));
        if(clickedEvent.get("active")){
          $(this).addClass("selected");
          $(this).next(".mapnav-routes").slideDown(150);
        } else {
          $(this).removeClass("selected");
          $(this).next(".mapnav-routes").slideUp(150);
        }
      });
    }
  });
})();