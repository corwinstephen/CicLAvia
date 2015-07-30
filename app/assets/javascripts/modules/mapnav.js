(function(){
  var _nav;

  Ciclavia.Modules.Mapnav = Stapes.subclass({
    CSS: {
      MAPNAV_CONTAINER: ".mapnav-container",
      EXPANDED_CONTENT: ".mapnav-expandedcontent",
      LAYER_TOGGLE: ".layertoggle"
    },

    EVENTS: {
      LAYER_TOGGLE: 'layertoggle',
      EVENT_OPENED: 'eventopened',
      MODAL_OPEN: 'modalopen',
      MODAL_CLOSE: 'modalclose',
      MAP_READY: 'ready'
    },

    $container: null,

    constructor: function(){
      this.$container = $(this.CSS.MAPNAV_CONTAINER);
      this.setUpClickHandlers();
      this.bindToMap();
      return this;
    },

    bindToMap: function(){
      var defaultEvent = Ciclavia.Modules.Event.getDefault();
      if(!!defaultEvent){
        Ciclavia.Core.map.on(this.EVENTS.MAP_READY, this.openEvent.bind(this, defaultEvent.id));
      }

      Ciclavia.Core.map.on(this.EVENTS.MODAL_OPEN, this.hide.bind(this));
      Ciclavia.Core.map.on(this.EVENTS.MODAL_CLOSE, this.show.bind(this));
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
      $this.find(this.CSS.LAYER_TOGGLE).prop('checked', true);

      this.emit(this.EVENTS.EVENT_OPENED, {
        eventId: eventId
      });
    },

    bindToLayerToggle: function(){
      $(this.CSS.LAYER_TOGGLE).on('change', function(e){
        var layerId = $(e.currentTarget).data('layerid');
        var isOn = e.currentTarget.checked;

        this.emit(this.EVENTS.LAYER_TOGGLE, {
          layerId: layerId,
          isOn: isOn
        });

      }.bind(this));
    }
  });
})();