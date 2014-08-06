(function(Stapes, $){
  Ciclavia.Modules.RouteDialogue = Stapes.subclass({
    template: 'route-dialogue',

    dialogue: null,
    $dialogue: null,

    constructor: function(route){
      this.dialogue = HandlebarsTemplates[this.template](this._routeAttributesForTemplate(route));
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

    _routeAttributesForTemplate: function(route){
      var departureDate = new Date(route.departsAt);
      var ampm = (departureDate.getHours() < 12) ? "am" : "pm";
      var departureTime = (departureDate.getHours() % 12).toString() + ":" + departureDate.getMinutes().toString() + ampm;

      return {
        name: route.name,
        description: route.description,
        meetingPoint: route.meetingPoint,
        departsAt: $.datepicker.formatDate('M d, yy', departureDate) + " at " + departureTime
      };
    },

    _setEvents: function(){
      this.$dialogue.find(".dialogue-close").click(this._closeButtonClicked.bind(this));
    },

    _closeButtonClicked: function(){
      this.hide();
    }
  });
})(Stapes, $);