(function(){
  var $rendered;

  Ciclavia.Modules.PlaceModal = Stapes.subclass({
    CSS: {
      PLACE_MODAL: '.placemodal',
      ICON_X: '.icon-x'
    },

    defaultTemplate: 'place-modal',
    hubTemplate: 'hub-modal',

    constructor: function(placeAttrs){
      this.type = placeAttrs.type;

      var rendered = HandlebarsTemplates[this.getTemplate()](placeAttrs);
      $rendered = $(rendered);
      $('body').append($rendered);

      this.bindClickEvents();

      // Emit open event
      Ciclavia.Core.map.emit('modalopen');
    },

    getTemplate: function(){
      switch(this.type){
        case(null):
          return this.defaultTemplate;
          break;
        case('Hub'):
          return this.hubTemplate;
          break;
      }
    },

    bindClickEvents: function(){
      // Close on click outside
      $(document).click(this.closeIfOutside.bind(this));

      // Close on click X
      $rendered.click(this.CSS.ICON_X, this.close.bind(this));
    },

    closeIfOutside: function(e){
      if($rendered.get(0).contains(e.target)){
        e.preventDefault();
      } else {
        this.close();
      }
    },

    close: function(){
      $rendered.remove();
      $(document).unbind('click', this.closeIfOutside);
      Ciclavia.Core.map.emit('modalclose');
    }
  });
})();