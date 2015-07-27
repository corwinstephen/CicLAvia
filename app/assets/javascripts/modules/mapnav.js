(function(){
  var _nav;

  Ciclavia.Modules.Mapnav = Stapes.subclass({
    CSS: {
      mapnavContainer: ".mapnav-container",
      expandedContent: ".mapnav-expandedcontent",
      layerToggle: ".layertoggle"
    },

    EVENTS: {
      layerToggle: 'layertoggle',
      eventOpened: 'eventopened'
    },

    $container: null,

    constructor: function(){
      this.$container = $(this.CSS.mapnavContainer);
      this.setUpClickHandlers();
      return this;
    },

    setUpClickHandlers: function(){
      this.bindToEventClick();
      this.bindToLayerToggle();
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

    bindToEventClick: function(){
      $(".mapnav-event").click(function(e){
        var id = $(e.currentTarget).data("id");
        this.openEvent(id);
      }.bind(this));
    },

    openEvent: function(eventId){
      var $this = $('.mapnav-event[data-id=' + eventId + ']');
      if(($this).hasClass('selected')){
        return;
      }
      $('.mapnav-event').removeClass('selected');
      $this.addClass('selected');

      // All layers are automatically displayed,
      // so check all the boxes
      $this.find('.layertoggle').prop('checked', true);

      this.emit(this.EVENTS.eventOpened, {
        eventId: eventId
      });
    },

    bindToLayerToggle: function(){
      $(this.CSS.layerToggle).on('change', function(e){
        var layerId = $(e.currentTarget).data('layerid');
        var isOn = e.currentTarget.checked;
        
        this.emit(this.EVENTS.layerToggle, {
          layerId: layerId,
          isOn: isOn
        });

      }.bind(this));
    }
  });
})();