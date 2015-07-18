(function(){
  var $rendered;

  Ciclavia.Modules.PlaceModal = Stapes.subclass({
    CSS: {
      PLACE_MODAL: '.placemodal'
    },

    template: 'place-modal',

    constructor: function(place){
      var rendered = HandlebarsTemplates[this.template](place);
      $rendered = $(rendered);
      $('body').append($rendered);

      this.bindClickEvents();
    },

    bindClickEvents: function(){
      // Close on click outside
      $(document).click(this.closeIfOutside.bind(this));
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
    }
  });
})();