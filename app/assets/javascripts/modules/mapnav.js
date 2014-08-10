(function(){
  Ciclavia.Modules.Mapnav = Stapes.subclass({
    CSS: {
      mapnavContainer: ".mapnav-container",
      routesContainer: ".mapnav-routes"
    },

    $container: null,

    constructor: function(){
      this.$container = $(this.CSS.mapnavContainer);

      this._bindToEventClick();

      return this;
    },

    show: function(){
      this.$container.animate({
        left: 0
      });
    },

    hide: function(){
      var containerWidth = this.$container.outerWidth();
      this.$container.animate({
        left: containerWidth * -1
      });
    },

    _bindToEventClick: function(){
      $(".mapnav-event dl").click(function(e){
        var id = $(e.currentTarget).data("id");
        var clickedEvent = _.find(Ciclavia.Core.map.get("events"), function(item){
          return (item.id === id);
        });
        
        clickedEvent.set("active", !clickedEvent.get("active"));
        if(clickedEvent.get("active")){
          $(e.currentTarget).addClass("selected");
          $(e.currentTarget).next(this.CSS.routesContainer).slideDown(150);
        } else {
          $(e.currentTarget).removeClass("selected");
          $(e.currentTarget).next(this.CSS.routesContainer).slideUp(150);
        }
      }.bind(this));
    }
  });
})();