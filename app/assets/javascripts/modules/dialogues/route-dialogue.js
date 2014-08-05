(function(Stapes){
  Ciclavia.Modules.RouteDialogue = Stapes.subclass({
    template: 'route-dialogue',

    dialogue: null,
    $dialogue: null,

    constructor: function(route){
      this.dialogue = HandlebarsTemplates[this.template]({
        name: route.name
      });
      this.$dialogue = $(this.dialogue);

      this._setEvents();
    },

    show: function(){
      Ciclavia.Modules.Blackout.on();
      $("body").append(this.$dialogue);
    },

    hide: function(){
      Ciclavia.Modules.Blackout.off();
      this.$dialogue.remove();
    },

    _setEvents: function(){
      this.$dialogue.find(".dialogue-close").click(this._closeButtonClicked.bind(this));
    },

    _closeButtonClicked: function(){
      this.hide();
    }
  });
})(Stapes);