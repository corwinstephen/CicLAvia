(function(){
  var open = [];

  Ciclavia.Modules.PlaceModal = Stapes.subclass({
    CSS: {
      PLACE_MODAL: '.placemodal',
      ICON_X: '.icon-x'
    },

    defaultTemplate: 'place-modal',
    hubTemplate: 'hub-modal',

    constructor: function(placeAttrs){
      this.closeAll();

      open.push(this);

      this.type = placeAttrs.type;

      var rendered = HandlebarsTemplates[this.getTemplate()](placeAttrs);
      this.$rendered = $(rendered);
      $('body').append(this.$rendered);

      this.bindClickEvents();

      History.pushState({ placeId: placeAttrs.id }, placeAttrs.name, "?placeId=" + placeAttrs.id);

      // Emit open event
      Ciclavia.Core.map.emit('modalopen');
    },

    getTemplate: function(){
      switch(this.type){
        case('Hub'):
          return this.hubTemplate;
          break;
        default:
          return this.defaultTemplate;
          break;
      }
    },

    bindClickEvents: function(){
      // Close on click outside
      $(document).click(this.closeIfOutside.bind(this));

      // Close on click X
      this.$rendered.click(this.CSS.ICON_X, this.close.bind(this));
    },

    closeIfOutside: function(e){
      if(this.$rendered.get(0).contains(e.target)){
        e.preventDefault();
      } else {
        this.close();
      }
    },

    close: function(){
      this.closeWithoutEvent();
      History.pushState({ placeId: null }, 'CicLAvia', "/");
      Ciclavia.Core.map.emit('modalclose');
    },

    closeWithoutEvent: function(){
      this.$rendered.remove();
      $(document).unbind('click');
    },

    closeAll: function(){
      _.each(open, function(modal){
        modal.closeWithoutEvent();
      });
    }
  });
})();