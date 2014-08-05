(function(Stapes){
  Ciclavia.Modules.RouteDialogue = Stapes.subclass({
    template: 'route-dialogue',

    $dialogue: null,

    constructor: function(route){
      this.$dialogue = HandlebarsTemplates[this.template]({
        name: route.name
      });
    },

    show: function(){
      $("body").append(this.$dialogue);
    }
  });
})(Stapes);