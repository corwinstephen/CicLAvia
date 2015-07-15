(function(){
  Ciclavia.Modules.Mapnav = Stapes.subclass({
    CSS: {
      mapnavContainer: ".mapnav-container",
      expandedContent: ".mapnav-expandedcontent"
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
          $(e.currentTarget).closest('.mapnav-event').addClass("selected");
        } else {
          $(e.currentTarget).closest('.mapnav-event').removeClass("selected");
        }
      }.bind(this));
    }
  });
})();